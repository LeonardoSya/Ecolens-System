import { useEffect, useRef } from 'react';

const useUnmountedRef = (): { readonly current: boolean } => {
    const unmountedRef = useRef<boolean>(false);

    //* 利用useEffect的状态，来保存对应的值
    useEffect(() => {
        unmountedRef.current = false;
        return () => {
            unmountedRef.current = true;
        };
    }, []);

    return unmountedRef;
};

export default useUnmountedRef;

//* 用于获取一个表示组件是否已卸载的引用。在组件卸载后，该引用将被设置为true