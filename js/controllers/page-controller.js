'use strict';

import {recipeModel} from 'recipe-model';
import {pageView} from 'page-view';
import $ from 'jquery';

let $loader = $('#loader-wrapper');

class PageController {

    loadHomePage(context, selector) {
        $loader.show();
        recipeModel
            .getGuestRecipes()
            .then(response => {
                return pageView.showHomePage(context, selector, response);
            })
            .then(success => {
                setTimeout(function () {
                    $loader.fadeOut(500);
                }, 1000);
            });
    }

    loadRecipeSearchResult(selector, data) {
        recipeModel
            .getRecipes(data)
            .then(response => {
                return pageView.showRecipeSearchResult(selector, response);
            })
            .then(success => {
                setTimeout(function () {
                    $loader.fadeOut(500);
                }, 1000);
            });
    }

    loadSearchedRecipeById(data) {
        recipeModel
            .getSearchedRecipeById(data)
            .then(response => {
                return pageView.showSearchedRecipeInstuctions(response);
            });
    }

    loadRecipeSearchMenu(context, selector) {
        return pageView.showRecipeSearchMenu(context, selector);
    }

    loadMainNavigationWhenUserIsLoggedIn(context, selector, data) {
        return pageView.showMainNavigationWhenUserIsLoggedIn(context, selector, data);
    }

    loadMainNavigationWhenNoUserIsLoggedIn(context, selector, data) {
        return pageView.showMainNavigationWhenNoUserIsLoggedIn(context, selector, data);
    }

    loadLoginPage(context, selector) {
        return pageView.showLoginPage(context, selector);
    }

    loadRegisterPage(context, selector) {
        return pageView.showRegisterPage(context, selector);
    }

    loadFoundUsersPage(selector, data) {
        return pageView.showFoundUsersPage(selector, data);
    }

    loadProfilePage(selector, data) {
        $loader.show();
        return pageView.showProfilePage(selector, data)
            .then(success => {
                setTimeout(function () {
                    $loader.fadeOut(500);
                }, 1000);
            });
    }

    loadFavoriteRecipes(selector, data) {
        $loader.show();
        return pageView.showFavoriteRecipes(selector, data)
        .then(success => {
            setTimeout(function () {
                    $loader.fadeOut(500);
                }, 1000);
        });
    }

    addNewRecipes(selector, data) {
        return pageView.addNewRecipes(selector, data);
    }

    loadOtherUserFavourites(favouriteRecipes) {
        return pageView.showOtherUserFavourites(favouriteRecipes);
    }
}

let pageController = new PageController();
export {pageController};