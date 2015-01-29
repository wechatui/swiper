/**
 * Created by jfengjiang on 2015/1/14.
 */


var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

gulp.task('build', function () {
    gulp.src('src/example/**/*')
        .pipe(gulp.dest('dist/example'));

    gulp.src('src/swiper.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('lint', function () {
    gulp.src('src/swiper.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('default', ['lint', 'build']);