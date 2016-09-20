'use strict';

import {requester} from 'requester';
import {spoonacularUrls} from 'spoonacular-urls';
import {headers} from 'headers';

class RecipeModel {
    getGuestRecipes() {
        let headersToSend = headers.getSpoonacularHeaders(false);
        return requester.get(spoonacularUrls.FIVE_RANDOM_RECIPES_URL, headersToSend);
    }

    getRecipeById(recipeId) {
        let headersToSend = headers.getSpoonacularHeaders(false),
            recipeUrl = `${spoonacularUrls.GET_RECIPE_URL}${recipeId}/information`;
        return requester.get(recipeUrl, headersToSend);
    }
}

let recipeModel = new RecipeModel();
export {recipeModel};