import {authenApi, offlineApi} from "../api";
import {urlUtils} from "../../common/utils/url-utils";

export const accountApi = {
    login : (payload, role) => offlineApi.post("/account/login.php?role=" + role, payload),
    getAuth: () => authenApi.get("/account/auth.php")
 };