SystemJS.config({
  'transpiler': 'plugin-babel',
  'map': {
    'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
    'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',

    // Libraries
    'jquery': './bower_components/jquery/dist/jquery.min.js',
    'crypto': './bower_components/cryptojslib/rollups/sha1.js',
    'handlebars': './bower_components/handlebars/handlebars.min.js',
    'sammy': './bower_components/sammy/lib/min/sammy-latest.min.js',
    'toastr': './bower_components/toastr/toastr.min.js',

    // Helpers
    'app-keys': './js/helpers/constants/app-keys.js',
    'app-urls': './js/helpers/constants/app-urls.js',
    'kinvey-urls': './js/helpers/constants/kinvey-urls.js',
    'messages': './js/helpers/constants/messages.js',
    'spoonacular-urls': './js/helpers/constants/spoonacular-urls.js',
    'headers': './js/helpers/headers.js',
    'notificator': './js/helpers/notificator.js',
    'requester': './js/helpers/requester.js',

    // Models
    'recipe-model': './js/models/recipe-model.js',
    'user-model': './js/models/user-model.js',

    // Views
    'event-attacher': './js/views/event-attacher.js',
    'page-view': './js/views/page-view.js',

    // Controllers
    'page-controller': './js/controllers/page-controller.js',
    'recipe-controller': './js/controllers/recipe-controller.js',
    'user-controller': './js/controllers/user-controller.js',

    // Main
    'app': './js/app.js'
  }
});

System.import('app');