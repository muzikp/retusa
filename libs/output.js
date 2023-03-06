var $ = require('./locale').call;
var {Matrix} = require("./matrix");
var {NumericVector,StringVector,BooleanVector} = require("./vector");

class Output {
    constructor(name) {
        var model = lib[name];
        if(!model) throw new Error("Unknown output model name: " + name);
        this.name = name;
        this.type = model.type;
        if(model.type == "object") {
            this.properties = createObjectProperties(model.properties);
        }
        else if(model.type == "array") {
            this.properties = createObjectProperties(model.properties);
        }
    }
}

function createObjectProperties(properties) {
    var o = {};
    for(key of Object.keys(properties)) {
        var p = properties[key]
        var prop = {
            name: key,
            type: p.type
        }
        prop.title = {
            key: p.title,
            value: $(p.title)
        }
        if(p.description) 
        {
            prop.description = {
                key: p.description,
                value: $(p.description)
            }
        }
        o[key] = prop;
        if(p.type == "object") {
            o[key].properties = createObjectProperties(p.properties);
        } else if(p.type == "array") {
            o[key].items = createArrayItems(p.items)
        }
    }
    return o;
}

function createArrayItems(items) {
    return createObjectProperties(items.properties);
}

const snippets = {
    sig: {
        "title": "sDgR", 
        "type": "zeroToOneInc",
    },
    ttest: {
        "title": "cBNP", 
        "type": "number",
    },
    df: {
        "title": "OYQu", 
        "type": "uint",
    },
    siglevel: {
        "title": "mjPq", 
        "type": "zeroToOneInc",
    }
}

const lib = {
    "any": {
        type: "any",
        title: ""
    },
    "number": {
        "title": "pelN", 
        "type": "number",
    },
    "uint": {
        "title": "IrhN", 
        "type": "number",
    },
    "correlPearson": {
        "title": "IIlO", 
        "type": "object",
        "properties": {
            "r": {
                "title": "pTvR", 
                "type": "number"
            },
            "p": snippets.sig
        }
    },
    "correlSpearman": { 
        "title": "IIlO", 
        "type": "object",
        "properties": {
            "r": {
                "title": "eJTT", 
                "type": "number",
            },
            "df": snippets.df,
            "p": snippets.sig
        }
    },
    "correlKendall": {
        "title": "IIlO", 
        "type": "object",
        "properties": {
            "taub": {
                "title": "NgVa", 
                "type": "number",
            },
            "taua": {
                "title": "mgBA", 
                "type": "number",
            },
            "df": snippets.df,
            "p": snippets.sig
        }
    },
    "correlPartial": {
        "title": "IIlO", 
        "type": "object",
        "properties": {
            "r": {
                "title": "pTvR", 
                "type": "number",
            },
            "p": snippets.sig
        }
    },
    "linreg": {
        "type": "object",
        "properties": {
            "model": {
                "$id": "#root/model", 
                "title": "OBml", 
                "type": "string"              
            },
            "r2": {
                "$id": "#root/r2", 
                "title": "VqBH", 
                "type": "number"
            },
            "r": {
                "$id": "#root/r", 
                "title": "pTvR", 
                "type": "number"
            },
            "F": {
                "$id": "#root/F", 
                "title": "Jdfb", 
                "type": "number"
            },
            "p": snippets.sig,
            "beta0": {
                "$id": "#root/beta0", 
                "title": "TDpu", 
                "type": "number"
            },
            "beta1": {
                "$id": "#root/beta1", 
                "title": "eFcW", 
                "type": "number"
            }
        }
    },
    "mwu": {
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
    },
    "anovaow": {
        "title": "baJo", 
        "type": "object",
        "properties": {
            "F": {
                "title": "Jdfb", 
                "type": "number"
            },
            "P2": {
                "title": "HksP", 
                "type": "number",
            },
            "p": snippets.sig,
            "n": { 
                "title": "bLoI", 
                "type": "uint",
            },
            "ANOVA": {
                "title": "qCgT", 
                "type": "object",
                "target": "addon",
                "properties": {
                    "totalOfGroups": {
                        "title": "cXCr", 
                        "type": "integer"
                    },
                    "betweenGroups": {
                        "title": "thNv", 
                        "type": "object",
                        "properties": {
                            "sumOfSquares": {
                                "title": "SqTd", 
                                "type": "number",
                            },
                            "df": {
                                "title": "OYQu", 
                                "type": "integer",
                            }
                        }
                    },
                    "withinGroups": {
                        "title": "GiRP", 
                        "type": "object",
                        "properties": {
                            "sumOfsquares": {
                                "title": "SqTd", 
                                "type": "number",
                            },
                            "df": {
                                "title": "OYQu", 
                                "type": "integer",
                            }
                        }
                    },
                    "total": {
                        "title": "P67p", 
                        "type": "object",
                        "properties": {
                            "sumOfSquares": {
                                "title": "SqTd", 
                                "type": "number",
                            },
                            "df": {
                                "title": "OYQu", 
                                "type": "integer",
                            }
                        }
                    }
    
                }
            }
    
        }
    },
    "ttestind": {
        "title": "Root", 
        "type": "object",
        "properties": {
            "t": snippets.ttest,
            "p": snippets.sig,
            "df": snippets.df
        }
    },
    "ttestpair": {
        "title": "Root", 
        "type": "object",
        "properties": {
            "t": snippets.ttest,
            "p": snippets.sig,
            "df": snippets.df
        }
    },
    "wcxpaired": {
        "title": "Root", 
        "type": "object",
        "properties": {
            "Z": { 
                "title": "9KFq", 
                "type": "number"
            },
            "p": snippets.sig,
        }
    },
    "friedman": {
        "title": "Root", 
        "type": "object",
        "properties": {
            "Q": { 
                "title": "t1BN", 
                "type": "number"
            },
            df: snippets.df,
            "p": snippets.sig,
        }
    }
}
module.exports = {Output: Output};