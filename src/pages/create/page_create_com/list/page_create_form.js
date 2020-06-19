import React, {Component} from 'react';
import {Input, Divider, Button, Switch} from 'antd';

import ConRadio from "../../../../components/content/con_web_com/radio/con_radio";
import formOrder from "../../../../highOrder/formOrder";

const {TextArea} = Input

@formOrder
class PageForm extends Component {

    CreateDivider = ({children}) => {
        return <Divider style={{fontSize: "14px"}}>{children}</Divider>
    }

    render() {
        const {getFiledDec, onFinish} = this.props
        return (
            <div>
                <div className="form_pad_item">
                    <this.CreateDivider>文章标题</this.CreateDivider>
                    {getFiledDec("title", {
                        rules: [{required: true, message: "标题是必填项"},
                            {min: 2, message: "标题不能低于2字符"}, {max: 30, message: "标题不能多于30字符"}]
                    })(<Input/>)}
                </div>
                <div className="form_pad_item">
                    <this.CreateDivider>文章标签</this.CreateDivider>
                    {getFiledDec("target", {
                        rules: [{required: true, message: "标签是必选项"}]
                    })(<ConRadio/>)}
                </div>
                <div className="form_pad_item">
                    <this.CreateDivider>文章简介</this.CreateDivider>
                    {getFiledDec("referral", {
                        rules: [{required: true, message: "简介是必填项"},
                            {min: 2, message: "简介不能低于2字符"}, {max: 100, message: "简介不能多于100字符"}]
                    })(<TextArea/>)}
                </div>
                <div className="form_pad_item">
                    <this.CreateDivider>文章状态</this.CreateDivider>
                    {getFiledDec("publicStatus", {
                        rules: []
                    })(<Switch/>)}
                </div>
                <this.CreateDivider/>
                <Button type="primary" onClick={onFinish} htmlType="submit" className="login-form-button">
                    更新文章
                </Button>
            </div>
        );
    }
}

export default PageForm