var _ = require("./index");
var st = require("./stress-test");

//require("./docs")({offset: 1, format: "markdown"});


var C = new _.NumericVector(11, 15, 9, 4, 34, 17, 18, 14, 12, 13, 26, 31).name("Czech");
var G = new _.NumericVector(10, 16, 9, 3, 38, 17, 16, 14, 13, 13, 26, 31).name("German");
var F = new _.NumericVector(11, 15, 9, 7, 34, 27, 8, 4, 19, 13, 26, 31).name("French");
var E = new _.NumericVector(11, 15, 9, 9, 24, 27, 8, 14, 19, 18, 26, 31).name("English");
var T = new _.Matrix(C,G,F,E);
var cm = T.analyze("correlMatrix").run(T,3);
console.log(cm.result);
debugger;
return;


//require("./docs")({offset: 2});
return;
//return;
const stats = [];
var iterations = 10000;
for(var i = 0; i < iterations; i++) {
    stats.push(st.wcxind(1000));
    if(i % (iterations/100) == 0) console.log(Number(i/iterations).toLocaleString("cs-CZ",{style: "percent"}))
}
//var sampleSize = new _.NumericVector(...stats.map(e => e.sampleSize)).name("sampleSize");
//var groups = new _.NumericVector(...stats.map(e => e.groups)).name("groups");
var duration = new _.NumericVector(...stats.map(e => e.duration)).name("duration");
var M = new _.Matrix(duration);
st.save("wcxind", M);

debugger;

    

