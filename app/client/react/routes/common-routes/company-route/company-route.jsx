
import React from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {MainLayout} from "../../../layout/main-layout/main-layout";
import {AppMainSearch} from "../../../common/app-main-search/app-main-search";
import {companyApi} from "../../../../api/common/company-api";
import {LoadingInline} from "../../../common/loading-inline/loading-inline";
import {customHistory} from "../../routes";

export class CompanyRoute extends React.Component{
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
        return companyApi.getCompanies({filter}).then(({data}) => this.setState({loading: false, list: data, total: data.length}))
    };

    render(){
        let {total, loading, list} = this.state;
        console.log(loading)
        console.log(list)
        return(
            <PageTitle
                title={`Tìm kiếm công ty`}
            >
                <MainLayout>
                    <div className="company-route">
                        <AppMainSearch
                            total={total}
                            onSearch={this.fetchData}
                        />
                        {loading && (
                            <LoadingInline/>
                        )}
                        <div className="container">
                            <p className="route-title">Danh sách công ty</p>
                            <div className="border-box">
                                <div className="list-wrapper">
                                    {list.length ? list.map((each, i) => (
                                        <div className="company" key={each.companyID}
                                             onClick={() => customHistory.push(`/company/${each.companyID}`)}
                                        >

                                            <div className="ava">
                                                <img src={"./assets/image/"+each.avatar}/>
                                            </div>
                                            <p className="name">
                                                {each.companyName}
                                            </p>
                                        </div>
                                    )) : <p className="empty">Không tìm thấy công ty nào</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </MainLayout>
            </PageTitle>
        );
    }
}