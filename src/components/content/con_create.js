import React, {Component} from 'react';
import ConList from "./con_create_com/list/con_list";
import ConMarkdown from "./con_create_com/markdown/con_markdown";


import "./normal.less"

class ConCreate extends Component {
    render() {
        return (
            <div className="content_reset">
                <div className="create_pad">
                    <div className="left_pad">
                        <ConList/>
                    </div>
                    <div className="right_pad">
                        <ConMarkdown/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConCreate;