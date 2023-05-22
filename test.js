var _ = require("./index");
var st = require("./stress-test");

require("./docs")({offset: 1, format: "markdown"});

var T = new _.Matrix(
    new _.StringVector("patient A", "patient B", "patient C", "patient D", "patient E").name("patient"),
    new _.NumericVector(30,14,24,38,26).name("drug 1"),
    new _.NumericVector(28,18,20,34,28).name("drug 2"),
    new _.NumericVector(16,10,18,20,14).name("drug 3")
)
var a = T.analyze("anovaowrm").run([1,2,3]);
debugger;
return;



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

    

