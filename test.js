var _ = require("./index");
var st = require("./stress-test");

require("./docs")({offset: 0});

with (_) {
    var M = new Matrix(
        new NumericVector(78,78,60,53,85,84,73,78,78,75,65,72,58,92,65).name("Life exp"),
        new NumericVector(4,23,25,48,17,8,4,26,23,19,24,35,29,4,14).name("cigarettes")
    );
    var tau1 = M.analyze("correlKendall").run(0,1);
    var tau2 = M.correlKendall(0,1);

    debugger;
}

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

    

