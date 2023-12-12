import {useRef} from 'react';
import type {DependencyList} from 'react';

const depsAreSame = (
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
    const { current } = useRef({
        deps,
        obj: undefined as undefined | T,
        initialized: false,
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