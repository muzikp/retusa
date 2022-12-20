var $ = require("./locale").call;

class Schema {
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
      this.to += `${this.createIndentLi(indent)}${$(e.name) ? '<span style="color: blue">**' + $(e.name) + '**</span>: ' : ""}*${$(e.title)}* ${this.createMDTypeBadge(e.type)}`;
    }
    createIndentLi(indent) {
      var str = "\n";
      for(var i = 0; i < indent; i++) {
        str += "  ";
      }
      str += "- ";
      return str;
    }
    createMDTypeBadge(type) {
      var types = [
        {t: "string", c: "brown", l: "RFGF"},
        {t: "number", c: "yellow", l: "pelN"},
        {t: "integer", c: "yellow", l: "llQx"},
        {t: "boolean", c: "gray", l: "XPGc"},
        {t: "object", c: "green", l: "kLhB"},
        {t: "array", c: "blue", l: "qdkt"},
        {t: "any", c: "blue", l: "oMas"}
      ];
      
      var s = types.find(i => i.t == type) || {c: "red", l: "oMas"};
      return `<span style="margin-left: 1rem; padding: 2px 4px; border-radius: 5px; background-color: ${s.c}">${$(s.l)}</span>`
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
        "type": "number",
        "examples": [
            1.5
        ],
        "default": 0.0
    }
}
/*

const frequencyTable = {
    name: "frequencyTable",
    type: "table",
    title: "dYJK",
    children: [
        new Entity({
            type: any,
            name: "v",
            title: "ZVbP"
        }),
        new Entity({
            type: integer,
            name: "f",
            title: "mXpR"
        }),
    ],
    example: [
        {
            v: "C",
            f: 12
        },
        {
            v: "A",
            f: 8
        },
        {
            v: "B",
            f: 7
        }
    ]
};

const histogramTable = {
    name: "histogramTable",
    type: "table",
    children: [
        {
            type: number,
            name: "from",
            title: "jbqY"
        },
        {
            type: number,
            name: "to",
            title: "GlDV"
        },
        {
            type: string,
            name: "i",
            title: "VyzG"
        },
        {
            type: uint,
            name: "n",
            title: "eHkc"
        },
        {
            type: uint,
            name: "nc",
            title: "Dwuz"
        },
        {
            type: zeroToOneInc,
            name: "p",
            title: "iDVx"
        },
        {
            type: zeroToOneInc,
            name: "pc",
            title: "oIyG"
        },
    ],
    example: [{"from":16,"to":18.771609312622935,"i":"16.0 - 18.0","n":3,"nc":3,"p":0.13636363636363635,"pc":0.13636363636363635},{"from":18.771609312622935,"to":21.54321862524587,"i":"19.0 - 21.0","n":9,"nc":12,"p":0.4090909090909091,"pc":0.5454545454545454},{"from":21.54321862524587,"to":24.314827937868806,"i":"22.0 - 24.0","n":7,"nc":19,"p":0.3181818181818182,"pc":0.8636363636363635},{"from":24.314827937868806,"to":27.08643725049174,"i":"25.0 - 27.0","n":2,"nc":21,"p":0.09090909090909091,"pc":0.9545454545454545},{"from":27.08643725049174,"to":29.858046563114677,"i":"28.0 - 29.0","n":1,"nc":22,"p":0.045454545454545456,"pc":0.9999999999999999}]
}

const frequencyOrderEnum = {
    name: "order",
    type: "enum",
    title: "gZCx",
    values: [
        {
            key: 1, 
            title: "AUbD"
        },
        {
            key: 2, 
            title: "WSJH"
        },
        {
            key: 3, 
            title: "dkxz"
        },
        {
            key: 4, 
            title: "vJCU"
        }
    ]
}

const pearsonR = {
    type: "object",
    children: {
        r: correlationCoefficient
    }
}
*/
module.exports = {
    Schema: Schema,
    vectorResultSchemas: vectorResultSchemas
}