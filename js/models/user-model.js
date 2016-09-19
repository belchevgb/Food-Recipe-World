var app = app || {};

(function () {
    'use strict';

    class UserModel {
        registerUser(data) {
            let headers = app.headers.getHeaders(true, false);
            return app.requester.post(app.constants.KINVEY_REGISTER_USER_URL, headers, data);
        }

        loginUser(data) {
            let headers = app.headers.getHeaders(true, false);
            return app.requester
                .post(app.constants.KINVEY_LOGIN_USER_URL, headers, data)
                .then(success => {
                    localStorage.authKey = success._kmd.authtoken;
                });
        }
    }

    app.userModel = new UserModel();
}());