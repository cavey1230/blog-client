/*!
 * 此组件 定义 评论组件
 *
 * 功能：展示评论（可嵌套） 合展回复
 *
 */

import React, {Component} from 'react';
import {Comment, Avatar, List} from 'antd';
import {CaretDownOutlined, CaretUpOutlined} from '@ant-design/icons';
import dateformat from "dateformat";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import ConComtextare from "./con_comtextare";
import {oneTextareaAction} from "../../../reducers/oneTextareaReducer";

const mapStateToProps = (state) => ({
    oneTextareaReducer: state.oneTextareaReducer
})

class ConComment extends Component {

    state = {
        loading: false
    }
    // 返回 指定评论下回复内容


    tips = () => {
        // 判断 是否为回复 返回 提示语
        return <div style={{color: "#0e9aa7", fontSize: "12px"}}>
            {dateformat(this.props.create_time, "yyyy-mm-dd HH:MM:ss")}
            <br/>
            {
                this.props.to_uid ?
                    <div>{this.props.to_uid_name} 回复 {this.props.from_uid_name} 说 :
                    </div> : ""
            }
            <div style={{margin: "5px 0"}}/>
        </div>
    }

    renderReply = (replies) => {
        return replies.length === 0 ? "" :
            <List
                itemLayout="vertical"
                size="small"
                pagination={{
                    onChange: page => {
                        this.setState({
                            textarea_loading: false
                        })
                    },
                    pageSize: 3,
                    hideOnSinglePage: true,
                    size:"small"
                }}
                dataSource={replies}
                renderItem={item => {
                    return <List.Item>
                        <ConComment
                            key={item._id}
                            _id={item._id}
                            // 传入dispatch方法
                            dispatch={this.props.dispatch}
                            // 传入props.reducer属性
                            oneTextareaReducer={this.props.oneTextareaReducer}
                            // 回复的评论的id
                            comment_id={this.props.comment_id}
                            from_uid_name={item.from_uid.username}
                            from_uid={item.from_uid._id}
                            to_uid_name={item.to_uid.username}
                            to_uid={item.to_uid._id}
                            content={item.content}
                            create_time={item.create_time}
                        >
                        </ConComment>
                    </List.Item>
                }}
            />
    }

    render() {
        const {children} = this.props
        return (
            <Comment
                key={this.props._id}
                actions={[
                    <span
                        onClick={() => {
                            this.props.dispatch(oneTextareaAction(`text${this.props._id}`))
                        }}
                        key="comment-nested-reply-to">点击回复
                    </span>,
                    <span
                        onClick={() => {
                            this.setState({loading: !this.state.loading})
                        }}
                        key="Load"
                    >
                        {
                            // 判断 是否为评论下回复 返回 合展回复图标
                            this.props.reply_type !== "comment"
                            && this.props.isComment === true ?
                                this.state.loading ?
                                    <CaretDownOutlined/> :
                                    <CaretUpOutlined/> : ""
                        }
                        {
                            // 判断 是否为文章一级评论 返回 合展回复选项
                            this.props.isComment === true ? this.props.reply_type === "comment" ? "" : "查看回复" : ""
                        }
                    </span>
                ]}

                author={
                    <Link to="/">
                        {this.props.to_uid_name ?
                            this.props.to_uid_name : this.props.from_uid_name}
                        <br/>
                    </Link>
                }

                avatar={
                    <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
                    />
                }

                content={<div>{this.tips()}{this.props.content}</div>}
            >
                {
                    //  合展 输入框
                    this.props.oneTextareaReducer === `text${this.props._id}` ?
                        <ConComtextare
                            key={"text" + this.props.comment_id}
                            comment_id={this.props.comment_id}
                            from_uid={this.props.from_uid}
                            to_uid={this.props.to_uid}
                            isReply={true}
                        /> : ""
                }
                {
                    //  合展 回复内容
                    this.state.loading ?
                        this.renderReply(this.props.mapReplyToChild) : ""
                }
                {children}
            </Comment>
        );
    }
}

export default connect(mapStateToProps)(ConComment);