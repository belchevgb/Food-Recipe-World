var app = app || {};

(function () {
    'use strict';

    function redirectToHome() {
        Sammy(function () {
            this.trigger('redirectToUrl', app.constants.BASE_URL);
        });
    }

    class UserController {
        registerUser(data) {
            app.userModel
                .registerUser(data)
                .then(success => {
                    app.notificator.showNotification(app.constants.REGISTRATION_SUCCESSFUL, 'success');
                    setTimeout(function () {
                        redirectToHome();
                    }, 500);
                }, error => {
                    app.notificator.showNotification(app.constants.REGISTRATION_FAILED, 'error');
                })
        }

        loginUser(data) {
            app.userModel
                .loginUser(data)
                .then(success => {
                    app.notificator.showNotification(app.constants.LOGIN_SUCCESSFUL, 'success');
                    setTimeout(function () {
                        redirectToHome();
                    }, 500);
                }, error => {
                    app.notificator.showNotification(app.constants.LOGIN_FAILED, 'error');
                })
        }
    }

    app.userController = new UserController();
}());