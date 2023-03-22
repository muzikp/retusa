var _ = require("./index");
var st = require("./stress-test");

//require("./docs")({offset: 1, format: "markdown"});


var M = new _.Matrix(new _.NumericVector(11, 15, 9, 4, 34, 17, 18, 14, 12, 13, 26, 31), new _.NumericVector(34, 31, 35, 29, 28, 12, 18, 30, 14, 22, 10));
var sampledM = M.sample(0.5);
debugger;
console.log(JSON.stringify(sampledM));
debugger;


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

    

