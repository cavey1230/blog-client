import {getLocalStore} from "../utils/localStorageUtils";

const CLICKHEAD = "CLICKHEAD"

const clickHeadKey = getLocalStore("clickHeadKey", "session")

const clickHeadReducer = (state = clickHeadKey || "", action) => {
    switch (action.type) {
        case CLICKHEAD:
            return action.data
        default:
            return state
    }
}

const clickHeadAction = (data) => {
    return {
        type: CLICKHEAD,
        data
    }
}

export {clickHeadReducer, clickHeadAction}