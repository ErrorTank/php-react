import {apiFactory} from "./api-factory/api-config";



const authenApiConfig = {
    hostURL: "http://localhost:10000/api",


};

const offlineApiConfig = {
    hostURL: "http://localhost:10000/api"
};


export const authenApi = apiFactory.createApi(authenApiConfig);

export const offlineApi = apiFactory.createApi(offlineApiConfig);

