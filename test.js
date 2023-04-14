var _ = require("./index");
var st = require("./stress-test");

//require("./docs")({offset: 1, format: "markdown"});


var V = new _.NumericVector(11, 15, 9, 4, 34, 17, 18, 14, 12, 13, 26, 31).name("respondent score");
/* vrátí identickou kopii */
var _V = V.clone();
/* vrátí prázdnou kopii */
var __V = V.clone(true);
/* vrátí kopii vektoru s novými hodnotami z argumentu */
var C = V.reload(9, 8, 7, 6);
/* převede numerický vektor na textový */
var S = V.convert(2);
/* převede textový vektor na numerický za pomoci konverzní funkce */
var S = new _.StringVector("man", "man", "woman", "woman", "woman", null, "man", "woman");
var cV = S.convert(1, function (value) { return value == "man" ? 1 : value == "woman" ? 2 : null })
debugger;


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

    

