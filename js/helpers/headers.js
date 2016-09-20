'use strict';

import {appKeys} from 'app-keys';

class Headers {
    getKinveyHeaders(sendData, userCredentials) {
        let headers = {};

        if (sendData) {
            headers['Content-Type'] = 'application/json';
        }

        if (userCredentials) {
            headers.Authorization = `Kinvey ${localStorage.authKey}`;
        } else {
            let token = btoa(`${appKeys.APP_KEY}:${appKeys.APP_SECRET}`);
            headers.Authorization = `Basic ${token}`;
        }

        return headers;
    }

    getSpoonacularHeaders(sendData) {
        let headers = {};

        if (sendData) {
            headers['Content-Type'] = 'application/json';
        }

        headers['X-Mashape-Key'] = appKeys.SPOONACULAR_KEY;
        return headers;
    }
}

let headers = new Headers();
export {headers as headers};