/*!
 * 此组件 定义 所有页面下三级联动选项
 *
 * 功能：获取 三级联动选项 查找 选定标签下所有文章
 *
 */

import React, {Component} from 'react';
import {Cascader, message} from 'antd';
import {connect} from "react-redux";

import {GetSelectItem} from "../../../../api/index";
import {selectAction} from "../../../../reducers/selectReducer";
import getAllArticleUtils from "../../../../utils/getAllArticleUtils";
import {getLocalStore, saveLocalStore} from "../../../../utils/localStorageUtils";

class ConRadio extends Component {
    state = {
        options: []
    };

    getSelectItem = async () => {
        const result = await GetSelectItem()
        if (result.status === 0) {
            return result.data
        } else {
            message.error(result.message)
        }
    }

    componentDidMount() {
        this.getSelectItem().then(
            res => this.setState({
                options: res
            })
        )
    }
    selectItem = getLocalStore("selectItem", "session")

    onChange = (value) => {
        let lastValue = (value.slice(-1)).toString()
        if (lastValue === "") {
            lastValue = "none"
        }
        getAllArticleUtils(1, lastValue).then(
            res => {
                saveLocalStore(1, "clickPage", "session")
                saveLocalStore(lastValue, "selectItem", "session")
                this.props.dispatch(selectAction({...res, lastValue}))
            }
        )
    }

    displayRender(label) {
        return label[label.length - 1];
    }

    render() {
        return (
            <Cascader
                defaultValue={
                    this.selectItem?this.selectItem==="none"? []:[this.selectItem]:["点我筛选文章"]
                }
                options={this.state.options}
                expandTrigger="hover"
                onChange={this.onChange}
                displayRender={this.displayRender}
                placeholder="文章筛选"
            />
        );
    }
}

export default connect()(ConRadio);