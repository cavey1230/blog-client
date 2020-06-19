import React, {Component} from 'react';
import {Modal, Button, Form, Input, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';

import {RegisterApi} from "../../../api"
import {connect} from "react-redux"


import logo from "../../../assets/logo2.png"
import "./loginAndreg.less"



class Register extends Component {
    state = {
        loading: false,
        visible: false,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = () => {
        this.setState({visible: false});
    };

    onFinish = async values => {
        this.setState({loading: true});
        const {username, password, password2} = values;
        if (password !== password2) {
            message.error("请确认两次密码是否相同")
            this.setState({loading: false});
        } else {
            const res = await RegisterApi(username, password2)
            if (res.status === 0) {
                message.success("注册成功请手动登录，再次访问网站时系统会自动登录")
                this.setState({loading: false, visible: false})
            } else {
                message.error("用户名已存在，请换个用户名再次注册")
                this.setState({loading: false})
            }
        }
    };

    render() {
        const {visible, loading} = this.state;
        return (
            <div>
                <Button style={{color:"white"}} type="link" onClick={this.showModal}>
                    注册
                </Button>
                <Modal
                    visible={visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <div className="log_reg_title">
                        <img src={logo} alt="logo"/>
                        <span>注册账号</span>
                    </div>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: 'Please input your Username!',
                                },
                                {
                                    min: 4,
                                    message: '用户名最少4位',
                                },
                                {
                                    max: 12,
                                    message: '用户名最多12位',
                                },
                                {
                                    pattern: /^[A-z0-9a-z_]+$/,
                                    message: "用户名必须是数字字母或下划线"
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    min: 4,
                                    message: '密码最少4位',
                                },
                                {
                                    max: 12,
                                    message: '密码最多12位',
                                },
                                {
                                    pattern: /^[A-z0-9a-z_]+$/,
                                    message: "必须是数字字母或下划线"
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password2"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    min: 4,
                                    message: '密码最少4位',
                                },
                                {
                                    max: 12,
                                    message: '密码最多12位',
                                },
                                {
                                    pattern: /^[A-z0-9a-z_]+$/,
                                    message: "必须是数字字母或下划线"
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="再次输入密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button  type="primary" loading={loading} htmlType="submit"
                                    className="login-form-button">
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default connect()(Register);