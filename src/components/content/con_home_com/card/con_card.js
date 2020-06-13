import React, {Component} from 'react';
import {Card, Divider} from 'antd';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {GetRecommend} from "../../../../api";
import {saveLocalStore} from "../../../../utils/localStorageUtils";
import {clickHeadAction} from "../../../../reducers/clickHeadReducer";

import "./con_card.less"

const {Meta} = Card;

class ConCard extends Component {

    state = {
        arr: []
    }

    getRecommend = async () => await GetRecommend(this.props.title)

    resetScroll = (LinkUrl) => {
        saveLocalStore(LinkUrl, "articleID", "session")
        saveLocalStore("/web", "clickHeadKey", "session")
        this.props.dispatch(clickHeadAction("/web"))
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    }

    RenderRecommend = () => this.state.arr.map(item => {
        return <Card
            key={`card${item._id}`}
            className="con_card_item"
        >
            <Meta
                title={
                    <Link
                        onClick={() => this.resetScroll(`/article/${item._id}`)}
                        to={`/article/${item._id}`}>{item.title}
                    </Link>
                }
                description={item.referral}
            />
        </Card>
    })

    componentDidMount() {
        this.getRecommend().then(res => {
            if (res.status === 0) {
                this.setState({arr: res.data.arr})
            }
        })
    }

    render() {
        return (
            <div className="con_card">
                <Divider orientation="center">{this.props.title}</Divider>
                <div className="con_card_list">
                    <this.RenderRecommend/>
                </div>
            </div>

        );
    }
}

export default connect()(ConCard);