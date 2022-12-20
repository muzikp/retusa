const dist = require("./distribution");

Array.prototype.sum = function() {
    return this.reduce((a,b) => a+b);
}

Array.prototype.count = function() {
    return this.length;
}

Array.prototype.avg = function() {
    return this.sum()/this.count()
}

Array.prototype.distinct = function() {
    return [...new Set(this)]
}

Array.prototype.asc = function(self) {
    if(self) return this.sort();
    else return new Array(...this).sort();
}

Array.prototype.desc = function(self) {
    if(self) {
        return this.sort().reverse();
    } else return new Array(...this).sort().reverse();
}

Array.prototype.min = function(){
    if(this.length == 0) return null;
    else if(this.length == 1) return this[0];
    else return new Array(...this).sort()[0];
}

Array.prototype.max = function(){
    if(this.length == 0) return null;
    else if(this.length == 1) return this[0];
    else return new Array(...this).sort().reverse()[0];
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
    return Math.pow(this.stdev(sample), 2);
}

Array.prototype.histogram = function(maxIntervals = null, fixedInterval = null){
    var l = this.count();
    var mn = this.min();
    var mx = this.max();
    var interval = maxIntervals ? (mx-mn)/maxIntervals : fixedInterval > 0 ? fixedInterval : (mx-mn)/Math.pow(l,.5);
    var fixed = mn < 10 ? 2 : mn < 100 ? 1 : 0;
    var h = [];
    var _i = 0;
    for(var i = mn; i <= mx; i += interval)
    {
        var int = `${Math.ceil(i).toFixed(fixed)} - ${(Math.floor(i + interval)).toFixed(fixed)}`;
        var n = (this.filter(f => (_i === 0 ? f >=i : f > i) && (f <= (i + interval)))).length;
        var nc = _i > 0 ? n + h[_i-1].nc : n;
        var p = n/l;
        var pc = _i > 0 ? p + h[_i-1].pc : p;
        h.push({from: i, to: i + interval, i: int, n:n, nc: nc, p:p, pc:pc})
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
        f.push({value: k, frequency: this.filter(v => v === k).length});
    };
    if(order == 1) return f.sort((a, b) => a.value - b.value);
    else if(order == 2) return f.sort((a, b) => a.value - b.value).reverse();
    else if(order == 3) return f.sort((a, b) => a.frequency - b.frequency);
    else if(order == 4) return f.sort((a, b) => a.frequency - b.frequency).reverse();
    else return f;
}

Array.prototype.mode = function() {
    return this.frequency(4)[0].value;
}

Array.prototype.percentile = function(q){
    let _ = this.asc(true);
    var pos = ((_.length) - 1) * q;
    var base = Math.floor(pos);
    var rest = pos - base;
    return (_[base+1]!==undefined) ? _[base] + rest * (_[base+1] - _[base]) : _[base];
}

Array.prototype.median = function() {
    return this.percentile(0.5);
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
    return this.stdev(true)/Math.pow(this.count(),0.5);
}

Array.prototype.skewness = function(sample) {
    var n = this.count();
    var m = this.avg();
    var s = this.stdev();
    var base = 1/n * this.map(e => Math.pow((e - m)/s,3)).sum();
    if(sample) return base * (n/((n-1)*(n-2)));
    else return base;
    
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
    var p = 1 - dist.tdist(t, n-1);
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

Array.prototype.rankAvg = function(value, dir) {
    var array = new Array(...this).sort((a,b) => a - b);
    var fi = Number(array.indexOf(value));
    var li = Number(array.lastIndexOf(value));
    return (fi !== li ? (li+fi)/2 : fi) + 1;
} 

Array.prototype.toAvgRank = function(order = 0) {
    var array = new Array(...this).sort((a, b) => order == 1 ? a-b : b-a);
    var sorted = this.map(function(value){
        var fi = Number(array.indexOf(value));
        var li = Number(array.lastIndexOf(value));
        return (fi !== li ? (li+fi)/2 : fi) + 1;
    });
    return sorted;
} 

Array.prototype.intersection = function(arr) {
    if(arr.length == 0) return this;
    return this.filter(v => arr.indexOf(v) > -1)
}

Array.prototype.covariance = function(arr, sample = false) {
    var xm = this.avg();
    var ym = arr.avg();
    return this.map((x,i) => (x-xm)*(arr[i]*ym)).sum(arr.length - (sample ? 1 : 0));
}

String.prototype.fill = function(what, repetition) {
    var x = "";
    for(var i = 0; i < repetition; i++) {
        x =+ what;
    }
    return x;
}

Math.combinations = function(n, r, repeats) {
    if(n< r) return 0;
    if(n=== r) return 1;
    if(repeats){
        return Math.factorial(n+r-1)/((Math.factorial(r)*Math.factorial(n-1)));
    }
    return Math.factorial(n)/((Math.factorial(r)*Math.factorial(n-r)));
}

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

Function.prototype.stringify = function(indent = "\t") {
    var raw = this.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];
    var formatted = "";
    raw.split(/\n/g).forEach(l => formatted += l.trim() + "\n");
    return formatted.trim();
}

module.exports = {Array, Math, String, Function};