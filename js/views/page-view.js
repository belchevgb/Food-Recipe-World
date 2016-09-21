'use strict';

import $ from 'jquery';
import {notificator} from 'notificator';
import {messages} from 'messages';
import Sammy from 'sammy';
import Handlebars from 'handlebars';

function registerUserEvent(context) {
    $('#btn-register').on('click', () => {
        let username = $('#tb-register-username').val(),
            password = $('#tb-register-password').val(),
            confirmPassword = $('#tb-register-confirm-password').val();

        if (confirmPassword !== password) {
            notificator.showNotification(messages.INVALID_CONFIRM_PASSWORD, 'error');
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
    $('#btn-logout')
        .on('click', function () {
            Sammy(function () {
                this.trigger('logoutUser');
            });
        });
}

function addToFavoritesEvent() {
    $('.btn-add-favorite').on('click', function () {
        let recipeId = $(this).attr('recipe-id');

        Sammy(function () {
            this.trigger('addRecipeToFavorites', recipeId);
        });
    });
}

function addToLikesEvent() {
    $('.btn-like').on('click', function () {
        let recipeId = $(this).attr('recipe-id');

        Sammy(function () {
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

class PageView {
    showHomePage(context, selector, data) {
        let $selectedElement = $(selector);
        $selectedElement.empty();
        return $.get('templates/home-recipes.handlebars',
            htmlTemplate => {
                let template = Handlebars.compile(htmlTemplate),
                    html = template(data);

                $selectedElement.append(html);
                addToFavoritesEvent();
                addToLikesEvent();
                detectBottomOfThePage();
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
        });
    }

    showProfilePage(selector, data) {
        return $.get('templates/profile.handlebars', function (htmlTemplate) {
            let $selectedElement = $(selector),
                template = Handlebars.compile(htmlTemplate),
                html = template(data);

            $selectedElement.empty();
            $selectedElement.append(html);
        });
    }

    addNewRecipes(selector, data) {
        return $.get('templates/home-recipes.handlebars', htmlTempalte => {
            let $selectedElement = $(selector),
                template = Handlebars.compile(htmlTempalte),
                html = template(data);

            $selectedElement.append(html);
            addToFavoritesEvent();
            addToLikesEvent();
        });
    }

    hideMiniLoader() {
        $('#mini-loader').fadeOut(700);
    }
}

let pageView = new PageView();
export {pageView};