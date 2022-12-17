"use strict";

var $ = require("./locale").call;
var {filters, validators} = require("./parsers");
var schemas = require("./schemas");
const {Array, Math} = require("./extensions");
var {VectorValueError, ArgumentError, Empty} = require("./errors");

const registry = new WeakMap();
const enums = {_numeric: 1, _string: 2, _boolean: 3, _multiple: 4, _date: 5}

function setRegistryProperty(parent, key, value) {
    var data = getRegistryProperty(parent);
    data[key] = value;
    registry.set(parent, data);
}

function getRegistryProperty(parent, key = null) {
    return key ? registry.get(parent)[key] : registry.get(parent);
}

class Vector extends Array {
    constructor() {
        super();
        if([...arguments].length > 0) this.push(...arguments);
        registry.set(this, {});
    }
    /**
     * Returns the type of this vector, either as an enumeration (integer) or as a class name.
     * @param {boolean} verbose If the argument is true, it returns the full class name of the vector (eg NominalVector). Otherwise, it returns an enumeration (eg 3).
     * @returns {number | string} Returns the type of this vector.
     */
    type(verbose) {
        if(verbose) return this.constructor.name;
        else return enums[`_${this.constructor.name.replace("Vector","").toLocaleLowerCase()}`]
    }
    push(){
        for(let i of [...arguments].flat(Infinity - 1)){
            if(this.parse) super.push(this.parse(i));
            else super.push(i);
        }
    }
    name(value){
        if(value) {
            setRegistryProperty(this, "name", value)
            return this;
        } else return registry.get(this).name
    }
    weight(value){
        if(value) {
            setRegistryProperty(this, "weight", value)
            return this;
        } else return registry.get(this).name
    }
    serialize() {
        var obj = {
            values: this,
            name: this.name(),
            title: this.title()
        };
        return obj;
    }
    clone() {
        var _ = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
        registry.set(_, getRegistryProperty(this));
        return _;
    }
}

const vectorParser = {
    numeric: function(value) {
        if(value === 0 || value === "0") return 0;
        else if(!value) return null;
        else if(!isNaN(value)) return Number(value);
        else throw new VectorValueError($("UyOj", {value}), {vector: this, value: value});
    },
    string: function(value) {
        if(value || value === false || value === 0) return String(value);
        else return null;
        //else throw new VectorValueError($("UyOj", {value}), {vector: this, value: value});
    }
}

// #region VECTOR EXTENSIONS

class NumericVector extends Vector {
    constructor(){
        super(...arguments);
    }
}
NumericVector.prototype.parse = vectorParser.numeric;

class StringVector extends Vector {
    constructor(){
        super(...arguments);
    }
}
StringVector.prototype.parse = vectorParser.string;

// #endregion

const VectorMethodsModels = [
    {
        name: "sum",
        fn: Array.prototype.sum,
        filter: filters.number,
        wiki: {
            title: "gvdg",
            desription: "iMbD"
        },
        type: [1],
        returns: schemas.number
    },    
    {
        name: "count",
        fn: Array.prototype.count,
        wiki: {
            title: "tdrm",
            description: "ULJX"
        },
        type: [1,2,3],
        returns: schemas.uint
    },
    {
        name: "avg",
        fn: Array.prototype.avg,
        filter: filters.number,
        wiki: {
            title: "eFdj",
            description: "UYJN"
        },
        type: [1],
        returns: schemas.number
    },
    {
        name: "stdev",
        fn: Array.prototype.stdev,
        filter: filters.number,
        wiki: {
            title: "oUcc",
            description: "ZgSc"
        },
        type: [1],
        returns: schemas.number,
        args: {
            s: {
                wiki: {
                    title: "eJTq",
                    description: "FfpU"
                },
                required: false,
                default: false,
                type: "boolean",
                validator: validators.boolean
                }
            }
    },
    {
        name: "variance",
        fn: Array.prototype.variance,
        filter: filters.number,
        wiki: {
            title: "TvQv",
            description: "sfCh"
        },
        type: [1],
        returns: schemas.number,
        args: {
            s: {
                wiki: {
                    title: "eJTq",
                    description: "FfpU"
                },
                required: false,
                default: false,
                type: "boolean",
                validator: validators.boolean
                }
            }
    },
    {
        name: "histogram",
        fn: Array.prototype.histogram,
        filter: filters.number,
        wiki: {
            title: "PAwR",
            description: "AISp"
        },
        type: [1],
        returns: schemas.histogram,
        args: {
            maxIntervals: {
                wiki: {
                    title: "WnZK",
                    description: "FfpU"
                },
                required: false,
                default: null,
                type: "number",
                validator: validators.positiveInteger,
            },
            fixedInterval: {
                wiki: {
                    title: "Mnfn",
                    description: "yOuB"
                },
                required: false,
                default: null,
                type: "number",
                validator: validators.positiveDecimal,
                }
        }
    },
    {
        name: "min",
        fn: Array.prototype.min,
        filter: filters.number,
        wiki: {
            title: "FkaD",
            description: "yBlA"
        },
        type: [1,2],
        returns: [schemas.number, schemas.string],
    },
    {
        name: "max",
        fn: Array.prototype.max,
        filter: filters.number,
        wiki: {
            title: "nKuF",
            description: "gkep"
        },
        type: [1,2],
        returns: [schemas.number, schemas.string]
    },
    {
        name: "range",
        fn: Array.prototype.range,
        filter: filters.number,
        wiki: {
            title: "mXxJ",
            description: "dnzB"
        },
        type: [1],
        returns: schemas.number
    },
    {
        name: "varc",
        fn: Array.prototype.varc,
        filter: filters.number,
        wiki: {
            title: "uwpU",
            description: "fUpj"
        },
        type: [1],
        returns: schemas.number,
        args: {
            s: {
                wiki: {
                    title: "eJTq",
                    description: "FfpU"
                },
                required: false,
                default: false,
                type: "boolean",
                validator: validators.boolean
                }
            }
    },
    {
        name: "percentile",
        fn: Array.prototype.percentile,
        filter: filters.number,
        wiki: {
            title: "fPra",
            description: "yNbM"
        },
        type: [1],
        returns: schemas.number,
        args: {
            k: {
                wiki: {
                    title: "dBDt",
                    description: "GQpQ"
                },
                required: true,
                type: "decimal",
                validator: validators.zeroToOneInc
                }
            }
    },
    {
        name: "frequency",
        fn: Array.prototype.frequency,
        filter: null,
        wiki: {
            title: "dYJK",
            description: "Tzyp"
        },
        type: [1,2,3],
        returns: schemas.frequencyTable,
        args: {
            order: {
                wiki: {
                    title: "gZCx"
                },
                required: false,
                default: 1,
                type: "enum",
                validator: validators.enumValidator(schemas.frequencyOrderEnum)
                }
            }
    },
    {
        name: "geomean",
        fn: Array.prototype.geomean,
        filter: filters.number,
        wiki: {
            title: "louK",
            description: "PDzr"
        },
        type: [1]
    },
    {
        name: "harmean",
        fn: Array.prototype.harmean,
        filter: filters.number,
        wiki: {
            title: "vpdN",
            description: "nhJv"
        },
        type: [1]
    },
    {
        name: "median",
        fn: Array.prototype.median,
        filter: filters.number,
        wiki: {
            title: "TzfX",
            description: "YIir"
        },
        type: [1]
    },
    {
        name: "mode",
        fn: Array.prototype.mode,
        wiki: {
            title: "StQx",
            description: "IBfx"
        },
        type: [1,2,3]
    },
        /* směrodatná chyba průměru */
    {
        name: "SEM",
        fn: Array.prototype.SEM,
        filter: filters.number,
        wiki: {
            title: "dLmV",
            description: "ZBnI"
        },
        type: [1]
    },
    {
        name: "skewness",
        fn: Array.prototype.skewness,
        filter: filters.number,
        wiki: {
            title: "oPPx",
            description: "",
        },
        type: [1],
        args: {
            s: {
                wiki: {
                    title: "eJTq",
                    description: "FfpU"
                },
                required: false,
                default: false,
                type: "boolean",
                validator: validators.boolean
                }
            }
    },
    {
        name: "kurtosis",
        fn: Array.prototype.kurtosis,
        filter: filters.number,
        wiki: {
            title: "oPPx",
            description: "UOBG"
        },
        type: [1]
    }
]

class VectorMethod {
    constructor(model, parent) {
        if(parent) this.parent = parent;
        if(typeof model == "string") {            
            if(!VectorMethodsModels[model]) throw new Error("Model not found: " + model);
            else this.model = Models.vector[model];
        } else if(typeof model == "object") this.model = model;
        else throw new Error("Unknown VectorMethod constructor parameter type.")
    }
    /**
     * Returns the name of the method.
     */
    get name() {return this.model.name};
    /**
     * Returns the calculation method.
     */
    get fn() {return this.model.fn};
    /**
     * Returns default filter function applied before the method is calculated.
     */
    get filter() {return this.model.filter ? this.model.filter.fn : () => true}
    /**
     * Returns an object with method documentation.
     */
    get wiki() {
        if(this.model.wiki) {
            return {
                name: $(this.model.wiki.title),
                description: $(this.model.wiki.description),
                filter: this.model.filter ? $(this.model.filter.text) : null,
                applies: [
                    {type: 1, title: $("LOYN"), apply: this.model.type.indexOf(1) > -1},
                    {type: 2, title: $("zoiB"), apply: this.model.type.indexOf(2) > -1},
                    {type: 3, title: $("OkoC"), apply: this.model.type.indexOf(3) > -1}
                ],
                returns: this.model.returns,
                arguments: (function(args){
                    var _ = [];
                    if(!args) return [];
                    else {
                        for(let k of Object.keys(args)) {
                            _.push({
                                name: k,
                                title: args[k].wiki?.title ? $(args[k].wiki.title) : null,
                                validator: args[k].validator?.text ? $(args[k].validator?.text) : null,
                                description: args[k]?.wiki?.description ? $(args[k].wiki.description) : null,
                                required: !!args[k]?.required,
                                default: args[k].default || null,
                                multiple: !!args[k].multiple
                            })
                        }
                    }
                    return _;
                })(this.model.args)
            }
        } else return {};
    }
    
    /**
     * 
     * @returns {any} Returns the result of the main function.
     */
    call() {
        if(!this.parent) return new Empty($("hKRq"));
        else if(this.model.type.indexOf(this.parent?.type()) === -1) return new Empty($("ibNu", {method: $(this.model.wiki.title), type: $(getVectorTypeLabelCode(this.parent))}))
        var args = this.validate(...arguments);
        var vector = this.filter ? this.parent.filter(this.filter) : this.parent;
        return this.fn.call(vector, ...args);
    }
    /**
     * 
     * @param {Vector} parent Specifies the vector on which the method should be applied.
     * @returns {VectorMethod} Returns the original VectorMethod instance.
     */
    with(parent) {
        this.parent = parent;
        return this;
    }
    /**
     * Validates the method arguments.
     * @returns {Array} Returns an array of validated arguments (or nothing if a validation error is thrown before).
     */
    validate() {
        if(!this.parent) return new Empty($("hKRq"));
        var i = 0;
        var args = Array.prototype.slice.call(arguments);
        var rebuilt = [];
        if((this.model.args || []).length === 0) return args;
        for(let k of Object.keys(this.model.args)) {
            var _validator = this.model.args[k]?.validator?.fn || function(v){return v};
            if((!args[i] && args[i] !== 0 && args[i] !== false))
            {
                if(this.model.args[k]?.required) throw new ArgumentError($("dSWt", {name: k, title: $(this.model.args[k].wiki?.title), method: $(this.model.wiki?.title)}), this);
                else rebuilt.push(this.model.args[k].default);
            }
            else {
                try {
                    rebuilt.push(_validator(args[i]));
                } catch(e) {
                    throw new ArgumentError(e, this)
                }
            }
            i++;
        }
        return rebuilt;
    }
}

VectorMethodsModels.forEach(function(m) {
    Vector.prototype[m.name] = function() {
        var M = new VectorMethod(m, this);
        return M.call(...arguments);
    };
});

function getVectorTypeLabelCode(vector) {
    switch (vector.type()) {
        case 1:
            return "kPSW";
            break;
        case 2:
            return "UQoV";
            break;
        case 3:
            return "WiEE";
            break;
        case 4:
            return "LiPr";
            break;
        case 5:
            return "sbFB";
            break;
        default:
            return null;
    }
}

const Models = {}
VectorMethodsModels.map(function(m){Models[m.name] = new VectorMethod(m)});

module.exports = {
    $: $,
    NumericVector: NumericVector,
    StringVector: StringVector,
    VectorMethod: VectorMethod,
    Models: Models
}