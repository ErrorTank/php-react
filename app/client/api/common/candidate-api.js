
import {authenApi, offlineApi} from "../api";
import {urlUtils} from "../../common/utils/url-utils";
import {userInfo} from "../../common/states/common";
import {authenCache} from "../../common/cache/authen-cache";

export const candidateApi = {
    checkApplied: jobID =>{
        return  (authenCache.getAuthen() && userInfo.getState().role === '0') ? authenApi.post(`/candidate/check.php?id=${userInfo.getState().candidateID}`, {jobID}) : {message: "fail"}
    },
    applyJob: (jobID) => authenApi.post(`/candidate/apply.php?id=${userInfo.getState().candidateID}`, {jobID}),
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
