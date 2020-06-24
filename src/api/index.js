import {ajax, upLoad} from "./ajax";

// --------------POST-----------------
// 提交 登录表单数据
const LoginApi = (username, password, captcha) => {
    return ajax("/login", {username, password, captcha}, "post")
}
// 提交 注册表单数据
const RegisterApi = (username, password, captcha) => {
    return ajax("/register", {username, password, captcha}, "post")
}
// 修改用户数据
const PostUpdateUser = (userId, fileData) => {
    return ajax("/postUpdateUser", {userId, fileData}, "post")
}
// 提交 评论数据
const PostComment = (object) => {
    return ajax("/postComment", {...object}, "post")
}
// 提交 回复数据
const PostReply = (object) => {
    return ajax("/postReply", {...object}, "post")
}
// 创建文章
const PostCreateArticle = (object) => {
    return ajax("/postCreateArticle", {...object}, "post")
}
// 更新文章
const PostUpdateArticle = (articleID, fileData) => {
    return ajax("/postUpdateArticle", {articleID, fileData}, "post")
}
// 创建消息
const PostCreateMessage = (object) => {
    return ajax("/postCreateMessage", {...object}, "post")
}
// 上传图片
const PostUpload = (data, id) => {
    return upLoad("/postUpLoad", data, id)
}
// 更新 推荐文章
const PostUpdateRecommend = (title, recommendArr) => {
    return ajax("/postUpdateRecommend", {title, recommendArr}, "post")
}
// 更新 标签
const PostUpdateTarget = (id, data) => {
    return ajax("/postUpdateTarget", {id,...data}, "post")
}
// 创建 标签
const PostCreateTarget = (data) => {
    return ajax("/postCreateTarget", {...data}, "post")
}


// --------------GET------------------
// 获取 标签下 用户点击页 列表信息
const GetAllArticle = (page, target) => {
    return ajax(`/getALLArticle/${page}/${target}`)
}
// 获取 登陆用户文章中心 列表信息
const GetUserArticle = (page, userID, target) => {
    return ajax(`/getUserArticle/${page}/${userID}/${target}`)
}
// 获取 列表页 三级联动信息
const GetSelectItem = () => {
    return ajax(`/getSelectItem`)
}
// 获取 指定文章id 单页内容
const GetOneArticle = (id) => {
    return ajax(`/getOneArticle/${id}`)
}
// 获取 指定文章id 所有评论及回复
const GetComment = (articleId) => {
    return ajax(`/getComment/${articleId}`)
}
// 获取 推荐文章
const GetRecommend = (title) => {
    return ajax(`/getRecommend/${title}`)
}
// 获取 消息中心 用户消息
const GetMessage = (user_id, page) => {
    return ajax(`/getMessage/${user_id}/${page}`)
}
// 获取搜索结果
const GetSearchResult = (keys) => {
    return ajax(`/getSearchResult/${keys}`)
}
// 获取验证码
const GetCaptcha = () => {
    return ajax(`/getCaptcha`)
}
// 获取所有标签
const GetAllTarget = () => {
    return ajax(`/getAllTarget`)
}
// --------------REMOVE------------------
// 忽略消息
const RemoveMessage = (id) => {
    return ajax(`/removeMessage/${id}`)
}

export {
    //post
    LoginApi,
    RegisterApi,
    PostUpdateUser,
    PostComment,
    PostReply,
    PostCreateArticle,
    PostUpdateArticle,
    PostCreateMessage,
    PostUpload,
    PostUpdateRecommend,
    PostUpdateTarget,
    PostCreateTarget,
    //get
    GetAllArticle,
    GetUserArticle,
    GetSelectItem,
    GetOneArticle,
    GetComment,
    GetRecommend,
    GetMessage,
    GetSearchResult,
    GetCaptcha,
    GetAllTarget,
    //remove
    RemoveMessage
}