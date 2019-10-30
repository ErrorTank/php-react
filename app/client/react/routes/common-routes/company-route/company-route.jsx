
import React from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {MainLayout} from "../../../layout/main-layout/main-layout";
import {AppMainSearch} from "../../../common/app-main-search/app-main-search";

export class CompanyRoute extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        return(
            <PageTitle
                title={`Tìm kiếm công ty`}
            >
                <MainLayout>
                    <div className="candidate-route">
                        <div className="container">
                            <AppMainSearch/>
                        </div>
                    </div>
                </MainLayout>
            </PageTitle>
        );
    }
}