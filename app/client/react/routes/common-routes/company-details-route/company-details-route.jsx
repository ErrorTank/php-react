import React, {Component} from 'react';
import {PageTitle} from "../../../common/page-title/page-title";
import {MainLayout} from "../../../layout/main-layout/main-layout";
import {companyApi} from "../../../../api/common/company-api";
import {customHistory} from "../../routes";
import {jobApi} from "../../../../api/common/job-api";
import {LoadingInline} from "../../../common/loading-inline/loading-inline";
import moment from "moment";
import {formatMoney} from "../../../../common/utils/common";

export class CompanyDetailsRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            jobs: null,
            details: null
        };

        let companyID = props.match.params.companyID;
        Promise.all([companyApi.getCompanyDetails(companyID), jobApi.getJobsByCompanyID(companyID)]).then(([details, {data: jobs}]) => {
            this.setState({details, jobs, loading: false});

        })


    }

    render() {
        let {loading, jobs, details} = this.state;
        console.log(details)
        console.log(jobs)
        return (
            <PageTitle
                title={loading ? `Loading...` : details.companyName}
            >
                <MainLayout>
                    <div className="company-details-route">
                        {loading ? (
                            <LoadingInline/>
                        ) : (
                            <>
                                <div className={"cdr-header"}>
                                    <div className="container">
                                        <div className="header-content">
                                            <div className="logo">
                                                <img src={"/assets/image/"+details.avatar}/>
                                            </div>
                                            <div className="detail">
                                                <p className="name">{details.companyName}</p>
                                                <p className="address"><i className="fas fa-map-marker-alt"></i> {details.address}</p>
                                                <p className="contact">
                                                    <span><i className="fas fa-envelope"></i> {details.email}</span>
                                                    <span className="separate">|</span>
                                                    <span><i className="fas fa-phone"></i> {details.phone}</span>
                                                </p>
                                            </div>
                                            <div className="summary">
                                                <div className="box">
                                                    <p className="count">{jobs  ? jobs.length : 0}</p>
                                                    <p className="label">việc làm</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="cdr-jobs">
                                    <div className="container">
                                        <div className="jobs-wrapper">
                                            <div className="fancy-header">
                                                <p className="content">Việc làm hấp dẫn</p>
                                                <p className="underline"></p>
                                            </div>
                                            <div className="jobs">
                                                {(jobs && jobs.length) ? jobs.map((each => {
                                                    return (
                                                        <div className="job" key={each.jobID}>
                                                            <div className="detail">
                                                                <p className="label">{each.label}</p>
                                                                <p className="sub">
                                                                    <span>Số lượng: {each.quantity} người</span>
                                                                    <span className="separate">|</span>
                                                                    <span><i className="fas fa-map-marker-alt"></i> {each.workPlaces.map((each) => (
                                                                        <span className="wp" key={each.wpID}>
                                                                            {each.label}
                                                                        </span>
                                                                    ))}</span>
                                                                </p>
                                                            </div>
                                                            <div className="more">
                                                                <p className="deadline"><i className="far fa-clock"></i> Hạn nộp hồ sơ: {moment(new Date(each.deadline)).format("DD/MM/YYYY")}</p>
                                                                <p className="salary-range"><i className="fas fa-dollar-sign"></i> {formatMoney(each.salaryStart)} VNĐ - {formatMoney(each.salaryEnd)} VNĐ</p>
                                                            </div>
                                                            <div className='btn join-btn'>Chi tiết</div>
                                                        </div>
                                                    )
                                                })) : <p className="empty">Không có việc làm nào</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="cdr-description">
                                    <div className="container">
                                        <div className="des-wrapper">
                                            <div className="fancy-header">
                                                <p className="content">Giới thiệu công ty</p>
                                                <p className="underline"></p>
                                            </div>
                                            <div className="description">
                                                {details.description}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </>
                        )}

                    </div>
                </MainLayout>
            </PageTitle>
        );
    }
}
