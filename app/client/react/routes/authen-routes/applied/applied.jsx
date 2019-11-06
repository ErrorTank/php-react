import React, {Component} from 'react';
import {PageTitle} from "../../../common/page-title/page-title";
import {MainLayout} from "../../../layout/main-layout/main-layout";

export class AppliedRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            list: []
        };
    }

    render() {
        let {loading} = this.state;
        return (
            <PageTitle
                title={`Danh sách người ứng tuyển`}
            >
                <MainLayout>
                    <div className="applied-route">
                    </div>
                </MainLayout>
            </PageTitle>
        );
    }
}
