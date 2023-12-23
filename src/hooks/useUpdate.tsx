import { useReducer } from "react";

function useUpdate(): () => void {
    const [, update] = useReducer((num: number): number => num + 1, 0);

    return update;
}

export default useUpdate;

//* 强制组件重新渲染，具体做法是搞个累加器和无关的变量，每触发一次就累加1，这样就会强制刷新