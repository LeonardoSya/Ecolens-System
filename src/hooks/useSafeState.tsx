import type { Dispatch, SetStateAction } from "react";
import { useCallback, useState } from 'react';
import useUnmountedRef from "./useUnmountedRef";


//* useSafeState函数返回一个元组，包含两个元素：1. 当前状态值S的类型，表示组件的状态  2. 用于更新状态的Dispatch<SetStateAction<S>>，表示可以接受新状态值或者一个函数来计算新状态值的派发函数
//* 入参initialState(非必须)，所以可能传入S类型 或 undefined，其中S分是否为函数，所以写法为函数重载(在同一个函数下定义多种类型值，最后汇总到一块)

// * 函数重载写法的签名如下
function useSafeState<S>(
    initialState: S | (() => S)   //* 惰性地计算初始状态值
): [S, Dispatch<SetStateAction<S>>];  //* Dispatch<SetStateAction<S>>这种写法是固定的，就是对应useState第二个参数

function useSafeState<S = undefined>(): [
    S | undefined,
    Dispatch<SetStateAction<S | undefined>>
];


function useSafeState<S>(initialState?: S | (() => S)) {
    const unmountRef: { current: boolean } = useUnmountedRef();
    const [state, setState] = useState(initialState);
    const setCurrentState = useCallback((currentState: any) => {
        if (unmountRef.current) return;
        setState(currentState);
    }, []);

    return [state, setCurrentState] as const;  //* 出参用【断言】的写法，as count标记为不可变(readonly)
}

export default useSafeState;
