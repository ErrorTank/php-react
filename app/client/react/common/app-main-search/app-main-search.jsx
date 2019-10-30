import React, {Component} from 'react';
import classnames from "classnames"
import {customHistory} from "../../routes/routes";
import {CommonInput} from "../common-input/common-input";

class FullOptionSearch extends Component{
    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
            territory: null,
            workPlace: null
        };
    }

    render() {
        let {keyword, territory, workPlace} = this.state;
        return (
            <div className="full-option-search">
                <div className="input-wrapper">
                    <div className="filter f-input">
                        <CommonInput
                            value={keyword}
                            onChange={e => this.setState({keyword: e.target.value})}
                            placeholder={this.props.placeholder}
                        />
                    </div>
                    <div className="filter f-select">

                    </div>
                    <div className="filter f-select">

                    </div>
                    <button className="filter f-action btn">
                        Tìm kiếm
                    </button>
                </div>

            </div>
        )
    }
}
class CompanySearch extends Component{
    constructor(props) {
        super(props);
        this.state = {
            keyword: ""
        };
    }
    render() {
        return (
            <div className="company-search">

            </div>
        )
    }
}

export class AppMainSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    searchContents = [
        {
            url: "/",
            label: "Tìm việc làm",
            render: () => {
                return (
                    <FullOptionSearch
                        placeholder={"Tìm bằng tên công việc"}
                    />
                )
            }
        },
        {
            url: "/ung-vien",
            label: "Tìm ứng viên",
            render: () => {
                return (
                    <FullOptionSearch
                        placeholder={"Tìm bằng tên ứng viên"}
                    />
                )
            }
        },
        {
            url: "/cong-ty",
            label: "Tìm bằng tên công ty",
            render: () => {
                return (
                    <CompanySearch/>
                )
            }
        },
    ];

    render() {
        let currentSearch = this.searchContents.find(each => each.url === customHistory.location.pathname);
        console.log(customHistory)
        return (
            <div className="app-main-search">
                <div className="container">
                    <div className="wrapper">
                        <div className="navigations">
                            {this.searchContents.map((each) => (
                                <div className={classnames("nav-item", {active: each.url === customHistory.location.pathname})} key={each.url} onClick={() => customHistory.push(each.url)}>
                                    {each.label}
                                </div>
                            ))}
                        </div>
                        <div className="search-wrapper">
                            {currentSearch.render()}
                            <p className="summary"></p>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
