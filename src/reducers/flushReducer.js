// 刷新评论
const FLUSH = "FLUSH"

const flushReducer = (state = {isComment: false}, action) => {
    switch (action.type) {
        case FLUSH:
            return {
                ...state,
                ...action.data,
                isComment: !state.isComment
            }
        default:
            return state
    }
}

const flushAction = (data) => {
    return {
        type: FLUSH,
        data
    }
}

export {flushReducer, flushAction}