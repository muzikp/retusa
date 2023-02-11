"use strict";

Math.factorial = function (n) {
  if (n === 0) {
    return 1;
  } else {
    return n * Math.factorial(n - 1);
  }
};

module.exports = {
  betacf: betacf,
  betinc: betinc,
  binomdist: binomdist,
  binominv: binominv,
  chisqdist: chisqdist,
  chisqinv: chisqinv,
  erf: erf,
  fdist: fdist,
  fdistrt: fdistrt,
  finv: finv,
  gammaln: gammaln,
  gammapinv: gammapinv,
  ibeta: ibeta,
  ibetainv: ibetainv,
  lowRegGamma: lowRegGamma,
  normdist: normdist,
  normsdist: normsdist,
  normsinv: normsinv,
  tdist: tdist,
  tinv: tinv,
  wilcoxondist: wilcoxondist
};

function normsdist(x) {
  return normdist(x, 0, 1);
}

function normdist(x, mean, std) {
  var cumulative = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (!cumulative) {
    return Math.exp(-0.5 * Math.log(2 * Math.PI) - Math.log(std) - Math.pow(x - mean, 2) / (2 * std * std));
  } else return 0.5 * (1 + erf((x - mean) / Math.sqrt(2 * std * std)));
}
/**
 * @source https://github.com/jstat/jstat/
 * @param {} x 
 * @returns 
 */


function erf(x) {
  var cof = [-1.3026537197817094, 6.4196979235649026e-1, 1.9476473204185836e-2, -9.561514786808631e-3, -9.46595344482036e-4, 3.66839497852761e-4, 4.2523324806907e-5, -2.0278578112534e-5, -1.624290004647e-6, 1.303655835580e-6, 1.5626441722e-8, -8.5238095915e-8, 6.529054439e-9, 5.059343495e-9, -9.91364156e-10, -2.27365122e-10, 9.6467911e-11, 2.394038e-12, -6.886027e-12, 8.94487e-13, 3.13092e-13, -1.12708e-13, 3.81e-16, 7.106e-15, -1.523e-15, -9.4e-17, 1.21e-16, -2.8e-17];
  var j = cof.length - 1;
  var isneg = false;
  var d = 0;
  var dd = 0;
  var t, ty, tmp, res;

  if (x < 0) {
    x = -x;
    isneg = true;
  }

  t = 2 / (2 + x);
  ty = 4 * t - 2;

  for (; j > 0; j--) {
    tmp = d;
    d = ty * d - dd + cof[j];
    dd = tmp;
  }

  res = t * Math.exp(-x * x + 0.5 * (cof[0] + ty * d) - dd);
  return isneg ? res - 1 : 1 - res;
}

;
/**
 * @source https://gist.github.com/u840903/08877a0703764c7ed2ba7b9662fcdecb
 * @param {Number} value Probability value. 
 * @param {Integer} type Type of probability value. Default 0 (0.95 = 1.96).
 * @returns {Number} Normal standardized inverse distribution value.
 * @example 
 *  normsinv(0.95, 0) => returns 1.96
 *  normsinv(0.975, 1) => returns 1.96
 *  normsinv(0.05, 2) => returns 1.96
 *  normsinv(0.025, 3) => returns 1.96
 */

function normsinv(value) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  switch (type) {
    // 0.95 = 1.96
    case 0:
      value = 1 - (1 - value) / 2;
      break;
    // 0.975 = 1.96
    // 0.05 = 1.96

    case 1:
      value = value;
      break;

    case 2:
      value = value / 2;
      break;
    // 0.025 = 1.96

    case 3:
      value = (1 - value) / 2;
      break;

    default:
      break;
  }

  var a1 = -39.6968302866538,
      a2 = 220.946098424521,
      a3 = -275.928510446969;
  var a4 = 138.357751867269,
      a5 = -30.6647980661472,
      a6 = 2.50662827745924;
  var b1 = -54.4760987982241,
      b2 = 161.585836858041,
      b3 = -155.698979859887;
  var b4 = 66.8013118877197,
      b5 = -13.2806815528857,
      c1 = -7.78489400243029E-03;
  var c2 = -0.322396458041136,
      c3 = -2.40075827716184,
      c4 = -2.54973253934373;
  var c5 = 4.37466414146497,
      c6 = 2.93816398269878,
      d1 = 7.78469570904146E-03;
  var d2 = 0.32246712907004,
      d3 = 2.445134137143,
      d4 = 3.75440866190742;
  var p_low = 0.02425,
      p_high = 1 - p_low;
  var q, r;
  var retVal;

  if (value < p_low) {
    q = Math.sqrt(-2 * Math.log(value));
    retVal = (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
  } else if (value <= p_high) {
    q = value - 0.5;
    r = q * q;
    retVal = (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
  } else {
    q = Math.sqrt(-2 * Math.log(1 - value));
    retVal = -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
  }

  return retVal;
}
/**
 * @source https://github.com/jstat/jstat/
 * @param {Number} x Quantile of the F distribution (right-tailed). 
 * @param {Integer} df1 Between-group degrees of freedom.
 * @param {Integer} df2 Within-groups degrees of freedom.
 * @returns Value of the inversed F distribution.
 */


function finv(x, df1, df2) {
  return df2 / (df1 * (1 / ibetainv(x, df1 / 2, df2 / 2) - 1));
}
/**
 * @source https://github.com/jstat/jstat/
 * @param {*} x 
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */


function ibeta(x, a, b) {
  var bt = x === 0 || x === 1 ? 0 : Math.exp(gammaln(a + b) - gammaln(a) - gammaln(b) + a * Math.log(x) + b * Math.log(1 - x));
  if (x < 0 || x > 1) return false;
  if (x < (a + 1) / (a + b + 2)) return bt * betacf(x, a, b) / a;
  return 1 - bt * betacf(1 - x, b, a) / b;
}

;
/**
 * @source https://github.com/jstat/jstat/
 * @param {*} p 
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */

function ibetainv(p, a, b) {
  var EPS = 1e-8;
  var a1 = a - 1;
  var b1 = b - 1;
  var j = 0;
  var lna, lnb, pp, t, u, err, x, al, h, w, afac;
  if (p <= 0) return 0;
  if (p >= 1) return 1;

  if (a >= 1 && b >= 1) {
    pp = p < 0.5 ? p : 1 - p;
    t = Math.sqrt(-2 * Math.log(pp));
    x = (2.30753 + t * 0.27061) / (1 + t * (0.99229 + t * 0.04481)) - t;
    if (p < 0.5) x = -x;
    al = (x * x - 3) / 6;
    h = 2 / (1 / (2 * a - 1) + 1 / (2 * b - 1));
    w = x * Math.sqrt(al + h) / h - (1 / (2 * b - 1) - 1 / (2 * a - 1)) * (al + 5 / 6 - 2 / (3 * h));
    x = a / (a + b * Math.exp(2 * w));
  } else {
    lna = Math.log(a / (a + b));
    lnb = Math.log(b / (a + b));
    t = Math.exp(a * lna) / a;
    u = Math.exp(b * lnb) / b;
    w = t + u;
    if (p < t / w) x = Math.pow(a * w * p, 1 / a);else x = 1 - Math.pow(b * w * (1 - p), 1 / b);
  }

  afac = -gammaln(a) - gammaln(b) + gammaln(a + b);

  for (; j < 10; j++) {
    if (x === 0 || x === 1) return x;
    err = ibeta(x, a, b) - p;
    t = Math.exp(a1 * Math.log(x) + b1 * Math.log(1 - x) + afac);
    u = err / t;
    x -= t = u / (1 - 0.5 * Math.min(1, u * (a1 / x - b1 / (1 - x))));
    if (x <= 0) x = 0.5 * (x + t);
    if (x >= 1) x = 0.5 * (x + t + 1);
    if (Math.abs(t) < EPS * x && j > 0) break;
  }

  return x;
}

;

function fdist(x, df1, df2) {
  return ibeta(df1 * x / (df1 * x + df2), df1 / 2, df2 / 2);
}

function fdistrt(x, df1, df2) {
  return 1 - fdist(x, df1, df2);
}
/**
 * @source https://github.com/jstat/jstat/
 * @param {*} n 
 * @param {*} m 
 * @returns 
 */


function randn(n, m) {
  var u, v, x, y, q;
  if (!m) m = n;
  if (n) return _jstat_create(n, m, function () {
    return randn(null, null);
  });

  do {
    u = _random_fn();
    v = 1.7156 * (_random_fn() - 0.5);
    x = u - 0.449871;
    y = Math.abs(v) + 0.386595;
    q = x * x + y * (0.19600 * y - 0.25472 * x);
  } while (q > 0.27597 && (q > 0.27846 || v * v > -4 * Math.log(u) * u * u));

  return v / u;
}

;

function _jstat_create(rows, cols, func) {
  var res = new Array(rows);
  var i, j;

  if (typeof cols == "function") {
    func = cols;
    cols = rows;
  }

  for (i = 0; i < rows; i++) {
    res[i] = new Array(cols);

    for (j = 0; j < cols; j++) {
      res[i][j] = func(i, j);
    }
  }

  return res;
}

var _random_fn = Math.random;
/**
 * @source https://github.com/jstat/jstat/
 * @param {*} x 
 * @returns 
 */

function gammaln(x) {
  var j = 0;
  var cof = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
  var ser = 1.000000000190015;
  var xx, y, tmp;
  tmp = (y = xx = x) + 5.5;
  tmp -= (xx + 0.5) * Math.log(tmp);

  for (; j < 6; j++) {
    ser += cof[j] / ++y;
  }

  return Math.log(2.5066282746310005 * ser / xx) - tmp;
}

;
/**
 * @source https://github.com/jstat/jstat/
 * @param {*} p 
 * @param {*} a 
 * @returns 
 */

function gammapinv(p, a) {
  var j = 0;
  var a1 = a - 1;
  var EPS = 1e-8;
  var gln = gammaln(a);
  var x, err, t, u, pp, lna1, afac;
  if (p >= 1) return Math.max(100, a + 100 * Math.sqrt(a));
  if (p <= 0) return 0;

  if (a > 1) {
    lna1 = Math.log(a1);
    afac = Math.exp(a1 * (lna1 - 1) - gln);
    pp = p < 0.5 ? p : 1 - p;
    t = Math.sqrt(-2 * Math.log(pp));
    x = (2.30753 + t * 0.27061) / (1 + t * (0.99229 + t * 0.04481)) - t;
    if (p < 0.5) x = -x;
    x = Math.max(1e-3, a * Math.pow(1 - 1 / (9 * a) - x / (3 * Math.sqrt(a)), 3));
  } else {
    t = 1 - a * (0.253 + a * 0.12);
    if (p < t) x = Math.pow(p / t, 1 / a);else x = 1 - Math.log(1 - (p - t) / (1 - t));
  }

  for (; j < 12; j++) {
    if (x <= 0) return 0;
    err = lowRegGamma(a, x) - p;
    if (a > 1) t = afac * Math.exp(-(x - a1) + a1 * (Math.log(x) - lna1));else t = Math.exp(-x + a1 * Math.log(x) - gln);
    u = err / t;
    x -= t = u / (1 - 0.5 * Math.min(1, u * ((a - 1) / x - 1)));
    if (x <= 0) x = 0.5 * (x + t);
    if (Math.abs(t) < EPS * x) break;
  }

  return x;
}

;
/**
* @source https://github.com/jstat/jstat/
* @param {*} p 
* @param {*} a 
* @returns 
*/

function lowRegGamma(a, x) {
  var aln = gammaln(a);
  var ap = a;
  var sum = 1 / a;
  var del = sum;
  var b = x + 1 - a;
  var c = 1 / 1.0e-30;
  var d = 1 / b;
  var h = d;
  var i = 1; // calculate maximum number of itterations required for a

  var ITMAX = -~(Math.log(a >= 1 ? a : 1 / a) * 8.5 + a * 0.4 + 17);
  var an;

  if (x < 0 || a <= 0) {
    return NaN;
  } else if (x < a + 1) {
    for (; i <= ITMAX; i++) {
      sum += del *= x / ++ap;
    }

    return sum * Math.exp(-x + a * Math.log(x) - aln);
  }

  for (; i <= ITMAX; i++) {
    an = -i * (i - a);
    b += 2;
    d = an * d + b;
    c = b + an / c;
    d = 1 / d;
    h *= d * c;
  }

  return 1 - h * Math.exp(-x + a * Math.log(x) - aln);
}

;
/**
 * @source https://github.com/jstat/jstat/
 * @param {*} x 
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */

function betacf(x, a, b) {
  var fpmin = 1e-30;
  var m = 1;
  var qab = a + b;
  var qap = a + 1;
  var qam = a - 1;
  var c = 1;
  var d = 1 - qab * x / qap;
  var m2, aa, del, h;
  if (Math.abs(d) < fpmin) d = fpmin;
  d = 1 / d;
  h = d;

  for (; m <= 100; m++) {
    m2 = 2 * m;
    aa = m * (b - m) * x / ((qam + m2) * (a + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < fpmin) d = fpmin;
    c = 1 + aa / c;
    if (Math.abs(c) < fpmin) c = fpmin;
    d = 1 / d;
    h *= d * c;
    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < fpmin) d = fpmin;
    c = 1 + aa / c;
    if (Math.abs(c) < fpmin) c = fpmin;
    d = 1 / d;
    del = d * c;
    h *= del;
    if (Math.abs(del - 1.0) < 3e-7) break;
  }

  return h;
}

function betinc(X, A, B) {
  var A0 = 0;
  var B0 = 1;
  var A1 = 1;
  var B1 = 1;
  var M9 = 0;
  var A2 = 0;
  var C9;

  while (Math.abs((A1 - A2) / A1) > .00001) {
    A2 = A1;
    C9 = -(A + M9) * (A + B + M9) * X / (A + 2 * M9) / (A + 2 * M9 + 1);
    A0 = A1 + C9 * A0;
    B0 = B1 + C9 * B0;
    M9 = M9 + 1;
    C9 = M9 * (B - M9) * X / (A + 2 * M9 - 1) / (A + 2 * M9);
    A1 = A0 + C9 * A1;
    B1 = B0 + C9 * B1;
    A0 = A0 / B1;
    B0 = B0 / B1;
    A1 = A1 / B1;
    B1 = 1;
  }

  return A1 / A;
}
/**
 * Returns Student T distribution value.
 * @param {number} x Value
 * @param {integer} df Degrees of freedom
 * @param {boolean} cumulative Is cumulative function:
 * @returns T distribution.
 */


function tdist(x, df, cumulative) {
  if (!cumulative) {
    df = df > 1e100 ? 1e100 : df;
    return 1 / (Math.sqrt(df) * betafn(0.5, df / 2)) * Math.pow(1 + x * x / df, -((df + 1) / 2));
  } else {
    var df2 = df / 2;
    return ibeta((x + Math.sqrt(x * x + df)) / (2 * Math.sqrt(x * x + df)), df2, df2);
  }
}

function betafn(x, y) {
  if (x <= 0 || y <= 0) return undefined; // make sure x + y doesn't exceed the upper limit of usable values

  return x + y > 170 ? Math.exp(betaln(x, y)) : gammafn(x) * gammafn(y) / gammafn(x + y);
}

function gammafn(x) {
  var p = [-1.716185138865495, 24.76565080557592, -379.80425647094563, 629.3311553128184, 866.9662027904133, -31451.272968848367, -36144.413418691176, 66456.14382024054];
  var q = [-30.8402300119739, 315.35062697960416, -1015.1563674902192, -3107.771671572311, 22538.118420980151, 4755.8462775278811, -134659.9598649693, -115132.2596755535];
  var fact = false;
  var n = 0;
  var xden = 0;
  var xnum = 0;
  var y = x;
  var i, z, yi, res;

  if (x > 171.6243769536076) {
    return Infinity;
  }

  if (y <= 0) {
    res = y % 1 + 3.6e-16;

    if (res) {
      fact = (!(y & 1) ? 1 : -1) * Math.PI / Math.sin(Math.PI * res);
      y = 1 - y;
    } else {
      return Infinity;
    }
  }

  yi = y;

  if (y < 1) {
    z = y++;
  } else {
    z = (y -= n = (y | 0) - 1) - 1;
  }

  for (i = 0; i < 8; ++i) {
    xnum = (xnum + p[i]) * z;
    xden = xden * z + q[i];
  }

  res = xnum / xden + 1;

  if (yi < y) {
    res /= yi;
  } else if (yi > y) {
    for (i = 0; i < n; ++i) {
      res *= y;
      y++;
    }
  }

  if (fact) {
    res = fact / res;
  }

  return res;
}

;

function betaln(x, y) {
  return gammaln(x) + gammaln(y) - gammaln(x + y);
}

;

function tinv(p, dof) {
  var x = ibetainv(2 * Math.min(p, 1 - p), 0.5 * dof, 0.5);
  x = Math.sqrt(dof * (1 - x) / x);
  return p > 0.5 ? x : -x;
}

function chisqdist(x, df) {
  var cumulative = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (x < 0) return 0;else if (!cumulative) return x === 0 && df === 2 ? 0.5 : Math.exp((df / 2 - 1) * Math.log(x) - x / 2 - df / 2 * Math.log(2) - gammaln(df / 2));else return lowRegGamma(df / 2, x / 2);
}

function chisqinv(p, df) {
  return 2 * gammapinv(p, 0.5 * df);
}
/**
 * @source https://www.math.ucla.edu/~tom/distributions/SignedRank.html?
 * @param {*} n 
 * @param {*} w 
 * @returns 
 */


function wilcoxondist(n, w) {
  var p = new Array(1276);
  var Prob, t, k, sum, nsav, t1, t2;

  if (w < 0) {
    Prob = 0;
  } else if (w >= n * (n + 1) / 2) {
    Prob = 1;
  } else {
    if (n != nsav) {
      p[0] = .5;
      p[1] = .5;

      for (t = 2; t <= n * (n + 1) / 2; t++) {
        p[t] = 0;
      }

      for (k = 2; k <= n; k++) {
        t2 = k * (k + 1) / 2;
        t1 = (k - 1) * k / 2;

        for (t = t2; t > t1; t--) {
          p[t] = p[t - k] / 2;
        }

        for (t = t1; t >= k; t--) {
          p[t] = (p[t] + p[t - k]) / 2;
        }

        for (t = k - 1; t >= 0; t--) {
          p[t] = p[t] / 2;
        }
      }

      nsav = n;
    }

    sum = 0;

    for (k = 0; k <= w; k++) {
      sum = sum + p[k];
    }

    Prob = sum;
  }

  return Prob;
}

function binominv(trials, probability, alpha, successes) {
  if (successes === undefined) {
    successes = 0;
  }

  var p = alpha;
  var result = successes;

  while (p > binomdist(result, trials, probability, true)) {
    result++;
  }

  return result;
}

function binomdist(successes, trials, probability) {
  var cumulative = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (cumulative) {
    var result = 0;

    for (var i = 0; i <= successes; i++) {
      result += binomialCoefficient(trials, i) * Math.pow(probability, i) * Math.pow(1 - probability, trials - i);
    }

    return result;
  } else {
    return binomialCoefficient(trials, successes) * Math.pow(probability, successes) * Math.pow(1 - probability, trials - successes);
  }
}

function binomialCoefficient(n, k) {
  var result = 1;

  for (var i = 1; i <= k; i++) {
    result = result * (n - i + 1) / i;
  }

  return result;
}