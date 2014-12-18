var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var livereload = require('gulp-livereload');

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['built/**', 'index.html']).on('change', livereload.changed);
});

gulp.task('sass', function () {
    return gulp.src('src/css/default.scss')
        .pipe(sass({sourcemapPath: '../src/css'}))
        .on('error', function (err) { console.log(err.message); })
        .pipe(gulp.dest('built/assets'));
});

gulp.task('browserify', function () {
   return browserify('./src/js/index.js')
       .bundle()
       .pipe(source('index.js'))
       .pipe(gulp.dest('./built/assets'));
});

gulp.task('default', function () {
    gulp.start('watch');
    gulp.start('sass');
    gulp.start('browserify');

    gulp.watch(['./src/css/**/*.scss'], ['sass']);
    gulp.watch(['./src/js/**/*'], ['browserify']);
});