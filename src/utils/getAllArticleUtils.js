/*!
 *
 * 功能：查询 指定标签 指定分页下数据 复查 三级联动更改时数据
 *
 */

import {GetAllArticle} from "../api";
import {message} from "antd";

const getAllArticleUtils = async (page, target) => {
    const result = await GetAllArticle(page, target)
    if (result.status === 0) {
        return ({
            listData: [...result.data],
            pages: result.total * 5,
            loading: false
        })
    } else {
        message.error("读取数据出错，请联系管理员")
    }
}
export default getAllArticleUtils