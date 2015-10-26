/**
 * Created by jfengjiang on 2015/1/14.
 */


var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var tap = require('gulp-tap');
var browserSync = require('browser-sync');
var config = require('./package.json');
var version = config.version;

gulp.task('build', ['lint'], function () {
    gulp.src('src/example/**/*')
        .pipe(gulp.dest('dist/example'));

    gulp.src('src/swiper.less')
        .pipe(less().on('error', function (e){
            console.error(e.message);
            this.emit('end');
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist'));

    gulp.src('src/swiper.js')
        .pipe(tap(function(file, t){
            var contents = file.contents.toString();
            contents = contents.replace('${version}', version);
            file.contents = new Buffer(contents);
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('lint', function () {
    gulp.src('src/swiper.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        ui: {
            port: 8081,
            weinre: {
                port: 9090
            }
        },
        port: 8080,
        startPath: '/example'
    });
});

gulp.task('watch', ['build', 'server'], function (){
    gulp.watch('src/**/*', ['build']);
});

gulp.task('default', ['watch']);