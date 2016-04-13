/**
 * Created by Galyna on 19.03.2016.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');

gulp.task('html', function () {
    return gulp.src(['!app/index.html','!app/layout/views/layout.html','!app/users/views/profile.html','app/**/*.html'])
        .pipe(templateCache())
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('./app'));
});

gulp.task('js', function () {
    gulp.src(['!app/**/app.js','app/**/*.module.js','app/templates.js', 'app/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./'));
});

gulp.task('watch', ['default'], function () {
    gulp.watch('app/**/*.html', ['html']);
    gulp.watch('app/**/*.js', ['js']);
});

gulp.task('default', ['html','js']);

