import React from 'react';
import "./normal.less"
import {Link} from "react-router-dom";

const Con404 = () => {
    return (
        <div className="content_reset">
            <div className="con_404">
                <img src="../../assets/404.jpg" alt="404"/>
                <Link to="/">
                    <div className="con_404_tips">回到首页</div>
                </Link>
            </div>
        </div>
    );
};

export default Con404;