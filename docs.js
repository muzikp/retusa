var {Matrix, MatrixAnalysis} = require("./libs/matrix");
var {Vector, NumericVector, StringVector, BooleanVector, VectorAnalysis} = require("./libs/vector");
var {Argument} = require("./libs/argument");
var {Output} = require("./libs/output");
var locale = require("./libs/locale");
//locale.setDefault("en-GB");
var $ = locale.call
var vectorMethods = [
    "sum",
    "count",
    "mode",
    "avg",
    "min",
    "max",
    "range",
    "geomean",
    "harmean",
    "median",
    "percentile",
    "stdev",
    "variance",
    "varc",
    "histogram",
    "frequency",
    "sem",
    "skewness",
    "kurtosis",
    "mci",
    "pci",
    "ttest",
    "swtest",
    "kstest"    
]
var matrixMethods = [
    "linreg",
    "correlPearson",
    "correlSpearman",
    "correlKendall",
    "correlPartial",
    "correlBiserial",
    "anovaow",
    "ttestind",
    "ttestpair",
    "mwu",
    "wcxpaired",
    "friedman"]

String.prototype.firstUp = function() {
    return this[0].toLocaleUpperCase() + this.slice(1);
}

Vector.toMarkdown = function(){
    // title and overview
    var doc = "";
    //var doc = `# ${$("XY70")}\n\n${$("Ld1F")}\n\n${$("ISCX")}\n\n${$("1Tcp")}\n\n`;
    doc += `| ${$("wRbe")} | ${$("rlTY")} |\n| :--- | :--- |\n`;
    doc += vectorMethods.map(function(m) {
        var ma = new VectorAnalysis(m);
        return `| ${ma.name} | [${ma.title.value.firstUp()}](#${ma.name}) |`
    }).join("\n");
    doc += "\n\n";
    doc += vectorMethods.map(function(m){
        return new VectorAnalysis(m).toMarkdown();
    }).join("\n\n");
    return doc;
}

Matrix.toMarkdown = function(){
    // title and overview
    var doc = `# ${$("XY70")}\n\n${$("Ld1F")}\n\n${$("ISCX")}\n\n${$("1Tcp")}\n\n`;
    doc += `| ${$("wRbe")} | ${$("rlTY")} |\n| :--- | :--- |\n`;
    doc += matrixMethods.map(function(m) {
        var ma = new MatrixAnalysis(m);
        return `| ${ma.name} | [${ma.title.value.firstUp()}](#${ma.name}) |`
    }).join("\n");
    doc += "\n\n";
    doc += matrixMethods.map(function(m){
        return new MatrixAnalysis(m).toMarkdown();
    }).join("\n\n");
    return doc;
}

Output.prototype.toMarkdown =function(analysis){
    var m = "```mermaid\ngraph TD\n";
    if(this.type == "object") {
        m += createObjectPropertyMarkdown(this);
    } else if(this.type == "array") {
       m += createObjectPropertyMarkdown(this);
    } else {
        m += `A[<b>${analysis ? mmb(analysis.title.value) : ""}<br></b>${mmb(this.title.value)}]`
    } 
    m += "\n```";
    return m;
}

function createObjectPropertyMarkdown(parent) {
    var m = "";
    for(let p of Object.entries(parent.properties || parent.items.properties).map(e => e[1])) {
        if(p.type == "object") {
            m += `${parent.name} --> ${p.name}((<b>${p.name}</b><br><u>${mmb(p.title.value)}</u>))\n`;
            m += createObjectPropertyMarkdown(p)
        }
        else if(p.type == "array") {
            m += `${parent.name} --> ${p.name}[[<b>${p.name}</b><br>${mmb(p.title.value)}]]\n`;
            m += createObjectPropertyMarkdown(p)
        }
        else {
            m += `${parent.name} --> ${p.name}[<b>${p.name}</b><br>${mmb(p.title.value)} <br><i>${mmb(formatMdPrimitiveType(p.type))}</i>]\n`;
        }
    }
    return m;
}

/** Replaces mermaid sensitive characters (brackets etc.) */
function mmb(str) {
    return str.replace(/[\[\](){}<>]/g, "");
}

function formatMdPrimitiveType(value) {
    if(value == "number" || "zeroToOneInc") return `${$("pelN")}`;
    else if(value == "integer") return `${$("DQnl")}`;
    else if(value == "uint") return `${$("IrhN")}`;
    //else if(value == "zeroToOneInc") return `${$("OQnL")}`;
    else if(value == "string") return `${$("RFGF")}`;
    else if(value == "boolan") return `${$("XPGc")}`;
    else return "???"
    
}

MatrixAnalysis.prototype.toMarkdown = function(){
    var m = `## [${this.title.value.firstUp()}](#${this.name})\n\n${this.description.value ? this.description.value + "\n\n": ""}`;    
    /* arguments */
    var headers = ["QUJS","jBGO","dmmV","tGqA","VPYX","pDgb"];
    m += `### ${$("FRpk")}\n\n`
    m += "| " + headers.map(h => $(h) + " |").join("") + "\n";
    m += "| " + headers.map(h => ":--- |").join("")  + "\n";
    for(let a of Object.keys(this.model.args)) {
        m += new Argument(this.model.args[a].model, null, this.model.args[a].config).toMarkdown();
    }
    if(this.preprocessor.value) m += `\n### ${"Preprocessor"}\n\n${this.preprocessor.value}\n\n`;
    if(examples[this.name]) {
        m += `### ${$("nzmJ")}\n\n`;
        if(typeof examples[this.name] == "function") {
            m += "```js\n" + e.stringify() + "\n```\n\n"
        }
        else {
            for(var e of examples[this.name]) {
                m += `#### ${$(e.title ? e.title + "\n\n" : "")}${e.description ? '<sub>' + $(e.description) + "</sub>\n\n" : ""}` + "```js\n" + e.code.stringify() + "\n```\n\n"
            }
        }
        
    }
    if(this.model.output) {
        m += "### Schéma výstupu\n\n" + new Output(this.model.output).toMarkdown();
    }
    return m;
}

VectorAnalysis.prototype.toMarkdown = function(){
    var m = `## [${this.title.value.firstUp()}](#${this.name})\n\n${this.description.value ? this.description.value + "\n\n": ""}`;    
    if(this.model.args) {
        /* arguments */
        var headers = ["QUJS","jBGO","dmmV","tGqA","VPYX","pDgb"];
        m += `### ${$("FRpk")}\n\n`
        m += "| " + headers.map(h => $(h) + " |").join("") + "\n";
        m += "| " + headers.map(h => ":--- |").join("")  + "\n";
        for(let a of Object.keys(this.model.args)) {
            m += new Argument(this.model.args[a].model, null, this.model.args[a].config).toMarkdown();
        }
    }
    if(this.preprocessor.value) m += `\n### ${"Preprocessor"}\n\n${this.preprocessor.value}\n\n`;
    if(examples[this.name]) {
        m += `### ${$("nzmJ")}\n\n`; // syntax example header
        if(typeof examples[this.name] == "function") {
            m += "```js\n" + examples[this.name].stringify() + "\n```\n\n"
        }
        else {
            for(var e of examples[this.name]) {
                m += `${$(e.title ? "#### " + $(e.title) + "\n\n" : "")}${e.description ? '<sub>' + $(e.description) + "</sub>\n\n" : ""}` + "```js\n" + e.code.stringify() + "\n```\n\n"
            }
        }
        
    }
    if(this.model.output) {
        m += `### ${$("l43h")}\n\n` + new Output(this.model.output).toMarkdown(this);
    }
    return m;
}

Argument.prototype.toMarkdown = function(){
    var validator = this.isEnum ? this.validator.value + "<br><br>" : this.validator.value;
    if(this.isEnum) {
        for(let e of this.enums) {
            validator += `<b>${e.value}</b> = ${e.title}<br>`
        }
    }
    return `| <b>${this.name || ""}</b> | ${this.title.value} | ${this.mdType.value} | <sub>${validator ? validator : "-"}<sub> | ${this.required ? "✔️" : ""} | ${this.default !== undefined ? this.default : ""} |\n`;
    
};

const examples = {
    sum: function(){
        var cashflow = new NumericVector(200,250,150,320,240,-250,10,-320).sum();  /* = 600 */
    },
    count: function(){
        var total_numeric = new NumericVector(200,250,null,150,320,240,-250,null,10,-320).count();  /* = 10 */
        var total_string = new StringVector("A","B","C","D").count();  /* = 4 */
        var total_boolean = new BooleanVector(true, true, false, null, false, true).count();  /* = 6 */
    },
    avg: function(){
        var avgCashFlow = new NumericVector(200,250,150,320,240,-250,10,-320).avg();  /* = 75 */
    },
    stdev: function(){
        var population = new NumericVector(10,20,15,25,23,19,18,17,24,23).stdev();  /* = 4.41 */
        var sample = new NumericVector(10,20,15,25,23,19,18,17,24,23).stdev(true); /* = 4.65 */ 
    },
    variance: function(){
        var population = new NumericVector(10,20,15,25,23,19,18,17,24,23).variance();  /* = 19.44 */
        var sample = new NumericVector(10,20,15,25,23,19,18,17,24,23).variance(true); /* = 21.6 */ 
    },
    histogram: [
        {
            name: "example1",
            title: "2zlT",
            description: "X8Ft",
            code: function(){
                var score = new NumericVector(4.5,3.9,5,6,7,5.7,9.1,5.3,null, 7.2,6.9,6,7.5,5.3,7.1,8.2,1, null);
                var h1 = score.histogram();
                var h2 = score.analyze("histogram").run();
                // h1 = h2.result
            }
        },
        {
            name: "example2",
            title: "lh3Z",
            description: "mHb0",
            code: function(){
                var score = new NumericVector(4.5,3.9,5,6,7,5.7,9.1,5.3,7.2,6.9,6,7.5,5.3,7.1,8.2,1);
                var h1 = score.histogram(4);
                var h2 = score.analyze("histogram").run(4);
                var h3 = score.histogram({max: 4});
                var h4 = score.analyze("histogram").run({max: 4});
                // h1 = h3 = h2.result = h4.result
            }
        },
        {
            name: "example3",
            title: "3Pll",
            description: "AZXR",
            code: function(){
                var score = new NumericVector(4.5,3.9,5,6,7,5.7,9.1,5.3,7.2,6.9,6,7.5,5.3,7.1,8.2,1);
                var h1 = score.histogram(null, 3);
                var h2 = score.analyze("histogram").run(null, 3);
                var h3 = score.histogram({fix: 3});
                var h4 = score.analyze("histogram").run({fix: 3});
                // h1 = h3 = h2.result = h4.result
            }
        }
    ],
    min: function(){
        var numeric_min = new NumericVector(4.5, 3.9, 5, 6, 7, 5.7, 9.1, 5.3, 7.2, 6.9, 6, 7.5, 5.3, 7.1, 8.2, 1).min(); /* = 1 */;
        var string_min = new StringVector("Norwood", "Pearson", "Fisher", "Nightingale", "Gauss", "Poisson").min(); /* = Fisher */
    },
    max: function(){
        var numeric_max = new NumericVector(4.5, 3.9, 5, 6, 7, 5.7, 9.1, 5.3, 7.2, 6.9, 6, 7.5, 5.3, 7.1, 8.2, 1).max(); /* = 9.1 */;
        var string_max = new StringVector("Norwood", "Pearson", "Fisher", "Nightingale", "Gauss", "Poisson").max(); /* = Poisson */
    },
    range: function(){
        var range = new NumericVector(5,2,-15,-16.3,12,null, null, 12,13,7).range(); /* = 22 */
    },
    varc: function(){
        var population = new NumericVector(10,20,15,25,23,19,18,17,24,23).varc();  /* = 0.227 */
        var sample = new NumericVector(10,20,15,25,23,19,18,17,24,23).varc(true); /* = 0.24 */ 
    },
    percentile: function(){
        var score = new NumericVector(10,20,15,25,23,19,18,17,24,23);
        var median = score.percentile(0.5); /* = 19.5 */
        var q25 = score.percentile(0.25); /* = 17.25 */
        var max = score.percentile(1); /* = 25 */
    },
    frequency: [
        {
            name: "example1",
            title: "",
            description: "",
            code: function(){
                var numeric_vector_no_order = new NumericVector(5,2,3,2,3,3,1,6,3).frequency();
            }            
        },
        {
            name: "example1",
            title: "",
            description: "",
            code: function(){
                var string_vector_desc_value = new StringVector("E","B","C","B","C","C","A","F","C").frequency({order: 3});
            }            
        },
        {
            name: "example1",
            title: "",
            description: "",
            code: function(){
                var boolean_vector_desc_frequency = new BooleanVector(true, false, null, true, null, null).frequency(4);
            }            
        }
    ],
    geomean: function(){
        var x = new framework.NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).geomean(); /* = 21.24*/
    },
    harmean: function(){
        var x = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).harmean(); /* = 21.03*/
    },
    median: function(){
        var median = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).median(); /* = 21*/
    },
    mode: function(){
        var x = new NumericVector(1,2,3,4,3,4,5,3).mode(); /* = 3 */
        var y = new StringVector("a",null,null,"b","c","d",null,"b").mode(); /* = null */
        var z = new BooleanVector(true, false, true).mode(); /* = true */
    },
    sem: function(){
        var sem = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).SEM(); /* = 0.67*/
    },
    skewness: function(){
        var skewness_population = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).skewness(); /* = 0.52*/
        var skewness_sample = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).skewness(true); /* = 0.027*/
    },
    kurtosis: function(){
        var kurtosis = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).kurtosis(); /* = 0.425*/
    },
    ttest: function() {
        var T = new NumericVector(4.5,3.9,5,6,7,5.7,9.1,5.3,7.2,6.9,6,7.5,5.3,7.1,8.2,1).ttest(10);
    },
    mci: function(){
        var v = new NumericVector([2,2,3,3,4,4,5,5,6,7,8,9,10,11,10,9,8,7,7,6,6,5,5]).mci(0.95);
    },
    pci: function(){
        var v = new NumericVector([2,2,3,3,4,4,5,5,6,7,8,9,10,11,10,9,8,7,7,6,6,5,5]).pci(5, 0.95);
    },
    swtest: function(){
        var sw = new NumericVector(2,2,3,3,4,4,5,5,6,7,8,9,10,11,10,9,8,7,7,6,6,5,5).swtest(); 
    },
    kstest: function(){
        var sw = new NumericVector(2,2,3,3,4,4,5,5,6,7,8,9,10,11,10,9,8,7,7,6,6,5,5).kstest(); 
    },
    correlPearson: [
        {
            name: "example1",
            code: function() {
                var M = new Matrix(
                    new NumericVector(180,197,240,210,180,160,179,185,183,150,110,190,170).name("height"),
                    new NumericVector(75,82,100,80,75,60,75,71,77,63,46,81,70).name("weight")
                );
                var rxy_a = M.analyze("correlPearson").run(0,1);
                var rxy_b = M.correlPearson("height","weight");
                // rxy_a.result = rxy_b

            }
        }
    ],
    correlSpearman: [
        {
            name: "example1",
            code: function() {
                var M = new Matrix(
                    new NumericVector(3,7,5,10,9,8,4,1,6,2).name("design rating"),
                    new NumericVector(4,9,2,10,8,7,6,3,5,1).name("utility rating")
                );
                var rs_a = M.analyze("correlSpearman").run(0,1);
                var rs_b = M.correlSpearman("design rating","utility rating");
                // rs_a.result = rs_b

            }
        }
    ],
    correlKendall: [
        {
            name: "example1",
            code: function() {
                var M = new Matrix(
                    new NumericVector(3,7,5,10,9,8,4,1,6,2).name("design rating"),
                    new NumericVector(4,9,2,10,8,7,6,3,5,1).name("utility rating")
                );
                var rk_a = M.analyze("correlKendall").run(0,1);
                var rk_b = M.correlKendall("design rating","utility rating");
                // rk_a.result = rk_b

            }
        }
    ],
    correlPartial: [
        {
            name: "example1",
            code: function() {
                var M = new Matrix(
                    new NumericVector(180,197,240,210,180,160,179,185,183,150,110,190,170).name("x"),
                    new NumericVector(75,82,100,80,75,60,75,71,77,63,46,81,70).name("y"),
                    new NumericVector(79,81,103,84,72,55,78,76,82,65,49,83,74).name("z")
                );
                var rp_a = M.analyze("correlPartial").run(0,1,2);
                var rp_b = M.correlPartial("x","y","z");
                // rp_a.result = rp_b

            }
        }
    ],
    mwu: [
        {
            name: "example1",
            title: "bkfk",
            description: "BE4u",
            code: function() {
                var M = new Matrix(
                    new NumericVector(4,5,6,7,8,9,10,7,7,6).name("x"),
                    new NumericVector(10,11,9,8,7,8,9,4,5,10).name("y")
                );
                var mwu_a = M.analyze("mwu").run({vectors: [0,1]});
                var mwu_b = M.mwu({vectors: [0,1]});
                // mwu_a.result === mqu_b
            }
        },
        {
            name: "example2",
            title: "vO3D",
            description: "D9Ro",
            code: function() {
                var M = new Matrix(
                    new NumericVector(4,5,6,7,8,9,10,7,7,6).name("x"),
                    new NumericVector(10,11,9,8,7,8,9,4,5,10).name("y")
                );
                var mwu_a = M.analyze("mwu").run([0,1]);
                var mwu_b = M.mwu(["x","y"]);
                // mwu_a.result === mqu_b
            }
        },
        {
            name: "example3",
            title: "ppR3",
            description: "SQSt",
            code: function() {
                var M = new Matrix(
                    new NumericVector(4,5,6,7,8,9,10,7,7,6,10,11,9,8,7,8,9,4,5,10).name("score"),
                    new StringVector("A","A","A","A","A","A","A","A","A","A","B","B","B","B","B","B","B","B","B","B",).name("group")
                );
                var mwu_a = M.analyze("mwu").run({vectors: 0, factor: 1});
                var mwu_b = M.mwu({vectors: 0, factor: 1});
                var mwu_c = M.analyze("mwu").run(0, 1);
                var mwu_d = M.mwu(0, 1);
                var mwu_e = M.analyze("mwu").run([0], 1);
        }
        }
    ],
    linreg: [
        {
            name: "example1",
            code: function(){
                var M = new Matrix(
                    new NumericVector(180,197,240,210,180,160,179,185,183,150,110,190,170).name("independent x"),
                    new NumericVector(75,82,100,80,75,60,75,71,77,63,46,81,70).name("dependent y")
                );
                var lr_a = M.linreg(0,1); // with model argument missing (set to 1 by default)
                var lr_b = M.linreg(0,1,4); // regression model set to 4 (exponential transformation)
                var lr_c = M.analyze("linreg").run({x: 0, y: "dependent y", model: undefined}); // same as lr_a
                var lr_b = M.analyze("linreg").run({x: "independent x", y: 1, model: 4}); // same as lr_b
                // lr_a = lr_c.result
                // lb_b = lr_d.result
            }
        }
    ],
    anovaow: [
        {
            name: "example1",
            code: function() {
                var M = new Matrix(
                    new NumericVector(180,197,240,210,180,160,179,185,183,150,110,190,170).name("x"),
                    new NumericVector(75,82,100,80,75,60,75,71,77,63,46,81,70).name("y"),
                    new NumericVector(275,282,300,280,275,260,275,271,277,263,246,281,270).name("z")
                );
                var anova = M.analyze("anovaow").run({vectors: [0,1,2]});
            }
        }
    ],
    ttestind: [
        {
            name: "example1",
            title: "bkfk",
            description: "BE4u",
            code: function() {
                var M = new Matrix(
                    new NumericVector(4,5,6,7,8,9,10,7,7,6).name("x"),
                    new NumericVector(10,11,9,8,7,8,9,4,5,10).name("y")
                );
                var ttestind_a = M.analyze("ttestind").run({vectors: [0,1]});
                var ttestind_b = M.ttestind({vectors: [0,1]});
                // ttestind_a.result === mqu_b
            }
        },
        {
            name: "example2",
            title: "vO3D",
            description: "D9Ro",
            code: function() {
                var M = new Matrix(
                    new NumericVector(4,5,6,7,8,9,10,7,7,6).name("x"),
                    new NumericVector(10,11,9,8,7,8,9,4,5,10).name("y")
                );
                var ttestind_a = M.analyze("ttestind").run([0,1]);
                var ttestind_b = M.ttestind(["x","y"]);
                // ttestind_a.result === mqu_b
            }
        },
        {
            name: "example3",
            title: "ppR3",
            description: "SQSt",
            code: function() {
                var M = new Matrix(
                    new NumericVector(4,5,6,7,8,9,10,7,7,6,10,11,9,8,7,8,9,4,5,10).name("score"),
                    new StringVector("A","A","A","A","A","A","A","A","A","A","B","B","B","B","B","B","B","B","B","B",).name("group")
                );
                var ttestind_a = M.analyze("ttestind").run({vectors: 0, factor: 1});
                var ttestind_b = M.ttestind({vectors: 0, factor: 1});
                var ttestind_c = M.analyze("ttestind").run(0, 1);
                var ttestind_d = M.ttestind(0, 1);
                var ttestind_e = M.analyze("ttestind").run([0], 1);
            }
        }
    ],
    ttestpair: [
        {
            name: "example1",
            code: function() {
                var M = new Matrix(
                    new NumericVector(4,5,6,7,8,9,10,7,7,6).name("pre-score"),
                    new NumericVector(10,11,12,13,14,8,9,10,11,10).name("post-score")
                );
                var ttest_a = M.analyze("ttestpair").run(0,1);
                var ttest_b = M.ttestpair("pre-score","post-score");
                // ttest_a.result = ttest_b
            }
        }
    ],
    wcxpaired: [
        {
            name: "example1",
            url: "https://real-statistics.com/non-parametric-tests/wilcoxon-signed-ranks-test/",
            code: function(){
                var M = new Matrix(
                    new NumericVector(15,8,11,19,13,4,16,5,9,15,12,11,14,4,11,17,14,5,9,8,9,11,11,12,17,12,5,5,15,0).name("wife"),
                    new NumericVector(17,19,18,19,17,5,13,0,16,21,12,9,10,17,12,24,12,12,8,16,12,7,17,13,20,9,13,11,11,12).name("husband")
                );
                var wcx_a = M.analyze("wcxpaired").run("wife", "husband");
                var wcx_b = M.wcxpaired(0,1);
                // wcx_a.result = wcx_b
            }
        }
    ],
    friedman: [
        {
            name: "example1",
            url: "https://real-statistics.com/anova-repeated-measures/friedman-test/",
            code: function(){
                var M = new Matrix(
                    new NumericVector(10,8,7,9,7,4,5,6,5,10,4,7).name("white"),
                    new NumericVector(7,5,8,6,5,7,9,6,4,6,7,3).name("red"),
                    new NumericVector(8,5,6,4,7,5,3,7,6,4,4,3).name("rose")
                );
                var friedman_a = M.analyze("friedman").run([0,1,2]);
                var friedman_b = M.friedman(["white","red","rose"]);
                // friedman_a.result = friedman_b
            }
        }
    ]
}

module.exports = function() {
    var _origin = locale.getDefault();
    for(var l of locale.listLanguages()) {
        locale.setDefault(l);
        //var matrix = Matrix.toMarkdown();
        //require("fs").writeFileSync(`./docs/${l}/matrix.md`, matrix);
        var vector = Vector.toMarkdown();
        require("fs").writeFileSync(`./docs/${l}/vector.md`, vector);
    }
}