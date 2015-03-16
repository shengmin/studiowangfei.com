class SlideshowImage {
  constructor(uri: string) {
    this._uri = uri;
  }

  getUri(): string {
    return this._uri;
  }

  static forProject(
    project: string,
    start: number,
    end: number,
    isSmall: boolean
  ): Array<SlideshowImage> {
    var images = [];
    var suffix = '_' + (isSmall ? 'small' : 'big') + '.jpg';

    for (var i = start; i <= end; i++) {
      var paddedIndex = ('00' + i).substr(-2, 2);
      images.push(new SlideshowImage(
        '/img/project/' + project + '/' + paddedIndex + suffix
      ));
    }

    return images;
  }
}

module.exports = SlideshowImage;
