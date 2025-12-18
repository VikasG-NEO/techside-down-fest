import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Development-only Performance Monitor
 * Shows FPS, memory usage, and render count
 * Only renders in development mode
 */
const DevPerformanceMonitor = () => {
    // Only render in development
    if (import.meta.env.PROD) return null;

    const [fps, setFps] = useState(60);
    const [memory, setMemory] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [isMinimized, setIsMinimized] = useState(false);
    const frameCount = useRef(0);
    const lastTime = useRef(performance.now());
    const animationRef = useRef<number>();

    const updateFPS = useCallback(() => {
        frameCount.current++;
        const now = performance.now();
        const delta = now - lastTime.current;

        if (delta >= 1000) {
            setFps(Math.round((frameCount.current * 1000) / delta));
            frameCount.current = 0;
            lastTime.current = now;

            // Get memory if available (Chrome only)
            const perfWithMemory = performance as Performance & {
                memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number };
            };
            if (perfWithMemory.memory) {
                setMemory(Math.round(perfWithMemory.memory.usedJSHeapSize / 1048576));
            }
        }

        animationRef.current = requestAnimationFrame(updateFPS);
    }, []);

    useEffect(() => {
        animationRef.current = requestAnimationFrame(updateFPS);
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [updateFPS]);

    // Toggle with keyboard shortcut (Ctrl+Shift+P)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'P') {
                e.preventDefault();
                setIsVisible((v) => !v);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (!isVisible) return null;

    const getFpsColor = () => {
        if (fps >= 55) return 'text-green-400';
        if (fps >= 30) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <div
            className="fixed bottom-4 left-4 z-[9999] font-mono text-xs select-none"
            style={{ pointerEvents: 'auto' }}
        >
            <div className="bg-black/90 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
                {/* Header */}
                <div
                    className="flex items-center justify-between px-3 py-1.5 bg-gray-800/50 cursor-pointer"
                    onClick={() => setIsMinimized((m) => !m)}
                >
                    <span className="text-gray-400 text-[10px] uppercase tracking-wider">
                        ⚡ Dev Monitor
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsVisible(false);
                        }}
                        className="text-gray-500 hover:text-white ml-2"
                    >
                        ×
                    </button>
                </div>

                {/* Stats */}
                {!isMinimized && (
                    <div className="px-3 py-2 space-y-1">
                        {/* FPS */}
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500">FPS</span>
                            <span className={`font-bold ${getFpsColor()}`}>{fps}</span>
                        </div>

                        {/* Memory (Chrome only) */}
                        {memory !== null && (
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">Memory</span>
                                <span className="text-blue-400">{memory} MB</span>
                            </div>
                        )}

                        {/* Performance hints */}
                        {fps < 30 && (
                            <div className="text-red-400 text-[10px] pt-1 border-t border-gray-700 mt-1">
                                ⚠️ Low FPS detected
                            </div>
                        )}
                    </div>
                )}

                {/* Minimized view */}
                {isMinimized && (
                    <div className="px-3 py-1">
                        <span className={`font-bold ${getFpsColor()}`}>{fps}</span>
                        <span className="text-gray-500 ml-1">fps</span>
                    </div>
                )}
            </div>

            {/* Keyboard hint */}
            <div className="text-[9px] text-gray-600 text-center mt-1">
                Ctrl+Shift+P to toggle
            </div>
        </div>
    );
};

export default DevPerformanceMonitor;
