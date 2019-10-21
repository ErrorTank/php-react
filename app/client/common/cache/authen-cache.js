import {Cache} from "./cache"
import Cookies from "js-cookie";
import {appInstances} from "../instance";

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
                    resolve();

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
