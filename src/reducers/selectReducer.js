/*!
 * 此组件 定义 指定标签指定分页下列表组
 *
 * 功能：展示 列表数据 复查 用户指定标签分页数据
 *
 */

import {getLocalStore} from "../utils/localStorageUtils";

const UPDATASELECT = "UPDATASELECT"
const selectItem = getLocalStore("selectItem", "session")

const selectReducer = (
    state = {
        lastValue: selectItem && selectItem !== "" ? selectItem : "none"
    },
    action
) => {
    switch (action.type) {
        case UPDATASELECT:
            return action.data
        default:
            return state
    }
}

const selectAction = (data) => {
    return {
        type: UPDATASELECT,
        data: data
    }
}

export {selectReducer, selectAction}