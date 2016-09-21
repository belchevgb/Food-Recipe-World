'use strict';

import {requester} from 'requester';
import {notificator} from 'notificator';
import {spoonacularUrls} from 'spoonacular-urls';
import {headers} from 'headers';

class RecipeModel {
    getGuestRecipes() {
        let headersToSend = headers.getSpoonacularHeaders(false);
        return requester.get(spoonacularUrls.FIVE_RANDOM_RECIPES_URL, headersToSend);
    }
    getRecipes(data) {

        if (!data.searchRecipeQuery) {
            notificator.showNotification("Please enter something to search for.", "error");
            return;
        }

        let headersToSend = headers.getSpoonacularHeaders(true);
        let urlToSend = `${spoonacularUrls.RECIPE_SEARCH_URL}cuisine=${data.searchRecipeCuisine}
            &diet=${data.searchRecipeDiet}&number=${data.searchRecipeNumberOfRecipes}&query=${data.searchRecipeQuery}`;
        
        return requester.get(urlToSend, headersToSend);
    }

    getSearchedRecipeById(recipeId) {
        if (!recipeId) {
            notificator.showNotification("Something wierd broke", "error");
            return;   
        }

        let headersToSend = headers.getSpoonacularHeaders(true);
        let urlToSend = `${spoonacularUrls.GET_RECIPE_BY_ID_URL}${recipeId}/information?includeNutrition=true`;

        return requester.get(urlToSend, headersToSend);
    }

    getRecipeById(recipeId) {
        let headersToSend = headers.getSpoonacularHeaders(false),
            recipeUrl = `${spoonacularUrls.GET_RECIPE_URL}${recipeId}/information`;
        return requester.get(recipeUrl, headersToSend);
    }
}

let recipeModel = new RecipeModel();
export {recipeModel};