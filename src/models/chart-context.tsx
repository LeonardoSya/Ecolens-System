import React, { createContext, useCallback } from 'react';
import useSafeState from '../hooks/useSafeState';

export const ChartContext = createContext<{
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    forceCollapsed: () => void;
    toggleCollapsed: () => void;
}>({
    collapsed: false,
    setCollapsed: () => { },
    forceCollapsed: () => { },
    toggleCollapsed: () => { },
});

export const ChartProvider = ({ children }: any) => {
    const [collapsed, setCollapsed] = useSafeState(false);

    const forceCollapsed = useCallback(() => {
        setCollapsed(true);
    }, [collapsed]);

    const toggleCollapsed = useCallback(() => {
        setCollapsed(prev => !prev);
    }, [collapsed])

    return (
        <ChartContext.Provider value={{
            collapsed,
            setCollapsed,
            forceCollapsed,
            toggleCollapsed,
        }}>
            {children}
        </ChartContext.Provider>
    )
}