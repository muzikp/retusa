var framework = require("./index");

with (framework) {
    var score = new NumericVector(4.5, 3.9, 5, 6, 7, 5.7, 9.1, 5.3, 7.2, 6.9, 6, 7.5, 5.3, 7.1, 8.2, 1);
    console.log(score.count());
    var h1 = score.histogram(null, 2);
    //console.log(JSON.stringify(h1, null, "\t"))
    console.table(h1)
    debugger;
    //debugger;


    //console.dir(framework.vectorModels.percentile.markdown(3));
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

