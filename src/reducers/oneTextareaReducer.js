const ONE_TEXTAREA = "ONE_TEXTAREA"

const oneTextareaReducer = (state = "", action) => {
    switch (action.type) {
        case ONE_TEXTAREA:
            return action.data
        default:
            return state
    }
}

const oneTextareaAction = (string) => {
    return {
        type: ONE_TEXTAREA,
        data: string
    }
}

export {oneTextareaReducer, oneTextareaAction}