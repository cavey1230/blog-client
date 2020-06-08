import React, {Component} from 'react';
import {Menu, Avatar} from 'antd';
import {UserOutlined, UnorderedListOutlined} from '@ant-design/icons';
import {connect} from "react-redux"
import {Link} from "react-router-dom"

import {getLocalStore, saveLocalStore} from "../../utils/localStorageUtils";
import Login from "../log_reg/login"
import Register from "../log_reg/register";

import "../header/header.less"
import logo from "../../assets/logo.png"


const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer
    }
}

class MyHeader extends Component {
    state = {
        current: '',
    };
    handleClick = e => {
        saveLocalStore(e.key, "clickHeadKey", "session")
        this.setState({
            current: e.key,
        });
    };

    componentDidMount() {
        if (getLocalStore("clickHeadKey", "session")
            && getLocalStore("clickHeadKey", "session") !== "") {
            const selectHeadKey = getLocalStore("clickHeadKey", "session")
            this.setState({
                current: selectHeadKey
            });
        }
    }

    render() {
        return (
            <div className="com_header">
                <img src={logo} className="com_header_img" alt=""/>
                <Menu overflowedIndicator={<UnorderedListOutlined/>} className="com_header_menu"
                      onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                    <Menu.Item key="/">
                        <Link to="/">
                            Home首页
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/web">
                        <Link to="/web">
                            文章列表
                        </Link>
                    </Menu.Item>
                </Menu>
                {this.props.userReducer.avatar === true ?
                    <div className="com_header_avatar">
                        <Avatar icon={<UserOutlined/>}/>
                    </div> :
                    <div className="com_header_avatar">
                        <div className="com_header_loginNav">
                            <Login/>
                            <span style={{color: "white"}}>/</span>
                            <Register/>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps)(MyHeader);