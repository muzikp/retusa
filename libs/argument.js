var $ = require('./locale').call;
var {Matrix} = require("./matrix");
var {NumericVector,StringVector,BooleanVector} = require("./vector");

var lib = {
    any: {
        title: "oMas",
        //validator: "NfvF",
        mdType: "oMas",
        tag: {
            control: "input",
            type: "any"
        },
        validate: function(value, parent, model){
            return value;
        }
    },
    number: {
        title: "pelN",
        validator: "NfvF",
        mdType: "pelN",
        tag: {
            control: "input",
            type: "number"
        },
        validate: function(value, parent, model){
            if(isNaN(value)) throw new Error($("Jphg",{name: model.name, title: $(model.title), value: value}));
            else return Number(value);
        }
    },
    boolean: {
        title: "kbla",
        validator: "GHFj",
        mdType: "kbla",
        tag: {
            control: "boolean"
        },
        validate: function(value, parent){
            if(value) return true;
            else return false
        }
    },
    positiveInteger: {
        title: "IrhN",
        validator: "dFiw",
        mdType: "pelN",
        tag: {
            control: "input",
            type: "number",
            min: 1,
            step: 1            
        },
        validate: function(value, parent, model){
            if(isNaN(value)) throw new Error($("Jphg", {value: value}));
            else if(Math.round(Number(value)) < 1) throw new Error($("BaeM",{name: model.name, title: $(model.title), value: value}));
            else if(Number(value) % 1 != 0) throw new Error($("VxSV",{name: model.name, title: $(model.title), value: value}));
            else return Number(value);
        }
    },
    positiveDecimal: {
        title: "ffka",
        validator: "dFiw",
        mdType: "ffka",
        tag: {
            control: "input",
            type: "number",
            min: 0.0000000000000001,
            step: 0.0000000000000001    
        },
        validate: function(value, parent, model){
            if(isNaN(value)) throw new Error($("Jphg", {name: model.name, title: $(model.title), value: value}));
            else if(Number(value) <= 0) throw new Error($("baSh", {name: model.name, title: $(model.title), value: value}));
            else return Number(value);
        }
    },
    zeroToOneInc: {
        title: "OQnL",
        validator: "dFiw",
        mdType: "OQnL",
        tag: {
            control: "input",
            type: "number",
            min: 0,
            max: 1,
            step: 0.0000000000000001    
        },
        validate: function(value, parent, model){
            if(isNaN(value)) throw new Error($("Jphg", {name: model.name, title: $(model.title), value: value}));
            else if(Number(value) < 0 || Number(value) > 1) throw new Error($("vKlu", {name: model.name, title: $(model.title), value: value}));
            else return Number(value);
        }
    },
    anyVector: {
        title: "yWUM",
        description: null,
        validator: "mPC4",
        mdType: "WGo9",
        isVector: true,
        isMultiple: false,
        tag: {
            control: "select",
            multiple: false,
            vectorTypes: [1,2,3]
        },
        validate: function(value, parent){
            var v = parseVector(value, parent);
            return v;
        }
    },
    numericVector: {
        title: "gtdH",
        validator: "suji",
        mdType: "wggy",
        isVector: true,
        isMultiple: false,
        tag: {
            control: "select",
            multiple: false,
            vectorTypes: [1]
        },
        validate: function(value, parent){
            var v = parseVector(value, parent);
            if(v.type() !== 1) throw new Error($("cNG4"))
            else return v;
        }
    },
    booleanVector: {
        title: "boQk",
        validator: "JwDb",
        mdType: "boQk",
        isVector: true,
        isMultiple: false,
        tag: {
            control: "select",
            multiple: false,
            vectorTypes: [3]
        },
        validate: function(value, parent){
            var v = parseVector(value, parent);
            if(v.type() !== 3) throw new Error($("KvHv"))
            else return v;
        }
    },
    numericVectors: {
        title: "AQoT",
        validator: "nohy",
        mdType: "8TtV",
        isVector: true,
        isMultiple: true,
        tags: {
            control: "select",
            multiple: true,
            vectorTypes: [1]
        },
        validate: function(value, parent){
            var m = parseMatrix(value, parent);
            for(let v of m) {
                if(v.type() !== 1) throw new Error($("cNG4"))
            }            
            return m;
        }
    },
    regressionModel: {
        title: "OBml",
        validator: "dKFL",
        mdType: "u5oV",
        isEnum: true,
        enums: [
            {
                value: 1, //linear
                key: "Cpsw"
            },
            {
                value: 2, // logistic
                key: "UtZD"
            },
            {
                value: 3, //hyperbole
                key: "SCOx"
            },
            {
                value: 4, //exponential
                key: "QaJi"
            },
            {
                value: 5, //quadratic
                key: "HUMA"
            }
        ],
        default: 1,
        tags: {
            control: "select",
            multiple: false
        },
        validate: function(value, parent, model){
            return validateEnum(value, parent, model);
        }
    },
    frequencyOrder: {
        type: "enum",
        title: "gZCx",
        validator: "dKFL",
        mdType: "u5oV",
        isEnum: true,
        enums: [
            {
                value: 1, 
                key: "AUbD"
            },
            {
                value: 2, 
                key: "WSJH"
            },
            {
                value: 3, 
                key: "dkxz"
            },
            {
                value: 4, 
                key: "vJCU"
            }
        ],
        default: 1,
        tags: {
            control: "select",
            multiple: false
        },
        validate: function(value, parent, model){
            return validateEnum(value, parent, model);
        }
    },
}

class Argument {
    constructor(name, parent, overloads) {
        var model = lib[name];
        if(!model) throw new Error("Unknown argument model name: " + name);
        if(typeof overloads == "object") {
            Object.keys(overloads).forEach(function(key) {
                model[key] = overloads[key];
            });
        }
        this.name = model.name;
        this.mdType = {
            key: model.mdType,
            value: $(model.mdType)
        }
        this.title = {
            key: model.title || null,
            value: $(model.title)
        };
        this.default = model.default;
        this.required = model.required;
        if(model.isEnum) {
            this.isEnum = true;
            this.enums = model.enums.map(function(e){
                e.title = $(e.key);
                return e;
            });
        }
        this.description = {
            key: model.description || null,
            value: $(model.description) || null
        };
        this.validator = {
            key: model.validator || null,
            value: $(model.validator) || null
        };
        this.isVector = model.isVector || false;
        this.validate = function(value) {
            if(model.default !==undefined && (value === undefined || value === null)) {
                return model.default;
            }
            else if(!model.required && (value === undefined || value === null)) {
                return undefined;
            }
            else if(model.required && (value === undefined)) {
                throw new Error($("HOuY", {name: model.name, title: $(model.title)}));
            }
            else return model.validate(value, parent, model);
        }
    }
}

function parseVector(v, parent) {
    if(!v && v !== 0) throw new Error("Value is empty");
    if(parent) {
        if(parent.item(v)) return parent.item(v);
    }
    if(!Array.isArray(v)) throw new Error("Value must be iterable");
    else if(v.isVector) return v;
    else {
        try {
            return v.vectorify();
        } catch (e) {
            throw new Error("The value cannot be converted to a vector.")
        }
    }
}

function parseMatrix(arr, parent) {
    if(!Matrix) var {Matrix} = require("./matrix");
    if(parent) {
        if(parent.item(arr)) return new Matrix(parent.item(arr));
    }
    if(!Array.isArray(arr)) throw new Error("Value must be iterable.");
    else if(arr.isMatrix) return arr;
    else if(arr.isVector) return new Matrix(arr)
    else {
        var M = new Matrix();
        arr.forEach(function(a){
            if(a.isVector) M.push(a);
            else if(parent.item(a)) M.push(parent.item(a));
        });
        return M;
    }
}

function validateEnum(value, parent, model) {
    if(model.enums.map(e => e.value).indexOf(Number(value)) < 0) {
        var keys = model.enums.map(e => `${e.value} = ${$(e.key)}`).join(", ")
        throw new Error($("HhLt", {name: $(model.name), title: $(model.title), value: value, keys: keys}))
    } else return Number(value);
}

module.exports = {Argument}