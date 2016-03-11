const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const rollup = require('rollup');
const less = require('gulp-less');
const nano = require('gulp-cssnano');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const uglify = require('uglify-js');
const babel = require('rollup-plugin-babel');
const browserSync = require('browser-sync');
const pkg = require('./package.json');

const banner = `/*!
 * ${pkg.name} ${pkg.version} (${pkg.repository.url})
 * Copyright ${new Date().getFullYear()} ${pkg.author}.
 * Licensed under the ${pkg.license} license
 */
`;

gulp.task('build:swiper:js', function () {
    return rollup.rollup({
        entry: 'src/index.js',
        plugins: [babel()]
    }).then(function (bundle) {
        var result = bundle.generate({
            format: 'umd',
            moduleName: 'Swiper'
        });
        fs.writeFileSync('dist/swiper.js', banner + result.code.replace(/@VERSION/g, pkg.version));
        fs.writeFileSync('dist/swiper.min.js', banner + uglify.minify('dist/swiper.js').code);
    });
});

gulp.task('build:swiper:style', function (done) {
    gulp.src('src/index.less')
        .pipe(less())
        .pipe(postcss([autoprefixer]))
        .pipe(rename(function (path) {
            path.basename = 'swiper';
        }))
        .pipe(gulp.dest('dist'))
        .pipe(nano())
        .pipe(rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(gulp.dest('dist'))
        .on('end', done);
});

gulp.task('build:example:html', function (done) {
    gulp.src('src/example/index.html')
        .pipe(gulp.dest('dist/example'))
        .on('end', done);
});

gulp.task('build:example:style', function (done) {
    gulp.src('src/example/**/*.less')
        .pipe(less())
        .pipe(postcss([autoprefixer]))
        .pipe(gulp.dest('dist/example'))
        .on('end', done);
});

gulp.task('build', ['build:swiper:js', 'build:swiper:style', 'build:example:html', 'build:example:style']);

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

gulp.task('watch', ['build', 'server'], function () {
    gulp.watch('src/**', ['build']);
});