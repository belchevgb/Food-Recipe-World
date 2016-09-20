var app = app || {};

(function () {
    'use strict';

    const MAIN_CONTENT_SELECTOR = '#content',
        MAIN_NAVIGATION_SELECTOR = '#main-navigation';


    let router = new Sammy(function () {
        this.get(app.appUrls.BASE_URL, function (context) {
            if (localStorage.authKey) {
                app.pageController.loadMainNavigationWhenUserIsLoggedIn(content, MAIN_NAVIGATION_SELECTOR, {});
            } else {
                app.pageController.loadMainNavigationWhenNoUserIsLoggedIn(content, MAIN_NAVIGATION_SELECTOR, {});
            }

            app.pageController.loadHomePage(context, MAIN_CONTENT_SELECTOR);
        });

        this.get(app.appUrls.LOGIN_URL, function (context) {
            app.pageController.loadLoginPage(context, MAIN_CONTENT_SELECTOR);
        });

        this.get(app.appUrls.REGISTER_URL, function (context) {
            app.pageController.loadRegisterPage(context, MAIN_CONTENT_SELECTOR);
        });

        this.get(app.appUrls.FOUND_USERS_URL, function (context) {
            app.pageController.loadFoundUsersPage(MAIN_CONTENT_SELECTOR, app.foundUsers);
        });

        // Events
        this.bind('redirectToUrl', function (event, url) {
            this.redirect(url);
        });

        this.bind('registerUser', function (event, data) {
            app.userController.registerUser(data);
        });

        this.bind('loginUser', function (event, data) {
            app.userController.loginUser(data);
        });

        this.bind('logoutUser', function (event, data) {
            app.userController.logoutUser();
        });

        this.bind('searchUsers', function (event, data) {
            app.userController.getFoundUser(MAIN_CONTENT_SELECTOR, data);
        });
    });

    router.run(app.appUrls.BASE_URL);
}());