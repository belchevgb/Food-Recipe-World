'use strict';

// ERROR MESSAGES
let INVALID_CONFIRM_PASSWORD = 'The confirmation password is not the same as the password. Please try again.',
    REGISTRATION_FAILED = 'Registration failed. Please try again.',
    LOGIN_FAILED = 'Login failed. Please try again.';

// SUCCESS MESSAGES
let REGISTRATION_SUCCESSFUL = 'Registration successful!',
    LOGIN_SUCCESSFUL = 'Login successful!',
    LOGOUT_SUCCESSFUL = 'Logout successful!',
    RECIPE_ADDED_TO_FAVORITES = 'The recipe was added successfuly to Favorites!',
    RECIPE_ADDED_TO_LIKES = "This recipe was liked and added to Liked list in your profile!";

let messages = {
    INVALID_CONFIRM_PASSWORD,
    REGISTRATION_FAILED,
    LOGIN_FAILED,

    REGISTRATION_SUCCESSFUL,
    LOGIN_SUCCESSFUL,
    LOGOUT_SUCCESSFUL,
    RECIPE_ADDED_TO_FAVORITES,
    RECIPE_ADDED_TO_LIKES
};
export {messages};