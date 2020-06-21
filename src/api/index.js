import {ajax,upLoad} from "./ajax";

// --------------POST-----------------
// 提交 登录表单数据
const LoginApi = (username, password) => {
    return ajax("/login", {username, password}, "post")
}
// 提交 注册表单数据
const RegisterApi = (username, password) => {
    return ajax("/register", {username, password}, "post")
}
// 修改用户数据
const PostUpdateUser = (userId,fileData) => {
    return ajax("/postUpdateUser", {userId,fileData}, "post")
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
const PostUpdateArticle = (articleID,fileData) => {
    return ajax("/postUpdateArticle", {articleID,fileData}, "post")
}
// 创建消息
const PostCreateMessage = (object) => {
    return ajax("/postCreateMessage", {...object}, "post")
}
// 上传图片
const PostUpload=(data,id)=>{
    return upLoad("/postUpLoad",data,id)
}

// --------------GET------------------
// 获取 标签下 用户点击页 列表信息
const GetAllArticle = (page, target) => {
    return ajax(`/getALLArticle/${page}/${target}`)
}
// 获取 登陆用户文章中心 列表信息
const GetUserArticle = (page, userID,target) => {
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
const GetRecommend=(title)=>{
    return ajax(`/getRecommend/${title}`)
}
// 获取 消息中心 用户消息
const GetMessage=(user_id,page)=>{
    return ajax(`/getMessage/${user_id}/${page}`)
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
    //get
    GetAllArticle,
    GetUserArticle,
    GetSelectItem,
    GetOneArticle,
    GetComment,
    GetRecommend,
    GetMessage

}