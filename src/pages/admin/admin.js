import React, {Component} from 'react';
import {Divider} from "antd";

import PageAdminRecommend from "./page_admin_com/page_admin_recommend";
import PageAdminTarget from "./page_admin_com/page_admin_target";

import "./admin.less"


class Admin extends Component {
    render() {
        return (
            <div className="admin">
                <Divider>首页推荐管理</Divider>
                <PageAdminRecommend/>
                <Divider>标签管理</Divider>
                <PageAdminTarget/>
            </div>
        );
    }
}

export default Admin;