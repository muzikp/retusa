var _ = require("./index");
var st = require("./stress-test");

require("./docs")({offset: 0});
return;
with (_) {
    var _M = new Matrix(
        new NumericVector(27,27,27,19,30,31).name("A"),
        new NumericVector(30,30,30,30,30,23).name("B"),
        new NumericVector(19,27,28,25,26,30).name("C"),
        new NumericVector(11,25,28,25,28,28).name("D"),
        new NumericVector(36,32,34,29,25,27).name("E")
    )
    var M = new Matrix(
        new NumericVector(7,14,14,13,12,9,6,14,12,8).name("fertilizer 1"),
        new NumericVector(15,17,13,15,15,13,9,12,10,8).name("fertilizer 2"),
        new NumericVector(6,8,8,9,5,14,13,8,10,9).name("fertilizer 3")
    )
    var kw_a = M.analyze("kwanova").run([0,1,2]);
    var kw_b = M.kwanova(["fertilizer 1", "fertilizer 2", "fertilizer 3"]);
    // kw_a.result = kw_b
    debugger;
    
}
require("./docs")({offset: 2});



return;

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

    

