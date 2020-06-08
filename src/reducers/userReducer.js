const UPDATA = "UPDATA"

const userReducer = (state = {avatar: false}, action) => {
    switch (action.type) {
        case UPDATA:
            const data = action.data
            const avatar = action.avatar
            return state = {...state, data, avatar}
        default:
            return state
    }
}

const userUPaction = (data) => {
    return {
        type: UPDATA,
        data: data,
        avatar: true
    }
}

export {userReducer, userUPaction}