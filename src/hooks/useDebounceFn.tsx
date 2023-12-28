//* 入参：func(防抖函数) wait(超时时间/s) leading(是否延迟开始前调用的函数) trailing(是否在延迟开始后调用函数) maxWait(最大等待时间)
//* 出参：触发防抖的函数
//* 优化：用useLatest处理对应的func，保证函数最新值，利用useCreation优化整个debounce，利用useUnmount在卸载时调用cancel方法卸载组件
import { useLatest, useUnmount, useCreation } from './hooks';
import debounce from 'lodash/debounce';

type noop = (...args: any[]) => any;

interface DebounceOptions {
    wait?: number;
    leading?: boolean;
    trailing?: boolean;
    maxWait?: number;
}
const useDebounceFn = <T extends noop>(fn: T, options?: DebounceOptions) => {
    const fnRef = useLatest(fn);

    const debounced = useCreation(() =>
        debounce(
            (...args: Parameters<T>): ReturnType<T> => fnRef.current(...args),
            options?.wait ?? 1000,   //* ?? 是ES11新语法，空值合并运算符，只在左边值严格等于nuhll/undefined时起作用
            options
        )
        , []);

    useUnmount(() => {
        debounced.cancel();
    });

    return debounced;
};

export default useDebounceFn;

//* 处理防抖函数 (处理防抖值是useDebounce)
// 使用方法：
// const run = useDebounceFn(
//     fn: (...args: any[]) => any,
//     options ?: Options
// )