const UPDATA = "UPDATA"
const DEL = "DEL"

const userReducer = (state = {avatar: false}, action) => {
    switch (action.type) {
        case UPDATA:
            const data = action.data
            const avatar = action.avatar
            return state = {...state, data, avatar}
        case  DEL:
            return {avatar:false}
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
const userDELaction = () => {
    return {
        type:DEL
    }
}

export {userReducer, userUPaction,userDELaction}