const { NumericVector } = require("./index");
var framework = require("./index");

with (framework) {
    framework.docs.publish(require("fs"));
    return;
    //var v = new NumericVector([2,2,3,3,4,4,5,5,6,7,8,9,10,11,10,9,8,7,7,6,6,5,5]);
    //var x = v.sample(3);
    //debugger;
    //var v = [2,2,3,3,4,4,5,5,6,7,8,9,10,11,10,9,8,7,7,6,6,5,5].kolmogorovSmirnovTest();
    var v = new NumericVector([2,2,3,3,4,4,5,5,6,7,8,9,10,11,10,9,8,7,7,6,6,5,5]).pci(5, 0.95);
    var v = new NumericVector([2,2,3,3,4,4,5,5,6,7,8,9,10,11,10,9,8,7,7,6,6,5,5]).mci(0.95);
    //var v = [1.2, 1.6, 1.8, 1.9, 1.9, 2, 2.2, 2.6, 3, 3.5, 4, 4.8, 5.6, 6.6, 7.6].kolmogorovSmirnovTest();
    console.log(JSON.stringify(v,null,"\t"));
    debugger;
    return;


    var pudel = NumericVector.fromColumn(
            `Sloupec
            20
            19
            21
            22
            21
            18
            23
            22
            27
            16
            17
            19
            19
            21
            29
            24
            23
            25
            24
            21
            22
            19
            
    `
    ,{includeHeader: true})
    var pudel = new NumericVector(2,2,3,3,4,4,5,5,6,7,8,9,10,11,10,9,8,7,7,6,6,5,5).toColumn();
    console.log(pudel);
    debugger;
    return;
    var vector = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).name("Sloupec").toColumn(true);
    console.log(vector);
    return;
    var A = StringVector.generate({total: 10000, list: 5});
    var B = NumericVector.generate({total: 10000});
    var M = new Matrix(A,B).pivot(B,A).anovaow();
    debugger;
    return;
    var x = VectorOverview;
    var fs = require("fs");
    fs.writeFileSync("./docs/cs/vector.md", x)
    debugger
    //vectorOverview();
    
}
