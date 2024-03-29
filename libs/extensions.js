const dist = require("./distribution");
const $ = require("./locale").call;

Array.prototype.toCSV = function(delimiter) {
    var t = "";
    this.forEach((e,i,a) => t += (!isNaN(Number(e)) ? delimiter ? String(e).replace(/\./g,delimiter) : e : e) + "\n");
    return t;
}

Array.prototype.hasOnlyVectorChildren = function() {
    return this.filter(e => !e?.isVector).length == 0;
}

Array.prototype.sum = function() {
    if(this.length === 0) return 0;
    return this.reduce((a,b) => a+b);
}

Array.prototype.count = function() {
    return this.length;
}

Array.prototype.avg = function() {
    if(this.length === 0) return null;
    else if(this.length === 1) return this[0];
    else return this.sum()/this.count()
}

Array.prototype.mci = function(p) {
    return Math.mci(this.avg(),this.stdev(true),this.length, p);
}

Array.prototype.pci = function(value, alfa) {
    var proportion = this.filter(_ => _ === value).length / this.length;
    return Math.pci(proportion, this.length, alfa);
}

Array.prototype.distinct = function() {
    return this.filter((obj, index, self) => {
        return self.findIndex(t => JSON.stringify(t) === JSON.stringify(obj)) === index;
      });
    //return [...new Set(this)];
}

Array.prototype.asc = function(self) {
    if(self) return this.length > 1 ? this.sort((a,b) => a < b ? -1 : 1) : this.length > 0 ? this[0]: [];
    else return this.length > 1 ? [...this].sort((a,b) => a < b ? -1 : 1) : this.length > 0 ? this[0] : [];
}

Array.prototype.desc = function(self) {
    if(self) return this.length > 1 ? this.sort((a,b) => b < a ? -1 : 1) : this.length > 0 ? this[0]: [];
    else return this.length > 1 ? [...this].sort((a,b) => b < a ? -1 : 1) : this.length > 0 ? this[0] : [];
}

Array.prototype.min = function(){
    if(this.length == 0) return null;
    else if(this.length == 1) return this[0];
    else return new Array(...this).sort((a,b) => a < b ? -1 : 1)[0];
}

Array.prototype.max = function(){
    if(this.length == 0) return null;
    else if(this.length == 1) return this[0];
    else return new Array(...this).sort((a,b) => a > b ? -1 : 1)[0];
        
}

Array.prototype.range = function(){
    return this.max() - this.min();
}

Array.prototype.stdev = function(sample){
    const m = this.avg();
    const n = this.length - (sample ? 1 : 0);
    return Math.pow(this.map(x => Math.pow(x - m, 2)).reduce((a, b) => a + b) / n, 0.5);
}

Array.prototype.variance = function(sample) {
    var m = this.avg();
    return this.map(_ => Math.pow(_ - m,2)).sum()/(this.length - (sample ? 1 : 0));
}

Array.prototype.histogram = function(maxIntervals = null, fixedInterval = null){
    var l = this.count();
    var mn = this.min();
    var mx = this.max();
    var interval = maxIntervals ? (mx-mn)/maxIntervals : fixedInterval > 0 ? fixedInterval : (mx-mn)/Math.pow(l,.5);
    var h = [];
    var _i = 0;
    for(var i = mn; i <= mx; i += interval)
    {
        if(i + interval > mx && maxIntervals) break;
        var n = (this.filter(f => (_i === 0 ? f >=i : f > i) && (f <= (i + interval)))).length;
        var nc = _i > 0 ? n + h[_i-1].nc : n;
        var p = n/l;
        var pc = _i > 0 ? p + h[_i-1].pc : p;
        h.push({from: i, to: i + interval, n:n, nc: nc, p:p, pc:pc})
        _i++;
    }
    return h;
}

Array.prototype.varc = function(sample){
    return this.stdev(sample) / this.avg();
}

Array.prototype.frequency = function(order){
    var f = [];
    for(let k of this.distinct()) {
        f.push({v: k, n: this.filter(_v => _v === k).length});
    };
    if(order == 3) return f.sort((a, b) => a.v - b.v);
    else if(order == 4) return f.sort((a, b) => a.v - b.v).reverse();
    else if(order == 2) return f.sort((a, b) => a.n - b.n);
    else if(order == 1) return f.sort((a, b) => a.n - b.n).reverse();
    else return f;
}

Array.prototype.chigoftest = function() {
    var f = this.frequency();
    var expm = f.map(e => e.n).avg();
    let chi =  f.map(e => Math.pow(e.n - expm,2)/expm).sum();
    const df = f.length -1;
    const p = dist.chisqdist(chi,df);
    return {chi: chi, df: df, p:p};
}

Array.prototype.mode = function() {
    var f = {v: null, n: 0};
    for(let k of this.distinct()) {
        const n = this.filter(_v => _v === k).length;
        if(f.n < n) f = {v: k, n: n};
    };
    return f.v;
}

Array.prototype.quantile = function(q){
    if(this.length == 0) return null;
    let _ = this.asc();
    var pos = ((_.length) - 1) * q;
    var base = Math.floor(pos);
    var rest = pos - base;
    return (_[base+1]!==undefined) ? _[base] + rest * (_[base+1] - _[base]) : _[base];
}

Array.prototype.median = function() {
    return this.quantile(0.5);
}

Array.prototype.geomean = function(){
    return Math.pow(this.product(), 1/ this.length)
}

Array.prototype.product = function(){
    return this.reduce((a, b) => a * b);
}

Array.prototype.harmean = function(){
    return this.length / Array.prototype.sum.call(this.map(_ => 1/_));
}

Array.prototype.SEM = function(){
    return this.stdev(true)/Math.sqrt(this.length);
}

Array.prototype.skewness = function(sample) {
    var n = this.length;
    var m = this.avg();
    var s = this.stdev(sample);
    if(sample) return (n/((n-1)*(n-2)))* this.map(x => Math.pow((x-m)/s,3)).sum();
    else return this.map(x => Math.pow((x-m)/s,3)).sum() / n;
}

Array.prototype.kurtosis = function(){
    const n = this.count();
    const xm = this.avg();
    const s = this.stdev(true);
    const a = (n*(n+1))/((n-1)*(n-2)*(n-3));
    const b = this.map(x => Math.pow((x-xm),4)).sum() / Math.pow(s,4);
    const c = (3 * Math.pow((n-1),2)) / ((n-2)*(n-3));
    var k = a * b - c;
    return k;
}

Array.prototype.ttest = function(mean){
    var n = this.length;
    var m = this.avg();
    var t = (m - mean)/this.SEM();
    var p = dist.tdist(t, n-1);
    return {
        t: t,
        p: p,
        n: n,
        //df: n-1,
        //sample_mean: m,
        //population_mean: mean
    }
}

Array.prototype.getRankIndexes = function(order = 0){
    const sorted = [...new Set(this)].sort((a, b) => order == 1 ? a-b : b-a);
    const rank = new Map(sorted.map((x, i) => [x, i + 1]));
    return this.map((x) => rank.get(x));
}

Array.prototype.rankAvg = function(value, dir = 1, sub = -1) {
    dir == 0 ? dir = -1 : dir == 1 ? dir = 1 : dir = 1;
    var array = new Array(...this).sort((a,b) => a < b ? -dir : a == b ? 0 : dir);
    var fi = Number(array.indexOf(value)) + sub;
    var li = Number(array.lastIndexOf(value)) + sub;
    return (fi !== li ? (li+fi)/2 : fi);
}

Array.prototype.toAvgRank = function(dir = 1, sub = -1) {
    return this.map((e,i,a) => a.rankAvg(e, dir, sub));
} 

Array.prototype.toRankAvg = Array.prototype.toAvgRank;

Array.prototype.intersection = function(arr) {
    if(arr.length == 0) return this;
    return this.filter(v => arr.indexOf(v) > -1)
}

Array.prototype.covariance = function(arr, sample = false) {
    var xm = this.avg();
    var ym = arr.avg();
    return this.map((x,i) => (x-xm)*(arr[i]*ym)).sum(arr.length - (sample ? 1 : 0));
}

Array.prototype.devsq = function() {
    const m = this.avg();
    return this.map(e => Math.pow(e -m,2)).sum();
}

Array.prototype.slope = function(y) {
    var xm = this.avg(), ym = y.avg();
    return this.map((_x, i) => (_x-xm) * (y[i]-ym)).sum() / this.map((_x,i) => Math.pow(y[i] - ym, 2)).sum();
}

/**
 * 
 * @returns Returns the last element of the array.
 */
Array.prototype.last = function() {
    return this.slice(-1)[0]
}

Array.prototype.shapirowilk = function() {

	function poly(cc, nord, x) {
		var p;
		var ret_val;
		ret_val = cc[0];
		if (nord > 1) {
			p = x * cc[nord - 1];
			for (j = nord - 2; j > 0; j--)
				p = (p + cc[j]) * x;
			ret_val += p;
		}
		return ret_val;
	}
	var x = this.sort(function(a, b) {
		return a - b;
	});
	var n = x.length;
	if (n < 3) throw new Error($("AgIP"));
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
	if (n == 3)
		a[1] = 0.7071067811865476;
	else {
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
		for (i = i1; i <= nn2; i++)
			a[i] /= -fac;
	}
	range = x[n - 1] - x[0];
	if (range < small) {
		throw new Error($("zxmM", {
			range: range
		}));
	}
	xx = x[0] / range;
	sx = xx;
	sa = -a[1];
	for (i = 1, j = n - 1; i < n; j--) {
		xi = x[i] / range;
		if (xx - xi > small) {
			throw new Error($("TSCM", {
				range: xx - xi
			}));
		}
		sx += xi;
		i++;
		if (i != j)
			sa += Math.sign(i - j) * a[Math.min(i, j)];
		xx = xi;
	}
	if (n > 5000) {
		throw new Error($("yhzq"));
	}
	sa /= n;
	sx /= n;
	ssa = ssx = sax = 0.;
	for (i = 0, j = n - 1; i < n; i++, j--) {
		if (i != j)
			asa = Math.sign(i - j) * a[1 + Math.min(i, j)] - sa;
		else
			asa = -sa;
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
		if (pw < 0.)
			pw = 0;
		return w;
	}
	y = Math.log(w1);
	xx = Math.log(an);
	if (n <= 11) {
		gamma = poly(g, 2, an);
		if (y >= gamma) {
			pw = 1e-99; /* an "obvious" value, was 'small' which was 1e-19f */
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
	var z = (Math.log(1-w)-m)/s;
    var p = 1-dist.normsdist(z);
    return {
        W: w, df: n, p: p
    }   
}

Array.prototype.kolmogorovSmirnovTest = function() {
    var sample = this.sort((a, b) => a - b);
    const sampleCdf = sample.map((x, i) => (i + 1) / sample.length);
    let maxDistance = 0;
    var mean = sample.avg();
    var s = sample.stdev(true);
    for (let i = 0; i < sample.length; i++) {
        maxDistance = Math.max(maxDistance, Math.abs(sampleCdf[i] - dist.normsdist((sample[i] - mean)/s)));
    }
    return {
        T: maxDistance,
        df: sample.length
    };
  }

/**
 * A static method that convert input numeric arrays to their ranks.
 * @param  {...Array} arrs Arrays or vectors.
 * @returns An array of array of ranks.
 */
//Array.toRanks=function(...t){let e=t.length,r=[];for(let n=0;n<e;n++){let a=t[n];for(let t=0;t<a.length;t++)r.push([a[t],0,n])}r.sort(sortByCol);for(let t=0;t<r.length;t++){let e=r[t];e[1]=t+1}for(let t=0;t<r.length-1;t++){let e=r[t],n=e[0],a=e[1],o=1;for(let t=t+1;t<r.length;t++){let e=r[t],s=e[0];n==s&&(a+=e[1],o++)}if(o>1){let t=a/o;for(let e=t;e<t+o;e++){let n=r[e];n[1]=t}}}return r}

function sortByCol(a, b) {
    a = a[0]
    b = b[0]
    return (a === b) ? 0 : (a < b) ? -1 : 1
}

Array.prototype.qqplot = function() {
    const arr = this.asc();
    var n = this.length;
    var stdev = this.stdev(true);
    var m = this.avg();
    return arr.toRankAvg(1,0.5).map((e,i) => dist.normsinv(e/n,1)).map((e,i) => ({x: e, y: (arr[i]-m)/stdev}));
}

Array.prototype.ppplot = function() {
    var n = this.length;
    return this.map((v,i) => dist.normsinv((this.indexOf(v) + 0.5)/n,1)).map((e,i) => ({x: this[i], y: e}));
    
}

Array.toRanks = function(...arrs) {
    let k = arrs.length;    
    let ranks = [];
    for (let s = 0; s < k; s++) {
        let v = arrs[s];
        for (let i = 0; i < v.length; i++) {
            ranks.push( [v[i], 0, s] );
        }
    }
    ranks.sort(sortByCol);
    for (let i = 0; i < ranks.length; i++) {
        let re = ranks[i];
        re[1] = i+1;
    }
    for (let s = 0; s < ranks.length - 1; s++) {
        let re1 = ranks[s];
        let val1 = re1[0];
        let r_sum = re1[1];
        let cnt = 1;
        for (let e = s + 1; e < ranks.length; e++) {
            let re2 = ranks[e];
            let val2 = re2[0];
            if (val1 == val2) {
                r_sum += re2[1];
                cnt += 1;
            }
        }
        if (cnt > 1) {
            let r_mean = r_sum / cnt;
            for (let i = s; i < s + cnt; i++) {
                let re = ranks[i];
                re[1] = r_mean;
            }
        }
    }    
    return ranks;
}


String.prototype.fill = function(what, repetition) {
    var x = "";
    for(var i = 0; i < repetition; i++) {
        x =+ what;
    }
    return x;
}

Math.combinations = function(n, k) {
    if (k > n) {
      return 0;
    }
    if (k === 0 || k === n) {
      return 1;
    }
    let numerator = 1;
    for (let i = 0; i < k; i++) {
      numerator *= (n - i);
    }
    let denominator = 1;
    for (let i = 1; i <= k; i++) {
      denominator *= i;
    }
    return numerator / denominator;
  }
/*
Math.combinations = function(n, r, repeats) {
    if(n< r) return 0;
    if(n=== r) return 1;
    if(repeats){
        return Math.factorial(n+r-1)/((Math.factorial(r)*Math.factorial(n-1)));
    }
    console.log(Math.factorial(n));
    console.log(((Math.factorial(r)*Math.factorial(n-r))))
    var f = Math.factorial(n)/((Math.factorial(r)*Math.factorial(n-r)));
    debugger;
    return f;
}
*/

Math.factorial = function(n) {
    var i= n;
    while(--i) n*= i;
    return n;
}

Math.getRandomIndexes = function(total_of_elements, samplesize) {
    var indexes = [];
    if(total_of_elements < samplesize) samplesize = total_of_elements;
    while (indexes.length < samplesize) {
        var v = Math.round(Math.random()*total_of_elements);
        if(indexes.indexOf(v) < 0) indexes.push(v);
    };
    return indexes;
}

Math.pci = function(p,n,alfa) {
    alfa = 1-(1-alfa)/2;
    var z = dist.normsinv(alfa, 1 );
    var delta = z * Math.sqrt((p * (1 - p)) / n);
    return {p: p, sig: (1-alfa)*2,delta: delta, lb: p-delta < 0 ? 0 : p-delta, ub: p+delta > 1 ? 1 : p+delta};
}

Math.mci = function(m,stdev,n,alfa) {
    alfa = 1-(1-alfa)/2;
    var q = n > 30 ? dist.normsinv(alfa, n - 1 ) : dist.tinv(alfa, n -1);
    var delta = q * stdev/Math.sqrt(n);
    return {m: m, sig: (1-alfa)*2,delta: delta, lb: m-delta, ub: m+delta};
}

Math.rndNumber = function(min,max,decimal = 2) {
    let multiplier = Math.pow(10, decimal || 0);
    return Math.floor(Math.random() * (max - min) * multiplier + min * multiplier) / multiplier;
}

Math.rndSelect = function(array, total = 1, allowDuplicates = false) {
    if(total >= array.length) return array;
    var _sample = [];
    while (_sample.length < total) {
        var index = Math.floor(Math.random() * array.length);
        if(!allowDuplicates) {
            if(_sample.indexOf(array[index] < 0)) _sample.push(array[index]);   
        } else _sample.push(array[index]);
    }
    return _sample;
}

Math.rndSelectOne = function(array) {
    return array[Math.floor(Math.random() * array.length)];
}

Math.sign = function(x) {
    if (x == 0)
        return 0;
    return x > 0 ? 1 : -1;
}

Function.prototype.stringify = function(indent = "\t") {
    var raw = this.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];
    var formatted = "";
    raw.split(/\n/g).forEach(l => formatted += l.trim() + "\n");
    return formatted.trim();
}

Date.isDate = function(date) {
    return (date instanceof Date && !isNaN(date.valueOf()))
}

String.fillRnd = function(length) {
    return generateRandomString(length);
}

Array.prototype.fillRnd = function() {
    return generateRandomString(this.length);
}

function generateRandomString(length=8) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

module.exports = {Array, Math, String, Function};