import {apiFactory} from "./api-factory/api-config";



const authenApiConfig = {
    hostURL: "http://localhost/php-react/server/api",


};

const offlineApiConfig = {
    hostURL: "http://localhost/php-react/server/api"
};


export const authenApi = apiFactory.createApi(authenApiConfig);

export const offlineApi = apiFactory.createApi(offlineApiConfig);

