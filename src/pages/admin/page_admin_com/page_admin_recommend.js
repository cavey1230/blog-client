import React, {Component} from 'react';
import {Button, Divider, Form, Input, message} from "antd";

import {PostUpdateRecommend} from "../../../api";

class PageAdminRecommend extends Component {

    onFinish = async (values, title) => {
        const newArr = Object.keys(values).map(name => {
            return values[name]
        }).filter(i=>i)
        if (newArr.length===0){
            message.error("更新无效，请输入值再试")
        }else {
            const result = await PostUpdateRecommend(title,newArr)
            if (result.status===0){
                message.success(result.message)
            }else {
                message.success("更新失败")
            }
        }
    };

    renderForm = (title) => {
        const RenderItem = () => {
            return [...new Array(3)].map((item, index) => {
                return <Form.Item
                    key={`admin_${title}_${index}`}
                    label={`推荐${index + 1}`}
                    name={`recommend${index}`}
                >
                    <Input/>
                </Form.Item>
            })
        }
        return <div className="update_Recommend_item">
            <Divider>{title}</Divider>
            <Form
                name="basic"
                initialValues={{remember: true}}
                onFinish={(values) => this.onFinish(values, title)}
            >
                {RenderItem()}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        更新
                    </Button>
                </Form.Item>
            </Form>
        </div>
    }

    render() {
        return (
            <div className="update_Recommend">
                {this.renderForm("前端教程")}
                {this.renderForm("新手专题")}
                {this.renderForm("宝藏文章")}
            </div>
        );
    }
}

export default PageAdminRecommend;