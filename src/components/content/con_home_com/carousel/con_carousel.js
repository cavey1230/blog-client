import React, {Component} from 'react';
import {Input, AutoComplete} from 'antd';
import {UserOutlined} from '@ant-design/icons';

import "./con_carousel.less"
import small from "../../../../assets/small.png";

class ConCarousel extends Component {
    renderTitle = title => (
        <span>
    {title}
            <a
                style={{
                    float: 'right',
                }}
                href="https://www.google.com/search?q=antd"
                target="_blank"
                rel="noopener noreferrer"
            >
      more
    </a>
  </span>
    );

    renderItem = (title, count) => ({
        value: title,
        label: (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {title}
                <span>
        <UserOutlined/> {count}
      </span>
            </div>
        ),
    });

    options = [
        {
            label: this.renderTitle('Libraries'),
            options: [this.renderItem('AntDesign', 10000), this.renderItem('AntDesign UI', 10600)],
        },
        {
            label: this.renderTitle('Solutions'),
            options: [this.renderItem('AntDesign UI FAQ', 60100), this.renderItem('AntDesign FAQ', 30010)],
        },
        {
            label: this.renderTitle('Articles'),
            options: [this.renderItem('AntDesign design language', 100000)],
        },
    ];

    render() {
        return (
            <div className="con_carousel">
                <div className="con_carousel_title">
                    <img src={small} alt="large" />
                </div>
                <AutoComplete
                    dropdownClassName="certain-category-search-dropdown"
                    dropdownMatchSelectWidth={300}
                    className="con_carousel_search"
                    options={this.options}
                >
                    <Input.Search size="large" placeholder="input here" />
                </AutoComplete>
            </div>
        );
    }
}

export default ConCarousel;