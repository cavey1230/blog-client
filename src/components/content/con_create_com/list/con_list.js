import React, {Component} from 'react';
import {List, message, Checkbox, Divider, Space, Affix, Collapse} from "antd";
import {connect} from "react-redux";
import {StarOutlined, LikeOutlined, MessageOutlined} from "@ant-design/icons"

import {GetOneArticle, GetUserArticle} from "../../../../api/index";
import {getLocalStore} from "../../../../utils/localStorageUtils";

import "./con_list.less";
import ConForm from "../form/con_form";

const {Panel} = Collapse;

@connect(state => ({userReducer: state.userReducer}))
class ConList extends Component {
    state = {
        data: [{title: "1"} * 5],
        total: 0,
        article_target: [],
        checkbox: ["none"],
        page: 1
    }

    getUserArticle = async (page = 1, target = this.state.checkbox) => {
        const id = getLocalStore()._id || this.props.userReducer.data._id
        try {
            const result = await GetUserArticle(page, id, target)
            if (result.status === 0) {
                const {data, total, article_target} = result
                return ({
                    total: total * 5,
                    data: [...data],
                    article_target
                })
            } else {
                message.error("获取文章失败")
            }

        } catch (error) {
            message.error("创作中心文章列表未知错误")
        }
    }

    componentDidMount() {
        this.getUserArticle().then(res => this.setState({...res}))
    }

    render() {
        const onCheckbox = (checkedValues) => {
            const result = checkedValues.length === 0 ? ["none"] : checkedValues
            this.setState({
                checkbox: result,
                page: 1
            })
            this.getUserArticle(1, result).then(res => this.setState({...res}))
        }

        const onArticle = (id) => {
            GetOneArticle(id).then(res => console.log(res))
        }

        const IconText = ({icon, text}) => (
            <Space>
                {React.createElement(icon)}
                {text}
            </Space>
        );

        return (
            <Affix offsetTop={79}>
                <Collapse accordion defaultActiveKey={2} className="collapse">
                    <Panel header="文章仓库" key="1" className="center_panel">
                        <div className="center_pad">
                            <Divider style={{fontSize: "14px"}}>我的标签</Divider>
                            <Checkbox.Group className="checkbox" options={this.state.article_target}
                                            onChange={onCheckbox}/>
                            <Divider style={{fontSize: "14px"}}>我的文章</Divider>
                            <List
                                className="center_list"
                                size="small"
                                dataSource={this.state.data}
                                pagination={{
                                    onChange: page => {
                                        this.getUserArticle(page).then(res => this.setState({
                                            total: res.total,
                                            data: res.data,
                                            page
                                        }))
                                    },
                                    current: this.state.page,
                                    pageSize: 5,
                                    total: this.state.total,
                                    size: "small",
                                    hideOnSinglePage: true
                                }}
                                itemLayout="vertical"
                                locale={{emptyText: <div style={{color: "#0e9aa7"}}>快发布一篇文章吧</div>}}
                                renderItem={item => <List.Item
                                    actions={[
                                        <IconText icon={StarOutlined} text={item.star} key="list-vertical-star-o"/>,
                                        <IconText icon={LikeOutlined} text={item.like} key="list-vertical-like-o"/>,
                                        <IconText icon={MessageOutlined} text={item.message}
                                                  key="list-vertical-message"/>,
                                    ]}>
                                    <div style={{cursor: "pointer"}}
                                         onClick={() => onArticle(item._id)}>{item.title}</div>
                                </List.Item>}
                            />
                        </div>
                    </Panel>
                    <Panel header="文章设置" key="2" className="center_panel">
                        <ConForm/>
                    </Panel>
                </Collapse>

            </Affix>
        );
    }
}

export default ConList;