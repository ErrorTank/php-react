import React from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {MainLayout} from "../../../layout/main-layout/main-layout";

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
                        <div className="container">
                        </div>
                    </div>
                </MainLayout>
            </PageTitle>
        );
    }
}