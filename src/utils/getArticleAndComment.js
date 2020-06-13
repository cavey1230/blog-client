import {GetComment, GetOneArticle} from "../api";
import {message} from "antd";

// 获取 指定文章数据评论及回复数据 更新 state
const getArticleAndComment = async (address) => {
    try {
        const result_Article = await GetOneArticle(address)
        if (result_Article.status === 0) {
            const result_Comment = await GetComment(address)
            if (result_Comment.status === 0) {
                return {
                    ...result_Article.data,
                    comments: [...result_Comment.data],
                    loading: false
                }
            }
        }else {
            message.error("没有这篇文章")
            return {
                title:"没有这篇文章",
                referral:"没有这篇文章",
                loading: true
            }
        }
    } catch (error) {
        message.error("获取文章和评论失败")
    }
}

export default getArticleAndComment