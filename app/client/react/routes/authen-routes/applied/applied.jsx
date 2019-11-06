import React, {Component} from 'react';
import {PageTitle} from "../../../common/page-title/page-title";
import {MainLayout} from "../../../layout/main-layout/main-layout";
import {LoadingInline} from "../../../common/loading-inline/loading-inline";
import {companyApi} from "../../../../api/common/company-api";
import {userInfo} from "../../../../common/states/common";
import {Badge} from "../../../common/badge/badge";
import moment from "moment";
import {customHistory} from "../../routes";

export class AppliedRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            list: []
        };
        companyApi.getApplied(userInfo.getState().companyID).then(({data: list}) => this.setState({
            list,
            loading: false
        })).catch(() => this.setState({loading: false}));
    }
    convertToSalaryWord = salary => (salary / 1000000).toString() + " triệu";
    render() {
        let {loading, list} = this.state;
        return (
            <PageTitle
                title={`Danh sách người ứng tuyển`}
            >
                <MainLayout>
                    <div className="applied-route">
                        <div className="container">
                            {loading ? (
                                <LoadingInline/>
                            ) : (
                                <div className="route-wrapper">
                                    <div className="fancy-header">
                                        <p className="content">Danh sách người ứng tuyển</p>
                                        <p className="underline"></p>
                                    </div>
                                    <div className="applied-list">
                                        {list.length ? list.map((each) => (
                                            <div className={"item"} key={each.candidateID}>
                                                <div className="avatar">
                                                    <div className="img-wrapper">
                                                        <img src={`/assets/image/${each.avatar}`}/>
                                                    </div>
                                                </div>
                                                <div className="main-detail">
                                                    <p className="name">{each.fullname}</p>
                                                    <p className="label">{each.label}</p>
                                                </div>
                                                <div className="sub-details">
                                                    <div className="row">
                                                        <div className="col-6 p-0 m-0">
                                                            <span className="label">Email:</span>
                                                            <span className="value">
                                                                {each.email}
                                                            </span>
                                                        </div>
                                                        <div className="col-6 p-0 m-0">
                                                            <span className="label">SĐT:</span>
                                                            <span className="value">
                                                                {each.phone}
                                                            </span>
                                                        </div>
                                                        <div className="col-6 p-0 m-0">
                                                            <span className="label">Địa chỉ:</span>
                                                            <span className="value">
                                                                {each.address}
                                                            </span>
                                                        </div>
                                                        <div className="col-6 p-0 m-0">
                                                            <span className="label">Mức lương:</span>
                                                        <span className="salary-range value">
                                                        {this.convertToSalaryWord(each.salaryStart)} - {this.convertToSalaryWord(each.salaryEnd)}
                                                    </span>


                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='btn join-btn' onClick={() => customHistory.push(`/candidate/${each.candidateID}`)}>Chi tiết</div>
                                            </div>
                                        )) : <p className="empty">Không có ứng viên nào</p>}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </MainLayout>
            </PageTitle>
        );
    }
}
