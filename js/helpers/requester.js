var app = app || {};

(function () {
    'use strict';

    function makeRequest(method, url, headers, data) {
        let promise = new Promise((resolve, reject) => {
            $.ajax({
                url,
                headers,
                data: data ? JSON.stringify(data) : null,
                method,
                success(response) {
                    resolve(response);
                },
                error(error) {
                    reject(error);
                }
            });
        });

        return promise;
    }

    class Requester {
        get(url, headers) {
            return makeRequest('GET', url, headers);
        }

        post(url, headers, data) {
            return makeRequest('POST', url, headers, data);
        }

        put(url, headers, data) {
            return makeRequest('PUT', url, headers, data);
        }

        delete(url, headers) {
            return makeRequest('DELETE', url, headers);
        }
    }

    app.requester = new Requester();
}());