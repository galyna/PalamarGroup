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
        "systemjs": "system.js",
        'system-polyfills': 'system-polyfills.js',
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
        'angular-socialshare': 'node_modules/angular-socialshare/dist/angular-socialshare.js',
        'angular-youtube-embed': 'node_modules/angular-youtube-embed/src/angular-youtube-embed.js',
        'ngSmoothScroll': 'node_modules/ngSmoothScroll/lib/angular-smooth-scroll.js',
        'jwt-decode': 'node_modules/jwt-decode/build/jwt-decode.min.js',
        'daypilot-common': 'lib/dayPilot/daypilot-common.src.js',
        'daypilot-calendar': 'lib/dayPilot/daypilot-calendar.src.js',
        'daypilot-navigator': 'lib/dayPilot/daypilot-navigator.src.js',
        'lodash': 'node_modules/lodash/lodash.js',
        'angular-simple-logger': 'node_modules/angular-simple-logger/dist/angular-simple-logger.min.js',
        'uiGmapgoogle-maps': 'node_modules/angular-google-maps/dist/angular-google-maps.js',
        'googleapis': '//maps.googleapis.com/maps/api/js?sensor=false'
    },

    map: {
        'youtube-iframe-api': 'https://www.youtube.com/iframe_api'
    },
    meta: {
        'uiGmapgoogle-maps': {
            deps: ['angular',
                "angular-simple-logger",
                "lodash"
            ],
            format: "global"
        },
        'ng-img-crop-full-extended': {
            deps: ['angular'],
            format: "global"
        },
        "youtube-iframe-api": {
            "scriptLoad": true,
            "format": "global",
            "exports": "YT"
        },
        "googleapis": {
            "scriptLoad": true,
            "format": "global"
        }
    }
});