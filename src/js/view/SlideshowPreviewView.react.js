(function() {
  var React = require('react');
  var SlideshowPreview = require('SlideshowPreview.react');
  var SlideshowImage = require('SlideshowImage');
  var SlideshowImageStore = require('SlideshowImageStore');

  var images = SlideshowImage.forProject(
    'anotherleap',
    1,
    3,
    true
  );
  var store = new SlideshowImageStore(images);

  React.render(
    <SlideshowPreview
      width={640}
      height={480}
      images={images}
      store={store}
    />,
    document.getElementById('main-container')
  );
})();
