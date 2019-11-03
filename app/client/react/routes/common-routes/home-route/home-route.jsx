import React from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {MainLayout} from "../../../layout/main-layout/main-layout";
import {AppMainSearch} from "../../../common/app-main-search/app-main-search";
import {LoadingInline} from "../../../common/loading-inline/loading-inline";
import {jobApi} from "../../../../api/common/job-api";

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
      return jobApi.getJobs({filter}).then(({list, total}) => this.setState({loading: false, list, total}))
    };

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
                        />
                        {loading && (
                            <LoadingInline/>
                        )}
                        <div className="container">

                        </div>
                    </div>
                </MainLayout>
            </PageTitle>
        );
    }
}