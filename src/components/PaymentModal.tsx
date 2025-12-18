import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, XCircle, Loader2, Clock, Smartphone, QrCode } from 'lucide-react';
import type { QRCodeData } from '@/lib/api';
import type { PaymentStatus } from '@/hooks/useUpiPayment';
import NeonButton from './NeonButton';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    qrData: QRCodeData | null;
    status: PaymentStatus;
    timeRemaining: number | null;
    error: string | null;
    amount: number;
    eventName: string;
}

const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const PaymentModal = ({
    isOpen,
    onClose,
    qrData,
    status,
    timeRemaining,
    error,
    amount,
    eventName,
}: PaymentModalProps) => {
    const isLoading = status === 'registering' || status === 'generating_qr';
    const isPending = status === 'pending' || status === 'polling';
    const isSuccess = status === 'success';
    const isFailed = status === 'failed' || status === 'timeout';

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/85 backdrop-blur-md z-[60]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
                    >
                        <div className="relative w-full max-w-sm bg-card border border-primary/30 rounded-lg overflow-hidden shadow-2xl shadow-primary/20">
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />

                            {/* Header */}
                            <div className="relative p-4 border-b border-border flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-display text-primary neon-text-subtle">
                                        {isSuccess ? 'PAYMENT SUCCESSFUL' : isFailed ? 'PAYMENT FAILED' : 'COMPLETE PAYMENT'}
                                    </h2>
                                    <p className="text-xs text-muted-foreground mt-0.5 font-stranger tracking-wider">
                                        {eventName}
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="relative p-6">
                                {/* Loading State */}
                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col items-center gap-4 py-8"
                                    >
                                        <Loader2 className="w-12 h-12 text-primary animate-spin" />
                                        <p className="text-muted-foreground text-center">
                                            {status === 'registering' ? 'Creating registration...' : 'Generating payment QR...'}
                                        </p>
                                    </motion.div>
                                )}

                                {/* QR Code Display */}
                                {isPending && qrData && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex flex-col items-center gap-4"
                                    >
                                        {/* Amount */}
                                        <div className="text-center">
                                            <p className="text-sm text-muted-foreground">Amount to Pay</p>
                                            <p className="text-3xl font-display text-primary neon-text-subtle">
                                                ₹{amount}
                                            </p>
                                        </div>

                                        {/* QR Code */}
                                        <div className="relative p-4 bg-white rounded-lg">
                                            <img
                                                src={qrData.qrCodeDataUrl}
                                                alt="UPI QR Code"
                                                className="w-48 h-48"
                                            />
                                            {/* Scanning animation overlay */}
                                            <motion.div
                                                className="absolute inset-4 border-2 border-primary/50 rounded pointer-events-none"
                                                animate={{
                                                    opacity: [0.3, 0.7, 0.3],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: 'easeInOut',
                                                }}
                                            />
                                        </div>

                                        {/* UPI App Button */}
                                        <a
                                            href={qrData.upiLink}
                                            className="flex items-center gap-2 px-6 py-3 bg-primary/20 hover:bg-primary/30 border border-primary/50 rounded-lg text-primary transition-colors w-full justify-center"
                                        >
                                            <Smartphone className="w-5 h-5" />
                                            <span className="font-stranger tracking-wider">Pay with UPI App</span>
                                        </a>

                                        {/* Timer and Transaction ID */}
                                        <div className="w-full space-y-2 text-center">
                                            {timeRemaining !== null && (
                                                <div className="flex items-center justify-center gap-2 text-sm">
                                                    <Clock className="w-4 h-4 text-primary" />
                                                    <span className={`font-mono ${timeRemaining < 60 ? 'text-red-400' : 'text-muted-foreground'}`}>
                                                        Expires in {formatTime(timeRemaining)}
                                                    </span>
                                                </div>
                                            )}
                                            <p className="text-xs text-muted-foreground">
                                                Transaction ID: <span className="font-mono text-foreground">{qrData.merchantTransactionId}</span>
                                            </p>
                                        </div>

                                        {/* Waiting indicator */}
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                            >
                                                <QrCode className="w-4 h-4" />
                                            </motion.div>
                                            <span>Waiting for payment confirmation...</span>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Success State */}
                                {isSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center gap-4 py-8"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', damping: 10, stiffness: 200, delay: 0.1 }}
                                        >
                                            <CheckCircle className="w-16 h-16 text-green-400" />
                                        </motion.div>
                                        <div className="text-center">
                                            <p className="text-xl font-display text-green-400">Payment Successful!</p>
                                            <p className="text-sm text-muted-foreground mt-2">
                                                You have been registered for {eventName}
                                            </p>
                                        </div>
                                        <NeonButton onClick={onClose} className="mt-4">
                                            Done
                                        </NeonButton>
                                    </motion.div>
                                )}

                                {/* Failed State */}
                                {isFailed && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center gap-4 py-8"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', damping: 10, stiffness: 200, delay: 0.1 }}
                                        >
                                            <XCircle className="w-16 h-16 text-red-400" />
                                        </motion.div>
                                        <div className="text-center">
                                            <p className="text-xl font-display text-red-400">Payment Failed</p>
                                            <p className="text-sm text-muted-foreground mt-2">
                                                {error || 'Something went wrong. Please try again.'}
                                            </p>
                                        </div>
                                        <NeonButton onClick={onClose} variant="outline" className="mt-4">
                                            Close
                                        </NeonButton>
                                    </motion.div>
                                )}
                            </div>

                            {/* Bottom glow */}
                            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent ${isSuccess ? 'via-green-400' : isFailed ? 'via-red-400' : 'via-primary'} to-transparent`} />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default PaymentModal;
