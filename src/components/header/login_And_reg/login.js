import React, {Component} from 'react';
import {Modal, Button, Form, Input, message} from 'antd';
import {UserOutlined, LockOutlined, BarcodeOutlined} from '@ant-design/icons';
import {connect} from "react-redux"
import {withRouter} from "react-router-dom";

import {LoginApi} from "../../../api"
import {userUPaction} from "../../../reducers/userReducer"
import {getLocalStore, saveLocalStore} from "../../../utils/localStorageUtils"

import logo from "../../../assets/logo2.png"
import "./loginAndreg.less"


class Login extends Component {
    state = {
        loading: false,
        visible: false,
        random: ""
    };

    showModal = () => {
        document.body.style.overflow = "auto"
        document.body.style.width = "100%"
        this.setState({
            visible: true,
        });
    };

    handleCancel = () => {
        this.setState({visible: false});
    };

    onFinish = async values => {
        this.setState({loading: true});
        const {username, password, captcha} = values
        const res = await LoginApi(username, password, captcha)
        if (res.status === 0) {
            saveLocalStore({...getLocalStore(), ...res.data})
            this.setState({loading: false, visible: false})
            const articleID = getLocalStore("articleID", "session")
            if (this.props.location.pathname === articleID) {
                window.location.reload(false)
            }
            this.props.dispatch(userUPaction(res.data))
        } else {
            message.error(res.msg)
            this.setState({loading: false})
        }
    };

    render() {
        const {visible, loading} = this.state;
        return (
            <div>
                <Button style={{color: "white"}} type="link" onClick={this.showModal}>
                    登录
                </Button>
                <Modal
                    visible={visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <div className="log_reg_title">
                        <img src={logo} alt="logo"/>
                        <span>欢迎登录</span>
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
                                    message: '请输入用户名!',
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
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: '请输入密码',
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
                                placeholder="Password"
                            />
                        </Form.Item>
                        <div className="captcha">
                            <Form.Item
                                name="captcha"
                                style={{width: "70%"}}
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: '请输入验证码',
                                    }
                                ]}
                            >
                                <Input
                                    prefix={<BarcodeOutlined className="site-form-item-icon"/>}
                                    placeholder="captcha"
                                />
                            </Form.Item>
                            <img width="30%" onClick={() => {
                                this.setState({
                                    random: Math.random() * 100
                                })
                            }} src={`http://localhost:5000/getCaptcha?id=${this.state.random}`} alt="验证码"/>
                        </div>
                        <Form.Item>
                            <Button type="primary" loading={loading} htmlType="submit"
                                    className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default connect()(withRouter(Login));