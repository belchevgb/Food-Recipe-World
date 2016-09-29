'use strict';

import {recipeModel} from 'recipe-model';

class RecipeController {
  getRecipeById(recipeId) {
    return recipeModel.getRecipeById(recipeId);
  }

  getRandomRecipes() {
    return recipeModel.getGuestRecipes();
  }
}

const recipeController = new RecipeController();
export {recipeController};

