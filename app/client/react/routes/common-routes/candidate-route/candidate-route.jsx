import React from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {MainLayout} from "../../../layout/main-layout/main-layout";
import {AppMainSearch} from "../../../common/app-main-search/app-main-search";
import {candidateApi} from "../../../../api/common/candidate-api";
import {customHistory} from "../../routes";


export class CandidateRoute extends React.Component{
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
        return candidateApi.getCandidates({filter}).then(({data}) => {
            this.setState({loading: false, list: [], total: 0})
            if(data){
                this.setState({list: data, total: data.length})
            }
        })
    };


    render(){
        let {total, loading, list} = this.state;
        console.log(loading)
        console.log(list)
        return(
            <PageTitle
                title={`Tìm kiếm ứng viên`}
            >
                <MainLayout>
                    <div className="candidate-route">
                        <AppMainSearch
                            total={total}
                            onSearch={this.fetchData}
                            tail={"Ứng viên"}
                        />
                        <div className="container">
                            <p className="route-title">Danh sách ứng viên</p>
                            <div className="border-box">
                                <div className="list-wrapper">
                                    {list.length ? list.map((each, i) => (
                                        <div className="candidate" key={each.candidateID}
                                             onClick={() => customHistory.push(`/candidate/${each.candidateID}`)}
                                        >

                                            <div className="ava">
                                                <img src={"./assets/image/"+each.avatar}/>
                                            </div>
                                            <div className="details">
                                                <p className="user-label">{each.label}</p>
                                                <p className="user-name">{each.fullname}</p>
                                                <p className="user-ex">Kinh nghiệm: <span>{each.experimentTime} năm</span></p>
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