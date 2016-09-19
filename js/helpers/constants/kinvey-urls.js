var app = app || {};

(function() {
    'use strict';

    const KINVEY_BASE_URL = 'https://baas.kinvey.com/',
        KINVEY_REGISTER_USER_URL = `${KINVEY_BASE_URL}user/${app.appKeys.APP_KEY}/`,
        KINVEY_LOGIN_USER_URL = `${KINVEY_BASE_URL}user/${app.appKeys.APP_KEY}/login`,
        KINVEY_USER_URL = `${KINVEY_BASE_URL}user/`;

    app.kinveyUrls =  {
        KINVEY_LOGIN_USER_URL,
        KINVEY_REGISTER_USER_URL,
        KINVEY_USER_URL
    };
}());