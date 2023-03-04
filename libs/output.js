var $ = require('./locale').call;
var {Matrix} = require("./matrix");
var {NumericVector,StringVector,BooleanVector} = require("./vector");

class Output {
    constructor(name) {
        var model = lib[name];
        if(!model) throw new Error("Unknown output model name: " + name);
    }
    toMarkdown() {
        
    }
}

const lib = {
    mwu: {
        "type": "object",
        "properties": {
            "U": {
                "title": "TkNf", 
                "type": "number"
            },
            "Z": { 
                "title": "Shpv", 
                "type": "number"
            },
            "p": snippets.sig,
        }
    }
} 

const snippets = {
    sig: {
        "title": "sDgR", 
        "type": "number",
    },
    ttest: {
        "title": "cBNP", 
        "type": "number",
    },
    df: {
        "title": "OYQu", 
        "type": "integer",
    },
    siglevel: {
        "title": "mjPq", 
        "description": null,
        "type": "number",
    }
}

module.exports = Output;