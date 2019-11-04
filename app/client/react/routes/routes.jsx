import React, {lazy, Suspense} from "react";
import {Route, Switch, Router, Redirect} from "react-router-dom"
import {createBrowserHistory} from 'history';
import {ModalsRegistry} from "../common/modal/modals";
import {WithLocationRoute} from "./route-types/with-location-route";
import {AuthenRoute, GuestRoute} from "./route-types/authen-routes";
import {HomeRoute} from "./common-routes/home-route/home-route";
import {CandidateRoute} from "./common-routes/candidate-route/candidate-route";
import {CompanyRoute} from "./common-routes/company-route/company-route";
import {CompanyDetailsRoute} from "./common-routes/company-details-route/company-details-route";
import {JobRoute} from "./common-routes/job-route/job-route";
export const customHistory = createBrowserHistory();



export class MainRoute extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (

            <div id="main-route">
                <ModalsRegistry/>
                <Router
                    history={customHistory}
                >
                    <Switch>
                        <WithLocationRoute exact path="/" render={props => (<HomeRoute {...props}/>)}/>
                        <WithLocationRoute exact path="/ung-vien" render={props => (<CandidateRoute {...props}/>)}/>
                        <WithLocationRoute exact path="/cong-ty" render={props => (<CompanyRoute {...props}/>)}/>
                        <WithLocationRoute exact path="/job/:jobID" render={props => (<JobRoute {...props}/>)}/>
                        <WithLocationRoute exact path="/company/:companyID" render={props => (<CompanyDetailsRoute {...props}/>)}/>
                    </Switch>
                </Router>

            </div>
        );
    }
}