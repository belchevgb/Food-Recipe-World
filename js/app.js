'use strict';

import Sammy from 'sammy';
import {appUrls} from 'app-urls';
import {pageController} from 'page-controller';
import {userController} from 'user-controller';
import {headers} from 'headers';

let MAIN_CONTENT_SELECTOR = '#content',
    MAIN_NAVIGATION_SELECTOR = '#main-navigation';

function loadHeader(context) {
    if (localStorage.authKey) {
        pageController.loadMainNavigationWhenUserIsLoggedIn(context, MAIN_NAVIGATION_SELECTOR, {});
    } else {
        pageController.loadMainNavigationWhenNoUserIsLoggedIn(context, MAIN_NAVIGATION_SELECTOR, {});
    }
}

let router = new Sammy(function () {
    this.get(appUrls.BASE_URL, function (context) {
        loadHeader(context);
        pageController.loadHomePage(context, MAIN_CONTENT_SELECTOR);
    });

    this.get(appUrls.LOGIN_URL, function (context) {
        pageController.loadLoginPage(context, MAIN_CONTENT_SELECTOR);
    });

    this.get(appUrls.REGISTER_URL, function (context) {
        pageController.loadRegisterPage(context, MAIN_CONTENT_SELECTOR);
    });

    this.get(appUrls.FOUND_USERS_URL, function (context) {
        pageController.loadFoundUsersPage(MAIN_CONTENT_SELECTOR, app.foundUsers);
    });

    // Events
    this.bind('redirectToUrl', function (event, url) {
        this.redirect(url);
    });

    this.bind('registerUser', function (event, data) {
        userController.registerUser(data);
    });

    this.bind('loginUser', function (event, data) {
        userController.loginUser(data);
    });

    this.bind('logoutUser', function (event, data) {
        userController.logoutUser();
    });

    this.bind('searchUsers', function (event, data) {
        userController.getFoundUser(MAIN_CONTENT_SELECTOR, data);
    });
});

router.run(appUrls.BASE_URL);
let app = {};
export {app as app};