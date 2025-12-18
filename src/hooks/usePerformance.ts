import { useEffect, useRef } from 'react';

/**
 * Performance monitoring hook for development
 * Tracks component render times and FPS
 */
export const usePerformanceMonitor = (componentName: string, enabled = true) => {
    const renderCount = useRef(0);
    const lastRenderTime = useRef(performance.now());

    useEffect(() => {
        if (!enabled || process.env.NODE_ENV === 'production') return;

        renderCount.current++;
        const currentTime = performance.now();
        const renderDuration = currentTime - lastRenderTime.current;

        if (renderDuration > 16.67) { // Below 60 FPS threshold
            console.warn(
                `[Perf] ${componentName}: Render #${renderCount.current} took ${renderDuration.toFixed(2)}ms (below 60 FPS)`
            );
        }

        lastRenderTime.current = currentTime;
    });
};

/**
 * Hook to defer non-critical renders
 * Useful for below-the-fold content
 */
export const useDeferredRender = (delay = 100) => {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShouldRender(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return shouldRender;
};

/**
 * Hook to detect if element is in viewport
 * For lazy loading components
 */
export const useIntersectionObserver = (
    options: IntersectionObserverInit = {}
) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [hasIntersected, setHasIntersected] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
                if (entry.isIntersecting && !hasIntersected) {
                    setHasIntersected(true);
                }
            },
            { threshold: 0.1, rootMargin: '100px', ...options }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [options, hasIntersected]);

    return { ref, isIntersecting, hasIntersected };
};

// Re-export useState for useDeferredRender
import { useState } from 'react';
