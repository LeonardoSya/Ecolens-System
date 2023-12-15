import { useRef } from 'react';
import type { DependencyList } from 'react';

const depsAreSame = (   //* 比较两个依赖数组是否相同，相同则返回缓存的值
    oldDeps: DependencyList,
    deps: DependencyList
): boolean => {
    if (oldDeps === deps) return true;

    for (let i = 0; i < oldDeps.length; i++) {
        if (!Object.is(oldDeps[i], deps[i])) return false;
    }

    return true;
};

const useCreation = <T,>(fn: () => T, deps: DependencyList) => {  //* 出参入参应保持一致，入参有两个，第一个对应函数，第二个对应数组

    //* 针对useMemo可能拿不到最新值的情况，可直接依赖useRef的高级用法来保存最新值
    //* 用useRef创建这个对象的目的是为了保持deps, obj, initialized在多次渲染中的持久性， 这样可以在多次渲染之间共享同一个对象，而不会因为组件的重新渲染而丢失状态
    //* 这种模式的常见用途是在自定义Hooks中保持某些状态的持久性，同时在多次渲染间共享同一个状态，在这里deps,obj,initialized就是useCreation中需要跨渲染周期保持一致的状态
    const { current } = useRef({
        deps,
        obj: undefined as undefined | T,
        initialized: false,   //* 用于标识useCreation是否已经被初始化
    });

    //* 触发更新条件：比较每次传入的数组，若不同则触发和更新对应函数
    if (current.initialized === false || !depsAreSame(current.deps, deps)) {
        current.deps = deps;
        current.obj = fn();
        current.initialized = true;
    }

    return current.obj as T;   //* 出参入参应保持一致
};

export default useCreation;

//* useCreation如何增强useMemo和useRef?
//**  useMemo的第一个参数fn会缓存对应的值，那么这个值有可能拿不到最新的值，useCreation拿到的值永远是最新值
//**  useRef在创建复杂常量的时候会出现潜在的性能隐患(如 new Subject)，useCreation可以有效避免

//* useCreation返回obj，即fn的返回值
// const createdValue = useCreation(() => {
//     这里是一些需要持久化的计算或创建过程
//     return computeValue();
// }, [deps]);
// 使用创建的值
// console.log(createdValue);   