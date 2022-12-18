"use strict";

var {NumericVector, StringVector, BooleanVector} = require("./vector");
var {filters, validators} = require("./parsers");
var schemas = require("./schemas");
const {Array, Math, String, Function} = require("./extensions");
//const {VectorMarkdown, VectorOverview} = require("./markdown");
var {VectorValueError, ArgumentError, Empty} = require("./errors");

const registry = new WeakMap();

class Matrix extends Array {
    constructor(){
        super();
        this.push(...arguments);
    }
    push() {
        for(let a of [...arguments].filter(v => v)) {
            if(a.isVector) super.push(a)
            else if(Array.isArray(a)) super.push(a.vectorify());
            else throw new ArgumentError("Argument is not a vector or array.");
        };
    }
    clone(flush = false) {
        return new Matrix(...new Array(...this).map(v => v.clone()));
    }
    /**
     * Returns a vector according to the specified identifier. The identifier argument is extremely flexible, it can be a number (the order of the vector), text (the name of the vector), an instance of the vector, or a filter function with which the vector is searched in the matrix.
     * @param {number | string | Vektor | function} identifier 
     * @returns {Vektor} Returns a Vector instance or (if not found) null.
     */
    item(identifier) {
        if(!identifier && identifier !== 0) return null;
        else if(!isNaN(identifier)) return this[Number(identifier)];
        else if(typeof identifier == "string") return this.find(v => v.name() == identifier);
        else if(identifier?.isVector) {
            var byObject = this.find(v=> v == identifier);
            if(byObject) return byObject;
            else {
                if(identifier.name()) return this.find(v => v.name() == identifier.name()) || null;
                else return null;
            }
        }
        else if(identifier.constructor?.name == "Function") return this.find(identifier);
        else return null;
    }
    select(...identifiers) {
        var clone = new Matrix();
        for(let i of identifiers) {
            console.error(i);
            var v = this.item(i);
            if(v) clone.push(v);
        }
        return clone;
    }
    /** ATTENTION - this method filter rows, not vectors!"
     * 
    */
    filter() {
        if([...arguments].length === 0) return this;
        else if([...arguments].length === 1 && typeof [...arguments][0] == "function") return new Matrix(...new Array(...this).filter([...arguments][0]));
        else {
            var groups = [];
            if([...arguments].length % 2 !== 0) throw new Error("Odd number of arguments!!")
            for(var i = 0; i < [...arguments].length; i +=2) {
                groups.push({
                    v: this.item([...arguments][i]),
                    f: [...arguments][i + 1]
                });
            };
            debugger;
            var target = this.clone().flush();
            const interval = Math.round(Math.sqrt(this.maxRows()));
            for(var r = 0; r < this.maxRows(); r++) {   
                if(groups.map(g => g.f(g.v[r], r, g.v)).filter(g => g).length === groups.length) {
                    target.appendRow(...this.row(r))
                }
            }
            return target;
        }
    }
    removeEmpty() {
        var fs = new Array(...this).map((v,i) => [i, (v) => v !== null]).flat(Infinity);
        return this.filter(...fs);
    }
    row(index) {
        if(index > this.maxRows() - 1) return null;
        return new Array(...this).map(v => v[index] || null);
    }
    appendRow(...values) {
        for(var i = 0; i < values.length; i++) {
            (this[i] || []).push(values[i])
        }
        return this;
    }
    /**
     * Removes the vector values but leave the matrix structure (in terms of vector types etc.) intact.
     * @returns {this}
     */
    flush() {
        for(var v of this) {
            v = v.clone(true);
        };
        return this;
    }
    /**
     * 
     * @returns 
     */
    maxRows() {
        return Math.max(...new Array(...this).map(v => v.length));
    }
    minRows() {
        return Math.min(...new Array(...this).map(v => v.length));
    }
}

function and() {
    return !!![...arguments].find(a => !a);
}


module.exports = {
    Matrix: Matrix,
};