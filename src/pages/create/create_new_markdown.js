import React, {Component} from 'react';
import {connect} from "react-redux";

import {getLocalStore, removeLocalStore} from "../../utils/localStorageUtils";
import {centerFormINIT} from "../../reducers/centerFormReducer";

import "./create_normal.less"
import PageMarkdown from "./page_create_com/markdown/page_create_markdown";
import {PostUpdateArticle} from "../../api";
import {message} from "antd";

@connect(state => ({centerFormReducer: state.centerFormReducer}))
class PageCreateNewMarkDown extends Component {

    componentWillUnmount() {
        removeLocalStore("storeArticle", "session")
        this.props.dispatch(centerFormINIT())
    }

    render() {
        return (
            <div className="create">
                <div className="create_title">
                    <div onClick={() => {
                        this.props.history.goBack()
                    }}>返回中心
                    </div>
                    <div onClick={() => {
                        const id = getLocalStore("create_article_id")
                        const {main} = this.props.centerFormReducer
                        if (id) {
                            PostUpdateArticle(id, {main}).then(res => {
                                const {status, message: msg} = res
                                if (status === 0) {
                                    message.success(msg)
                                } else {
                                    message.error(msg)
                                }
                            })
                        } else {
                            message.error("抱歉没有获取到新建文章id,请新建文章后再保存")
                        }
                    }}>保存文章
                    </div>
                </div>
                <div className="create_new_markdown">
                    <PageMarkdown isSaveMain={true}/>
                </div>
            </div>
        );
    }
}

export default PageCreateNewMarkDown;