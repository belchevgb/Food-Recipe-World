var app = app || {};

(function () {
    'use strict';

    const MAIN_CONTENT_SELECTOR = '#content';

    let router = new Sammy(function () {
        this.get(app.appUrls.BASE_URL, function (context) {
            app.pageController.loadHomePage(context, MAIN_CONTENT_SELECTOR);
        });

        this.get(app.appUrls.LOGIN_URL, function (context) {
            app.pageController.loadLoginPage(context, MAIN_CONTENT_SELECTOR);
        });

        this.get(app.appUrls.REGISTER_URL, function (context) {
            app.pageController.loadRegisterPage(context, MAIN_CONTENT_SELECTOR);
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
    });

    router.run(app.appUrls.BASE_URL);
}());