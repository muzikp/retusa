var _ = require("./index");
var st = require("./stress-test");


require("./docs")();
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

    

