var app = app || {};

(function () {
    'use strict';

    // Selectors
    const MAIN_CONTENT_SELECTOR = '#content';

    // Keys
    const APP_KEY = 'kid_BJDUNLhh',
        APP_SECRET = 'b7690175616a4f7fb88398c2fc3a33a4';

    // URLs
    const BASE_URL = '#/',
        LOGIN_URL = '#/login',
        REGISTER_URL = `#/register`;

    // KINVEY URLs
    const KINVEY_BASE_URL = 'https://baas.kinvey.com/',
        KINVEY_REGISTER_USER_URL = `${KINVEY_BASE_URL}user/${APP_KEY}/`,
        KINVEY_LOGIN_USER_URL = `${KINVEY_BASE_URL}user/${APP_KEY}/login`;

    // ERROR MESSAGES
    const INVALID_CONFIRM_PASSWORD = 'The confirmation password is not the same as the password. Please try again.',
        REGISTRATION_FAILED = 'Registration failed. Please try again.',
        LOGIN_FAILED = 'Login failed. Please try again.';

    // SUCCESS MESSAGES
    const REGISTRATION_SUCCESSFUL = 'Registration successful!',
        LOGIN_SUCCESSFUL = 'Login successful!';

    app.constants = {
        MAIN_CONTENT_SELECTOR,

        APP_KEY,
        APP_SECRET,

        BASE_URL,
        LOGIN_URL,
        REGISTER_URL,

        KINVEY_REGISTER_USER_URL,
        KINVEY_LOGIN_USER_URL,

        INVALID_CONFIRM_PASSWORD,
        REGISTRATION_FAILED,
        LOGIN_FAILED,

        REGISTRATION_SUCCESSFUL,
        LOGIN_SUCCESSFUL
    };
}());