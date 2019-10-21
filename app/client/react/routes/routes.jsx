import React, {lazy, Suspense} from "react";
import {Route, Switch, Router, Redirect} from "react-router-dom"
import {createBrowserHistory} from 'history';
import {ModalsRegistry} from "../common/modal/modals";
import {WithLocationRoute} from "./route-types/with-location-route";
import {AuthenRoute, GuestRoute} from "./route-types/authen-routes";
import {HomeRoute} from "./guest-routes/home-route/home-route";
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
                    </Switch>
                </Router>

            </div>
        );
    }
}