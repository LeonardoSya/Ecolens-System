import { useEffect } from 'react';
import useLatest from './useLatest';

const useEventListener = (
    event: string,  //*  要监听的事件类型, 如click,keydown
    handler: (...e: any) => void,   //* 当监听到指定事件时, 会调用该回调函数
    target?: any   //* 可选，要在哪个DOM元素上添加事件监听器，默认window
) => {
    const handlerRef = useLatest(handler);   // * 存储最新的事件处理函数

    useEffect(() => {
        // 支持useRef 和 DOM节点
        let targetElement: any;
        //* 确定添加事件监听器的目标元素
        if (!target) {
            targetElement = window;  // * target默认为window
        } else if ("current" in target) {
            targetElement = target.current;
        } else {
            targetElement = target;
        }

        //  防止没有 addEventListener 这个属性
        if (!targetElement?.addEventListener) return;

        const useEventListener = (event: Event) => {
            return handlerRef.current(event);
        };
        //* 在目标元素上添加事件监听器，监听指定的事件类型，当事件发生时调用useEventListener
        targetElement.addEventListener(event, useEventListener);

        return () => {
            targetElement.removeEventListener(event, useEventListener);  //* cleanup中移除事件监听器，确保在组件卸载时取消事件监听
        };
    }, [event, target]);
};

export default useEventListener;

//* 在组件中方便地监听各种事件，管理事件的添加和移除