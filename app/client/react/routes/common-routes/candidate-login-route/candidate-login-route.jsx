import React, {Component} from 'react';
import {PageTitle} from "../../../common/page-title/page-title";
import {MainLayout} from "../../../layout/main-layout/main-layout";
import {KComponent} from "../../../common/k-component";
import {CommonInput} from "../../../common/common-input/common-input";
import {accountApi} from "../../../../api/common/account-api";
import {userInfo} from "../../../../common/states/common";
import {authenCache} from "../../../../common/cache/authen-cache";
import {customHistory} from "../../routes";

export class CandidateLoginRoute extends KComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: ""
        };
    }

    handleLogin = () => {
        accountApi.login(this.state).then(result => {

            authenCache.setAuthen(result.token, {expires: 30});
            return userInfo.setState(result.data).then(() => customHistory.push("/"));

        }).catch(() => this.setState({error: true}));
    };


    render() {
        let {username, password, error} = this.state;
        return (
            <PageTitle
                title={`Ứng viên đăng nhâp`}
            >
                <MainLayout>
                    <div className="candidate-login-route">
                        <div className="container">
                            <div className="login-route-wrapper">
                                <div className="fancy-header">
                                    <p className="content">Ứng viên đăng nhập</p>
                                    <p className="underline"></p>
                                </div>
                                <div className="common-form">
                                    {error && (
                                        <p className="text-danger" style={{fontSize: "15px"}}>Tài khoản hoặc mật khẩu không hợp lệ</p>
                                    )}
                                    <CommonInput
                                        label={"Tên đăng nhập"}
                                        id={'username'}
                                        type={"text"}
                                        value={username}
                                        placeholder={`Tên đăng nhập nhỏ hơn 50 kí tự`}
                                        onChange={e => this.setState({username: e.target.value, error: ""})}
                                    />
                                    <CommonInput
                                        label={"Mật khẩu"}
                                        id={'password'}
                                        type={"password"}
                                        value={password}
                                        placeholder={`Nhập mật khẩu`}
                                        onChange={e => this.setState({password: e.target.value, error: ""})}
                                    />
                                    <button className="btn btn-blue" onClick={this.handleLogin}>Đăng nhập</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </MainLayout>
            </PageTitle>
        );
    }
}
