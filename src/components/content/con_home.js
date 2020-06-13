import React, {Component} from 'react';
import {Divider} from "antd";

import ConCarousel from "./con_home_com/carousel/con_carousel"
import ConCard from "./con_home_com/card/con_card";
import ConWriter from "./con_home_com/honourWritet/con_writer";
import ConTarget from "./con_home_com/hotTarget/con_target";
import ConMyInfo from "./con_home_com/myInformation/con_myinfo";

import "./normal.less"


class ConHome extends Component {
    render() {
        return (
            <div>
                <ConCarousel/>
                <div className="content_reset">
                    <div className="card_groups">
                        <ConCard title="前端教程"/>
                        <ConCard title="新手专题"/>
                        <ConCard title="宝藏文章"/>
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