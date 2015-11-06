/**
 * Created by jfengjiang on 2015/1/14.
 */


var gulp = require('gulp');
var gutil = require('gulp-util');
var header = require('gulp-header');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var tap = require('gulp-tap');
var browserSync = require('browser-sync');
var pkg = require('./package.json');

gulp.task('build', function () {
    gulp.src('src/example/**/*')
        .pipe(gulp.dest('dist/example'));

    var banner = ['/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @version v<%= pkg.version %>',
        ' * @link <%= pkg.repository.url %>',
        ' * @license <%= pkg.license %>',
        ' */',
        ''].join('\n');

    gulp.src('src/swiper.less')
        .pipe(less().on('error', function (e){
            console.error(e.message);
            this.emit('end');
        }))
        .pipe(autoprefixer())
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest('dist'))
        .pipe(minify())
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(rename(function (file){
            file.basename += '.min';
        }))
        .pipe(gulp.dest('dist'));

    gulp.src('src/swiper.js')
        .pipe(tap(function(file, t){
            var contents = file.contents.toString();
            contents = contents.replace('${version}', pkg.version);
            file.contents = new Buffer(contents);
        }))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(rename(function (file){
            file.basename += '.min';
        }))
        .pipe(gulp.dest('dist'));
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