'strict';

var gulp = require('gulp');
var react = require('gulp-react');
var changed = require('gulp-changed');
var rename = require('gulp-rename');
var browserify = require('browserify');
var glob = require('glob');
var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');

var sourcePaths = {
  js: {
    react: './src/js/**/*.react.js',
    root: './src/js/**/*.js'
  }
}

var destinationPaths = {
  js: {
    root: './public/js/',
    core: './public/js/core/**/*.js',
    view: './public/js/view/**/*.js'
  }
}

gulp.task('build-react', function() {
  // Compile React
  return gulp.src(sourcePaths.js.react)
    .pipe(changed(destinationPaths.js.root))
    .pipe(react({ harmony: true }))
    .pipe(gulp.dest(destinationPaths.js.root));
});

gulp.task('build-js-core', ['build-react'], function(callback) {
  // Build core bundle
  glob(destinationPaths.js.core, function(error, files) {
    // console.log(files);
    files.push('react');
    browserify()
      .require(files)
      .bundle()
      .pipe(source('core.js'))
      .pipe(gulp.dest(destinationPaths.js.root));

    callback(error);
  });
});

gulp.task('build-js-view', ['build-js-core'], function(callback) {
  // Build view bundles
  glob(destinationPaths.js.core, function(error, coreFiles) {
    if (error) {
      callback(error);
    } else {
      coreFiles.push('react');
      var gulpBrowserify = transform(function(file) {
        console.log(file);
        return browserify(file)
          .external(coreFiles)
          .bundle();
      });

      gulp.src(destinationPaths.js.view, { base: 'view' })
        .pipe(gulpBrowserify)
        .pipe(gulp.dest(destinationPaths.js.root));

      callback(error);
    }
  });
});

gulp.task('watch', function() {
  gulp.watch(sourcePaths.js.root, ['build-js-core']);
})

gulp.task('default', ['watch']);
