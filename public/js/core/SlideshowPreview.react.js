var React = require('react');
var SlideshowImage = require('SlideshowImage');
var SlideshowImageStore = require('SlideshowImageStore');
var $__0=    React,PropTypes=$__0.PropTypes;

var ____Class0=React.Component;for(var ____Class0____Key in ____Class0){if(____Class0.hasOwnProperty(____Class0____Key)){SlideshowPreview[____Class0____Key]=____Class0[____Class0____Key];}}var ____SuperProtoOf____Class0=____Class0===null?null:____Class0.prototype;SlideshowPreview.prototype=Object.create(____SuperProtoOf____Class0);SlideshowPreview.prototype.constructor=SlideshowPreview;SlideshowPreview.__superConstructor__=____Class0;
  function SlideshowPreview(props) {"use strict";
    ____Class0.call(this,props);

    this.$SlideshowPreview_subscriptions = [];
    this.state = {
      areButtonsVisible: false,
      image: props.store.getImage(),
    };
  }

  Object.defineProperty(SlideshowPreview.prototype,"componentDidMount",{writable:true,configurable:true,value:function() {"use strict";
    this.$SlideshowPreview_subscriptions.push(
      this.props.store.onImageChanged(this.$SlideshowPreview_onImageChanged.bind(this))
    );
  }});

  Object.defineProperty(SlideshowPreview.prototype,"componentWillUnmount",{writable:true,configurable:true,value:function() {"use strict";
    this.$SlideshowPreview_subscriptions.forEach(function(subscription)  {
      subscription.unsubscribe();
    });
  }});

  Object.defineProperty(SlideshowPreview.prototype,"$SlideshowPreview_onImageChanged",{writable:true,configurable:true,value:function(image) {"use strict";
    this.setState({
      image: image,
    });
  }});

  Object.defineProperty(SlideshowPreview.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
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
      React.createElement("div", {
        style: style, 
        onMouseEnter: this.$SlideshowPreview_onMouseEnter.bind(this), 
        onMouseLeave: this.$SlideshowPreview_onMouseLeave.bind(this)}, 
        React.createElement("img", {style: imageStyle, src: image.getUri()}), 
        React.createElement("div", {style: previousButtonStyle, onClick: this.$SlideshowPreview_onPreviousClick.bind(this)}, 
          React.createElement("img", {src: "/img/arrow_left.png"})
        ), 
        React.createElement("div", {style: nextButtonStyle, onClick: this.$SlideshowPreview_onNextClick.bind(this)}, 
          React.createElement("img", {src: "/img/arrow_right.png"})
        )
      )
    );
  }});

  Object.defineProperty(SlideshowPreview.prototype,"$SlideshowPreview_onNextClick",{writable:true,configurable:true,value:function() {"use strict";
    this.props.store.nextImage();
  }});

  Object.defineProperty(SlideshowPreview.prototype,"$SlideshowPreview_onPreviousClick",{writable:true,configurable:true,value:function() {"use strict";
    this.props.store.previousImage();
  }});

  Object.defineProperty(SlideshowPreview.prototype,"$SlideshowPreview_onMouseEnter",{writable:true,configurable:true,value:function(e) {"use strict";
    this.setState({
      areButtonsVisible: true,
    })
  }});

  Object.defineProperty(SlideshowPreview.prototype,"$SlideshowPreview_onMouseLeave",{writable:true,configurable:true,value:function(e) {"use strict";
    this.setState({
      areButtonsVisible: false,
    })
  }});


SlideshowPreview.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  store: PropTypes.instanceOf(SlideshowImageStore).isRequired,
};

module.exports = SlideshowPreview;
