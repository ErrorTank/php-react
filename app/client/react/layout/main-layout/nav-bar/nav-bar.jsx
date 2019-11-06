import React from "react";
import classnames from "classnames"
import {customHistory} from "../../../routes/routes";
import {userInfo} from "../../../../common/states/common";
import {CSSTransition} from "react-transition-group";
import {Dropdown} from "../../../common/dropdown/dropdown";
import {authenCache} from "../../../../common/cache/authen-cache";

export class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    };


    handleSignout = (e) => {
        e.stopPropagation();
        userInfo.setState(null);
        authenCache.clearAuthen();
        this.forceUpdate();
    };

    navs = [
        {
            label: "TUYỂN DỤNG",
            url: "/"
        },
        {
            label: "ỨNG VIÊN",
            url: "/ung-vien"
        }, {
            label: "CÔNG TY",
            url: "/cong-ty"
        },
        {
            label: () => {
                let info = userInfo.getState();
                console.log(info)
                return info ? (info.fullname || info.companyName) : "TÀI KHOẢN"
            },
            dropdownItems: [
                {
                    label: "Ứng viên",
                    url: "/dang-nhap/ung-vien",
                    cond: () => !authenCache.getAuthen()
                }, {
                    label: "Nhà tuyển dụng",
                        url: "/dang-nhap/nha-tuyen-dung",
                    cond: () => !authenCache.getAuthen()
                },{
                    label: "Hồ sơ công ty",
                    url: () => "/company/" + userInfo.getState().companyID,
                    cond: () => authenCache.getAuthen() && userInfo.getState().role === '1'
                },{
                    label: "Hồ sơ cá nhân",
                    url: () => "/candidate/" + userInfo.getState().candidateID,
                    cond: () => authenCache.getAuthen() && userInfo.getState().role === '0'
                },{
                    label: "Danh sách ứng tuyển",
                    url: "/applied",
                    cond: () => authenCache.getAuthen() && userInfo.getState().role === '1'
                },{
                    label: () => {
                        return <div className="sign-out">
                            <button className="btn btn-sign-out"
                                    onClick={this.handleSignout}
                            >
                                Đăng xuất
                            </button>
                        </div>
                    },

                    cond: () => authenCache.getAuthen()
                },
            ]
        },

    ];

    render() {

        return (
            <div className="nav-bar">
                <div className="container">
                    <div className="wrapper">
                        <div className="brand" onClick={() => customHistory.push("/")}>
                            <span>kappa</span>
                            <span className="box">work</span>
                        </div>
                        <div className="navs">
                            {this.navs.map((each) => {

                                return (
                                    <Dropdown
                                        className={classnames("each-nav", {active: !each.cannotActive ? each.url ? each.url === customHistory.location.pathname : each.dropdownItems.map(i => i.url).includes(customHistory.location.pathname) : false})}
                                        onClick={() => {

                                            if (each.url && (each.dropdownCond ? !each.dropdownCond() : true)) customHistory.push(each.url)
                                        }}
                                        key={each.url || JSON.stringify(each.dropdownItems)}
                                        content={(
                                            <>
                                                <p className="label">{typeof each.label === "string" ? each.label : each.label()}</p>
                                                {(each.dropdownItems && (each.dropdownCond ? each.dropdownCond() : true)) && (
                                                    <i className="fas fa-angle-down" style={{marginLeft: "8px"}}></i>
                                                )}
                                            </>
                                        )}
                                        dropdownContent={(show) => (
                                            <CSSTransition in={show} timeout={200} classNames={"lift-up"}>
                                                {(each.dropdownItems && show && (each.dropdownCond ? each.dropdownCond() : true)) ? (
                                                    <div className="dropdown-panel">
                                                        {each.dropdownItems.map((item, i) => item.cond() ? (
                                                            <div key={i}
                                                                 className={classnames("dropdownItem", {active: item.isActive ? item.isActive() : item.url ? (typeof item.url === 'string' ? item.url : item.url()) === customHistory.location.pathname : false})}
                                                                 onClick={(e) => {

                                                                     e.stopPropagation();
                                                                     customHistory.push(typeof item.url === 'string' ? item.url : item.url())
                                                                 }}
                                                            >
                                                                {typeof item.label === "string" ? item.label : item.label()}
                                                            </div>
                                                        ) : null)}
                                                    </div>
                                                ) : (
                                                    <span style={{display: "none"}}></span>
                                                )}


                                            </CSSTransition>
                                        )}
                                    />


                                )
                            })}
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}