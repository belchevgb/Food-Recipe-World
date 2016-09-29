'use strict';

import $ from 'jquery';
import Handlebars from 'handlebars';
import {eventAttacher} from 'event-attacher';
import {notificator} from 'notificator';
import {messages} from 'messages';
import {appUrls} from 'app-urls';
import Sammy from 'sammy';

class PageView {
  showHomePage(context, selector, data) {
    let $selectedElement = $(selector);
    $selectedElement.empty();
    data.username = localStorage.username;
    return $.get('templates/home-recipes.handlebars',
      htmlTemplate => {
        let template = Handlebars.compile(htmlTemplate);
        let html = template(data);
        let $body = $('body');
        let $recipeSearchContainer = $('#recipe-search');

        $selectedElement.append(html);
        $body.off('click', '.btn-like');
        $body.off('click', '.btn-add-favorite');
        eventAttacher.addToFavoritesEvent();
        eventAttacher.addToLikesEvent();
        eventAttacher.detectBottomOfThePage();

        if (!localStorage.authKey) {
          $recipeSearchContainer.hide();
        } else {
          $recipeSearchContainer.show();
        }
      });
  }

  showRecipeSearchMenu(context, selector, data) {
    let $selectedElement = $(selector);
    $selectedElement.empty();
    return $.get('templates/home-recipes-search.handlebars', htmTemplate => {
      let template = Handlebars.compile(htmTemplate);
      let html = template(data);

      $selectedElement.append(html);
      eventAttacher.recipeSearchEvent();
      eventAttacher.removeDetectionOfTheBottom();
    });
  }

  showRecipeSearchResult(selector, data) {
    let $selectedElement = $(selector);
    $selectedElement.empty();
    return $.get('templates/home-recipes-search-results.handlebars',
      htmlTempalate => {
        let template = Handlebars.compile(htmlTempalate);
        let html = template(data);

        $selectedElement.append(html);
        eventAttacher.getInstructionsForSearchedRecipeEvent();
        eventAttacher.addToFavoritesEvent();
        eventAttacher.removeDetectionOfTheBottom();
      });
  }

  showSearchedRecipeInstuctions(data) {
    let buttonToEdit = $('#btn-instructions-' + data.id),
      $selectedElement = $('#btn-instructions-' + data.id);
    return $.get('templates/disply-searched-recipe.handlebars', htmlTemplate => {
      let template = Handlebars.compile(htmlTemplate);
      let html = template(data);

      $selectedElement.after(html);
      buttonToEdit.remove();
      eventAttacher.removeDetectionOfTheBottom();
    });
  }

  showMainNavigationWhenUserIsLoggedIn(context, selector, data) {
    let $selectedElement = $(selector);
    $selectedElement.empty();

    return $.get('templates/main-navigation-logged-in.handlebars', htmlTemplate => {
      let template = Handlebars.compile(htmlTemplate);
      let html = template(data);
      $selectedElement.append(html);
      eventAttacher.logoutUserEvent(context);
      eventAttacher.searchUsersEvent();
    });
  }

  showMainNavigationWhenNoUserIsLoggedIn(context, selector, data) {
    let $selectedElement = $(selector);
    $selectedElement.empty();
    return $.get('templates/main-navigation-not-logged-in.handlebars',
      htmlTemplate => {
        let template = Handlebars.compile(htmlTemplate);
        let html = template(data);

        $selectedElement.append(html);
      });
  }

  showLoginPage(context, selector) {
    let $selectedElement = $(selector);
    $selectedElement.empty();
    return $.get('templates/login.handlebars',
      htmlTemplate => {
        $selectedElement.append(htmlTemplate);
        eventAttacher.loginUserEvent(context);
      });
  }

  showRegisterPage(context, selector) {
    let $selectedElement = $(selector);
    $selectedElement.empty();
    return $.get('templates/register.handlebars', htmlTemplate => {
      $selectedElement.append(htmlTemplate);
      eventAttacher.registerUserEvent(context);
    });
  }

  showFoundUsersPage(selector, data) {
    if (!data) {
      notificator.showNotification(messages.UNAUTHORISED_ACTION, 'error');
      Sammy(function () {
        this.trigger('redirectToUrl', appUrls.BASE_URL);
      });
    }

    data = { users: data };

    $.get('templates/found-users.handlebars', htmlTemplate => {
      let $selectedElement = $(selector);
      let template = Handlebars.compile(htmlTemplate);
      let html = template(data);

      $selectedElement.empty();
      $selectedElement.append(html);
      eventAttacher.showOtherUserFavouriteRecipesEvent();
      eventAttacher.removeDetectionOfTheBottom();
    });
  }

  showProfilePage(selector, data) {
    return $.get('templates/profile.handlebars', htmlTemplate => {
      let $selectedElement = $(selector);
      let template = Handlebars.compile(htmlTemplate);
      let html = template(data);

      $selectedElement.empty();
      $selectedElement.append(html);
      eventAttacher.showUserFavoriteRecipes();
      eventAttacher.showUserLikedRecipes();
      eventAttacher.removeDetectionOfTheBottom();
    });
  }

  addNewRecipes(selector, data) {
    data.username = localStorage.username;
    return $.get('templates/home-recipes.handlebars', htmlTempalte => {
      let $selectedElement = $(selector);
      let template = Handlebars.compile(htmlTempalte);
      let html = template(data);
      let $body = $('body');

      $('.btn.btn-primary.btn-just-icon.btn-like').off();
      $('.btn.btn-warning.btn-just-icon.btn-add-favorite').off();
      $selectedElement.append(html);
      eventAttacher.addToFavoritesEvent();
      eventAttacher.addToLikesEvent();
    });
  }

  hideMiniLoader() {
    $('#mini-loader').fadeOut(700);
  }

  showFavoriteRecipes(selector, data) {
    return $.get('templates/display-favorite-recipes.handlebars', htmlTemplate => {
      let $selectedElement = $(selector);
      let recipesToShow = {
        recipes: data
      };
      let template = Handlebars.compile(htmlTemplate);
      let html = template(recipesToShow);

      $selectedElement.empty();
      $selectedElement.append(html);
      eventAttacher.removeFromFavoritesEvent();
      eventAttacher.removeDetectionOfTheBottom();
    });
  }

  showLikedRecipes(selector, data) {
    return $.get('templates/display-liked-recipes.handlebars', htmlTemplate => {
      let $selectedElement = $(selector);
      let recipesToShow = {
        recipes: data
      };
      let template = Handlebars.compile(htmlTemplate);
      let html = template(recipesToShow);

      $selectedElement.empty();
      $selectedElement.append(html);
      eventAttacher.removeFromLikesEvent();
      eventAttacher.removeDetectionOfTheBottom();
    });
  }

  showOtherUserFavourites(favouriteRecipes) {
    return $.get('templates/home-recipes.handlebars', htmlTemplate => {
      let $selectedElement = $('#content');
      let recipesToShow = {
        recipes: favouriteRecipes
      }
      let template = Handlebars.compile(htmlTemplate);
      let html = template(recipesToShow);
      let $body = $('body');

      $selectedElement.append(html);
      $body.off('click', '.btn-like');
      $body.off('click', '.btn-add-favorite');
      eventAttacher.addToFavoritesEvent();
      eventAttacher.addToLikesEvent();
      eventAttacher.removeDetectionOfTheBottom();
    });
  }
}

const pageView = new PageView();
export {pageView};