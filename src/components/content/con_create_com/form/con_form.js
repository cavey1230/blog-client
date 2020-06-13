import React, {Component} from 'react';
import {Input, Divider, Form, Button, Switch, message} from 'antd';
import {connect} from "react-redux";

import ConRadio from "../../con_web_com/radio/con_radio";
import {getLocalStore} from "../../../../utils/localStorageUtils";
import {PostCreateArticle} from "../../../../api";

import "./con_form.less";

const {TextArea} = Input;

@connect(state => ({centerFormReducer: state.centerFormReducer}))
class ConForm extends Component {

    state = {
        title: "",
        target: "",
        referral: "",
        main: ""
    }

    onFinish = async values => {
        console.log('Received values of form: ', values)
        console.log(this.props.centerFormReducer)
        const {title, target, referral, publicStatus} = values
        const inner_Object = {
            target: target.slice(-1).toString(),
            author: getLocalStore()._id,
            main: this.props.centerFormReducer,
            title, referral, publicStatus
        }
        try {
            const result = await PostCreateArticle(inner_Object)
            result.status===0?message.success("文章创建成功"):message.error("未知错误")
        } catch (e) {
            message.error("文章创建失败")
        }
    };

    render() {
        const CreateDivider = ({children}) => {
            return <Divider style={{fontSize: "14px"}}>{children}</Divider>
        }
        return (
            <div className="form_pad">
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={this.onFinish}
                >
                    <div className="form_pad_item">
                        <CreateDivider>文章标题</CreateDivider>
                        <Form.Item
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入文章标题',
                                },
                                {
                                    min: 2,
                                    message: '最小2字符',
                                },
                                {
                                    max: 30,
                                    message: '最大30字符',
                                },
                            ]}
                        >
                            <Input placeholder="请输入文章标题（最小2字符，最大30字符）"/>
                        </Form.Item>
                    </div>
                    <div className="form_pad_item">
                        <CreateDivider>文章标签</CreateDivider>
                        <Form.Item
                            name="target"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择标签',
                                },
                            ]}
                        >
                            <ConRadio/>
                        </Form.Item>
                    </div>
                    <div className="form_pad_item">
                        <CreateDivider>文章简介</CreateDivider>
                        <Form.Item
                            name="referral"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入文章简介',
                                },
                                {
                                    min: 2,
                                    message: '最小2字符',
                                },
                                {
                                    max: 100,
                                    message: '最大100字符',
                                },
                            ]}
                        >
                            <TextArea placeholder="请输入文章简介（最小2字符，最大100字符）" rows={2}/>
                        </Form.Item>
                    </div>
                    <div className="form_pad_item">
                        <CreateDivider>文章状态</CreateDivider>
                        <Form.Item name="publicStatus" valuePropName="checked">
                            <Switch checkedChildren="公开" unCheckedChildren="私有"/>
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            发表文章
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default ConForm