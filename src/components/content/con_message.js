import React, {Component} from 'react';
import {List, Avatar, Button, Skeleton} from 'antd';
import dateformat from "dateformat";
import {FireTwoTone} from "@ant-design/icons";
import {connect} from "react-redux";

import {GetMessage, RemoveMessage} from "../../api/index";
import {getLocalStore} from "../../utils/localStorageUtils";
import {oneTextareaAction} from "../../reducers/oneTextareaReducer";
import ConComtextare from "./con_article_com/con_comtextare";

@connect(state => ({oneTextareaReducer: state.oneTextareaReducer}))
class ConMessage extends Component {

    state = {
        initLoading: true,
        loading: false,
        data: [],
        list: [],
        page: 1,
        count: 0,
        total: 0
    };

    componentDidMount() {
        this.getMessage(this.state.page).then(res => {
            this.setState({...res})
        })
    }

    getMessage = async (page) => {
        const result = await GetMessage(getLocalStore()._id, page)
        if (result.status === 0) {
            return {
                initLoading: false,
                data: result.data,
                list: result.data,
                count: result.count,
                total: result.total
            }
        }
    }

    onLoadMore = async () => {
        this.setState({
            loading: true,
            list: this.state.data.concat([...new Array(5)].map(() => ({
                loading: true,
                name: {},
                to_uid: {username: ""},
                article_id: {title: ""}
            }))),
            page: this.state.page + 1
        });
        const result = await this.getMessage(this.state.page + 1)
        const data = this.state.data.concat(result.data);
        console.log(result.data, data)
        this.setState(
            {
                data,
                list: data,
                loading: false,
            },
            () => {
                window.dispatchEvent(new Event('resize'));
            },
        );
    };

    render() {
        const {initLoading, loading, list} = this.state;
        const loadMore =
            !initLoading && !loading && (this.state.page - 1 < this.state.total) ? (
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: 12,
                        height: 32,
                        lineHeight: '32px',
                    }}
                >
                    <Button onClick={this.onLoadMore}>{`加载更多（目前共${this.state.count}条)`}</Button>
                </div>
            ) : null;
        return (
            <div>
                <div className="content_reset">
                    <div className="con_message">
                        <div className="con_message_left">
                            <List
                                loading={initLoading}
                                loadMore={loadMore}
                                dataSource={list}
                                locale={{emptyText: '暂时还没有消息'}}
                                size="small"
                                itemLayout="vertical"
                                renderItem={(item, index) => {
                                    const {isReply, to_uid, article_id, content, create_time, reply_id, _id} = item
                                    const time = dateformat(create_time, "yyyy-mm-dd HH:MM")
                                    return <><List.Item
                                        actions={[
                                            <span
                                                onClick={async () => {
                                                    await RemoveMessage(_id)
                                                    let newArr = this.state.list
                                                    const index = newArr.map((item, index) => {
                                                        if (item._id === _id) {
                                                            return index
                                                        }
                                                        return null
                                                    }).filter(i=>i)
                                                    console.log(index)
                                                    newArr.splice(Number(index), 1)
                                                    console.log(newArr)
                                                    this.setState({
                                                        list: newArr
                                                    })
                                                }}
                                                key="comment-nested-reply-remove">忽略消息
                                                    </span>,
                                            <span
                                                onClick={() => {
                                                    this.props.dispatch(oneTextareaAction(`reply${reply_id}`))
                                                }}
                                                key="comment-nested-reply-to">点击回复
                                                    </span>]}
                                    >
                                        <Skeleton avatar title={false} loading={item.loading} active>
                                            <List.Item.Meta
                                                avatar={
                                                    <Avatar
                                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                                                }
                                                title={index < 3 ? <div><FireTwoTone/> {time}</div> : time}
                                                description={`${to_uid.username}
                                                在文章《${article_id.title}》${isReply ? "回复" : "评论"}`}
                                            />
                                            <div>{content}</div>
                                        </Skeleton>
                                    </List.Item>
                                        {
                                            //  合展 输入框
                                            this.props.oneTextareaReducer === `reply${reply_id}` ?
                                                <ConComtextare
                                                    key={"reply" + reply_id}
                                                    comment_id={reply_id}
                                                    from_uid={to_uid._id}
                                                    to_uid={getLocalStore()._id}
                                                    isReply={true}
                                                    articleID={article_id._id}
                                                /> : null
                                        }
                                    </>
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConMessage;