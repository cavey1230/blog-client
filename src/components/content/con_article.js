import React, {Component} from 'react';
import ConBreadcrumb from "./con_article_com/con_breadcrumb";
import ConMainArti from "./con_article_com/con_mainArti";

import "./normal.less"

class ConArticle extends Component {
    render() {
        return (
            <div>
                <div className="content_reset">
                    <div className="con_article_main">
                        <ConBreadcrumb/>
                        <ConMainArti/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConArticle;