var _ = require("./index");
var st = require("./stress-test");

var M = new _.Matrix(
    new _.NumericVector(180,197,240,210,180,160,179,185,183,150,110,190,170).name("score A"),
    new _.NumericVector(75,82,100,80,75,60,75,71,77,63,46,81,70).name("score B")
);
var rg_a = M.analyze("correlGamma").run(0,1);
var rg_b = M.correlGamma("score A","score B");
// rg_a.result = rg_b
require("./docs")();
debugger;
return;
var stats = [];
/* anova */ 

var iterations = 10000;
for(var i = 0; i < iterations; i++) {
    stats.push(st.gamma(10000));
    if(i % (iterations/100) == 0) console.log(Number(i/iterations).toLocaleString("cs-CZ",{style: "percent"}))
}
//var sampleSize = new _.NumericVector(...stats.map(e => e.sampleSize)).name("sampleSize");
//var groups = new _.NumericVector(...stats.map(e => e.groups)).name("groups");
var duration = new _.NumericVector(...stats.map(e => e.duration)).name("duration");
var M = new _.Matrix(duration);
st.save("gamma", M);

debugger;

    

