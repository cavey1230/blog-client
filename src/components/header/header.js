import React, {Component} from 'react';
import {Menu} from 'antd';
import {UnorderedListOutlined} from '@ant-design/icons';
import {connect} from "react-redux"
import {Link} from "react-router-dom"

import {getLocalStore, saveLocalStore} from "../../utils/localStorageUtils";
import {clickHeadAction} from "../../reducers/clickHeadReducer";
import Login from "./login_And_reg/login"
import Register from "./login_And_reg/register";

import "../header/header.less"
import logo from "../../assets/logo2.png"
import AvatarDropdown from "./avatar_dropdown/avatar_dropdown";

@connect(state => (
    {
        userReducer: state.userReducer,
        clickHeadReducer: state.clickHeadReducer
    }
))
class MyHeader extends Component {
    state = {
        current: '',
    };
    handleClick = e => {
        saveLocalStore(e.key, "clickHeadKey", "session")
        this.props.dispatch(clickHeadAction(e.key))
        this.setState({
            current: e.key,
        });
    };

    static getDerivedStateFromProps = (nextProps, prevState) => {
        const {clickHeadReducer} = nextProps
        const {current} = prevState
        if (clickHeadReducer !== current) {
            return {current: nextProps.clickHeadReducer}
        }
        return null
    }

    componentDidMount() {
        const clickHeadkey = getLocalStore("clickHeadKey", "session")
        if (clickHeadkey && clickHeadkey !== "") {
            return {current: clickHeadkey}
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
                        <AvatarDropdown/>
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

export default MyHeader;