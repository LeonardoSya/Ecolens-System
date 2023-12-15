import { useSafeState, useCreation } from './hooks.ts';

const useSelections = <T,>(lists: T[], initValues: T[] = []) => {
    const [selected, setSelected] = useSafeState<T[]>(initValues);

    //* 用useCreation创建了一个Set数据结构的selectedSet，用于存储选中的数据，确保选中数据的唯一性
    const selectedSet = useCreation(() => new Set(selected), [selected]);

    const isSelected = (data: T) => selectedSet.has(data);

    // 增加
    const selectAdd = (data: T | T[]) => {
        //* 判断传入的数据是单个还是数组
        if (Array.isArray(data)) {
            // 如果是数组，遍历数组并将每个元素添加到selectedSet中
            data.map((item) => selectedSet.add(item));
        } else {
            // 单个数据则直接添加                       
            selectedSet.add(data);
        }
        // 将selectedSet转为数组并更新选中状态，注意：通过new Set去处理选中的数据时，转化为数组需要使用Array.from
        return setSelected(Array.from(selectedSet));
    };

    // 删除
    const selectDel = (data: T | T) => {
        if (Array.isArray(data)) {
            data.map((item) => selectedSet.delete(item));
        } else {
            selectedSet.delete(data);
        }
        return setSelected(Array.from(selectedSet));
    };

    // 设置
    const setSelect = (data: T | T[]) => {
        selectedSet.clear();
        if (Array.isArray(data)) {
            data.map((item) => selectedSet.add(item));
        } else {
            selectedSet.add(data);
        }
        return setSelected(Array.from(selectedSet));
    };

    // 状态切换
    const toggle = (data: T) =>
        isSelected(data) ? selectDel(data) : selectAdd(data);

    // 全部未选中
    const noneSelected = useCreation(
        // 使用every方法遍历lists数组，检查每个元素是否都不在selectedSet集合中
        () => lists.every((ele) => !selectedSet.has(ele)),
        [lists, selectedSet]
    );

    // 全部选中
    const allSelected = useCreation(() => {
        return lists.every((ele) => selectedSet.has(ele));
    }, [lists, selectedSet])

    // 是否半选
    const partiallySelected = useCreation(
        () => !noneSelected && !allSelected,
        [noneSelected, allSelected]);

    // 全选
    const selectAll = () => {
        lists.map((item) => selectedSet.add(item));
        setSelected(Array.from(selectedSet));
    };

    // 全不选
    const unSelectAll = () => {
        lists.map((item) => selectedSet.delete(item));
        setSelected(Array.from(selectedSet));
    };

    const toggleAll = () => (allSelected ? unSelectAll() : selectAll());

    return {
        selected,   // 已选择的元素组
        isSelected,    // 某个元素是否被选择
        selectAdd,
        selectDel,
        toggle,
        setSelect,
        noneSelected,
        allSelected,
        partiallySelected,
        selectAll,
        unSelectAll,
        toggleAll,
    } as const;
};


export default useSelections;

//* Hooks是基于逻辑的，而非View层面的