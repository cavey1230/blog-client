import ajax from "./ajax";

// 提交 登录表单数据
const LoginApi = (username, password) => {
    return ajax("/login", {username, password}, "post")
}
// 提交 注册表单数据
const RegisterApi = (username, password) => {
    return ajax("/register", {username, password}, "post")
}
// 获取 标签下 用户点击页 列表信息
const GetAllArticle = (page, target) => {
    return ajax(`/getALLArticle/${page}/${target}`)
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
// 提交 评论数据
const PostComment = (object) => {
    return ajax("/postComment", {...object}, "post")
}
// 提交 回复数据
const PostReply = (object) => {
    return ajax("/postReply", {...object}, "post")
}

export {
    LoginApi,
    RegisterApi,
    GetAllArticle,
    GetSelectItem,
    GetOneArticle,
    GetComment,
    PostComment,
    PostReply
}