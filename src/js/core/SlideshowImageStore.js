var Immutable = require('immutable');
var SlideshowImage = require('SlideshowImage');
var Observable = require('Observable');
var { List } = Immutable;

var EVENTS = [
  'ImageChanged'
];

class SlideshowImageStore {
  constructor(images: Iterable<SlideshowImage>) {
    this._index = 0;
    this._images = new List(images);
    this['_observable'] = new Observable();
  }

  getImage(): SlideshowImage {
    return this._images.get(this._index);
  }

  nextImage(): SlideshowImageStore {
    var index = this._index + 1;
    if (index === this._images.size) {
      index = 0;
    }
    this._index = index;
    this.triggerImageChanged(
      this._images.get(index),
      index
    );
    return this;
  }

  previousImage(): SlideshowImageStore {
    var index = this._index - 1;
    if (index < 0) {
      index = this._images.size - 1;
    }
    this._index = index;
    this.triggerImageChanged(
      this._images.get(index),
      index
    );
    return this;
  }
}

Observable.withEventMethods(EVENTS, SlideshowImageStore);

module.exports = SlideshowImageStore;
