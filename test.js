var _ = require("./index");
var st = require("./stress-test");

require("./docs")({offset: 1, format: "markdown"});

var T = new _.Matrix(
    new _.NumericVector(14, 15, 15, 15, 16, 18, 22, 23, 24, 25, 25).name("alpha"),
    new _.NumericVector(10, 12, 14, 15, 18, 22, 24, 27, 31, 33, 34, 34, 34).name("beta")
);
var welch = T.analyze("welchttest").run({vectors: [0,1]});
console.log(T.analyze("ttestind").run({vectors: [0,1]}));
console.log(welch.result);
debugger;
return;

var M = new _.Matrix(
    new _.StringVector("A","A","A","A","A","B","B","B","B","B","C","C","C","C","C").name("study technique"),
    new _.NumericVector(67,88,75,77,85,92,69,77,74,88,96,91,88,82,80).name("Current grade"),
    new _.NumericVector(77,89,72,74,69,78,88,93,94,90,85,81,83,88,79).name("Exam score")
)
var ANCOVA = M.analyze("ancova").run(0,2,1);
console.log(ANCOVA.result);
debugger;
return;

var M = new _.Matrix(
    new _.StringVector(1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,5,5,5,5,5,5).name("factor"),
    new _.NumericVector(27,27,27,19,30,31,30,30,30,30,30,23,19,27,28,25,26,30,11,25,28,25,28,28,36,32,34,29,25,27).name("vector"),
);
var anova = M.analyze("anovaow").run({vectors: [1], factor: 0});
console.log(JSON.stringify(anova.result, null, "\t"))
debugger;
return;

/*
var T = new _.Matrix(
    new _.StringVector("patient A", "patient B", "patient C", "patient D", "patient E").name("patient"),
    new _.NumericVector(30,14,24,38,26).name("drug 1"),
    new _.NumericVector(28,18,20,34,28).name("drug 2"),
    new _.NumericVector(16,10,18,20,14).name("drug 3")
)
var a = T.analyze("anovaowrm").run([1,2,3]);
debugger;
return;
*/


var T = new _.Matrix(
    new _.StringVector("daily","daily","daily","daily","daily","daily","daily","daily","daily","daily","daily","daily","daily","daily","daily","daily","daily","daily","daily","daily","weekly","weekly","weekly","weekly","weekly","weekly","weekly","weekly","weekly","weekly","weekly","weekly","weekly","weekly","weekly","weekly","weekly","weekly","weekly","weekly").name("watering frequency"),
    new _.StringVector("none","none","none","none","none","low","low","low","low","low","medium","medium","medium","medium","medium","high","high","high","high","high","none","none","none","none","none","low","low","low","low","low","medium","medium","medium","medium","medium","high","high","high","high","high").name("sunlight exposure"),
    new _.NumericVector(4.8, 4.4, 3.2, 3.9, 4.4, 5, 5.2, 5.6, 4.3, 4.8, 6.4, 6.2, 4.7, 5.5, 5.8, 6.3, 6.4, 5.6, 4.8, 5.8, 4.4, 4.2, 3.8, 3.7, 3.9, 4.9, 5.3, 5.7, 5.4, 4.8, 5.8, 6.2, 6.3, 6.5, 5.5, 6, 4.9, 4.6, 5.6, 5.5).name("plant growth")
);
var twa = T.analyze("anovatw").run(0,1,2);


debugger;
return;


var T = new _.Matrix(
    new _.NumericVector(1,5,1,5,8),
    new _.NumericVector(2,5,4,3,1),
    new _.NumericVector(3,6,2,2,2),
    new _.NumericVector(4,7,3,1,2)
    );
var cm = T.analyze("pca").run([0,1,2,3]);
console.log(cm.result);
debugger;
return;


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

    

