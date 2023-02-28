var $ = require("./locale").call;

const snippets = {
    sig: {
        "$id": "#root/p", 
        "title": "sDgR", 
        "type": "number",
        "examples": [
            0.000001925387777546028
        ],
        "default": 0.0
    },
    ttest: {
        "title": "cBNP", 
        "type": "number",
        "examples": [
            8.2
        ],
        "default": 0.0
    },
    df: {
        "$id": "#root/df", 
        "title": "OYQu", 
        "type": "integer",
        "examples": [
            6
        ],
        "default": 0
    },
    siglevel: {
        "$id": "#root/df", 
        "title": "mjPq", 
        "description": null,
        "type": "number",
        "examples": [
            0.05
        ],
        "default": 0.05
    }
}

class Schema {
    lsign = "- ";
    lstart = "\n";
    bold = "**";
    typeHighlight = "`";
    to = "";
    constructor(schema) {
      this.schema = schema;
    }
    markdown() {
        try {
            this.to ="";
            this.append(this.schema);
            return this.to;
        } catch(e) {
            console.warn(e);
            return "";
        }
      
    }
    append(what, indent = 0) {
      if(what.type == "object") {
        this.createPropTitle(what, indent);
        this.loopObjItems(what.properties, indent);
      } else if (what.type == "array") {
        this.createPropTitle(what, indent);
        this.loopObjItems(what.items.properties, indent);
      } else {
        this.createPropTitle(what, indent)
      }
    }
    loopObjItems(o, indent) {
      indent++;
      var keys = Object.keys(o);
      for(var k of keys) {
        var e = {...o[k], name: k};
        this.createIndentLi(indent) + this.append(e, indent);
      }
    }
    loopArrItems(o, indent) {
      indent++;
      var keys = Object.keys(o);
      for(var k of keys) {
        var e = {...o[k], name: k};
        this.createIndentLi(indent) + this.append(e, indent);
      }
    }
    createPropTitle(e, indent = 1) {
      //this.to += `${this.createIndentLi(indent)}${$(e.name) ? '<span style="color: blue">**' + $(e.name) + '**</span>: ' : ""}*${$(e.title)}* ${this.createMDTypeBadge(e.type)}`;
      this.to += `${this.createIndentLi(indent)}${$(e.name) ? this.bold + $(e.name) + this.bold + ': ' : ""}*${$(e.title) !== $(e.type) ? $(e.title) : ""}* ${this.createMDTypeBadge(e.type)}`;
    }
    createIndentLi(indent) {
      var str = this.lstart;
      for(var i = 0; i < indent; i++) {
        str += "  ";
      }
      str += this.lsign;
      return str;
    }
    createMDTypeBadge(type) {
      var types = [
        {t: "string", c: "🟡", l: "RFGF"},
        {t: "number", c: "🔴", l: "pelN"},
        {t: "percent", c: "🔴", l: "pelN"},
        {t: "integer", c: "🔴", l: "llQx"},
        {t: "boolean", c: "🟣", l: "XPGc"},
        {t: "object", c: "🟦", l: "kLhB"},
        {t: "array", c: "🟩", l: "qdkt"},
        {t: "any", c: "🟤", l: "oMas"},
        {t: "Matrix", c: "🔢", l: "DfLu"},
        {t: "NumericMatrix", c: "🔢", l: "gLcr"},
        {t: "NumericVector", c: "[🔴]", l: "yWUM"},
        {t: "StringVector", c: "[🟡]", l: "Hwus"},
        {t: "BooleanVector", c: "[🟣]", l: "boQk"},
        {t: "function", c: "#️⃣", l: "GPHk"},
      ];
      var s = types.find(i => i.t == type) || {c: "🟤", l: "oMas"};
      //return `<span style="margin-left: 1rem; padding: 2px 4px; border-radius: 5px; background-color: ${s.c}">${$(s.l)}</span>`
      return `${this.typeHighlight}${s.c} ${$(s.l)}${this.typeHighlight}`
    }
  }

class ArgumentSchema extends Schema {
    constructor() {
        super(...arguments);
        this.lsign = "";
        this.lstart = "";
        this.typeHighlight = "";
    }
    createPropTitle(e, indent = 1) {
        this.to +=this.createMDTypeBadge(e.type);
    }
}

class OutputSchema {
    constructor(schema) {
        if(!schema) throw new Error("Schema argument cannot be empty")
        this.type = schema.type;
        this._title = schema.title;
        this.title = $(schema.title);
        /**
        * Returns true if the element is not a kind of object (object, array, function etc.).
        */
        this.isSimple = !(this.type == "object" || this.type == "array");
        this.isObject = this.type == "object";
        this.isArray = this.type == "array";
        this.isAddon = schema.target == "addon";
        this.format = schema.format || null;
        if(schema?.properties){
            this.properties = [];
            for(let key of Object.keys(schema.properties))
            {
                var p = new OutputSchema(schema.properties[key]);
                p.id = key;
                this.properties.push(p);
            }
        } 
        else if(schema?.items?.properties){
            this.items = [];
            for(let key of Object.keys(schema.items.properties))
            {
                var i = new OutputSchema(schema.items.properties[key]);
                i.id = key;
                this.items.push(i);
            }                
        }
    }
}

class FormVectorSchema {
    constructor(args) {
        if(!args) return null;
        var items = [];
        for(let key of Object.keys(args)) {
            var i = args[key];
            var _i = {
                id: key,
                title: i.wiki?.title ? $(i.wiki.title) : null,
                description: i.wiki?.description ? $(i.wiki.description) : null,
                required: i.required,
                default: i.default,
                type: i.type,
                fn: i.validator?.fn ? i.validator.fn : null,
                validatorText: i.validator?.text ? $(i.validator.text) : null,
            };
            if(i.enums) {
                _i.enums = [];
                for(let e of i.enums.values) {
                    _i.enums.push({
                        id: e.key,
                        title: $(e.title)
                    });
                }
            }
            items.push(_i);
        }
        return items;
    }
}

const vectorResultSchemas = {
    number: {
        "title": "pelN", 
        "type": "number",
        "examples": [
            1.5
        ],
        "default": 0.0
    },
    any: {
        "title": "FxzE", 
        "type": "any",
        "examples": [
            1.5
        ],
        "default": 0.0
    },
    integer : {
        "title": "DQnl", 
        "type": "integer",
        "examples": [
            1.5
        ],
        "default": 0.0
    },
    uint : {
        "title": "IrhN", 
        "type": "integer",
        "examples": [
            1.5
        ],
        "default": 0

    },
    zeroToOneInc : {
        "title": "OQnL", 
        "type": "number",
        "examples": [
            0, 0.12, 1
        ]
    },
    string : {
        "title": "RFGF", 
        "type": "number",
        "examples": [
            1.5
        ],
        "default": 0.0
    },
    boolean : { 
        "title": "XPGc", 
        "type": "boolean",
        "examples": [
            1.5
        ],
        "default": 0.0
    },
    histogram: {
        "title": "PAwR", 
        "type": "array",
        "default": [],
        "items":{
            "$id": "#root/items", 
            "title": "Items", 
            "type": "object",
            "required": [
                "from",
                "to",
                "n",
                "nc",
                "p",
                "pc"
            ],
            "properties": {
                "from": {
                    "$id": "#root/items/from", 
                    "title": "jbqY", 
                    "type": "number",
                    "examples": [
                        1
                    ],
                    "default": 0
                },
                "to": {
                    "$id": "#root/items/to", 
                    "title": "GlDV", 
                    "type": "number",
                    "examples": [
                        3.025
                    ],
                    "default": 0.0
                },
                "n": {
                    "$id": "#root/items/n", 
                    "title": "eHkc", 
                    "type": "integer",
                    "examples": [
                        1
                    ],
                    "default": 0
                },
                "nc": {
                    "$id": "#root/items/nc", 
                    "title": "Dwuz", 
                    "type": "integer",
                    "examples": [
                        1
                    ],
                    "default": 0
                },
                "p": {
                    "$id": "#root/items/p", 
                    "title": "iDVx", 
                    "type": "percent",
                    "examples": [
                        0.0625
                    ],
                    "default": 0.0,
                },
                "pc": {
                    "$id": "#root/items/pc", 
                    "title": "oIyG", 
                    "type": "percent",
                    "examples": [
                        0.0625
                    ],
                    "default": 0.0,
                }
            }
        }        
    },
    frequency: {
        "title": "dYJK", 
        "type": "array",
        "items":{
            "$id": "#root/items", 
            "title": "Items", 
            "type": "object",
            "required": [
                "value",
                "frequency"
            ],
            "properties": {
                "value": {
                    "$id": "#root/items/value", 
                    "title": "ZVbP", 
                    "type": "any",
                    "default": "",
                    "examples": [
                        "a"
                    ],
                    "pattern": "^.*$"
                },
                "frequency": {
                    "$id": "#root/items/frequency", 
                    "title": "mXpR", 
                    "type": "integer",
                    "examples": [
                        2
                    ],
                    "default": 0
                }
            }
        }
    
    },
    ttest: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1671561683.json", 
        "title": "VEAt", 
        "type": "object",
        "required": [
            "t",
            "p",
            "n"
        ],
        "properties": {
            "t": snippets.ttest,
            "p": snippets.sig,
            "n": {
                "$id": "#root/n", 
                "title": "bLoI", 
                "type": "integer",
                "examples": [
                    16
                ],
                "default": 0
            }
        }
    },
    mci: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1671725902.json", 
        "title": "yHjW", 
        "type": "object",
        "properties": {
            "m": {
                "$id": "#root/m", 
                "title": "rR94", 
                "type": "number",
                "examples": [
                    6
                ],
                "default": 0
            },
            "sig": snippets.siglevel,
            "delta": {
                "$id": "#root/delta", 
                "title": "NzBg", 
                "type": "number",
                "examples": [
                    1.0110352875838695
                ],
                "default": 0.0
            },
            "lb": {
                "$id": "#root/lb", 
                "title": "GynK", 
                "type": "number",
                "examples": [
                    4.988964712416131
                ],
                "default": 0.0
            },
            "ub": {
                "$id": "#root/ub", 
                "title": "iIPc", 
                "type": "number",
                "examples": [
                    7.011035287583869
                ],
                "default": 0.0
            }
        }
    },
    pci: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1672151042.json", 
        "title": "ZhjW", 
        "type": "object",
        "required": [
            "p",
            "sig",
            "delta",
            "lb",
            "ub"
        ],
        "properties": {
            "p": {
                "$id": "#root/p", 
                "title": "nCHN", 
                "type": "percent",
                "examples": [
                    0.17391304347826086
                ],
                "default": 0.0
            },
            "sig": snippets.siglevel,
            "delta": {
                "$id": "#root/delta", 
                "title": "NzBg", 
                "type": "percent",
                "examples": [
                    0.1549041787089759
                ],
                "default": 0.0
            },
            "lb": {
                "$id": "#root/lb", 
                "title": "GynK", 
                "type": "percent",
                "examples": [
                    0.019008864769284955
                ],
                "default": 0.0
            },
            "ub": {
                "$id": "#root/ub", 
                "title": "iIPc", 
                "type": "percent",
                "examples": [
                    0.32881722218723675
                ],
                "default": 0.0
            }
        }
    },    
    shapirowilk: {
        "title": "byTa", 
        "type": "object",
        "required": [
            "w",
            "df",
            "p"
        ],
        "properties": {
            "W": {
                "$id": "#root/w", 
                "title": "nZvR", 
                "type": "number",
                "examples": [
                    0.9664039647188553
                ],
                "default": 0.0
            },
            "df": snippets.df,
            "p": snippets.sig
        }
    },
    kstest: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1672154013.json", 
        "title": "DLoe", 
        "type": "object",
        "required": [
            "T",
            "df",
            "p"
        ],
        "properties": {
            "T": {
                "$id": "#root/T", 
                "title": "jBSf", 
                "type": "number",
                "examples": [
                    0.10974921094762696
                ],
                "default": 0.0
            },
            "df": snippets.df,
            "p": snippets.sig
        }
    }
}

const matrixResultSchemas = {
    anovaow: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1672343763.json", 
        "title": "baJo", 
        "type": "object",
        "properties": {
            "F": {
                "$id": "#root/F", 
                "title": "Jdfb", 
                "type": "number",
                "default": 0.0
            },
            "P2": {
                "$id": "#root/P2", 
                "title": "HksP", 
                "type": "number",
                "default": 0.0
            },
            "p": snippets.sig,
            "n": {
                "$id": "#root/N", 
                "title": "bLoI", 
                "type": "integer",
                "default": 0
            },
            "ANOVA": {
                "$id": "#root/ANOVA", 
                "title": "qCgT", 
                "type": "object",
                "target": "addon",
                "properties": {
                    "totalOfGroups": {
                        "$id": "#root/ANOVA/totalOfGroups", 
                        "title": "cXCr", 
                        "type": "integer",
                        "default": 0
                    },
                    "betweenGroups": {
                        "$id": "#root/ANOVA/betweenGroups", 
                        "title": "thNv", 
                        "type": "object",
                        "properties": {
                            "sumOfSquares": {
                                "$id": "#root/ANOVA/betweenGroups/sumOfSquares", 
                                "title": "SqTd", 
                                "type": "number",
                                "default": 0.0
                            },
                            "df": {
                                "$id": "#root/ANOVA/betweenGroups/df", 
                                "title": "OYQu", 
                                "type": "integer",
                                "default": 0
                            }
                        }
                    },
                    "withinGroups": {
                        "$id": "#root/ANOVA/withinGroups", 
                        "title": "GiRP", 
                        "type": "object",
                        "properties": {
                            "sumOfsquares": {
                                "$id": "#root/ANOVA/withinGroups/sumOfsquares", 
                                "title": "SqTd", 
                                "type": "number",
                                "default": 0.0
                            },
                            "df": {
                                "$id": "#root/ANOVA/withinGroups/df", 
                                "title": "OYQu", 
                                "type": "integer",
                                "default": 0
                            }
                        }
                    }
    ,
                    "total": {
                        "$id": "#root/ANOVA/total", 
                        "title": "P67p", 
                        "type": "object",
                        "properties": {
                            "sumOfSquares": {
                                "$id": "#root/ANOVA/total/sumOfSquares", 
                                "title": "SqTd", 
                                "type": "number",
                                "default": 0.0
                            },
                            "df": {
                                "$id": "#root/ANOVA/total/df", 
                                "title": "OYQu", 
                                "type": "integer",
                                "default": 0
                            }
                        }
                    }
    
                }
            }
    
        }
    },
    correlPearson: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1672345987.json", 
        "title": "IIlO", 
        "type": "object",
        "properties": {
            "r": {
                "$id": "#root/r", 
                "title": "pTvR", 
                "type": "number",
                "default": 0.0
            },
            "p": snippets.sig
        }
    },
    correlSpearman: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1672345987.json", 
        "title": "IIlO", 
        "type": "object",
        "properties": {
            "r": {
                "$id": "#root/r", 
                "title": "eJTT", 
                "type": "number",
                "default": 0.0
            },
            "df": snippets.df,
            "p": snippets.sig
        }
    },
    correlKendall: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1672345987.json", 
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
    correlPartial: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1672345987.json", 
        "title": "IIlO", 
        "type": "object",
        "properties": {
            "r": {
                "$id": "#root/r", 
                "title": "pTvR", 
                "type": "number",
                "default": 0.0
            },
            "p": snippets.sig
        }
    },
    genreg: {
        "title": "Root", 
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
    contingency: {
        "title": "gRix", 
        "type": "object",
        "properties": {
            "phi": {
                "$id": "#root/phi", 
                "title": "GfeP", 
                "type": "number",
                "examples": [
                    36.80097109889032
                ],
                "default": 0.0
            },
            "p": {
                "$id": "#root/p", 
                "title": "sDgR", 
                "type": "number",
                "examples": [
                    0.000001925387777546028
                ],
                "default": 0.0
            },
            "df": snippets.df,
            "C": {
                "$id": "#root/C", 
                "title": "BUaN", 
                "type": "number",
                "examples": [
                    0.29026043504540816
                ],
                "default": 0.0
            },
            "V": {
                "$id": "#root/V", 
                "title": "VYQH", 
                "type": "number",
                "examples": [
                    0.21447893573405502
                ],
                "default": 0.0
            }
        }
    },
    ttestpair: {
        "title": "Root", 
        "type": "object",
        "properties": {
            "t": snippets.ttest,
            "p": snippets.sig,
            "df": snippets.df
        }
    },
    ttestind: {
        "title": "Root", 
        "type": "object",
        "properties": {
            "t": snippets.ttest,
            "p": snippets.sig,
            "df": snippets.df
        }
    },
    mwu: {
        "title": "Root", 
        "type": "object",
        "properties": {
            "U": {
                "$id": "#root/p", 
                "title": "TkNf", 
                "type": "number",
                "examples": [
                    5.4
                ],
                "default": 0.0
            },
            "Z": {
                "$id": "#root/p", 
                "title": "Shpv", 
                "type": "number",
                "examples": [
                    5.4
                ],
                "default": 0.0
            },
            "p": snippets.sig,
        }
    }
}



const argumentSchemas = {
    numericMatrix: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1672335343.json", 
        "title": "gLcr", 
        "type": "Matrix",
        "default": [],
        "items":{
            "$id": "#root/items", 
            "title": "yWUM", 
            "type": "array",
            "default": [],
            "items":{
                "$id": "#root/items/items", 
                "title": "pelN", 
                "type": "number",
                "default": 0
            }
        }
    },
    vector: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1672335343.json", 
        "title": "zRT3", 
        "type": "Vector",
        "default": [],
        "items":{
            "$id": "#root/items", 
            "title": "te8N", 
            "type": "any",
            "default": []
        }
    },
    numericVector: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1672335343.json", 
        "title": "yWUM", 
        "type": "NumericVector",
        "default": [],
        "items":{
            "$id": "#root/items", 
            "title": "pelN", 
            "type": "number",
            "default": []
        }
    },
    booleanVector: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1672335343.json", 
        "title": "WiEE", 
        "type": "BooleanVector",
        "default": [],
        "items":{
            "$id": "#root/items", 
            "title": "pelN", 
            "type": "number",
            "default": []
        }
    }
}

module.exports = {
    Schema: Schema,
    ArgumentSchema: ArgumentSchema,
    OutputSchema: OutputSchema,
    FormVectorSchema: FormVectorSchema,
    FormMatrixSchema: FormVectorSchema,
    vectorResultSchemas: vectorResultSchemas,
    matrixResultSchemas: matrixResultSchemas,
    argumentSchemas: argumentSchemas,
    register: function(name, schema) {
        if(vectorResultSchemas[name]) console.warn(`You are overwriting another schema named (${name}). The original schema will be overwritten, nevertheless, you may consider using another name.`);
        vectorResultSchemas[name] = schema;
        return module.exports;
    }
}