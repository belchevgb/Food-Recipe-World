var app = app || {};

(function () {
    'use strict';

    let $loader = $('#loader-wrapper');

    class PageController {
        loadHomePage(context, selector) {
            $loader.show();
            app.recipeModel
                .getGuestRecipes()
                .then(response => {
                    return app.pageView.showHomePage(context, selector, response);
                })
                .then(success => {
                    setTimeout(function () {
                        $loader.fadeOut(500);
                    }, 1000);
                });
        }

        loadRecipeSearchResult(selector, data) {
            console.log(data);
            if (!data) {
                app.notificator.showNotification(app.messages.UNAUTHORISED_ACTION, "error");

                Sammy(function () {
                    this.trigger('redirectToUrl', app.appUrls.BASE_URL);
                });

                return;
            }
            app.recipeModel
                .getRecipes(data)
                .then(response => {
                    return app.pageView.showRecipeSearchResult(selector, response);
                })
                .then(success => {
                    setTimeout(function () {
                        $loader.fadeOut(500);
                    }, 1000);
                });
        }

        loadSearchedRecipeById(data) {
            app.recipeModel
                .getSearchedRecipeById(data)
                .then(response => {
                    return app.pageView.showSearchedRecipeInstuctions(response);
                });
        }

        loadRecipeSearchMenu(context, selector) {
            return app.pageView.showRecipeSearchMenu(context, selector);
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

        loadProfilePage(selector, data) {
            $loader.show();
            return app.pageView.showProfilePage(selector, data);
        }

        loadFavoriteRecipes(selector, data, showLoader) {
            if (showLoader) {
                $loader.show();
            }

            return app.pageView.showFavoriteRecipes(selector, data)
                .then(success => {
                    if (showLoader) {
                        setTimeout(function () {
                            $loader.fadeOut(500);
                        }, 1000);
                    }
                });
        }

        loadLikedRecipes(selector, data) {
            $loader.show();
            return app.pageView.showLikedRecipes(selector, data)
                .then(success => {
                    setTimeout(function () {
                        $loader.fadeOut(500);
                    }, 1000);
                });
        }



        addNewRecipes(selector, data) {
            return app.pageView.addNewRecipes(selector, data);
        }

        loadOtherUserFavourites(favouriteRecipes) {
            return app.pageView.showOtherUserFavourites(favouriteRecipes);
        }
    }

    app.pageController = new PageController();
} ());