var $ = require('./locale').call;
var {Matrix} = require("./matrix");
var {NumericVector,StringVector,BooleanVector} = require("./vector");

var lib = {
    anyVector: {
        title: "yWUM",
        description: null,
        validator: "mPC4",
        mdType: "WGo9",
        isVector: true,
        isMultiple: false,
        tag: {
            type: "select",
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
            type: "select",
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
            type: "select",
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
            type: "select",
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
            type: "select",
            multiple: false
        },
        validate: function(value, parent, model){
            if(model.enums.map(e => value).indexOf(Number(value)) < 0) {
                var keys = model.enums.map(e => `${e.value} = ${e.title}`).join(",")
                throw new Error($("HhLt", {value: value, keys: keys}))
            } else return Number(value);
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
            if(!model.default !==undefined && (value === undefined || value === null)) return model.default;
            else if(!model.required && (value === undefined || value === null)) return undefined;
            else if(model.required && (value === undefined)) throw new Error("The argument is required");
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

module.exports = {Argument}