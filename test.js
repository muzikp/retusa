var framework = require("./index");

with (framework) {
    var n = NumericVector.generate({total: 100, min: 0, nullprob: 0.5});
    console.log(n);
    debugger;


    var loop = [];
    for(var i = 0; i < 10; i++) {
        var start = Date.now();
        var gen = NumericVector.generate({min: -20000, max: 20000, decimal: 2, total: 1000000, nullprop: 0.1});
        loop.push((Date.now() - start)/1000);
    }
    console.log(loop);
    debugger;
    console.log("HJnůj")
    var T = new Matrix([4,5,6,7,8,9,10],[5,5,6,7,8,9,10]).ttestind(0,1);
    var n = new NumericVector(5,4,5,6,7,6,9,5,7,7,6,8,5,7,8,1).mci();
    console.log(JSON.stringify(n, null, "\t"));
    debugger;
    var M = new Matrix([4,5,6,7,8,9,10],[5,5,6,7,8,9,10]).correlPearson(0,1);
    //debugger;
    //return;
    var x = VectorOverview;
    var fs = require("fs");
    fs.writeFileSync("./docs/cs/vector.md", x)
    debugger
    //vectorOverview();
    
}

function vectorOverview() {
    var vector = new framework.NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19);
    var overview = [
        {method: "sum", value: vector.sum()},
        {method: "count", value: vector.count()},
        {method: "avg", value: vector.avg()},
        {method: "stdev", value: vector.stdev()},
        {method: "variance", value: vector.variance()},
        {method: "min", value: vector.min()},
        {method: "max", value: vector.max()},
        {method: "range", value: vector.range()},
        {method: "varc", value: vector.varc()},
        {method: "range", value: vector.range(true)},
        {method: "0.25 percentile", value: vector.percentile(0.25)},
        {method: "geomean", value: vector.geomean()},
        {method: "harmean", value: vector.harmean()},
        {method: "median", value: vector.median()},
        {method: "mode", value: vector.mode()},
        {method: "SEM", value: vector.SEM()},
        {method: "median", value: vector.median()},
        {method: "skewness", value: vector.skewness()},
        {method: "kurtosis", value: vector.kurtosis()},
    ]
    console.table(overview);
    console.table(vector.histogram());
    console.table(vector.frequency(4));
    debugger;
}

