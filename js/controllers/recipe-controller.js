import {headers} from 'headers';
import {requester} from 'requester';
import {recipeModel} from 'recipe-model';

class RecipeController {
    getRecipeById(recipeId) {
        return recipeModel.getRecipeById(recipeId)
    }
}

let recipeController = new RecipeController();
export {recipeController};