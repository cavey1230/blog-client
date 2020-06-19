import React, {Component} from "react";
import {Steps, message, Input, Switch} from 'antd';
import {withRouter} from "react-router-dom"

import formOrder from "../../../../highOrder/formOrder";
import ConRadio from "../../../../components/content/con_web_com/radio/con_radio";

import "./page_create_steps.less";

const {Step} = Steps;
const {TextArea} = Input;

@formOrder
@withRouter
class PageSteps extends Component {

    state = {
        current: 0,
    };

    steps = [
        {title: '请输入文章标题'},
        {title: '请选择文章标签'},
        {title: '请输入文章简介'}
    ];

    next() {
        const current = this.state.current + 1;
        this.setState({current});
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({current});
    }


    render() {
        const {current} = this.state;
        const {getFiledDec, onFinish} = this.props;
        return (
            <div>
                <Steps current={current}>
                    {this.steps.map(item => (
                        <Step key={item.title} title={item.title}/>
                    ))}
                </Steps>
                <div className="steps-content">
                    {current === 0 ?
                        <div className="steps-content-form">
                            <span>标题最大为30字符,最小2字符</span>
                            {getFiledDec("title", {
                                rules: [{required: true, message: "标题是必选项"},
                                    {min: 2, message: "标题不能低于2字符"}, {max: 30, message: "标题不能多于30字符"}]
                            })(<Input/>)}
                        </div> : current === 1 ?
                            <div className="steps-content-form">
                                <span>标签为必选项，可后续修改</span>
                                {getFiledDec("target", {
                                    rules: [{required: true, message: "标签是必选项"}]
                                })(<ConRadio className="red"/>)}
                            </div> :
                            <div className="steps-content-form">
                                <span>状态默认为私有，文章不会被推荐，但可通过地址栏访问</span>
                                {getFiledDec("referral", {
                                    rules: [{required: true, message: "简介是必选项"},
                                        {min: 2, message: "简介不能低于2字符"}, {max: 100, message: "简介不能多于100字符"}]
                                })(<TextArea rows={1}/>)}
                                {getFiledDec("publicStatus", {
                                    rules: []
                                })(<Switch/>)}
                            </div>}
                </div>
                <div className="steps-action">
                    {current < this.steps.length - 1 && (
                        <div>
                            <span onClick={() => this.next()}>
                            下一步
                            </span>
                        </div>
                    )}
                    {current === this.steps.length - 1 && (
                        <div>
                            <span onClick={() => onFinish().then(res => {
                                if (res.status === 0) {
                                    message.success(res.message)
                                    this.props.history.replace("/create/new")
                                } else {
                                    message.error(res.message)
                                }
                            })}>
                            完成
                            </span>
                        </div>
                    )}
                    {current > 0 && (
                        <div>
                            <span onClick={() => this.prev()}>
                                上一步
                            </span>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default PageSteps
