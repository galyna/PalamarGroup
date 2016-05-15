System.config({
    baseURL: './',

    packages: {
        app: {
            main: 'main',
            format: 'register',
            defaultExtension: 'js'
        }
    },
    map: {
        'angular': './node_modules/angular/angular.js',
        'angular-sanitize': './node_modules/angular-sanitize/angular-sanitize.js',
        'angular-route': './node_modules/angular-route/angular-route.js',
        'angular-animate': './node_modules/angular-animate/angular-animate.js',
        'angular-aria': './node_modules/angular-aria/angular-aria.js',
        'angular-messages': './node_modules/angular-messages/angular-messages.js',
        'angular-material': './node_modules/angular-material/angular-material.js',
        'ng-file-upload': './node_modules/ng-file-upload/dist/ng-file-upload.js'
    },
    meta: {
        'angular': {
            format: 'global',
            exports: 'angular'
        },
        'angular-sanitize': {
            deps: ['angular']
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-material': {
            deps: ['angular', 'angular-animate', 'angular-aria']
        },
        'angular-aria': {
            deps: ['angular']
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-messages': {
            deps: ['angular']
        },
        'ng-file-upload': {
            deps: ['angular']
        }
    }
});

System.import('app');