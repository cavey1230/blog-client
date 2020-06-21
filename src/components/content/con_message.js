import React, {Component} from 'react';
import {List, Avatar, Button, Skeleton} from 'antd';
import dateformat from "dateformat";

import {GetMessage} from "../../api/index";
import {getLocalStore} from "../../utils/localStorageUtils";
import {FireTwoTone} from "@ant-design/icons";

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
                                size="small"
                                itemLayout="vertical"
                                renderItem={(item, index) => {
                                    const {isReply, to_uid, article_id, content, create_time} = item
                                    const time = dateformat(create_time, "yyyy-mm-dd HH:MM")
                                    return <List.Item
                                        actions={[<a key="list-loadmore-edit">忽略</a>,
                                            <a key="list-loadmore-more">回复</a>]}
                                    >
                                        <Skeleton avatar title={false} loading={item.loading} active>
                                            <List.Item.Meta
                                                avatar={
                                                    <Avatar
                                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                                                }
                                                title={index < 3 ? <div><FireTwoTone /> {time}</div> : time}
                                                description={`${to_uid.username}
                                                在文章《${article_id.title}》${isReply ? "回复" : "评论"}`}
                                            />
                                            <div>{content}</div>
                                        </Skeleton>
                                    </List.Item>
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