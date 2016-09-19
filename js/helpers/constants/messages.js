var app = app || {};

(function() {
    'use strict';

    // ERROR MESSAGES
    const INVALID_CONFIRM_PASSWORD = 'The confirmation password is not the same as the password. Please try again.',
        REGISTRATION_FAILED = 'Registration failed. Please try again.',
        LOGIN_FAILED = 'Login failed. Please try again.';

    // SUCCESS MESSAGES
    const REGISTRATION_SUCCESSFUL = 'Registration successful!',
        LOGIN_SUCCESSFUL = 'Login successful!',
        LOGOUT_SUCCESSFUL = 'Logout successful!';

    app.messages = {
        INVALID_CONFIRM_PASSWORD,
        REGISTRATION_FAILED,
        LOGIN_FAILED,

        REGISTRATION_SUCCESSFUL,
        LOGIN_SUCCESSFUL,
        LOGOUT_SUCCESSFUL
    };
}());