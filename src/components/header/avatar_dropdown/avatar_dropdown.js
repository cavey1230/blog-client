import React from 'react';
import {Menu, Dropdown, message, Avatar} from 'antd';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {
    UserOutlined,
    EditOutlined,
    MessageOutlined,
    LogoutOutlined
} from "@ant-design/icons";


import {getLocalStore, removeLocalStore} from "../../../utils/localStorageUtils";
import {userDELaction} from "../../../reducers/userReducer";

import "./avatar_dropdown.less"

const AvatarDropdown = (props) => {
    const {username, description} = getLocalStore()

    const menu = () => {
        return <Menu className="dropdown_menu" onClick={onClick}>
            <div className="user_info">
                <Avatar size={64} icon={<UserOutlined/>}/>
                <div>{username}</div>
                <div><span>简介：</span>{description}</div>
                <div>
                    文章:<span>60</span>
                    粉丝:<span>60</span>
                    获赞:<span>60</span>
                </div>
                <div>exp</div>
            </div>
            <Menu.Divider/>
            <Menu.Item key="write"><Link to="/create"><EditOutlined style={{marginRight:"8px"}}/>文章中心</Link> </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="message"><Link to="/message"><MessageOutlined style={{marginRight:"8px"}}/>消息中心</Link></Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="logout"><LogoutOutlined/>注销登录</Menu.Item>
        </Menu>
    }

    const onClick = ({key}) => {
        switch (key) {
            case "logout":
                removeLocalStore()
                props.dispatch(userDELaction())
                break;
            case "message":
                break;
            case "write":
                break;
            default:
                message.error("无效点击")
        }
    };
    return (
        <Dropdown placement="bottomRight" overlay={menu} trigger={['click']}>
            <Avatar className="hover_avatar" icon={<UserOutlined/>}/>
        </Dropdown>
    )
}

export default connect()(AvatarDropdown)