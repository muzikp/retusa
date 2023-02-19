"use strict";
var $ = require("./locale").call;
var {filters, validators, enumerators} = require("./parsers");
var {vectorResultSchemas, OutputSchema, FormVectorSchema} = require("./schemas");
const {Array, Math, String, Function} = require("./extensions");
const {VectorMarkdown, VectorOverview} = require("./markdown");
var {VectorValueError, ArgumentError, Empty} = require("./errors");
const rndWordList= ["silver","twig","train","reading","clouds","bean","frogs","power","canvas","stop","van","drain","doctor","lamp","mind","existence","seat","sky","cloud","burn","crayon","brush","hat","snails","snail","move","seashore","honey","powder","cork","toothpaste","cub","kitty","skin","self","rice","chin","cushion","death","steel","toes","cabbage","stamp","bone","cemetery","appliance","fairies","unit","committee","fall","debt","cherry","baby","rings","legs","knee","bike","cook","carpenter","expansion","toothbrush","rain","fork","statement","house","things","cars","root","books","marble","swim","babies","jellyfish","question","trains","apparatus","wish","sand","lettuce","sense","balls","baby","ghost","power","sofa","learning","bushes","church","smile","distribution","reason","whip","giants","beginner","crow","invention","letters","horses","game","scissors","bat","cover","journey","whistle","society","competition","flowers","sweater","shoe","punishment","creator","brain","ray","island","mailbox","pump","rub","hands","burn","spoon","beetle","step","plot","activity","airplane","sea","grip","blow","pump","jeans","slave","boys","appliance","ball","trees","cherries","ladybug","appliance","brick","doctor","branch","crib","elbow","root","sheep","toothpaste","behavior","sail","voice","hydrant","sky","hands","veil","crib","tray","wind","beggar","authority","wax","flesh","afterthought","existence","feet","creator","plough","hook","cub","bottle","sidewalk","weather","light","fight","wheel","fog","island","knife","pancake","bikes","farmer","experience","lizards","cracker","scale","rabbits","camera","coach","airplane","wrench","pencil","minute","paper","pancake","push","treatment","shop","lock","string","hand","dinner","goat","wine","expert","creator","woman","trick","pet","news","bells","wire","song","bushes","distribution","tank","pan","feast","quince","nerve","hair","wrench","cats","neck","work","sugar","tramp","ants","house","sidewalk","afterthought","orange","finger","earth","decision","edge","chin","shoe","balloon","desk","chicken","toad","building","yarn","seashore","star","snow","book","song","boys","rainstorm","spring","secretary","cork","coach","range","dinosaurs","produce","bean","downtown","sleet","egg","arm","home","angle","whip","crayon","iron","parcel","river","potato","shop","leaf","territory","ear","behavior","cat","monkey","hair","trains","horses","volcano","waste","dog","juice","peace","end","route","whip","blade","giraffe","grandfather","celery","grandmother","spoon","person","yam","screw","top","watch","steam","impulse","map","history","pot","frog","bells","quilt","argument","apparel","wind","cub","wish","sugar","servant","language","sun","cherries","need","order","flower","seat","wheel","army","screw","icicle","coal","hook","act","action","cause","pet","school","rest","cows","relation","road","talk","burn","brake","crook","sand","journey","crack","spade","song","clouds","quarter","spade","fifth","flower","structure","finger","pain","corn","cakes","jeans","wing","shame","field","comb","pump","box","stone","industry","swim","sticks","whip","burn","stove","trouble","scene","library","crown","fork","birth","cast","amusement","mice","cub","houses","loaf","card","rhythm","downtown","animal","chairs","respect","cactus","opinion","thread","aunt","treatment","shame","tank","spiders","marble","arm","cemetery","locket","fact","division","holiday","current","humor","thunder","crack","receipt","sense","moon","kittens","K","vegetable","smile","cushion","representative","toy","look","crowd","hands","idea","drug","lace","jeans","net","moon","scarecrow","learning","dog","debt","knife","hill","sail","pear","organization","meal","knee","disgust","pet","bag","road","garden","smash","money","wealth","crate","end","insect","muscle","exchange","town","stage","pump","size","cat","tray","fog","wall","stage","beetle","start","self","side","group","porter","theory","bait","afternoon","leg","wing","earth","breakfast","account","snails","back","dime","bee","cast","town","cent","chicken","stem","garden","slave","meeting","umbrella","argument","clouds","partner","ray","stranger","body","trouble","son","produce","scene","mouth","observation","monkey","friction","desk","hose","powder","pull","sisters","cobweb","smell","anger","haircut","wood","lace","garden","slip","liquid","boat","fly","roof","reason","drawer","tank","farmer","sink","loaf","nail","head","payment","friction","cause","point","shock","breakfast","spot","rain","aftermath","discovery","hen","boys","finger","baseball","body","airplane","wax","rain","hand","behavior","cannon","brick","guitar","store","trade","invention","bread","shame","guitar","wood","time","room","base","arithmetic","sand","design","rainstorm","railway","boot","coal","flesh","airport","string","wing","jail","brother","match","quarter","guide","knowledge","lead","love","popcorn","answer","amount","representative","list","smash","sun","weight","disease","gold","flag","porter","reading","way","stretch","lettuce","can","fifth","sweater","chair","face","pain","toothbrush","land","sort","beggar","morning","tramp","steel","sack","boot","wool","meeting","summer","skirt","attraction","chalk","polish","town","meeting","partner","man","cork","lead","girls","request","wind","cracker","poison","north","railway","honey","request","riddle","children","rice","limit","sugar","cover","government","car","cows","beast","ray","thing","note","writer","breakfast","songs","income","crowd","fork","scarf","apples","dinosaurs","wire","string","zinc","water","needle","number","behavior","friend","bear","umbrella","fold","wave","sofa","haircut","tank","window","tongue","apple","muscle","summer","cakes","trail","laugh","meal","fish","map","egg","watch","story","crayon","nest","dogs","spark","dog","team","rose","clam","beetle","skin","flame","design","voyage","oatmeal","lunchroom","school","engine","room","salt","decision","church","snakes","cable","queen","substance","comb","babies","lead","card","pleasure","creator","wrench","vessel","unit","cabbage","afternoon","linen","songs","ground","monkey","self","beef","crime","thumb","wilderness","bread","meeting","lake","faucet","coast","verse","shelf","cart","men","punishment","debt","arch","lead","cats","servant","burn","scarecrow","side","butter","comfort","rate","night","offer","fly","battle","wish","respect","trade","sticks","arithmetic","anger","relation","van","writer","leg","slip","house","appliance","ray","day","lawyer","camp","hat","station","airplane","color","argument","family","thunder","coast","fairies","street","verse","ants","jeans","jar","bead","development","pancake","clock","honey","hammer","snakes","run","title","sweater","snail","hose","throat","cushion","list","act","wine","pencil","size","wine","shoe","writing","trains","boot","reaction","father","time","office","skate","van","maid","bun","queen","distance","fire","pot","smell","interest","summer","morning","kiss","scarf","point","birthday","idea","babies","copy","blow","space","need","produce","pull","bit","control","spy","jewel","statement","horse","change","ice","rail","things","force","zinc","yard","title","cook","apparel","lock","representative","copper","stomach","woman","uncle","test","crowd","opinion","turn","maid","banana","action","beast","mouth","bucket","lizards","circle","ear","arithmetic","frog","foot","growth","legs","belief","mist","pollution","lock","earth","hair","fruit","rock","rule","quartz","country","lawyer","division","believe","queen","protest","smell","memory","girl","belief","finger","stranger","trucks","kick","goat","measure","coach","comb","smell","science","word","icicle","beetle","territory","need","nerve","brain","car","chalk","bike","territory","ink","flavor","sense","adjustment","number","brother","cloud","wave","class","drop","boys","zipper","whistle","sweater","hole","party","vest","parcel","punishment","thought","use","finger","cake","slope","ink","K","school","bears","trail","flower","bait","lead","girls","shake","sneeze","quartz","cream","iron","test","territory","substance","boundary","seashore","jail","run","way","engine","goat","company","wing","toothbrush","whip","cent","rod","lawyer","stomach","expert","waste","smoke","soup","shame","band","mailbox","touch","pollution","twig","blade","brass","governor","uncle","steam","art","sign","door","camp","foot","view","list","pan","territory","morning","love","wax","mother","cat","circle","chin","hour"];

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
    push(){
        for(let i of [...arguments].flat(Infinity - 1)){
            if(this.parse) super.push(this.parse(i));
            else super.push(i);
        }
    }
    /**
     * Gets or sets the name of this vector. If the argument 'value' is empty, it returns the name of this vector (if set before). Otherwise the name of the vector is set and the vector itself is returned.
     * @param {Vector | string} value Optional: name of the vector.
     * @returns Either name or the vector itself.
     */
    name(value){
        if(value) {
            setRegistryProperty(this, "name", value);
            return this;
        } else return registry.get(this).name
    }
    /**
     * 
     * @param  {...any} values An array or set of values delimited by comma.
     * @returns {self}
     */
    reload(...values) {
        return new this.constructor(...values).name(this.name());
    }
    /**
     * 
     * @returns {this} This vector filtered from the null values.
     */
    removeEmpty() {
        return new this.constructor(new Array(...this).filter(v => v !== null)).name(this.name());
    }
    parent(value){
        if(value) {
            setRegistryProperty(this, "parent", value)
            return this;
        } else return registry.get(this).parent
    }
    /* Returns an object with this vector's values and attributes. */
    serialize() {
        var obj = {
            values: this,
            name: this.name(),
            type: this.type()
        };
        return obj;
    }
    clone(flush = false) {
        var _ = (flush ? new this.constructor() : new this.constructor(...this).name(this.name()));
        _.name(this.name());
        return _;
    }
    /**
     * Removes the values from this vector.
     */
    flush() {
        while (this.length > 0) {
            this.pop();
        }
        return this;
    }
    /**
    * Instead of values, this method extracts indexes of values matching the filter (see @param) and return an array of indexes. 
    * @param {function} filter A function or a strong type filter type (string). Strong type filters: notempty, empty.
    * @return {Array<integer>} Returns an array of indexes of values matching the given filter.
    */
    ifilter(filter = () => true) {

        return new Array(...this).map(function(v, i){
            if(filter(v)) return i;
            else return -1;
        }).filter(x => x > -1 );
    }
    
    filterByIndex(...indexes) {
        return new this.constructor(...this).filter((e,i) => indexes.indexOf(i) > -1).name(this.name());
    }
    static deserialize(data) {
        if(typeof data != "object") {
            try {
                data = JSON.parse(data);
            } catch(e) {
                console.error("Failed to parse the vector data.")
                return null;
            }
        }
        if([1,2,3].indexOf(data.type) < 0) throw new Error("Unknown vector type: " + data.type);
        else {
            var vector = (data.type == 1 ? new NumericVector(...data.values) : data.type == 2 ? new StringVector(...data.values) : new BooleanVector(...data.values)).name(data.name);
        }
        return vector;
    }
    sample(size = 0) {
        var clone = this.clone(true);
        if(size <= 0) return clone;
        else if(size < 1) size = this.length * size;
        if(size > this.length) return clone;
        else {
            var indexes = Math.getRandomIndexes(this.length, size);
            clone.push(...this.filter((v,i) => indexes.indexOf(i) > - 1));
            return clone;
        }
    }
    /**
     * Returns a model of the specified method with this vector set as its parent.
     * @param {string} name Name of the vector method.
     * @returns {NumericVector | StringVector | BooleanVector}
     */
    model(name) {
        return new VectorMethod(VectorMethodsModels.find(m => m.name == name), this);
    }
    analyze(name) {
        return new VectorAnalysis(name, this);
    }
    /**
     * Converts the vector to a destinated type. Returns an error if failed. If type type arguments is equal to this vector's type value, returns itself.
     * @param {integer} type The target type this vector should be converted to.
     * @param {*} fn Optional: A function that converts the underlying data to the appropriate type.
     * @returns {NumericVector | StringVector | BooleanVector} New converted vector or itself.
     */
    convert(type, fn) {
        if(this.type() == type) return this;
        else if(type == 1) {
            if(!fn) fn = (v,i,a) => v;
            return new NumericVector(...this.map(fn)).name(this.name());
        }
        else if(type == 2) {
            if(!fn) fn = (v,i,a) => String(v);
            return new StringVector(...this.map(fn)).name(this.name());
        }
        else if(type == 3) {
            if(!fn) fn = (v,i,a) => v === null ? null : v ? true : false;
            return new BooleanVector(...this.map(fn)).name(this.name());
        } else throw new Error(`Unrecognized vector type: ${type}. Possible types: 1,2,3.`);
    
    }
}

/**
* Whenever you need to make sure an instance is a vector or any of its extended children, call this property.
*/
Vector.prototype.isVector = true;

const vectorParser = {
    numeric: function(value) {
        if(typeof value == "string") value = value.replace(/\,/g, ".").trim();
        if(value === 0 || value === "0" || value === false) return 0;
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
        else if(value === false || value === 0 || value === "0" || value === "false") return false;
        else return null;
    }
}

// #region VECTOR EXTENSIONS

class NumericVector extends Vector {
    constructor(){
        super(...arguments);
    }
    /**
     * Returns the type of this vector, either as an enumeration (integer) or as a class name.
     * @param {boolean} verbose If the argument is true, it returns the full class name of the vector (eg NominalVector). Otherwise, it returns an enumeration (eg 3).
     * @returns {number | string} Returns the type of this vector.
     */
    type(verbose) {
        if(verbose) return "NumericVector";
        else return 1;
    }
    /**
     * Generates a new numeric vector with 'total' randomly generated values ranging between 'min' and 'max' and with a 'nullprob' probability of null value occurrence.
     * @param {object} config Eg. {min: -50, max: 200, total: 1000, nullprob: 0.1}
     * @example var n = NumericVector.generate();
     * @example var n = NumericVector.generate({total: 1000});
     * @example var n = NumericVector.generate({total: 1000, min: 0});
     * @example var n = NumericVector.generate({total: 1000, min: 0, max: 200});
     * @example var n = NumericVector.generate({total: 100, min: 0, nullprob: 0.5});
     * Returns a new instance of the vector with random values.
     */
    static generate(config = {}) {
        config = validators.isObject.fn(config);
        var min = isNaN(config.min) ? - Number.MAX_SAFE_INTEGER : Number(config.min) < - Number.MAX_SAFE_INTEGER ? - Number.MAX_SAFE_INTEGER : Number(config.min);
        var max = isNaN(config.max) ? Number.MAX_SAFE_INTEGER : Number(config.max) > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : Number(config.max);
        var nullprob = Number(config.nullprob) > 0 ? Number(config.nullprob) > 1 ? 1 : Number(config.nullprob) : 0;
        if(max < min){
            var _min = config.min;
            var _max = config.max
            min = _max;
            max = _min
        };
        var decimal = Number(config.decimal) > 0 ? Math.floor(config.decimal) : 0;
        var total = Number(config.total) > 0 ? Number(config.total) : 100;
        var _new = new NumericVector();
        for(var i = 0; i < total; i++) {
            if(nullprob > 0) {
                if(Math.random() <= nullprob) {
                    _new.push(null);
                } else _new.push(Math.rndNumber(min,max,decimal));
            } else _new.push(Math.rndNumber(min,max,decimal));
        }
        return _new;
    };
}
NumericVector.prototype.parse = vectorParser.numeric;

class StringVector extends Vector {
    constructor(){
        super(...arguments);
    }
    /**
     * Returns the type of this vector, either as an enumeration (integer) or as a class name.
     * @param {boolean} verbose If the argument is true, it returns the full class name of the vector (eg NominalVector). Otherwise, it returns an enumeration (eg 3).
     * @returns {number | string} Returns the type of this vector.
     */
    type(verbose) {
        if(verbose) return "StringVector";
        else return 2;
    }
    /**
     * Generates a string vector with 'total' of random text values selected from the 'list' of values. The list argument can be either an array of values or an integer. If the latter is provided, N values are randomly selected from a built-in list of nouns (max 1000 otems).
     * @param {object} config Eg. {total: 500, list: ["A","B","C"]} or {total: 500, list: 5}
     * @example var strings = StringVector.generate({list: ["A","B", "C"], total: 100000, nullprob: 0.5})
     * @example var strings = StringVector.generate({list: 4, total: 100000, nullprob: 0.2})
     * @example var strings = StringVector.generate({list: 5, nullprob: 0.175})
     * @example var strings = StringVector.generate({list: 5})
     * Returns a new instance of the vector with random values.
     */
    static generate(config = {}) {
        let list;
        var total = Number(config.total) > 0 ? Number(config.total) : 100;
        var nullprob = Number(config.nullprob) > 0 ? Number(config.nullprob) > 1 ? 1 : Number(config.nullprob) : 0;
        if(!isNaN(config.list)) {
            list = Math.rndSelect(rndWordList, Number(config.list), false);
        } else list = config.list;
        var _new = new StringVector();
        for(var i = 0; i < total; i++) {
            if(nullprob > 0) {
                if(Math.random() <= nullprob) {
                    _new.push(null);
                } else _new.push(Math.rndSelectOne(list))
            } else _new.push(Math.rndSelectOne(list))
        }
        return _new;
    };
}
StringVector.prototype.parse = vectorParser.string;

class BooleanVector extends Vector {
    constructor(){
        super(...arguments);
    }
    /**
     * Returns the type of this vector, either as an enumeration (integer) or as a class name.
     * @param {boolean} verbose If the argument is true, it returns the full class name of the vector (eg NominalVector). Otherwise, it returns an enumeration (eg 3).
     * @returns {number | string} Returns the type of this vector.
     */
    type(verbose) {
        if(verbose) return "BooleanVector";
        else return 3;
    }
    /**
     * Generates a boolean vector with 'total' of random boolean (true/false) values.
     * @param {object} config Eg. {total: 500} or {total: 500, nullprob: 0.25}
     * @example var b = BooleanVector.generate({total: 10000, nullprob: 0.5});
     * @example var b = BooleanVector.generate({total: 10000});
     * @example var b = BooleanVector.generate({});
     * @example var b = BooleanVector.generate();
     * Returns a new instance of the vector with random values.
     */
    static generate(config = {}) {
        let list = [true, false];
        var total = Number(config.total) > 0 ? Number(config.total) : 100;
        var nullprob = Number(config.nullprob) > 0 ? Number(config.nullprob) > 1 ? 1 : Number(config.nullprob) : 0;
        var _new = new BooleanVector();
        for(var i = 0; i < total; i++) {
            if(nullprob > 0) {
                if(Math.random() <= nullprob) {
                    _new.push(null);
                } else _new.push(Math.rndSelectOne(list))
            } else _new.push(Math.rndSelectOne(list))
        }
        return _new;
    };
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

let VectorMethodsModels = [
    {   name: "sum",
        fn: Array.prototype.sum,
        filter: filters.number,
        wiki: {
            title: "gvdg",
            description: "iMbD"
        },
        type: [1],
        returns: "number",
        example: function(){
            var cashflow = new NumericVector(200,250,150,320,240,-250,10,-320).sum();  /* = 600 */
        },
        url: "https://en.wikipedia.org/wiki/Addition"
    },    
    {   name: "count",
        fn: Array.prototype.count,
        wiki: {
            title: "tdrm",
            description: "ULJX"
        },
        type: [1,2,3],
        returns: "uint",
        example: function(){
            var total_numeric = new NumericVector(200,250,null,150,320,240,-250,null,10,-320).count();  /* = 10 */
            var total_string = new StringVector("A","B","C","D").count();  /* = 4 */
            var total_boolean = new BooleanVector(true, true, false, null, false, true).count();  /* = 6 */
        }
    },
    {   name: "avg",
        fn: Array.prototype.avg,
        filter: filters.number,
        wiki: {
            title: "eFdj",
            description: "UYJN"
        },
        type: [1],
        returns: "number",
        example: function(){
            var avgCashFlow = new NumericVector(200,250,150,320,240,-250,10,-320).avg();  /* = 75 */
        },
        url: "https://en.wikipedia.org/wiki/Arithmetic_mean"
    },
    {   name: "stdev",
        fn: Array.prototype.stdev,
        filter: filters.number,
        wiki: {
            title: "oUcc",
            description: "ZgSc"
        },
        type: [1],
        returns: "number",
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
                schema: "boolean",
                default: false,
                type: "boolean",
                validator: validators.boolean
                }
            },
        url: "https://en.wikipedia.org/wiki/Standard_deviation"
    },
    {   name: "variance",
        fn: Array.prototype.variance,
        filter: filters.number,
        wiki: {
            title: "TvQv",
            description: "sfCh"
        },
        type: [1],
        returns: "number",
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
                schema: "boolean",
                type: "boolean",
                validator: validators.boolean
            }
        },
        url: "https://en.wikipedia.org/wiki/Variance"
    },
    {   name: "histogram",
        fn: Array.prototype.histogram,
        filter: filters.number,
        wiki: {
            title: "PAwR",
            description: "AISp"
        },
        type: [1],
        returns: "histogram",
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
                schema: "number",
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
                schema: "number",
                type: "number",
                validator: validators.positiveDecimal,
                }
        },
        url: "https://en.wikipedia.org/wiki/Histogram"
    },
    {   name: "min",
        fn: Array.prototype.min,
        filter: filters.notnull,
        wiki: {
            title: "FkaD",
            description: "yBlA"
        },
        type: [1,2,3],
        example: function(){
            var numeric_min = new NumericVector(4.5, 3.9, 5, 6, 7, 5.7, 9.1, 5.3, 7.2, 6.9, 6, 7.5, 5.3, 7.1, 8.2, 1).min(); /* = 1 */;
            var string_min = new StringVector("Norwood", "Pearson", "Fisher", "Nightingale", "Gauss", "Poisson").min(); /* = Fisher */
        },
        returns: "any",
    },
    {   name: "max",
        fn: Array.prototype.max,
        filter: filters.notnull,
        wiki: {
            title: "nKuF",
            description: "gkep"
        },
        type: [1,2,3],
        returns: "any",
        example: function(){
            var numeric_max = new NumericVector(4.5, 3.9, 5, 6, 7, 5.7, 9.1, 5.3, 7.2, 6.9, 6, 7.5, 5.3, 7.1, 8.2, 1).max(); /* = 9.1 */;
            var string_max = new StringVector("Norwood", "Pearson", "Fisher", "Nightingale", "Gauss", "Poisson").max(); /* = Poisson */
        }
    },
    {   name: "range",
        fn: Array.prototype.range,
        filter: filters.number,
        wiki: {
            title: "mXxJ",
            description: "dnzB"
        },
        type: [1],
        returns: "number",
        example: function(){
            var range = new NumericVector(5,2,-15,-16.3,12,null, null, 12,13,7).range(); /* = 22 */
        },
        url: "https://en.wikipedia.org/wiki/Range_(statistics)"
    },
    /* coefficient of variation */
    {   name: "varc",
        fn: Array.prototype.varc,
        filter: filters.number,
        wiki: {
            title: "uwpU",
            description: "fUpj"
        },
        type: [1],
        returns: "number",
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
                schema: "boolean",
                type: "boolean",
                validator: validators.boolean
            }
        },
        url: "https://en.wikipedia.org/wiki/Coefficient_of_variation"
    },
    {   name: "percentile",
        fn: Array.prototype.percentile,
        filter: filters.number,
        wiki: {
            title: "fPra",
            description: "yNbM"
        },
        type: [1],
        returns: "number",
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
                schema: "number",
                type: "decimal",
                validator: validators.zeroToOneInc
                }
        },
        url: "https://en.wikipedia.org/wiki/Percentile"

    },
    {   name: "frequency",
        fn: Array.prototype.frequency,
        filter: null,
        wiki: {
            title: "dYJK",
            description: "Tzyp"
        },
        type: [1,2,3],
        returns: "frequency",
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
                schema: "integer",
                default: 1,
                type: "enum",
                validator: validators.enumValidator(enumerators.frequencyOrder),
                enums: enumerators.frequencyOrder
            }
        },
        url: "https://en.wikipedia.org/wiki/Frequency_(statistics)"
    },
    {   name: "geomean",
        fn: Array.prototype.geomean,
        filter: filters.number,
        wiki: {
            title: "louK",
            description: "PDzr"
        },
        type: [1],
        returns: "number",
        example: function(){
            var x = new framework.NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).geomean(); /* = 21.24*/
        },
        url: "https://en.wikipedia.org/wiki/Geometric_mean"
    },
    {   name: "harmean",
        fn: Array.prototype.harmean,
        filter: filters.number,
        wiki: {
            title: "vpdN",
            description: "nhJv"
        },
        type: [1],
        returns: "number",
        example: function(){
            var x = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).harmean(); /* = 21.03*/
        },
        url: "https://en.wikipedia.org/wiki/Harmonic_mean"
    },
    {   name: "median",
        fn: Array.prototype.median,
        filter: filters.number,
        wiki: {
            title: "TzfX",
            description: "YIir"
        },
        type: [1],
        returns: "number",
        example: function(){
            var median = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).median(); /* = 21*/
        },
        url: "https://en.wikipedia.org/wiki/Median"
    },
    {   name: "mode",
        fn: Array.prototype.mode,
        wiki: {
            title: "StQx",
            description: "IBfx"
        },
        type: [1,2,3],
        returns: "any",
        example: function(){
            var x = new NumericVector(1,2,3,4,3,4,5,3).mode(); /* = 3 */
            var y = new StringVector("a",null,null,"b","c","d",null,"b").mode(); /* = null */
            var z = new BooleanVector(true, false, true).mode(); /* = true */
        },
        url: "https://en.wikipedia.org/wiki/Mode_(statistics)"

    },
    {   name: "sem",
        fn: Array.prototype.SEM,
        filter: filters.number,
        wiki: {
            title: "dLmV",
            description: "ZBnI"
        },
        type: [1],
        returns: "number",
        example: function(){
            var sem = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).SEM(); /* = 0.67*/
        },
        url: "https://en.wikipedia.org/wiki/Standard_error#Standard_error_of_the_sample_mean"
    },
    {   name: "skewness",
        fn: Array.prototype.skewness,
        filter: filters.number,
        wiki: {
            title: "KZgI",
            description: "nJbe",
        },
        type: [1],
        returns: "number",
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
                schema: "boolean",
                required: false,
                default: false,
                type: "boolean",
                validator: validators.boolean
                }
            },
            url: "https://en.wikipedia.org/wiki/Skewness"
    },
    {   name: "kurtosis",
        fn: Array.prototype.kurtosis,
        filter: filters.number,
        wiki: {
            title: "oPPx",
            description: "UOBG"
        },
        type: [1],
        returns: "number",
        example: function(){
            var kurtosis = new NumericVector(20,19,21,22,21,18,23,22,27,16,17,19,19,21,29,24,23,25,24,21,22,19).kurtosis(); /* = 0.425*/
        },
        url: "https://en.wikipedia.org/wiki/Kurtosis"
    },
    {   name: "ttest",
        fn: Array.prototype.ttest,
        filter: filters.number,
        wiki: {
            title: "VEAt",
            description: "rbjM"
        },
        type: [1],
        returns: "ttest",
        example: function(){
            var T = new NumericVector(4.5,3.9,5,6,7,5.7,9.1,5.3,7.2,6.9,6,7.5,5.3,7.1,8.2,1).ttest(10);
            /*
            {
                "t": 2.0519223838763545,
                "p": 0.05806,
                "n": 16
            }
            */
        },
        args: {
            populationMean: {
                wiki: {
                    title: "GRoZ",
                    description: "xtfz"
                },
                schema: "number",
                required: true,
                type: "number",
                validator: validators.isNumber
                }
            }
    },
    {   name: "mci",
        fn: Array.prototype.mci,
        filter: filters.number,
        wiki: {
            title: "yHjW",
            description: "DDpa"
        },
        type: [1],
        returns: "mci",
        example: function(){
            var v = new NumericVector([2,2,3,3,4,4,5,5,6,7,8,9,10,11,10,9,8,7,7,6,6,5,5]).mci(0.95);
            /*
            {
                "m": 6.173913043478261,
                "sig": 0.050000000000000044,
                "delta": 1.1189603407528825,
                "lb": 5.054952702725378,
                "ub": 7.292873384231143
            }
            */
        },
        args: {
            confidenceLevel: {
                wiki: {
                    title: "lFlm",
                    description: "SMbe"
                },
                schema: "number",
                required: false,
                default: 0.95,
                type: "number",
                validator: validators.zeroToOneInc
            }
        },
        url: "https://en.wikipedia.org/wiki/Confidence_interval"
    },
    {   name: "pci",
        fn: Array.prototype.pci,
        filter: filters.any,
        wiki: {
            title: "ZhjW",
            description: "KLpa"
        },
        type: [1,2,3],
        returns: "pci",
        example: function(){
            var v = new NumericVector([2,2,3,3,4,4,5,5,6,7,8,9,10,11,10,9,8,7,7,6,6,5,5]).pci(5, 0.95);
            /*
            {
                "p": 0.17391304347826086,
                "sig": 0.050000000000000044,
                "delta": 0.1549041787089759,
                "lb": 0.019008864769284955,
                "ub": 0.32881722218723675
            }
            */
        },
        args: {
            value: {
                wiki: {
                    title: "obxp",
                    description: "QOvf"
                },
                schema: "any",
                required: true,
                default: null,
                type: "any",
                validator: validators.any
            },
            confidenceLevel: {
                wiki: {
                    title: "lFlm",
                    description: "SMbe"
                },
                schema: "number",
                required: false,
                default: 0.95,
                type: "number",
                validator: validators.zeroToOneInc
            }
        },
        url: "https://en.wikipedia.org/wiki/Confidence_interval"
    },    
    {   name: "swtest",
        fn: Array.prototype.shapirowilk,
        filter: filters.number,
        wiki: {
            title: "byTa",
            description: "LHkd"
        },
        type: [1],
        returns: "shapirowilk",
        example: function(){
            var sw = new NumericVector(2,2,3,3,4,4,5,5,6,7,8,9,10,11,10,9,8,7,7,6,6,5,5).swtest(); 
            /* 
            {
                "W": 0.9664039647188553,
                "df": 23,
                "p": 0.6036566524076283
            }
            */
        },
        url: "https://en.wikipedia.org/wiki/Shapiro%E2%80%93Wilk_test"
    },
    {   name: "kstest",
        fn: Array.prototype.kolmogorovSmirnovTest,
        filter: filters.number,
        wiki: {
            title: "DLoe",
            description: "yQZd"
        },
        type: [1],
        returns: "kstest",
        example: function(){
            var sw = new NumericVector(2,2,3,3,4,4,5,5,6,7,8,9,10,11,10,9,8,7,7,6,6,5,5).kstest(); 
            /* 
            {
                "W": 0.9664039647188553,
                "df": 23,
                "p": 0.6036566524076283
            }
            */
        },
        url: "https://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Smirnov_test#One-sample_Kolmogorov%E2%80%93Smirnov_statistic"
    },  
].sort((a,b) => a.wiki?.title > b.wiki?.title ? 1 : -1)

class VectorAnalysis {
    constructor(model, parent) {
        if(parent) this.parent = parent?.isVector ? parent : null;
        if(typeof model == "string") {            
            if(!VectorMethodsModels.find(m => m.name == model)) throw new Error("Model not found: " + model);
            else this.model = VectorMethodsModels.find(m => m.name == model);
        } else if(typeof model == "object") this.model = model;
        else throw new Error("Unknown VectorMethod constructor parameter type.");
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
     * Applies the model filter to the parent and stores the sample data into the "filterLog" property object.
     * @param {object} config Not imployed yet.
     * @return {self}
     */
    get wiki() {
        if(this.model.wiki) {
            return {
                title: $(this.model.wiki.title),
                description: $(this.model.wiki.description),
                filter: this.model.filter ? $(this.model.filter.text) : null,
                url: this.model.url || null,
                applies: [
                    {type: 1, title: $("LOYN"), apply: this.model.type.indexOf(1) > -1},
                    {type: 2, title: $("zoiB"), apply: this.model.type.indexOf(2) > -1},
                    {type: 3, title: $("OkoC"), apply: this.model.type.indexOf(3) > -1}
                ],
                returns: vectorResultSchemas[this.model.returns],
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
                                schema: vectorResultSchemas[args[k].schema],
                                required: !!args[k]?.required,
                                default: args[k].default || null,
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
            output: new OutputSchema(vectorResultSchemas[this.model.returns]),
            form: new FormVectorSchema(this.model.args)
        }
    }
    /**
     * Applies the model filter to the parent, stores the result into the "vector" property and returns self. The Vector is the method ultimate input.
     * @param {*} config No imployed yet.
     * @returns {self}
     */
    prepare(config){
        if(!this.parent) throw new Error("The method cannot be called without a parent specified")
        this.vector = this.filter ? this.parent.filter(this.filter) : this.parent;
        return this;
    }
    /**
     * Validates method arguments and returns self.
     * @param {any} * The method arguments.
     * @returns {self}
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
        this.args = rebuilt;
        return this;
    }
    /**
     * Call the calculation function and returns either the VectorAnalysis instance with the result property storing the result or the result itself (see params). If either input preparation or validation has not been called before, it is automatically called.
     * @param {boolean} returnSelf If true, the VectorAnalysis is returned, with the result property storing the calculation result. Otherwise the result is returned. Default true.
     * @returns {self | any}
     */
    run() {
        if(!this.parent) return new Empty($("hKRq"));
        else if(this.model.type.indexOf(this.parent?.type()) === -1) return new Empty($("ibNu", {method: $(this.model.wiki.title), type: $(getVectorTypeLabelCode(this.parent))}));
        this.runStart = new Date();
        if(!this.input) this.prepare({});
        if([...arguments].length > 0) this.validate(...arguments);
        this.result = this.fn.call(this.vector, ...(this.args || []));
        this.runEnd = new Date();
        return this;
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
    * Returns duration of the "run" method (whatever it includes inside) in milliseconds.
     */
    duration() {
        if(this.runStart && this.runEnd) return this.runEnd.getTime() - this.runStart.getTime();
        else return null;
    }
}

class VectorMethod {
    constructor(model, parent) {
        if(parent) this.parent = parent;
        if(typeof model == "string") {            
            if(!VectorMethodsModels[model]) throw new Error("Model not found: " + model);
            else this.model = VectorMethodsModels[model];
        } else if(typeof model == "object") this.model = model;
        else throw new Error("Unknown VectorMethod constructor parameter type.");
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
                url: this.model.url || null,
                applies: [
                    {type: 1, title: $("LOYN"), apply: this.model.type.indexOf(1) > -1},
                    {type: 2, title: $("zoiB"), apply: this.model.type.indexOf(2) > -1},
                    {type: 3, title: $("OkoC"), apply: this.model.type.indexOf(3) > -1}
                ],
                returns: vectorResultSchemas[this.model.returns],
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
                                schema: vectorResultSchemas[args[k].schema],
                                required: !!args[k]?.required,
                                default: args[k].default || null,
                                
                            })
                        }
                    }
                    return _;
                })(this.model.args)
            }
        } else return {};
    }
    /**
     * Returns a router for input and output schema.
     */
    get schema() {
        return {
            input: null,
            output: new OutputSchema(vectorResultSchemas[this.model.returns]),
            form: new FormVectorSchema(this.model.args)
        }
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
function mapModels() {
    VectorMethodsModels.map(function(m){Models[m.name] = new VectorMethod(m)});
}
mapModels();


function register(model) {
    VectorMethodsModels.push(model);
    Vector.prototype[model.name] = function() {
        var M = new VectorMethod(model, this);
        return M.call(...arguments);
    };
    mapModels();
}

module.exports = {
    $: $,
    Vector: Vector,
    NumericVector: NumericVector,
    StringVector: StringVector,
    BooleanVector: BooleanVector,
    VectorMethod: VectorMethod,
    VectorAnalysis: VectorAnalysis,
    Models: Models,
    VectorOverview: function() {
        return VectorOverview(Models)},
    register: register
}