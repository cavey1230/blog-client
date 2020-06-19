/*!
 * 此组件 定义 所有页面下三级联动选项
 *
 * 功能：获取 三级联动选项 查找 选定标签下所有文章
 *
 */

import React, {Component} from 'react';
import {Cascader, message} from 'antd';

import {GetSelectItem} from "../../../../api/index";
import {getLocalStore} from "../../../../utils/localStorageUtils";

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

    displayRender(label) {
        return label[label.length - 1];
    }

    render() {
        let {defaultValue,value} = this.props
        return (
            <Cascader
                defaultValue={defaultValue}
                value={[value]}
                options={this.state.options}
                expandTrigger="hover"
                onChange={this.props.onChange}
                displayRender={this.displayRender}
                placeholder="用于文章筛选"
            />
        );
    }
}

export default ConRadio;