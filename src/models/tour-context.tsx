/*
 * @Author: LeonardoSya 2246866774@qq.com
 * @Date: 2023-12-29 22:50:27
 * @LastEditors: LeonardoSya 2246866774@qq.com
 * @LastEditTime: 2023-12-30 23:34:11
 * @FilePath: \React\05_antd\02_布局\vite-project\src\models\tour-context.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
    const [open, setOpen] = useState<boolean>(true);

    const value = {
        refs: { ref1, ref2, ref3, ref4, ref5 },
        open,
        setOpen
    };

    return <GuideContext.Provider value={value}>{children}</GuideContext.Provider>;
}