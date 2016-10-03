var app = app || {};

(function () {
    'use strict';

    function redirect(url) {
        window.location.hash = `${url}`;
    }

    class UserController {
        registerUser(data) {
            app.userModel
                .registerUser(data)
                .then(success => {
                    app.notificator.showNotification(app.messages.REGISTRATION_SUCCESSFUL, 'success');
                    setTimeout(() => {
                        redirect(app.appUrls.LOGIN_URL);
                    }, 500);
                }, error => {
                    app.notificator.showNotification(app.messages.REGISTRATION_FAILED, 'error');
                });
        }

        loginUser(data) {
            app.userModel
                .loginUser(data)
                .then(success => {
                    localStorage.setItem('username', success.username);
                    localStorage.setItem('userId', success._id);
                    localStorage.setItem('authKey', success._kmd.authtoken);
                    app.notificator.showNotification(app.messages.LOGIN_SUCCESSFUL, 'success');
                    setTimeout(() => {
                        redirect(app.appUrls.BASE_URL);
                    }, 500);
                }, error => {
                    app.notificator.showNotification(app.messages.LOGIN_FAILED, 'error');
                });
        }

        logoutUser() {
            app.userModel.logoutUser()
                .then(success => {
                    localStorage.clear();
                    app.notificator.showNotification(app.messages.LOGOUT_SUCCESSFUL, 'success');
                    setTimeout(() => {
                        window.location.hash = `${app.appUrls.BASE_URL}`;
                    }, 500);
                });
        }

        getFoundUser(selector, data) {
            app.userModel
                .findUser(data)
                .then(success => {
                    app.foundUsers = success;
                    window.location.hash = `${app.appUrls.FOUND_USERS_URL}`;
                });
        }

        getUserData() {
            return app.userModel.getUserData();
        }

        addRecipeToFavorites(recipe) {
            return app.userModel.addRecipeToFavorites(recipe);
        }

        removeRecipeFromFavorites(recipe) {
            return app.userModel.removeRecipeFromFavorites(recipe);
        }

        addRecipeToLikes(recipe) {
            return app.userModel.addRecipeToLikes(recipe);
        }

        removeRecipeFromLikes(recipe) {
            return app.userModel.removeRecipeFromLikes(recipe);
        }

        getUserFavoriteRecipes() {
            return app.userModel.getUserFavoriteRecipes();
        }

        getUserLikedRecipes() {
            return app.userModel.getUserLikedRecipes();
        }

        getFoundUserFavourites(userId) {
            return app.userModel.getFoundUserFavourites(userId);
        }
    }

    app.userController = new UserController();
}());
