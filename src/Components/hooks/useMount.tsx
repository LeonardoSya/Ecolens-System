import { useEffect } from 'react';

const useMount = (fn:()=>void) => {
    useEffect(()=> {
        fn?.();   //* 通过可选链操作符?.调用传入的fn，可以确保fn存在，以防止传入undefined或null
    }, []);
};

export default useMount;

// * 只在组件初始化执行的hook