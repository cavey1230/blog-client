import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {Card, Divider} from "antd";
import {Link} from "react-router-dom";

import {GetSearchResult} from "../../api";

@withRouter
class ConSearch extends Component {

    state = {
        art_Result_count: 0,
        art_Result: [],
        user_Result_count: 0,
        user_Result: []
    }

    keys = this.props.location.pathname
        .split("/")
        .slice(-1)
        .toString()

    getSearchResult = async () => {
        const result = await GetSearchResult(this.keys)
        if (result.status === 0) {
            const {art_Result, user_Result, art_Result_count, user_Result_count} = result.data
            return ({
                art_Result,
                user_Result,
                art_Result_count,
                user_Result_count
            })
        }
    }

    componentDidMount() {
        this.getSearchResult().then(res => {
            this.setState({
                ...res
            })
        })
    }

    renderResult = (data, isUserResult = false) => {
        const Reg = new RegExp(this.keys, "i")
        const replace = (data) => {
            const index = data.indexOf(this.keys)
            const newData = data.slice(index - 10 > 0 ? index - 10 : 0, index + 20)
            return newData.replace(Reg, (match) => {
                return `<span style="color: red">${match}</span>`
            })
        }
        const renderTag = (label, data) => {
            return <p dangerouslySetInnerHTML={{__html: `<span>${label}</span>${replace(data)}`}}/>
        }
        return isUserResult ?
            data.map((item, index) => {
                const {description, _id, username} = item
                return <Card
                    key={`search_${index}`}
                    size="small"
                    title={renderTag("用户名:", username)}
                    className="con_search_first_item"
                >
                    {renderTag("签名:", description)}
                    {renderTag("用户id:", _id)}
                </Card>
            }) :
            data.map((item, index) => {
                const {title, main, _id, target, referral} = item
                return <Card
                    key={`search_${index}`}
                    size="small"
                    title={renderTag("文章标题:", title)}
                    extra={<Link to={`/article/${_id}`}>查看原文</Link>}
                    className="con_search_first_item"
                >
                    {renderTag("简介:", referral)}
                    {renderTag("主要内容:", main)}
                    {renderTag("标签:", target)}
                </Card>
            })
    }

    render() {
        const {art_Result, user_Result, art_Result_count, user_Result_count} = this.state
        return (
            <div className="content_reset">
                <div className="con_search_pad">
                    <Divider>文章({art_Result_count})</Divider>
                    <div className="con_search_first">
                        {this.renderResult(art_Result)}
                    </div>
                    <Divider>用户({user_Result_count})</Divider>
                    <div className="con_search_first">
                        {this.renderResult(user_Result, true)}
                    </div>
                </div>
            </div>
        )
    }
}

export default ConSearch;