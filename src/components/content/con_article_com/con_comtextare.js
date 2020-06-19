import React, {Component} from 'react';
import {Comment, Form, Button, Input, message} from 'antd';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {getLocalStore, removeLocalStore, saveLocalStore} from "../../../utils/localStorageUtils";
import getArticleAndComment from "../../../utils/getArticleAndComment";
import {PostComment, PostReply} from "../../../api";
import {flushAction} from "../../../reducers/flushReducer";
import {oneTextareaAction} from "../../../reducers/oneTextareaReducer";
import createIndex from "../../../utils/ArticleIndexUtils";
import mdParser from "../../../config/markdown_It_Config";

const {TextArea} = Input;

class ConComtextare extends Component {
    state = {
        submitting: false
    };

    articlePath = this.props.location.pathname
        .split("/")
        .slice(-1)
        .toString()

    user_data = getLocalStore("user_data")

    postCommentOrReply = async (isReply) => {
        try {
            let result = isReply ? await PostReply({
                comment_id: this.props.comment_id,
                reply_id: this.props.comment_id,
                reply_type: "comment",
                content: this.state.value,
                from_uid: this.props.to_uid || this.props.from_uid,
                to_uid: this.user_data._id
            }) : await PostComment({
                content: this.state.value,
                topic_type: "article",
                topic_id: this.articlePath,
                from_uid: this.user_data._id
            })
            if (result.status === 0) {
                this.setState({
                    submitting: false,
                    value: ''
                })
                this.props.dispatch(oneTextareaAction(""))
                getArticleAndComment(this.articlePath).then(res => {
                    const {main, ...rest} = res
                    if(main){
                        const {result, tables} = createIndex(mdParser.render(main))
                        this.props.dispatch(flushAction({...rest, main: result, tables}))
                    }
                })
            }
        } catch (error) {
            message.error("发送失败，字符小于2或大于100")
            this.setState({
                submitting: false,
                value: ''
            })
        }
    }
    componentDidMount() {
        const isInput = getLocalStore("textareaValue", "session")
        removeLocalStore("textareaValue","session")
        if (isInput) {
            this.setState({value:isInput})
        }
    }

    Editor = ({onChange, onSubmit, submitting, value}) => (
        <>
            <Form.Item>
                <TextArea rows={3} onChange={onChange} value={value}/>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                    发表评论
                </Button>
            </Form.Item>
        </>
    );

    handleSubmit = async () => {
        const {isReply} = this.props
        if (!this.user_data || !getLocalStore()) {
            message.warn("请登录")
            return;
        }
        if (!this.state.value) {
            return;
        }
        this.setState({
            submitting: true,
        });
        // console.log(
        //     "comment_id---", this.props.comment_id,
        //     "reply_id---", this.props.comment_id,
        //     "reply_type---", "comment",
        //     "content---", this.state.value,
        //     "from_uid---", this.props.to_uid || this.props.from_uid,
        //     "to_uid---", this.user_data._id,
        //     "isReply---", isReply
        // )
        removeLocalStore("textareaValue","session")
        isReply ? await this.postCommentOrReply(isReply) : await this.postCommentOrReply()
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
        saveLocalStore(e.target.value, "textareaValue", "session")
    };

    render() {
        let {submitting, value} = this.state;
        return (
            <Comment
                content={
                    <this.Editor
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                        submitting={submitting}
                        value={value}
                    />
                }
            />
        );
    }
}

export default connect()(withRouter(ConComtextare));