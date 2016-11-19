'use strict';

/**
 * Created by Galyna on 19.03.2016.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var templateCache = require('gulp-angular-templatecache');
var sass = require('gulp-sass');
var htmlreplace = require('gulp-html-replace');
var Builder = require('systemjs-builder');
var gulpSequence = require('gulp-sequence');
var del = require('del');

gulp.task('html', function () {
    var templateHeader =
        'System.register(["angular"], function(exports_1, context_1) {'
        + '"use strict";'
        + 'var __moduleName = context_1 && context_1.id;'
        + 'var angular_1;'
        + 'return {'
        + '    setters:['
        + '        function (angular_1_1) {'
        + '            angular_1 = angular_1_1;'
        + '        }],'
        + '    execute: function() {'
        + '        angular.module("templates", [])'
        + '           .run(["$templateCache", function ($templateCache) {';
    var templateFooter =
        '           }]);'
        + '      }'
        + '  }'
        + '});';

    return gulp.src(['!app/index.html', '!app/layout/views/layout.html', '!app/users/views/profile.html', 'app/**/*.html'])
        .pipe(templateCache({
            standalone: true,
            root: 'app/',
            templateHeader: templateHeader,
            templateFooter: templateFooter
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('./app'));
});

gulp.task('sass', function () {
    return gulp.src('./content/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./content/css'));
});


gulp.task('html:watch', ['html'], function () {
    gulp.watch('app/**/*.html', ['html']);
});

gulp.task('sass:watch', ['sass'], function () {
    gulp.watch('./content/sass/**/*.scss', ['sass']);
});

gulp.task('watch', ['default', 'html:watch', 'sass:watch']);

gulp.task('default', ['html', 'sass']);

gulp.task('test', function () {
    systemBuild();

});

gulp.task('prod:js', ['prod:move_js', 'prod:build_js']);

gulp.task('prod:move_js', function() {
    gulp.src(['node_modules/systemjs/dist/system.js', 'system.config.js'])
    .pipe(gulp.dest('dist/'));
})


gulp.task('prod:build_js', function () {
    let systemConfig = './system.config.js',
        rootFolder = './',
        app = {
            entryPoint: 'app/main.js',
            destination: './dist/app.min.js'
        },
        admin = {
            entryPoint: 'app/main.admin.js',
            destination: './dist/admin.min.js'
        },
        builder = new Builder(rootFolder, systemConfig);
    return Promise.all([
        builder.bundle(app.entryPoint, app.destination, {minify: true}),
        builder.bundle(admin.entryPoint, admin.destination, {minify: true})
    ])
        .then(function () {
            console.log('Systemjs build complete');
        })
        .catch(function (err) {
            console.log('Build error');
            console.log(err);
        });
});

gulp.task('prod:html', function () {
    gulp.src(['index.html'])
        .pipe(htmlreplace({
            'prod': ['system.js', 'system.config.js', 'app.min.js', 'content/css/app.css']
        }))
        .pipe(gulp.dest('dist/'));
    gulp.src(['admin.html'])
        .pipe(htmlreplace({
            'prod': ['system.js', 'system.config.js', 'admin.min.js', 'content/css/app.css']
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('prod:content', function () {
    gulp.src(['content/**/*', '!content/sass/**/*', '!content/sass/'])
        .pipe(gulp.dest('dist/content/'));
    gulp.src(['palamar_logo.ico']).pipe(gulp.dest('dist'));
    gulp.src(['robots.txt']).pipe(gulp.dest('dist'));

});

gulp.task('prod:clean', function () {
    return del('dist/**/*');
});

gulp.task('prod', gulpSequence(['sass', 'html', 'prod:clean'], ['prod:js', 'prod:html', 'prod:content']));

