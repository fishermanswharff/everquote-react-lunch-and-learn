'use strict';

let path = require('path'),
    gulp = require('gulp'),
    minifyHtml = require('gulp-minify-html'),
    browserSync = require('browser-sync').create('chuck norris'),
    sass = require('gulp-ruby-sass'),
    del = require('del'),
    webpack = require('gulp-webpack'),
    babel = require('gulp-babel'),
    historyApiFallback = require('connect-history-api-fallback'),
    reload = browserSync.reload,
    Server = require('karma').Server,
    $ = require('gulp-load-plugins')();

// set variable via $ gulp --type production
let environment = $.util.env.type || 'development';
let isProduction = environment === 'production';
let webpackConfig = require('./webpack.config.js').getConfig(environment);
let port = $.util.env.port || 8080;

var paths = {
  html: 'app/**/*.html',
  styles: 'app/styles/**/*.scss',
  mainScript: 'app/js/app.jsx',
  scripts: ['app/js/**/*.jsx', 'app/js/**/*.js'],
  vendors: ['app/vendor/**/*.js'],
  tests: ['spec/**/*.spec.js'],
  images: ['app/images/**/*.{ttf,woff,eof,svg,png,jpg}'],
  tmp: ['.module-cache','.sass-cache','.tmp','dist/js'],
  destroot: 'dist',
  destimages: 'dist/images',
  destjs: 'dist/js',
  destcss: 'dist/css',
  destdata: 'dist/data',
  destvendor: 'dist/vendor'
};

gulp.task('scripts', function(){
  return gulp.src(webpackConfig.entry)
    .on('error', function(error) {
      console.log('ERROR: ' + error.toString());
      this.emit("end");
    })
    .pipe($.webpack(webpackConfig))
    .pipe(isProduction ? $.uglify() : $.util.noop())
    .pipe(gulp.dest(paths.destjs))
    .pipe(reload({ stream:true }));
});

// watch files for changes and reload
gulp.task('serve',['clean','minify-html','sass','scripts','copyImages','compileVendors','watch'], function() {
  browserSync.init({
    server: {
      baseDir: paths.destroot,
      index: 'index.html',
      middleware: [ historyApiFallback() ],
    },
    port: port,
    ui: {
      port: 8081
    },
  });
  gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js', 'js/**/*.jsx', 'images/**/*.{ttf,woff,eof,svg,png,jpg}'], {cwd: 'app/build'}, reload);
});

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(paths.tmp).then(function (deleted) {
    console.log('Deleted files/folders:\n', deleted.join('\n'));
  });
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('copyImages', function() {
  gulp.src(paths.images)
  .pipe(gulp.dest(paths.destimages));
});

gulp.task('minify-html', function () {
  return gulp.src(paths.html)
    .pipe(minifyHtml())
    .pipe(gulp.dest(paths.destroot));
});

gulp.task('sass', function() {
  return sass(paths.styles)
    .pipe(gulp.dest(paths.destcss))
    .pipe(reload({ stream:true }));
});

gulp.task('compileVendors', function(){
  return gulp.src(paths.vendors)
    .pipe(gulp.dest(paths.destvendor));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.vendors, ['compileVendors']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['sass']);
  gulp.watch(paths.html, ['minify-html']);
  gulp.watch(paths.images, ['copyImages']);
  gulp.watch(paths.tests, ['test']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'sass', 'copyImages', 'minify-html','compileVendors']);
