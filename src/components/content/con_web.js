import React, {Component} from 'react';

import ConRadio from "./con_web_com/radio/con_radio";
import ConList from "./con_web_com/list/con_list";
import RadioOrder from"../../highOrder/radioOrder";

import "./normal.less"

class ConWeb extends Component {
    RadioOrder=RadioOrder(ConRadio)
    render() {
        return (
            <div>
                <div className="content_reset">
                    <div className="web_pad">
                        <div className="left_pad">
                            <this.RadioOrder/>
                            <div>TIPS：点击下拉箭头即可取消查询</div>
                        </div>
                        <div className="right_pad">
                            <ConList/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConWeb;