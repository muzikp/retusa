"use strict";
let $ = require("./locale").call;
const {Array, Math, String, Function} = require("./extensions");
const rndWordList= ["silver","twig","train","reading","clouds","bean","frogs","power","canvas","stop","van","drain","doctor","lamp","mind","existence","seat","sky","cloud","burn","crayon","brush","hat","snails","snail","move","seashore","honey","powder","cork","toothpaste","cub","kitty","skin","self","rice","chin","cushion","death","steel","toes","cabbage","stamp","bone","cemetery","appliance","fairies","unit","committee","fall","debt","cherry","baby","rings","legs","knee","bike","cook","carpenter","expansion","toothbrush","rain","fork","statement","house","things","cars","root","books","marble","swim","babies","jellyfish","question","trains","apparatus","wish","sand","lettuce","sense","balls","baby","ghost","power","sofa","learning","bushes","church","smile","distribution","reason","whip","giants","beginner","crow","invention","letters","horses","game","scissors","bat","cover","journey","whistle","society","competition","flowers","sweater","shoe","punishment","creator","brain","ray","island","mailbox","pump","rub","hands","burn","spoon","beetle","step","plot","activity","airplane","sea","grip","blow","pump","jeans","slave","boys","appliance","ball","trees","cherries","ladybug","appliance","brick","doctor","branch","crib","elbow","root","sheep","toothpaste","behavior","sail","voice","hydrant","sky","hands","veil","crib","tray","wind","beggar","authority","wax","flesh","afterthought","existence","feet","creator","plough","hook","cub","bottle","sidewalk","weather","light","fight","wheel","fog","island","knife","pancake","bikes","farmer","experience","lizards","cracker","scale","rabbits","camera","coach","airplane","wrench","pencil","minute","paper","pancake","push","treatment","shop","lock","string","hand","dinner","goat","wine","expert","creator","woman","trick","pet","news","bells","wire","song","bushes","distribution","tank","pan","feast","quince","nerve","hair","wrench","cats","neck","work","sugar","tramp","ants","house","sidewalk","afterthought","orange","finger","earth","decision","edge","chin","shoe","balloon","desk","chicken","toad","building","yarn","seashore","star","snow","book","song","boys","rainstorm","spring","secretary","cork","coach","range","dinosaurs","produce","bean","downtown","sleet","egg","arm","home","angle","whip","crayon","iron","parcel","river","potato","shop","leaf","territory","ear","behavior","cat","monkey","hair","trains","horses","volcano","waste","dog","juice","peace","end","route","whip","blade","giraffe","grandfather","celery","grandmother","spoon","person","yam","screw","top","watch","steam","impulse","map","history","pot","frog","bells","quilt","argument","apparel","wind","cub","wish","sugar","servant","language","sun","cherries","need","order","flower","seat","wheel","army","screw","icicle","coal","hook","act","action","cause","pet","school","rest","cows","relation","road","talk","burn","brake","crook","sand","journey","crack","spade","song","clouds","quarter","spade","fifth","flower","structure","finger","pain","corn","cakes","jeans","wing","shame","field","comb","pump","box","stone","industry","swim","sticks","whip","burn","stove","trouble","scene","library","crown","fork","birth","cast","amusement","mice","cub","houses","loaf","card","rhythm","downtown","animal","chairs","respect","cactus","opinion","thread","aunt","treatment","shame","tank","spiders","marble","arm","cemetery","locket","fact","division","holiday","current","humor","thunder","crack","receipt","sense","moon","kittens","K","vegetable","smile","cushion","representative","toy","look","crowd","hands","idea","drug","lace","jeans","net","moon","scarecrow","learning","dog","debt","knife","hill","sail","pear","organization","meal","knee","disgust","pet","bag","road","garden","smash","money","wealth","crate","end","insect","muscle","exchange","town","stage","pump","size","cat","tray","fog","wall","stage","beetle","start","self","side","group","porter","theory","bait","afternoon","leg","wing","earth","breakfast","account","snails","back","dime","bee","cast","town","cent","chicken","stem","garden","slave","meeting","umbrella","argument","clouds","partner","ray","stranger","body","trouble","son","produce","scene","mouth","observation","monkey","friction","desk","hose","powder","pull","sisters","cobweb","smell","anger","haircut","wood","lace","garden","slip","liquid","boat","fly","roof","reason","drawer","tank","farmer","sink","loaf","nail","head","payment","friction","cause","point","shock","breakfast","spot","rain","aftermath","discovery","hen","boys","finger","baseball","body","airplane","wax","rain","hand","behavior","cannon","brick","guitar","store","trade","invention","bread","shame","guitar","wood","time","room","base","arithmetic","sand","design","rainstorm","railway","boot","coal","flesh","airport","string","wing","jail","brother","match","quarter","guide","knowledge","lead","love","popcorn","answer","amount","representative","list","smash","sun","weight","disease","gold","flag","porter","reading","way","stretch","lettuce","can","fifth","sweater","chair","face","pain","toothbrush","land","sort","beggar","morning","tramp","steel","sack","boot","wool","meeting","summer","skirt","attraction","chalk","polish","town","meeting","partner","man","cork","lead","girls","request","wind","cracker","poison","north","railway","honey","request","riddle","children","rice","limit","sugar","cover","government","car","cows","beast","ray","thing","note","writer","breakfast","songs","income","crowd","fork","scarf","apples","dinosaurs","wire","string","zinc","water","needle","number","behavior","friend","bear","umbrella","fold","wave","sofa","haircut","tank","window","tongue","apple","muscle","summer","cakes","trail","laugh","meal","fish","map","egg","watch","story","crayon","nest","dogs","spark","dog","team","rose","clam","beetle","skin","flame","design","voyage","oatmeal","lunchroom","school","engine","room","salt","decision","church","snakes","cable","queen","substance","comb","babies","lead","card","pleasure","creator","wrench","vessel","unit","cabbage","afternoon","linen","songs","ground","monkey","self","beef","crime","thumb","wilderness","bread","meeting","lake","faucet","coast","verse","shelf","cart","men","punishment","debt","arch","lead","cats","servant","burn","scarecrow","side","butter","comfort","rate","night","offer","fly","battle","wish","respect","trade","sticks","arithmetic","anger","relation","van","writer","leg","slip","house","appliance","ray","day","lawyer","camp","hat","station","airplane","color","argument","family","thunder","coast","fairies","street","verse","ants","jeans","jar","bead","development","pancake","clock","honey","hammer","snakes","run","title","sweater","snail","hose","throat","cushion","list","act","wine","pencil","size","wine","shoe","writing","trains","boot","reaction","father","time","office","skate","van","maid","bun","queen","distance","fire","pot","smell","interest","summer","morning","kiss","scarf","point","birthday","idea","babies","copy","blow","space","need","produce","pull","bit","control","spy","jewel","statement","horse","change","ice","rail","things","force","zinc","yard","title","cook","apparel","lock","representative","copper","stomach","woman","uncle","test","crowd","opinion","turn","maid","banana","action","beast","mouth","bucket","lizards","circle","ear","arithmetic","frog","foot","growth","legs","belief","mist","pollution","lock","earth","hair","fruit","rock","rule","quartz","country","lawyer","division","believe","queen","protest","smell","memory","girl","belief","finger","stranger","trucks","kick","goat","measure","coach","comb","smell","science","word","icicle","beetle","territory","need","nerve","brain","car","chalk","bike","territory","ink","flavor","sense","adjustment","number","brother","cloud","wave","class","drop","boys","zipper","whistle","sweater","hole","party","vest","parcel","punishment","thought","use","finger","cake","slope","ink","K","school","bears","trail","flower","bait","lead","girls","shake","sneeze","quartz","cream","iron","test","territory","substance","boundary","seashore","jail","run","way","engine","goat","company","wing","toothbrush","whip","cent","rod","lawyer","stomach","expert","waste","smoke","soup","shame","band","mailbox","touch","pollution","twig","blade","brass","governor","uncle","steam","art","sign","door","camp","foot","view","list","pan","territory","morning","love","wax","mother","cat","circle","chin","hour"];
const meta = ["name","label","formatter"];
const registry = new WeakMap();

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
        registry.set(this, {
            id: String.fillRnd(16),
            name: ""
        });
        if([...arguments].length > 0) 
        {
            if(typeof arguments[0] == "function") return this.function(arguments[0]);
            else this.push(...arguments);
        }        
        
    }
    push(){
        for(let i of [...arguments].flat(Infinity - 1)){
            if(this.parse) super.push(this.parse(i));
            else super.push(i);
        }
    }
    /**
     * Gets an unique ID of this vector, generated while initializing. The value cannot be modified.
     * @returns {String} An ID of this vector.
     */
    id() {
        return getRegistryProperty(this, "id");
    }
    /**
     * Gets or sets the name of this vector. If the argument 'value' is empty, it returns the name of this vector (if set before). Otherwise the name of the vector is set and the vector itself is returned.
     * @param {string} value Optional: name of the vector.
     * @param {boolean} alwaysRetunSelf Default false. If set to true, will return the vector itself even if the name is blank/empty.
     * @returns {Vector | String} Either the name or the vector itself.
     */
    name(value, alwaysRetunSelf){
        if(value) {
            setRegistryProperty(this, "name", value);
            return this;
        } else {
            if(alwaysRetunSelf) return this;
            else return registry.get(this).name;
        }
    }
    /**
     * Gets or sets the label for this vector. If the argument 'value' is empty, it returns the label of this vector (if set before). Otherwise the name of the vector is set and the vector itself is returned.
     * @param {string} value Optional: name of the vector.
     * @param {boolean} alwaysRetunSelf Default false. If set to true, will return the vector itself even if the label is blank/empty.
     * @returns {Vector | String} Either the label or the vector itself.
     */
    label(value, alwaysRetunSelf){
        if(value) {
            setRegistryProperty(this, "label", value);
            return this;
        } else {
            if(alwaysRetunSelf) return this;
            else return registry.get(this).label || registry.get(this).name;
        }
    }
    formatter(value, alwaysRetunSelf) {
        if(value) {
            setRegistryProperty(this, "formatter", value);
            return this;
        } else {
            if(alwaysRetunSelf) return this;
            else return registry.get(this).formatter;
        }
    }
    matrix(value, alwaysRetunSelf) {
        if(value) {
            setRegistryProperty(this, "matrix", value);
            return this;
        } else {
            if(alwaysRetunSelf) return this;
            else return registry.get(this).matrix;
        }
    }
    /**
     * @experimental This feature is not stable and not truly supported so far.
     * @param {function} value 
     * @param {boolean} alwaysRetunSelf 
     * @returns Returns either the function or the vector itself.
     */
    function(value, alwaysRetunSelf) {
        if(value) {
            setRegistryProperty(this, "function", value);
            return this;
        } else {
            if(alwaysRetunSelf) return this;
            else return registry.get(this).function;
        }
    }
    /**
     * Returns the underlying values of this vector as a plain array of primitive values.
     */
    raw() {
        return [...this];
    }
    /**
     * 
     * @param  {...any} values An array or set of values delimited by comma.
     * @returns {self}
     */
    reload(...values) {
        return new this.constructor(...values).getMeta(this);
    }
    /**
     * 
     * @returns {this} This vector filtered from the null values.
     */
    removeEmpty() {
        return new this.constructor([...this].filter(v => v !== null)).getMeta(this);
    }
    /**
     * Copies the vector metadata (name, label etc.) from a source vector to this vector.
     * @param {Vector} source The vector from which to copy the vector metadata.
     * @returns Returns the vector itself.
     */
    getMeta(source) {
        if(!registry.get(source)) registry.set(source, {});
        if(!registry.get(this)) registry.set(this, {});
        for(let m of meta) {
            setRegistryProperty(this, m, registry.get(source)[m]);
        }
        return this;
    }
    /**
     * 
     * @returns Returns an array of the underlying values modified by the formatter meta property (if defined), otherwise returns the values as they are stored in the vector.
     */
    values() {
        var data = [];
        if(this.function()) {
            if(this.matrix()) {
                for(var i = 0; i < this.matrix().maxRows(); i++) {
                    data.push(this.parse(this.function()(this.matrix(),i)));
                }
            } else data = [];
        } else data = this;
        
        if(this.formatter()) {
            if(typeof this.formatter() == "object") 
            {
                return data.map(e => e === null ? null : this.formatter()[e] || e);
            }
            else if(typeof this.formatter() == "function") {
                const f = this.formatter();
                return data.map(e => f(e));
            }
            else {
                const f = eval(`[${this.formatter()}][0]`);
                return data.map(e => f(e));
            }
        }
        else return data;
    }
    parent(value){
        if(value) {
            setRegistryProperty(this, "parent", value)
            return this;
        } else return registry.get(this).parent
    }
    /**
     * Returns a formatted value (if formatted property is defined). If the formatter is an object and the value is not found in its keys (e.g. the object key!s value s undefined), returns the original value.
     * @param {any} value Any value to be formatted.
     */
    format(value, index, parent) {
        const f = getRegistryProperty(this, "formatter");
        if(f)
        {
            if(typeof f == "object") return f[value] !== undefined ? f[value] : value;
            else if(typeof f == "function") return f(value, index, parent || this);
            else if(typeof f == "string") {
                return eval(`[${f}][0]`)(value, index, parent || this);
            }
        }
        else return value;
    }
    /**
     * Returns an object or a stringified object with this vector's values and attributes.
     * @param {boolean} stringify If set to true, returns a string instead of an object. Default false.
     * @param {object} config Specifies the output format (e.g. {beautify: true})
     * @returns {Object | string}
     */
    serialize(stringify = false, config = {beautify: false}) {
        var obj = {
            id: this.id(),
            values: this.raw(),
            name: this.name(),
            label: this.label(),
            type: this.type(),
            formatter: this.formatter() ? typeof this.formatter() == "function" ? this.formatter().toString() : this.formatter() : null,
            function: this.function() ? this.formatter().toString() : null
        };
        return stringify ? JSON.stringify(obj, null, config?.beautify ? "\t" : "") : obj;
    }
    clone(flush = false) {
        var _ = (flush ? new this.constructor() : new this.constructor(...this).getMeta(this));
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
        return new this.constructor(...this).filter((e,i) => [...indexes].indexOf(i) > -1).getMeta(this);
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
            return new NumericVector(...this.map(fn)).getMeta(this);
        }
        else if(type == 2) {
            if(!fn) fn = (v,i,a) => String(v);
            return new StringVector(...this.map(fn)).getMeta(this);
        }
        else if(type == 3) {
            if(!fn) fn = (v,i,a) => v === null ? null : v ? true : false;
            return new BooleanVector(...this.map(fn)).getMeta(this);
        } 
        else if(type == 4) {
            if(!fn) fn = (v,i,a) => v === null ? null : v;
            return new TimeVector(...this.map(fn)).getMeta(this);
        }
        else throw new Error(`Unrecognized vector type: ${type}. Possible types: 1,2,3,4.`);
    }
    fill(what, count, append) {
        var e = this.parse(what);
        if(append) super.push(...Array(count).fill(e));
        else this.reload(...Array(count).fill(e));
        return this;
    }
    append(what, count = 1)
    {
        var e = this.parse(what);
        super.push(...Array(count).fill(e));
        return this;
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
        if([1,2,3,4].indexOf(data.type) < 0) throw new Error("Unknown vector type: " + data.type);
        else {
            let vector = (data.type == 1 ? new NumericVector(...data.values) : data.type == 2 ? new StringVector(...data.values) : data.type == 3 ? new BooleanVector(...data.values) : data.type == 4 ? new TimeVector(...data.values) : new Error());
            if(data.id) setRegistryProperty(vector, "id", data.id);
            vector = vector.name(data.name).label(data.label);
            if(data.formatter) {
                try {
                    vector = vector.formatter(JSON.parse())
                } catch (e) {
                    try {   
                        vector = vector.formatter(data.formatter);
                    } catch(e) {
                        console.error("Failed to deserialize the formatter", e);
                    }
                }
            }
            if(data.function) {

            }
            return vector;            
        }
        
    }
    static listMethods() {
        return models.map(m => m.name);
    }
    static register(model) {
        models.push(model);
        Vector.prototype[model.name] = function() {
            var M = new VectorAnalysis(models[model.name], this);
            return M.with(...arguments).run().result;
        }
        return this
    }    
    static ofType(type) {     
        return function() {
            if(type == 1) return new NumericVector(...arguments);
            else if(type == 2) return new StringVector(...arguments);
            if(type == 3) return new BooleanVector(...arguments);
            if(type == 4) return new TimeVector(...arguments);
            else throw new Error("Unknown vector type: " + type);
        }
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
        else throw new Error($("UyOj", {value:value}));
    },
    string: function(value) {
        if(value || value === false || value === 0) return String(value);
        else return null;
    },
    boolean: function(value) {
        if(value) return 1;
        else if(value === false || value === 0 || value === "0" || value === "false") return 0;
        else return null;
    },
    time: function(value) {
        if(value === false || value === null || value === undefined) return null;
        else if(Date.isDate(value)) return value;
        else if(Array.isArray(value)) {
            var _ = new Date(...value);
        }
        if(isNaN(new Date(value).getTime()))
        {
            throw new Error($("eZw1", {value: value}));
        }
        else return new Date(value);
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
            } else _new.push(Math.rndSelectOne(list));
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
        let list = [1,0];
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
    format(value, index, parent) {
        if(this.formatter()) return this.format(value, index, parent);
        else return value === 1 ? true : value === 0 ? false : null;
    }
}
BooleanVector.prototype.parse = vectorParser.boolean;

class TimeVector extends Vector {
    constructor(){
        super();        
        if([...arguments].length > 0) this.push(...arguments);        
    }
    push(){
        for(let i of [...arguments]){
            if(this.parse) super.push(this.parse(i));
            else super.push(i);
        }
    }
    /**
     * 
     * @returns Returns values of this vector converted to integers.
     */
    raw() {
        return [...this].map(function(e){
            if(e !== null) return e.getTime();
            else return null;
        })
    }
    /**
     * Returns the type of this vector, either as an enumeration (integer) or as a class name.
     * @param {boolean} verbose If the argument is true, it returns the full class name of the vector (eg NominalVector). Otherwise, it returns an enumeration (eg 3).
     * @returns {number | string} Returns the type of this vector.
     */
    type(verbose) {
        if(verbose) return "TimeVector";
        else return 4;
    }
    /**
     * Generates a new time vector with 'total' randomly generated values ranging between 'min' and 'max' and with a 'nullprob' probability of null value occurrence.
     * @param {object} config Eg. {min: -50, max: 200, total: 1000, nullprob: 0.1}
     * @example var n = NumericVector.generate();
     * @example var n = NumericVector.generate({total: 1000});
     * @example var n = NumericVector.generate({total: 1000, min: 0});
     * @example var n = NumericVector.generate({total: 1000, min: 0, max: 200});
     * @example var n = NumericVector.generate({total: 100, min: 0, nullprob: 0.5});
     * Returns a new instance of the vector with random values.
     */
    static generate(config = {}) {
        var min = isNaN(new Date(config.min).getTime()) ? new Date("1000-01-01").getTime() : new Date(config.min).getTime();
        var max = isNaN(new Date(config.max).getTime()) ? new Date("2999-12-31").getTime() : new Date(config.max).getTime();
        var nullprob = Number(config.nullprob) > 0 ? Number(config.nullprob) > 1 ? 1 : Number(config.nullprob) : 0;
        if(max < min){
            var _min = config.min;
            var _max = config.max
            min = _max;
            max = _min
        };
        var total = Number(config.total) > 0 ? Number(config.total) : 100;
        var _new = new TimeVector();
        for(var i = 0; i < total; i++) {
            if(nullprob > 0) {
                if(Math.random() <= nullprob) {
                    _new.push(null);
                } else _new.push(Math.rndNumber(min,max,0));
            } else _new.push(Math.rndNumber(min,max,0));
        }
        return _new;
    };
    explode() {
        return [
            this.map(e => e !== null ? e.getFullYear() : null).numerify().name($("Mydr")),
            this.map(e => e !== null ? e.getMonth() + 1 : null).numerify().name($("v6qI")), 
            this.map(e => e !== null ? e.getDate() : null).numerify().name($("o3Mh")),
            this.map(e => e !== null ? e.getHours() : null).numerify().name($("FKmI")),
            this.map(e => e !== null ? e.getMinutes() : null).numerify().name($("Jk73")),
            this.map(e => e !== null ? e.getSeconds() : null).numerify().name($("46Ew")),
            this.map(e => e !== null ? e.getMilliseconds() : null).numerify().name($("2hXX"))
        ]
    }
}
TimeVector.prototype.parse = vectorParser.time;

/**
 * @obsolete
 * @returns 
 */
Array.prototype.numerify = function(){
    return new NumericVector(...this);
}

Array.prototype.stringify = function(){
    return new StringVector(...this);
}

Array.prototype.boolify = function(){
    return new BooleanVector(...this);
}

Array.prototype.timefy = function(){
    return new TimeVector(...this);
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

const preprocessors = {
    removeEmpty: {
        title: "8nQf",
        fn: function(_){
            _.sample.raw = _.parent.length;
            _.parent = _.parent.removeEmpty();
            _.sample.net = _.parent.length;
        }
    },
    inspectVector: {
        title: "8nQf",
        fn: function(_){
            _.sample.raw = _.parent.length;
            _.parent = _.parent.removeEmpty();
            _.sample.net = _.parent.length;
            _.args.type = _.parent.type()
        }
    }
}

const postprocessors = {
    numberToDate: function(a) {
        if(a.parent.type() == 4) a.result = new Date(a.result)
    },
    histogramDates: function(a) {
        if(a.parent.type() == 4) {
            for(let e of a.result) {
                e.from = new Date(e.from);
                e.to = new Date(e.to)
            }
        }        
    }
}

const models = [
    {   name: "sum",
        fn: Array.prototype.sum,
        wiki: {
            title: "gvdg",
            description: "iMbD",
            preprocessor: preprocessors.removeEmpty.title,
            url: "https://en.wikipedia.org/wiki/Addition"
        },
        prepare: preprocessors.removeEmpty.fn,
        type: [1],
        output: "number"
    },    
    {   name: "count",
        fn: Array.prototype.count,
        wiki: {
            title: "tdrm",
            description: "ULJX"
        },
        type: [1,2,3,4],
        output: "uint",
    },
    {   name: "avg",
        fn: Array.prototype.avg,
        wiki: {
            title: "rR94",
            description: "UYJN",
            preprocessor: preprocessors.removeEmpty.title,
            url: "https://en.wikipedia.org/wiki/Arithmetic_mean"
        },
        prepare: preprocessors.removeEmpty.fn,
        type: [1,4],
        post: [postprocessors.numberToDate],
        output: "number",
    },
    {   name: "stdev",
        fn: Array.prototype.stdev,
        wiki: {
            title: "oUcc",
            description: "ZgSc",
            preprocessor: preprocessors.removeEmpty.title,
            url: "https://en.wikipedia.org/wiki/Standard_deviation"
        },
        prepare: preprocessors.removeEmpty.fn,
        type: [1],
        output: "number",
        args: {
            isSample: {
                model: "boolean",
                config: {
                    name: "isSample",
                    title: "eJTq",
                    description: "FfpU",
                    required: false,
                    default: false
                }
            }
        },
    },
    {   name: "variance",
        fn: Array.prototype.variance,
        wiki: {
            title: "TvQv",
            description: "sfCh",
            preprocessor: preprocessors.removeEmpty.title,
            url: "https://en.wikipedia.org/wiki/Variance"
        },
        prepare: preprocessors.removeEmpty.fn,
        type: [1],
        output: "number",
        args: {
            isSample: {
                model: "boolean",
                config: {
                    name: "isSample",
                    title: "eJTq",
                    description: "FfpU",
                    required: false,
                    default: false
                }
            }
        }
    },
    {   name: "histogram",
        fn: Array.prototype.histogram,
        wiki: {
            title: "PAwR",
            description: "AISp",
            preprocessor: preprocessors.removeEmpty.title,
            url: "https://en.wikipedia.org/wiki/Histogram"
        },
        prepare: preprocessors.removeEmpty.fn,
        post: [postprocessors.histogramDates],
        type: [1,4],
        output: "histogram",
        args: {
            max: {
                model: "positiveInteger",
                config: {
                    name: "max",
                    title: "WnZK",
                    description: "mcOp",
                    required: false,
                    default: undefined
                }
            },
            fix: {
                model: "positiveDecimal",
                config: {
                    name: "fix",
                    title: "Mnfn",
                    description: "yOuB",
                    required: false,
                    default: undefined
                }
            }
        }
    },
    {   name: "min",
        fn: Array.prototype.min,
        wiki: {
            title: "FkaD",
            description: "yBlA",
            preprocessor: preprocessors.removeEmpty.title
        },
        output: "any",
        type: [1,2,3,4],
        post: postprocessors.numberToDate,
        prepare: preprocessors.removeEmpty.fn
    },
    {   name: "max",
        fn: Array.prototype.max,
        wiki: {
            title: "nKuF",
            description: "gkep",
            preprocessor: preprocessors.removeEmpty.title
        },
        prepare: preprocessors.removeEmpty.fn,
        post: postprocessors.numberToDate,
        type: [1,2,3,4],
        output: "any",
    },
    {   name: "range",
        fn: Array.prototype.range,
        wiki: {
            title: "mXxJ",
            description: "dnzB",
            preprocessor: preprocessors.removeEmpty.title,
            url: "https://en.wikipedia.org/wiki/Range_(statistics)"
        },
        prepare: preprocessors.removeEmpty.fn,
        type: [1],
        output: "number"        
    },
    {   name: "varc",
        fn: Array.prototype.varc,
        wiki: {
            title: "uwpU",
            description: "fUpj",
            prepare: preprocessors.removeEmpty.fn,
            url: "https://en.wikipedia.org/wiki/Coefficient_of_variation"
        },
        type: [1],
        output: "percent",
        prepare: preprocessors.removeEmpty.fn,
        args: {
            isSample: {
                model: "boolean",
                config: {
                    name: "isSample",
                    title: "eJTq",
                    description: "FfpU",
                    required: false,
                    default: false
                }
            }
        }
    },
    {   name: "quantile",
        fn: Array.prototype.quantile,
        wiki: {
            title: "fPra",
            description: "yNbM",
            preprocessor: preprocessors.removeEmpty.title,
            url: "https://en.wikipedia.org/wiki/Percentile"
        },
        prepare: preprocessors.removeEmpty.fn,
        post: postprocessors.numberToDate,
        type: [4],
        output: "number",
        args: {
            k: {
                model: "zeroToOneInc",
                config: {
                    name: "k",
                    title: "dBDt",
                    description: "GQpQ",
                    required: true
                }
            }
        },
    },
    {   name: "frequency",
        fn: Array.prototype.frequency,
        wiki: {
            title: "dYJK",
            description: "Tzyp"
        },
        type: [1,2,3,4],
        output: "frequency",
        args: {
            order: {
                model: "frequencyOrder",
                config: {
                    name: "order",
                    title: "gZCx",
                    description: "MgID",
                    required: false,
                    default: 1
                }
            }
        },
        url: "https://en.wikipedia.org/wiki/Frequency_(statistics)"
    },
    {   name: "geomean",
        fn: Array.prototype.geomean,
        wiki: {
            title: "eFdj",
            description: "PDzr",
            preprocessor: preprocessors.removeEmpty.title,
            url: "https://en.wikipedia.org/wiki/Geometric_mean"
        },
        prepare: preprocessors.removeEmpty.fn,
        post: postprocessors.numberToDate,
        type: [1,4],
        output: "number",
    },
    {   name: "harmean",
        fn: Array.prototype.harmean,
        wiki: {
            title: "iuTi",
            description: "nhJv",
            preprocessor: preprocessors.removeEmpty.title,
            url: "https://en.wikipedia.org/wiki/Harmonic_mean"
        },
        prepare: preprocessors.removeEmpty.fn,
        post: postprocessors.numberToDate,
        type: [1,4],
        output: "number",
        
    },
    {   name: "median",
        fn: Array.prototype.median,
        wiki: {
            title: "Qyba",
            description: "YIir",
            preprocessor: preprocessors.removeEmpty.title,
            url: "https://en.wikipedia.org/wiki/Median"
        },
        prepare: preprocessors.removeEmpty.fn,
        post: postprocessors.numberToDate,
        type: [1,4],
        output: "number",
    },
    {   name: "mode",
        fn: Array.prototype.mode,
        wiki: {
            title: "StQx",
            description: "IBfx",
            url: "https://en.wikipedia.org/wiki/Mode_(statistics)"
        },
        post: postprocessors.numberToDate,
        type: [1,2,3,4],
        output: "any"
    },
    {   name: "sem",
        fn: Array.prototype.SEM,
        wiki: {
            title: "dLmV",
            description: "ZBnI",
            preprocessor: preprocessors.removeEmpty.title,
            url: "https://en.wikipedia.org/wiki/Standard_error#Standard_error_of_the_sample_mean"
        },
        prepare: preprocessors.removeEmpty.fn,
        type: [1],
        output: "number",
    },
    {   name: "skewness",
        fn: Array.prototype.skewness,
        wiki: {
            title: "KZgI",
            description: "nJbe",
            preprocessor: preprocessors.removeEmpty.title,
            url: "https://en.wikipedia.org/wiki/Skewness"
        },
        prepare: preprocessors.removeEmpty.fn,
        type: [1],
        output: "number",
        args: {
            isSample: {
                model: "boolean",
                config: {
                    name: "isSample",
                    title: "eJTq",
                    description: "FfpU",
                    required: false,
                    default: false
                }
            }
        }
    },
    {   name: "kurtosis",
        fn: Array.prototype.kurtosis,
        wiki: {
            title: "oPPx",
            description: "UOBG",
            preprocessor: preprocessors.removeEmpty.title,
            url: "https://en.wikipedia.org/wiki/Kurtosis"
        },
        prepare: preprocessors.removeEmpty.fn,
        type: [1],
        output: "number",
    },
    {   name: "ttest",
        fn: Array.prototype.ttest,
        wiki: {
            title: "VEAt",
            description: "rbjM",
            preprocessor: preprocessors.removeEmpty.title,
        },
        prepare: preprocessors.removeEmpty.fn,
        type: [1],
        output: "ttest",
        args: {
            populationMean: {
                model: "number",
                config: {
                    name: "populationMean",
                    title: "GRoZ",
                    description: "xtfz",
                    required: true
                }
            }
        }
    },
    {   name: "mci",
        fn: Array.prototype.mci,
        wiki: {
            title: "yHjW",
            description: "DDpa",
            preprocessor: preprocessors.removeEmpty.title,
            url: "https://en.wikipedia.org/wiki/Confidence_interval"
        },
        prepare: preprocessors.removeEmpty.fn,
        type: [1],
        output: "mci",
        args: {
            alpha: {
                model: "zeroToOneInc",
                config: {
                    name: "alpha",
                    title: "lFlm",
                    description: "SMbe",
                    required: false,
                    default: 0.95
                }
            }
        },
    },
    {   name: "pci",
        fn: Array.prototype.pci,
        wiki: {
            title: "ZhjW",
            description: "KLpa",
            preprocessor: preprocessors.removeEmpty.title,
            url: "https://en.wikipedia.org/wiki/Confidence_interval"
        },
        type: [1,2,3],
        output: "pci",
        args: {
            value: {
                model: "any",
                config: {
                    name: "value",
                    title: "obxp",
                    description: "QOvf",
                    required: true
                }
            },
            alpha: {
                model: "zeroToOneInc",
                config: {
                    name: "alpha",
                    title: "lFlm",
                    description: "SMbe",
                    required: false,
                    default: 0.95
                }
            }
        },
    },    
    {   name: "swtest",
        fn: Array.prototype.shapirowilk,
        wiki: {
            title: "byTa",
            description: "LHkd",
            preprocessor: preprocessors.removeEmpty.title,
            url: "https://en.wikipedia.org/wiki/Shapiro%E2%80%93Wilk_test"
        },
        prepare: preprocessors.removeEmpty.fn,
        unstable: true,
        type: [1],
        output: "shapirowilk",
    },
    {   name: "kstest",
        fn: Array.prototype.kolmogorovSmirnovTest,
        wiki: {
            title: "DLoe",
            description: "yQZd",
            preprocessor: preprocessors.removeEmpty.title,
            url: "https://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Smirnov_test#One-sample_Kolmogorov%E2%80%93Smirnov_statistic"
        },
        prepare: preprocessors.removeEmpty.fn,
        type: [1],
        output: "kstest",
        unstable: true   
    },
    {   name: "chigoftest",
        fn: Array.prototype.chigoftest,
        wiki: {
            title: "QIVA",
            description: "Crhj",
            preprocessor: preprocessors.removeEmpty.title,
            url: "https://www.jmp.com/en_sg/statistics-knowledge-portal/chi-square-test/chi-square-goodness-of-fit-test.html"
        },
        prepare: preprocessors.removeEmpty.fn,
        type: [1,2,3,4],
        output: "chigoftest"  
    },
    {   name: "inspect",
        fn: function() {
            var type = arguments[1], sample = arguments[0];
            var r = {};
            r.count = this.length;
            if(type == 1)
            {                
                r.sum = this.sum();
                r.avg = this.avg();
                r.median = this.median();
                r.min = this.min();
                r.max = this.max();
                r.range = this.range();
                r.q05 = this.quantile(0.05);
                r.q25 = this.quantile(0.25);
                r.q75 = this.quantile(0.75);
                r.q95 = this.quantile(0.95);
                r.stdev = this.stdev(sample);
                r.varc = this.varc();
                r.harmean = this.harmean();
                r.geomean = this.geomean();
                r.skewness = this.skewness(sample);
                r.kurtosis = this.kurtosis(sample);
                r.kstest = this.kolmogorovSmirnovTest();
                r.swtest = this.shapirowilk();
            } else
            {
                r.mode = this.mode();
                r.chigoftest = this.chigoftest();
            }
            return r;
        },
        wiki: {
            title: "boBv",
            description: "stFi",
            preprocessor: preprocessors.inspectVector.title
        },
        prepare: preprocessors.inspectVector.fn,
        type: [1,2,3,4],
        output: "inspectVector",
        args: {
            isSample: {
                model: "boolean",
                config: {
                    name: "isSample",
                    title: "eJTq",
                    description: "FfpU",
                    required: false,
                    default: false
                }
            }
        }
    },
    {   name: "qqplot",
        fn: Array.prototype.qqplot,
        wiki: {
            title: "Z5OQ",
            description: "92wX",
            preprocessor: preprocessors.removeEmpty.title
        },
        prepare: preprocessors.removeEmpty.fn,
        type: [1],
        output: "qqplot"
    },
    {   name: "ppplot",
        fn: Array.prototype.ppplot,
        wiki: {
            title: "3PCw",
            description: "WB2m",
            preprocessor: preprocessors.removeEmpty.title
        },
        prepare: preprocessors.removeEmpty.fn,
        type: [1],
        output: "ppplot"
    }
]

let {Argument} = (require("./argument"));
let {Output} = require("./output");

class VectorAnalysis {
    constructor(model, parent = null) {
        if(parent) this.parent = parent?.isVector ? parent : null;
        if(typeof model == "string") {            
            if(!models.find(m => model == m.name)) throw new Error($("j0tB", {name: model}));
            else model = models.find(m => model == m.name);
        } 
        else if(typeof model == "object") model = model;
        else throw new Error("Unknown VectorAnalysis model parameter type.");
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
        if(!Argument) Argument = require("./argument").Argument;
        if(this.model.args ? Object.keys(this.model.args).length == 0: true) {
            return this;
        }
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
                this.args[Object.keys(this.model.args)[ai]] = arg.validate([...arguments][ai]);
            }
            return this;
        }        
    }
    /**
     * Runs the preprocessor(s) for the given method.
     * @returns {self}
     */
    prepare(){
        if(!this.parent) throw new Error($("PtZB"));
        if(this.model.prepare) 
        {
            for(let p of Array.isArray(this.model.prepare) ? this.model.prepare : [this.model.prepare])
            {
                this.model.prepare(this);
            }
        }
        return this;
    }
    /**
     * Call the calculation function and returns either the VectorAnalysis instance with the result property storing the result or the result itself (see params). If either input preparation or validation has not been called before, it is automatically called.
     * @param {boolean} returnSelf If true, the VectorAnalysis is returned, with the result property storing the calculation result. Otherwise the result is returned. Default true.
     * @returns {self | any}
     */
    run() {
        this.time.from = new Date();
        if(!this.parent) throw new Error($("PtZB"));
        if([...arguments].length > 0) this.with(...arguments);
        this.prepare();        
        var args = Object.entries(this.args).map(e => e[1]);
        this.result = this.model.fn.call(this.parent.raw(), ...args);
        if(this.model.post) {
            for(let p of Array.isArray(this.model.post) ? this.model.post : [this.model.post])
            {
                p(this)
            }
        }
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

models.forEach(function(m) {
    Vector.prototype[m.name] = function() {
        var M = new VectorAnalysis(m, this);
        return M.with(...arguments).run().result;
    };
});

module.exports = {
    Vector: Vector,
    NumericVector: NumericVector,
    StringVector: StringVector,
    BooleanVector: BooleanVector,
    TimeVector: TimeVector,
    VectorAnalysis: VectorAnalysis    
}