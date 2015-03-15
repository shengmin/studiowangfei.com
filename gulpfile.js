'use strict';

var gulp = require('gulp');
var react = require('gulp-react');
var changed = require('gulp-changed');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
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
    react: './src/js/**/*.react.js',
    root: './src/js/**/*.js'
  },
  sass: './src/sass/**/*.scss'
};

var destinationPaths = {
  js: {
    root: './public/js/',
  },
  css: './public/css/'
}

gulp.task('build-react', function() {
  // Compile React
  return gulp.src(sourceGlobs.js.react)
    .pipe(changed(destinationPaths.js.root))
    .pipe(react({ harmony: true }))
    .pipe(gulp.dest(destinationPaths.js.root));
});

gulp.task('build-js-core', ['build-react'], function() {
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

gulp.task('build-sass', function() {
  return gulp.src(sourceGlobs.sass)
    .pipe(changed(destinationPaths.css))
    .pipe(sass())
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe(gulp.dest(destinationPaths.css));
});

gulp.task('watch', ['build-sass', 'build-js-core'], function() {
  gulp.watch([sourceGlobs.js.root, './js-modules.js'], ['build-js-core']);
  gulp.watch([sourceGlobs.sass], ['build-sass']);
})

gulp.task('default', ['build-sass', 'build-js-core', 'watch']);
