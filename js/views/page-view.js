var app = app || {};

(function () {
    'use strict';

    function registerUserEvent(context) {
        $('#btn-register').on('click', () => {
            let username = $('#tb-register-username').val(),
                password = $('#tb-register-password').val(),
                confirmPassword = $('#tb-register-confirm-password').val();

            if (confirmPassword !== password) {
                app.notificator.showNotification(app.messages.INVALID_CONFIRM_PASSWORD, 'error');
            } else {
                context.trigger('registerUser', {
                    username,
                    password
                });
            }
        });
    }

    function loginUserEvent(context) {
        $('#btn-login').on('click', function () {
            let username = $('#tb-login-username').val(),
                password = $('#tb-login-password').val();

            context.trigger('loginUser', {
                username,
                password
            });
        });
    }

    function searchUsersEvent() {
        $('#btn-search-users').on('click', function () {
            let searchData = $('#tb-search-user').val();

            Sammy(function () {
                this.trigger('searchUsers', searchData);
            });
        });
    }

    function logoutUserEvent() {
        $('#btn-logout').on('click', function () {
            Sammy(function () {
                this.trigger('logoutUser');
            });
        });
    }

    function recipeSearchEvent() {
        $('#search-recipe-btn-normal').on('click', function () {
            let searchRecipeQuery = $('#search-recipe-query').val() || "",
                searchRecipeDiet = $('#search-recipe-diet').val() || "",
                searchRecipeNumberOfRecipes = $('#search-recipe-numberOfRecipes').val(),
                searchRecipeCuisine = $('#search-recipe-cuisine').val() || "";

            app.reasultOfRecipeSearch = {
                searchRecipeQuery,
                searchRecipeDiet,
                searchRecipeNumberOfRecipes,
                searchRecipeCuisine
            };

            Sammy(function () {
                $('#loader-wrapper').show();
                this.trigger('redirectToUrl', '#/found-recipes');
            });
        });
    }


    function getInstructionsForSearchedRecipe() {
        $('#get-instruction').on('click', '.btn.btn-info.btn-round.recipe-buttons',
            function (event) {
                let recipeId = $(event.target).data('recipe-id');

                Sammy(function () {
                    this.trigger('getSearchedRecipeById', recipeId);
                });
            });
    }

    function addToFavoritesEvent() {
        $('.btn-add-favorite').on('click', function () {
            let recipeId = $(this).attr('recipe-id');

            Sammy(function () {
                app.notificator.showNotification(app.messages.RECIPE_ADDED_TO_FAVORITES, 'success');
                this.trigger('addRecipeToFavorites', recipeId);
            });
        });
    }

    function removeFromFavoritesEvent() {
        $('.btn-remove-favorite').on('click', function () {
            let recipeId = $(this).attr('recipe-id');

            Sammy(function () {
                app.notificator.showNotification(app.messages.RECIPE_REMOVED_FROM_FAVORITES, 'success');
                this.trigger('removeRecipeFromFavorites', recipeId);
            });
        });
    }

    function addToLikesEvent() {
        $('.btn-like').on('click', function () {
            let recipeId = $(this).attr('recipe-id');

            Sammy(function () {
                app.notificator.showNotification(app.messages.RECIPE_ADDED_TO_LIKES, 'success');
                this.trigger('addRecipeToLikes', recipeId);
            });
        });
    }

    function detectBottomOfThePage() {
        $(window).scroll(function () {
            let currentWindowHeight = $(window).scrollTop() + $(window).height(),
                maxWindowHeight = $(document).height();

            if (currentWindowHeight == maxWindowHeight) {
                Sammy(function () {
                    $('#mini-loader').show();
                    this.trigger('loadMoreRecipes');
                });
            }
        });
    }

    function showUserFavoriteRecipes() {
        $('#btn-favourites').on('click', function () {
            Sammy(function () {
                this.trigger('showFavoriteRecipes');
            });
        });
    }

    function showUserLikedRecipes(){
        $('#btn-liked').on('click',function(){
            Sammy(function(){
                this.trigger('showLikedRecipes');
            })
        })
    }

    function showOtherUserFavouriteRecipesEvent() {
        $('#btn-user-favourites').on('click', function () {
            let userId = $('#username-container').attr('user-id');

            Sammy(function () {
                this.trigger('showOtherUserFavourites', userId);
            });
        });
    }

    function removeDetectionOfTheBottom() {
        $(window).off('scroll');
    }

    class PageView {
        showHomePage(context, selector, data) {
            let $selectedElement = $(selector);

            $selectedElement.empty();
            return $.get('templates/home-recipes.handlebars',
                htmlTemplate => {
                    let template = Handlebars.compile(htmlTemplate),
                        html = template(data),
                        $body = $('body'),
                        $recipeSearchContainer = $('#recipe-search');

                    $selectedElement.append(html);
                    $body.off('click', '.btn-like');
                    $body.off('click', '.btn-add-favorite');
                    addToFavoritesEvent();
                    addToLikesEvent();
                    detectBottomOfThePage();

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
            return $.get('templates/home-recipes-search.handlebars',
                htmTemplate => {
                    let template = Handlebars.compile(htmTemplate),
                        html = template(data);

                    $selectedElement.append(html);
                    recipeSearchEvent();
                    removeDetectionOfTheBottom();
                });
        }

        showRecipeSearchResult(selector, data) {
            let $selectedElement = $(selector);

            $selectedElement.empty();
            return $.get('templates/home-recipes-search-results.handlebars',
                htmlTempalate => {
                    let template = Handlebars.compile(htmlTempalate),
                        html = template(data);

                    $selectedElement.append(html);
                    getInstructionsForSearchedRecipe();
                    addToFavoritesEvent();
                    removeDetectionOfTheBottom();
                    //todo reset form data
                });
        }

        showSearchedRecipeInstuctions(data) {
            let buttonToEdit = $("#btn-instructions-" + data.id),
                $selectedElement = $("#btn-instructions-" + data.id);

            return $.get('templates/disply-searched-recipe.handlebars',
                htmlTemplate => {
                    let template = Handlebars.compile(htmlTemplate),
                        html = template(data);

                    $selectedElement.after(html);
                    buttonToEdit.remove();
                    removeDetectionOfTheBottom();
                });
        }

        showMainNavigationWhenUserIsLoggedIn(context, selector, data) {
            let $selectedElement = $(selector);
            $selectedElement.empty();

            return $.get('templates/main-navigation-logged-in.handlebars',
                htmlTemplate => {
                    let template = Handlebars.compile(htmlTemplate),
                        html = template(data);

                    $selectedElement.append(html);
                    logoutUserEvent(context);
                    searchUsersEvent();
                });
        }

        showMainNavigationWhenNoUserIsLoggedIn(context, selector, data) {
            let $selectedElement = $(selector);

            $selectedElement.empty();
            return $.get('templates/main-navigation-not-logged-in.handlebars',
                htmlTemplate => {
                    let template = Handlebars.compile(htmlTemplate),
                        html = template(data);

                    $selectedElement.append(html);
                });
        }

        showLoginPage(context, selector) {
            let $selectedElement = $(selector);

            $selectedElement.empty();
            return $.get('templates/login.handlebars',
                htmlTemplate => {
                    $selectedElement.append(htmlTemplate);
                    loginUserEvent(context);
                });
        }

        showRegisterPage(context, selector) {
            let $selectedElement = $(selector);

            $selectedElement.empty();
            return $.get('templates/register.handlebars',
                htmlTemplate => {
                    $selectedElement.append(htmlTemplate);
                    registerUserEvent(context);
                });
        }

        showFoundUsersPage(selector, data) {
            data = {
                users: data
            };

            $.get('templates/found-users.handlebars', function (htmlTemplate) {
                let $selectedElement = $(selector),
                    template = Handlebars.compile(htmlTemplate),
                    html = template(data);

                $selectedElement.empty();
                $selectedElement.append(html);
                showOtherUserFavouriteRecipesEvent();
                removeDetectionOfTheBottom();
            });
        }

        showProfilePage(selector, data) {
            return $.get('templates/profile.handlebars', function (htmlTemplate) {
                let $selectedElement = $(selector),
                    template = Handlebars.compile(htmlTemplate),
                    html = template(data);

                $selectedElement.empty();
                $selectedElement.append(html);
                showUserFavoriteRecipes();
                showUserLikedRecipes();
                removeDetectionOfTheBottom();
            });
        }

        addNewRecipes(selector, data) {
            return $.get('templates/home-recipes.handlebars', htmlTempalte => {
                let $selectedElement = $(selector),
                    template = Handlebars.compile(htmlTempalte),
                    html = template(data),
                    $body = $('body');

                $body.off('click', '.btn-like');
                $body.off('click', '.btn-add-favorite');
                $selectedElement.append(html);
                addToFavoritesEvent();
                addToLikesEvent();
            });
        }

        hideMiniLoader() {
            $('#mini-loader').fadeOut(700);
        }

        showFavoriteRecipes(selector, data) {
            return $.get('templates/display-favorite-recipes.handlebars', function (htmlTemplate) {
                let $selectedElement = $(selector),
                    recipesToShow = {
                        recipes: data
                    },
                    template = Handlebars.compile(htmlTemplate),
                    html = template(recipesToShow);

                $selectedElement.empty();
                $selectedElement.append(html);
                removeFromFavoritesEvent();
                removeDetectionOfTheBottom();
            });
        }

        showLikedRecipes(selector, data){
            return $.get('templates/display-liked-recipes.handlebars', function (htmlTemplate) {
                let $selectedElement = $(selector),
                    recipesToShow = {
                        recipes: data
                    },
                    template = Handlebars.compile(htmlTemplate),
                    html = template(recipesToShow);

                $selectedElement.empty();
                $selectedElement.append(html);
                removeFromFavoritesEvent();
                removeDetectionOfTheBottom();
            });
        }

        showOtherUserFavourites(favouriteRecipes) {
            return $.get('templates/home-recipes.handlebars', function (htmlTemplate) {
                let $selectedElement = $('#content'),
                    recipesToShow = {
                        recipes: favouriteRecipes
                    },
                    template = Handlebars.compile(htmlTemplate),
                    html = template(recipesToShow),
                    $body = $('body');

                $selectedElement.append(html);
                $body.off('click', '.btn-like');
                $body.off('click', '.btn-add-favorite');
                addToFavoritesEvent();
                addToLikesEvent();
                removeDetectionOfTheBottom();
            });
        }
    }

    app.pageView = new PageView();
} ());