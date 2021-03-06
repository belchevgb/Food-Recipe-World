var app = app || {};

(function () {
    'use strict';

    // ERROR MESSAGES
    let INVALID_CONFIRM_PASSWORD = 'The confirmation password is not the same as the password. Please try again.';
    let REGISTRATION_FAILED = 'Registration failed. Please try again.';
    let LOGIN_FAILED = 'Login failed. Please try again.';
    let EMPTY_RECIPE_SEARCH = 'Please enter something to search for.';
    let RECIPE_BY_ID_WASNT_FOUND = 'The recipe could not be found. Please try again.';
    let NOT_FOUND_FAVOURITE_RECIPES = 'There aren\'t any favourite recipes!';
    let UNAUTHORISED_ACTION = 'Unauthorised action!';

    // SUCCESS MESSAGES
    let REGISTRATION_SUCCESSFUL = 'Registration successful!';
    let LOGIN_SUCCESSFUL = 'Login successful!';
    let LOGOUT_SUCCESSFUL = 'Logout successful!';
    let RECIPE_ADDED_TO_FAVORITES = 'The recipe was added successfuly to Favorites!';
    let RECIPE_REMOVED_FROM_FAVORITES = 'The recipe was successfully removed from Favorites!';
    let RECIPE_ADDED_TO_LIKES = 'This recipe was liked and added to Liked list in your profile!';
    let RECIPE_REMOVED_FROM_LIKES = 'The recipe was successfully removed from Liked!';

    app.messages = {
        INVALID_CONFIRM_PASSWORD,
        REGISTRATION_FAILED,
        LOGIN_FAILED,
        EMPTY_RECIPE_SEARCH,
        RECIPE_BY_ID_WASNT_FOUND,
        NOT_FOUND_FAVOURITE_RECIPES,
        UNAUTHORISED_ACTION,

        REGISTRATION_SUCCESSFUL,
        LOGIN_SUCCESSFUL,
        LOGOUT_SUCCESSFUL,
        RECIPE_ADDED_TO_FAVORITES,
        RECIPE_REMOVED_FROM_FAVORITES,
        RECIPE_ADDED_TO_LIKES,
        RECIPE_REMOVED_FROM_LIKES
    };
} ());
