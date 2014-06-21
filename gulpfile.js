'use strict';

var path    = require('path');
var express = require('express');
var gulp    = require('gulp');
var concat  = require('gulp-concat');
var minify  = require('gulp-minify-css');
var build   = require('./build');

gulp.task('css', function() {
  return gulp.src([
      'bower_components/normalize-css/normalize.css',
      'static/index.css'
    ])
    .pipe(concat('bundle.css'))
    .pipe(minify())
    .pipe(gulp.dest('build'));
});

gulp.task('build:metalsmith', function(done) {
  build(function(err){
    if (err) return err;
    console.log('Metalsmith building... Done.');
    done();
  });
});

gulp.task('build', ['build:metalsmith', 'css'], function() {
  return gulp.src(['build/**/*'])
    .pipe(gulp.dest('public'));
});

gulp.task('serve', ['watch', 'build'], function() {
  var port = process.env.NODE_PORT || 3000;
  var app = express();
  app.use(express.static(path.join(__dirname, 'build')));
  app.listen(port);
  console.log('Server running on localhost:%d...', port);
});

gulp.task('watch', function() {
  gulp.watch(['static/**/*', 'src/**/*'], ['build']);
});

gulp.task('default', ['serve']);
