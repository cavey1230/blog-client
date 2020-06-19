import React from 'react';
import {connect} from "react-redux";
import MdEditor from 'react-markdown-editor-lite';

import {centerFormAction} from "../../../../reducers/centerFormReducer";
import mdParser from "../../../../config/markdown_It_Config";
import {PostUpload} from "../../../../api";
import {saveLocalStore} from "../../../../utils/localStorageUtils";
// 导入编辑器的样式
import 'react-markdown-editor-lite/lib/index.css';
import "./page_create_markdown.less";


@connect(state => ({centerFormReducer: state.centerFormReducer.main}))
class PageMarkdown extends React.Component {
    handleEditorChange({text}) {
        this.props.dispatch(centerFormAction({main:text}))
        const {isSaveMain}=this.props
        if (isSaveMain){
            saveLocalStore(text,"create_article_main")
        }
    }

    render() {
        return <MdEditor
            id="editor"
            style={{height: "100%"}}
            config={{
                imageAccept: ".jpg,.png"
            }}
            value={this.props.centerFormReducer}
            renderHTML={(text) => mdParser.render(text)}
            onChange={(html) => this.handleEditorChange(html)}
            onImageUpload={(file) => {
                return new Promise(resolve => {
                    PostUpload(file).then(res => {
                        const images = res.files.image.path.split("\\").slice(-1)
                        console.log(images)
                        resolve(`http://127.0.0.1:5000/images/${images}`)
                    })
                });
            }}
        />
    }
}

export default PageMarkdown