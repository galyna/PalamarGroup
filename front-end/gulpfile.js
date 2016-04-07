/**
 * Created by Galyna on 19.03.2016.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var browserSync = require('browser-sync').create();
//
//gulp.task('useref', function(){
//    return gulp.src('index.html')
//        .pipe(useref())
//        // Minifies only if it's a JavaScript file
//        .pipe(gulpIf('*.js', uglify()))
//        .pipe(gulp.dest('dist'))
//});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },

    })
})

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
        .pipe(gulp.dest('./'))
        .pipe(browserSync.reload({
            stream: true
        }))
})


//gulp.task('watch', ['browserSync','html','js'], function () {
//    gulp.watch('app/**/*.html', ['html'])   ;
//    gulp.watch('app/**/*.js', ['js'])
//    gulp.watch('app/*.html', browserSync.reload);
//
//    gulp.watch('app/content/**/*.css', browserSync.reload);
//});

gulp.task('watch', ['html','js'], function () {
    gulp.watch('app/**/*.html', ['html'])   ;
    gulp.watch('app/**/*.js', ['js'])


});
gulp.task('default', ['html','js']);

