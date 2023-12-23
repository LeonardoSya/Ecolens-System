import React, { useEffect, useRef, useCallback } from "react";

function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number): T {
    const latestCallback = useRef(callback);
    const latestTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        latestCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        return () => {
            if (latestTimeout.current) {
                clearTimeout(latestTimeout.current);
            }
        }
    }, []);

    return useCallback((...args: Parameters<T>) => {
        if (latestTimeout.current) {
            clearTimeout(latestTimeout.current);
        }
        latestTimeout.current = setTimeout(() => {
            latestCallback.current(...args);
        }, delay);
    }, [delay]) as T;
}

export default useDebounce;