import React, {Component} from 'react';
import {connect} from "react-redux";
import {message, Modal} from "antd";

import {centerFormAction} from "../reducers/centerFormReducer";
import {PostCreateArticle, PostUpdateArticle, PostUpdateUser} from "../api";
import {getLocalStore, saveLocalStore} from "../utils/localStorageUtils";

const formOrder = (Com) => {
    @connect(state => ({centerFormReducer: state.centerFormReducer,}))
    class Hoc extends Component {

        state = {}
        options = {}

        validFileDec = (name, value, messageStatus = true) => {
            const result = this.options[name].rules.map(option => {
                if (option.required) {
                    return value.length > 0 ? null : option.message
                } else if (option.min) {
                    return value.length < option.min ? option.message : null
                } else if (option.max) {
                    return value.length > option.max ? option.message : null
                }
                return null
            }).filter(i => i)
            if (result.length > 0) {
                result.map(item => {
                    if (messageStatus) {
                        message.error(item)
                    }
                    return item
                })
            }
            return result
        }

        createPromise = (resolve, rest, main) => {
            const {dispatch} = this.props
            const author = getLocalStore()._id
            PostCreateArticle({...rest, main, author})
                .then(res => {
                    if (res.status === 0) {
                        const {target, title, referral, publicStatus, main, _id} = res.data
                        const inner_object = {target, title, referral, publicStatus, main}
                        saveLocalStore(_id, "create_article_id")
                        dispatch(centerFormAction({...inner_object}))
                        resolve({
                            status: 0,
                            message: "文章创建成功"
                        })
                    } else {
                        resolve({
                            status: 1,
                            message: "创建失败"
                        })
                    }
                })
        }

        onFinish = (update = false) => {
            return new Promise(((resolve) => {
                const {_id, main, ...rest} = this.props.centerFormReducer
                //取得未通过效验的错误合集
                const errorArr = Object.keys(rest).map(option => {
                    return this.validFileDec(option, rest[option], false)
                }).toString().split(",").filter(i => i)
                if (errorArr.length === 0) {
                    if (update) {
                        PostUpdateArticle(_id, {main, ...rest}).then(res => {
                            const {status, message: msg} = res
                            if (status === 0) {
                                saveLocalStore(JSON.stringify({_id, main, ...rest}), "storeArticle", "session")
                                this.props.dispatch(centerFormAction({_id, main, ...rest}))
                                message.success(msg)
                            } else {
                                message.error(msg)
                            }
                        })
                    } else {
                        const {target} = rest
                        const {article_target, _id} = getLocalStore()
                        if (article_target.includes(target)) {
                            this.createPromise(resolve, rest, main)
                        } else {
                            const newArr = [...article_target, target]
                            saveLocalStore({...getLocalStore(), article_target: newArr})
                            PostUpdateUser(_id, {article_target: newArr}).then(res => {
                                if (res.status === 0) {
                                    this.createPromise(resolve, rest, main)
                                }
                            })
                        }
                    }
                } else {
                    Modal.error({
                        title: '创建失败，需要注意以下事项',
                        content: errorArr.map((item, index) => (<div key={`${item}${index}`} style={{
                            marginTop: "14px",
                            fontSize: "14px"
                        }}>错误{index + 1}:{item}</div>))
                    });
                }
            }))
        }

        getFiledDec = (name, options) => {
            this.options[name] = options
            const {dispatch, centerFormReducer} = this.props

            const InputOnChange = (event) => {
                this.validFileDec(name, event.target.value)
                dispatch(centerFormAction({
                    [name]: event.target.value
                }))
            }

            const otherOnChange = (value) => {
                value = name === "target" ? value.slice(-1).toString() : value
                this.validFileDec(name, value)
                dispatch(centerFormAction({
                    [name]: value
                }))
            }

            const cloneElement = (InputCom, onChange) => {
                return React.cloneElement(InputCom, {
                    id: name,
                    onChange: onChange,
                    value: centerFormReducer[name]
                })
            }

            return InputCom => {
                return name === "publicStatus" ?
                    React.cloneElement(InputCom, {
                        onChange: otherOnChange,
                        checked: centerFormReducer[name],
                        checkedChildren: "公开",
                        unCheckedChildren: "私有"
                    }) :
                    name === "target" ?
                        cloneElement(InputCom, otherOnChange) :
                        cloneElement(InputCom, InputOnChange)
            }
        }


        render() {
            return <Com getFiledDec={this.getFiledDec} onFinish={this.onFinish}/>
        }
    }

    return Hoc
}

export default formOrder