var React = require('react');
var HelloMessage = require('./public/js/core/HelloMessage.react.js');

React.render(
  React.createElement(HelloMessage, {name: "ShengMin"}),
  document.body
);
