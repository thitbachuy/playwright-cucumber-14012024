import BasePage from "./../BasePage";
const basePage = new BasePage();

import CommonConfigurations from "./../../pageConfigurations/CommonConfigurations";
import secrets from "../../secret.json"
import { request, expect } from "@playwright/test";

const secretList = new Map(Object.entries(secrets));

var apiUrlList = new CommonConfigurations().parseYamlFile('./../sampleApiData/ApiUrl.yml');

class ApiBasePage {
    constructor() {}

    async buildApiHeader(apiName, token = null) {
        const noExtraHeaderApiList = ["get_account_info_after_sign_up_api"];
        let apiHeader = new Object();
        if (!noExtraHeaderApiList.includes(apiName)) {
            apiHeader['authorization'] = "Bearer " + token;
        }
        return apiHeader;
    }

    async getApiParam(apiName) {
        const needQueryParamApiList = ["get_account_info_after_sign_up_api"];
        let apiParams = new Object();
        if (needQueryParamApiList.includes(apiName)) {
            apiParams['key'] = secretList.get("IdentityAccountGoogleApiKey");
        }
        return apiParams;
    }

    async sendRequestAndGetResponse(apiName, apiMethod, apiBody, expectedResponseStatus, token = null) {
        let apiUrl = apiUrlList.get(apiName.concat('_url'));
        let apiHeader = await this.buildApiHeader(apiName, token);
        let apiParams = await this.getApiParam(apiName);
        console.log("Api url is:" + apiUrl);
        console.log("Api header is:");
        new CommonConfigurations().convertObjectToMap(apiHeader);
        console.log("Api params is:");
        new CommonConfigurations().convertObjectToMap(apiParams);
        console.log("Api body is:");
        new CommonConfigurations().convertObjectToMap(apiBody);
        console.log("Calling method is:" + apiMethod);

        const apiRequest = await request.newContext();
        let apiResponse;
        switch(apiMethod) {
            case "post": 
                apiResponse = await apiRequest.post(apiUrl, {headers: apiHeader, data: apiBody, params: apiParams});
                break;
            case "patch":
                apiResponse = await apiRequest.patch(apiUrl, {headers: apiHeader, data: apiBody, params: apiParams});
                break;
            case "get":
                apiResponse = await apiRequest.get(apiUrl, {headers: apiHeader, data: apiBody, params: apiParams});
                break;
            case "delete":
                apiResponse = await apiRequest.delete(apiUrl, {headers: apiHeader, data: apiBody, params: apiParams});
                break;
        }
        console.log("Returned status: " + apiResponse.status());
        expect(apiResponse.status() == expectedResponseStatus).toBeTruthy();
        let response = new Object();
        if(apiResponse.headers()['content-length'] === undefined) {
            response = (apiResponse.json());
        }
        response['statusCode'] = apiResponse.status();
        return response;
    }
}

export default ApiBasePage;
