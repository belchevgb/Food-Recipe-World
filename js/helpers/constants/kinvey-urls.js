var app = app || {};

(function () {
    'use strict';

    let KINVEY_BASE_URL = 'https://baas.kinvey.com/';
    let KINVEY_REGISTER_USER_URL = `${KINVEY_BASE_URL}user/${app.appKeys.APP_KEY}/`;
    let KINVEY_LOGIN_USER_URL = `${KINVEY_BASE_URL}user/${app.appKeys.APP_KEY}/login`;
    let KINVEY_USER_URL = `${KINVEY_BASE_URL}user/${app.appKeys.APP_KEY}`;
    let KINVEY_BASE_USER_URL = `${KINVEY_BASE_URL}user/${app.appKeys.APP_KEY}`;
    let KINVEY_LOGOUT_USER_URL = `${KINVEY_BASE_URL}user/${app.appKeys.APP_KEY}/_logout`;

    app.kinveyUrls = {
        KINVEY_LOGIN_USER_URL,
        KINVEY_REGISTER_USER_URL,
        KINVEY_USER_URL,
        KINVEY_LOGOUT_USER_URL,
        KINVEY_BASE_USER_URL
    };
} ());
