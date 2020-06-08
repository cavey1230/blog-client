import React, {Component} from 'react';
import {Tag} from 'antd';

import "./con_target.less";

class ConTarget extends Component {
    render() {
        return (
            <div className="con_target">
                <div className="con_target_title">热门标签</div>
                <div className="con_target_items">
                    <Tag color="gray">magenta</Tag>
                    <Tag color="gray">red</Tag>
                    <Tag color="gray">volcano</Tag>
                    <Tag color="gray">orange</Tag>
                </div>
            </div>
        );
    }
}

export default ConTarget;