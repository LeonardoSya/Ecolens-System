import { useEffect } from 'react';
import useLatest from './useLatest';

const useUnmount = (fn: () => void) => {

    //* useLatest用于确保在组件卸载时执行的回调是最新的
    const fnRef = useLatest(fn);

    //* 当组件即将卸载时([]触发)，会执行fnRef.current()清理函数
    useEffect(() => () => {
        fnRef.current();
    }, []);
};

export default useUnmount;


//* useUnmount的作用是在在组件卸载时执行传入的回调函数