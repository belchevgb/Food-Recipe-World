var app = app || {};

(function () {
  'use strict';

  let FIVE_RANDOM_RECIPES_URL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=5';
  let GET_RECIPE_URL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/';
  let RECIPE_SEARCH_URL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?';
  let GET_RECIPE_BY_ID_URL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/';

  app.spoonacularUrls = {
    FIVE_RANDOM_RECIPES_URL,
    RECIPE_SEARCH_URL,
    GET_RECIPE_BY_ID_URL,
    GET_RECIPE_URL
  };
}());
