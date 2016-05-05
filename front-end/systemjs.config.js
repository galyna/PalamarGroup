System.config({
    baseURL: './',
    map: {
        'angular': './node_modules/angular/angular.js',
        'angular-route': './node_modules/angular-route/angular-route.js',
        'angular-animate': 'node_modules/angular-animate/angular-animate.js',
        'angular-aria': 'node_modules/angular-aria/angular-aria.js',
        'angular-messages': 'node_modules/angular-messages/angular-messages.js',
        'angular-material': 'node_modules/angular-material/angular-material.js',
        'ng-file-upload': 'node_modules/ng-file-upload/dist/ng-file-upload.js'
    },
    meta: {
        'angular': {
            format: 'global',
            exports: 'angular'
        },
        'angular-route': {
            format: 'global',
            exports: 'angular',
            deps: ['angular']
        }
    },
    packages: {
        app: {
            format: 'register',
            defaultExtension: 'js'
        }
    }
});

System.import('app/main');