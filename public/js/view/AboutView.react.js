var React = require('react');
var HelloMessage = require('HelloMessage.react');

React.render(
  React.createElement(HelloMessage, {name: "ShengMin"}),
  document.body
);
