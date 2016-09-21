'use strict';

import {appKeys} from 'app-keys';

let KINVEY_BASE_URL = 'https://baas.kinvey.com/',
    KINVEY_REGISTER_USER_URL = `${KINVEY_BASE_URL}user/${appKeys.APP_KEY}/`,
    KINVEY_LOGIN_USER_URL = `${KINVEY_BASE_URL}user/${appKeys.APP_KEY}/login`,
    KINVEY_USER_URL = `${KINVEY_BASE_URL}user/${appKeys.APP_KEY}`,
    KINVEY_BASE_USER_URL = `${KINVEY_BASE_URL}user/${appKeys.APP_KEY}`,
    KINVEY_LOGOUT_USER_URL = `${KINVEY_BASE_URL}user/${appKeys.APP_KEY}/_logout`;

let kinveyUrls = {
    KINVEY_LOGIN_USER_URL,
    KINVEY_REGISTER_USER_URL,
    KINVEY_USER_URL,
    KINVEY_LOGOUT_USER_URL,
    KINVEY_BASE_USER_URL
};
export {kinveyUrls};