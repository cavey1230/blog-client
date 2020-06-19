import React, {Component} from 'react';
import {connect} from "react-redux";

import PageSteps from "./page_create_com/steps/page_create_steps";
import {removeLocalStore} from "../../utils/localStorageUtils";
import {centerFormINIT} from "../../reducers/centerFormReducer";

import "./create_normal.less"

@connect()
class PageCreateNewGuide extends Component {

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
                <div className="create_center_new">
                    <PageSteps/>
                </div>
            </div>
        );
    }
}

export default PageCreateNewGuide;