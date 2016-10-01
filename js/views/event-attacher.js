var app = app || {};

(function () {
  'use strict'

  function registerUserEvent (context) {
    $('#btn-register').on('click', () => {
      let username = $('#tb-register-username').val()
      let password = $('#tb-register-password').val()
      let confirmPassword = $('#tb-register-confirm-password').val()

      if (confirmPassword !== password) {
        app.notificator.showNotification(app.messages.INVALID_CONFIRM_PASSWORD, 'error')
      } else {
        context.trigger('registerUser', {
          username,
          password
        })
      }
    })
  }

  function loginUserEvent (context) {
    $('#btn-login').on('click', () => {
      let username = $('#tb-login-username').val()
      let password = $('#tb-login-password').val()

      context.trigger('loginUser', {
        username,
        password
      })
    })
  }

  function searchUsersEvent () {
    $('#btn-search-users').on('click', () => {
      let searchData = $('#tb-search-user').val()
      Sammy(function () {
        this.trigger('searchUsers', searchData)
      })
    })
  }

  function logoutUserEvent () {
    $('#btn-logout').on('click', () => {
      Sammy(function () {
        this.trigger('logoutUser')
      })
    })
  }

  function recipeSearchEvent () {
    $('#search-recipe-btn-normal').on('click', () => {
      let searchRecipeQuery = $('#search-recipe-query').val()
      let searchRecipeDiet = $('#search-recipe-diet').val()
      let searchRecipeNumberOfRecipes = $('#search-recipe-numberOfRecipes').val() || 10
      let searchRecipeCuisine = $('#search-recipe-cuisine').val()

      app.reasultOfRecipeSearch = {
        searchRecipeQuery: searchRecipeQuery,
        searchRecipeDiet: searchRecipeDiet || '',
        searchRecipeNumberOfRecipes: searchRecipeNumberOfRecipes,
        searchRecipeCuisine: searchRecipeCuisine || ''
      };

      if (searchRecipeQuery.split(' ').length >= 1) {
        searchRecipeQuery = searchRecipeQuery.replace(' ', '+')
      }
      if (searchRecipeCuisine.split(',').length >= 1) {
        searchRecipeCuisine = searchRecipeCuisine.replace(' ', '+')
        searchRecipeCuisine = searchRecipeCuisine.replace(',', '&')
      }

      Sammy(function () {
        $('#loader-wrapper').show()
        if (searchRecipeQuery && searchRecipeDiet && searchRecipeCuisine) {
          this.trigger('redirectToUrl', `#/found-recipes/${searchRecipeQuery}/${searchRecipeDiet}/${searchRecipeCuisine}/${searchRecipeNumberOfRecipes}`)
        } else if (searchRecipeQuery && searchRecipeCuisine) {
          this.trigger('redirectToUrl', `#/found-recipes/${searchRecipeQuery}/${searchRecipeCuisine}/${searchRecipeNumberOfRecipes}`)
        } else if (searchRecipeQuery && searchRecipeDiet) {
          this.trigger('redirectToUrl', `#/found-recipes/${searchRecipeQuery}/${searchRecipeDiet}/${searchRecipeNumberOfRecipes}`)
        } else if (searchRecipeQuery) {
          this.trigger('redirectToUrl', `#/found-recipes/${searchRecipeQuery}/${searchRecipeNumberOfRecipes}`)
        }
      })
    })
  }

  function getInstructionsForSearchedRecipeEvent () {
    $('#get-instruction').on('click', '.btn.btn-info.btn-round.recipe-buttons', event => {
      let recipeId = $(event.target).data('recipe-id')
      Sammy(function () {
        this.trigger('getSearchedRecipeById', recipeId)
      })
    })
  }

  function addToFavoritesEvent () {
    $('.btn-add-favorite').on('click', () => {
      let recipeId = $(this).attr('recipe-id')
      Sammy(function () {
        app.notificator.showNotification(app.messages.RECIPE_ADDED_TO_FAVORITES, 'success')
        this.trigger('addRecipeToFavorites', recipeId)
      })
    })
  }

  function removeFromFavoritesEvent () {
    $('.btn-remove-favorite').on('click', () => {
      let recipeId = $(this).attr('recipe-id')
      Sammy(function () {
        app.notificator.showNotification(app.messages.RECIPE_REMOVED_FROM_FAVORITES, 'success')
        this.trigger('removeRecipeFromFavorites', recipeId)
      })
    })
  }

  function addToLikesEvent () {
    $('.btn-like').on('click', () => {
      let recipeId = $(this).attr('recipe-id')
      Sammy(function () {
        app.notificator.showNotification(app.messages.RECIPE_ADDED_TO_LIKES, 'success')
        this.trigger('addRecipeToLikes', recipeId)
      })
    })
  }

  function removeFromLikesEvent () {
    $('.btn-dislike').on('click', () => {
      let recipeId = $(this).attr('recipe-id')
      Sammy(function () {
        app.notificator.showNotification(app.messages.RECIPE_REMOVED_FROM_LIKES, 'success')
        this.trigger('removeRecipeFromLikes', recipeId)
      })
    })
  }

  function detectBottomOfThePage () {
    $(window).scroll(() => {
      let currentWindowHeight = $(window).scrollTop() + $(window).height()
      let maxWindowHeight = $(document).height()

      if (currentWindowHeight === maxWindowHeight) {
        Sammy(function () {
          $('#mini-loader').show()
          this.trigger('loadMoreRecipes')
        })
      }
    })
  }

  function showUserFavoriteRecipes () {
    $('#btn-favourites').on('click', () => {
      Sammy(function () {
        this.trigger('showFavoriteRecipes')
      })
    })
  }

  function showUserLikedRecipes () {
    $('#btn-liked').on('click', () => {
      Sammy(function () {
        this.trigger('showLikedRecipes')
      })
    })
  }

  function showOtherUserFavouriteRecipesEvent () {
    $('#btn-user-favourites').on('click', () => {
      let userId = $('#username-container').attr('user-id')
      Sammy(function () {
        this.trigger('showOtherUserFavourites', userId)
      })
    })
  }

  function removeDetectionOfTheBottom () {
    $(window).off('scroll')
  }

  app.eventAttacher = {
    registerUserEvent,
    loginUserEvent,
    searchUsersEvent,
    logoutUserEvent,
    recipeSearchEvent,
    getInstructionsForSearchedRecipeEvent,
    addToFavoritesEvent,
    removeFromFavoritesEvent,
    addToLikesEvent,
    removeFromLikesEvent,
    detectBottomOfThePage,
    showUserFavoriteRecipes,
    showUserLikedRecipes,
    showOtherUserFavouriteRecipesEvent,
    removeDetectionOfTheBottom
  }
}())
