var app = app || {};

(function () {
    'use strict';

    class Headers {
        getHeaders(sendData, userCredentials) {
            let headers = {};

            if (sendData) {
                headers['Content-Type'] = 'application/json';
            }

            if (userCredentials) {
                headers.Authorization = `Basic ${localStorage.authKey}`;
            } else {
                let token = btoa(`${app.constants.APP_KEY}:${app.constants.APP_SECRET}`);
                headers.Authorization = `Basic ${token}`;
            }

            return headers;
        }
    }

    app.headers = new Headers();
}());