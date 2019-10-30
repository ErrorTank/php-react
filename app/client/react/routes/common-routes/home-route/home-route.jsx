import React from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {MainLayout} from "../../../layout/main-layout/main-layout";
import {AppMainSearch} from "../../../common/app-main-search/app-main-search";

export class HomeRoute extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        return(
            <PageTitle
                title={`Tìm kiếm việc làm`}
            >
                <MainLayout>
                    <div className="home-route">
                        <AppMainSearch/>
                        <div className="container">

                        </div>
                    </div>
                </MainLayout>
            </PageTitle>
        );
    }
}