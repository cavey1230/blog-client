import React, {Component} from 'react';
import {Descriptions} from 'antd';

import "./con_myinfo.less";

class ConMyInfo extends Component {
    render() {
        return (
            <div className="con_myinfo">
                <div className="con_myinfo_items">
                    <Descriptions title="站长信息">
                        <Descriptions.Item label="UserName">lkk</Descriptions.Item>
                        <Descriptions.Item label="Telephone">17623521231</Descriptions.Item>
                        <Descriptions.Item label="Live">ChongQing</Descriptions.Item>
                        <Descriptions.Item label="Remark">empty</Descriptions.Item>
                        <Descriptions.Item label="Address">JiuLong , CQ , China</Descriptions.Item>
                    </Descriptions>
                </div>
            </div>
        );
    }
}

export default ConMyInfo;