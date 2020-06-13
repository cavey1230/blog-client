/*!
 * 此组件 定义 指定文章页下面包屑
 *
 * 功能：替换指定字符为字符串，供面包屑展示
 *
 */

import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Breadcrumb} from 'antd';
import {connect} from 'react-redux';

import {saveLocalStore} from "../../../utils/localStorageUtils";
import {clickHeadAction} from "../../../reducers/clickHeadReducer";

class ConBreadcrumb extends Component {
    breadcrumbNameMap = {
        '/web': 'web教程',
        '/article': '返回搜索页'
    };

    handleClick = () => {
        saveLocalStore("/", "clickHeadKey", "session")
        this.props.dispatch(clickHeadAction("/"))
    }

    location = this.props.location;
    // filter 筛选有效信息
    pathSnippets = this.location.pathname.split('/').filter(i => i);
    // 返回 解析location.pathname替换字符后 数组
    extraBreadcrumbItems = this.pathSnippets.map((_, index) => {
        const url = `/${this.pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url === "/article" ? "/web" : url}>
                    {
                        this.breadcrumbNameMap[url] ?
                            this.breadcrumbNameMap[url] :
                            url.split("/").filter(i => i)[1]
                    }
                </Link>
            </Breadcrumb.Item>
        );
    });
    // 组合 面包屑开头 返回 面包屑内部Item
    breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <Link onClick={()=>this.handleClick()} to="/">首页</Link>
        </Breadcrumb.Item>,
    ].concat(this.extraBreadcrumbItems)



    render() {
        return (
            <div>
                <Breadcrumb>{this.breadcrumbItems}</Breadcrumb>
            </div>
        );
    }
}

// withRouter 使普通路由能访问 history location
export default connect()(withRouter(ConBreadcrumb))