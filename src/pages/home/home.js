import React, {Component} from 'react';
import {Divider, Layout} from 'antd';
import {Route, Switch} from "react-router-dom"

import "./home.less"
import MyHeader from "../../components/header/header";
import {userUPaction} from "../../reducers/userReducer";
import {getLocalStore} from "../../utils/localStorageUtils";
import {connect} from "react-redux";
import ConHome from "../../components/content/con_home";
import ConWeb from "../../components/content/con_web";
import ConArticle from "../../components/content/con_article";
import MyFooter from "../../components/footer/footer";

const {Header, Footer, Content} = Layout;

class Home extends Component {

    componentDidMount() {
        const result = getLocalStore()
        if (result && result._id) {
            this.props.dispatch(userUPaction(getLocalStore()))
        }
    }

    render() {
        return (
            <Layout className="home_layout">
                <Header className="home_layout_header"><MyHeader/></Header>
                <Content className="home_layout_content">
                    <Switch>
                        <Route exact path="/" component={ConHome}/>
                        <Route exact path="/web" component={ConWeb}/>
                        <Route exact path="/article/:id" component={ConArticle}/>
                    </Switch>
                </Content>
                <Divider/>
                <Footer><MyFooter/></Footer>
            </Layout>
        );
    }
}

export default connect()(Home)