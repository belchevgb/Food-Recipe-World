var app = app || {};

(function () {
    'use strict';

  class UserModel {
        registerUser(data) {
            let headersToSend = app.headers.getKinveyHeaders(true, false);
            return app.requester.post(app.kinveyUrls.KINVEY_REGISTER_USER_URL, headersToSend, data);
        }

        loginUser(data) {
            let headersToSend = app.headers.getKinveyHeaders(true, false);
            return app.requester.post(app.kinveyUrls.KINVEY_LOGIN_USER_URL, headersToSend, data);
        }

        logoutUser() {
            let headersToSend = app.headers.getKinveyHeaders(false, true);
            return app.requester.post(app.kinveyUrls.KINVEY_LOGOUT_USER_URL, headersToSend);
        }

        findUser(data) {
            let headersToSend = app.headers.getKinveyHeaders(false, true),
                query = `?query={"username":"${data}"}`,
                url = `${app.kinveyUrls.KINVEY_USER_URL}${query}`;

            return app.requester.get(url, headersToSend);
        }

        getUserData() {
            let headersToSend = app.headers.getKinveyHeaders(false, true),
                url = app.kinveyUrls.KINVEY_USER_URL + '/' + localStorage.userId;

            return app.requester.get(url, headersToSend);
        }

        addRecipeToFavorites(recipe) {
            let headersToSend = app.headers.getKinveyHeaders(true, true),
                userUrl = `${app.kinveyUrls.KINVEY_USER_URL}/${localStorage.userId}`;

            return app.requester
                .get(userUrl, headersToSend)
                .then(response => {
                    let oldRecipes = response.favoriteRecipes;

                    oldRecipes.push(recipe);
                    let updatedRecipes = {
                        "favoriteRecipes": oldRecipes,
                        "likedRecipes": response.likedRecipes
                    };

                    return app.requester.put(userUrl, headersToSend, updatedRecipes);
                });
        }

        removeRecipeFromFavorites(recipe) {
            let headersToSend = app.headers.getKinveyHeaders(true, true),
                userUrl = `${app.kinveyUrls.KINVEY_USER_URL}/${localStorage.userId}`;

            return app.requester
                .get(userUrl, headersToSend)
                .then(response => {
                    let oldRecipes = response.favoriteRecipes;
                    let indexToRemove = -1;
                    let len = oldRecipes.length;

                    for (let i = 0; i < len; i += 1) {
                        if (oldRecipes[i].id == recipe.id) {
                            indexToRemove = i;
                        }
                    }

                    if (indexToRemove > -1) {
                        oldRecipes.splice(indexToRemove, 1);
                        let updatedRecipes = {
                            "favoriteRecipes": oldRecipes,
                            "likedRecipes": response.likedRecipes
                        };

                        return app.requester.put(userUrl, headersToSend, updatedRecipes);
                    }

                    return;
                });
        }

        addRecipeToLikes(recipe) {
            let headersToSend = app.headers.getKinveyHeaders(true, true),
                userUrl = `${app.kinveyUrls.KINVEY_USER_URL}/${localStorage.userId}`;

            return app.requester
                .get(userUrl, headersToSend)
                .then(response => {
                    let oldRecipes = response.likedRecipes;
                   
                    let len = oldRecipes.length;
                    for (var i = 0; i < len; i += 1) {
                        if (oldRecipes[i].id === recipe.id) {
                            oldRecipes.splice(i, 1);
                        }
                    }

                    oldRecipes.push(recipe);

                    let updatedRecipes = {
                        "likedRecipes": oldRecipes,
                        "favoriteRecipes": response.favoriteRecipes
                    };

                    return app.requester.put(userUrl, headersToSend, updatedRecipes);
                });

        }

        getUserFavoriteRecipes() {
            let headersToSend = app.headers.getKinveyHeaders('false', true),
                userUrl = `${app.kinveyUrls.KINVEY_USER_URL}/${localStorage.userId}`;

            return app.requester.get(userUrl, headersToSend);
        }

        getUserLikedRecipes() {
            let headersToSend = app.headers.getKinveyHeaders('false', true),
                userUrl = `${app.kinveyUrls.KINVEY_USER_URL}/${localStorage.userId}`;

            return app.requester.get(userUrl, headersToSend);
        }

        getFoundUserFavourites(userId) {
            let headersToSend = app.headers.getKinveyHeaders('false', true),
                userUrl = `${app.kinveyUrls.KINVEY_USER_URL}/${userId}`;

            return app.requester.get(userUrl, headersToSend);
        }
    }

    app.userModel = new UserModel();
}());