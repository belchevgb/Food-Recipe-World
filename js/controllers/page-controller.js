var app = app || {};

(function () {
    'use strict';

    const $loader = $('#loader-wrapper');

    class PageController {
        loadHomePage(context, selector) {
            $loader.show();

            app.recipeModel
                .getGuestRecipes()
                .then(response => {
                    return app.pageView.showHomePage(context, selector, response)
                })
                .then(success => {
                    setTimeout(function () {
                        $loader.fadeOut(500);
                    }, 1000);
                });
        }

        loadMainNavigationWhenUserIsLoggedIn(context, selector, data) {
            return app.pageView.showMainNavigationWhenUserIsLoggedIn(context, selector, data);
        }

        loadMainNavigationWhenNoUserIsLoggedIn(context, selector, data) {
            return app.pageView.showMainNavigationWhenNoUserIsLoggedIn(context, selector, data);
        }

        loadLoginPage(context, selector) {
            return app.pageView.showLoginPage(context, selector);
        }

        loadRegisterPage(context, selector) {
            return app.pageView.showRegisterPage(context, selector);
        }

        loadFoundUsersPage(selector, data) {
            return app.pageView.showFoundUsersPage(selector, data);
        }
    }

    app.pageController = new PageController();
}());