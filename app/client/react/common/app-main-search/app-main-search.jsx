import React, {Component} from 'react';
import classnames from "classnames"
import {customHistory} from "../../routes/routes";

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
        return (
            <div className="full-option-search">

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
                        placeholder={"Tên công việc"}
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
                        placeholder={"Tên ứng viên"}
                    />
                )
            }
        },
        {
            url: "/cong-ty",
            label: "Tìm công ty",
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
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
