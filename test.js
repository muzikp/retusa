var framework = require("./index");

with (framework) {
    var w = [0.25, 0.3, 0.3, 0.1, 0,5];
    var age = new NumericVector(15,16,17,19,20).weight(w).name();
    console.dir(framework.vectorModels.sum.wiki);
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