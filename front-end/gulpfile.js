'use strict';

/**
 * Created by Galyna on 19.03.2016.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var sass = require('gulp-sass');

gulp.task('html', function () {
    return gulp.src(['!app/index.html','!app/layout/views/layout.html','!app/users/views/profile.html','app/**/*.html'])
        .pipe(templateCache({standalone: true}))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('./app'));
});

gulp.task('js', function () {
    gulp.src(['!app/**/app.js','app/**/*.module.js','app/templates.js', 'app/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        // .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
    return gulp.src('./content/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./content/css'));
});

gulp.task('html:watch', function () {
    gulp.watch('app/**/*.html', ['html']);
});

gulp.task('js:watch', function () {
    gulp.watch('app/**/*.js', ['js']);
});

gulp.task('sass:watch', function () {
    gulp.watch('./content/sass/**/*.scss', ['sass']);
});

gulp.task('watch', ['default', 'html:watch', 'js:watch', 'sass:watch']);

gulp.task('default', ['html','js', 'sass']);

