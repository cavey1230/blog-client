import React, {Component} from 'react';
import {connect} from "react-redux"

import getAllArticleUtils from "../utils/getAllArticleUtils";
import {getLocalStore, saveLocalStore} from "../utils/localStorageUtils";
import {selectAction} from "../reducers/selectReducer";

const RadioOrder = (Com) => {
    @connect()
    class HOC extends Component {
        onChange = (value) => {
            let lastValue = (value.slice(-1)).toString()
            if (lastValue === "") {
                lastValue = "none"
            }
            getAllArticleUtils(1, lastValue).then(
                res => {
                    saveLocalStore(1, "clickPage", "session")
                    saveLocalStore(lastValue, "selectItem", "session")
                    this.props.dispatch(selectAction({...res, lastValue}))
                }
            )
        }
        selectItem = getLocalStore("selectItem", "session")

        defaultValue = this.selectItem ? this.selectItem === "none" ? [] : [this.selectItem] : ["点我筛选文章"]

        pack = {
            onChange: this.onChange, defaultValue: this.defaultValue
        }

        render() {
            return <Com {...this.pack}/>
        }
    }

    return HOC
};

export default RadioOrder;