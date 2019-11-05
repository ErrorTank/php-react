import {authenApi, offlineApi} from "../api";
import {urlUtils} from "../../common/utils/url-utils";

export const jobApi = {

    getJobs(config){
        let {skip, take, filter, sort} = config;
        let {key, value} = sort || {};
        let {keyword, workPlace, territory, level, desiredLevel, workType, gender} = filter || {};
        const params = {
            skip,
            take,
            sortKey: key,
            sortValue: value,
            keyword: keyword || null,
            territory: territory || null,
            workPlace: workPlace || null,
            level: level || null,
            desiredLevel: desiredLevel || null,
            workType: workType || null,
            gender: gender || null,
        };
        return offlineApi.get(`/job/all.php${urlUtils.buildParams(params)}`)
    },
    getJobsByCompanyID(companyID){
        return offlineApi.get(`/job/all-by-company.php?id=${companyID}`)
    },
    getJobDetails(jobID){
        return offlineApi.get(`/job/details.php?id=${jobID}`)
    },
};
