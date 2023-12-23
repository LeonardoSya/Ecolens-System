import { useRef } from "react";

// * useRef高级用法：缓存数据
//* 无论传入什么类型，都要返回对应的类型 ———— 泛型
const useLatest = <T,>(value: T): { readonly current: T } => {  //* 这个钩子返回的永远是最新值，这个钩子的入参和出参都是这个值
    const ref = useRef(value);
    ref.current = value;

return ref;  //* 返回一个current对象，包含一个readonly的current属性，这样外部使用这个hook组件只能读取current而不能修改
};

export default useLatest;