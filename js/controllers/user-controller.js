var app = app || {};

(function () {
    'use strict';

    class UserController {
        registerUser(data) {
            app.userModel
                .registerUser(data)
                .then(success => {
                    app.notificator.showNotification(app.constants.REGISTRATION_SUCCESSFUL, 'success');
                    setTimeout(function () {
                        Sammy(function () {
                            this.trigger('redirectToUrl', app.constants.BASE_URL);
                        });
                    }, 1000);
                }, error => {
                    app.notificator.showNotification(app.constants.REGISTRATION_FAILED, 'error');
                })
        }

        loginUser(data) {
            app.userModel
                .loginUser(data)
                .then(success => {
                    app.notificator.showNotification(app.constants.LOGIN_SUCCESSFUL, 'success');
                }, error => {
                    app.notificator.showNotification(app.constants.LOGIN_FAILED, 'error');
                })
        }
    }

    app.userController = new UserController();
}());