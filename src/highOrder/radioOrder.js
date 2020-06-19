import React, {Component} from 'react';
import {connect} from "react-redux"

import getAllArticleUtils from "../utils/getAllArticleUtils";
import {getLocalStore, saveLocalStore} from "../utils/localStorageUtils";
import {selectAction} from "../reducers/selectReducer";

const RadioOrder = (Com) => {
    @connect()
    class HOC extends Component {
        state={
            lastValue: "点我筛选文章"
        }
        onChange = (value) => {
            let lastValue = (value.slice(-1)).toString()
            if (lastValue === "") {
                lastValue = "none"
                this.setState({lastValue: "点我进行文章筛选"})
            } else {
                this.setState({lastValue: lastValue})
            }
            getAllArticleUtils(1, lastValue).then(
                res => {
                    saveLocalStore(1, "clickPage", "session")
                    saveLocalStore(lastValue, "selectItem", "session")
                    this.props.dispatch(selectAction({...res, lastValue}))
                }
            )
        }

        pack = {
            onChange: this.onChange, value: this.value
        }

        componentDidMount() {
            let selectItem = getLocalStore("selectItem", "session")
            selectItem = selectItem ? selectItem === "none" ? ["点我筛选文章"] : [selectItem] : ["点我筛选文章"]
            this.setState({lastValue:selectItem})
        }

        render() {
            return <Com {...this.pack} value={this.state.lastValue}/>
        }
    }

    return HOC
};

export default RadioOrder;