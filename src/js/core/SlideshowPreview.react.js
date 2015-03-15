var React = require('react');
var { PropTypes } = React;

class SlideshowPreview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>Hello</div>;
  }
}

SlideshowPreview.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

module.exports = SlideshowPreview;
