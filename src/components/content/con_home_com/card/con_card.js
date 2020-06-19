import React, {Component} from 'react';
import {Divider} from 'antd';

import "./con_card.less"

class ConCard extends Component {
    render() {
        return (
            <div className="card_groups">
                {
                    this.props.components.map((item, index) => {
                        return <div key={`con_card_${index}`} className="con_card">
                            <Divider orientation="center">{this.props.title[index]}</Divider>
                            <div className="con_card_list">
                                {this.props.components[index]}
                            </div>
                        </div>
                    })
                }
            </div>
        );
    }
}

export default ConCard;