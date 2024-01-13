import ApiBasePage from './ApiBasePage.js';
import CommonConfigurations from '../../pageConfigurations/CommonConfigurations';

import BasePage from "../BasePage";
const basePage = new BasePage();
const commonConfigurations = new CommonConfigurations();

var userApiBodyList = commonConfigurations.parseYamlFile('./../sampleApiData/User/UserApiBody.yml');

class SignUpApiPage extends ApiBasePage {
    constructor() { super() }

    async createNewUniqueEmailAddress() {
        let uniqueFactor = await basePage.generateActualDateTime();
        let newEmailAddress = "ha.luu+".concat(uniqueFactor).concat("@gmail.com");
        return newEmailAddress;
    }

    async createSuccessfullyANewUserWithInformationViaApi(email, password, phone = '0987654321', firstName = 'Luu', lastName = 'Ha') {
        //create a new record in user table
        let createUserApiBody = userApiBodyList.get('create_user_api_body');
        createUserApiBody['email'] = email;
        createUserApiBody['password'] = password;
        createUserApiBody['phone'] = phone;
        createUserApiBody['firstName'] = firstName;
        createUserApiBody['lastName'] = lastName;
        let userObject = await super.sendRequestAndGetResponse('create_user_api', 'post', createUserApiBody, 200, userToken);
        
        //return userObject
        userObject['phone'] = phone;
        userObject['firstName'] = firstName;
        userObject['lastName'] = lastName;
        userObject['fullName'] = firstName + " " + lastName;
        return userObject;
    }
}

export default SignUpApiPage;
