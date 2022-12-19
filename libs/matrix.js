"use strict";

var {NumericVector, StringVector, BooleanVector, $} = require("./vector");
var {filters, validators} = require("./parsers");
var schemas = require("./schemas");
const {Array, Math, String, Function} = require("./extensions");
const dist = require("./distribution");
//const {VectorMarkdown, VectorOverview} = require("./markdown");
var {VectorValueError, ArgumentError, Empty} = require("./errors");

const registry = new WeakMap();

class Matrix extends Array {
    /**
     * Initializes a new instance of the Matrix class.
     */
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
    /**
     * Similar to a pivot table in Excel without aggregation. Converts a matrix of two vectors to a new matrix where the new factors are named after the unique values from the original factor. Nov vectors are filled with values that match the row filter in the original matrix.
     * @param {Vector identifier} target 
     * @param {Vector identifier} factor 
     * @param {Array} selectedKeys Optional. If you want to pivot only selected values from the factor vector, enlist them in the selectedKeys argument.
     * @returns {Matrix}
     */
    pivot(target, factor, selectedKeys = []) {
        target = validators.isVector.fn(target);
        factor = validators.isVector.fn(factor);
        var selection = this.select(target, factor);
        var pivot = new Matrix();        
        for(let key of factor.distinct().intersection(selectedKeys)) {
            pivot.push(new target.constructor(...selection.filter(factor, (v) => v === key)[0]).name(key));
        }
        return pivot;
    }
    /** Converts the Matrix into an array with key-value object values.
     * @returns {Array}
    */
    toTable() {
        var table = [];
        for(var r = 0; r < this.maxRows(); r++) {
            var row = {};
            for(var v = 0; v < this.length; v++) {
                row[this[v].name() || v] = this[v][r];
            }
            table.push(row);
        }
        return table;
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
    /** 
     * Attention! This method significantly extends the base method of the Array parent class. The method shows different behavior with respect to the number and type of arguments. If only one argument is given, the method behaves according to the following types:

       1) function: standard filtering as in Array
       2) Array: is taken as an array of row indices to be returned

    In the event that multiple filters of different vectors are to be considered at the same time, the arguments are given in a row as 1) vector identifier and 2) vector filter function. In this way, it is possible to sort the required number of identifier/function pairs one after the other, e.g. <Matrix>.filter(2, (v,i,arr) => v > 30, "B", (v,i,arr) = > in == 5).
     * @return {this | null} A filtered matrix.
    */
    filter() {
        if([...arguments].length === 0) return this;
        else if([...arguments].length === 1) {
            var arg = [...arguments][0];
            if(typeof arg == "function") return new Matrix(...new Array(...this).filter(arg));
            /* filters rows by indexes */
            else if(Array.isArray(arg)) {
                var target = this.clone().flush();
                for(var i = 0; i < arg.length; i++) {
                    target.appendRow(...this.row(arg[i]))
                }
                return target;
            }
            else return null;
        }
        else {
            var groups = [];
            if([...arguments].length % 2 !== 0) throw new Error("Odd number of arguments!!")
            for(var i = 0; i < [...arguments].length; i +=2) {
                groups.push({
                    v: this.item([...arguments][i]),
                    f: [...arguments][i + 1]
                });
            };
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
    /** Removes rows with any null value across all values in the row. */
    removeEmpty() {
        var fs = new Array(...this).map((v,i) => [i, (v) => v !== null]).flat(Infinity);
        return this.filter(...fs);
    }
    /**
     * Returns an array of values across the indexed row.
     * @param {number} index Row index.
     * @returns {Array} An array of the row values.
     */
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
     * Returns the length of the vector with the largest number of elements.
     * @returns {number}
     */
    maxRows() {
        return Math.max(...new Array(...this).map(v => v.length));
    }
    minRows() {
        return Math.min(...new Array(...this).map(v => v.length));
    }
    /**
     * Randomly filters N of cases from the variable values.
     * @param {number} size If the argument is less than 1, it is considered the percentage of cases to be selected from among the values. If greater than or equal to 1, the argument is treated as the absolute number of cases to be selected.
     */
    sample(size) {
        size = validators.positiveDecimal.fn(size);
        var indexes = (size < 1 ? Math.getRandomIndexes(this.maxRows(), Math.round(size * this.maxRows())) : Math.getRandomIndexes(this.maxRows(), size > this.maxRows() ? this.maxRows() : Math.round(size))).sort();
        return this.filter(indexes);
    }
}

class MatrixMethod {
    constructor(model, parent = null) {
        if(parent) this.parent = parent;
        if(typeof model == "string") {            
            if(!Models.table[model]) throw new Error("Model not found: " + model);
            else this.model = MatrixMethodsModels[model];
            
        } else if(typeof model == "object") this.model = model;
        else throw new Error("Unknown TableMethod constructor parameter type.")
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
    get filter() {return this.model.filter ? this.model.filter.fn : function(v) {return true}}
    /**
     * Returns an object with method documentation.
     */
    get wiki() {
        if(this.model.wiki) {
            return {
                name: this.model.name,
                title: $(this.model.wiki.title),
                description: this.model.wiki?.description ? $(this.model.wiki.description) : null,
                filter: this.model.filter ? $(this.model.filter.text) : null,
                example: this.model.example ? this.model.example.stringify() : null,
                arguments: (function(args){
                    var _ = [];
                    if(!args) return [];
                    else {
                        for(let k of Object.keys(args)) {
                            _.push({
                                name: k,
                                title: $(args[k].wiki.title),
                                description: $(args[k].wiki.description),
                                required: args[k].required,
                                default: args[k].default,
                                validator: null,
                                multiple: args[k].multiple
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
        var args = this.validate(...arguments);
        return this.model.fn(...args)
    }
    /**
     * 
     * @param {Variable} parent Specifies the matrix on which the method should be applied.
     * @returns {VectorMethod} Returns the original TableMethod instance.
     */
    with(parent) {
        this.parent = parent;
        return this;
    }
    get minArgs() {
        return this.model.minArgs || Object.entries(this.model.args).filter(a => a.required).length;
    }
    /**
     * Validates the method arguments and returns a new table instance ready for the method call.
     * @returns {Array} Returns an array of validated arguments (or nothing if a validation error is thrown before).
     */
    validate() {
        var T = [];
        var args = Array.prototype.slice.call(arguments);
        let ts = Object.entries(this.model.args).map(e => e[1]);
        for(var i = 0; i < ts.length; i++) {
            if(ts[i].multiple) {
                for(var r = i; r < args.length; r++) {
                    T.push(ts[i].validator(this.parent.item(args[r])))        
                }
            } else {
                T.push(ts[i].validator.fn(this.parent.item(args[i])))    
            }
        }
        return T;
    }
    
}

// #region Models

const matrixMethods = {
    correlPearson: function(x,y) {
       var T = new Matrix(x,y).removeEmpty();
       x = T[0];
       y = T[1];
       var arr = x.map(function(_,i){ return [_,y[i]]});
       var n = arr.length;
       var nSxy = n * arr.map(v => v[0] * v[1]).sum();
       var SxSy =  x.sum() * y.sum();
       var nSx2_Sx2 = n * (x.map(v => Math.pow(v, 2))).sum() - Math.pow(x.sum(), 2);
       var nSy2_Sy2 = n * (y.map(v => Math.pow(v, 2))).sum() - Math.pow(y.sum(), 2);
       var r = (nSxy - SxSy) / Math.pow(nSx2_Sx2 * nSy2_Sy2, 0.5);
       var df = n -2;
       var t_test = (r * Math.pow(n -2, 0.5)/Math.pow(1-Math.pow(r,2),0.5));
       var p = (1-dist.tdist(t_test,df))*2;
       return {
           r: r,
           N: n,
           p: p
       };
    },
    correlSpearman: function(x,y) {
        var T = new Matrix(x,y).removeEmpty();
        x = T[0].toAvgRank();
        y = T[1].toAvgRank();
        debugger;
        var n = x.length;
        var d2 = x.map((_x, i) => Math.pow(_x - y[i],2)).sum();
        var rs = 1 - ((6 * d2) / (n * (Math.pow(n, 2) - 1)));
        var df = n - 2;
        var t_test = rs / (Math.pow(1-Math.pow(rs,2),0.5))*Math.pow(n-2,0.5);
        var p = (1-dist.tdist(t_test,df)) * 2;
        return {
            r: rs,
            n: n,
            p: p
        }
    },
    correlKendall: function(x,y){
        var T = new Matrix(x,y).removeEmpty();
        x = T[0];
        y = T[1];
        const n = x.length;
        const yr = y.toAvgRank(0);
        var _ = x.toAvgRank(0).map(function(v,i){return {x: v, y: yr[i]}}).sort((a,b) => a.x < b.x ? -1 : 1);
        var cor = (_.map((r,i) => (_.slice(i+1, _.length).filter(__ => (__.x > r.x && __.y > r.y))))).flat(2).filter( i => i !== 0).length;
        var dis = (_.map((r,i) => (_.slice(i+1, _.length).filter(__ => (__.x > r.x && __.y < r.y))))).flat(2).filter( i => i !== 0).length;
        var t_cor = (_.map(function(v,i){return (_.slice(i+1, _.length).filter(__ => __.x === v.x)).length})).sum();
        var t_dis = (_.map(function(v,i){return (_.slice(i+1, _.length).filter(__ => __.y === v.y)).length})).sum();
        var c = Math.combinations(_.length, 2);
        var taua = (cor-dis)/c;
        var taub = (cor-dis)/Math.sqrt((c-t_cor)*(c-t_dis));
        var z = (3 * taub * Math.pow(n*(n-1), .5))/Math.pow(2*(2*n+5), .5);
        var p = 2* (1 - dist.normsdist(Math.abs(z)));
        return {
            r: taub,
            A: taua,
            B: taub,
            N: n,
            df: n-1,
            z:z,
            p:p,
        }
    },
    correlPartial: function(x,y,z){
        var T = new Matrix(x,y,z).removeEmpty();
        var n = T.maxRows();
        var ryz = T.correlPearson(1,2);
        var ryx = T.correlPearson(1,0);
        var rzx = T.correlPearson(2,0);
        var rp = (ryz.r - ryx.r * rzx.r)/Math.sqrt((1-Math.pow(ryx.r,2))*(1-Math.pow(rzx.r,2)));
        var t = (rp * Math.sqrt((n-3)))/(Math.sqrt(1-Math.pow(rp,2)));
        var p = (1 - dist.tdist(t, n-3)) * 2;
        return {
            r: rp,
            N: n,
            t: t,
            p: p
        }
    },
    correlBiserial: function(x,y){
        var T = new Table(x,y).removeEmpty();
        x = Variable.numeric(new Array(...T.item(0)._values).map(v => v ? 1 : 0));
        y = T.item(1);
        var n = T.max();
        return matrixMethods.correlPearson(x,y);
    },
    /** https://en.wikipedia.org/wiki/Phi_coefficient */
    correlPhi: function(x,y) {
        var T = new Table(x,y).removeEmpty();
        x = T.item(0).toNumeric().values();
        y = T.item(1).toNumeric().values();
        debugger;
        var x1y1 = x.filter((_x,i) => _x == 1 && y[i] == 1).length;
        var x1y0 = x.filter((_x,i) => _x == 1 && y[i] == 0).length;
        var x0y1 = x.filter((_x,i) => _x == 0 && y[i] == 1).length;
        var x0y0 = x.filter((_x,i) => _x == 0 && y[i] == 0).length;
        var x1 = x.filter(_x => _x == 1).length;
        var x0 = x.filter(_x => _x == 0).length;
        var y1 = y.filter(_y => _y == 1).length;
        var y0 = y.filter(_y => _y == 0).length;
        var phi = (x1y1*x0y0 - x1y0*x0y1)/Math.sqrt(x1*x0*y1*y0);
        debugger;
        return {};
    }
};

const MatrixMethodsModels = [
    {
        name: "correlPearson",
        fn: matrixMethods.correlPearson,
        example: function(x,y) {
            var correl = new Table([1,2,3,4,5],[4,5,6,7,8]).correlPearson(0,1);
            /*
            {
	"r": 0.7341461196855918,
	"N": 10,
	"p": 0.015619999999999967
}
            */
        },
        wiki: {
            title: "pTvR",
            description: "wPyG"
        },
        args: {
            x: {
                wiki: {title: "qFEM"},
                type: [1],
                required: true,
                validator: validators.generalCorrelVariable
            },        
            y: {
                wiki: {title: "tpUu"},
                type: [1],
                required: true,
                validator: validators.generalCorrelVariable
        }            
        }
    },
    {
        name: "correlSpearman",
        fn: matrixMethods.correlSpearman,
        example: null,
        wiki: {
            title: "eJTT",
            description: "jAGi"
        },
        args: {
            x: {
                wiki: {title: "qFEM"},
                type: [1],
                required: true,
                validator: validators.generalCorrelVariable
            },        
            y: {
                wiki: {title: "tpUu"},
                type: [1],
                required: true,
                validator: validators.generalCorrelVariable
        }            
        }
    },
    {
        name: "correlKendall",
        fn: matrixMethods.correlKendall,
        example: null,
        wiki: {
            title: "eJTT",
            description: "jAGi"
        },
        args: {
            x: {
                wiki: {title: "qFEM"},
                type: [1],
                required: true,
                validator: validators.generalCorrelVariable
            },        
            y: {
                wiki: {title: "tpUu"},
                type: [1],
                required: true,
                validator: validators.generalCorrelVariable
        }            
        }
    },
    {
        name: "correlPartial",
        fn: matrixMethods.correlPartial,
        example: null,
        wiki: {
            title: "sjoW",
            description: "hHaW"
        },
        args: {
            x: {
                wiki: {title: "qFEM"},
                type: [1],
                required: true,
                validator: validators.generalCorrelVariable
            },        
            y: {
                wiki: {title: "tpUu"},
                type: [1],
                required: true,
                validator: validators.generalCorrelVariable
            },
            z: {
                wiki: {title: "tpUR"},
                type: [1],
                required: true,
                validator: validators.generalCorrelVariable
            }            
        }
    },
    {
        name: "correlBiserial",
        fn: matrixMethods.correlBiserial,
        example: null,
        wiki: {
            title: "eJTT",
            description: "jAGi"
        },
        args: {
            x: {
                wiki: {title: "qFEM"},
                type: [3],
                required: true,
                validator: validators.booleanVariable
            },        
            y: {
                wiki: {title: "tpUu"},
                type: [1],
                required: true,
                validator: validators.generalCorrelVariable
        }            
        }
    },
    {
        name: "correlPhi",
        fn: matrixMethods.correlPhi,
        example: null,
        wiki: {
            title: "eJTT",
            description: "jAGi"
        },
        args: {
            x: {
                wiki: {title: "qFEM"},
                type: [3],
                required: true,
                validator: validators.booleanVariable
            },        
            y: {
                wiki: {title: "tpUu"},
                type: [3],
                required: true,
                validator: validators.booleanVariable
        }            
        }
    }
].sort((a,b) => a.name < b.name);

MatrixMethodsModels.forEach(function(m) {
    Matrix.prototype[m.name] = function() {
        var M = new MatrixMethod(m, this);
        return M.call(...arguments);
    };
});

// #endregion

module.exports = {
    Matrix: Matrix,
};