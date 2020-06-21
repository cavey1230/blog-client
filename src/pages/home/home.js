import React, {Component} from 'react';
import {Divider, Layout, Affix} from 'antd';
import {Route, Switch} from "react-router-dom";
import {UpOutlined, DownOutlined} from "@ant-design/icons";

import {userUPaction} from "../../reducers/userReducer";
import {getLocalStore} from "../../utils/localStorageUtils";
import MyHeader from "../../components/header/header";
import MyFooter from "../../components/footer/footer";
import {connect} from "react-redux";
import ConHome from "../../components/content/con_home";
import ConWeb from "../../components/content/con_web";
import ConArticle from "../../components/content/con_article";
import Con404 from "../../components/content/con_404";
import ConMessage from "../../components/content/con_message";
import RouterGuard from "../../highOrder/routerGuard";

import "./home.less";

const {Header, Footer, Content} = Layout;

@connect(state=>({userReducer: state.userReducer}))
class Home extends Component {

    state = {
        loading: false,
        height: 0,
        top: 0
    }

    onClick = () => {
        document.documentElement.scrollTop = document.body.scrollTop = this.state.height
    }

    componentDidMount() {
        const result = getLocalStore()
        if (result && result._id) {
            this.props.dispatch(userUPaction(result))
        }
        window.addEventListener('scroll', this.bindHandleScroll)
    }

    bindHandleScroll = (event) => {
        // 滚动的高度
        const scrollTop = (event.target ? event.target.documentElement.scrollTop : false)
            || window.pageYOffset
            || (event.target ? event.target.body.scrollTop : 0)
        const height = event.target.documentElement.scrollHeight
        if (scrollTop > Math.floor(height / 4)) {
            this.setState({
                loading: "up",
                height: 0
            })
        } else {
            this.setState({
                loading: "down",
                height: height
            })
        }
    }


    componentWillUnmount() {
        window.removeEventListener('scroll', this.bindHandleScroll);
    }


    render() {
        return (
            <Layout className="home_layout">
                <Affix offsetTop={this.state.top}>
                    <Header id="home_layout_header"><MyHeader/></Header>
                </Affix>
                <Content className="home_layout_content">
                    <Switch>
                        <Route exact path="/" component={ConHome}/>
                        <Route exact path="/web" component={ConWeb}/>
                        <Route exact path="/article/:id" component={ConArticle}/>
                        <RouterGuard exact path="/message" component={ConMessage}/>
                        <Route component={Con404}/>
                    </Switch>
                    {
                        <div className="UpOutlined">
                            <div onClick={() => this.onClick()} className="icon_group">
                                {this.state.loading === "up" ? <UpOutlined className="icon"/> : ""}
                                {this.state.loading === "up" ? "" : <DownOutlined className="icon"/>}
                            </div>
                        </div>
                    }
                </Content>
                <Divider/>
                <Footer><MyFooter/></Footer>
            </Layout>
        );
    }
}

export default Home