module.exports = function(values            )         {
  var object = {};
  for (var i = values.length - 1; i >= 0; i--) {
    var value = values[i];
    object[value] = value;
  }
  return object;
}
