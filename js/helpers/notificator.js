'use strict';

import toastr from 'toastr';

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

let notificator = new Notificator();
export {notificator as notificator};