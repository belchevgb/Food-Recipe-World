'use strict';

import {userModel} from 'user-model';
import {notificator} from 'notificator';
import {appUrls} from 'app-urls';
import {messages} from 'messages';
import {appObject} from 'app';
import Sammy from 'sammy';

function redirect(url) {
  Sammy(function () {
    this.trigger('redirectToUrl', url);
  });
}

class UserController {
  registerUser(data) {
    userModel
      .registerUser(data)
      .then(success => {
        notificator.showNotification(messages.REGISTRATION_SUCCESSFUL, 'success');
        setTimeout(() => redirect(appUrls.LOGIN_URL), 500);
      }, error => {
        notificator.showNotification(messages.REGISTRATION_FAILED, 'error');
      });
  }

  loginUser(data) {
    userModel
      .loginUser(data)
      .then(success => {
        localStorage.setItem('username', success.username);
        localStorage.setItem('userId', success._id);
        localStorage.setItem('authKey', success._kmd.authtoken);
        notificator.showNotification(messages.LOGIN_SUCCESSFUL, 'success');
        setTimeout(() => {
          redirect(appUrls.BASE_URL);
        }, 500);
      }, error => {
        notificator.showNotification(messages.LOGIN_FAILED, 'error');
      });
  }

  logoutUser() {
    userModel.logoutUser()
      .then(success => {
        localStorage.clear();
        notificator.showNotification(messages.LOGOUT_SUCCESSFUL, 'success');
        setTimeout(() => {
          Sammy(function () {
            this.trigger('redirectToUrl', appUrls.BASE_URL);
          })
        }, 500)
      })
  }

  getFoundUser(selector, data) {
    userModel
      .findUser(data)
      .then(success => {
        Sammy(function () {
          appObject.foundUsers = success;
          this.trigger('redirectToUrl', appUrls.FOUND_USERS_URL);
        });
      });
  }

  getUserData() {
    return userModel.getUserData();
  }

  addRecipeToFavorites(recipe) {
    return userModel.addRecipeToFavorites(recipe);
  }

  removeRecipeFromFavorites(recipe) {
    return userModel.removeRecipeFromFavorites(recipe);
  }

  addRecipeToLikes(recipe) {
    return userModel.addRecipeToLikes(recipe);
  }

  removeRecipeFromLikes(recipe) {
    return userModel.removeRecipeFromLikes(recipe);
  }

  getUserFavoriteRecipes() {
    return userModel.getUserFavoriteRecipes();
  }

  getUserLikedRecipes() {
    return userModel.getUserLikedRecipes();
  }

  getFoundUserFavourites(userId) {
    return userModel.getFoundUserFavourites(userId);
  }
}

const userController = new UserController();
export {userController};