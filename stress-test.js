var $ = require("./index");


const anovaow = function(sampleSize, groups) {
    var matrix = new $.Matrix(
        $.NumericVector.generate({total: sampleSize, min: -1000, max: 1000, nullprob: 0.5}).name("values"),
        $.StringVector.generate({total: sampleSize, list: groups, nullprob: 0.5}).name("grouping variable")
    );
    var analysis = matrix.analyze("anovaow").run([0],1);
    return {
        sampleSize: sampleSize,
        groups: groups,
        duration: analysis.duration()
    }
}

const linreg = function(sampleSize) {
    var matrix = new $.Matrix(
        $.NumericVector.generate({total: sampleSize, min: -1000, max: 1000, nullprob: 0.5}).name("x"),
        $.NumericVector.generate({total: sampleSize, min: -1000, max: 1000, nullprob: 0.5}).name("y")
    );
    var analysis = matrix.analyze("linreg").run(0,1);
    return {
        sampleSize: sampleSize,
        duration: analysis.duration()
    }
}

const kendall = function(sampleSize) {
    var matrix = new $.Matrix(
        $.NumericVector.generate({total: sampleSize, min: -1000, max: 1000, nullprob: 0.5}).name("x"),
        $.NumericVector.generate({total: sampleSize, min: -1000, max: 1000, nullprob: 0.5}).name("y")
    );
    var analysis = matrix.analyze("correlKendall").run(0,1);
    return {
        duration: analysis.duration()
    }
}

const pearson = function(sampleSize) {
    var matrix = new $.Matrix(
        $.NumericVector.generate({total: sampleSize, min: -1000, max: 1000, nullprob: 0.5}).name("x"),
        $.NumericVector.generate({total: sampleSize, min: -1000, max: 1000, nullprob: 0.5}).name("y")
    );
    var analysis = matrix.analyze("correlPearson").run(0,1);
    return {
        duration: analysis.duration()
    }
}

const gamma = function(sampleSize) {
    var matrix = new $.Matrix(
        $.NumericVector.generate({total: sampleSize, min: -1000, max: 1000, nullprob: 0.5}).name("x"),
        $.NumericVector.generate({total: sampleSize, min: -1000, max: 1000, nullprob: 0.5}).name("y")
    );
    var analysis = matrix.analyze("correlGamma").run(0,1);
    return {
        duration: analysis.duration()
    }
}

const partial = function(sampleSize) {
    var matrix = new $.Matrix(
        $.NumericVector.generate({total: sampleSize, min: -1000, max: 1000, nullprob: 0.5}).name("x"),
        $.NumericVector.generate({total: sampleSize, min: -1000, max: 1000, nullprob: 0.5}).name("y"),
        $.NumericVector.generate({total: sampleSize, min: -1000, max: 1000, nullprob: 0.5}).name("z")
    );
    var analysis = matrix.analyze("correlPartial").run(0,1,2);
    return {
        duration: analysis.duration()
    }
}

const biserial = function(sampleSize) {
    var matrix = new $.Matrix(
        $.BooleanVector.generate({total: sampleSize, min: -1000, max: 1000, nullprob: 0.5}).name("x"),
        $.NumericVector.generate({total: sampleSize, min: -1000, max: 1000, nullprob: 0.5}).name("y")
    );
    var analysis = matrix.analyze("correlBiserial").run(0,1);
    return {
        duration: analysis.duration()
    }
}

const spearman = function(sampleSize) {
    var matrix = new $.Matrix(
        $.NumericVector.generate({total: sampleSize, min: -1000, max: 1000, nullprob: 0.5}).name("x"),
        $.NumericVector.generate({total: sampleSize, min: -1000, max: 1000, nullprob: 0.5}).name("y")
    );
    var analysis = matrix.analyze("correlSpearman").run(0,1);
    return {
        duration: analysis.duration()
    }
}

const ttestind = function(sampleSize) {
    var matrix = new $.Matrix(
        $.NumericVector.generate({total: sampleSize, min: 0, max: 100}).name("values"),
        $.StringVector.generate({total: sampleSize, list: ["x","y"]}).name("grouping variable")
    );
    var analysis = matrix.analyze("ttestind").run([0],1);
    return {
        duration: analysis.duration()
    }
}

const ttestpair = function(sampleSize) {
    var matrix = new $.Matrix(
        $.NumericVector.generate({total: sampleSize, min: -1000, max: 1000, nullprob: 0.5}).name("x"),
        $.NumericVector.generate({total: sampleSize, min: -1000, max: 1000, nullprob: 0.5}).name("y")
    );
    var analysis = matrix.analyze("ttestpair").run(0,1);
    return {
        duration: analysis.duration()
    }
}

const friedman = function(sampleSize) {
    var matrix = new $.Matrix(
        $.NumericVector.generate({total: sampleSize, min: -1000, max: 1000, nullprob: 0.5}).name("a"),
        $.NumericVector.generate({total: sampleSize, min: -1000, max: 1000, nullprob: 0.5}).name("b"),
        $.NumericVector.generate({total: sampleSize, min: -1000, max: 1000, nullprob: 0.5}).name("c"),
        $.NumericVector.generate({total: sampleSize, min: -1000, max: 1000, nullprob: 0.5}).name("d"),
        $.NumericVector.generate({total: sampleSize, min: -1000, max: 1000, nullprob: 0.5}).name("e")

    );
    var analysis = matrix.analyze("friedman").run([0,1,2,3,4]);
    return {
        duration: analysis.duration()
    }
}

const wcxpaired = function(sampleSize) {
    var matrix = new $.Matrix(
        $.NumericVector.generate({total: sampleSize, min: 0, max: 500}).name("x"),
        $.NumericVector.generate({total: sampleSize, min: 0, max: 500}).name("y")
    );
    var analysis = matrix.analyze("wcxpaired").run(0,1);
    return {
        duration: analysis.duration()
    }
}

const mwu = function(sampleSize) {
    var matrix = new $.Matrix(
        $.NumericVector.generate({total: sampleSize, min: -1000, max: 1000}).name("x"),
        $.NumericVector.generate({total: sampleSize, min: -1000, max: 1000}).name("y")
    );
    var analysis = matrix.analyze("mwu").run([0,1]);
    return {
        duration: analysis.duration()
    }
}

const contingency = function(sampleSize) {
    var matrix = new $.Matrix(
        $.StringVector.generate({total: sampleSize, list: 10}).name("row"),
        $.StringVector.generate({total: sampleSize, list: 10}).name("column")
    );
    var analysis = matrix.analyze("contingency").run(0,1);
    return {
        duration: analysis.duration()
    }
}

const kwanova = function(sampleSize, groups) {
    var matrix = new $.Matrix(
        $.NumericVector.generate({total: sampleSize, min: 1, max: 100, nullprob: 0.5}).name("values"),
        $.StringVector.generate({total: sampleSize, list: 5, nullprob: 0.5}).name("grouping variable")
    );
    var analysis = matrix.analyze("kwanova").run([0],1);
    return {
        sampleSize: sampleSize,
        groups: groups,
        duration: analysis.duration()
    }
}

const wcxind = function(sampleSize) {
    var matrix = new $.Matrix(
        $.NumericVector.generate({total: sampleSize, min: 0, max: 100}).name("values"),
        $.StringVector.generate({total: sampleSize, list: ["x","y"]}).name("grouping variable")
    );
    var analysis = matrix.analyze("wcxind").run([0],1);
    return {
        duration: analysis.duration()
    }
}

module.exports = {
    anova: anovaow,
    biserial: biserial,
    contingency: contingency,
    gamma: gamma,
    friedman: friedman,
    kendall: kendall,
    kwanova: kwanova,
    linreg: linreg,
    partial: partial,
    pearson: pearson,
    spearman: spearman,
    ttestind: ttestind,
    ttestpair: ttestpair,
    wcxpaired: wcxpaired,
    wcxind: wcxind,
    mwu: mwu,
    save: function(name, result) {
        var content = {
            version: "1.2",
            matrix: result.serialize(),
            utils: {
                filterOn: false,
                filters: []
            }
        }
        require("fs").writeFileSync(`C:/Users/Pavel/Desktop/RetusaFiles/${name}.ret`, JSON.stringify(content, null, "\t"));
        console.log("DONE");
    }

}
