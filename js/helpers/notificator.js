var app = app || {};

(function () {
    'use strict';

    class Notificator {
        showNotification(text, type) {
            toastr.options.closeMethod = 'fadeOut';
            toastr.options.timeOut = 1000;

            if (type === 'success') {
                toastr.success(text);
            } else if (type === 'error') {
                toastr.error(text);
            }
        }
    }

    app.notificator = new Notificator();
}());