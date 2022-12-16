"use strict";

var $ = require("./locale").call;
var {filters, validators} = require("./parsers");
var schemas = require("./schemas");
const Array = require("./array");
var {VectorValueError} = require("./errors");

const registry = new WeakMap();
const enums = {_scale: 1, _ordinal: 2, _nominal: 3, _binary: 4, _date: 5}

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
    title(value){
        if(value) {
            setRegistryProperty(this, "title", value)
            return this;
        } else return registry.get(this).title
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

Vector.prototype.type = function(verbose){
    if(verbose) return this.constructor.name;
    else return enums[`_${this.constructor.name.replace("Vector","").toLocaleLowerCase()}`]
}

/**
 * 
 * @returns Destroys everything you loved...
 */
Vector.prototype.flush = function(){
    this.length = 0;
    return this;
}

// #region SCALE VECTOR

class ScaleVector extends Vector {
    constructor(){
        super(...arguments);
    }
}

ScaleVector.prototype.parse = function(value) {
    if(value === 0 || value === "0") return 0;
    else if(!value) return null;
    else if(!isNaN(value)) return Number(value);
    else throw new VectorValueError($("UyOj", {value}), {vector: this, value: value});
}

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
        type: [1,2],
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
        fn: Array.prototype.sum,
        filter: filters.number,
        wiki: {
            title: "eFdj",
            description: "UYJN"
        },
        type: [1],
        returns: schemas.number
    }
]

class VectorMethod {
    constructor(model, parent) {
        this.parent = parent;
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
     * Main function.
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
                example: this.model.example || null,
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
        var args = this.validate(...arguments);
        return this.fn.call(this.parent, ...args);
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
        var i = 0;
        var args = Array.prototype.slice.call(arguments);
        var rebuilt = [];
        if((this.model.args || []).length === 0) return args;
        for(let k of Object.keys(this.model.args)) {
            var _validator = this.model.args[k]?.validator?.fn || function(v){return v};
            if((!args[i] && args[i] !== 0 && args[i] !== false))
            {
                if(this.model.args[k]?.required) throw new Error($("dSWt", {name: this.model.args[k].name, title: this.model.args[k].wiki?.title}));
                else rebuilt.push(this.model.args[k].default);
            }
            else {
                try {
                    rebuilt.push(_validator(args[i]));
                } catch(e) {
                    throw new ArgumentError(k, this.model.args[k], this.model, e)
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

module.exports = {
    $: $,
    ScaleVector: ScaleVector
}
