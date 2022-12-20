const { Matrix } = require("./index");
const console = require("console");
var framework = require("./index");

with (framework) {
    //var M = new Matrix([1,2,3,4,5,6,7,8,9,10],[1,3,5,7,9,11,13,15,17,19]).mannwhitney(0,1);
    var M = new NumericVector(4.5,3.9,5,6,7,5.7,9.1,5.3,7.2,6.9,6,7.5,5.3,7.1,8.2,1).ttest(5);

    //var M = new StringVector("a","a","b","c").frequency();
    console.log(JSON.stringify(M,null,"\t"));
    return;
    //debugger;
    /*
    var a = new NumericVector([10,20,15,25,23,19,18,17,24,23]).name("A")
    console.dir(new NumericVector([10,20,15,25,23,19,18,17,24,23]).name("A").ttest(12));
    sdebugger;
    var b = new NumericVector([11,19,20,25,15,20,19,17,23,25]).name("B");
    var factor = new StringVector("A","B","A", "B", "C","C");
    var target = new NumericVector(3,4,7,8, -2, -7);
    console.table(new Matrix(factor, target).pivot(target, factor, []).toTable());
    debugger;
    var M = new Matrix(a, b);
    //var t = M.filter("A", (v) => v > 19, 1, (v) => v > 19);
    console.log(JSON.stringify(M.correlSpearman(0,1), null, "\t"))
    debugger;
    */
    
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

