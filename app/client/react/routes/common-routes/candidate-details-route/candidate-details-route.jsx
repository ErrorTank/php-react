import React, {Component} from 'react';
import {PageTitle} from "../../../common/page-title/page-title";
import {MainLayout} from "../../../layout/main-layout/main-layout";
import {LoadingInline} from "../../../common/loading-inline/loading-inline";
import {Badge} from "../../../common/badge/badge";
import {formatMoney} from "../../../../common/utils/common";
import moment from "moment";
import {customHistory} from "../../routes";
import {candidateApi} from "../../../../api/common/candidate-api";

export class CandidateDetailsRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            candidate: null
        };
        candidateApi.getCandidateDetails(props.match.params.candidateID).then(candidate => this.setState({candidate: {...candidate}, loading: false}));

    }



    render() {
        let {loading, candidate} = this.state;
        return (
            <PageTitle
                title={loading ? `Loading...` : "Hồ sơ ứng viên " + candidate.fullname}
            >
                <MainLayout>
                    <div className="candidate-details-route">
                        {loading ? (
                            <LoadingInline/>
                        ) : (
                            <div className="route-wrapper">
                                <div className="container">
                                    <div className="row p-0 m-0">
                                        <div className="j-header col-12 col-md-10 col-lg-9 m-0 p-0">
                                            <div className="avatar">
                                                <div className="img-wrapper">
                                                    <img src={`/assets/image/${candidate.avatar}`}/>
                                                </div>
                                            </div>
                                            <div className={"upper"}>
                                                <p className="name">{candidate.fullname}</p>
                                                <p className="label">{candidate.label}</p>
                                            </div>
                                            <div className="below">
                                                <div className="row m-0 p-0">
                                                    <div className="col-6 m-0 p-0">
                                                        <i className="far fa-calendar-alt"></i>
                                                        <span className="value">
                                                            {moment(new Date(candidate.dob)).format("DD/MM/YYYY")}
                                                        </span>
                                                    </div>
                                                    <div className="col-6 m-0 p-0">
                                                        {candidate.gender == "0" ? <i className="fas fa-mars"></i> :
                                                            <i className="fas fa-venus"></i> }
                                                        <span className="value">
                                                            {candidate.gender == '0' ? "Nam" : "Nữ"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="row m-0 p-0" style={{marginTop: "5px !important"}}>
                                                    <div className="col-6 m-0 p-0">
                                                        <i className="fas fa-map-marker-alt"></i>
                                                        <span className="value">
                                                            {candidate.address}
                                                        </span>
                                                    </div>
                                                    <div className="col-6 m-0 p-0">
                                                        <i className="fas fa-phone"></i>
                                                        <span className="value">
                                                            {candidate.phone}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="row m-0 p-0" style={{marginTop: "5px !important"}}>
                                                    <div className="col-6 m-0 p-0">
                                                        <i className="far fa-envelope"></i>
                                                        <span className="value">
                                                            {candidate.email}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="j-body col-12 col-md-10 col-lg-9 m-0">
                                            <div className="section">
                                                <div className="fancy-header">
                                                    <p className="content">Thông tin hồ sơ</p>
                                                    <p className="underline"></p>
                                                </div>
                                                <div className="content">
                                                    <div className="row p-0 m-0">
                                                        <div className="item col-6 p-0 m-0">
                                                            <span className="label">Ngành nghề:</span>
                                                            <span className="value">
                                                            {candidate.territories.map((each) => (
                                                                <Badge
                                                                    key={each.territoryID}
                                                                    content={each.label}
                                                                    className={"blue-badge"}
                                                                />
                                                            ))}
                                                        </span>
                                                        </div>
                                                        <div className="item col-6 p-0 m-0">
                                                            <span className="label">Nơi làm việc:</span>
                                                            <span className="value">
                                                            {candidate.places.map((each) => (
                                                                <Badge
                                                                    key={each.wpID}
                                                                    content={each.label}
                                                                    className={"blue-badge"}
                                                                />
                                                            ))}
                                                        </span>
                                                        </div>
                                                        <div className="item col-6 p-0 m-0">
                                                            <span className="label">Trình độ học vấn:</span>
                                                            <span className="value">{candidate.selfLevel}</span>
                                                        </div>
                                                        <div className="item col-6 p-0 m-0">
                                                            <span className="label">Loại hình công việc:</span>
                                                            <span
                                                                className="value">{candidate.workType == "fulltime" ? "Toàn thời gian" : "Bán thời gian"}</span>
                                                        </div>
                                                        <div className="item col-6 p-0 m-0">
                                                            <span className="label">Cấp bậc mong muốn:</span>
                                                            <span className="value">{candidate.desiredLevel}</span>
                                                        </div>
                                                        <div className="item col-6 p-0 m-0">
                                                            <span className="label">Mức lương mong muốn:</span>
                                                            <span className="value text-danger">{(candidate.salaryStart / 1000000).toFixed(0)} - {(candidate.salaryEnd / 1000000).toFixed(0)} Triệu</span>
                                                        </div>
                                                        <div className="item col-6 p-0 m-0">
                                                            <span className="label">Số năm kinh nghiệm:</span>
                                                            <span className="value text-danger">{candidate.experimentTime} năm</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="section">
                                                <div className="fancy-header">
                                                    <p className="content"> Mục tiêu nghề nghiệp</p>
                                                    <p className="underline"></p>
                                                </div>
                                                <div className="content text-content">
                                                    {candidate.selfTarget}
                                                </div>

                                            </div>
                                            <div className="section">
                                                <div className="fancy-header">
                                                    <p className="content">Kỹ năng bản thân</p>
                                                    <p className="underline"></p>
                                                </div>
                                                <div className="content text-content">
                                                    {candidate.selfSkill}
                                                </div>

                                            </div>

                                        </div>
                                        {/*<div className="j-footer">*/}
                                        {/*    <div className="section">*/}
                                        {/*        <div className="fancy-header">*/}
                                        {/*            <p className="content">Thông tin liên hệ</p>*/}
                                        {/*            <p className="underline"></p>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="content contact">*/}
                                        {/*            {Object.keys(job.contact).map((each, i) => (*/}
                                        {/*                <div className="row" key={i}>*/}
                                        {/*                    <p className="label col-5 p-0">{this.renderContactTitle(each)}</p>*/}
                                        {/*                    <p className="value col-7 p-0">{job.contact[each]}</p>*/}
                                        {/*                </div>*/}
                                        {/*            ))}*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
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
