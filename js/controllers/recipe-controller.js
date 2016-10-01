var app = app || {};

(function () {
  'use strict'

  class RecipeController {
    getRecipeById (recipeId) {
      return app.recipeModel.getRecipeById(recipeId);
    }

    getRandomRecipes () {
      return app.recipeModel.getGuestRecipes();
    }
  }

  app.recipeController = new RecipeController();
}());
