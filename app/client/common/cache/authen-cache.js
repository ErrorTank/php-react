import {Cache} from "./cache"
import Cookies from "js-cookie";
import {appInstances} from "../instance";
import {accountApi} from "../../api/common/account-api";
import {userInfo} from "../states/common";

const cookiesEngine = {
    getItem: Cookies.get,
    setItem: Cookies.set,
    removeItem: Cookies.remove
};


export const authenCache = (() => {
    const cache = new Cache(cookiesEngine);
    return {
        clearAuthen() {

            cache.set(null, "k-authen-token");

        },
        loadAuthen() {
            return new Promise((resolve, reject) => {
                let authen = cache.get("k-authen-token");
                if (!authen) {
                    reject();
                } else {
                    accountApi.getAuth().then(result => {
                        userInfo.setState(result).then(() =>resolve() );
                    }).catch((err) => {
                        if(err.error === 'Expired token'){
                            console.log("dasdas")
                            authenCache.clearAuthen();
                        }
                        reject();
                    });


                }
            });

        },
        getAuthen() {
            return cache.get("k-authen-token")
        },
        setAuthen(authen, options) {

            cache.set(authen, "k-authen-token", options);
        }
    }
})();
