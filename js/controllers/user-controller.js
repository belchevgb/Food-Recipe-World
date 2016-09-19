var app = app || {};

(function () {
    'use strict';

    function redirect(url) {
        Sammy(function () {
            this.trigger('redirectToUrl', url);
        });
    }

    class UserController {
        registerUser(data) {
            app.userModel
                .registerUser(data)
                .then(success => {
                    app.notificator.showNotification(app.messages.REGISTRATION_SUCCESSFUL, 'success');
                    setTimeout(function () {
                        redirect(app.appUrls.LOGIN_URL);
                    }, 500);
                }, error => {
                    app.notificator.showNotification(app.messages.REGISTRATION_FAILED, 'error');
                })
        }

        loginUser(data) {
            app.userModel
                .loginUser(data)
                .then(success => {
                    app.notificator.showNotification(app.messages.LOGIN_SUCCESSFUL, 'success');
                    setTimeout(function () {
                        redirect(app.appUrls.BASE_URL);
                    }, 500);
                }, error => {
                    app.notificator.showNotification(app.messages.LOGIN_FAILED, 'error');
                })
        }

        getFriends() {
            app.userModel
                .getFriends(localStorage.userId)
                .then(success => {

                });
        }
    }

    app.userController = new UserController();
}());