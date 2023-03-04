var $ = require('./locale').call;
var {Matrix} = require("./matrix");
var {NumericVector,StringVector,BooleanVector} = require("./vector");

var lib = {
    anyVector: {
        title: "yWUM",
        description: null,
        validator: "mPC4",
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
    }
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
        this.default = undefined;
        this.required = model.required;
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
            if(!model.required && (value === undefined || value === null)) return undefined;
            else if(model.required && (value === undefined)) throw new Error("The argument is required");
            else return model.validate(value, parent);
        }
    }
    /**
     * 
     * @returns {String} Returns this argument's documentation as a markdown table row.
     */
    toMarkdown() {
        return `| ${this.name || ""} | ${this.title.value} | ${this.mdType.value} | ${this.validator.value} | ${this.required ? "✔️" : ""} | ${this.default !== undefined ? this.default : ""} |`;   
    };
}

function parseVector(v, parent) {
    if(!v) throw new Error("Value is empty");
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