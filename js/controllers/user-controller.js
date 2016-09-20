'use strict';

import Sammy from 'sammy';
import {userModel} from 'user-model';
import {notificator} from 'notificator';
import {messages} from 'messages';
import {appUrls} from 'app-urls';
import {app} from 'app';

function redirect(url) {
    Sammy(function () {
        this.trigger('redirectToUrl', url);
    });
}

class UserController {
    registerUser(data) {
        userModel
            .registerUser(data)
            .then(success => {
                notificator.showNotification(messages.REGISTRATION_SUCCESSFUL, 'success');
                setTimeout(function () {
                    redirect(appUrls.LOGIN_URL);
                }, 500);
            }, error => {
                notificator.showNotification(messages.REGISTRATION_FAILED, 'error');
            });
    }

    loginUser(data) {
        userModel
            .loginUser(data)
            .then(success => {
                localStorage.setItem('username', success.username);
                localStorage.setItem('userId', success._id);
                localStorage.setItem('authKey', success._kmd.authtoken);
                notificator.showNotification(messages.LOGIN_SUCCESSFUL, 'success');
                setTimeout(function () {
                    redirect(appUrls.BASE_URL);
                }, 500);
            }, error => {
                notificator.showNotification(messages.LOGIN_FAILED, 'error');
            });
    }

    logoutUser() {
        userModel.logoutUser()
            .then(success => {
                localStorage.clear();
                notificator.showNotification(messages.LOGOUT_SUCCESSFUL, 'success');
                setTimeout(function () {
                    Sammy(function () {
                        this.trigger("redirectToUrl", appUrls.BASE_URL);
                    });
                }, 500);
            });
    }

    getFoundUser(selector, data) {
        userModel
            .findUser(data)
            .then(success => {
                Sammy(function () {
                    app.foundUsers = success;
                    this.trigger('redirectToUrl', appUrls.FOUND_USERS_URL);
                });
            });
    }
}

let userController = new UserController();
export {userController as userController};