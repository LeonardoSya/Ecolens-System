import { useDebounceFn, useSafeState, useCreation } from './hooks';

import type DebounceOptions from './useDebounceFn';

const useDebounce = <T,>(value: T, options?: DebounceOptions) => {
    const [debounced, setDebounced] = useSafeState(value);

    const run = useDebounceFn(() => {
        setDebounced(value);
    }, options);

    useCreation(() => {
        run();
    }, [value]);

    return debounced;
};

export default useDebounce;

// 使用方法：
// const debouncedValue = useDebounce(
//     value:any,
//     options?:Options
// )