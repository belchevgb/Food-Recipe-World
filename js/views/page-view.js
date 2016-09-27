var app = app || {};

(function () {
  'use strict'

  class PageView {
    showHomePage(context, selector, data) {
      let $selectedElement = $(selector)
      $selectedElement.empty()
      data.username = localStorage.username
      return $.get('templates/home-recipes.handlebars',
        htmlTemplate => {
          let template = Handlebars.compile(htmlTemplate),
            html = template(data),
            $body = $('body'),
            $recipeSearchContainer = $('#recipe-search')

          $selectedElement.append(html)
          $body.off('click', '.btn-like')
          $body.off('click', '.btn-add-favorite')
          app.eventAttacher.addToFavoritesEvent()
          app.eventAttacher.addToLikesEvent()
          app.eventAttacher.detectBottomOfThePage()

          if (!localStorage.authKey) {
            $recipeSearchContainer.hide()
          } else {
            $recipeSearchContainer.show()
          }
        })
    }

    showRecipeSearchMenu(context, selector, data) {
      let $selectedElement = $(selector)
      $selectedElement.empty()
      return $.get('templates/home-recipes-search.handlebars', htmTemplate => {
        let template = Handlebars.compile(htmTemplate),
          html = template(data)

        $selectedElement.append(html)
        app.eventAttacher.recipeSearchEvent()
        app.eventAttacher.removeDetectionOfTheBottom()
      })
    }

    showRecipeSearchResult(selector, data) {
      let $selectedElement = $(selector)
      $selectedElement.empty()
      return $.get('templates/home-recipes-search-results.handlebars',
        htmlTempalate => {
          let template = Handlebars.compile(htmlTempalate),
            html = template(data)

          $selectedElement.append(html)
          app.eventAttacher.getInstructionsForSearchedRecipeEvent()
          app.eventAttacher.addToFavoritesEvent()
          app.eventAttacher.removeDetectionOfTheBottom()
        })
    }

    showSearchedRecipeInstuctions(data) {
      let buttonToEdit = $("#btn-instructions-" + data.id),
        $selectedElement = $("#btn-instructions-" + data.id)
      return $.get('templates/disply-searched-recipe.handlebars', htmlTemplate => {
          let template = Handlebars.compile(htmlTemplate),
            html = template(data)

          $selectedElement.after(html)
          buttonToEdit.remove()
          app.eventAttacher.removeDetectionOfTheBottom()
        })
    }

    showMainNavigationWhenUserIsLoggedIn(context, selector, data) {
      let $selectedElement = $(selector)
      $selectedElement.empty()

      return $.get('templates/main-navigation-logged-in.handlebars', htmlTemplate => {
          let template = Handlebars.compile(htmlTemplate),
            html = template(data)
          $selectedElement.append(html)
          app.eventAttacher.logoutUserEvent(context)
          app.eventAttacher.searchUsersEvent()
        })
    }

    showMainNavigationWhenNoUserIsLoggedIn(context, selector, data) {
      let $selectedElement = $(selector)
      $selectedElement.empty()
      return $.get('templates/main-navigation-not-logged-in.handlebars',
        htmlTemplate => {
          let template = Handlebars.compile(htmlTemplate),
            html = template(data)

          $selectedElement.append(html)
        })
    }

    showLoginPage(context, selector) {
      let $selectedElement = $(selector)
      $selectedElement.empty()
      return $.get('templates/login.handlebars',
        htmlTemplate => {
          $selectedElement.append(htmlTemplate)
          app.eventAttacher.loginUserEvent(context)
        })
    }

    showRegisterPage(context, selector) {
      let $selectedElement = $(selector)
      $selectedElement.empty()
      return $.get('templates/register.handlebars',htmlTemplate => {
          $selectedElement.append(htmlTemplate)
          app.eventAttacher.registerUserEvent(context)
        })
    }

    showFoundUsersPage(selector, data) {
      if (!data) {
        app.notificator.showNotification(app.messages.UNAUTHORISED_ACTION, "error")
        Sammy(function () {
          this.trigger('redirectToUrl', app.appUrls.BASE_URL)
        })
      }

      data = { users: data }

      $.get('templates/found-users.handlebars', htmlTempalate => {
        let $selectedElement = $(selector),
          template = Handlebars.compile(htmlTemplate),
          html = template(data)

        $selectedElement.empty()
        $selectedElement.append(html)
        app.eventAttacher.showOtherUserFavouriteRecipesEvent()
        app.eventAttacher.removeDetectionOfTheBottom()
      })
    }

    showProfilePage(selector, data) {
      return $.get('templates/profile.handlebars', htmlTemplate => {
        let $selectedElement = $(selector),
          template = Handlebars.compile(htmlTemplate),
          html = template(data)

        $selectedElement.empty()
        $selectedElement.append(html)
        app.eventAttacher.showUserFavoriteRecipes()
        app.eventAttacher.showUserLikedRecipes()
        app.eventAttacher.removeDetectionOfTheBottom()
      })
    }

    addNewRecipes(selector, data) {
      data.username = localStorage.username
      return $.get('templates/home-recipes.handlebars', htmlTempalte => {
        let $selectedElement = $(selector),
          template = Handlebars.compile(htmlTempalte),
          html = template(data),
          $body = $('body')

        $('.btn.btn-primary.btn-just-icon.btn-like').off()
        $('.btn.btn-warning.btn-just-icon.btn-add-favorite').off()
        $selectedElement.append(html)
        app.eventAttacher.addToFavoritesEvent()
        app.eventAttacher.addToLikesEvent()
      })
    }

    hideMiniLoader() {
      $('#mini-loader').fadeOut(700)
    }

    showFavoriteRecipes(selector, data) {
      return $.get('templates/display-favorite-recipes.handlebars', htmlTemplate => {
        let $selectedElement = $(selector),
          recipesToShow = {
            recipes: data
          },
          template = Handlebars.compile(htmlTemplate),
          html = template(recipesToShow)

        $selectedElement.empty()
        $selectedElement.append(html)
        app.eventAttacher.removeFromFavoritesEvent()
        app.eventAttacher.removeDetectionOfTheBottom()
      })
    }

    showLikedRecipes(selector, data) {
      return $.get('templates/display-liked-recipes.handlebars', htmlTempalate => {
        let $selectedElement = $(selector),
          recipesToShow = {
            recipes: data
          },
          template = Handlebars.compile(htmlTemplate),
          html = template(recipesToShow)

        $selectedElement.empty()
        $selectedElement.append(html)
        app.eventAttacher.removeFromLikesEvent()
        app.eventAttacher.removeDetectionOfTheBottom()
      })
    }

    showOtherUserFavourites(favouriteRecipes) {
      return $.get('templates/home-recipes.handlebars', htmlTempalate => {
        let $selectedElement = $('#content'),
          recipesToShow = {
            recipes: favouriteRecipes
          },
          template = Handlebars.compile(htmlTemplate),
          html = template(recipesToShow),
          $body = $('body')

        $selectedElement.append(html)
        $body.off('click', '.btn-like')
        $body.off('click', '.btn-add-favorite')
        app.eventAttacher.addToFavoritesEvent()
        app.eventAttacher.addToLikesEvent()
        app.eventAttacher.removeDetectionOfTheBottom()
      })
    }
  }

  app.pageView = new PageView()
} ())