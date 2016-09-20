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
                    localStorage.setItem('username', success.username);
                    localStorage.setItem('userId', success._id);
                    localStorage.setItem('authKey', success._kmd.authtoken);
                    app.notificator.showNotification(app.messages.LOGIN_SUCCESSFUL, 'success');
                    setTimeout(function () {
                        redirect(app.appUrls.BASE_URL);
                    }, 500);
                }, error => {
                    app.notificator.showNotification(app.messages.LOGIN_FAILED, 'error');
                })
        }

        logoutUser() {
            app.userModel.logoutUser()
                .then(success => {
                    localStorage.clear();
                    app.notificator.showNotification(app.messages.LOGOUT_SUCCESSFUL, 'success');
                    setTimeout(function () {
                        Sammy(function () {
                            this.trigger("redirectToUrl", app.appUrls.BASE_URL);
                        });
                    }, 500);
                });
        }

        getFoundUser(data) {
            app.userModel
                .findUser(data)
                .then(success => {
                    console.log(success);
                });
        }
    }

    app.userController = new UserController();
}());