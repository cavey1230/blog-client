import axios from "axios";
import {message} from "antd";

// 此方法根据 ./index 下定义API方法 发送后台申请
const ajax = (url, data = {}, method = "get") => {
    // 封装Promise对象方便后续异步函数解决回调地狱
    return new Promise((resolve) => {
        let promise
        method === "get" ?
            promise = axios.get(url, {params: data}) :
            promise = axios.post(url, data)
        promise.then(res => {
            resolve(res.data)
        }).catch(err => message.error("请求出错", err.message))
    })
}

const upLoad = (url, data) => {
    return new Promise((resolve) => {
        let formData=new FormData()
        formData.append("image",data)
        axios.post(url, formData, {headers: {"Content-Type":"multipart/form-data"}}).then(res => {
            resolve(res.data)
        }).catch(err => {
            message.error("上传图片请求出错", err.message)
        })
    })
}

export {ajax, upLoad}