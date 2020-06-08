import React, {Component} from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "./con_writer.less"

class ConWriter extends Component {
    render() {
        return (
            <div className="con_writer">
                <div className="con_writer_title">活跃用户</div>
                <div className="con_writer_avatar">
                    <Avatar style={{margin:"0 0.25rem"}} size="large" icon={<UserOutlined />} />
                    <Avatar style={{margin:"0 0.25rem"}} size="large" icon={<UserOutlined />} />
                    <Avatar style={{margin:"0 0.25rem"}} size="large" icon={<UserOutlined />} />
                    <Avatar style={{margin:"0 0.25rem"}} size="large" icon={<UserOutlined />} />
                    <Avatar style={{margin:"0 0.25rem"}} size="large" icon={<UserOutlined />} />
                </div>
            </div>
        );
    }
}

export default ConWriter;