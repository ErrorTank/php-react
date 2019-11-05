import React, {Component} from 'react';
import {jobApi} from "../../../../api/common/job-api";
import {PageTitle} from "../../../common/page-title/page-title";
import {MainLayout} from "../../../layout/main-layout/main-layout";
import {LoadingInline} from "../../../common/loading-inline/loading-inline";
import {Badge} from "../../../common/badge/badge";
import {formatMoney} from "../../../../common/utils/common";
import moment from "moment";
import {customHistory} from "../../routes";

export class JobDetailsRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            job: null
        };
        jobApi.getJobDetails(props.match.params.jobID).then(job => this.setState({job: {...job, contact: JSON.parse(job.contact)}, loading: false}));

    }

    renderContactTitle = title => {
        let matcher = {
            "contactTo": "Người liên hệ",
            "address": "Địa chỉ",
            "phone": "Điện thoại",
            "email": "Địa chỉ email"
        }
        return matcher[title];
    };

    render() {
        let {loading, job} = this.state;
        console.log(job);
        return (
            <PageTitle
                title={loading ? `Loading...` : "Tuyển " + job.label}
            >
                <MainLayout>
                    <div className="job-route">
                        {loading ? (
                            <LoadingInline/>
                        ) : (
                            <div className="route-wrapper">
                                <div className="container">
                                    <div className="j-header">
                                        <div className="avatar">
                                            <div className="img-wrapper">
                                                <img src={"/assets/image/" + job.owner.avatar}/>
                                            </div>
                                        </div>
                                        <div className="detail">
                                            <p className="name">{job.label}</p>
                                            <div className="more"><span className="label">Địa điểm tuyển dụng:</span>
                                                <span className="place">{
                                                    job.places.map((each) => (
                                                        <Badge
                                                            key={each.wpID}
                                                            content={each.label}
                                                            className={"blue-badge"}
                                                        />
                                                    ))
                                                }</span></div>
                                            <div className="more"><span className="label">Mức lương:</span><span
                                                className="salary">{formatMoney(job.salaryStart)} VNĐ - {formatMoney(job.salaryEnd)} VNĐ</span>
                                            </div>
                                            <div className="more"><span className="label">Hạn nộp hồ sơ:</span><span
                                                className="deadline">{moment(new Date(job.deadline)).format("DD/MM/YYYY")}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="j-body">
                                        <div className="section">
                                            <div className="fancy-header">
                                                <p className="content">Thông tin tuyển dụng nhanh</p>
                                                <p className="underline"></p>
                                            </div>
                                            <div className="content">
                                                <div className="row p-0 m-0">
                                                    <div className="item col-6 p-0 m-0">
                                                        <span className="label">Kinh nghiệm:</span>
                                                        <span className="value">{job.requiredExperiment}</span>
                                                    </div>
                                                    <div className="item col-6 p-0 m-0">
                                                        <span className="label">Hình thức làm việc:</span>
                                                        <span
                                                            className="value">{job.workType == "fulltime" ? "Toàn thời gian" : "Bán thời gian"}</span>
                                                    </div>
                                                    <div className="item col-6 p-0 m-0">
                                                        <span className="label">Yêu cầu bằng cấp:</span>
                                                        <span className="value">{job.requiredLevel}</span>
                                                    </div>
                                                    <div className="item col-6 p-0 m-0">
                                                        <span className="label">Chức vụ:</span>
                                                        <span className="value">{job.desiredLevel}</span>
                                                    </div>
                                                    <div className="item col-6 p-0 m-0">
                                                        <span className="label">Số lượng cần tuyển:</span>
                                                        <span className="value">{job.quantity}</span>
                                                    </div>
                                                    <div className="item col-6 p-0 m-0">
                                                        <span className="label">Yêu cầu giới tính:</span>
                                                        <span
                                                            className="value">{job.requiredGender == '0' ? "Nam" : "Nữ"}</span>
                                                    </div>
                                                    <div className="item col-12 p-0 m-0">
                                                        <span className="label">Ngành nghề:</span>
                                                        <span className="value">
                                                            {job.territories.map((each) => (
                                                                <Badge
                                                                    key={each.territoryID}
                                                                    content={each.label}
                                                                    className={"blue-badge"}
                                                                />
                                                            ))}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="section">
                                            <div className="fancy-header">
                                                <p className="content">Mô tả công việc</p>
                                                <p className="underline"></p>
                                            </div>
                                            <div className="content text-content">
                                                {job.description}
                                            </div>

                                        </div>
                                        <div className="section">
                                            <div className="fancy-header">
                                                <p className="content">Quyền lợi được hưởng</p>
                                                <p className="underline"></p>
                                            </div>
                                            <div className="content text-content">
                                                {job.priority}
                                            </div>

                                        </div>
                                        <div className="section">
                                            <div className="fancy-header">
                                                <p className="content">Yêu cầu công việc</p>
                                                <p className="underline"></p>
                                            </div>
                                            <div className="content text-content">
                                                {job.jobRequired}
                                            </div>

                                        </div>
                                        <div className="section">
                                            <div className="fancy-header">
                                                <p className="content">Yêu cầu hồ sơ</p>
                                                <p className="underline"></p>
                                            </div>
                                            <div className="content text-content">
                                                {job.itemRequired}
                                            </div>

                                        </div>
                                    </div>
                                    <div className="j-body2">
                                        <div className="avatar">
                                            <img src={"/assets/image/" + job.owner.avatar}/>
                                        </div>
                                        <p className="name" onClick={() => customHistory.push(`/company/${job.owner.companyID}`)}>{job.owner.companyName}</p>
                                        <p className="more"><span>Địa chỉ: </span>{job.owner.address}</p>
                                        <p className="more"><span>Số điện thoại: </span>{job.owner.phone}</p>
                                        <p className="more"><span>Email: </span>{job.owner.email}</p>
                                    </div>
                                    <div className="j-footer">
                                        <div className="section">
                                            <div className="fancy-header">
                                                <p className="content">Thông tin liên hệ</p>
                                                <p className="underline"></p>
                                            </div>
                                            <div className="content contact">
                                                {Object.keys(job.contact).map((each, i) => (
                                                    <div className="row" key={i}>
                                                        <p className="label col-5 p-0">{this.renderContactTitle(each)}</p>
                                                        <p className="value col-7 p-0">{job.contact[each]}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                        }
                    </div>
                </MainLayout>
            </PageTitle>
        );
    }
}
