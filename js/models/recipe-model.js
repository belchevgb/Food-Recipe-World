var app = app || {};

(function () {
  'use strict'

  class RecipeModel {
    getGuestRecipes() {
      let headersToSend = app.headers.getSpoonacularHeaders(false);
      return app.requester.get(app.spoonacularUrls.FIVE_RANDOM_RECIPES_URL, headersToSend)
    }

    getRecipes(data) {
      if (!data.searchRecipeQuery) {
        app.notificator.showNotification(app.messages.EMPTY_RECIPE_SEARCH, "error")
        Sammy(function () {
          this.trigger('redirectToUrl', app.appUrls.BASE_URL)
        })
      }

      let headersToSend = app.headers.getSpoonacularHeaders(true);
      let urlToSend = `${app.spoonacularUrls.RECIPE_SEARCH_URL}cuisine=${data.searchRecipeCuisine}
            &diet=${data.searchRecipeDiet}&number=${data.searchRecipeNumberOfRecipes}&query=${data.searchRecipeQuery}`;

      return app.requester.get(urlToSend, headersToSend)
    }

    getSearchedRecipeById(recipeId) {
      if (!recipeId) {
        app.notificator.showNotification(messages.RECIPE_BY_ID_WASNT_FOUND, "error")
        return
      }

      let headersToSend = app.headers.getSpoonacularHeaders(true),
        urlToSend = `${app.spoonacularUrls.GET_RECIPE_BY_ID_URL}${recipeId}/information?includeNutrition=true`
      return app.requester.get(urlToSend, headersToSend)
    }

    getRecipeById(recipeId) {
      let headersToSend = app.headers.getSpoonacularHeaders(false),
        recipeUrl = `${app.spoonacularUrls.GET_RECIPE_URL}${recipeId}/information`
      return app.requester.get(recipeUrl, headersToSend)
    }
  }

  app.recipeModel = new RecipeModel()
} ())