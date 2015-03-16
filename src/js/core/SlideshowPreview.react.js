var React = require('react');
var SlideshowImage = require('SlideshowImage');
var SlideshowImageStore = require('SlideshowImageStore');
var { PropTypes } = React;

class SlideshowPreview extends React.Component {
  constructor(props) {
    super(props);

    this._subscriptions = [];
    this.state = {
      areButtonsVisible: false,
      image: props.store.getImage(),
    };
  }

  componentDidMount() {
    this._subscriptions.push(
      this.props.store.onImageChanged(this._onImageChanged.bind(this))
    );
  }

  componentWillUnmount() {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  _onImageChanged(image) {
    this.setState({
      image: image,
    });
  }

  render() {
    var style = {
      width: this.props.width,
      height: this.props.height,
      position: 'relative',
    };

    var previousButtonStyle = {
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      opacity: this.state.areButtonsVisible ? 1 : 0,
      cursor: 'pointer',
      transition: 'opacity 1s',
    };

    var nextButtonStyle = {
      position: 'absolute',
      right: 0,
      top: 0,
      height: '100%',
      opacity: this.state.areButtonsVisible ? 1 : 0,
      cursor: 'pointer',
      transition: 'opacity 1s',
    };

    var imageStyle = {
      display: 'block',
      height: '100%',
      width: '100%',
    }

    var image = this.state.image;

    return (
      <div
        style={style}
        onMouseEnter={this._onMouseEnter.bind(this)}
        onMouseLeave={this._onMouseLeave.bind(this)}>
        <img style={imageStyle} src={image.getUri()} />
        <div style={previousButtonStyle} onClick={this._onPreviousClick.bind(this)}>
          <img src="/img/arrow_left.png" />
        </div>
        <div style={nextButtonStyle} onClick={this._onNextClick.bind(this)}>
          <img src="/img/arrow_right.png" />
        </div>
      </div>
    );
  }

  _onNextClick() {
    this.props.store.nextImage();
  }

  _onPreviousClick() {
    this.props.store.previousImage();
  }

  _onMouseEnter(e) {
    this.setState({
      areButtonsVisible: true,
    })
  }

  _onMouseLeave(e) {
    this.setState({
      areButtonsVisible: false,
    })
  }
}

SlideshowPreview.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  store: PropTypes.instanceOf(SlideshowImageStore).isRequired,
};

module.exports = SlideshowPreview;
