import React from 'react';
import "./normal.less"
import {Link} from "react-router-dom";

const Con404 = () => {
    return (
        <div className="content_reset">
            <div className="con_404">
                <div className="con_404_img"/>
                <div className="con_404_tips">不好意思，暂无此页面，你可以</div>
                <div className="con_404_tips">
                    <Link to="/">
                        <span>返回首页</span>
                    </Link>
                    <Link to="/web">
                        <span>返回文章页</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Con404;