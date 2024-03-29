import React, {Component} from 'react';
import classnames from "classnames"
import {customHistory} from "../../routes/routes";
import {CommonInput} from "../common-input/common-input";
import {Select} from "../select/select";
import {cities} from "../city";
import {territories} from "../territory";
import {levels} from "../level";
import {salaries} from "../salary";
import {exs} from "../experiment";
import {workTypes} from "../work-type";
import {genders} from "../gender";
import {desiredLevels} from "../desired-level";

class FullOptionSearch extends Component {
    constructor(props) {
        super(props);
        this.advanceSearch = {
            level: "",
            desiredLevel: "",
            workType: "",
            gender: ""
        };
        this.state = {
            keyword: "",
            territory: "",
            workPlace: "",
            advance: false,
            ...this.advanceSearch
        };
    }

    render() {

        let {keyword, territory, workPlace, level, salary, experiment, desiredLevel, workType, gender} = this.state;

        return (
            <div className="app-search">
                <div className="filter f-input">
                    <CommonInput
                        value={keyword}
                        onChange={e => this.setState({keyword: e.target.value})}
                        placeholder={this.props.placeholder}
                    />
                </div>
                <div className="filter f-select">
                    <Select
                        options={cities}
                        value={workPlace}
                        displayAs={(each) => each.name}
                        getValue={each => each.key}
                        onChange={e => {
                            this.setState({workPlace: e.target.value})
                        }}
                    />
                </div>
                <div className="filter f-select">
                    <Select
                        options={territories}
                        value={territory}
                        displayAs={(each) => each.name}
                        getValue={each => each.key}
                        onChange={e => {
                            this.setState({territory: e.target.value})
                        }}
                    />
                </div>
                <button className="filter f-action btn"
                        onClick={() => this.props.onSearch(this.state)}
                >
                    Tìm kiếm
                </button>
                {this.state.advance && (
                    <div className="advance-search">
                        <div>
                            <Select
                                options={levels}
                                value={level}
                                displayAs={(each) => each.name}
                                getValue={each => each.key}
                                onChange={e => {
                                    this.setState({level: e.target.value})
                                }}
                            />
                            <Select
                                options={workTypes}
                                value={workType}
                                displayAs={(each) => each.name}
                                getValue={each => each.key}
                                onChange={e => {
                                    this.setState({workType: e.target.value})
                                }}
                            />
                            <Select
                                options={genders}
                                value={gender}
                                displayAs={(each) => each.name}
                                getValue={each => each.key}
                                onChange={e => {
                                    this.setState({gender: e.target.value})
                                }}
                            />
                        </div>
                        <div className="mt-3">

                            <Select
                                options={desiredLevels}
                                value={desiredLevel}
                                displayAs={(each) => each.name}
                                getValue={each => each.key}
                                onChange={e => {
                                    this.setState({desiredLevel: e.target.value})
                                }}
                            />
                        </div>
                    </div>
                )}
                <div className="toggle"
                     onClick={() => {
                         this.setState({advance: !this.state.advance})
                         if(this.state.advance){
                             this.setState({...this.advanceSearch})
                         }
                     }}
                >
                    {this.state.advance ? "Ẩn tìm kiếm nâng cao" : "Hiện tìm kiếm nâng cao"}
                </div>
            </div>
        )
    }
}

class CompanySearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ""
        };
    }

    render() {
        let {keyword} = this.state;
        return (
            <div className="app-search">
                <div className="filter f-input company-search">
                    <CommonInput
                        value={keyword}
                        onChange={e => this.setState({keyword: e.target.value})}
                        placeholder={this.props.placeholder}
                    />
                </div>
                <button className="filter f-action btn"
                        onClick={() => this.props.onSearch(this.state)}
                >
                    Tìm kiếm
                </button>

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
                        onSearch={this.props.onSearch}
                        total={this.props.total}
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
                        placeholder={"Tìm bằng tên, email, SĐT, nghề nghiệp của ứng viên"}
                        onSearch={this.props.onSearch}
                        total={this.props.total}
                    />
                )
            }
        },
        {
            url: "/cong-ty",
            label: "Tìm bằng tên công ty",
            render: () => {
                return (
                    <CompanySearch
                        placeholder={"Tìm bằng tên công ty"}
                        onSearch={this.props.onSearch}
                        total={this.props.total}
                    />
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
                                <div
                                    className={classnames("nav-item", {active: each.url === customHistory.location.pathname})}
                                    key={each.url} onClick={() => customHistory.push(each.url)}>
                                    {each.label}
                                </div>
                            ))}
                        </div>
                        <div className="search-wrapper">
                            {currentSearch.render()}
                            <p className="summary">Tìm thấy {this.props.total} kết quả {this.props.tail}.</p>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
