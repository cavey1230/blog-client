import React from 'react';
import {connect} from "react-redux";
import MdEditor from 'react-markdown-editor-lite';

import {centerFormAction} from "../../../../reducers/centerFormReducer";
import mdParser from "../../../../config/markdown_It_Config";
import {PostUpload} from "../../../../api";
import {getLocalStore, saveLocalStore} from "../../../../utils/localStorageUtils";
// 导入编辑器的样式
import 'react-markdown-editor-lite/lib/index.css';
import "./page_create_markdown.less";


@connect(state => ({centerFormReducer: state.centerFormReducer}))
class PageMarkdown extends React.Component {
    handleEditorChange({text}) {
        this.props.dispatch(centerFormAction({main:text}))
        const {isSaveMain}=this.props
        if (isSaveMain){
            saveLocalStore(text,"create_article_main")
        }
    }

    render() {
        const {main}=this.props.centerFormReducer
        return <MdEditor
            id="editor"
            style={{height: "100%"}}
            config={{
                imageAccept: ".jpg,.png"
            }}
            value={main}
            renderHTML={(text) => mdParser.render(text)}
            onChange={(html) => this.handleEditorChange(html)}
            onImageUpload={(file) => {
                return new Promise(resolve => {
                    let {_id}=this.props.centerFormReducer
                    if(!_id){
                        _id=getLocalStore("create_article_id")
                    }
                    PostUpload(file,_id).then(res => {
                        const images = res.url.split("\\").slice(-2).join("/")
                        resolve(`http://127.0.0.1:5000/images/${images}`)
                    })
                });
            }}
        />
    }
}

export default PageMarkdown