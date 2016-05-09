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

gulp.task('templatesCache', function () {
    var templateHeader =
        'System.register(["angular"], function(exports_1, context_1) {'
        +'"use strict";'
        +'var __moduleName = context_1 && context_1.id;'
        +'var angular_1;'
        +'return {'
        +'    setters:['
        +'        function (angular_1_1) {'
        +'            angular_1 = angular_1_1;'
        +'        }],'
        +'    execute: function() {'
        +'        exports_1("default",angular_1.default.module("templates", [])'
        +'           .run(["$templateCache", function ($templateCache) {';
    var templateFooter =
        '           }]));'
        +'      }'
        +'  }'
        +'});';

    return gulp.src(['!app/index.html', '!app/layout/views/layout.html', '!app/users/views/profile.html', 'app/**/*.html'])
        .pipe(templateCache({
            standalone: true,
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

gulp.task('html', function () {
    return gulp.src(['!app/index.html','app/**/*.html'])
        .pipe(templateCache())
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('./app'));
});

gulp.task('html:watch', function () {
    gulp.watch('app/**/*.html', ['html']);
});

gulp.task('sass:watch', function () {
    gulp.watch('./content/sass/**/*.scss', ['sass']);
});

gulp.task('watch', ['default', 'html:watch', 'sass:watch']);

gulp.task('default', ['html', 'sass']);

gulp.task('test', function () {
    systemBuild();
    
});

gulp.task('prod:js', function () {
    var systemConfig = './system.config.js';
    var rootFolder = './';
    var entryPoint = 'app/main.js';
    var destination = './dist/app.min.js';
    var builder = new Builder(rootFolder, systemConfig);
    
    return builder
        .buildStatic(entryPoint, destination)
        .then(function () {
            console.log('Systemjs build complete');
        })
        .catch(function (err) {
            console.log('Build error');
            console.log(err);
        });
});

gulp.task('prod:html', function () {
    gulp.src('index.html')
        .pipe(htmlreplace({
            'prod': ['app.min.js', 'content/css/app.css']
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('prod:content', function () {
    gulp.src(['content/**/*', '!content/sass/**/*', '!content/sass/'])
        .pipe(gulp.dest('dist/content/'));
});

gulp.task('prod:clean', function () {
    return del('dist/**/*');
});

gulp.task('prod', gulpSequence(['sass', 'templatesCache', 'prod:clean'], ['prod:js', 'prod:html', 'prod:content']));

