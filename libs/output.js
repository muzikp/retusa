var $ = require('./locale').call;

class Output {
    constructor(name) {
        var model = lib[name];
        if(!model) throw new Error("Unknown output model name: " + name);
        this.name = name;
        this.type = model.type;
        if(model.title) {
            this.title = {
                key: model.title,
                value: $(model.title)
            }
        }
        if(model.type == "object") {
            this.properties = createObjectProperties(model.properties);
        }
        else if(model.type == "array") {
            this.properties = createObjectProperties(model.items.properties);
        } else {
            this.title = {
                key: model.title,
                value: $(model.title)
            }
        }
    }
    /**
     * Creates a new Output instance and populates it with analysis result data.
     * @param {VectorAnalysis | MatrixAnalysis} analysis 
     * @returns {Output} Returns a new instance of the Output class.
     */ 
    static fromAnalysis(analysis) {
        return props(new Output(analysis.model.output), analysis.result);
        function props(node, result) {
            if(node.type == "object")
            {
                for(let k of Object.keys(node.properties)) {
                    props(node.properties[k], result[k]);
                }
            }
            else node.value = result;
            return node;
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
        title: "oMas"
    },
    "number": {
        "title": "pelN", 
        "type": "number",
    },
    "uint": {
        "title": "IrhN", 
        "type": "number",
    },
    "percent": {
        "title": "uyVK", 
        "type": "percent",
    },
    "histogram": {
        "title": "PAwR", 
        "type": "array",
        "items":{
            "title": "Items", 
            "type": "object",
            "properties": {
                "from": {
                    "title": "jbqY", 
                    "type": "number",
                },
                "to": {
                    "title": "GlDV", 
                    "type": "number",
                },
                "n": {
                    "title": "eHkc", 
                    "type": "integer",
                },
                "nc": {
                    "title": "Dwuz", 
                    "type": "integer",
                },
                "p": {
                    "title": "iDVx", 
                    "type": "percent",
                },
                "pc": {
                    "title": "oIyG", 
                    "type": "percent",
                }
            }
        }        
    },
    "frequency": {
        "title": "dYJK", 
        "type": "array",
        "items":{
            "title": "Items", 
            "type": "object",
            "properties": {
                "v": {
                    "title": "ZVbP", 
                    "type": "any",
                    "pattern": "^.*$"
                },
                "n": {
                    "title": "mXpR", 
                    "type": "integer",
                }
            }
        }
    
    },
    "ttest": {
        "title": "VEAt", 
        "type": "object",
        "properties": {
            "t": snippets.ttest,
            "p": snippets.sig,
            "n": { 
                "title": "bLoI", 
                "type": "integer"
            }
        }
    },
    "mci": {
        "title": "yHjW", 
        "type": "object",
        "properties": {
            "m": {
                "title": "rR94", 
                "type": "number",
            },
            "sig": snippets.siglevel,
            "delta": {
                "title": "NzBg", 
                "type": "number",
            },
            "lb": { 
                "title": "GynK", 
                "type": "number",
            },
            "ub": {
                "title": "iIPc", 
                "type": "number",
            }
        }
    },
    "pci": {
        "title": "ZhjW", 
        "type": "object",
        "properties": {
            "p": {
                "title": "nCHN", 
                "type": "percent",
            },
            "sig": snippets.siglevel,
            "delta": {
                "title": "NzBg", 
                "type": "percent",
            },
            "lb": {
                "title": "GynK", 
                "type": "percent",
            },
            "ub": {
                "title": "iIPc", 
                "type": "percent",
            }
        }
    },    
    "shapirowilk": {
        "title": "byTa", 
        "type": "object",
        "properties": {
            "W": {
                "title": "nZvR", 
                "type": "number",
            },
            "df": snippets.df,
            "p": snippets.sig
        }
    },
    "kstest": {
        "title": "DLoe", 
        "type": "object",
        "properties": {
            "T": {
                "title": "jBSf", 
                "type": "number",
            },
            "df": snippets.df,
            "p": snippets.sig
        }
    },
    "correlPearson": {
        "title": "pTvR", 
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
        "title": "eJTT", 
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
        "title": "mgBC", 
        "type": "object",
        "properties": {
            "tau": {
                "title": "QCkg", 
                "type": "number",
            },
            /*
            "taub": {
                "title": "NgVa", 
                "type": "number",
            },
            "taua": {
                "title": "mgBA", 
                "type": "number",
            },
            */
            "df": snippets.df,
            "p": snippets.sig
        }
    },
    "correlPartial": {
        "title": "xfSf", 
        "type": "object",
        "properties": {
            "r": {
                "title": "pTvR", 
                "type": "number",
            },
            "p": snippets.sig
        }
    },
    "correlGamma": {
        "title": "R5AC", 
        "type": "object",
        "properties": {
            "r": {
                "title": "wZUG", 
                "type": "number"
            },
            "p": snippets.sig
        }
    },
    "linreg": {
        "title": "vlCA",
        "type": "object",
        "properties": {
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
        "title": "rPQr",
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
        "title": "YqRh", 
        "type": "object",
        "properties": {
            "t": snippets.ttest,
            "p": snippets.sig,
            "df": snippets.df
        }
    },
    "ttestpair": {
        "title": "mmXD", 
        "type": "object",
        "properties": {
            "t": snippets.ttest,
            "p": snippets.sig,
            "df": snippets.df
        }
    },
    "wcxpair": {
        "title": "ChzY", 
        "type": "object",
        "properties": {
            "Z": { 
                "title": "9KFq", 
                "type": "number"
            },
            "p": snippets.sig,
        }
    },
    "wcxind": {
        "title": "ChzY", 
        "type": "object",
        "properties": {
            "W": { 
                "title": "Zymm", 
                "type": "number"
            },
            "Z": { 
                "title": "9KFq", 
                "type": "number"
            },
            "p": snippets.sig,
        }
    },
    "friedman": {
        "title": "7m48", 
        "type": "object",
        "properties": {
            "Q": { 
                "title": "t1BN", 
                "type": "number"
            },
            df: snippets.df,
            "p": snippets.sig,
        }
    },
    "contingency": {
        "title": "gRix", 
        "type": "object",
        "properties": {
            "phi": {
                "title": "GfeP", 
                "type": "number",
            },
            "p": snippets.sig,
            "df": snippets.df,
            "C": {
                "title": "BUaN", 
                "type": "number",
            },
            "V": {
                "title": "VYQH", 
                "type": "number",
            }
        }
    },
    "kwanova": {
        "title": "YqRh", 
        "type": "object",
        "properties": {
            "H": {
                title: "rrWq",
                type: "number"
            },
            "p": snippets.sig,
            "df": snippets.df
        }
    },
    "mtplinreg": {
        "title": "vlCA",
        "type": "object",
        "properties": {
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
}
module.exports = {Output: Output};