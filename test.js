const console = require("console");
const { vectorModels, NumericVector } = require("./index");
var framework = require("./index");
const { StringVector } = require("./libs/vector");

with (framework) {

    //var c = new StringVector("A","A","B","B","B","C","D","D","D","D", "D", "E","E","E","E").frequency(4);
    var c = StringVector.generate({total: 500, list: 5});
    console.table(c);

    debugger;
    return
    var a = new NumericVector( 3, 2,1,2,3,4,5).name("A");
    var b = new NumericVector( 6, 7,1,2,3,4,5).name("B");
    var c = new NumericVector(-2, -4, -7, -5, 8, 10).name("C");
    var M = new Matrix(a, b, c);
    var correl = M.correlPearson("A", b);
    
    debugger;
    return;

    framework.docs.publish(require("fs"));
    return;
    console.log(Math.pci(0.5,500,0.95));
    return;
    var x = new BooleanVector(true,true,true,true,true,false,false,false,false,false);
    var y = new NumericVector(3,5,4,6,5,7,8,9,1,11);
    var partial = new Matrix(x,y).correlBiserial(0,1);
    console.log(JSON.stringify(partial, null, "\t"));
    debugger;
    var reg = M.linreg(0,1);
    console.dir(reg.fn(190));
    debugger;
    console.log(JSON.stringify(reg, null, "\t"));
    return;
    framework.docs.publish(require("fs"));
    return;
    var M = new Matrix([160,160,162,163,161,170,172,177,179,178,182,184,183],[57,55,59,60,52,67,69,74,75,76,78,80,87]);
    console.log(M.linreg(0,1))
    debugger;
    var MW = M.mannwhitney(0,1);
    console.dir(MW);
    debugger;
    var sw = new NumericVector(2,2,3,3,4,4,5,5,6,7,8,9,10,11,10,9,8,7,7,6,6,5,5).shapirowilk(); 
    framework.docs.publish(require("fs"));
    /*
    var a = new NumericVector([3, 7, 5, 10, 9, 8, 4, 1, 6, 2]);
    var b = new NumericVector([4, 9, 2, 10, 8, 7, 6, 3, 5, 1]);
    var M = new Matrix(a,b);
    var cp = M.correlKendall(0,1);
    var cs = M.correlSpearman(0,1);
    console.log(cp);
    console.log(cs);
    debugger;
    */
    
}
