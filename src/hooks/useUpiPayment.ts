import { useState, useCallback, useRef, useEffect } from 'react';
import {
    generatePaymentQR,
    checkPaymentStatus,
    createIndividualRegistration,
    createTeamRegistration,
    type QRCodeData,
    type IndividualRegistration,
    type TeamRegistration,
    ApiError,
} from '@/lib/api';

export type PaymentStatus =
    | 'idle'
    | 'registering'
    | 'generating_qr'
    | 'pending'
    | 'polling'
    | 'success'
    | 'failed'
    | 'timeout'
    | 'cancelled';

export interface UseUpiPaymentState {
    status: PaymentStatus;
    qrData: QRCodeData | null;
    registrationId: number | null;
    error: string | null;
    timeRemaining: number | null;
}

export interface UseUpiPaymentReturn extends UseUpiPaymentState {
    initiateIndividualPayment: (
        registration: Omit<IndividualRegistration, 'eventId'>,
        eventId: number,
        amount: number
    ) => Promise<boolean>;
    initiateTeamPayment: (
        registration: Omit<TeamRegistration, 'eventId'>,
        eventId: number,
        amount: number
    ) => Promise<boolean>;
    cancelPayment: () => void;
    reset: () => void;
}

const POLL_INTERVAL = 5000; // 5 seconds
const MAX_POLL_ATTEMPTS = 60; // 5 minutes total
const QR_EXPIRY_BUFFER = 30000; // 30 seconds buffer before expiry

export function useUpiPayment(): UseUpiPaymentReturn {
    const [state, setState] = useState<UseUpiPaymentState>({
        status: 'idle',
        qrData: null,
        registrationId: null,
        error: null,
        timeRemaining: null,
    });

    const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const expiryTimerRef = useRef<NodeJS.Timeout | null>(null);
    const isCancelledRef = useRef(false);

    // Cleanup function
    const cleanup = useCallback(() => {
        if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
            pollIntervalRef.current = null;
        }
        if (expiryTimerRef.current) {
            clearInterval(expiryTimerRef.current);
            expiryTimerRef.current = null;
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return cleanup;
    }, [cleanup]);

    const reset = useCallback(() => {
        cleanup();
        isCancelledRef.current = false;
        setState({
            status: 'idle',
            qrData: null,
            registrationId: null,
            error: null,
            timeRemaining: null,
        });
    }, [cleanup]);

    const cancelPayment = useCallback(() => {
        isCancelledRef.current = true;
        cleanup();
        setState(prev => ({
            ...prev,
            status: 'cancelled',
            error: 'Payment cancelled',
        }));
    }, [cleanup]);

    const startPolling = useCallback(
        async (transactionId: string, expiresAt: string) => {
            let attempts = 0;
            const expiryTime = new Date(expiresAt).getTime();

            // Start countdown timer
            expiryTimerRef.current = setInterval(() => {
                const remaining = Math.max(0, expiryTime - Date.now());
                setState(prev => ({ ...prev, timeRemaining: Math.floor(remaining / 1000) }));

                if (remaining <= 0) {
                    cleanup();
                    setState(prev => ({
                        ...prev,
                        status: 'timeout',
                        error: 'Payment link has expired',
                    }));
                }
            }, 1000);

            // Start polling for payment status
            const poll = async () => {
                if (isCancelledRef.current) return;

                attempts++;

                if (attempts > MAX_POLL_ATTEMPTS) {
                    cleanup();
                    setState(prev => ({
                        ...prev,
                        status: 'timeout',
                        error: 'Payment verification timeout',
                    }));
                    return;
                }

                // Check if QR has expired
                if (Date.now() > expiryTime - QR_EXPIRY_BUFFER) {
                    cleanup();
                    setState(prev => ({
                        ...prev,
                        status: 'timeout',
                        error: 'Payment link has expired',
                    }));
                    return;
                }

                try {
                    const response = await checkPaymentStatus(transactionId);

                    if (isCancelledRef.current) return;

                    if (response.success && response.data) {
                        if (response.data.status === 'success') {
                            cleanup();
                            setState(prev => ({
                                ...prev,
                                status: 'success',
                                error: null,
                            }));
                            return;
                        }

                        if (response.data.status === 'failed') {
                            cleanup();
                            setState(prev => ({
                                ...prev,
                                status: 'failed',
                                error: 'Payment failed. Please try again.',
                            }));
                            return;
                        }
                    }
                } catch (error) {
                    console.error('Payment status check error:', error);
                    // Continue polling on error
                }
            };

            // Initial poll
            await poll();

            // Set up interval for subsequent polls
            if (!isCancelledRef.current && state.status !== 'success' && state.status !== 'failed') {
                pollIntervalRef.current = setInterval(poll, POLL_INTERVAL);
            }
        },
        [cleanup, state.status]
    );

    const processPayment = useCallback(
        async (registrationId: number, amount: number, eventName: string) => {
            setState(prev => ({ ...prev, status: 'generating_qr' }));

            try {
                const qrResponse = await generatePaymentQR(
                    registrationId,
                    amount,
                    `TechXpression - ${eventName}`
                );

                if (isCancelledRef.current) return false;

                if (!qrResponse.success || !qrResponse.data) {
                    setState(prev => ({
                        ...prev,
                        status: 'failed',
                        error: qrResponse.error || 'Failed to generate payment QR',
                    }));
                    return false;
                }

                const qrData = { ...qrResponse.data, amount };

                setState(prev => ({
                    ...prev,
                    status: 'pending',
                    qrData,
                }));

                // Start polling for payment status
                await startPolling(qrData.merchantTransactionId, qrData.expiresAt);
                return true;
            } catch (error) {
                const message = error instanceof ApiError
                    ? error.message
                    : 'Failed to generate payment QR';

                setState(prev => ({
                    ...prev,
                    status: 'failed',
                    error: message,
                }));
                return false;
            }
        },
        [startPolling]
    );

    const initiateIndividualPayment = useCallback(
        async (
            registration: Omit<IndividualRegistration, 'eventId'>,
            eventId: number,
            amount: number
        ): Promise<boolean> => {
            isCancelledRef.current = false;
            cleanup();

            setState({
                status: 'registering',
                qrData: null,
                registrationId: null,
                error: null,
                timeRemaining: null,
            });

            try {
                const regResponse = await createIndividualRegistration({
                    ...registration,
                    eventId,
                });

                if (isCancelledRef.current) return false;

                if (!regResponse.success || !regResponse.data) {
                    setState(prev => ({
                        ...prev,
                        status: 'failed',
                        error: regResponse.error || 'Registration failed',
                    }));
                    return false;
                }

                const registrationId = regResponse.data.id;
                setState(prev => ({ ...prev, registrationId }));

                return await processPayment(registrationId, amount, 'Event Registration');
            } catch (error) {
                const message = error instanceof ApiError
                    ? error.message
                    : 'Registration failed';

                setState(prev => ({
                    ...prev,
                    status: 'failed',
                    error: message,
                }));
                return false;
            }
        },
        [cleanup, processPayment]
    );

    const initiateTeamPayment = useCallback(
        async (
            registration: Omit<TeamRegistration, 'eventId'>,
            eventId: number,
            amount: number
        ): Promise<boolean> => {
            isCancelledRef.current = false;
            cleanup();

            setState({
                status: 'registering',
                qrData: null,
                registrationId: null,
                error: null,
                timeRemaining: null,
            });

            try {
                const regResponse = await createTeamRegistration({
                    ...registration,
                    eventId,
                });

                if (isCancelledRef.current) return false;

                if (!regResponse.success || !regResponse.data) {
                    setState(prev => ({
                        ...prev,
                        status: 'failed',
                        error: regResponse.error || 'Team registration failed',
                    }));
                    return false;
                }

                const registrationId = regResponse.data.id;
                setState(prev => ({ ...prev, registrationId }));

                return await processPayment(registrationId, amount, 'Team Registration');
            } catch (error) {
                const message = error instanceof ApiError
                    ? error.message
                    : 'Team registration failed';

                setState(prev => ({
                    ...prev,
                    status: 'failed',
                    error: message,
                }));
                return false;
            }
        },
        [cleanup, processPayment]
    );

    return {
        ...state,
        initiateIndividualPayment,
        initiateTeamPayment,
        cancelPayment,
        reset,
    };
}
