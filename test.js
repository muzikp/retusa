const { vectorModels, NumericVector } = require("./index");
var framework = require("./index");
const { StringVector } = require("./libs/vector");

//framework.docs.publish(require("fs"));

with (framework) {
    var docs = require("./docs");
    docs();
    //debugger;
    return;






    /* with factor */
    var x = new NumericVector(9,7,5,3,5,1,3,2,2,4).name("score");
    var y = new StringVector("A","A","A","A","A","B","B","B","B","B").name("group");
    var M = new Matrix(x,y);
    M.mwu(0,1); // direct - vector and factor specified, arguments as vector indexes
    M.mwu("score",1) // direct - vector and factor specified, arguments as vector indexes
    M.mwu({vectors: 0, factor: "group"})
    M.mwu({vectors: [0], factor: 1}) // direct calling - returns the output
    M.analyze("mwu").run(0,1)
    M.analyze("mwu").run("score",1)
    M.analyze("mwu").run({vectors: 1, factor: "y"})
    M.analyze("mwu").run({vectors: [1], factor: 2}) // analysis calling - returns the analytical bundle with metadata
    /* without factor - the vectors argument must be wrapped in an array! */
    var x = new NumericVector(9,7,5,3,5).name("x");
    var y = new NumericVector(1,3,2,2,4).name("y");
    var M = new Matrix(x,y);
    M.mwu([0,1]), M.mwu(["x",1]), M.mwu({vectors: [0,1]}), M.mwu({vectors: ["x","y"]}), M.mwu({vectors: [x,y]}) // direct calling - returns the output
    M.analyze("mwu").run([0,1]), M.analyze("mwu").run(["x",1]), M.analyze("mwu").run({vectors: [0,1]}), M.analyze("mwu").run({vectors: ["x","y"]}), M.analyze("mwu").run({vectors: [x,y]}) // direct calling - returns the output



    const parent = new Matrix(
        new NumericVector(50,45,33,22,99,79,4,36,62,51,27,15,26,83,86,120).name("right"),
        new NumericVector(47,45,31,24,78,76,13,46,45,44,23,14,34,79,81,80).name("left"),
        new StringVector("wife","wife","wife","wife","wife","wife","wife","wife","husband","husband","husband","husband","husband","husband","husband","husband").name("group")
    );
    var MWUwiki = parent.analyze("mwu2").run([0,1]);
    var docs = parent.analyze("mwu2").toMarkdown();
    var MWU = parent.mwu2(0,2);
    debugger;

    return;

    /*
    var M = new Matrix(
        new NumericVector(50,45,33,22,99,79,4,36,62,51,27,15,26,83,86).name("right"),
        new NumericVector(47,45,31,24,78,76,13,46,45,44,23,14,34,79,81).name("left")
    );
    var M = new Matrix(
        new NumericVector(180,197,240,210,180,160,179,185,183,150,110,190,170),
        new NumericVector(75,82,100,80,75,60,75,71,77,63,46,81,70)
    );
    */
    var M = new Matrix(
        new NumericVector(15,8,11,19,13,4,16,5,9,15,12,11,14,4,11,17,14,5,9,8,9,11,11,12,17,12,5,5,15,0),
        new NumericVector(17,19,18,19,17,5,13,0,16,21,12,9,10,17,12,24,12,12,8,16,12,7,17,13,20,9,13,11,11,12)
    );
    //var t = M.wcxpaired(0,1);
    var t = M.analyze("mwu2").with({vectors: 2});
    console.dir(t);
    debugger;


    /*
    locale.setDefault("en-GB");
    framework.docs.publish(require("fs"));
    return;
    */
    //var arr = [...Array(40).keys()].map((e,i,a) => i * 0.1).map(e => utils.distribution.normdist(e,10,5)).toCSV(",");
    //console.log(arr);
    //debugger;
    var M = new Matrix(
        new NumericVector(1,2,3,4,4,5,6,7,7,8,9,10,11,11,12,13,14,15,16,16).name("proměnná x"),
        new NumericVector(20,19,2,4,5,7,6,8,9,10,10,20,13,12,14,13,19,16,18,6).name("proměnná y"),
        new NumericVector(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20).name("proměnná z"),
        new BooleanVector(0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1).name("proměnná b")
    );
    //var Mf = M.filter("proměnná x", function(v,i,a) {return v > 10});
    var correl = new MatrixAnalysis("genreg")//.run(0,1,1).wiki;
    debugger;
    return;    


    var KW = new Matrix(
        new NumericVector(4,5,6,7,7,8,9,10,11,11,12,13,14,15,16,16,20,19,2,4,5,7,6,8,9,10,10,20,13,12,14,13,19,16,18,6,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20).name("vektor"),
        new StringVector(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3).name("faktor")
    )
        var spearman = M.analyze("correlSpearman").run(0,1);
        var kendall = M.analyze("correlKendall").run(0,1);
        var partial = M.analyze("correlPartial").run(0,1,2);
        var biserial = M.analyze("correlBiserial").run(3,0);
        var kwanova = KW.analyze("kwanova").run([0],1);
        //console.log(spearman.result);
        //console.log(kendall.result);
        //console.log(biserial.result);
        console.log(kwanova.result);

    debugger;
    return;
    var a1 = new NumericVector(null, 1,2,3,4,5,6,9).name("A 1");
    var a2 = new NumericVector(-4, 7,6,3,4,5,6, 7).name("A 2");
    var a3 = new NumericVector(-2,-3,-4,-5,-4,-3,-2,-1).name("A 3");
    var a4 = new StringVector("A", "A","A","A","B","B","B", null).name("A 4");
    var b1 = new NumericVector(4,5,6,7,8,9,1,3,2,1,2,1);
    var b2 = new StringVector("A","A","A","A","A","A","B","B","B","B","B","B");
    var M = new Matrix(a1,a2,a3,a4);
    //var M = new Matrix(b1,b2);
    var mwu = M.analyze("mwu").run([0,1]);
    debugger;
    return;

    var x = new NumericVector(180,197,240,210,180,160,179,185,183,150,110,190,170).name("X");
    var y = new NumericVector(75,82,100,80,75,60,75,71,77,63,46,81,70).name("Y");
    var m = new Matrix(x,y);
    var reg = m.analyze("genreg").run(0,1,5);
    console.log(JSON.stringify(reg.duration(), null, "\t"));
    debugger;
    return;
    var a = new StringVector("A","A","A","B","B","B","C","C","C","D","D","D");
    var b = new StringVector("ZŠ","SŠ","VŠ","ZŠ","SŠ","VŠ","ZŠ","SŠ","VŠ","ZŠ","SŠ","VŠ");
    var n = new NumericVector(39,17,12,25,30,41,25,40,62,27,29,53);
    var m = new Matrix(a,b,n).name("nic");
    //var c1 = m.analyze("contingency").run(0,1);
    //console.log(m.serialize());
    console.log(m.toTable({limit: 3, offset: 11}))
    debugger;
    return;
    
    var matrix = Matrix.deserialize(data);
    //console.log(matrix.correlPearson(0,1));
    //console.log(matrix.correlSpearman(0,1));
    //console.log(matrix.correlKendall(0,1));
    console.log(utils.distribution.tdist(2,10, true));
    debugger;
    return;
    var a = new NumericVector( 3, 2,1,2,3,4,5, null, 6).name("A");
    var b = new NumericVector( 6, 7,1,2,3,4,5, 6, null).name("B");
    var M = new Matrix(a, b);
    var data = JSON.stringify(M.serialize());
    console.log(Matrix.deserialize(data));
    debugger;
    return;
    var analysis = M.analyze("correlPearson");
    analysis.run(0,"B");
    console.dir(analysis.schema);
    debugger;
    return;


    var c = new NumericVector(1,2,3,null,0,7,null,8,4,5);
    var an = c.analyse("pci").validate(3).run();
    console.log(an);
    debugger;
    return;
    var matrix = new Matrix();
    var pearson = matrix.model("correlPearson");
    console.log(pearson);
    debugger;
    var c = new StringVector("A","A","B","B","B","C","D","D","D","D", "D", "E","E","E","E").frequency(4);
    var c = NumericVector.generate({total: 500, min: 200, max: 500, nullprob: 0.2}).name("Randoms");
    var text = c.model("avg").wiki.filter;
    var size = c.filter(c.model("avg").filter).length;

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
