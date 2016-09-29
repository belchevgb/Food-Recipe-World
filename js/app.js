'use strict';

import {pageController} from 'page-controller';
import {userController} from 'user-controller';
import {recipeController} from 'recipe-controller';
import {appUrls} from 'app-urls';
import {pageView} from 'page-view';
import {notificator} from 'notificator';
import Sammy from 'sammy';

const MAIN_CONTENT_SELECTOR = '#content';
const MAIN_NAVIGATION_SELECTOR = '#main-navigation';
const MAIN_RECIPE_SEARCH_MENU_SELECTOR = '#recipe-search';
let appObject = {};

function loadHeader(context, data) {
  if (localStorage.authKey) {
    pageController.loadMainNavigationWhenUserIsLoggedIn(context, MAIN_NAVIGATION_SELECTOR, data);
  } else {
    pageController.loadMainNavigationWhenNoUserIsLoggedIn(context, MAIN_NAVIGATION_SELECTOR, {});
  }
}

function loadRecipeSearchMenu(context, selector) {
  if (localStorage.authKey) {
    pageController.loadRecipeSearchMenu(context, selector);
  }
}

function loadProfilePage() {
  $('#loader-wrapper').show();
  userController
    .getUserData()
    .then(response => {
      pageController.loadProfilePage(MAIN_CONTENT_SELECTOR, response)
    })
    .then(() => {
      return userController.getUserFavoriteRecipes();
    })
    .then(response => {
      let recipes = response.favoriteRecipes;
      let favoriteRecipesSelector = '#favorite-recipes-container';

      return pageController.loadFavoriteRecipes(favoriteRecipesSelector, recipes, false);
    })
    .then(() => $('#loader-wrapper').fadeOut(1500));
}

let router = new Sammy(function () {
  this.before({ except: { path: '#/(login|register)?' } }, function () {
    if (!localStorage.authKey) {
      this.redirect('#/');
      return false;
    }
  });

  this.get(appUrls.BASE_URL, function (context) {
    loadHeader(context, localStorage);
    loadRecipeSearchMenu(context, MAIN_RECIPE_SEARCH_MENU_SELECTOR);
    pageController.loadHomePage(context, MAIN_CONTENT_SELECTOR);
  });

  this.get(appUrls.LOGIN_URL, function (context) {
    pageController.loadLoginPage(context, MAIN_CONTENT_SELECTOR);
  });

  this.get(appUrls.REGISTER_URL, function (context) {
    pageController.loadRegisterPage(context, MAIN_CONTENT_SELECTOR);
  });

  this.get(appUrls.FOUND_USERS_URL, function (context) {
    pageController.loadFoundUsersPage(MAIN_CONTENT_SELECTOR, appObject.foundUsers);
  });

  this.get(appUrls.PROFILE_URL, function (context) {
    loadProfilePage();
  });

  this.get(appUrls.FOUND_RECIPES_URL, function () {
    pageController.loadRecipeSearchResult(MAIN_CONTENT_SELECTOR, appObject.reasultOfRecipeSearch);
  });

  // START recipes search URLs
  this.get(appUrls.FOUND_RECIPES_URL +
    '/:searchRecipeQuery' +
    '/:searchRecipeNumberOfRecipes',
    function () {
      let data = {
        searchRecipeQuery: this.params['searchRecipeQuery'],
        searchRecipeDiet: this.params['searchRecipeDiet'] || '',
        searchRecipeNumberOfRecipes: this.params['searchRecipeNumberOfRecipes'],
        searchRecipeCuisine: this.params['searchRecipeCuisine'] || ''
      };
      pageController.loadRecipeSearchResult(MAIN_CONTENT_SELECTOR, data);
    });

  this.get(appUrls.FOUND_RECIPES_URL +
    '/:searchRecipeQuery' +
    '/:searchRecipeDiet' +
    '/:searchRecipeNumberOfRecipes',
    function () {
      let data = {
        searchRecipeQuery: this.params['searchRecipeQuery'],
        searchRecipeDiet: this.params['searchRecipeDiet'] || '',
        searchRecipeNumberOfRecipes: this.params['searchRecipeNumberOfRecipes'],
        searchRecipeCuisine: this.params['searchRecipeCuisine'] || ''
      };
      pageController.loadRecipeSearchResult(MAIN_CONTENT_SELECTOR, data)
    });

  this.get(appUrls.FOUND_RECIPES_URL +
    '/:searchRecipeQuery' +
    '/:searchRecipeDiet' +
    '/:searchRecipeCuisine' +
    '/:searchRecipeNumberOfRecipes',
    function () {
      let data = {
        searchRecipeQuery: this.params['searchRecipeQuery'],
        searchRecipeDiet: this.params['searchRecipeDiet'],
        searchRecipeNumberOfRecipes: this.params['searchRecipeNumberOfRecipes'],
        searchRecipeCuisine: this.params['searchRecipeCuisine']
      };
      pageController.loadRecipeSearchResult(MAIN_CONTENT_SELECTOR, data);
    });
  // END recipes search URLs

  // Events
  this.bind('redirectToUrl', function (event, url) {
    this.redirect(url);
  });

  this.bind('registerUser', function (event, data) {
    userController.registerUser(data);
  });

  this.bind('loginUser', function (event, data) {
    userController.loginUser(data);
  });

  this.bind('logoutUser', function (event, data) {
    userController.logoutUser();
  });

  this.bind('searchUsers', function (event, data) {
    userController.getFoundUser(MAIN_CONTENT_SELECTOR, data);
  });

  this.bind('getSearchedRecipeById', function (event, data) {
    pageController.loadSearchedRecipeById(data);
  });

  this.bind('addRecipeToFavorites', function (event, data) {
    recipeController.getRecipeById(data)
      .then(response => {
        return userController.addRecipeToFavorites(response);
      });
  });

  this.bind('removeRecipeFromFavorites', function (event, data) {
    recipeController.getRecipeById(data)
      .then(response => {
        return userController.removeRecipeFromFavorites(response);
      }).then(response => {
        this.trigger('showFavoriteRecipes');
      });
  });

  this.bind('addRecipeToLikes', function (event, data) {
    recipeController.getRecipeById(data)
      .then(response => {
        return userController.addRecipeToLikes(response);
      });
  });

  this.bind('removeRecipeFromLikes', function (event, data) {
    recipeController.getRecipeById(data)
      .then(response => {
        return userController.removeRecipeFromLikes(response);
      }).then(response => {
        this.trigger('showLikedRecipes');
      });
  });

  this.bind('showFavoriteRecipes', function (event) {
    userController
      .getUserFavoriteRecipes()
      .then(response => {
        let recipes = response.favoriteRecipes;
        let favoriteRecipesSelector = '#favorite-recipes-container';

        pageController.loadFavoriteRecipes(favoriteRecipesSelector, recipes, true);
      });
  });

  this.bind('showLikedRecipes', function (event) {
    userController.getUserLikedRecipes()
      .then(response => {
        let recipes = response.likedRecipes;
        let likedRecipesSelector = '#favorite-recipes-container';

        pageController.loadLikedRecipes(likedRecipesSelector, recipes);
      });
  });

  this.bind('loadMoreRecipes', function (event) {
    recipeController
      .getRandomRecipes()
      .then(response => {
        pageController
          .addNewRecipes(MAIN_CONTENT_SELECTOR, response)
          .then(success => {
            pageView.hideMiniLoader();
          });
      });
  });

  this.bind('showOtherUserFavourites', function (event, data) {
    userController
      .getFoundUserFavourites(data)
      .then(function (response) {
        let favouriteRecipes = response.favoriteRecipes;

        if (!favouriteRecipes || !favouriteRecipes.length) {
          notificator.showNotification(appObject.messages.NOT_FOUND_FAVOURITE_RECIPES, 'error');
        } else {
          pageController.loadOtherUserFavourites(favouriteRecipes);
        }
      });
  });
});

router.run(appUrls.BASE_URL);
export {appObject};