import React, {Component} from 'react';
import {Input} from 'antd';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {saveLocalStore} from "../../../../utils/localStorageUtils";
import {clickHeadAction} from "../../../../reducers/clickHeadReducer";

import "./con_carousel.less"
import small from "../../../../assets/small.png";

@withRouter
@connect()
class ConCarousel extends Component {

    state = {
        value: ""
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        })
    }

    render() {
        const {dispatch, history} = this.props
        return (
            <div className="con_carousel">
                <div className="con_carousel_title">
                    <img src={small} alt="large"/>
                </div>
                <Input.Search
                    className="con_carousel_search"
                    size="large"
                    placeholder="input here"
                    value={this.state.value}
                    onChange={(event) => {
                        this.handleChange(event)
                    }}
                    onSearch={() => {
                        saveLocalStore("", "clickHeadKey", "session")
                        dispatch(clickHeadAction(""))
                        history.push(`/search/${this.state.value}`)
                    }}
                />
            </div>
        );
    }
}

export default ConCarousel;