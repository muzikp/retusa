"use strict";

var {NumericVector, StringVector, BooleanVector, Vector} = require("./vector");
var $ = require("./locale").call;
let {Argument} = (require("./argument"));
let {Output} = require("./output");
const {Array, Math, String, Function} = require("./extensions");
const dist = require("./distribution");
var matrixName = null
const serVersion = "1.0";
// #region MATRIX

Array.prototype.matrify = function() {
    var M = new Matrix();
    for(var i = 0; i < this.length; i++) {
        M.push(!this[i]?.isVector ? this[i].vectorify() : this[i])
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
     * So far, there can be only one name for all possible matrices as WeakMap seems to not support array keys (matrix is an array in fact).
     * @param {string | empty} value Optional: name of the matrix.
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
            if(a?.isVector) {
                if(this.find(v => v.id() === a.id())) {
                    console.warn(`Vector ${a.name() || a.id()} is already a member of the matrix.`);
                } else super.push.call(this,a);
            }
            else if(Array.isArray(a)) {
                super.push.call(this, a.vectorify());
            }
            else {
                throw new Error("Argument is not a vector or array.");
                
            }
        };
        return this.length;
    }
    map(callbackFn, thisArg = this) {
        if(!callbackFn) return this;
        var isMatrix = true;
        var _m = [];
        var i = 0;
        for(let v of thisArg || this) {
            var e = callbackFn(v, i, thisArg);
            i++;
            if(!e?.isVector) isMatrix = false;
            _m.push(e);
        };
        if(isMatrix) {
            _m = new Matrix(..._m).name(this.name());
        }
        return _m;
    }
    smap(fn) {
        var _m = [];
        for(let v of this) {
            _m.push(fn(v));
        };
        return _m;
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
        const selection = this.select(target, factor);
        const pivot = new Matrix();        
        for(let key of factor.distinct().intersection(selectedKeys)) {
            var v = new target.constructor(...selection.filter(factor, (v) => v === key)[0]).name(key).label(factor.format(key)).formatter(target.formatter(), true);
            pivot.push(new target.constructor(...selection.filter(factor, (v) => v === key)[0]).name(key).label(factor.format(key)).formatter(target.formatter(), true));

        }
        return pivot;
    }
    clone(flush = false) {
        return new Matrix(...new Array(...this).map(v => v.clone()));
    }
    /**
     * Returns a vector according to the specified identifier. The identifier argument is extremely flexible, it can be a number (the order of the vector), text (either the name or the id of the vector), an instance of the vector, or a filter function with which the vector is searched in the matrix.
     * @param {number | string | Vector | function} identifier 
     * @returns {Vector} Returns a Vector instance or (if not found) null.
     */
    item(identifier) {
        if(!identifier && identifier !== 0) return null;
        else if(!isNaN(identifier)) return this[Number(identifier)];
        else if(typeof identifier == "string") return this.find(v => (v.id() == identifier || v.name() == identifier));
        else if(identifier?.isVector) return this.find(v => v.id() === identifier.id());
        /*
        else if(identifier?.isVector) {
            var byObject = this.find(v=> v == identifier);
            if(byObject) return byObject;
            else {
                if(identifier.name()) return this.find(v => v.name() == identifier.name()) || null;
                else return null;
            }
        }
        */
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
    slice(from = 0, to = Infinity) {
        var M = new Matrix();
        for(let a = from < 0 ? 0 : from; a < (to >= this.length ? this.length : to); a++)
        {
            M.push(this[a]);

        };
        return M;
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
            for(var r = 0; r < this.maxRows(); r++) {   
                if(groups.map(g => g.f(g.v[r], r, g.v)).filter(g => g).length === groups.length) {
                    target.appendRow(...this.row(r))
                }
            }
            return target;
        }
    }
    filterByIndex(...indexes) {
        var _ = new Matrix();
        for(let v of this) {
            _.push(v.filterByIndex(...indexes));
        }
        return _;
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
    rows(asObject = false) {
        var rows = [];
        for(var r = 0; r < this.maxRows(); r++)
        {
            var row = [];
            for(var c = 0; c < this.length; c++ ) {
                row.push(this[c][r]);
            }
            rows.push(row);
        }
        return rows;
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
        var _o = {
            version: serVersion,
            matrix: _m,
            utils: {}
        }
        return _o;
    }
    static deserialize(source) {
        if(typeof source != "object") {
            try {
                source = JSON.parse(source);
            } catch(e) {
                console.error("Failed to parse the matrix data.")
                return null;
            }
        }
        if(!source?.version) source.version = "1.0";
        if(source.version == "1.0") {
            var M = new Matrix().name(source.matrix.name);
            source.matrix.vectors.forEach(v => M.push(Vector.deserialize(v)));
            return M;
        } else throw new Error("Unknown serialization version: " + source.version);
        
    }
    static listMethods() {
        return MatrixMethodsModels.map(m => m.name);
    }
    /**
     * 
     * @returns {Array} Return an array of this matrix's vectors descriptions (index, name, label, length, formatter).
     * 
     */
    info() {
        return this.map((v,i) => ({index: i, name: v.name(), label: v.label(), length: v.length, formatter: v.formatter()}));
    }
}

Matrix.prototype.isMatrix = true;

// #endregion

const preprocessors = {
    /**
     * Removes all rows where at least one empty value is present.
     */
    removeEmptyAcrossRows: {
        title: "Cumi",
        fn: function(_){
            var M = new Matrix(..._.args.vectors);
            _.sample.raw = M.maxRows();
            M = M.removeEmpty();
            _.args.vectors = M;
            _.sample.net = M.maxRows();
        }
    },
    /**
     * removeEmptyAcrossRows for independent vectors as inputs for two-way ANOVA
     */
    twoWayAnova: {
        title: "Cumi",
        fn: function(_){
            var M = new Matrix(_.args.f1, _.args.f2, _.args.v);
            _.sample.raw = M.maxRows();
            M = M.removeEmpty();
            _.args.f1 = M[0];
            _.args.f2 = M[1];
            _.args.v = M[2];
            _.sample.net = M.maxRows();
        }
    },
    ancova: {
        title: "Cumi",
        fn: function(_){
            var M = new Matrix(_.args.factor, _.args.dependent, _.args.covariant);
            _.sample.raw = M.maxRows();
            M = M.removeEmpty();
            _.args.factor = M[0];
            _.args.dependent = M[1];
            _.args.covariant = M[2];
            _.sample.net = M.maxRows();
        }
    },
    /**
     * Removes empty cells from each vectors without removing rows from other vectors in the set.
     */
    removeEmptyAcrossColumns: {
        title: "ImLY",
        fn: function(_){
            for(var i = 0; i < _.args.vectors; i++)
            {
                _.args.vectors[i] = _.args.vectors[i].removeEmpty();
            }
        }
    },
    removeEmptyXY: {
        title: "Cumi",
        fn: function(_){
            var M = new Matrix(_.args.x, _.args.y)
            _.sample.raw = M.maxRows();
            M = M.removeEmpty();
            _.args.x = M[0];
            _.args.y = M[1];
            _.sample.net = M.maxRows();
        }
    },
    groupXYRemoveEmpty: {
        title: "OH5v",
        fn: function(_) {
            if(_.args.factor) {
                var _matrix = new Matrix(_.args.vectors[0], _.args.factor).pivot(0,1);
                _.args.vectors = _matrix;
                _.args.factor = null;
            } else {
                if(_.args.vectors.length < 2) throw new Error($("HHCW"));
                else {
                    _.args.vectors = _.args.vectors;
                    _.args.factor = null;
                }
            }
            _.sample.raw = _.args.vectors.flat().length;
            //_.args.vectors = _.args.vectors.removeEmpty();
            for(let v = 0; v < _.args.vectors.length; v++) {
                _.args.vectors[v] = _.args.vectors[v].removeEmpty();
            }
            _.sample.net = _.args.vectors.flat().length;
        }
    },
    groupANOVARemoveEmpty: {
        title: "Jpe0",
        fn: function(_) {
            if(_.args.factor) {
                var _matrix = new Matrix(_.args.vectors[0], _.args.factor).pivot(0,1);
                _.args.vectors = _matrix;
                _.args.factor = null;
            } else {
                if(_.args.vectors.length < 2) throw new Error($("HHCW"));
                else {
                    _.args.vectors = _.args.vectors;
                    _.args.factor = null;
                }
            }
            _.sample.raw = _.args.vectors.flat().length;
            for(let v = 0; v < _.args.vectors.length; v++) {
                _.args.vectors[v] = _.args.vectors[v].removeEmpty();
            }
            //_.args.vectors = _.args.vectors.removeEmpty();
            _.sample.net = _.args.vectors.flat().length;
        }
    }
}

class MatrixAnalysis {
    constructor(model, parent = null) {
        if(parent) this.parent = parent?.isMatrix ? parent : null;
        if(typeof model == "string") {            
            if(!MatrixMethodsModels.find(m => model == m.name)) throw new Error($("BoEs", {name: model}));
            else model = MatrixMethodsModels.find(m => model == m.name);
        } 
        else if(typeof model == "object") model = model;
        else throw new Error("Unknown MatrixAnalysis model parameter type.");
        Object.defineProperty(this, "model", {
            readonly: true,
            value: model
        })
        Object.defineProperty(this, "args", {
            readonly: true,
            value: {}
        });
        Object.defineProperty(this, "sample", {
            readonly: true,
            value: {}
        });
        Object.defineProperty(this, "name", {
            readonly: true,
            value: this.model.name
        });
        Object.defineProperty(this, "time", {
            readonly: true,
            value: {}
        });
        Object.defineProperty(this, "outputSchema", {
            readonly: true,
            value: this.model.output ? new Output(this.model.output) : null
        });
        Object.defineProperty(this, "unstable", {
            readonly: true,
            value: !!this.model.unstable
        });
        /* Returns an object or an array of Argument instances based on the model args config. If the instance already inclides user defined arguments, it appends them as a 'value' property. */
        Object.defineProperty(this, "parameters", {
            readonly: true,
            /**
             * 
             * @param {boolean} asObject If true, returns an object, otherwise returns an array.
             * @returns {Object | Array}
             */
            value: function(asObject) {
                var _ = asObject ? {} : [];
                for(let k of Object.keys(this.model.args)) {
                    var a = new Argument(this.model.args[k].model, this.parent || null, this.model.args[k].config);
                    if(this.args[k]) a.value = this.args[k];
                    else a.value = a.default;
                    if(!asObject) a.name = k;
                    (asObject) ? _[k] = a : _.push(a);
                };
                return _;
            }
        })
        for(let w of ["title","description", "preprocessor"]) {
            Object.defineProperty(this, w, {
                readonly: true,
                value: {
                    key: this.model.wiki[w] || null,
                    value: this.model.wiki[w] ? $(this.model.wiki[w]) : null
                }
            })
        }
        
    }
    /**
     * The 'with' methods allows specifying the MatrixAnalysis arguments, either as a named object with properties or as a set of parameter arguments.
     * @returns {self}
     */
    with() {
        if(!Argument) Argument = require("./argument").Argument;
        if(new Array(...arguments).length == 0) return this;
        /** named config (object) */
        else if(typeof arguments[0] == "object" && !Array.isArray(arguments[0]) ? arguments[0] ? Object.keys(arguments[0]).length > 0 : false : false) {
            var parameters = arguments[0];
            for(let key of Object.keys(this.model.args)) {
                var arg = this.model.args[key];
                if(!arg) throw new Error($("EFfS", {name: key, method: $(this.model.wiki.title)}));
                else {
                    arg = new Argument(arg.model, this.parent, arg.config || {});
                    this.args[key] = arg.validate(parameters[key]);
                }
            }
            return this;
        } else {
            for(let ai = 0; ai < Object.keys(this.model.args).length; ai++) {
                //if(ai > Object.keys(this.model.args)) break;
                var arg = new Argument(this.model.args[Object.keys(this.model.args)[ai]].model, this.parent, this.model.args[Object.keys(this.model.args)[ai]].config || {});
                this.args[Object.keys(this.model.args)[ai]] = arg.validate(new Array(...arguments)[ai]);
            }
            return this;
        }        
    }
    /**
     * Runs the 
     * @param {*} config No imployed yet.
     * @returns {self}
     */
    prepare(){
        if(!this.parent) throw new Error($("jrQP"));
        if(this.model.prepare) this.model.prepare(this);
        return this;
    }
    /**
     * Call the calculation function and returns either the VectorAnalysis instance with the result property storing the result or the result itself (see params). If either input preparation or validation has not been called before, it is automatically called.
     * @param {boolean} returnSelf If true, the VectorAnalysis is returned, with the result property storing the calculation result. Otherwise the result is returned. Default true.
     * @returns {self | any}
     */
    run() {
        this.time.from = new Date();
        if(!this.parent) throw new Error($("jrQP"));
        if([...arguments].length > 0) this.with(...arguments);
        this.prepare();        
        var args = Object.entries(this.args).map(e => e[1]);
        this.result = this.model.fn(...args);
        this.time.to = new Date();
        return this;
    }
    /**
     * Returns duration of the "run" method (whatever it includes inside) in milliseconds.
     */
    duration() {
        if(this.time.from && this.time.to) return this.time.to.getTime() - this.time.from.getTime();
        else return null;
    }
}

// #region Models
// core functions
const matrixMethods = {
    covariance: function() {
        var x = arguments[0];
        var y = arguments[1];
        var N = arguments[2] ? x.length -1 : x.length;
        var xm = x.avg();
        var ym = y.avg();
        var c = x.map((v,i) => (x[i]-xm)*(y[i]-ym) ).sum()/N;
        return c;

    },
    correl: function() {
       var x = arguments[0], y = arguments[1], methods = arguments[2];
        var result = {};
        if(methods.indexOf(1) > -1) {
            let r = matrixMethods.correlPearson(x,y);
            result.pearson = {r: r.r, p: r.p};
        }
        if(methods.indexOf(2) > -1) {
            let r = matrixMethods.correlSpearman(x,y);
            result.spearman = {r: r.r, p: r.p};
        }
        if(methods.indexOf(3) > -1) {
            let r = matrixMethods.correlKendall(x,y);
            result.kendall = {r: r.tau, p: r.p};
        }
        if(methods.indexOf(4) > -1) {
            let r = matrixMethods.correlGamma(x,y);
            result.gamma = {r: r.r, p: r.p};
        }
        return result;
    },
    correlPearson: function() {
       var x = arguments[0];
       var y = arguments[1];
       var arr = x.map(function(_,i){ return [_,y[i]]});
       var n = [x.length, y.length].max();
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
           p: p
       };
    },
    correlSpearman: function() {
        var x = arguments[0];
        var y = arguments[1];
        x = x.toAvgRank();
        y = y.toAvgRank();
        var n = x.length;
        var d2 = x.map((_x, i) => Math.pow(_x - y[i],2)).sum();
        var rs = 1 - ((6 * d2) / (n * (Math.pow(n, 2) - 1)));
        var df = n - 2;

        var t_test = rs / (Math.pow(1-Math.pow(rs,2),0.5))*Math.pow(n-2,0.5);
        //var p = (1-dist.tdist(t_test,df)) * 2;

        var p = dist.tdist(t_test,df);
        return {
            r: rs,
            df: df,
            p: p
        }
    },
    correlKendall: function(){
        var x = arguments[0];
        var y = arguments[1];
        let n = x.length;
        let numPairs = n * (n - 1) / 2;
        var numConcordant = 0;
        var numDiscordant = 0;
        let numTiesX = 0;
        let numTiesY = 0;
        let numTiesXY = 0;
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                let x1 = x[i];
                let x2 = x[j];
                let y1 = y[i];
                let y2 = y[j];
                let xDiff = x1 - x2;
                let yDiff = y1 - y2;
                if (xDiff > 0 && yDiff > 0 || xDiff < 0 && yDiff < 0) {
                    numConcordant++;
                } else if (xDiff !== 0 && yDiff !== 0) {
                    numDiscordant++;
                } else {
                    numTiesXY++;
                    if (xDiff === 0) {
                        numTiesX++;
                    }
                    if (yDiff === 0) {
                        numTiesY++;
                    }
                }
            }
        }
        let cn2 = Math.combinations(n,2);
        let d = Math.sqrt((cn2-numTiesX)*(cn2-numTiesY));
        let tau = (numConcordant - numDiscordant)/d;
        // z calculated only for ranks without ties - see Mann-Kendall test
        // see https://github.com/thisancog/statistics.js/blob/master/source/correlation.js
        // 1.05 - artificial and unacceptable correction
        var z = 1.05 * 3*(numConcordant - numDiscordant)/Math.sqrt(n*(n-1)*(2*n+5)/2);
        var p = dist.normsdist(Math.abs(z));
        return {
            tau: tau,
            df: n - 2,
            p: p
        }
    },
    correlPartial: function(){
        var x = arguments[0];
        var y = arguments[1];
        var z = arguments[2];
        var T = new Matrix(x,y,z);
        var n = T.maxRows();
        var r12 = T.correlPearson(0,1).r;
        var r13 = T.correlPearson(0,2).r;
        var r23 = T.correlPearson(1,2).r;
        var rp = (r13 - r12 * r23) / Math.sqrt((1 - r12 * r12) * (1 - r23 * r23))
        var t = (rp * Math.sqrt((n-3)))/(Math.sqrt(1-Math.pow(rp,2)));
        var p = dist.tdist(t, n-3);
        return {
            r: rp,
            p: p
        }
    },
    correlBiserial: function(){
        var x = arguments[0];
        var y = arguments[1];
        //return matrixMethods.correlPearson(new NumericVector(new Array(...x).map(v => v ? 1 : 0)).name(x.name),y);
        return matrixMethods.correlPearson(x,y);
    },
    /** https://en.wikipedia.org/wiki/Phi_coefficient */
    correlPhi: function(x,y) {
        var T = new Table(x,y).removeEmpty();
        x = T.item(0).toNumeric();
        y = T.item(1).toNumeric();
        var x1y1 = x.filter((_x,i) => _x == 1 && y[i] == 1).length;
        var x1y0 = x.filter((_x,i) => _x == 1 && y[i] == 0).length;
        var x0y1 = x.filter((_x,i) => _x == 0 && y[i] == 1).length;
        var x0y0 = x.filter((_x,i) => _x == 0 && y[i] == 0).length;
        var x1 = x.filter(_x => _x == 1).length;
        var x0 = x.filter(_x => _x == 0).length;
        var y1 = y.filter(_y => _y == 1).length;
        var y0 = y.filter(_y => _y == 0).length;
        var phi = (x1y1*x0y0 - x1y0*x0y1)/Math.sqrt(x1*x0*y1*y0);
        return {};
    },
    correlGamma: function() {
        var x = arguments[0];
        var y = arguments[1];
        let n = x.length;
        let n_c = 0;
        let n_d = 0;   
        for (let i = 0; i < n; i++) {
          for (let j = i + 1; j < n; j++) {
            if ((x[i] < x[j] && y[i] < y[j]) || (x[i] > x[j] && y[i] > y[j])) {
              n_c++;
            } else if ((x[i] < x[j] && y[i] > y[j]) || (x[i] > x[j] && y[i] < y[j])) {
              n_d++;
            }
          }
        }  
        var r = (n_c - n_d) / (n_c + n_d);
        var z = (r - 0) / Math.sqrt((4 * n_c * n_d) / (Math.pow(n, 2) * Math.pow(n - 1, 2)));
        var p = dist.normdist(-z, 0, 1, true);
        return {
            r: r,
            p: p
        };
    },
    correlMatrix: function() {
        var input = arguments[0];
        var method = arguments[1] == 1 ? "correlPearson" : arguments[1] == 2 ? "correlSpearman" : arguments[1] == 3 ? "correlKendall" : arguments[1] == 4 ? "correlGamma" : "correlPearson";
        var container = [];
        for(var x = 0; x < input.length; x++)
        {
            for(var y = x + 1; y < input.length; y++) 
            {
                var c = new Matrix(input[x], input[y]).analyze(method).run(0,1);
                container.push({x: input[x].name() || x, y: input[y].name() || y, r: c.result.r || c.result.tau, p: c.result.p, n: c.sample.net});
            }
        }
        container = container.sort((a,b) => Math.abs(a.r) < Math.abs(b.r) ? 1 : -1);
        return container;
        
    },
    ttest_independent: function(){
        var x = arguments[0][0];
        var y = arguments[0][1];
        var nx = x.length;
        var ny = y.length;
        var df = nx + ny-2;
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
            p: p,
            df: df
        }
    },
    welchttest: function() {
        var x = arguments[0][0];
        var y = arguments[0][1];
        var xm = x.avg(), ym = y.avg(), xn = x.length, yn = y.length, s1 = Math.pow(x.stdev(true),2), s2 = Math.pow(y.stdev(true),2);
        var t = (xm-ym)/Math.sqrt(s1/xn+s2/yn);
        var df = Math.pow(s1/xn+s2/yn,2)/(Math.pow(s1,2)/((Math.pow(xn,2)*(xn-1))) + Math.pow(s2,2)/((Math.pow(yn,2)*(yn-1))));
        var p = dist.tdist(t,df,true)*2;
        return {t: t, df: df, p:p};
    },
    ttest_paired: function(){
        var x = arguments[0];
        var y = arguments[1];
        var xy = x.map((_,i) => [_,y[i]]);
        var n = xy.length;
        var df = n * 2 - 2;
        var x_y = xy.map(_ => _[0] - _[1]);
        var t = (x_y.sum()/n)/Math.pow(((x_y.map(_ => Math.pow(_,2))).sum() - Math.pow(x_y.sum(),2)/n)/(n*(n-1)),0.5);    
        var p = dist.tdist(t, df) * 2;
        return {
            t: t,
            p: p,
            df: df
        }
    },
    anova_oneway: function() {
        var arrays = new Array(...arguments[0]);
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
        var total = {
            source: $("P67p"),
            SS: yi_yn_total + pow_yi_min_total,
            df: ns.length - 1 + dfwg
        }
        var between = {
            source: $("thNv"),
            SS: yi_yn_total,
            df: arrays.length - 1,
            MS: yi_yn_total/(arrays.length - 1),
            P2: yi_yn_total/total.SS,
            F: F,
            p: p
        }
        var within = {
            source: $("GiRP"),
            SS: pow_yi_min_total,
            df: (ns.sum() - arrays.length),
            MS: pow_yi_min_total/((ns.sum() - arrays.length))
        }
        return [
            between, within, total
        ]
    },
    anova_twoway: function() {
        var T = new Matrix(arguments[0], arguments[1], arguments[2]);
        var total_mean = T[2].avg();
        var f1_keys = T[0].distinct();
        var f2_keys = T[1].distinct();
        var f1_ss = [...f1_keys.map((v,i) => function(){
                var a = T.filter(0, (e) => e === v)[2];
                const _ = {m: a.avg(), n: a.length}
                return _;
            }()).map(o => o.n * Math.pow(o.m-total_mean,2))].sum();        
        var f2_ss = [...f2_keys.map((v,i) => function(){
                var a = T.filter(1, (e) => e === v)[2];     
                const _ = {m: a.avg(), n: a.length};
                return _;                
            }()).map(o => o.n * Math.pow(o.m-total_mean,2))].sum();
        var total_ss = T[2].map(e => Math.pow(e - total_mean,2 )).sum();
        /* within ss */
        var g = f1_keys.map(f1k => f2_keys.map(function(f2k){
            var _ = T.filter(0, v => v === f1k, 1, v => v === f2k);
            return {f1: f1k, f2: f2k, a: _[2].avg()}
        })).flat();
        var within_ss = 0;
        for(var i = 0; i < T.maxRows(); i++) 
        {
            within_ss += Math.pow(T[2][i] - g.find(_g => _g.f1 === T[0][i] && _g.f2 === T[1][i]).a,2)
        }
        var interaction_ss = total_ss - f1_ss - f2_ss - within_ss;
        var total = {
            source: $("aKUo"),
            SS: total_ss,
            df: T.maxRows()-1
        };
        var within = {
            source: $("IGv4"),
            SS: within_ss,
            df: T.maxRows() - f1_keys.length * f2_keys.length,
            MS: within_ss / (T.maxRows() - f1_keys.length * f2_keys.length),
            P2: within_ss/total_ss
        };
        var f1 ={
            source: T[0].label() || $("WGqY"),
            SS: f1_ss,
            df: f1_keys.length -1,
            MS: f1_ss/(f1_keys.length -1),
            P2: f1_ss/total_ss,
            F: (f1_ss/(f1_keys.length -1))/within.MS            
        }
        f1.p = dist.fdistrt(f1.F, f1.df, within.df);
        var f2 ={
            source: T[1].label() || $("WGqY"),
            SS: f2_ss,
            df: f2_keys.length -1,
            MS: f2_ss/(f2_keys.length -1),
            P2: f2_ss/total_ss,
            F: (f2_ss/(f2_keys.length -1))/within.MS            
        }
        f2.p = dist.fdistrt(f2.F, f2.df, within.df);
        var interaction = {
            source: $("whdI"),
            SS: interaction_ss,
            df: f1.df*f2.df,
            MS: interaction_ss/(f1.df*f2.df),
            P2: interaction_ss/total_ss,
            F: (interaction_ss/(f1.df*f2.df))/within.MS
            
        };
        interaction.p = dist.fdistrt(interaction.F, interaction.df, within.df);
        return [f1,f2,interaction, within, total];

    },
    anova_oneway_repeated: function() {
        var T = arguments[0];
        var f = T.flat();
        var df_total = f.length -1, df_between = T.length - 1, df_subject = T.maxRows() -1 , SS_total = [... f].variance(true) * df_total, bmeans = T.smap(v => v.avg());
        var b_mean = bmeans.avg();
        var SS_between = bmeans.map((e,i) => Math.pow(e- b_mean,2)* T[i].length).sum();
        var SS_subject = T.rows().map((r) => Math.pow(r.sum(),2)).sum() / T.length - Math.pow(f.sum(),2) / (T.maxRows() * T.length);
        var SS_residual = SS_total - SS_between - SS_subject;
        var df_residual = df_between * df_subject;
        var residual = {
            source: $("IGv4"),
            SS: SS_residual,
            df: df_residual,
            MS: SS_residual/df_residual,
            P2: SS_residual/SS_total
        }
        var between = {
            source: $("K3ls"),
            SS: SS_between,
            df: df_between,
            MS: SS_between/df_between,
            P2: SS_between/SS_total,
            F: (SS_between/df_between)/residual.MS,
            p: dist.fdistrt((SS_between/df_between)/residual.MS,df_between,df_residual)
        }
        var subject = {
            source: $("wGQw"),
            SS: SS_subject,
            df: df_subject,
            MS: SS_subject/df_subject,
            P2: SS_subject/SS_total,
            F: (SS_subject/df_subject)/residual.MS,
            p: dist.fdistrt((SS_subject/df_subject)/residual.MS,df_subject,df_residual)
        }
        return [between, subject, residual, {source: $("aKUo"), SS: SS_total, df: df_total}]
    },
    ancova: function(){
        //https://www.statology.org/ancova-excel/
        let T = new Matrix(arguments[0], arguments[1], arguments[2]);
        var yt = [...T.select(0,1).pivot(1,0)], ct = [...T.select(0,2).pivot(1,0)];
        var SSx = ct.map(v => v.devsq());
        var slopes = yt.map((v,i) => v.slope(ct[i]));
        var SSxSlopes = SSx.map((e,i) => e*slopes[i]).sum();
        const bw = SSxSlopes/SSx.sum();
        const bt = yt.flat().slope(ct.flat());
        var anovay = matrixMethods.anova_oneway(yt);
        var anovac = matrixMethods.anova_oneway(ct);
        var ancova_within = {
            source: $("K3ls"),
            SS: anovay[1].SS - Math.pow(bw,2)*anovac[1].SS,
            df: anovay[1].df -1,
            MS: (anovay[1].SS - Math.pow(bw,2)*anovac[1].SS)/(anovay[1].df -1)
        }
        var ancova_c = {
            source: T[2].label() || $("EBON"),
            SS: bw * SSxSlopes,
            df: 1,
            MS: bw * SSxSlopes,
            F: (bw * SSxSlopes)/ancova_within.MS,
            p: dist.fdistrt((bw * SSxSlopes)/ancova_within.MS,1,ancova_within.df)
        }
        var ancova_y = {
            source: T[0].label() || $("dZ4S"),
            SS: anovay.last().SS - Math.pow(bt,2)*anovac.last().SS - ancova_within.SS,
            df: anovay[0].df,
            MS: (anovay.last().SS - Math.pow(bt,2)*anovac.last().SS - ancova_within.SS)/anovay[0].df
        }
        ancova_y.F = ancova_y.MS/ancova_within.MS;
        ancova_y.p = dist.fdistrt(ancova_y.F, ancova_y.df, ancova_within.df);
        ancova_y.P2 = ancova_y.SS/anovay[2].SS;
        ancova_c.P2 = ancova_c.SS/anovay[2].SS;
        return [ancova_y, ancova_c, ancova_within, {source: $("aKUo"), SS: anovay[2].SS, df: T.maxRows()}];
    },
    mannwhitney: function(){
        var x = arguments[0][0];
        var y = arguments[0][1];
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
        var p = dist.normsdist(z, true)*2;
        return {
            U: U,
            Z: z,
            p: p
        }
    },    
    linreg: function(){
        var x = arguments[0];
        var y = arguments[1];
        var model = arguments[2]
        switch (model) {
            case 1:
                break;
            case 2: 
                x = x.reload(x.map(e => Math.log(e)));
                break;
            case 3:
                x = x.reload(x.map(e => 1/e));
                break;
            case 4:
                y = y.reload(y.map(e => Math.log(e)));
                break;
            case 5:
                x = x.reload(x.map(e => Math.log(e)));
                y = y.reload(y.map(e => Math.log(e)));
                break;
            default:
                break;
        }
        var n = x.length;
        var x2 = x.map(_ => Math.pow(_,2)); // x2i
        var xy = x.map((_,i) => _ * y[i]); // xiyi
        var mx = x.avg();
        var my = y.avg();
        var mx2 = x2.avg();
        var mxy = xy.avg();
        var beta1 = (mxy-mx*my)/(mx2-Math.pow(mx,2));
        var beta0 = my - beta1 * mx;
        var yexp = x.map(_ => beta0 + beta1*_);
        var sr = y.map((_,i) => Math.pow(yexp[i] - _, 2)).sum();
        var st = y.map(_ => Math.pow(_ - my,2)).sum();
        var r2 = (st-sr)/st;
        var r = matrixMethods.correlPearson(x,y).r; //Math.sqrt(r2);
        var F = (st-sr)/(sr/(n-2));
        var p = dist.fdistrt(F,1,n-2);
        return {
            r2: r2,
            r: r,
            F: F,
            p: p,
            beta0: beta0,
            beta1: beta1,
            fn: function(x){ return beta0 + x * beta1},
            //n: x.length
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
    },
    kwanova: function(){
        var all = [...arguments[0]].flat();
        var n = all.length;
        var ranks = [...arguments[0]].map(vector => vector.map(v => all.rankAvg(v, 1, 1))).map(v => Math.pow(v.sum(), 2)/v.length);
        let H = 12/(n*(n+1)) * ranks.sum() - 3*(n+1);
        var t = [...arguments[0]].map(vector => vector.map(v => all.rankAvg(v, 1, 1))).flat().frequency().filter(r => r.n > 1).map(e => e.n).frequency();
        /* ties correction */
        if(t.length > 0) H = H/(1 - t.map(_ => Number(_.n) * (Math.pow(Number(_.v),3) - Number(_.v))).sum()/(Math.pow(n,3)- n));
        let df = arguments[0].length - 1;
        let p = 1 - dist.chisqdist(H, df, true);
        return {
            H: H,
            df: df,
            p: p
        }        
    },
    /* Wilcoxon Rank Sum Test for Independent Samples */
    wilcoxon_indpendent: function(){
        var all = arguments[0].flat();
        var x = arguments[0][0].map(v => all.rankAvg(v, 1, 1));
        var y= arguments[0][1].map(v => all.rankAvg(v, 1, 1));
        var n1 = x.length;
        var n2 = y.length;
        let W = Math.min(x.sum(), y.sum());
        var z = (W - n1*(n1+n2+1)/2)/ Math.sqrt(n1*n2*(n1+n2+1)/12);
        var p = dist.normsdist(z,true)*2;
        return {
            W: W,
            Z: z,
            p: p
        }
    },
    /* Wilcoxon's signed rank test for dependent samples */
    wilcoxon_paired: function(){
        var x = arguments[0];
        var y= arguments[1];
        var d = x.map((_,i) => _ - y[i]);
        var absd = d.map((_,i) => Math.abs(_) == 0 ? null : Math.abs(_));    
        var rabsd = absd.map((_,i, arr) => _ == null ? null : arr.rankAvg(_,1,0));
        var pr = rabsd.map((_,i) => d[i] > 0 ? _ : null).filter(_ => !!_);
        var nr = rabsd.map((_,i) => d[i] < 0 ? _ : null).filter(_ => !!_);
        var T = Math.min(pr.sum(), nr.sum());
        var n = pr.concat(nr).length;
        var m = (n*(n+1))/4;//mean
        var v = m*(2*n+1)/6;
        var stdev = Math.sqrt(v);
        var z = Math.abs(T-m)/stdev;
        var p = 2*(1-dist.normsdist(z,true));
        return {
            Z:z,
            p: p
        }
    },
    friedman: function() {
        var vectors = new Array(...arguments[0]);
        var n = vectors[0].length;
        var k = vectors.length;
        var rows = [];
        for(var r = 0; r < n; r++) {
            rows.push(vectors.map((v,i) => v[r]).toAvgRank(1,1));
        };
        let transposition = Array.from(Array(k).keys()).map((x,i) => rows.map(r => r[i]));
        var hasTies = transposition.map(v => v.distinct().length < v.length);
        /* without ties*/         
        if(!hasTies) {
            var Q = 12/(n*k*(k+1))* transposition.map(v => Math.pow(v.sum(),2)).sum() - 3*n*(k+1);
            // alternative calculation
            //var Q = 12/((n*k*(k+1))) * transposition.map(v => v.sum()).map(s => Math.pow(s - ((n*(k+1))/2),2)).sum(); 
        } 
        /* with ties */
        else  {
            const C = 1/4*n*k*Math.pow(k+1,2);
            var Q = (n*(k-1)*(transposition.map(v => Math.pow(v.sum(),2)/v.length).sum() - C)) / (transposition.flat().map(e => Math.pow(e,2)).sum() - C);
        }
        var df = k-1;
        var p = dist.chisqdist(Q,df)*2;
        return {
            Q: Q,
            df: df,
            p: p
        }
    },
    mtplinreg: function(){

    },
    logreg: function(){
        //http://www.17bigdata.com/logistic-regression-in-7-steps-in-excel-2010-and-excel-2013/
    },
    pca: function(){
        var vectors = [...arguments[0]];
        var isSample = true;
        var means = vectors.map(v => v.avg());
        var sds = vectors.map(v => v.stdev(isSample));
        var stv = vectors.map((v,i) => v.map((_v, _i) => (_v - means[i])/sds[i]));
        var cmx = [];
        for(var i = 0; i < stv.length; i++)
        {
            for(var j = 0; j < stv.length; j++)
            {
                var v;
                if(i === j) v = (stv[i].map(e => Math.pow(e,2)).sum())/stv[i].length;
                else v = matrixMethods.covariance(stv[i], stv[j]);
                cmx.push({x: i, y: j, v: v})
            }
        }
        debugger;
    }
};

const MatrixMethodsModels = [
    {   name: "covariance",
        fn: matrixMethods.covariance,
        wiki: {
            title: "EXYx",
            description: "AkjW",
            preprocessor: preprocessors.removeEmptyXY.title
        },
        output: "number",
        prepare: preprocessors.removeEmptyXY.fn,
        args: {
            x: {
                model: "numericVector",
                config: {
                    name: "x",
                    title: "qFEM",
                    required: true
                }
            },
            y: {
                model: "numericVector",
                config: {
                    name: "y",
                    title: "tpUu",
                    required: true
                }
            },
            isSample: {
                model: "boolean",
                config: {
                    name: "isSample",
                    title: "eJTq",
                    description: "FfpU",
                    required: false,
                    default: true
                }
            }
        }
    },
    {   name: "correl",
        fn: matrixMethods.correl,
        wiki: {
            title: "leYr",
            description: "gJwy",
            preprocessor: preprocessors.removeEmptyXY.title
        },
        output: "correl",
        prepare: preprocessors.removeEmptyXY.fn,
        args: {
            x: {
                model: "numericVector",
                config: {
                    name: "x",
                    title: "qFEM",
                    required: true
                }
            },
            y: {
                model: "numericVector",
                config: {
                    name: "y",
                    title: "tpUu",
                    required: true
                }
            },
            methods: {
                model: "correlMethods",
                config: {
                    name: "methods",
                    title: "ipHs",
                    required: false,
                    default: [1,2]
                }
            }
        }
    },
    {   name: "correlPearson",
        fn: matrixMethods.correlPearson,
        wiki: {
            title: "pTvR",
            description: "wPyG",
            preprocessor: preprocessors.removeEmptyXY.title
        },
        output: "correlPearson",
        prepare: preprocessors.removeEmptyXY.fn,
        args: {
            x: {
                model: "numericVector",
                config: {
                    name: "x",
                    title: "qFEM",
                    required: true
                }
            },
            y: {
                model: "numericVector",
                config: {
                    name: "y",
                    title: "tpUu",
                    required: true
                }
            }
        }
    },
    {   name: "correlSpearman",
        fn: matrixMethods.correlSpearman,
        wiki: {
            title: "eJTT",
            description: "jAGi",
            preprocessor: preprocessors.removeEmptyXY.title
        },
        output: "correlSpearman",
        prepare: preprocessors.removeEmptyXY.fn,
        args: {
            x: {
                model: "numericVector",
                config: {
                    name: "x",
                    title: "qFEM",
                    required: true
                }
            },
            y: {
                model: "numericVector",
                config: {
                    name: "y",
                    title: "tpUu",
                    required: true
                }
            }
        }
    },
    {   name: "correlKendall",
        fn: matrixMethods.correlKendall,
        wiki: {
            title: "mgBC",
            description: "VOmC",
            preprocessor: preprocessors.removeEmptyXY.title
        },
        unstable: true,
        output: "correlKendall",
        prepare: preprocessors.removeEmptyXY.fn,
        args: {
            x: {
                model: "numericVector",
                config: {
                    name: "x",
                    title: "qFEM",
                    required: true
                }
            },
            y: {
                model: "numericVector",
                config: {
                    name: "y",
                    title: "tpUu",
                    required: true
                }
            }
        }
    },
    {   name: "correlPartial",
        fn: matrixMethods.correlPartial,
        wiki: {
            title: "xfSf",
            description: "UcfZ",
            preprocessor: preprocessors.removeEmptyXY.title
        },
        output: "correlPartial",
        prepare: preprocessors.removeEmptyXY.fn,
        args: {
            x: {
                model: "numericVector",
                config: {
                    name: "x",
                    title: "qFEM",
                    required: true
                }
            },
            y: {
                model: "numericVector",
                config: {
                    name: "y",
                    title: "tpUu",
                    required: true
                }
            },
            z: {
                model: "numericVector",
                config: {
                    name: "z",
                    title: "tpUR",
                    required: true
                }
            }
        }
    },
    {   name: "correlBiserial",
        fn: matrixMethods.correlBiserial,
        wiki: {
            title: "AagR",
            description: "OMiA",
            preprocessor: preprocessors.removeEmptyXY.title
        },
        output: "correlPearson",
        prepare: preprocessors.removeEmptyXY.fn,
        args: {
            x: {
                model: "booleanVector",
                config: {
                    name: "x",
                    title: "qFEM",
                    required: true
                }
            },
            y: {
                model: "numericVector",
                config: {
                    name: "y",
                    title: "tpUu",
                    required: true
                }
            }
        }
    },
    {   name: "correlGamma",
        fn: matrixMethods.correlGamma,
        wiki: {
            title: "R5AC",
            description: "zKSX",
            preprocessor: preprocessors.removeEmptyXY.title
        },
        output: "correlGamma",
        prepare: preprocessors.removeEmptyXY.fn,
        args: {
            x: {
                model: "numericVector",
                config: {
                    name: "x",
                    title: "qFEM",
                    required: true
                }
            },
            y: {
                model: "numericVector",
                config: {
                    name: "y",
                    title: "tpUu",
                    required: true
                }
            }
        }
    },
    {   name: "correlMatrix",
        fn: matrixMethods.correlMatrix,
        wiki: {
            title: "DeMU",
            description: "XtbY",
            preprocessor: preprocessors.removeEmptyXY.title
        },
        output: "correlMatrix",
        prepare: null,
        args: {
            vectors: {
                model: "numericVectors",
                config: {
                    name: "vectors",
                    title: "sQ9w",
                    required: true
                }
            },
            method: {
                model: "correlationMatrixMethod",
                config: {
                    name: "method",
                    title: "nDx1",
                    required: false
                }
            }
        }
    },
    {   name: "ttestind",
        fn: matrixMethods.ttest_independent,
        wiki: {
            title: "YqRh",
            description: "gILL",
            preeprocesor: preprocessors.groupXYRemoveEmpty
        },
        output: "ttestind",
        prepare: preprocessors.groupXYRemoveEmpty.fn,
        args: {
            "vectors": {
                model: "numericVectors",
                config: {
                    name: "vectors",
                    title: "Rd9K",
                    required: true,
                }
            },        
            "factor": {
                model: "anyVector",
                config: {
                    name: "factor",
                    title: "dTDt",
                    required: false

                }
            }
        }
    },
    {   name: "ttestpair",
        fn: matrixMethods.ttest_paired,
        wiki: {
            title: "mmXD",
            description: "kPqo",
            preprocessor: preprocessors.removeEmptyXY.title
        },
        output: "ttestpair",
        prepare: preprocessors.removeEmptyXY.fn,
        args: {
            x: {
                model: "numericVector",
                config: {
                    name: "x",
                    title: "qFEM",
                    required: true,
                }
            },
            y: {
                model: "numericVector",
                config: {
                    name: "y",
                    title: "tpUu",
                    required: true
                }
            }           
        }
    },
    {   name: "welchttest",
        fn: matrixMethods.welchttest,
        wiki: {
            title: "2mXr",
            description: "qojR",
            preeprocesor: preprocessors.groupXYRemoveEmpty
        },
        output: "welchttest",
        prepare: preprocessors.groupXYRemoveEmpty.fn,
        args: {
            "vectors": {
                model: "numericVectors",
                config: {
                    name: "vectors",
                    title: "Rd9K",
                    required: true,
                }
            },        
            "factor": {
                model: "anyVector",
                config: {
                    name: "factor",
                    title: "dTDt",
                    required: false

                }
            }
        }
    },
    {   name: "anovaow",
        fn: matrixMethods.anova_oneway,
        wiki: {
            title: "baJo",
            description: "qqQo",
            preprocessor: preprocessors.groupANOVARemoveEmpty.title
        },   
        output: "anovaow",     
        prepare: preprocessors.groupANOVARemoveEmpty.fn,
        args: {
            "vectors": {
                model: "numericVectors",
                config: {
                    name: "vectors",
                    title: "Rd9K",
                    required: true,
                }
            },        
            "factor": {
                model: "anyVector",
                config: {
                    name: "factor",
                    title: "dTDt",
                    required: false
                }
            }
        }
    },
    {   name: "anovatw",
        fn: matrixMethods.anova_twoway,
        wiki: {
            title: "Cdly",
            description: "3FYm",
            preprocessor: preprocessors.removeEmptyAcrossRows.title
        },   
        output: "anovatw",     
        prepare: preprocessors.twoWayAnova.fn,
        args: {       
            "f1": {
                model: "anyVector",
                config: {
                    name: "f1",
                    title: "WGqY",
                    required: true
                }
            },        
            "f2": {
                model: "anyVector",
                config: {
                    name: "f2",
                    title: "O6Av",
                    required: true
                }
            },
            v: {
                model: "numericVector",
                config: {
                    name: "v",
                    title: "XeLl",
                    required: true
                }
            }
        }
    },
    {   name: "anovaowrm",
        fn: matrixMethods.anova_oneway_repeated,
        wiki: {
            title: "0tRn",
            description: "V0CE",
            preprocessor: preprocessors.removeEmptyAcrossRows.title
        },   
        output: "anovaowrm",     
        prepare: preprocessors.removeEmptyAcrossRows.fn,
        args: {       
            "vectors": {
                model: "numericVectors",
                config: {
                    name: "vectors",
                    title: "Rd9K",
                    required: true,
                }
            }
        }
    },
    {   name: "ancova",
        fn: matrixMethods.ancova,
        wiki: {
            title: "EI6f",
            description: "cwa9",
            preprocessor: preprocessors.removeEmptyAcrossRows.title
        },   
        output: "ancova",     
        prepare: preprocessors.ancova.fn,
        args: {       
            "factor": {
                model: "anyVector",
                config: {
                    name: "factor",
                    title: "dZ4S",
                    required: true
                }
            },        
            "dependent": {
                model: "numericVector",
                config: {
                    name: "dependent",
                    title: "lYdI",
                    required: true
                }
            },
            "covariant": {
                model: "numericVector",
                config: {
                    name: "covariant",
                    title: "EBON",
                    required: true
                }
            }
        }
    },
    {   name: "linreg",
        fn: matrixMethods.linreg,
        wiki: {
            title: "vlCA",
            description: "dzFE",
            preprocessor: preprocessors.removeEmptyXY.title,
            url: {
                "cs-CZ": "https://cs.wikipedia.org/wiki/Line%C3%A1rn%C3%AD_regrese",
                "en-GB": "https://en.wikipedia.org/wiki/Linear_regression"
            }
        },
        output: "linreg",
        prepare: preprocessors.removeEmptyXY.fn,
        args: {
            x: {
                model: "numericVector",
                config: {
                    name: "x",
                    title: "jDlm",
                    required: true,
                }
            },
            y: {
                model: "numericVector",
                config: {
                    name: "y",
                    title: "jFVv",
                    required: true
                }
            },        
            model: {
                model: "regressionModel",
                config: {
                    name: "model",
                    title: "OBml",
                    default: 1
                }
            }            
        }
    },
    {   name: "contingency",
        fn: matrixMethods.contingency,
        wiki: {
            title: "gRix",
            description: "fqwd",
            preprocessor: preprocessors.removeEmptyAcrossRows.title,
            url: "https://en.wikipedia.org/wiki/Contingency_table"
        },
        prepare: function(_) {
            _.sample.raw = _.parent.maxRows();
            var vectors = Object.entries(_.args).map(a => a[1]).filter(a => a?.isVector);
            var M = new Matrix(...vectors).removeEmpty();
            _.sample.net = M.maxRows();
            _.args.rows = M[0];
            _.args.columns = M[1];
            if(_.args.n) _.args.n = M[2];
        },
        output: "contingency",
        args: {
            rows: {
                model: "anyVector",
                config: {
                    name: "rows",
                    title: "gLRN",
                    required: true
                }
            },        
            columns: {
                model: "anyVector",
                config: {
                    name: "columns",
                    title: "bpjC",
                    required: true
                }
            },        
            n: {
                model: "numericVector",
                config: {
                    name: "n",
                    title: "fqUi",
                    required: false
                }
            }               
        }
    },
    {   name: "wcxpair",
        fn: matrixMethods.wilcoxon_paired,
        wiki: {
            title: "ChzY",
            description: "pApR",
            preprocessor: preprocessors.removeEmptyXY.title
        },
        output: "wcxpair",
        prepare: preprocessors.removeEmptyXY.fn,
        args: {
            x: {
                model: "numericVector",
                config: {
                    name: "x",
                    title: "qFEM",
                    required: true,
                }
            },
            y: {
                model: "numericVector",
                config: {
                    name: "y",
                    title: "tpUu",
                    required: true
                }
            }           
        }
    },
    {   name: "wcxind",
        fn: matrixMethods.wilcoxon_indpendent,
        wiki: {
            title: "Httc",
            description: "sqwQ",
            preeprocesor: preprocessors.groupXYRemoveEmpty
        },
        output: "wcxind",
        prepare: preprocessors.groupXYRemoveEmpty.fn,
        args: {
            "vectors": {
                model: "numericVectors",
                config: {
                    name: "vectors",
                    title: "Rd9K",
                    required: true,
                }
            },        
            "factor": {
                model: "anyVector",
                config: {
                    name: "factor",
                    title: "dTDt",
                    required: false
                }
            }
        }
    },
    {   name: "mwu",
        fn: matrixMethods.mannwhitney,
        wiki: {
            title: "rPQr",
            description: "vzHj",
            preprocessor: preprocessors.groupXYRemoveEmpty.title,
            url: "https://en.wikipedia.org/wiki/Mann%E2%80%93Whitney_U_test",
        },
        output: "mwu",
        prepare: preprocessors.groupXYRemoveEmpty.fn,
        args: {
            "vectors": {
                model: "numericVectors",
                config: {
                    name: "vectors",
                    title: "Rd9K",
                    required: true,
                }
            },        
            "factor": {
                model: "anyVector",
                config: {
                    title: "dTDt",
                    name: "factor",
                    required: false
                }
            }
        }
    },
    {   name: "friedman",
        fn: matrixMethods.friedman,
        wiki: {
            title: "7m48",
            description: "sUw5",
            preprocessor: preprocessors.removeEmptyAcrossRows.title
        },   
        output: "friedman",     
        prepare: preprocessors.removeEmptyAcrossRows.fn,
        args: {
            "vectors": {
                model: "numericVectors",
                config: {
                    name: "vectors",
                    required: true,
                }
            }
        }
    },
    {   name: "kwanova",
        fn: matrixMethods.kwanova,
        wiki: {
            title: "IWXW",
            description: "J5jV",
            preprocessor: preprocessors.groupANOVARemoveEmpty.title
        },   
        output: "kwanova",     
        prepare: preprocessors.groupANOVARemoveEmpty.fn,
        args: {
            "vectors": {
                model: "numericVectors",
                config: {
                    name: "vectors",
                    title: "Rd9K",
                    required: true,
                }
            },        
            "factor": {
                model: "anyVector",
                config: {
                    name: "factor",
                    title: "dTDt",
                    required: false
                }
            }
        }
    },
    {   name: "mtplinreg",
        fn: matrixMethods.mtplinreg,
        wiki: {
            title: "L9ff",
            description: "MSug",
            preprocessor: preprocessors.removeEmptyXY.title,
        },
        output: "mtplinreg",
        prepare: function(_){
            var M = new Matrix(..._.args.independents, _.args.dependent);
            _.sample.raw = M.maxRows();
            M = M.removeEmpty();
            _.sample.net = M.maxRows();
            _.args.independents = M.slice(0, M.length - 1);
            _.args.dependent = M[M.length - 1];
        },
        args: {
            dependent: {
                model: "numericVector",
                config: {
                    name: "dependent",
                    title: "BnOT",
                    required: true
                }
            },   
            independents: {
                model: "numericVectors",
                config: {
                    name: "independents",
                    title: "OzwJ",
                    required: true,
                }
            }         
        }
    },
    {   name: "pca",
        fn: matrixMethods.pca,
        wiki: {
            title: "DeMU",
            description: "XtbY",
            preprocessor: preprocessors.removeEmptyXY.title
        },
        output: "correlMatrix",
        prepare: null,
        args: {
            vectors: {
                model: "numericVectors",
                config: {
                    name: "vectors",
                    title: "sQ9w",
                    required: true
                }
            }
        }
    }
];

MatrixMethodsModels.forEach(function(m) {
    Matrix.prototype[m.name] = function() {
        var M = new MatrixAnalysis(m, this);
        return M.run(...arguments).result;
    };
});

const Models = {}
function mapModels() {
    MatrixMethodsModels.map(function(m){Models[m.name] = new MatrixAnalysis(m, null)});
}
mapModels();

// #endregion

module.exports = {
    Matrix: Matrix,
    MatrixAnalysis: MatrixAnalysis,
};