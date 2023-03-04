"use strict";

var {NumericVector, StringVector, BooleanVector, Vector} = require("./vector");
var $ = require("./locale").call;
var {filters, validators, enumerators} = require("./parsers");
var {matrixResultSchemas, argumentSchemas, OutputSchema, FormMatrixSchema} = require("./schemas");
const {Array, Math, String, Function} = require("./extensions");
const dist = require("./distribution");
var {VectorValueError, ArgumentError, Empty} = require("./errors");
const {MatrixMarkdown, MatrixOverview} = require("./markdown");
var matrixName = null

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
                super.push(a);
            }
            else if(Array.isArray(a)) super.push(a.vectorify());
            else {
                throw new ArgumentError("Argument is not a vector or array.");
            }
        };
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
        var selection = this.select(target, factor);
        var pivot = new Matrix();        
        for(let key of factor.distinct().intersection(selectedKeys)) {
            pivot.push(new target.constructor(...selection.filter(factor, (v) => v === key)[0]).name(key));
        }
        return pivot;
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

// #endregion

const {Argument} = (require("./argument"));
const {Output} = require("./output");

const preprocessors = {
    removeEmptyXY: function(_){
        var M = new Matrix(_.args.x, _.args.y)
        _.sample.raw = M.maxRows();
        M = M.removeEmpty();
        _.args.x = M[0];
        _.args.y = M[1];
        _.sample.net = M.maxRows();
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
        for(let w of ["title","description","preprocessor"]) {
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
        if(new Array(...arguments) == 0) return this;
        /** named config (object) */
        else if(typeof new Array(...arguments)[0] == "object" && !Array.isArray(arguments[0])) {
            var parameters = arguments[0];
            for(let key of Object.keys(this.model.args)) {
                var arg = this.model.args[key];
                if(!arg) throw new ArgumentError($("EFfS", {name: key, method: $(this.model.wiki.title)}));
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
        if(!this.parent) return new Empty($("jrQP"));
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
           p: p
       };
    },
    correlSpearman: function(x,y) {
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
    correlKendall: function(x,y){
        let n = x.length;
        let numPairs = n * (n - 1) / 2;
        let numConcordant = 0;
        let numDiscordant = 0;
        let numTiesX = 0;
        let numTiesY = 0;
        let numTiesXY = 0;
        for (let i = 0; i < n - 1; i++) {
            for (let j = i + 1; j < n; j++) {
                let x1 = x[i];
                let x2 = x[j];
                let y1 = y[i];
                let y2 = y[j];
                let xDiff = x1 - x2;
                let yDiff = y1 - y2;
                if (xDiff === 0 && yDiff === 0) {
                    numTiesX++;
                    numTiesY++;
                    numTiesXY++;
                } else if (xDiff === 0) {
                    numTiesX++;
                    if (yDiff > 0) {
                    numConcordant++;
                    } else if (yDiff < 0) {
                    numDiscordant++;
                    }
                } else if (yDiff === 0) {
                    numTiesY++;
                    if (xDiff > 0) {
                    numConcordant++;
                    } else if (xDiff < 0) {
                    numDiscordant++;
                    }
                } else {
                    if (xDiff > 0 && yDiff > 0 || xDiff < 0 && yDiff < 0) {
                    numConcordant++;
                    } else {
                    numDiscordant++;
                    }
                }
            }
        }
        let denominator = Math.sqrt((numPairs - numTiesX) * (numPairs - numTiesY));
        var taub = (numConcordant - numDiscordant) / denominator;
        var taua = (numConcordant - numDiscordant)/ Math.combinations(n, 2);
        var z = (3 * taua * Math.pow(n*(n-1), .5))/Math.pow(2*(2*n+5), .5);
        var p = dist.normsdist(Math.abs(z))/2;
        return {
            taub: taub,
            taua: taua,
            df: n - 2,
            p: p
        }
    },
    correlPartial: function(x,y,z){
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
            //n: n,
            p: p
        }
    },
    correlBiserial: function(x,y){
        return matrixMethods.correlPearson(new NumericVector(new Array(...x).map(v => v ? 1 : 0)).name(x.name),y);
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
    ttest_independent: function(vectors,factor){
        var arrays = factor ? new Array(...new Matrix(factor, vectors[0]).pivot(1,0)).slice(0,2) : new Array(...vectors).slice(0,2);
        var x = arrays[0];
        var y = arrays[1];
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
    ttest_paired: function(x,y){
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
    anova_oneway: function(vectors, factor) {
        var arrays = (factor ? new Array(...new Matrix(factor, vectors[0]).pivot(1,0)) : new Array(...vectors)).map(v => v.removeEmpty());
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
            df: dfwg,
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
        var p = dist.normsdist(z)*2;
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
            model: model,
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
    kwanova: function(vectors, factor) {
        var data = (factor ? new Array(...new Matrix(factor, vectors[0]).pivot(1,0)) : new Array(...vectors)).map(v => v.removeEmpty());
        const flatData = data.flat().sort((a, b) => a - b);
        const nGroups = data.length;
        const nObs = data.map(group => group.length);
        const ranks = flatData.map((value, index) => index + 1);
        //const groupRanks = data.map(group => group.reduce((sum, value) => sum + ranks[flatData.indexOf(value)], 0));
        const groupRanks = data.map(group => group.reduce((sum, value) => sum + ranks[Math.round(flatData.rankAvg(value))], 0));
        const meanRanks = groupRanks.map((sum, index) => sum / nObs[index]);
        const grandMeanRank = ranks.reduce((sum, value) => sum + value, 0) / flatData.length;
        const ssTotal = ranks.reduce((sum, value) => sum + (value - grandMeanRank) ** 2, 0);
        const ssBetween = nObs.reduce((sum, n, index) => sum + n * (meanRanks[index] - grandMeanRank) ** 2, 0);
        const dfBetween = nGroups - 1;
        const dfWithin = flatData.length - nGroups;
        const h = (ssBetween / dfBetween) / ((ssTotal - ssBetween) / dfWithin);
        const p = 1 - dist.chisqdist(h, dfBetween, true);
        return {
            H: h,
            p: p
        };
    },
    /* Wilcoxon's signed rank test for dependent samples */
    /**
     * https://real-statistics.com/non-parametric-tests/wilcoxon-signed-ranks-test/
     * @param {NumericVector} x first variable
     * @param {NumericVector} x second variable
     */
    wcxpaired(x,y){
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
    }
};

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
                wiki: {title: "tpUR"},
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
    {   name: "ttestind",
        fn: matrixMethods.ttest_independent,
        filter: filters.anovaLikeMatrix,
        example: function(){
            var M = new Matrix([],[]).ttestind(0,1);
        },
        wiki: {
            title: "YqRh",
            description: "gILL"
        },
        returns: matrixResultSchemas.ttestpair,
        args: [{
                name: "vectors",
                wiki: {title: "qFEM"},
                type: [1],
                min: 1,
                max: 2,
                required: true,
                validator: validators.isNumericMatrix,
                schema: argumentSchemas.numericMatrix,
                class: 2
            },        
            {
                name: "factor",
                wiki: {title: "tpUu"},
                type: [1,2,3],
                required: false,
                validator: validators.isNumericVector,
                schema: argumentSchemas.numericVector,
                class: 1
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
        returns: matrixResultSchemas.ttestpair,
        args: [{
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
        }]
    },
    {   name: "anovaow",
        fn: matrixMethods.anova_oneway,
        argsToMatrix: true,
        filter: filters.anovaLikeMatrix,
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
        args: [
                {
                    name: "vectors",
                    wiki: {title: "iJaa"},
                    min: 1,
                    type: [1],
                    required: true,
                    validator: validators.isNumericMatrix,
                    schema: argumentSchemas.numericMatrix,
                    class: 2
                },{
                    name: "factor",
                    wiki: {title: "iJEe"},
                    type: [1,2,3],
                    required: false,
                    validator: validators.isVector,
                    schema: argumentSchemas.numericMatrix,
                    class: 1
                }
        ]
    },
    {   name: "linreg",
        fn: matrixMethods.linreg,
        returns: matrixResultSchemas.genreg,
        wiki: {
            title: "vlCA",
            description: "dzFE",
            preprocesor: "Cumi",
            url: {
                "cs-CZ": "https://cs.wikipedia.org/wiki/Line%C3%A1rn%C3%AD_regrese",
                "en-GB": "https://en.wikipedia.org/wiki/Linear_regression"
            }
        },
        output: "linreg",
        prepare: preprocessors.removeEmptyXY,
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
                }
            }            
        }
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
    },
    {   name: "wcxpaired",
        fn: matrixMethods.wcxpaired,
        example: function(){
            var M = new Matrix([1,2,3,4,5,6,7,8,9,10],[1,3,5,7,9,11,13,15,17,19]).wcxpaired(0,1);
        },
        filter: filters.matrixNotEmpty,
        wiki: {
            title: "ChzY",
            description: "pApR"
        },
        returns: matrixResultSchemas.wcxpaired,
        args: [{
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
        }]
    },
    {   name: "mwu",
        fn: matrixMethods.mannwhitney,
        wiki: {
            title: "rPQr",
            description: "vzHj",
            preprocessor: "OH5v",
            url: "https://en.wikipedia.org/wiki/Mann%E2%80%93Whitney_U_test",
        },
        output: "mwu",
        prepare: function(_) {
            if(_.args.factor) {
                var _matrix = new Matrix(_.args.vectors[0], _.args.factor).pivot(0,1);
                _.args.vectors = _matrix.select(0,1);
                _.args.factor = null;
            } else {
                if(_.args.vectors.length < 2) throw new Error($("HHCW"));
                else {
                    _.args.vectors = _.args.vectors.select(0,1);
                    _.args.factor = null;
                }
            }
            _.sample.raw = _.args.vectors.maxRows();
            _.args.vectors = _.args.vectors.removeEmpty();
            _.sample.net = _.args.vectors.maxRows();
        },
        args: {
            "vectors": {
                model: "numericVectors",
                config: {
                    name: "vectors",
                    required: true,
                }
            },        
            "factor": {
                name: "factor",
                model: "anyVector",
                config: {
                    name: "factor"
                }
            }
        }
    },
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
    //Models: Models,
    methods: matrixMethods,
    MatrixOverview: function() {
        return MatrixOverview(Models)},
};