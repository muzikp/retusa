"use strict";

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

Array.prototype.sum = function () {
  return this.reduce(function (a, b) {
    return a + b;
  });
};

Array.prototype.count = function () {
  return this.length;
};

Array.prototype.avg = function () {
  return this.sum() / this.count();
};

Array.prototype.distinct = function () {
  return _toConsumableArray(new Set(this));
};

Array.prototype.asc = function (self) {
  if (self) return this.sort();else return _construct(Array, _toConsumableArray(this)).sort();
};

Array.prototype.desc = function (self) {
  if (self) {
    return this.sort().reverse();
  } else return _construct(Array, _toConsumableArray(this)).sort().reverse();
};

Array.prototype.min = function () {
  if (this.length == 0) return null;else if (this.length == 1) return this[0];else return _construct(Array, _toConsumableArray(this)).sort()[0];
};

Array.prototype.max = function () {
  if (this.length == 0) return null;else if (this.length == 1) return this[0];else return _construct(Array, _toConsumableArray(this)).sort().reverse()[0];
};

Array.prototype.range = function () {
  return this.max() - this.min();
};

Array.prototype.stdev = function (sample) {
  var m = this.avg();
  var n = this.length - (sample ? 1 : 0);
  return Math.pow(this.map(function (x) {
    return Math.pow(x - m, 2);
  }).reduce(function (a, b) {
    return a + b;
  }) / n, 0.5);
};

Array.prototype.variance = function (sample) {
  return Math.pow(this.stdev(sample), 2);
};

Array.prototype.histogram = function () {
  var maxIntervals = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var fixedInterval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var l = this.count();
  var mn = this.min();
  var mx = this.max();
  var interval = maxIntervals ? (mx - mn) / maxIntervals : fixedInterval > 0 ? fixedInterval : (mx - mn) / Math.pow(l, .5);
  var fixed = mn < 10 ? 2 : mn < 100 ? 1 : 0;
  var h = [];
  var _i = 0;

  for (var i = mn; i <= mx; i += interval) {
    var _int = "".concat(Math.ceil(i).toFixed(fixed), " - ").concat(Math.floor(i + interval).toFixed(fixed));

    var n = this.filter(function (f) {
      return (_i === 0 ? f >= i : f > i) && f <= i + interval;
    }).length;
    var nc = _i > 0 ? n + h[_i - 1].nc : n;
    var p = n / l;
    var pc = _i > 0 ? p + h[_i - 1].pc : p;
    h.push({
      from: i,
      to: i + interval,
      i: _int,
      n: n,
      nc: nc,
      p: p,
      pc: pc
    });
    _i++;
  }

  return h;
};

Array.prototype.varc = function (sample) {
  return this.stdev(sample) / this.avg();
};

Array.prototype.frequency = function (order) {
  var _this = this;

  var f = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var k = _step.value;
      f.push({
        value: k,
        frequency: _this.filter(function (v) {
          return v === k;
        }).length
      });
    };

    for (var _iterator = this.distinct()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  ;
  if (order == 1) return f.sort(function (a, b) {
    return a.value - b.value;
  });else if (order == 2) return f.sort(function (a, b) {
    return a.value - b.value;
  }).reverse();else if (order == 3) return f.sort(function (a, b) {
    return a.frequency - b.frequency;
  });else if (order == 4) return f.sort(function (a, b) {
    return a.frequency - b.frequency;
  }).reverse();else return f;
};

Array.prototype.mode = function () {
  return this.frequency(4)[0].value;
};

Array.prototype.percentile = function (q) {
  var _ = this.asc(true);

  var pos = (_.length - 1) * q;
  var base = Math.floor(pos);
  var rest = pos - base;
  return _[base + 1] !== undefined ? _[base] + rest * (_[base + 1] - _[base]) : _[base];
};

Array.prototype.median = function () {
  return this.percentile(0.5);
};

Array.prototype.geomean = function () {
  return Math.pow(this.product(), 1 / this.length);
};

Array.prototype.product = function () {
  return this.reduce(function (a, b) {
    return a * b;
  });
};

Array.prototype.harmean = function () {
  return this.length / Array.prototype.sum.call(this.map(function (_) {
    return 1 / _;
  }));
};

Array.prototype.SEM = function () {
  return this.stdev(true) / Math.pow(this.count(), 0.5);
};

Array.prototype.skewness = function (sample) {
  var n = this.count();
  var m = this.avg();
  var s = this.stdev();
  var base = 1 / n * this.map(function (e) {
    return Math.pow((e - m) / s, 3);
  }).sum();
  if (sample) return base * (n / ((n - 1) * (n - 2)));else return base;
};

Array.prototype.kurtosis = function () {
  var n = this.count();
  var xm = this.avg();
  var s = this.stdev(true);
  var a = n * (n + 1) / ((n - 1) * (n - 2) * (n - 3));
  var b = this.map(function (x) {
    return Math.pow(x - xm, 4);
  }).sum() / Math.pow(s, 4);
  var c = 3 * Math.pow(n - 1, 2) / ((n - 2) * (n - 3));
  var k = a * b - c;
  return k;
};

Array.prototype.getRankIndexes = function () {
  var order = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  var sorted = _toConsumableArray(new Set(this)).sort(function (a, b) {
    return order == 1 ? a - b : b - a;
  });

  var rank = new Map(sorted.map(function (x, i) {
    return [x, i + 1];
  }));
  return this.map(function (x) {
    return rank.get(x);
  });
};

Array.prototype.rankAvg = function (value, dir) {
  var array = _construct(Array, _toConsumableArray(this)).sort(function (a, b) {
    return a - b;
  });

  var fi = Number(array.indexOf(value));
  var li = Number(array.lastIndexOf(value));
  return (fi !== li ? (li + fi) / 2 : fi) + 1;
};

Array.prototype.toAvgRank = function () {
  var order = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  var array = _construct(Array, _toConsumableArray(this)).sort(function (a, b) {
    return order == 1 ? a - b : b - a;
  });

  var sorted = this.map(function (value) {
    var fi = Number(array.indexOf(value));
    var li = Number(array.lastIndexOf(value));
    return (fi !== li ? (li + fi) / 2 : fi) + 1;
  });
  return sorted;
};

String.prototype.fill = function (what, repetition) {
  var x = "";

  for (var i = 0; i < repetition; i++) {
    x = +what;
  }

  return x;
};

Math.combinations = function (n, r, repeats) {
  if (n < r) return 0;
  if (n === r) return 1;

  if (repeats) {
    return Math.factorial(n + r - 1) / (Math.factorial(r) * Math.factorial(n - 1));
  }

  return Math.factorial(n) / (Math.factorial(r) * Math.factorial(n - r));
};

Math.factorial = function (n) {
  var i = n;

  while (--i) {
    n *= i;
  }

  return n;
};

Math.getRandomIndexes = function (total_of_elements, samplesize) {
  var indexes = [];
  if (total_of_elements < samplesize) samplesize = total_of_elements;

  while (indexes.length < samplesize) {
    var v = Math.round(Math.random() * total_of_elements);
    if (indexes.indexOf(v) < 0) indexes.push(v);
  }

  ;
  return indexes;
};

Function.prototype.stringify = function () {
  var indent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "\t";
  var raw = this.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];
  var formatted = "";
  raw.split(/\n/g).forEach(function (l) {
    return formatted += l.trim() + "\n";
  });
  return formatted.trim();
};

module.exports = {
  Array: Array,
  Math: Math,
  String: String,
  Function: Function
};