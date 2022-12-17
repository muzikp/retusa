var $ = require("./locale").call;

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

const filters = {
    any: {fn: () => true, text: "FxzE"},
    notnull: {fn: f_notnull, text: "ndPx"},
    number: {fn: f_number, text: "GDkm"},
    string: {fn: f_string, text: "jocS"},
    boolean: {fn: f_boolean, text: "uUYu"}
}

// #endregion

// #region VALIDATORS

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
}

let v_isVariable = function(v, autoparse){
    v_isNotEmpty(v);
    try {
        if(v?.constructor?.name == "Variable") return v;
        else if(autoparse) {
            if(Array.isArray(v)) {
                return new Variable(v);
            } else throw new Error($("RLob"), {value: typeof v})
        } else throw new Error($("RLob", {value: typeof v}))
    } catch (e) {
        throw new Error($("RLob", {value: typeof v}))
    }
}

let v_isNumericVariable = function(v, autoparse = false){
    if(v_isVariable(v, autoparse).type() === 1) return v;
    else throw new Error($("Kvpv"))
}

/** nezohledňuje požadovanou velikost vzorku */
let v_generalCorrelVariable = function(v, autoparse = false) {
    return v_isNumericVariable(v, autoparse = false);
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

let v_booleanVariable = function(v) {
    if(v_isVariable(v).type() !== 3) throw new Error($("GqQZ"));
    else return v;
}

const validators = {
    isNumber: {fn: v_isNumber, text: "NfvF"},
    isNotEmpty: {fn: v_isNotEmpty, text: ""},
    zeroToOneInc: {fn: v_zeroToOneInc, text:"GweD"},
    boolean: {fn: v_boolean, text:"GHFj"},
    isVariable: {fn: v_isVariable, text: "GJry"},
    isNumericVariable: {fn: v_isNumericVariable, text: "gGTf"},
    generalCorrelVariable: {fn: v_isNumericVariable, text: "gGTf"},
    positiveInteger: {fn: v_positiveInteger, text: "dFiw"},
    positiveDecimal: {fn: v_positiveDecimal, text: "bpCq"},
    booleanVariable: {fn: v_booleanVariable, text: "OCKc"},
    enumValidator: function(enumSchema) {
        const es = enumSchema;
        return {
            fn: function(v) {
                if(es.values.find(e => e.key == v)) return v;
                else throw new Error($("HhLt", {name: es.name, title: $(es.title), value: v, keys: es.values.map(e => e.key).toString()}))
            }
            , text: "aaVG"}       
    }
}

// #endregion

module.exports = {
    filters: filters,
    validators: validators
}
