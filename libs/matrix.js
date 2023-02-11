"use strict";

var {NumericVector, StringVector, BooleanVector, Vector, $} = require("./vector");
var {filters, validators} = require("./parsers");
var {matrixResultSchemas, argumentSchemas, OutputSchema, FormMatrixSchema} = require("./schemas");
const {Array, Math, String, Function} = require("./extensions");
const dist = require("./distribution");
var {VectorValueError, ArgumentError, Empty} = require("./errors");
const {MatrixMarkdown, MatrixOverview} = require("./markdown");
var matrixName = null;

const registry = new WeakMap();

// #region MATRIX

Array.prototype.matrify = function() {
    var M = new Matrix();
    for(var i = 0; i < this.length; i++) {
        M.push(!this[i].isVector ? this[i].vectorify() : this[i])
    }
    return M;
}

class Matrix extends Array {
    /**
     * Initializes a new instance of the Matrix class.
     */
    constructor(){
        super();
        this.push(...arguments);
    }
    /**
     * Gets or sets the name of this matrix. If the argument 'value' is empty, it returns the name of this matrix (if set before). Otherwise the name of the matrix is set and the matrix itself is returned.
     * @param {Matrix | string} value Optional: name of the matrix.
     * @returns Either name or the matrix itself.
     */
    name(value){
        if(value) {
            matrixName = value;
            return this;
        } else return matrixName;
    }
    push() {
        for(let a of [...arguments].filter(v => v)) {
            if(a.isVector) {
                super.push(a);
            }
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
        target = this.item(target);
        factor = this.item(factor);
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
            v.flush();
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
    analyze(method) {
        return new MatrixAnalysis(method, this);
    }
    serialize() {
        var _m = {
            name: this.name(),
            vectors: []
        };
        for(var v of this) {
            _m.vectors.push(v.serialize());
        }
        return _m;
    }
    static deserialize(data) {
        if(typeof data != "object") {
            try {
                data = JSON.parse(data);
            } catch(e) {
                console.error("Failed to parse the matrix data.")
                return null;
            }
        }
        matrixName = data.name;
        var M = new Matrix();
        data.vectors.forEach(v => M.push(Vector.deserialize(v)));
        return M;
    }
}

Matrix.prototype.isMatrix = true;

/**
 * Allows inserting only NumericVector members,.
 */
class NumericMatrix extends Matrix 
{
    push() {
        for(let a of [...arguments].filter(v => v)) {
            if(a?.type() === 1) super.push(a)
            else if(Array.isArray(a)) super.push(a.numerify());
            else throw new ArgumentError("Argument is not a numeric vector or a numeric array.");
        };
    }
}

// #endregion

class MatrixAnalysis {
    constructor(model, parent = null) {
        if(parent) this.parent = parent?.isMatrix ? parent : null;
        if(typeof model == "string") {            
            if(!MatrixMethodsModels.find(m => model == m.name)) throw new Error("Matrix model not found: " + model);
            else this.model = MatrixMethodsModels.find(m => model == m.name);
        } 
        else if(typeof model == "object") this.model = model;
        else throw new Error("Unknown MatrixAnalysis model parameter type.");
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
    get filter() {
        return this.model.filter ? this.model.filter.fn : () => this.parent;
    }
    get wiki() {
        if(this.model) {
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
                            var a = args[k];
                            _.push({
                                name: a.name,
                                title: $(a.wiki?.title) || null,
                                description: $(a.wiki?.description) || null,
                                required: a.required,
                                default: a.default || null,
                                validator: a.validator ? $(a.validator.text) : null,
                                schema: a.schema
                            })
                        }
                    }
                    return _;
                })(this.model.args)
            }
        } else return {};
    }
    /**
     * Returns an inteface for input and output schemas.
     */
    get schema() {
        return {
            output: new OutputSchema(this.model.returns),
            form: new FormMatrixSchema(this.model.args)
        }
    }
    /**
     * Applies the model filter to the parent, stores the result into the "matrix" property and returns self. The matrix is the method's ultimate input.
     * @param {*} config No imployed yet.
     * @returns {self}
     */
    prepare(config){
        if(!this.parent) throw new Error("The method cannot be called without a parent specified.")
        this.matrix = this.filter(this.parent);
        return this;
    }
    /**
     * Returns the minimum of (required) arguments for this method.
     */
    get minArgs() {
        return this.model.minArgs || Object.entries(this.model.args).filter(a => a.required).length;
    }
    /**
     * Validates the method arguments.
     * @returns {Array} Returns an array of validated arguments (or nothing if a validation error is thrown before).
     */
    validate(...args) {        
        if(!this.parent) return new Empty($("jrQP"));
        if(this.model.argsToMatrix) {
            var M = (args.length === 0) ? this.parent : this.parent.select(...args);
            return this.model.args[0].validator.fn(M);
        }
        var output = [];
        let ts = this.model.args;
        for(var i = 0; i < ts.length; i++) {            
            let arg = args[i];
            if(ts[i].class === 1 || !ts[i].class) {
                arg = this.parent.item(arg);    //"Pro argument ${name} (${title}) nelze použít vektor typu ${type}."
                if((ts[i].type || [1,2,3]).indexOf(arg?.type()) < 0) 
                {
                    if(ts[i]?.required) throw new ArgumentError($("dSWt", {name: ts[i].name, title: $(ts[i]?.wiki.title), type: $(arg?.constructor?.name)}), this); 
                }
            }
            else if (ts[i].class === 2) {
                /* pokud má být argument matrix */ 
            }
            if(!ts[i].required) {
                if((arg === null || arg === undefined)) output.push(ts[i].default || null);
                else output.push(ts[i].validator.fn(arg));
            }
            else {
                if(!arg && arg !== false && arg !== 0) throw new ArgumentError($("dSWt", {name: ts[i].name, title: $(ts[i]?.title), method: $(this.model.wiki?.title)}), this); 
                else output.push(ts[i].validator.fn(arg))    
            }
        }
        this.args = output;
        return this;
    }    
    /**
     * Call the calculation function and returns either the VectorAnalysis instance with the result property storing the result or the result itself (see params). If either input preparation or validation has not been called before, it is automatically called.
     * @param {boolean} returnSelf If true, the VectorAnalysis is returned, with the result property storing the calculation result. Otherwise the result is returned. Default true.
     * @returns {self | any}
     */
    run() {
        if(!this.parent) return new Empty($("jrQP"));
        //if(!this.matrix) this.prepare();
        if([...arguments].length > 0) this.validate(...arguments);
        if(!this.matrix) this.prepare();
        this.result = this.model.fn(...(this.args || []));
        return this;
    }
    /**
     * 
     * @param {Matrix} parent Specifies the matrix on which the method should be applied.
     * @returns {MatrixAnalysis} Returns the original MatrixAnalysis instance.
     */
    with(parent) {
        this.parent = parent;
        return this;
    }
    /**
     * Releases the matrix resources of this method while changing their values from Matrix to its length (maxRows property).
     * @returns {self}
     */
    free() {
        this.parent = this.parent.maxRows();
        this.matrix = this.matrix.maxRows();
        return this;
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
        if(this.model) {
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
                            var a = args[k];
                            _.push({
                                name: a.name,
                                title: $(a.wiki?.title) || null,
                                description: $(a.wiki?.description) || null,
                                required: a.required,
                                default: a.default || null,
                                validator: a.validator ? $(a.validator.text) : null,
                                schema: a.schema
                            })
                        }
                    }
                    return _;
                })(this.model.args)
            }
        } else return {};
    }
    /* Generates a markdown documentation for the matrix method */
    markdown(level = 1) {
        return MatrixMarkdown(this, level);
    }
    
    /**
     * 
     * @returns {any} Returns the result of the main function.
     */
    call() {
        if(!this.parent) return new Empty($("jrQP"));
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
     * Validates the method arguments.s
     * @returns {Array} Returns an array of validated arguments (or nothing if a validation error is thrown before).
     */
    validate(...args) {
        if(!this.parent) return new Empty($("jrQP"));
        if(this.model.argsToMatrix) {
            var M = (args.length === 0) ? this.parent : this.parent.select(...args);
            return this.model.args[0].validator.fn(M);
        }
        var output = [];
        let ts = this.model.args;
        for(var i = 0; i < ts.length; i++) {            
            let arg = args[i];
            if(ts[i].class === 1 || !ts[i].class) arg = this.parent.item(arg);
            else if (ts[i].class === 2) {

            }
            if(!ts[i].required) {
                if((arg === null || arg === undefined)) T.push(ts[i].default || null);
                else output.push(ts[i].validator.fn(arg));
            }
            else {
                if(!arg && arg !== false && arg !== 0) throw new ArgumentError($("dSWt", {name: ts[i].name, title: $(ts[i]?.title), method: $(this.model.wiki?.title)}), this); 
                else output.push(ts[i].validator.fn(arg))    
            }
        }
        return output;
    }    
}

// #region Models
// core functions
const matrixMethods = {
    correlPearson: function(x,y) {
       var T = new Matrix(x,y).removeEmpty();
       x = T[0];
       y = T[1];
       var arr = x.map(function(_,i){ return [_,y[i]]});
       var n = T.maxRows();
       var nSxy = n * arr.map(v => v[0] * v[1]).sum();
       var SxSy =  x.sum() * y.sum();
       var nSx2_Sx2 = n * (x.map(v => Math.pow(v, 2))).sum() - Math.pow(x.sum(), 2);
       var nSy2_Sy2 = n * (y.map(v => Math.pow(v, 2))).sum() - Math.pow(y.sum(), 2);
       var r = (nSxy - SxSy) / Math.pow(nSx2_Sx2 * nSy2_Sy2, 0.5);
       var df = n -2;
       var t_test = (r * Math.pow(n -2, 0.5)/Math.pow(1-Math.pow(r,2),0.5));
       //var p = (1-dist.tdist(t_test,df))*2;
       var p = dist.tdist(t_test,df);
       return {
           r: r,
           n: n,
           p: p
       };
    },
    correlSpearman: function(x,y) {
        var T = new Matrix(x,y).removeEmpty();
        x = T[0].toAvgRank();
        y = T[1].toAvgRank();
        var n = x.length;
        var d2 = x.map((_x, i) => Math.pow(_x - y[i],2)).sum();
        var rs = 1 - ((6 * d2) / (n * (Math.pow(n, 2) - 1)));
        var df = n - 2;
        var t_test = rs / (Math.pow(1-Math.pow(rs,2),0.5))*Math.pow(n-2,0.5);
        //var p = (1-dist.tdist(t_test,df)) * 2;
        var p = dist.tdist(t_test,df);
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
        var z = (3 * taua * Math.pow(n*(n-1), .5))/Math.pow(2*(2*n+5), .5);
        //var z = (3 * taub * Math.pow(n*(n-1), .5))/Math.pow(2*(2*n+5), .5);
        //var p = 2* (1 - dist.normsdist(Math.abs(z)));
        var p = dist.normsdist(Math.abs(z));
        return {
            r: taub,
            n: n,
            p: p
        }
        /* obsolete */
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
        var T = new Matrix(z,y,x).removeEmpty();
        var n = T.maxRows();
        var ryz = T.correlPearson(1,2);
        var ryx = T.correlPearson(1,0);
        var rzx = T.correlPearson(2,0);
        var rp = (ryz.r - ryx.r * rzx.r)/Math.sqrt((1-Math.pow(ryx.r,2))*(1-Math.pow(rzx.r,2)));
        var t = (rp * Math.sqrt((n-3)))/(Math.sqrt(1-Math.pow(rp,2)));
        var p = (1 - dist.tdist(t, n-3)) * 2;
        return {
            r: rp,
            n: n,
            //t: t,
            p: p
        }
    },
    correlBiserial: function(x,y){
        var T = new Matrix(x,y).removeEmpty();
        var zeroOne = new Array(...T[0]).map(v => v ? 1 : 0);
        x = new NumericVector(zeroOne);
        y = T.item(1);
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
    },
    ttest_independent: function(x,y){
        var T = new Matrix(x,y).removeEmpty();
        var x = T[0];
        var y = T[1];
        var nx = x.length;
        var ny = y.length;
        var df = nx+ny-2;
        var sx2 = Math.pow(x.sum(),2);
        var sy2 = Math.pow(y.sum(),2);
        var mx = x.avg();
        var my = y.avg();
        var x_2 = (x.map(_ => Math.pow(_,2))).sum();
        var y_2 = (y.map(_ => Math.pow(_,2))).sum();
        var t = (mx-my) / Math.pow(((x_2-sx2/nx) + (y_2-sy2/ny))/df * (1/nx+1/ny), 0.5);
        var p = dist.tdist(t, df) * 2;
        return {
            t: t,
            mx: mx,
            my: my,
            nx: nx,
            ny: ny,
            df: df,
            p: p
        }
    },
    ttest_paired: function(x,y){
        var M = new Matrix(x,y).removeEmpty();
        x = M[0];
        y = M[1];
        var xy = x.map(function(_,i){return {x: x[i].toString() ? Number(x[i]) : null, y: y[i].toString() ? Number(y[i]) : null}}).filter(_ => _.x && _.y);
        var n = xy.length;
        var df = n * 2 - 2;
        var x_y = xy.map(_ => _.x - _.y);
        var t = (x_y.sum()/n)/Math.pow(((x_y.map(_ => Math.pow(_,2))).sum() - Math.pow(x_y.sum(),2)/n)/(n*(n-1)),0.5);    
        var p = dist.tdist(t, df) * 2;
        return {
            t: t,
            p: p,
            n: x.length,
            mx: x.avg(),
            my: y.avg()
        }
    },
    anova_oneway: function(...M) {
        var arrays = new Array(...M);
        var ns = arrays.map(a => a.length);
        var g_avg = arrays.map(a => a.avg());
        var yi_total = (arrays.map((a, i) => a.sum())).sum();
        var yi_avg = yi_total / ns.sum();
        var pow_yi_min = arrays.map((a, i) => a.map(_ => Math.pow(_ - g_avg[i], 2)));
        var pow_yi_min_total = (pow_yi_min.map(a => a.sum())).sum();
        var yi_yn = g_avg.map((g, i) => Math.pow(g - yi_avg, 2) * ns[i]);
        var yi_yn_total = yi_yn.sum();
        var dfwg = (ns.sum() - ns.length);
        var F = (yi_yn.sum() / (ns.length - 1)) / (pow_yi_min_total / dfwg);
        var P2 = yi_yn_total / (yi_yn_total + pow_yi_min_total);
        var p = dist.fdistrt(F, ns.length - 1, dfwg);
        return {
            F: F,
            P2: P2,
            p: p,
            n: ns.sum(),
            ANOVA: {
                totalOfGroups: arrays.length,
                betweenGroups: {
                    sumOfSquares: yi_yn_total,
                    df: ns.length - 1
                },
                withinGroups: {
                    sumOfsquares: pow_yi_min_total,
                    df: dfwg
                },
                total: {
                    sumOfSquares: yi_yn_total + pow_yi_min_total,
                    df: ns.length - 1 + dfwg
                }
            }
        };
    },
    mannwhitney: function(x,y){
        var M = new Matrix(x,y).removeEmpty();
        x = M[0];
        y = M[1];
        var all = x.concat(y);
        var ac = all.length;
        var xa = x.map(function(v,i){
            var vd = all.rankAvg(v, 0);
            var va = all.rankAvg(v, 1);
            return vd + (ac + 1 - vd - va)/2;
        });
        var ya = y.map(function(v,i){
            var vd = all.rankAvg(v, 0);
            var va = all.rankAvg(v, 1);
            return vd + (ac + 1 - vd - va)/2;
        });
        var R1 = xa.sum();
        var R2 = ya.sum();
        var N1 = xa.length;
        var N2 = ya.length;
        var U1 = N1*N2+N1*(N1+1)/2 - R1;
        var U2 = N1*N2+N2*(N2+1)/2 - R2;
        var U = Math.min(U1,U2);
        var z = (U-N1*N2/2)/Math.sqrt(N1*N2*(N1+N2+1)/12)
        var p = dist.normsdist(z)*2;
        return {
            U: U,
            Z: z,
            p: p,
            n1: N1,
            n2: N2
        }
    },
    linreg: function(x,y){
        var T = new Matrix(x,y).removeEmpty();
        x = T[0];
        y = T[1];
        var n = x.length;
        var x2 = x.map(_ => Math.pow(_,2))
        var xy = x.map((_,i) => _*y[i]);
        var _xy_ = n * xy.sum();
        var x_y_ = x.sum() * y.sum();
        var _x2_ = n * x2.sum();
        var x_2 = Math.pow(x.sum(),2);
        var beta1 = (_xy_- x_y_)/(_x2_-x_2 );
        var beta0 = y.sum()/n - beta1 * x.sum()/n;
        var s_total = (y.map(_ => Math.pow(_-y.avg(),2))).sum();
        var s_res = (x.map((_,i) => Math.pow(y[i] - (beta0 + beta1*_),2))).sum();
        var s_reg = s_total - s_res;
        var s_err = Math.pow(s_reg/(n-2),0.5);
        var r = matrixMethods.correlPearson(x,y).r;
        var r2 = Math.pow(r,2);
        //var r2 = 1-(s_res/s_reg);
        //var r = Math.sqrt(r2);
        var F = (s_reg)/(s_res/(n-2));
        var p = dist.fdistrt(F,1,n-2);
        return {
            r2: r2 < 0 ? null : r2,
            r: r,
            F: F,
            p: isNaN(p) ? null : p,
            beta0: beta0,
            beta1: beta1,
            fn: function(x){ return beta0 + x * beta1},
            n: x.length
        };
    },
    contingency: function(x,y,n) {
        var xd = x.distinct();
        var yd = y.distinct();
        var xy = new Array(...x.map(function(_x,i){return {x: _x, y: y[i], n: n ? n[i] || 0 : 1}}));
        var xyn = xy.map(function(_){return {x:_.x, y: _.y}}).distinct().map(function(_,i){
            _.n = xy.filter(o => (o.x === _.x && o.y === _.y)).map(_ => _.n).sum();
            return _;
        });
        var total = (xyn.map(_ => _.n)).sum();
        var sx = xd.map(function(_){return {x: _ ,t: (xyn.filter(f => f.x === _).map(_ => _.n)).sum()}});
        var sy = yd.map(function(_){return {y: _ ,t: (xyn.filter(f => f.y === _).map(_ => _.n)).sum()}});
        xd = xd.map(function(_,i){return {k: _, t: sx[i].t}});
        yd = yd.map(function(_,i){return {k: _, t: sy[i].t}});
        var _xyn = xyn.map(function(_,i){
            var _n = yd.find(_y => _y.k === _.y).t * xd.find(_x => _x.k === _.x).t / total;
            return {x: _.x, y: _.y, n: _n};
        });
        var __xyn = _xyn.map(function(_){
            return {x: _.x, y: _.y, n: Math.pow(_.n  -xyn.find(o => o.x === _.x && o.y === _.y).n,2)/_.n};
        })
        var G = (__xyn.map(_ => _.n)).sum(); /* G = phi square */
        var df = (xd.length -1)*(yd.length -1); /* degrees of freedom */
        var p = 1 - dist.chisqdist(G,df,true); /* significance value*/ 
        var C = Math.sqrt(G/(G+total)); /* C = Pearson's C */
        var V = Math.sqrt(G/(total*2)); /* V = Cramer's V */
        return {
            phi: G,
            p: p,
            df: df,
            C: C,
            V: V,
        }
    }
};

var ats = {
    /**Numeric vector only */
    nv: "NumericVector",
    /**String vector only */
    sv: "StringVector",
    /**Boolean vector only */
    bv: "BooleanVector",
    m: "Matrix",
    mv: "NumericMatrix",
}

const MatrixMethodsModels = [
    {   name: "correlPearson",
        fn: matrixMethods.correlPearson,
        filter: filters.matrixNotEmpty,
        example: function(x,y) {
            var a = new NumericVector([3, 7, 5, 10, 9, 8, 4, 1, 6, 2]);
            var b = new NumericVector([4, 9, 2, 10, 8, 7, 6, 3, 5, 1]);
            var correl = new Matrix(a,b).correlPearson(a,b);
            /*
            {
                "r": 0.8424242424242424,
                "n": 10,
                "p": 0.0022200000000001108
            }
            */
        },
        wiki: {
            title: "pTvR",
            description: "wPyG"
        },
        returns: matrixResultSchemas.correlPearson,
        args: [
            {
                name: "x",
                wiki: {title: "qFEM"},
                type: [1],
                required: true,
                validator: validators.isNumericVector,
                schema: argumentSchemas.numericVector,
                class: 1
            },        
            {
                name: "y",
                wiki: {title: "tpUu"},
                type: [1],
                required: true,
                validator: validators.isNumericVector,
                schema: argumentSchemas.numericVector,
                class: 1
            }            
        ]
    },
    {   name: "correlSpearman",
        fn: matrixMethods.correlSpearman,
        filter: filters.matrixNotEmpty,
        returns: matrixResultSchemas.correlSpearman,
        example: function() {
            var a = new NumericVector([3, 7, 5, 10, 9, 8, 4, 1, 6, 1]);
            var b = new NumericVector([4, 9, 2, 10, 8, 7, 6, 3, 5, 1]);
            var M = new Matrix(a,b).correlSpearman(a,b);
            /*
            {
                "r": 0.8575757575757575,
                "n": 10,
                "p": 0.0015199999999999658
            }
            */
        },
        wiki: {
            title: "eJTT",
            description: "jAGi"
        },
        args: [
            {
                name: "x",
                wiki: {title: "qFEM"},
                type: [1],
                required: true,
                validator: validators.isNumericVector,
                schema: argumentSchemas.numericVector,
                class: 1
            },        
            {
                name: "y",
                wiki: {title: "tpUu"},
                type: [1],
                required: true,
                validator: validators.isNumericVector,
                schema: argumentSchemas.numericVector,
                class: 1
        }            
    ]
    },
    {   name: "correlKendall",
        fn: matrixMethods.correlKendall,
        filter: filters.matrixNotEmpty,
        returns: matrixResultSchemas.correlKendall,
        example: function() {
            var a = new NumericVector([3, 7, 5, 10, 9, 8, 4, 1, 6, 1]);
            var b = new NumericVector([4, 9, 2, 10, 8, 7, 6, 3, 5, 1]);
            var M = new Matrix(a,b).correlKendall(a,b);
            /*
            {
                "r": 0.7111111111111111,
                "n": 10,
                "p": 0.004207551285491773
            }
            */
        },
        wiki: {
            title: "mgBC",
            description: "VOmC"
        },
        args: [
            {
                name: "x",
                wiki: {title: "qFEM"},
                type: [1],
                required: true,
                validator: validators.isNumericVector,
                schema: argumentSchemas.numericVector,
                class: 1
            },        
            {
                name: "y",
                wiki: {title: "tpUu"},
                type: [1],
                required: true,
                validator: validators.isNumericVector,
                schema: argumentSchemas.numericVector,
                class: 1
            }            
        ]
    },
    {   name: "correlPartial",
        fn: matrixMethods.correlPartial,
        returns: matrixResultSchemas.correlPartial,
        example: function() {
            var x = new NumericVector(2,3,4,5,6,7,8,9,10,11);
            var y = new NumericVector(3,5,4,6,5,7,8,9,1,11);
            var z = new NumericVector(-5,-4,1,2,3,-2,6,8,10,12);
            var partial = new Matrix(x,y,z).correlPartial(0,1,2);
            /*
            {
                "r": 0.3222896122166014,
                "n": 10,
                "p": 0.39764
            }
            */
        },
        filter: filters.matrixNotEmpty,
        wiki: {
            title: "xfSf",
            description: "UcfZ"
        },
        args: [ 
            {
                name: "x",
                wiki: {title: "qFEM"},
                type: [1],
                required: true,
                validator: validators.isNumericVector,
                schema: argumentSchemas.numericVector,
                class: 1
            },        
            {
                name: "y",
                wiki: {title: "tpUu"},
                type: [1],
                required: true,
                validator: validators.isNumericVector,
                schema: argumentSchemas.numericVector,
                class: 1
            },
            {
                name: "z",
                wiki: {title: "gxOb"},
                type: [1],
                required: true,
                validator: validators.isNumericVector,
                schema: argumentSchemas.numericVector,
                class: 1
            }            
        ]
    },
    {   name: "correlBiserial",
        fn: matrixMethods.correlBiserial,
        example: function() {

        },
        filter: filters.matrixNotEmpty,
        returns: matrixResultSchemas.correlPearson,
        wiki: {
            title: "AagR",
            description: "OMiA"
        },
        args: [
            {
                name: "x",
                wiki: {title: "qFEM"},
                type: [3],
                required: true,
                validator: validators.isBooleanVector,
                schema: argumentSchemas.booleanVector,
                class: 1
            },        
            {
                name: "y",
                wiki: {title: "tpUu"},
                type: [1],
                required: true,
                validator: validators.isNumericVector,
                schema: argumentSchemas.numericVector,
                class: 1
            }
        ]
    },
    {   name: "correlPhi",
        fn: matrixMethods.correlPhi,
        example: null,
        filter: filters.matrixNotEmpty,
        wiki: {
            title: "eJTT",
            description: "jAGi"
        },
        args: [
            {
                name: "x",
                wiki: {title: "qFEM"},
                type: [3],
                required: true,
                validator: validators.booleanVariable,
                schema: argumentSchemas.booleanVector,
                class: 1
            },        
            {
                name: "y",
                wiki: {title: "tpUu"},
                type: [3],
                required: true,
                validator: validators.booleanVariable,
                schema: argumentSchemas.booleanVector,
                class: 1
            }            
        ]
    },
    {   name: "ttestind",
        fn: matrixMethods.ttest_independent,
        filter: filters.matrixNotEmpty,
        example: function(){
            var M = new Matrix([],[]).ttestind(0,1);
        },
        wiki: {
            title: "YqRh",
            description: "gILL"
        },
        args: [{
                name: "x",
                wiki: {title: "qFEM"},
                type: [ats.nv],
                required: true,
                validator: validators.isNumericVector,
                schema: argumentSchemas.numericVector
            },        
            {
                name: "y",
                wiki: {title: "tpUu"},
                type: [ats.nv],
                required: true,
                validator: validators.isNumericVector,
                schema: argumentSchemas.numericVector
        }]
    },
    {   name: "ttestpair",
        fn: matrixMethods.ttest_paired,
        filter: filters.matrixNotEmpty,
        example: function(){
            var test = new Matrix([2,3,2,4,5], [9,8,7,9,10]).ttestpair(0,1);
            /*
            {
                "t": -13.500000000000025,
                "p": 0,
                "n": 5,
                "mx": 3.2,
                "my": 8.6
            } 
            */
        },
        wiki: {
            title: "mmXD",
            description: "kPqo"
        },
        args: [{
                name: "x",
                wiki: {title: "qFEM"},
                type: [ats.nv],
                required: true,
                validator: validators.isNumericVector,
                schema: argumentSchemas.numericVector,
                class: 1
            },        
            {
                name: "y",
                wiki: {title: "tpUu"},
                type: [ats.nv],
                required: true,
                validator: validators.isNumericVector,
                schema: argumentSchemas.numericVector,
                class: 1
        }]
    },
    {   name: "anovaow",
        fn: matrixMethods.anova_oneway,
        argsToMatrix: true,
        filter: filters.matrixNotEmpty,
        returns: matrixResultSchemas.anovaow,
        example: function(){
            var M = new Matrix([2,3,2,4,5], [9,8,7,9,10], [1,7,19,32,90]).anovaow(0,1,2);
            /* OR */
            var M = new Matrix([2,3,2,4,5], [9,8,7,9,10], [1,7,19,32,90]).anovaow();
            /* OR */
            var M = new Matrix([2,3,2,4,5,9,8,7,9,10,1,7,19,32,90],[1,1,1,1,1,2,2,2,2,2,3,3,3,3,3]).pivot(0,1).anovaow();
            /*
            {
                "F": 2.3227069789300536,
                "P2": 0.2790807107363349,
                "p": 0.1403847313472082,
                "n": 15,
                "ANOVA": {
                    "totalOfGroups": 3,
                    "betweenGroups": {
                        "sumOfSquares": 1976.9333333333336,
                        "df": 2
                    },
                    "withinGroups": {
                        "sumOfsquares": 5106.800000000001,
                        "df": 12
                    },
                    "total": {
                        "sumOfSquares": 7083.7333333333345,
                        "df": 14
                    }
                }
            }
            */

        },
        wiki: {
            title: "baJo",
            description: "qqQo"
        },
        args: [{
                name: "vectors",
                wiki: {title: "iJaa"},
                /* numeric matrix only */
                type: [2],
                required: false,
                validator: validators.isNumericMatrix,
                schema: argumentSchemas.numericMatrix,
                /* matrix class */
                class: 2
            }]
    },
    {   name: "mannwhitney",
    fn: matrixMethods.mannwhitney,
    example: function(){
        var M = new Matrix([1,2,3,4,5,6,7,8,9,10],[1,3,5,7,9,11,13,15,17,19]).mannwhitney();
    },
    filter: filters.matrixNotEmpty,
    wiki: {
        title: "rPQr",
        description: "vzHj"
    },
    args: [{
            name: "x",
            wiki: {title: "qFEM"},
            type: [ats.nv],
            required: true,
            validator: validators.isNumericVector,
            schema: argumentSchemas.numericVector
        },        
        {
            name: "y",
            wiki: {title: "tpUu"},
            type: [ats.nv],
            required: true,
            validator: validators.isNumericVector,
            schema: argumentSchemas.numericVector
    }]
    },
    {   name: "linreg",
        fn: matrixMethods.linreg,
        filter: filters.matrixNotEmpty,
        returns: matrixResultSchemas.linreg,
        example: function(x,y) {
            var M = new Matrix([160,160,162,163,161,170,172,177,179,178,182,184,183],[57,55,59,60,52,67,69,74,75,76,78,80,87]);
            var model = M.linreg(0,1);
            /*
            {
                "r2": 0.949355403714833,
                "r": 0.974348707452744,
                "F": 206.19987534428648,
                "p": 1.802343407852902e-8,
                "beta0": -126.2043685121107,
                "beta1": 1.1338667820069204,
                "n": 13,
                "fn": function (x) { return beta0 + x * beta1}
            }
            */
           var x190 = model.fn(190); /* 89.23032006920417 */

        },
        wiki: {
            title: "KwSQ",
            description: "celD"
        },
        args: [
            {
                name: "independent",
                wiki: {title: "jDlm"},
                type: [ats.nv],
                required: true,
                validator: validators.isNumericVector,
                schema: argumentSchemas.numericVector
            },        
            {
                name: "dependent",
                wiki: {title: "jFVv"},
                type: [ats.nv],
                required: true,
                validator: validators.isNumericVector,
                schema: argumentSchemas.numericVector
            }            
        ]
    },
    {   name: "contingency",
        fn: matrixMethods.contingency,
        filter: null,
        example: function(x,y,n) {
            var a = new StringVector("A","A","A","B","B","B","C","C","C","C");
            var b = new StringVector("X","Y","X","Y","X","Y","X","Y","X","Y");
            var n = new NumericVector(5,6,4,5,7,3,9,3,4,6);
            var m = new Matrix(a,b,n);
            var c1 = m.contingency(a,b);
            /*
            {

            }
            */
           var c2 = m.continency(a,b,n);
           /*
            {

            }
            */
        },
        wiki: {
            title: "gRix",
            description: "fqwd"
        },
        returns: matrixResultSchemas.contingency,
        args: [
            {
                name: "x",
                wiki: {title: "gLRN"},
                type: [1,2,3],
                required: true,
                validator: validators.isVector,
                schema: argumentSchemas.vector,
                class: 1
            },        
            {
                name: "y",
                wiki: {title: "bpjC"},
                type: [1,2,3],
                required: true,
                validator: validators.isVector,
                schema: argumentSchemas.vector,
                class: 1
            },        
            {
                name: "n",
                wiki: {title: "fqUi"},
                type: [1],
                required: false,
                validator: validators.isNumericVector,
                schema: argumentSchemas.numericVector,
                class: 1
            }               
        ]
    }
].sort((a,b) => $(a.wiki?.title) > $(b.wiki?.title) ? 1 : -1);

MatrixMethodsModels.forEach(function(m) {
    Matrix.prototype[m.name] = function() {
        var M = new MatrixMethod(m, this);
        return M.call(...arguments);
    };
});

const Models = {}
function mapModels() {
    MatrixMethodsModels.map(function(m){Models[m.name] = new MatrixMethod(m)});
}
mapModels();

// #endregion

// #region MISC

Array.prototype.toNumericMatrix = function() {
    return new NumericMatrix(...this);
}

// #endregion

// #region MISC


// #endregion

module.exports = {
    Matrix: Matrix,
    NumericMatrix: NumericMatrix,
    MatrixAnalysis: MatrixAnalysis,
    //Models: Models,
    methods: matrixMethods,
    MatrixOverview: function() {
        return MatrixOverview(Models)},
};