System.config({
    baseURL: '/',
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
        'ng-file-upload': 'node_modules/ng-file-upload/dist/ng-file-upload.js',
        'ng-img-crop-full-extended': 'node_modules/ng-img-crop-full-extended/compile/minified/ng-img-crop.js',
       // 'angular-socialshare': 'node_modules/angular-socialshare/dist/angular-socialshare.js',
        'angular-youtube-embed': 'node_modules/angular-youtube-embed/src/angular-youtube-embed.js'
    },
    map: {
        'youtube-iframe-api': 'https://www.youtube.com/iframe_api'
    },
    meta: {
        'ng-img-crop-full-extended': {
            deps: ['angular'],
            format: "global"
        },
        "youtube-iframe-api": {
            "scriptLoad": true,
            "format": "global",
            "exports": "YT"
        }
    }
});