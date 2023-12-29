import { useLatest, useUnmount, useCreation } from './hooks';
import throttle from 'lodash/throttle';

type noop = (...args: any[]) => any;

interface ThrottleOptions {
    wait?: number;
    leading?: boolean;
    trailing?: boolean;
}

const useThrottleFn = <T extends noop>(fn: T, options?: ThrottleOptions) => {
    const fnRef = useLatest(fn);

    const throttled = useCreation(() =>
        throttle(
            (...args: Parameters<T>): ReturnType<T> => fnRef.current(...args),
            options?.wait ?? 1000,   //* ?? 是ES11新语法，空值合并运算符，只在左边值严格等于nuhll/undefined时起作用
            options
        )
        , []);

    useUnmount(() => {
        throttled.cancel();
    });

    return throttled;
}

export default useThrottleFn;
