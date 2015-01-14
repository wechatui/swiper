/**
 * Created by jfengjiang on 2015/1/14.
 */


var gulp = require('gulp');
var uglify = require('gulp-uglify');



gulp.task('build', function () {
    gulp.src('src/example/**/*')
        .pipe(gulp.dest('dist/example'));

    gulp.src('src/swiper.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);