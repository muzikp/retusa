var $ = require("./locale").call;
//var {NumericMatrix} = require("./matrix");
//var {NumericVector} = require("./vector");

// #region FILTERS

let f_notnull = function(v) {
    return v !== null;
}
let f_number = function(v) {
    return v === 0 || v < 0 || v > 0
}
let f_string = function(v) {
    return v?.length > 0
}
let f_boolean = function(v) {
    return v === true || v === false
}

let f_removeEmpty = function() {
    return true;
}

let f_bypassMatrix = function(matrix) {
    return matrix
}

let f_removeMatrixEmpty = function(matrix) {
    var fs = new Array(...matrix).map((v,i) => [i, (v) => v !== null]).flat(Infinity);
    return matrix.filter(...fs);
}

let f_anovaLikeMatrix = function(matrix, args) {
    if(!args) {
        return new Array(...matrix).map(v => v.removeEmpty());
    }
    else if(args[1]?.isVector) {
        var notEmptyFactorIndexes = new Array(...args[1]).map((v,i) => v !== null ? i : -1).filter(i => i > -1);
        return (!matrix.isMatrix ? matrix.matrify() : matrix).filterByIndex(...notEmptyFactorIndexes);
    } else {        
        var x =  new Array(...matrix).map(v => v.removeEmpty());
        return x;
    }
}

const filters = {
    any: {fn: () => true, text: "FxzE"},
    notnull: {fn: f_notnull, text: "ndPx"},
    number: {fn: f_number, text: "GDkm"},
    string: {fn: f_string, text: "jocS"},
    boolean: {fn: f_boolean, text: "uUYu"},
    bypassMatrix: {fn: f_boolean, text: ""},
    matrixNotEmpty: {fn: f_removeMatrixEmpty, text: "rAyq"},
    anovaLikeMatrix: {fn: f_anovaLikeMatrix, text: "CPwN"}
}

// #endregion

// #region VALIDATORS

let v_any = function(v) {return v};

let v_isObject = function(v) {
    if(typeof v == "object") {
        if(!Array.isArray(v)) return v;
        else new TypeError($("YpHg", {value: v}));
    } else if(typeof v == "string") {
        try {
            return v_isObject(JSON.parse(v));
        } catch(e) {
            new TypeError($("YpHg", {value: v}));
        }
    }
}

let v_isNumber = function(v) {
    if(v === 0 || !isNaN(v)) return Number(v);
    else throw new RangeError($("Jphg", {value: v}));
}
let v_zeroToOneInc = function(v) {
    if(v_isNumber(v) < 0 || v_isNumber(v) > 1) throw new Error($("vKlu", {value: v}));
    else return v;    
}

let v_boolean = function(v) {
    if(v) return true;
    else return false;
}

let v_isNotEmpty = function(v) {
    if(!v && v !== 0 && v !== false) throw new Error($("HOuY"));
    else return v;
}

let v_isVector = function(v, autoparse){
    v = v_isNotEmpty(v);
    if(v?.isVector) return v;
    else if(Array.isArray(v) && autoparse) {
        return v.vectorify();
    } else throw new Error($("RLob", {value: typeof v}));
}

let v_isNumericVector = function(v, autoparse = false){
    if(v_isVector(v, autoparse).type() === 1) return v;
    else throw new Error($("Kvpv"))
}

let v_isBooleanVector = function(v, autoparse = false){
    if(v_isVector(v, autoparse).type() === 3) return v;
    else throw new Error($("KvHv"))
}

/** nezohledňuje požadovanou velikost vzorku */
let v_generalCorrelVariable = function(v, autoparse = false) {
    return v_isNumericVector(v, autoparse = false);
}

let v_positiveInteger = function(v) {
    if(v_isInteger(v) <= 0) throw new Error($("HCgv"));
    else return v;
}

let v_isInteger = function(v){
    if(v_isNumber(v) % 1 !== 0) throw new TypeError($("tEdu"));
    else return Number(v);
}

let v_positiveDecimal = function(v) {
    if(v_isNumber(v) <= 0) throw new Error($("HCgv"));
    else return v;
}

let v_isArray = function(v) {
    if(!Array.isArray(v)) throw new Error($("FepU", {value: v}))
    else return v;
}

let v_isNumericMatrix = function(v) {
    v = v_isNotEmpty(v);
    if(v.constructor?.name !== "NumericMatrix") {
        if(!Array.isArray(v)) throw new Error($("FIQW", {value: v}))    
        else if(v.find(i => i?.type !== 1)) throw new Error($("FIQW", {value: v}));
        else return v.toNumericMatrix();
    } else return v
}

const validators = {
    any: {fn: v_any, text: "Blaz"},
    isObject: {fn: v_isObject, text: "MFvf"},
    isNumber: {fn: v_isNumber, text: "NfvF"},
    isArray: {fn: v_isArray, text: ""},
    isNotEmpty: {fn: v_isNotEmpty, text: ""},
    zeroToOneInc: {fn: v_zeroToOneInc, text:"GweD"},
    boolean: {fn: v_boolean, text:"GHFj"},
    isVector: {fn: v_isVector, text: "GJry"},
    isNumericVector: {fn: v_isNumericVector, text: "gGTf"},
    generalCorrelVector: {fn: v_isNumericVector, text: "gGTf"},
    positiveInteger: {fn: v_positiveInteger, text: "dFiw"},
    positiveDecimal: {fn: v_positiveDecimal, text: "bpCq"},
    isBooleanVector: {fn: v_isBooleanVector, text: "OCKc"},
    isNumericMatrix: {fn: v_isNumericMatrix, text: "OrZc"},
    enumValidator: function(enumSchema) {
        const es = enumSchema;
        return {
            fn: function(v) {
                if(es.values.find(e => e.key == v)) return v;
                else throw new Error($("HhLt", {name: es.name, value: v, keys: es.values.map(e => e.key).toString()}))
            }
            , text: "aaVG"}       
    }
}

const enumerators= {
    regressionModel: {
        name: "model",
        type: "enum",
        title: "OBml",
        default: 1,
        values: [
            {
                key: 1, //linear
                title: "Cpsw"
            },
            {
                key: 2, // logistic
                title: "UtZD"
            },
            {
                key: 3, //hyperbole
                title: "SCOx"
            },
            {
                key: 4, //exponential
                title: "QaJi"
            },
            {
                key: 5, //quadratic
                title: "HUMA"
            }
        ]
    },
    frequencyOrder: {
        name: "order",
        type: "enum",
        title: "gZCx",
        default: 1,
        values: [
            {
                key: 1, 
                title: "AUbD"
            },
            {
                key: 2, 
                title: "WSJH"
            },
            {
                key: 3, 
                title: "dkxz"
            },
            {
                key: 4, 
                title: "vJCU"
            }
        ]
    }
}

// #endregion

module.exports = {
    filters: filters,
    validators: validators,
    enumerators: enumerators
}
