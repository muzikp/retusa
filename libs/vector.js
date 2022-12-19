"use strict";

var $ = require("./locale").call;
var {filters, validators} = require("./parsers");
var schemas = require("./schemas");
const {Array, Math, String, Function} = require("./extensions");
const {VectorMarkdown, VectorOverview} = require("./markdown");
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
    parent(value){
        if(value) {
            setRegistryProperty(this, "parent", value)
            return this;
        } else return registry.get(this).parent
    }
    serialize() {
        var obj = {
            values: this,
            name: this.name(),
        };
        return obj;
    }
    clone(flush = false) {
        if(!flush) return new this.constructor();
        else return new this.constructor(...this);
        
    }
    /**
    * Instead of values, this method extracts indexes of values matching the filter (see @param) and return an array of indexes. 
    * @param {function} filter A function or a strong type filter type (string). Strong type filters: notempty, empty.
    * @return {Array<integer>} Returns an array of indexes of values matching the given filter.
    */
    ifilter(filter = () => true) {
        return new Array(...this._values).map(function(v, i){
            if(filter(v)) return i;
            else return -1;
        }).filter(x => x > -1 );
    }
}

/**
* Whenever you need to make sure an instance is a vector or any of its extended children, call this property.
*/
Vector.prototype.isVector = true;

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
    },
    boolean: function(value) {
        if(value) return true;
        else if(value === false || value === 0) return false;
        else return null;
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

class BooleanVector extends Vector {
    constructor(){
        super(...arguments);
    }
}
BooleanVector.prototype.parse = vectorParser.boolean;

Array.prototype.numerify = function(){
    return new NumericVector(...this);
}

Array.prototype.stringify = function(){
    return new StringVector(...this);
}

Array.prototype.boolify = function(){
    return new BooleanVector(...this);
}

Array.prototype.vectorify = function() {
    if(this.find(v => v !== true && v !==false && v !== null))
    {
        try {
            return new NumericVector(...this)
        } catch (e) {
            return new StringVector(...this);
        }
    } else return new BooleanVector(...this);
}

// #endregion

const VectorMethodsModels = [
    {
        name: "sum",
        fn: Array.prototype.sum,
        filter: filters.number,
        wiki: {
            title: "gvdg",
            description: "iMbD"
        },
        type: [1],
        returns: schemas.number,
        example: function(){
            var cashflow = new NumericVector(200,250,150,320,240,-250,10,-320).sum();  /* = 600 */
        }
    },    
    {
        name: "count",
        fn: Array.prototype.count,
        wiki: {
            title: "tdrm",
            description: "ULJX"
        },
        type: [1,2,3],
        returns: schemas.uint,
        example: function(){
            var total_numeric = new NumericVector(200,250,null,150,320,240,-250,null,10,-320).count();  /* = 10 */
            var total_string = new StringVector("A","B","C","D").count();  /* = 4 */
            var total_boolean = new BooleanVector(true, true, false, null, false, true).count();  /* = 6 */
        }
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
        returns: schemas.number,
        example: function(){
            var avgCashFlow = new NumericVector(200,250,150,320,240,-250,10,-320).sum();  /* = 75 */
        }
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
        example: function(){
            var population = new NumericVector(10,20,15,25,23,19,18,17,24,23).stdev();  /* = 4.41 */
            var sample = new NumericVector(10,20,15,25,23,19,18,17,24,23).stdev(true); /* = 4.65 */ 
        },
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
        example: function(){
            var population = new NumericVector(10,20,15,25,23,19,18,17,24,23).variance();  /* = 19.44 */
            var sample = new NumericVector(10,20,15,25,23,19,18,17,24,23).variance(true); /* = 21.6 */ 
        },
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
        example: function(){
            var score = new NumericVector(4.5,3.9,5,6,7,5.7,9.1,5.3,7.2,6.9,6,7.5,5.3,7.1,8.2,1);
            var h1 = score.histogram();
            /*
            ┌─────────┬───────────────────┬───────────────────┬─────────────────┬───┬────┬────────┬────────┐
            │ (index) │       from        │        to         │        i        │ n │ nc │   p    │   pc   │
            ├─────────┼───────────────────┼───────────────────┼─────────────────┼───┼────┼────────┼────────┤
            │    0    │         1         │       3.025       │  '1.00 - 3.00'  │ 1 │ 1  │ 0.0625 │ 0.0625 │
            │    1    │       3.025       │       5.05        │  '4.00 - 5.00'  │ 3 │ 4  │ 0.1875 │  0.25  │
            │    2    │       5.05        │ 7.074999999999999 │  '6.00 - 7.00'  │ 7 │ 11 │ 0.4375 │ 0.6875 │
            │    3    │ 7.074999999999999 │        9.1        │  '8.00 - 9.00'  │ 5 │ 16 │ 0.3125 │   1    │
            │    4    │        9.1        │      11.125       │ '10.00 - 11.00' │ 1 │ 17 │ 0.0625 │ 1.0625 │
            └─────────┴───────────────────┴───────────────────┴─────────────────┴───┴────┴────────┴────────┘
            */
            var h2 = score.histogram(4)
            /* 
            ┌─────────┬───────────────────┬───────────────────┬─────────────────┬───┬────┬────────┬────────┐
            │ (index) │       from        │        to         │        i        │ n │ nc │   p    │   pc   │
            ├─────────┼───────────────────┼───────────────────┼─────────────────┼───┼────┼────────┼────────┤
            │    0    │         1         │       3.025       │  '1.00 - 3.00'  │ 1 │ 1  │ 0.0625 │ 0.0625 │
            │    1    │       3.025       │       5.05        │  '4.00 - 5.00'  │ 3 │ 4  │ 0.1875 │  0.25  │
            │    2    │       5.05        │ 7.074999999999999 │  '6.00 - 7.00'  │ 7 │ 11 │ 0.4375 │ 0.6875 │
            │    3    │ 7.074999999999999 │        9.1        │  '8.00 - 9.00'  │ 5 │ 16 │ 0.3125 │   1    │
            └─────────┴───────────────────┴───────────────────┴─────────────────┴───┴────┴────────┴────────┘
            */
            var h3 = score.histogram(null, 2)
            /* 
            ┌─────────┬──────┬────┬────────────────┬───┬────┬────────┬────────┐
            │ (index) │ from │ to │       i        │ n │ nc │   p    │   pc   │
            ├─────────┼──────┼────┼────────────────┼───┼────┼────────┼────────┤
            │    0    │  1   │ 3  │ '1.00 - 3.00'  │ 1 │ 1  │ 0.0625 │ 0.0625 │
            │    1    │  3   │ 5  │ '3.00 - 5.00'  │ 3 │ 4  │ 0.1875 │  0.25  │
            │    2    │  5   │ 7  │ '5.00 - 7.00'  │ 7 │ 11 │ 0.4375 │ 0.6875 │
            │    3    │  7   │ 9  │ '7.00 - 9.00'  │ 4 │ 15 │  0.25  │ 0.9375 │
            │    4    │  9   │ 11 │ '9.00 - 11.00' │ 1 │ 16 │ 0.0625 │   1    │
            └─────────┴──────┴────┴────────────────┴───┴────┴────────┴────────┘
            */

        },
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
        filter: filters.notnull,
        wiki: {
            title: "FkaD",
            description: "yBlA"
        },
        type: [1,2],
        example: function(){
            var numeric_min = new NumericVector(4.5, 3.9, 5, 6, 7, 5.7, 9.1, 5.3, 7.2, 6.9, 6, 7.5, 5.3, 7.1, 8.2, 1).min(); /* = 1 */;
            var string_min = new StringVector("Norwood", "Pearson", "Fisher", "Nightingale", "Gauss", "Poisson").min(); /* = Fisher */
        },
        returns: [schemas.number, schemas.string],
    },
    {
        name: "max",
        fn: Array.prototype.max,
        filter: filters.notnull,
        wiki: {
            title: "nKuF",
            description: "gkep"
        },
        type: [1,2],
        returns: [schemas.number, schemas.string],
        example: function(){
            var numeric_max = new NumericVector(4.5, 3.9, 5, 6, 7, 5.7, 9.1, 5.3, 7.2, 6.9, 6, 7.5, 5.3, 7.1, 8.2, 1).max(); /* = 9.1 */;
            var string_max = new StringVector("Norwood", "Pearson", "Fisher", "Nightingale", "Gauss", "Poisson").max(); /* = Poisson */
        }
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
        returns: schemas.number,
        example: function(){
            var range = new NumericVector(5,2,-15,-16.3,12,null, null, 12,13,7).range(); /* = 22 */
        }
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
        example: function(){
            var population = new NumericVector(10,20,15,25,23,19,18,17,24,23).varc();  /* = 0.227 */
            var sample = new NumericVector(10,20,15,25,23,19,18,17,24,23).varc(true); /* = 0.24 */ 
        },
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
        example: function(){
            var score = new NumericVector(10,20,15,25,23,19,18,17,24,23);
            var median = score.percentile(0.5); /* = 19.5 */
            var q25 = score.percentile(0.25); /* = 17.25 */
            var max = score.percentile(1); /* = 25 */
        },
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
        example: function(){
            var numeric_vector_no_order = new NumericVector(5,2,3,2,3,3,1,6,3).frequency();
            /*
            ┌─────────┬───────┬───────────┐
            │ (index) │ value │ frequency │
            ├─────────┼───────┼───────────┤
            │    0    │   1   │     1     │
            │    1    │   2   │     2     │
            │    2    │   3   │     4     │
            │    3    │   5   │     1     │
            │    4    │   6   │     1     │
            └─────────┴───────┴───────────┘ 
            */
            var string_vector_desc_value = new StringVector("E","B","C","B","C","C","A","F","C").frequency(3);
            /* 
            ┌─────────┬───────┬───────────┐
            │ (index) │ value │ frequency │
            ├─────────┼───────┼───────────┤
            │    0    │  'F'  │     1     │
            │    1    │  'A'  │     1     │
            │    2    │  'C'  │     4     │
            │    3    │  'B'  │     2     │
            │    4    │  'E'  │     1     │
            └─────────┴───────┴───────────┘
            */
            var boolean_vector_desc_frequency = new BooleanVector(true, false, null, true, null, null).frequency(4);
            /* 
            ┌─────────┬─────────┬───────────┐
            │ (index) │  value  │ frequency │
            ├─────────┼─────────┼───────────┤
            │    0    │  null   │     3     │
            │    1    │ 'true'  │     2     │
            │    2    │ 'false' │     1     │
            └─────────┴─────────┴───────────┘
            */
        },
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
        type: [1],
        returns: schemas.number,
        example: function(){
            var x = new framework.NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).geomean(); /* = 21.24*/
        }
    },
    {
        name: "harmean",
        fn: Array.prototype.harmean,
        filter: filters.number,
        wiki: {
            title: "vpdN",
            description: "nhJv"
        },
        type: [1],
        returns: schemas.number,
        example: function(){
            var x = new framework.NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).harmean(); /* = 21.03*/
        }
    },
    {
        name: "median",
        fn: Array.prototype.median,
        filter: filters.number,
        wiki: {
            title: "TzfX",
            description: "YIir"
        },
        type: [1],
        returns: schemas.number,
        example: function(){
            var median = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).median(); /* = 21*/
        }
    },
    {
        name: "mode",
        fn: Array.prototype.mode,
        wiki: {
            title: "StQx",
            description: "IBfx"
        },
        type: [1,2,3],
        returns: schemas.any,
        example: function(){
            var x = new NumericVector(1,2,3,4,3,4,5,3).mode(); /* = 3 */
            var y = new StringVector("a",null,null,"b","c","d",null,"b").mode(); /* = null */
            var z = new BooleanVector(true, false, true).mode(); /* = true */
        }

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
        type: [1],
        returns: schemas.number,
        example: function(){
            var sem = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).SEM(); /* = 0.67*/
        }
    },
    {
        name: "skewness",
        fn: Array.prototype.skewness,
        filter: filters.number,
        wiki: {
            title: "KZgI",
            description: "",
        },
        type: [1],
        returns: schemas.number,
        example: function(){
            var skewness_population = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).skewness(false); /* = 0.52*/
            var skewness_sample = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).skewness(true); /* = 0.027*/
        },
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
        type: [1],
        returns: schemas.number,
        example: function(){
            var kurtosis = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).kurtosis(); /* = 0.425*/
        },
    },
    {
        name: "ttest",
        fn: Array.prototype.ttest,
        filter: filters.number,
        wiki: {
            title: "VEAt",
            description: "rbjM"
        },
        type: [1],
        returns: schemas.number,
        example: function(){
            var score = new NumericVector(10,20,15,25,23,19,18,17,24,23);
            var median = score.percentile(0.5); /* = 19.5 */
            var q25 = score.percentile(0.25); /* = 17.25 */
            var max = score.percentile(1); /* = 25 */
        },
        args: {
            populationMean: {
                wiki: {
                    title: "GRoZ",
                    description: "xtfz"
                },
                required: true,
                type: "number",
                validator: validators.number
                }
            }
    },
].sort((a,b) => a.name > b.name);

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
                name: this.model.name,
                title: $(this.model.wiki.title),
                description: $(this.model.wiki.description),
                filter: this.model.filter ? $(this.model.filter.text) : null,
                applies: [
                    {type: 1, title: $("LOYN"), apply: this.model.type.indexOf(1) > -1},
                    {type: 2, title: $("zoiB"), apply: this.model.type.indexOf(2) > -1},
                    {type: 3, title: $("OkoC"), apply: this.model.type.indexOf(3) > -1}
                ],
                returns: this.model.returns,
                example: this.model.example ? this.model.example.stringify() : null,
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
    /* Generates a markdown documentation for the vector method */
    markdown(level = 1) {
        return VectorMarkdown(this.wiki, level);
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
    BooleanVector: BooleanVector,
    VectorMethod: VectorMethod,
    Models: Models,
    VectorOverview: VectorOverview(Models)
}