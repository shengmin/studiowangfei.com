'use strict';

var coreModules = [
  { path: 'core/SlideshowPreview.react.js', name: 'SlideshowPreview.react' },
  { path: 'core/SlideshowImage.js', name: 'SlideshowImage' },
  { path: 'core/SlideshowImageStore.js', name: 'SlideshowImageStore' },
  { path: 'core/Observable.js', name: 'Observable' },
  { path: 'core/toObjectWithMirroredKeyValue', name: 'toObjectWithMirroredKeyValue' }
];

var externalModules = [
  'react',
  'immutable'
];

module.exports = {
  core: coreModules,
  external: externalModules
}
