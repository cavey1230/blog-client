import React, {Component} from 'react';
import {Card, Divider} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import ConCarousel from "./con_home_com/carousel/con_carousel";
import ConCard from "./con_home_com/card/con_card";
import ConWriter from "./con_home_com/honourWritet/con_writer";
import ConTarget from "./con_home_com/hotTarget/con_target";
import ConMyInfo from "./con_home_com/myInformation/con_myinfo";
import {GetRecommend} from "../../api";
import {saveLocalStore} from "../../utils/localStorageUtils";
import {clickHeadAction} from "../../reducers/clickHeadReducer";

import "./normal.less";

const {Meta} = Card;

@connect()
class ConHome extends Component {
    state={
        title:["前端教程","新手专题","宝藏文章"],
        components: []
    }

    resetScroll = (LinkUrl) => {
        saveLocalStore(LinkUrl, "articleID", "session")
        saveLocalStore("/web", "clickHeadKey", "session")
        this.props.dispatch(clickHeadAction("/web"))
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    }

    componentDidMount() {
        Promise.all(this.state.title.map(async title => {
                const result = await GetRecommend(title)
                return result.data.arr.map((item,index) => {
                    return <Card
                        key={`card_${item._id}_${index}`}
                        className="con_card_item"
                    >
                        <Meta title={
                            <Link
                                onClick={() => this.resetScroll(`/article/${item._id}`)}
                                to={`/article/${item._id}`}>{item.title}
                            </Link>
                        }
                              description={item.referral}
                        />
                    </Card>
                })
            }
        )).then(res => {
            this.setState({components: res})
        })
    }

    render() {
        const {title,components}=this.state
        const statepack={title,components}
        return (
            <div>
                <ConCarousel/>
                <div className="content_reset">
                    <div className="card_groups">
                        <ConCard {...statepack} />
                    </div>
                    <div className="img_groups">
                        <div className="img_item1">
                        </div>
                        <div className="img_item2">
                            <div/>
                            <div/>
                        </div>
                    </div>
                    <Divider/>
                    <div className="info_groups">
                        <div className="info_item">
                            <ConWriter/>
                            <ConTarget/>
                        </div>
                        <div className="info_item" style={{width:"66.66%"}}>
                            <ConMyInfo/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConHome;