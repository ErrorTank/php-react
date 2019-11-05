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
                                        <div className="j-header col-12 col-md-10 col-lg-8">

                                        </div>
                                        {/*<div className="j-body">*/}
                                        {/*    <div className="section">*/}
                                        {/*        <div className="fancy-header">*/}
                                        {/*            <p className="content">Thông tin tuyển dụng nhanh</p>*/}
                                        {/*            <p className="underline"></p>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="content">*/}
                                        {/*            <div className="row p-0 m-0">*/}
                                        {/*                <div className="item col-6 p-0 m-0">*/}
                                        {/*                    <span className="label">Kinh nghiệm:</span>*/}
                                        {/*                    <span className="value">{job.requiredExperiment}</span>*/}
                                        {/*                </div>*/}
                                        {/*                <div className="item col-6 p-0 m-0">*/}
                                        {/*                    <span className="label">Hình thức làm việc:</span>*/}
                                        {/*                    <span*/}
                                        {/*                        className="value">{job.workType == "fulltime" ? "Toàn thời gian" : "Bán thời gian"}</span>*/}
                                        {/*                </div>*/}
                                        {/*                <div className="item col-6 p-0 m-0">*/}
                                        {/*                    <span className="label">Yêu cầu bằng cấp:</span>*/}
                                        {/*                    <span className="value">{job.requiredLevel}</span>*/}
                                        {/*                </div>*/}
                                        {/*                <div className="item col-6 p-0 m-0">*/}
                                        {/*                    <span className="label">Chức vụ:</span>*/}
                                        {/*                    <span className="value">{job.desiredLevel}</span>*/}
                                        {/*                </div>*/}
                                        {/*                <div className="item col-6 p-0 m-0">*/}
                                        {/*                    <span className="label">Số lượng cần tuyển:</span>*/}
                                        {/*                    <span className="value">{job.quantity}</span>*/}
                                        {/*                </div>*/}
                                        {/*                <div className="item col-6 p-0 m-0">*/}
                                        {/*                    <span className="label">Yêu cầu giới tính:</span>*/}
                                        {/*                    <span*/}
                                        {/*                        className="value">{job.requiredGender == '1' ? "Nam" : "Nữ"}</span>*/}
                                        {/*                </div>*/}
                                        {/*                <div className="item col-12 p-0 m-0">*/}
                                        {/*                    <span className="label">Ngành nghề:</span>*/}
                                        {/*                    <span className="value">*/}
                                        {/*                    {job.territories.map((each) => (*/}
                                        {/*                        <Badge*/}
                                        {/*                            key={each.territoryID}*/}
                                        {/*                            content={each.label}*/}
                                        {/*                            className={"blue-badge"}*/}
                                        {/*                        />*/}
                                        {/*                    ))}*/}
                                        {/*                </span>*/}
                                        {/*                </div>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*    <div className="section">*/}
                                        {/*        <div className="fancy-header">*/}
                                        {/*            <p className="content">Mô tả công việc</p>*/}
                                        {/*            <p className="underline"></p>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="content text-content">*/}
                                        {/*            {job.description}*/}
                                        {/*        </div>*/}

                                        {/*    </div>*/}
                                        {/*    <div className="section">*/}
                                        {/*        <div className="fancy-header">*/}
                                        {/*            <p className="content">Quyền lợi được hưởng</p>*/}
                                        {/*            <p className="underline"></p>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="content text-content">*/}
                                        {/*            {job.priority}*/}
                                        {/*        </div>*/}

                                        {/*    </div>*/}
                                        {/*    <div className="section">*/}
                                        {/*        <div className="fancy-header">*/}
                                        {/*            <p className="content">Yêu cầu công việc</p>*/}
                                        {/*            <p className="underline"></p>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="content text-content">*/}
                                        {/*            {job.jobRequired}*/}
                                        {/*        </div>*/}

                                        {/*    </div>*/}
                                        {/*    <div className="section">*/}
                                        {/*        <div className="fancy-header">*/}
                                        {/*            <p className="content">Yêu cầu hồ sơ</p>*/}
                                        {/*            <p className="underline"></p>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="content text-content">*/}
                                        {/*            {job.itemRequired}*/}
                                        {/*        </div>*/}

                                        {/*    </div>*/}
                                        {/*</div>*/}
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
