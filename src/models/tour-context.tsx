import React, { createContext, useRef, useState } from 'react';

export const GuideContext = createContext({
    refs: {
        ref1: { current: null },
        ref2: { current: null },
        ref3: { current: null },
        ref4: { current: null },
        ref5: { current: null },
    },
    open: false,
    setOpen: (value: boolean) => { }
});

export const GuideProvider = ({ children }) => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);
    const [open, setOpen] = useState<boolean>(false);

    const value = {
        refs: { ref1, ref2, ref3, ref4, ref5 },
        open,
        setOpen,
    };

    return <GuideContext.Provider value={value}>{children}</GuideContext.Provider>;
}