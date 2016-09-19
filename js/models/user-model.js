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
            return app.requester.post(app.kinveyUrls.KINVEY_LOGIN_USER_URL, headers, data);
        }

        logoutUser() {
            let headers = app.headers.getKinveyHeaders(false, true);
            return app.requester.post(app.kinveyUrls.KINVEY_LOGOUT_USER_URL, headers);
        }
    }

    app.userModel = new UserModel();
}());