'use strict';

import {requester} from 'requester';
import {spoonacularUrls} from 'spoonacular-urls';
import {headers} from 'headers';

class RecipeModel {
    getGuestRecipes() {
        let headersToSend = headers.getSpoonacularHeaders(false);
        return requester.get(spoonacularUrls.FIVE_RANDOM_RECIPES_URL, headersToSend);
    }
}

let recipeModel = new RecipeModel();
export {recipeModel as recipeModel};