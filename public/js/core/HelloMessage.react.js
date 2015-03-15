var React = require('react');

var ____Class0=React.Component;for(var ____Class0____Key in ____Class0){if(____Class0.hasOwnProperty(____Class0____Key)){HelloMessage[____Class0____Key]=____Class0[____Class0____Key];}}var ____SuperProtoOf____Class0=____Class0===null?null:____Class0.prototype;HelloMessage.prototype=Object.create(____SuperProtoOf____Class0);HelloMessage.prototype.constructor=HelloMessage;HelloMessage.__superConstructor__=____Class0;function HelloMessage(){"use strict";if(____Class0!==null){____Class0.apply(this,arguments);}}
  Object.defineProperty(HelloMessage.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
    return React.createElement("div", null, "Hello ", this.props.name);
  }});


module.exports = HelloMessage;
