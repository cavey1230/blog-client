import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {Modal} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";

import {getLocalStore, removeLocalStore} from "../../utils/localStorageUtils";
import {centerFormAction,centerFormINIT} from "../../reducers/centerFormReducer";

import "./create_normal.less"

const {confirm} = Modal;

@connect()
class PageCreateCenter extends Component {

    showPromiseConfirm = () => {
        const {dispatch} = this.props
        const main = getLocalStore("create_article_main")
        confirm({
            title: '有创建的文章被保留',
            icon: <ExclamationCircleOutlined/>,
            content: '是否继续编辑？',
            onOk: () => {
                dispatch(centerFormAction({main}))
                this.props.history.push("/create/new")
            },
            onCancel: () => {
                removeLocalStore("create_article_id")
                removeLocalStore("create_article_main")
                this.props.dispatch(centerFormINIT())
            }
        });
    }

    render() {
        const isPast = getLocalStore("create_article_id")
        if (isPast) {
            this.showPromiseConfirm()
        }
        return (
            <div className="create">
                <div className="create_title">
                    <div onClick={() => {
                        this.props.history.goBack()
                    }}>退出中心
                    </div>
                </div>
                <div className="create_container">
                    <div className="mode_pad">
                        <div>编辑还是新建？</div>
                        <div className="mode_pad_select">
                            <div><Link to="/create/edit" className="create_center_link">编辑</Link></div>
                            <div><Link to="/create/new/guide" className="create_center_link">新建</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageCreateCenter;