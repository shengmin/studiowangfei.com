var Immutable = require('immutable');
var SlideshowImage = require('SlideshowImage');
var Observable = require('Observable');
var $__0=    Immutable,List=$__0.List;

var EVENTS = [
  'ImageChanged'
];


  function SlideshowImageStore(images                          ) {"use strict";
    this.$SlideshowImageStore_index = 0;
    this.$SlideshowImageStore_images = new List(images);
    this['_observable'] = new Observable();
  }

  Object.defineProperty(SlideshowImageStore.prototype,"getImage",{writable:true,configurable:true,value:function()                 {"use strict";
    return this.$SlideshowImageStore_images.get(this.$SlideshowImageStore_index);
  }});

  Object.defineProperty(SlideshowImageStore.prototype,"nextImage",{writable:true,configurable:true,value:function()                      {"use strict";
    var index = this.$SlideshowImageStore_index + 1;
    if (index === this.$SlideshowImageStore_images.size) {
      index = 0;
    }
    this.$SlideshowImageStore_index = index;
    this.triggerImageChanged(
      this.$SlideshowImageStore_images.get(index),
      index
    );
    return this;
  }});

  Object.defineProperty(SlideshowImageStore.prototype,"previousImage",{writable:true,configurable:true,value:function()                      {"use strict";
    var index = this.$SlideshowImageStore_index - 1;
    if (index < 0) {
      index = this.$SlideshowImageStore_images.size - 1;
    }
    this.$SlideshowImageStore_index = index;
    this.triggerImageChanged(
      this.$SlideshowImageStore_images.get(index),
      index
    );
    return this;
  }});


Observable.withEventMethods(EVENTS, SlideshowImageStore);

module.exports = SlideshowImageStore;
