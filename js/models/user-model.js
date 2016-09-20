'use strict';

import {headers} from 'headers';
import {requester} from 'requester';
import {kinveyUrls} from 'kinvey-urls';

class UserModel {
    registerUser(data) {
        let headersToSend = headers.getKinveyHeaders(true, false);
        return requester.post(kinveyUrls.KINVEY_REGISTER_USER_URL, headersToSend, data);
    }

    loginUser(data) {
        let headersToSend = headers.getKinveyHeaders(true, false);
        return requester.post(kinveyUrls.KINVEY_LOGIN_USER_URL, headersToSend, data);
    }

    logoutUser() {
        let headersToSend = headers.getKinveyHeaders(false, true);
        return requester.post(kinveyUrls.KINVEY_LOGOUT_USER_URL, headersToSend);
    }

    findUser(data) {
        let headersToSend = headers.getKinveyHeaders(false, true),
            query = `?query={"username":"${data}"}`,
            url = `${kinveyUrls.KINVEY_USER_URL}${query}`;

        return requester.get(url, headersToSend);
    }
}

let userModel = new UserModel();
export {userModel as userModel};