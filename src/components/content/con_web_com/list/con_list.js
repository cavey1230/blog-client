/*!
 * 此组件 定义 指定标签指定分页下列表组
 *
 * 功能：展示 列表数据 复查 用户指定标签分页数据
 *
 */

import React, {Component} from 'react';
import {List, Avatar, Space, Skeleton} from 'antd';
import {Link} from "react-router-dom";
import {MessageOutlined, LikeOutlined, StarOutlined} from '@ant-design/icons';
import {connect} from "react-redux";

import getAllArticleUtils from "../../../../utils/getAllArticleUtils"
import {getLocalStore, saveLocalStore} from "../../../../utils/localStorageUtils";

const mapStateToProps = (state) => (
    {selectReducer: state.selectReducer}
)

class ConList extends Component {
    state = {
        listData: [{}, {}, {}, {}, {}],
        pages: 0,
        loading: true,
        target: getLocalStore("selectItem", "session")||"none",
        clickPage: 1
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        //console.log("进程到我这里啦")
        //console.log("我是reducer传来的target---",nextProps.selectReducer.lastValue)
        //console.log("我是session的target",getLocalStore("selectItem", "session"))
        const {selectReducer} = nextProps;
        if (selectReducer.lastValue !== prevState.target) {
            const {listData, pages, loading} = selectReducer
            //console.log("我在更改state的target---",selectReducer.lastValue)
            return {
                target: selectReducer.lastValue,
                clickPage: Number(getLocalStore("clickPage", "session")),
                listData,
                pages,
                loading
            };
        }
        return null;
    }

    componentDidMount() {
        //console.log("我到didmount了",this.state)
        let clickPage = 1
        const sessionStore = getLocalStore("clickPage", "session")
        if (sessionStore && sessionStore !== "") {
            clickPage = sessionStore
        }
        getAllArticleUtils(clickPage, this.state.target).then(res => {
            //console.log({...res, clickPage: Number(clickPage)})
            this.setState({...res, clickPage: Number(clickPage)})
        })
    }

    componentWillUnmount() {
        this.setState({
            listData: [{}, {}, {}, {}, {}],
            loading: true,
            target: "none"
        })
    }

    IconText = ({icon, text}) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    )

    resetScroll=(LinkUrl)=>{
        saveLocalStore(LinkUrl,"articleID","session")
        document.documentElement.scrollTop = document.body.scrollTop =0;
    }

    render() {
        const {loading} = this.state
        //console.log("我是render",this.state)
        return (
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        saveLocalStore(page, "clickPage", "session")
                        getAllArticleUtils(page, this.state.target).then(
                            res => this.setState({...res, clickPage: page})
                        );
                    },
                    current: this.state.clickPage,
                    total: this.state.pages,
                    showQuickJumper: true,
                    pageSize: 5,
                    hideOnSinglePage:true
                }}
                dataSource={this.state.listData}
                renderItem={item => {
                    const LinkUrl = `/article/${item._id}`
                    return <List.Item
                        key={item.title}
                        actions={
                            !loading ? [
                                <this.IconText icon={StarOutlined} text={item.star} key="list-vertical-star-o"/>,
                                <this.IconText icon={LikeOutlined} text={item.like} key="list-vertical-like-o"/>,
                                <this.IconText icon={MessageOutlined} text={item.message} key="list-vertical-message"/>,
                            ] : undefined
                        }
                        extra={
                            !loading && <img
                                width={272}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        }
                    >
                        <Skeleton loading={loading} avatar active>
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar}/>}
                                title={<Link onClick={()=>this.resetScroll(LinkUrl)} to={LinkUrl}>{item.title}</Link>}
                            />
                            {item.referral}
                        </Skeleton>
                    </List.Item>
                }}
            />
        );
    }
}

export default connect(mapStateToProps)(ConList);