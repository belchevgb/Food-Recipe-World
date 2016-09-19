var app = app || {};

(function () {
    'use strict';

    class RecipeModel {
        getGuestRecipes() {
            let headers = app.headers.getSpoonacularHeaders(false);
            return app.requester.get(app.spoonacularUrls.FIVE_RANDOM_RECIPES_URL, headers);
        }
    }

    app.recipeModel = new RecipeModel();
}());