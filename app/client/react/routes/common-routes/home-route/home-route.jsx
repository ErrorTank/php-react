import React from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {MainLayout} from "../../../layout/main-layout/main-layout";
import {AppMainSearch} from "../../../common/app-main-search/app-main-search";
import {LoadingInline} from "../../../common/loading-inline/loading-inline";
import {jobApi} from "../../../../api/common/job-api";
import {customHistory} from "../../routes";
import moment from "moment"

export class HomeRoute extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list: [],
            total: 0,
            loading: true
        };
        this.fetchData();
    };

    fetchData = filter => {
      return jobApi.getJobs({filter}).then(({data}) => {
          this.setState({loading: false, list: [], total: 0})
          if(data){
              this.setState({list: data, total: data.length})
          }
      })
    };

    convertToSalaryWord = salary => (salary / 1000000).toString() + " triệu";

    render(){
        let {total, loading, list} = this.state;
        console.log(loading)
        console.log(list)
        return(
            <PageTitle
                title={`Tìm kiếm việc làm`}
            >
                <MainLayout>
                    <div className="home-route">
                        <AppMainSearch
                            total={total}
                            onSearch={this.fetchData}
                            tail={"Việc làm"}
                        />
                        {loading && (
                            <LoadingInline/>
                        )}
                        <div className="container">
                            <p className="route-title">Danh sách việc làm</p>
                            <div className="border-box">
                                <div className="list-wrapper">
                                    {list.length ? list.map((each, i) => (
                                        <div className="job" key={each.jobID}
                                             onClick={() => customHistory.push(`/job/${each.jobID}`)}
                                        >

                                            <div className="ava">
                                                <img src={"./assets/image/"+each.owner.avatar}/>
                                            </div>
                                            <div className="details">
                                                <p className="job-label">{each.label}</p>
                                                <p className="com-name">{each.owner.companyName}</p>
                                                <div className="more">
                                                    <span className="salary-range">
                                                        {this.convertToSalaryWord(each.salaryStart)} - {this.convertToSalaryWord(each.salaryEnd)}
                                                    </span>
                                                    <span className="deadline">{moment(new Date(each.deadline)).format("DD/MM/YYYY")}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )) : <p className="empty">Không tìm thấy ứng viên nào</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </MainLayout>
            </PageTitle>
        );
    }
}