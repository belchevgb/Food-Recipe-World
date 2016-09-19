var app = app || {};

(function () {
    'use strict';

    class UserModel {
        registerUser(data) {
            let headers = app.headers.getKinveyHeaders(true, false);
            return app.requester.post(app.kinveyUrls.KINVEY_REGISTER_USER_URL, headers, data);
        }

        loginUser(data) {
            let headers = app.headers.getKinveyHeaders(true, false);
            return app.requester
                .post(app.kinveyUrls.KINVEY_LOGIN_USER_URL, headers, data)
                .then(success => {
                    localStorage.authKey = success._kmd.authtoken;
                });
        }
    }

    app.userModel = new UserModel();
}());