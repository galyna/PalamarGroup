module.exports = function (config) {
    config.set({

        basePath: './',

        frameworks: ['systemjs', 'jasmine'],

        systemjs: {
            configFile: 'system.config.js',
            config: {
                paths: {
                    'angular-mocks': 'node_modules/angular-mocks/angular-mocks.js',
                    'phantomjs-polyfill': 'node_modules/phantomjs-polyfill/bind-polyfill.js',
                    'testData': 'tests/testData.js'

                }
            },
            serveFiles: [
                'app/**/*.js',
                'node_modules/angular/angular.js',
                'node_modules/angular-sanitize/angular-sanitize.js',
                'node_modules/angular-route/angular-route.js',
                'node_modules/angular-resource/angular-resource.js',
                'node_modules/angular-animate/angular-animate.js',
                'node_modules/angular-aria/angular-aria.js',
                'node_modules/angular-messages/angular-messages.js',
                'node_modules/angular-material/angular-material.js',
                'node_modules/ng-file-upload/dist/ng-file-upload.js',
                'node_modules/ng-img-crop-full-extended/compile/minified/ng-img-crop.js',
                'node_modules/angular-mocks/angular-mocks.js',
                'tests/testData.js'
            ]
        },

        // list of files / patterns to load in the browser
        files: [
            'tests/*.spec.js',
            'tests/**/*.spec.js'
        ],


        // list of files to exclude
        exclude: [
            'dist'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DEBUG,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        plugins: [
            'karma-phantomjs-launcher',
            'karma-systemjs',
            'karma-jasmine'
        ]
    });
};
