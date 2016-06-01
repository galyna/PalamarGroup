System.config({
    baseURL: './',
    transpiler: null,
    packages: {
        app: {
            main: 'main',
            format: 'register',
            defaultExtension: 'js'
        }
    },
    paths: {
        "systemjs": "node_modules/systemjs/dist/system.js",
        'system-polyfills': 'node_modules/systemjs/dist/system-polyfills.js',
        'angular': 'node_modules/angular/angular.js',
        'angular-sanitize': 'node_modules/angular-sanitize/angular-sanitize.js',
        'angular-route': 'node_modules/angular-route/angular-route.js',
        'angular-resource': 'node_modules/angular-resource/angular-resource.js',
        'angular-animate': 'node_modules/angular-animate/angular-animate.js',
        'angular-aria': 'node_modules/angular-aria/angular-aria.js',
        'angular-messages': 'node_modules/angular-messages/angular-messages.js',
        'angular-material': 'node_modules/angular-material/angular-material.js',
        'ng-file-upload': 'node_modules/ng-file-upload/dist/ng-file-upload.js'
    }
});