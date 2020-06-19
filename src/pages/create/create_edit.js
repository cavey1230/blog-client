import React, {Component} from 'react';
import {connect} from "react-redux";

import PageList from "./page_create_com/list/page_create_list";
import PageMarkdown from "./page_create_com/markdown/page_create_markdown";
import {removeLocalStore} from "../../utils/localStorageUtils";
import {centerFormINIT} from "../../reducers/centerFormReducer";

import "./create_normal.less"

@connect()
class PageCreateEdit extends Component {

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
                </div>
                <div className="create_center_edit">
                    <div className="left_pad">
                        <PageList/>
                    </div>
                    <div className="right_pad">
                        <PageMarkdown/>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageCreateEdit;