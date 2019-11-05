
import {authenApi, offlineApi} from "../api";
import {urlUtils} from "../../common/utils/url-utils";

export const candidateApi = {

    getCandidates(config){
        let {skip, take, filter, sort} = config;
        let {key, value} = sort || {};
        let {keyword, workPlace, territory, level, desiredLevel, workType, gender} = filter || {};
        const params = {
            skip,
            take,
            sortKey: key,
            sortValue: value,
            keyword: keyword || null,
            workPlace: workPlace || null,
            territory: territory || null,
            level: level || null,
            desiredLevel: desiredLevel || null,
            workType: workType || null,
            gender: gender || null,
        };
        return offlineApi.get(`/candidate/all.php${urlUtils.buildParams(params)}`)
    },
    getCandidateDetails(candidateID){
        return offlineApi.get(`/candidate/details.php?id=${candidateID}`)
    },
};
