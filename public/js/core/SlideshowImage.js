
  function SlideshowImage(uri        ) {"use strict";
    this.$SlideshowImage_uri = uri;
  }

  Object.defineProperty(SlideshowImage.prototype,"getUri",{writable:true,configurable:true,value:function()         {"use strict";
    return this.$SlideshowImage_uri;
  }});

  Object.defineProperty(SlideshowImage,"forProject",{writable:true,configurable:true,value:function(
project        ,
    start        ,
    end        ,
    isSmall         
  )                        {"use strict";
    var images = [];
    var suffix = '_' + (isSmall ? 'small' : 'big') + '.jpg';

    for (var i = start; i <= end; i++) {
      var paddedIndex = ('00' + i).substr(-2, 2);
      images.push(new SlideshowImage(
        '/img/project/' + project + '/' + paddedIndex + suffix
      ));
    }

    return images;
  }});


module.exports = SlideshowImage;
