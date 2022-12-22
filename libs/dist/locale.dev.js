"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var built_in_locales = {
  cs: require("../locales/cs")
};
var _ = built_in_locales.cs;
module.exports = {
  config: function config() {
    var setup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "cs";

    if (typeof setup == "string") {
      _ = built_in_locales[setup];
      if (!_) throw new Error("Locale " + setup + " not found.");
    } else if (_typeof(setup) == "object") _ = setup;else throw new Error("Custom locale must be an object.");

    return module.exports;
  },
  call: function call(code) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!code) return "";
    var _text = _[code];
    if (!_text) return _replace(code, {
      value: code
    });else {
      _text = _replace(_text, data);
      return _text;
    }
  }
};

var _replace = function _replace(text, data) {
  var keys = (text.match(/\$\{(.*?)\}/g) || []).map(function (i) {
    return i.match(/\$\{(.*)\}/)[1];
  });
  keys.forEach(function (k) {
    text = text.replace("\$\{" + k + "\}", function () {
      return data[k];
    });
  });
  return text;
};