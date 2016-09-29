'use strict';

import {requester} from 'requester';
import {headers} from 'headers';
import {spoonacularUrls} from 'spoonacular-urls';
import {notificator} from 'notificator';
import {appUrls} from 'app-urls';
import {messages} from 'messages';

class RecipeModel {
  getGuestRecipes() {
    let headersToSend = headers.getSpoonacularHeaders(false);
    return requester.get(spoonacularUrls.FIVE_RANDOM_RECIPES_URL, headersToSend);
  }

  getRecipes(data) {
    if (!data.searchRecipeQuery) {
     notificator.showNotification(messages.EMPTY_RECIPE_SEARCH, 'error');
      Sammy(function () {
        this.trigger('redirectToUrl', appUrls.BASE_URL);
      });
    }

    let headersToSend = headers.getSpoonacularHeaders(true);
    let urlToSend = `${spoonacularUrls.RECIPE_SEARCH_URL}cuisine=${data.searchRecipeCuisine}
            &diet=${data.searchRecipeDiet}&number=${data.searchRecipeNumberOfRecipes}&query=${data.searchRecipeQuery}`;

    return requester.get(urlToSend, headersToSend);
  }

  getSearchedRecipeById(recipeId) {
    if (!recipeId) {
     notificator.showNotification(messages.RECIPE_BY_ID_WASNT_FOUND, 'error');
      return
    }

    let headersToSend = headers.getSpoonacularHeaders(true);
    let urlToSend = `${spoonacularUrls.GET_RECIPE_BY_ID_URL}${recipeId}/information?includeNutrition=true`;
    return requester.get(urlToSend, headersToSend);
  }

  getRecipeById(recipeId) {
    let headersToSend = headers.getSpoonacularHeaders(false);
    let recipeUrl = `${spoonacularUrls.GET_RECIPE_URL}${recipeId}/information`;
    return requester.get(recipeUrl, headersToSend);
  }
}

const recipeModel = new RecipeModel();
export {recipeModel};
