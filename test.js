const { MatrixAnalysis } = require("./index");
var framework = require("./index");

with (framework) {
    //require("./docs")();
    var M = new Matrix(
        new NumericVector(180,197,240,210,180,160,179,185,183,150,110,190,170).name("proměnná x"),
        new NumericVector(75,82,100,80,75,60,75,71,77,63,46,81,70).name("proměnná y")
    );
    //var analysis = M.analyze("linreg").run(0,1,4);
    var analysis = M[0].analyze("histogram").run();
    var params = analysis.parameters();
    console.log(analysis);
    debugger;

    
}
