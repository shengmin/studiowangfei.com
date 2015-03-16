module.exports = function(values: Array<any>): Object {
  var object = {};
  for (var i = values.length - 1; i >= 0; i--) {
    var value = values[i];
    object[value] = value;
  }
  return object;
}
