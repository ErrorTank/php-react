import {authenApi, offlineApi} from "../api";
import {urlUtils} from "../../common/utils/url-utils";

export const jobApi = {

    getJobs(config){
        let {skip, take, filter, sort} = config;
        let {key, value} = sort || {};
        let {keyword, territory, workPlace} = filter || {};
        const params = {
            skip,
            take,
            sortKey: key,
            sortValue: value,
            keyword: keyword || null,
            territory: territory || null,
            workPlace: workPlace || null
        };
        return offlineApi.get(`/job/all.php${urlUtils.buildParams(params)}`)
    },

};
