var app = app || {};

(function () {
    'use strict';

    let router = new Sammy(function () {
        this.get(app.constants.BASE_URL, function (context) {
            app.pageController.loadHomePage(context, app.constants.MAIN_CONTENT_SELECTOR);
        });

        this.get(app.constants.LOGIN_URL, function (context) {
            app.pageController.loadLoginPage(context, app.constants.MAIN_CONTENT_SELECTOR);
        });

        this.get(app.constants.REGISTER_URL, function (context) {
            app.pageController.loadRegisterPage(context, app.constants.MAIN_CONTENT_SELECTOR);
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

    router.run(app.constants.BASE_URL);
}());