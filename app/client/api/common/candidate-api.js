
import {authenApi, offlineApi} from "../api";
import {urlUtils} from "../../common/utils/url-utils";

export const candidateApi = {

    getCandidates(config){
        let {skip, take, filter, sort} = config;
        let {key, value} = sort || {};
        let {keyword, workPlace, territory} = filter || {};
        const params = {
            skip,
            take,
            sortKey: key,
            sortValue: value,
            keyword: keyword || null,
            workPlace: workPlace || null,
            territory: territory || null,
        };
        return offlineApi.get(`/candidate/all.php${urlUtils.buildParams(params)}`)
    },

};
