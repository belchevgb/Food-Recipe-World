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
                    localStorage.userId = success._id;
                });
        }

        logoutUser() {
            let headers = app.headers.getKinveyHeaders(false,true);
            return app.requester
                .post(app.appKeys.KINVEY_LOGOUT_USER_URL, headers);
        }

        getFriends() {
            let headers = app.headers.getKinveyHeaders(false, true),
                url = `${app.kinveyUrls.KINVEY_USER_URL}${localStorage.userId}`;

            return app.requester.get(url, headers)
                .then(success => {
                    console.log(success);
                });
        }
    }

    app.userModel = new UserModel();
}());