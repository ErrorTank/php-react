import {authenApi, offlineApi} from "../api";
import {urlUtils} from "../../common/utils/url-utils";

export const accountApi = {
    login : (payload) => offlineApi.post("/account/login.php", payload),
    getAuth: () => authenApi.get("/account/auth.php")
 };