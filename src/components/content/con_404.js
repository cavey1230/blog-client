import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {saveLocalStore} from "../../utils/localStorageUtils";
import {clickHeadAction} from "../../reducers/clickHeadReducer";

import "./normal.less";

@connect()
class Con404 extends Component {

    handleClick = (url) => {
        const {dispatch} = this.props
        saveLocalStore(url, "clickHeadKey", "session")
        dispatch(clickHeadAction(url))
    }

    render() {
        return (
            <div className="content_reset">
                <div className="con_404">
                    <div className="con_404_img"/>
                    <div className="con_404_tips">不好意思，暂无此页面，你可以</div>
                    <div className="con_404_tips">
                        <Link onClick={()=>this.handleClick("/")} to="/">
                            <span>返回首页</span>
                        </Link>
                        <Link onClick={()=>this.handleClick("/web")} to="/web">
                            <span>返回文章页</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    };
}


export default Con404;