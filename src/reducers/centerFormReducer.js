const SEND = "SEND"

const centerFormReducer = (state = "", action) => {
    switch (action.type) {
        case SEND:
            return action.text
        default:
            return state
    }
}

const centerFormAction = (text) => {
    return {
        type: SEND,
        text
    }
}

export {centerFormReducer, centerFormAction}