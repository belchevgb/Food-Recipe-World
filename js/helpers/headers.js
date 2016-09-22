var app = app || {};

(function () {
    'use strict';

    class Headers {
        getKinveyHeaders(sendData, userCredentials) {
            let headers = {};

            if (sendData) {
                headers['Content-Type'] = 'application/json';
            }

            if (userCredentials) {
                headers.Authorization = `Kinvey ${localStorage.authKey}`;
            } else {
                let token = btoa(`${app.appKeys.APP_KEY}:${app.appKeys.APP_SECRET}`);
                headers.Authorization = `Basic ${token}`;
            }

            return headers;
        }

        getSpoonacularHeaders(sendData) {
            let headers = {};

            if (sendData) {
                headers['Content-Type'] = 'application/json';
            }

            headers['X-Mashape-Key'] = app.appKeys.SPOONACULAR_KEY;
            return headers;
        }
    }

    app.headers = new Headers();
} ());