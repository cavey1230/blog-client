/*!
 * 此组件 定义 指定文章页下主要内容
 *
 * 功能：获取指定文章信息 获取所有评论回复信息
 *
 */

import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {Avatar, Divider, Empty, List, Spin} from "antd";
import {LikeOutlined, MessageOutlined, StarOutlined, UserOutlined} from "@ant-design/icons";
import dateformat from "dateformat";
import {connect} from "react-redux";

import getArticleAndComment from "../../../utils/getArticleAndComment";
import ConComment from "./con_comment";
import ConComtextare from "./con_comtextare";

import "./con_mainArti.less";


const mapStateToProps = (state) => (
    {flushReducer: state.flushReducer}
)

class ConMainArti extends Component {

    // 初始化 第一次加载页面时数据（必须）
    state = {
        author: {
            username: "",
            _id: ""
        },
        comments: [],
        // 判断 Spin是否加载时 参数
        loading: true,
        // 判断 是否是回复栏评论框
        isComment:false
    }

    splitArr = this.props.location.pathname
            .split("/")
            .slice(-1)
            .toString()


    static getDerivedStateFromProps=(nextProps,prevState)=>{
        const {flushReducer}=nextProps
        if(flushReducer.isComment!==prevState.isComment){
            return {...flushReducer}
        }
        return null
    }

    componentDidMount() {
        getArticleAndComment(this.splitArr).then(res=>{
            this.setState({...res})
        })
    }

    // 渲染 评论区 传递 评论下回复信息
    renderComments = () => {
        return this.state.comments.length === 0 ?
            <Empty
                image="https://s1.ax1x.com/2020/06/06/t69lng.png"
                description={<span>首席地摊位空闲，赶快来吃瓜</span>}
            /> :
            <List
                itemLayout="vertical"
                size="small"
                pagination={{
                    onChange: page => {

                    },
                    pageSize: 3,
                    hideOnSinglePage: true
                }}
                dataSource={this.state.comments}
                renderItem={item => {
                    return <List.Item>
                        <ConComment
                            _id={item.comment._id}
                            comment_id={item.comment._id}
                            content={item.comment.content}
                            from_uid_name={item.comment.from_uid.username}
                            from_uid={item.comment.from_uid._id}
                            mapReplyToChild={item.reply}
                            isComment={item.reply.length !==0}
                            create_time={item.comment.create_time}
                        >
                        </ConComment>
                    </List.Item>
                }}
            />
    }

    render() {
        return (
            <Spin spinning={this.state.loading} tip="PHP是世界上最好的语言">
                {this.state.loading ?
                    <div style={{minHeight: "80vh"}}/> :
                    <div className="arti_main">
                        <div className="arti_title">{this.state.title}</div>
                        <div className="arti_info">
                            <div><Avatar icon={<UserOutlined/>}/></div>
                            <div>{this.state.username}</div>
                            <div>{dateformat(this.state.create_time, "yyyy-mm-dd HH:MM:ss")}</div>
                            <div>
                                <StarOutlined/>
                                <span>{this.state.star}</span>
                            </div>
                            <div>
                                <LikeOutlined/>
                                <span>{this.state.like}</span>
                            </div>
                            <div>
                                <MessageOutlined/>
                                <span>{this.state.message}</span>
                            </div>
                        </div>
                        <Divider/>
                        <div className="arti_content">
                            {this.state.referral}
                            <Divider/>
                            {this.state.main}
                        </div>
                        <ConComtextare key="text_main"/>
                        <Divider orientation="left">评论</Divider>
                        {this.renderComments()}
                    </div>
                }
            </Spin>
        );
    }
}

export default connect(mapStateToProps)(withRouter(ConMainArti));