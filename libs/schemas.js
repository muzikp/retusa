var $ = require("./locale").call;

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
            //console.warn(e);
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
        {t: "integer", c: "🟠", l: "llQx"},
        {t: "boolean", c: "🟣", l: "XPGc"},
        {t: "object", c: "🟦", l: "kLhB"},
        {t: "array", c: "🟩", l: "qdkt"},
        {t: "any", c: "🟤", l: "oMas"}
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

const vectorResultSchemas = {
    number: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1671554312.json", 
        "title": "pelN", 
        "type": "number",
        "examples": [
            1.5
        ],
        "default": 0.0
    },
    any: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1671554312.json", 
        "title": "FxzE", 
        "type": "any",
        "examples": [
            1.5
        ],
        "default": 0.0
    },
    integer : {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1671554312.json", 
        "title": "DQnl", 
        "type": "integer",
        "examples": [
            1.5
        ],
        "default": 0.0
    },
    uint : {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1671554312.json", 
        "title": "IrhN", 
        "type": "integer",
        "examples": [
            1.5
        ],
        "default": 0.0
    },
    zeroToOneInc : {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1671554312.json", 
        "title": "OQnL", 
        "type": "number",
        "examples": [
            0, 0.12, 1
        ]
    },
    string : {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1671554312.json", 
        "title": "RFGF", 
        "type": "number",
        "examples": [
            1.5
        ],
        "default": 0.0
    },
    boolean : {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1671554312.json", 
        "title": "XPGc", 
        "type": "boolean",
        "examples": [
            1.5
        ],
        "default": 0.0
    },
    histogram: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1671560926.json", 
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
                "i",
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
                "i": {
                    "$id": "#root/items/i", 
                    "title": "VyzG", 
                    "type": "string",
                    "default": "",
                    "examples": [
                        "1.00 - 3.00"
                    ],
                    "pattern": "^.*$"
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
                    "type": "number",
                    "examples": [
                        0.0625
                    ],
                    "default": 0.0
                },
                "pc": {
                    "$id": "#root/items/pc", 
                    "title": "oIyG", 
                    "type": "number",
                    "examples": [
                        0.0625
                    ],
                    "default": 0.0
                }
            }
        }        
    },
    frequency: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1671561419.json", 
        "title": "dYJK", 
        "type": "array",
        "default": [],
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
        "title": "sOyV", 
        "type": "object",
        "required": [
            "t",
            "p",
            "n"
        ],
        "properties": {
            "t": {
                "$id": "#root/t", 
                "title": "GmAh", 
                "type": "number",
                "examples": [
                    -8.403733075366224
                ],
                "default": 0.0
            },
            "p": {
                "$id": "#root/p", 
                "title": "MpjZ", 
                "type": "number",
                "examples": [
                    1
                ],
                "default": 0
            },
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
                "title": "eFdj", 
                "type": "number",
                "examples": [
                    6
                ],
                "default": 0
            },
            "sig": {
                "$id": "#root/sig", 
                "title": "mjPq", 
                "type": "number",
                "examples": [
                    0.050000000000000044
                ],
                "default": 0.0
            },
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
                "type": "number",
                "examples": [
                    0.17391304347826086
                ],
                "default": 0.0
            },
            "sig": {
                "$id": "#root/sig", 
                "title": "mjPq", 
                "type": "number",
                "examples": [
                    0.050000000000000044
                ],
                "default": 0.0
            },
            "delta": {
                "$id": "#root/delta", 
                "title": "NzBg", 
                "type": "number",
                "examples": [
                    0.1549041787089759
                ],
                "default": 0.0
            },
            "lb": {
                "$id": "#root/lb", 
                "title": "GynK", 
                "type": "number",
                "examples": [
                    0.019008864769284955
                ],
                "default": 0.0
            },
            "ub": {
                "$id": "#root/ub", 
                "title": "iIPc", 
                "type": "number",
                "examples": [
                    0.32881722218723675
                ],
                "default": 0.0
            }
        }
    },    
    shapirowilk: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1672094205.json", 
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
            "df": {
                "$id": "#root/df", 
                "title": "OYQu", 
                "type": "integer",
                "examples": [
                    23
                ],
                "default": 0
            },
            "p": {
                "$id": "#root/p", 
                "title": "MpjZ", 
                "type": "number",
                "examples": [
                    0.6036566524076283
                ],
                "default": 0.0
            }
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
            "df": {
                "$id": "#root/df", 
                "title": "OYQu", 
                "type": "integer",
                "examples": [
                    23
                ],
                "default": 0
            },
            "p": {
                "$id": "#root/p", 
                "title": "MpjZ", 
                "type": "number",
                "examples": [
                    0.6
                ],
                "default": 0.0
            }
        }
    }
    
    
}
module.exports = {
    Schema: Schema,
    ArgumentSchema: ArgumentSchema,
    vectorResultSchemas: vectorResultSchemas,
    register: function(name, schema) {
        if(vectorResultSchemas[name]) console.warn(`You are overwriting another schema named (${name}). The original schema will be overwritten, nevertheless, you may consider using another name.`);
        vectorResultSchemas[name] = schema;
        return module.exports;
    }
}