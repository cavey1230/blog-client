const SEND = "SEND"
const INIT = "INIT"

const centerFormReducer = (state = {
    main: "",
    title: "",
    referral: "",
    publicStatus: false,
    target: "",
    _id: ""
}, action) => {
    switch (action.type) {
        case SEND:
            return {...state, ...action.data}
        case INIT:
            return {
                main: "",
                title: "",
                referral: "",
                publicStatus: false,
                target: "",
                _id: ""
            }
        default:
            return state
    }
}

const centerFormAction = (data) => {
    return {
        type: SEND,
        data
    }
}

const centerFormINIT = () => {
    return {
        type: INIT
    }
}

export {centerFormReducer, centerFormAction,centerFormINIT}