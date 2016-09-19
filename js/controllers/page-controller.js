var app = app || {};

(function () {
    'use strict';

    class PageController {
        loadHomePage(context, selector) {

        }

        loadLoginPage(context, selector) {
            return app.pageView.showLoginPage(context, selector);
        }

        loadRegisterPage(context, selector) {
            return app.pageView.showRegisterPage(context, selector);
        }
    }

    app.pageController = new PageController();
}());