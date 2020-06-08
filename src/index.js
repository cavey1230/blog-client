/*!
 * Old Liu‘s blog - v1.1(2020-06-06 21：24)
 * Copyright  -2020 lkk
 *
 * 引入部分 规则 共四段
 * ---------------------
 * 1.第三方包导入
 * 空格
 * 2.自编写API，方法导入
 * 空格
 * 3.静态文件导入(css,img)
 * 空格
 * 4.对象下方法展开
 * ----------------------
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers,applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {createLogger} from"redux-logger";

// 此Reducer负责储存已登录用户信息
import {userReducer} from "./reducers/userReducer";
// 此Reducer负责存储用户更改三级联动后文章List信息
import {selectReducer} from "./reducers/selectReducer";
// 此Reducer控制用户发布评论后刷新评论列表
import {flushReducer} from "./reducers/flushReducer";
// 此Reducer控制评论输入框唯一性
import {oneTextareaReducer} from "./reducers/oneTextareaReducer";

import App from './App';

const com = combineReducers({oneTextareaReducer,userReducer,selectReducer,flushReducer})
const store = createStore(com,applyMiddleware(createLogger()))

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
