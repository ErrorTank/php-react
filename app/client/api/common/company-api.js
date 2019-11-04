
import {authenApi, offlineApi} from "../api";
import {urlUtils} from "../../common/utils/url-utils";

export const companyApi = {

    getCompanies(config){
        let {skip, take, filter, sort} = config;
        let {key, value} = sort || {};
        let {keyword} = filter || {};

        const params = {
            skip,
            take,
            sortKey: key,
            sortValue: value,
            keyword: keyword || null
        };
        return offlineApi.get(`/company/all.php${urlUtils.buildParams(params)}`)
    },
    getCompanyDetails(companyID){
        return offlineApi.get(`/company/details.php?id=${companyID}`)
    },
};
