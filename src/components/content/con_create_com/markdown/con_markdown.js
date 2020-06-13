import React from 'react';
import {connect} from "react-redux";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import {centerFormAction} from "../../../../reducers/centerFormReducer";
// 导入编辑器的样式
import 'react-markdown-editor-lite/lib/index.css';
import "./con_markdown.less";

const mdParser = new MarkdownIt();

@connect(state=>({centerFormReducer:state.centerFormReducer}))
class ConMarkdown extends React.Component {
    handleEditorChange({text}) {
        this.props.dispatch(centerFormAction(text))
    }

    render() {
        return <MdEditor
            id="editor"
            style={{height: "100%"}}
            renderHTML={(text) => mdParser.render(text)}
            onChange={(html) => this.handleEditorChange(html)}
        />
    }
}

export default ConMarkdown