"use strict";

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var dist = require("./distribution");

var _require = require("./errors"),
    Empty = _require.Empty;

var $ = require("./locale").call;

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

Array.prototype.mci = function (p) {
  return Math.mci(this.avg(), this.stdev(true), this.length, p);
  p = 1 - (1 - p) / 2;
  var m = this.avg();
  var q = this.length > 30 ? dist.normsinv(p, this.length - 1) : dist.tinv(p, this.length - 1);
  var delta = q * this.stdev(true) / Math.sqrt(this.length);
  return {
    m: m,
    delta: delta,
    lb: m - delta,
    ub: m + delta
  };
};

Array.prototype.pci = function (value, alfa) {
  var proportion = this.filter(function (_) {
    return _ === value;
  }).length / this.length;
  return Math.pci(proportion, this.length, alfa);
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
  var m = this.avg();
  return this.map(function (_) {
    return Math.pow(_ - m, 2);
  }).sum() / (this.length - (sample ? 1 : 0));
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
    var n = this.filter(function (f) {
      return (_i === 0 ? f >= i : f > i) && f <= i + interval;
    }).length;
    var nc = _i > 0 ? n + h[_i - 1].nc : n;
    var p = n / l;
    var pc = _i > 0 ? p + h[_i - 1].pc : p;
    h.push({
      from: i,
      to: i + interval,
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
  if (order == 3) return f.sort(function (a, b) {
    return a.value - b.value;
  });else if (order == 4) return f.sort(function (a, b) {
    return a.value - b.value;
  }).reverse();else if (order == 2) return f.sort(function (a, b) {
    return a.frequency - b.frequency;
  });else if (order == 1) return f.sort(function (a, b) {
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
  return this.stdev(true) / Math.sqrt(this.length);
};

Array.prototype.skewness = function (sample) {
  var n = this.length;
  var m = this.avg();
  var s = this.stdev(sample);
  if (sample) return n / ((n - 1) * (n - 2)) * this.map(function (x) {
    return Math.pow((x - m) / s, 3);
  }).sum();else return this.map(function (x) {
    return Math.pow((x - m) / s, 3);
  }).sum() / n;
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
  return k || new Empty();
};

Array.prototype.ttest = function (mean) {
  var n = this.length;
  var m = this.avg();
  var t = (m - mean) / this.SEM();
  var p = (1 - dist.tdist(t, n - 1)) * 2;
  return {
    t: t,
    p: p,
    n: n //df: n-1,
    //sample_mean: m,
    //population_mean: mean

  };
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

Array.prototype.intersection = function (arr) {
  if (arr.length == 0) return this;
  return this.filter(function (v) {
    return arr.indexOf(v) > -1;
  });
};

Array.prototype.covariance = function (arr) {
  var sample = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var xm = this.avg();
  var ym = arr.avg();
  return this.map(function (x, i) {
    return (x - xm) * (arr[i] * ym);
  }).sum(arr.length - (sample ? 1 : 0));
};

Array.prototype.shapirowilk = function () {
  function poly(cc, nord, x) {
    var p;
    var ret_val;
    ret_val = cc[0];

    if (nord > 1) {
      p = x * cc[nord - 1];

      for (j = nord - 2; j > 0; j--) {
        p = (p + cc[j]) * x;
      }

      ret_val += p;
    }

    return ret_val;
  }

  var x = this.sort(function (a, b) {
    return a - b;
  });
  var n = x.length;
  if (n < 3) return new Empty($("AgIP"));
  var nn2 = Math.floor(n / 2);
  var a = new Array(Math.floor(nn2) + 1);
  var small = 1e-19;
  var g = [-2.273, 0.459];
  var c1 = [0, 0.221157, -0.147981, -2.07119, 4.434685, -2.706056];
  var c2 = [0, 0.042981, -0.293762, -1.752461, 5.682633, -3.582633];
  var c3 = [0.544, -0.39978, 0.025054, -6.714e-4];
  var c4 = [1.3822, -0.77857, 0.062767, -0.0020322];
  var c5 = [-1.5861, -0.31082, -0.083751, 0.0038915];
  var c6 = [-0.4803, -0.082676, 0.0030302];
  var i, j, i1;
  var ssassx, summ2, ssumm2, gamma, range;
  var a1, a2, an, m, s, sa, xi, sx, xx, y, w1;
  var fac, asa, an25, ssa, sax, rsn, ssx, xsx;
  var pw = 1;
  an = n;
  if (n == 3) a[1] = 0.7071067811865476;else {
    an25 = an + 0.25;
    summ2 = 0.0;

    for (i = 1; i <= nn2; i++) {
      a[i] = dist.normsinv((i - 0.375) / an25, 1);
      var r__1 = a[i];
      summ2 += r__1 * r__1;
    }

    summ2 *= 2;
    ssumm2 = Math.sqrt(summ2);
    rsn = 1 / Math.sqrt(an);
    a1 = poly(c1, 6, rsn) - a[1] / ssumm2;

    if (n > 5) {
      i1 = 3;
      a2 = -a[2] / ssumm2 + poly(c2, 6, rsn);
      fac = Math.sqrt((summ2 - 2 * (a[1] * a[1]) - 2 * (a[2] * a[2])) / (1 - 2 * (a1 * a1) - 2 * (a2 * a2)));
      a[2] = a2;
    } else {
      i1 = 2;
      fac = Math.sqrt((summ2 - 2 * (a[1] * a[1])) / (1 - 2 * (a1 * a1)));
    }

    a[1] = a1;

    for (i = i1; i <= nn2; i++) {
      a[i] /= -fac;
    }
  }
  range = x[n - 1] - x[0];

  if (range < small) {
    return new Empty($("zxmM", {
      range: range
    }));
  }

  xx = x[0] / range;
  sx = xx;
  sa = -a[1];

  for (i = 1, j = n - 1; i < n; j--) {
    xi = x[i] / range;

    if (xx - xi > small) {
      return new Empty($("TSCM", {
        range: xx - xi
      }));
    }

    sx += xi;
    i++;
    if (i != j) sa += Math.sign(i - j) * a[Math.min(i, j)];
    xx = xi;
  }

  if (n > 5000) {
    return new Empty($("yhzq"));
  }

  sa /= n;
  sx /= n;
  ssa = ssx = sax = 0.;

  for (i = 0, j = n - 1; i < n; i++, j--) {
    if (i != j) asa = Math.sign(i - j) * a[1 + Math.min(i, j)] - sa;else asa = -sa;
    xsx = x[i] / range - sx;
    ssa += asa * asa;
    ssx += xsx * xsx;
    sax += asa * xsx;
  }

  ssassx = Math.sqrt(ssa * ssx);
  w1 = (ssassx - sax) * (ssassx + sax) / (ssa * ssx);
  var w = 1 - w1;

  if (n == 3) {
    var pi6 = 6 / Math.PI;
    var stqr = Math.asin(Math.sqrt(3 / 4));
    pw = pi6 * (Math.asin(Math.sqrt(w)) - stqr);
    if (pw < 0.) pw = 0;
    return w;
  }

  y = Math.log(w1);
  xx = Math.log(an);

  if (n <= 11) {
    gamma = poly(g, 2, an);

    if (y >= gamma) {
      pw = 1e-99;
      /* an "obvious" value, was 'small' which was 1e-19f */

      return w;
    }

    y = -Math.log(gamma - y);
    m = poly(c3, 4, an);
    s = Math.exp(poly(c4, 4, an));
    debugger;
  } else {
    m = poly(c5, 4, xx);
    s = Math.exp(poly(c6, 3, xx));
  }

  var z = (Math.log(1 - w) - m) / s;
  var p = 1 - dist.normsdist(z);
  return {
    W: w,
    df: n,
    p: p
  };
};

Array.prototype.kolmogorovSmirnovTest = function () {
  var sample = this.sort(function (a, b) {
    return a - b;
  });
  var sampleCdf = sample.map(function (x, i) {
    return (i + 1) / sample.length;
  });
  var maxDistance = 0;
  var mean = sample.avg();
  var s = sample.stdev(true);

  for (var i = 0; i < sample.length; i++) {
    maxDistance = Math.max(maxDistance, Math.abs(sampleCdf[i] - dist.normsdist((sample[i] - mean) / s)));
  }

  return {
    T: maxDistance,
    df: sample.length
  };
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

Math.pci = function (p, n, alfa) {
  alfa = 1 - (1 - alfa) / 2;
  var z = dist.normsinv(alfa, 1);
  var delta = z * Math.sqrt(p * (1 - p) / n);
  return {
    p: p,
    sig: (1 - alfa) * 2,
    delta: delta,
    lb: p - delta < 0 ? 0 : p - delta,
    ub: p + delta > 1 ? 1 : p + delta
  };
};

Math.mci = function (m, stdev, n, alfa) {
  alfa = 1 - (1 - alfa) / 2;
  var q = n > 30 ? dist.normsinv(alfa, n - 1) : dist.tinv(alfa, n - 1);
  var delta = q * stdev / Math.sqrt(n);
  return {
    m: m,
    sig: (1 - alfa) * 2,
    delta: delta,
    lb: m - delta,
    ub: m + delta
  };
};

Math.rndNumber = function (min, max) {
  var decimal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
  var multiplier = Math.pow(10, decimal || 0);
  return Math.floor(Math.random() * (max - min) * multiplier + min * multiplier) / multiplier;
};

Math.rndSelect = function (array) {
  var total = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var allowDuplicates = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (total >= array.length) return array;
  var _sample = [];

  while (_sample.length < total) {
    var index = Math.floor(Math.random() * array.length);

    if (!allowDuplicates) {
      if (_sample.indexOf(array[index] < 0)) _sample.push(array[index]);
    } else _sample.push(array[index]);
  }

  return _sample;
};

Math.rndSelectOne = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

Math.sign = function (x) {
  if (x == 0) return 0;
  return x > 0 ? 1 : -1;
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