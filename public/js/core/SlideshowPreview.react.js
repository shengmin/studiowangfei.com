var React = require('react');
var $__0=    React,PropTypes=$__0.PropTypes;

var ____Class4=React.Component;for(var ____Class4____Key in ____Class4){if(____Class4.hasOwnProperty(____Class4____Key)){SlideshowPreview[____Class4____Key]=____Class4[____Class4____Key];}}var ____SuperProtoOf____Class4=____Class4===null?null:____Class4.prototype;SlideshowPreview.prototype=Object.create(____SuperProtoOf____Class4);SlideshowPreview.prototype.constructor=SlideshowPreview;SlideshowPreview.__superConstructor__=____Class4;
  function SlideshowPreview(props) {"use strict";
    ____Class4.call(this,props);
  }

  Object.defineProperty(SlideshowPreview.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
    return React.createElement("div", null, "Hello");
  }});


SlideshowPreview.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

module.exports = SlideshowPreview;
