import React, {Component} from 'react';
import {GetAllTarget, PostCreateTarget, PostUpdateTarget} from "../../../api";
import {Button, Divider, Form, Input, message, Modal} from "antd";

class PageAdminTarget extends Component {

    state = {
        firstTarget: [],
        middleTarget: [],
        lastTarget: [],
        oneTarget: [],
        visible: false,
        confirmLoading: false,
        createArr: []
    }

    getAllTarget = async () => {
        const result = await GetAllTarget()
        if (result.status === 0) {
            return {...result.data}
        }
    }

    showModal = (title) => {
        const createArr = title === "firstTarget" ?
            ["value", "label", "child"] : title === "lastTarget" ?
                ["value", "label", "father"] : title === "oneTarget" ?
                    ["value", "label"] : ["value", "label", "father", "child"]
        this.setState({
            visible: true,
            createArr: createArr
        });
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };

    componentDidMount() {
        this.getAllTarget().then(res => {
            this.setState({
                ...res
            })
        })
    }

    onUpdateFinish = async (values, _id) => {
        const result = await PostUpdateTarget(_id, values)
        if (result.status === 0) {
            message.success(result.message)
        } else {
            message.success("更新失败")
        }
    };

    onCreateFinish = async (values) => {
        this.setState({
            confirmLoading: true,
        });
        const result = await PostCreateTarget(values)
        if (result.status === 0) {
            message.success(result.message)
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        } else {
            message.success("创建失败")
        }
    };

    renderTargetType = (title, data) => {
        const RenderItem = () => {
            return data.map((item, index) => {
                const {value, label, father, child, _id} = item
                return <Form
                    className="admin_target_form_item"
                    key={`admin_target_type_${title}_${index}`}
                    initialValues={{value, label, father, child}}
                    onFinish={(values) => this.onUpdateFinish(values, _id)}
                >
                    {["value", "label", "father", "child"].map((key, index) => {
                        return <Form.Item
                            key={`admin_target_formItem_${title}_${index}`}
                            label={key}
                            name={key}
                        >
                            {key === "child" ? <Input.TextArea/> : <Input/>}
                        </Form.Item>
                    })}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            更新
                        </Button>
                    </Form.Item>
                </Form>
            })
        }
        return <div className="admin_target_type">
            <Divider>{title}</Divider>
            <div className="admin_target_form">
                {RenderItem()}
                <div className="createButton" onClick={() => this.showModal(title)}>
                    创建新标签
                </div>
            </div>
        </div>
    }

    render() {
        const {firstTarget, middleTarget, lastTarget, oneTarget} = this.state
        const {visible, confirmLoading} = this.state
        return (
            <div className="update_target">
                {this.renderTargetType("firstTarget", firstTarget)}
                {this.renderTargetType("middleTarget", middleTarget)}
                {this.renderTargetType("lastTarget", lastTarget)}
                {this.renderTargetType("oneTarget", oneTarget)}
                <Modal
                    title="创建标签"
                    visible={visible}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form
                        className="admin_target_form_item"
                        onFinish={(values) => this.onCreateFinish(values)}
                    >
                        {
                            this.state.createArr.map((item, index) => {
                                return <Form.Item
                                    key={`admin_target_createItem_${index}`}
                                    label={item}
                                    name={item}
                                >
                                    {item === "child" ? <Input.TextArea/> : <Input/>}
                                </Form.Item>
                            })
                        }
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                生成
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default PageAdminTarget;