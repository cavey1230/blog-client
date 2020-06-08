import React, {Component} from 'react';
import {Card, Divider} from 'antd';
import "./con_card.less"

const {Meta} = Card;

class ConCard extends Component {
    render() {
        return (
            <div className="con_card">
                <Divider orientation="center">web教程</Divider>
                <div className="con_card_list">
                    <Card
                        className="con_card_item"
                    >
                        <Meta
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>
                    <Card
                        className="con_card_item"
                    >
                        <Meta
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>
                    <Card
                        className="con_card_item"
                    >
                        <Meta
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>
                </div>
            </div>

        );
    }
}

export default ConCard;