var _ = require("./index");
var st = require("./stress-test");

require("./docs")();
return;
//logisticRegression([true, false, true, false, true],[[0.5, 0.2, 0.9, 0.1, 0.8],[0.3, 0.7, 0.1, 0.8, 0.4],[1, 0, 1, 0, 1]], 1000)
//logisticRegression([false,true,false,true,true,false,false,true,true,false,true,false],[[2,13,13,12,14,14,17,17,21,21,24,24],[3,4,4,9,4,4,2,6,5,9,11,4],[6,4,6,9,5,4,2,5,7,3,11,5]], 1000)
var M = new _.Matrix(
    new _.BooleanVector(0,1,0,1,1,0,0,1,1,0,1,0),
    new _.NumericVector(12,13,13,12,14,14,17,17,21,21,24,24),
    new _.NumericVector(3,4,4,9,4,4,2,6,5,9,11,4),
    new _.NumericVector(6,4,6,9,5,4,2,5,7,3,11,5),
)
var logreg = M.analyze("logreg").run(0,[1,2,3], 1000).result;
console.log(JSON.stringify(logreg));
debugger;
return;
//require("./docs")();
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

    

