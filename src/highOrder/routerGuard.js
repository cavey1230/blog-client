import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {getLocalStore, removeLocalStore} from "../utils/localStorageUtils";
import {clickHeadAction} from "../reducers/clickHeadReducer";

@connect()
class RouterGuard extends Component {

    componentDidMount() {
        removeLocalStore("clickHeadKey", "session")
        this.props.dispatch(clickHeadAction(""))
    }

    render() {
        const {component: Component, ...rest} = this.props
        const user_info = getLocalStore()
        const id = user_info ? user_info._id : undefined
        return (
            <Route {...rest} render={props => id ? <Component {...props} /> : <Redirect to="/"/>}/>
        )
    }
}

export default RouterGuard