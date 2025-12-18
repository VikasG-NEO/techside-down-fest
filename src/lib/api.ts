/**
 * API Service Layer for TechXpression Backend
 * Handles registration and payment endpoints
 */

// API Base URL - configurable via environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// ============ Types ============

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    statusCode?: number;
    timestamp?: string;
}

export interface IndividualRegistration {
    name: string;
    email: string;
    phone: string;
    college: string;
    courseYear: string;
    eventId: number;
}

export interface TeamRegistration {
    teamName: string;
    leaderName: string;
    leaderEmail: string;
    leaderPhone: string;
    college: string;
    courseYear: string;
    eventId: number;
    members: Array<{ name: string; email: string }>;
}

export interface RegistrationResponse {
    id: number;
    name?: string;
    teamName?: string;
    email?: string;
    eventId: number;
    status: string;
    createdAt: string;
}

export interface QRCodeData {
    qrCodeDataUrl: string;
    upiLink: string;
    merchantTransactionId: string;
    expiresAt: string;
    amount: number;
}

export interface PaymentStatusData {
    status: 'pending' | 'success' | 'failed';
    transactionId: string;
    amount?: number;
    completedAt?: string;
}

// ============ API Client ============

class ApiError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public response?: unknown
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new ApiError(
                data.error || 'An error occurred',
                response.status,
                data
            );
        }

        return data as ApiResponse<T>;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        // Network or parsing error
        throw new ApiError(
            error instanceof Error ? error.message : 'Network error',
            0
        );
    }
}

// ============ Registration API ============

/**
 * Create an individual registration
 */
export async function createIndividualRegistration(
    data: IndividualRegistration
): Promise<ApiResponse<RegistrationResponse>> {
    return apiRequest<RegistrationResponse>('/registrations/individual', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

/**
 * Create a team registration
 */
export async function createTeamRegistration(
    data: TeamRegistration
): Promise<ApiResponse<RegistrationResponse>> {
    return apiRequest<RegistrationResponse>('/registrations/team', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

// ============ Payment API ============

/**
 * Generate UPI QR code for payment
 */
export async function generatePaymentQR(
    registrationId: number,
    amount: number,
    description?: string
): Promise<ApiResponse<QRCodeData>> {
    return apiRequest<QRCodeData>('/payments/generate-qr', {
        method: 'POST',
        body: JSON.stringify({
            registrationId,
            amount,
            description: description || 'TechXpression Event Registration',
        }),
    });
}

/**
 * Check payment status
 * Note: This endpoint may require authentication in production
 */
export async function checkPaymentStatus(
    transactionId: string,
    token?: string
): Promise<ApiResponse<PaymentStatusData>> {
    const headers: HeadersInit = {};

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return apiRequest<PaymentStatusData>(`/payments/status/${transactionId}`, {
        method: 'GET',
        headers,
    });
}

export { ApiError };
