'use strict';

var gulp = require('gulp');
var react = require('gulp-react');
var changed = require('gulp-changed');
var rename = require('gulp-rename');
var browserify = require('browserify');
var glob = require('glob');
var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');

var jsModules = require('./js-modules.js');

var sourcePaths = {
  js: {
    root: './src/js/'
  }
}

var sourceGlobs = {
  js: {
    react: './src/js/**/*.react.js'
  }
};

var destinationPaths = {
  js: {
    root: './public/js/',
  }
}

gulp.task('build-react', function() {
  // Compile React
  return gulp.src(sourceGlobs.js.react)
    .pipe(changed(destinationPaths.js.root))
    .pipe(react({ harmony: true }))
    .pipe(gulp.dest(destinationPaths.js.root));
});

gulp.task('build-js-core', ['build-react'], function(callback) {
  // Build core bundle
  var coreModules = jsModules.core.map(function(module) {
    return {
      file: destinationPaths.js.root + module.path,
      expose: module.name
    };
  });

  coreModules.push('react');

  return browserify()
    .require(coreModules)
    .bundle()
    .pipe(source('core.js'))
    .pipe(gulp.dest(destinationPaths.js.root));
});

gulp.task('watch', function() {
  gulp.watch(sourceGlobs.js.root, ['build-js-core']);
})

gulp.task('default', ['watch']);
