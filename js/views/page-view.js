var app = app || {};

(function () {
    'use strict';

    function registerUserEvent(context) {
        $('#btn-register').on('click', () => {
            let username = $('#tb-register-username').val(),
                password = $('#tb-register-password').val(),
                confirmPassword = $('#tb-register-confirm-password').val();

            if (confirmPassword !== password) {
                notificator.showNotification(app.constants.INVALID_CONFIRM_PASSWORD, 'error');
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

    class PageView {
        showHomePage(context, selector) {

        }

        showLoginPage(context, selector) {
            let $selectedElement = $(selector);

            $selectedElement.empty();
            return $.get('templates/login.handlebars', htmlTemplate => {
                $selectedElement.append(htmlTemplate);
                loginUserEvent(context);
            });
        }

        showRegisterPage(context, selector) {
            let $selectedElement = $(selector);

            $selectedElement.empty();
            return $.get('templates/register.handlebars', htmlTemplate => {
                $selectedElement.append(htmlTemplate);
                registerUserEvent(context);
            });
        }
    }

    app.pageView = new PageView();
}());