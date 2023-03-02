"use strict";

const __default = "cs-CZ";
var factory = {
    //"cs": require("../locales/cs"),
    "cs-CZ": require("../locales/cs-CZ"),
    "en-GB": require("../locales/en-GB")
};

var _default = Intl.DateTimeFormat().resolvedOptions().locale;
if(!factory[_default]) _default = __default;

module.exports = {
    /**
     * Sets the locale data for either existing or non existing locale set and returns the module.
     * @param {string} language Intl language code
     * @param {object} data JSON object with key (random code) an value (text) elements
     * @param {boolean} overwriteExisting If true, keys present in the existing set will be overwriten with new values. Default true.
     * 
     */
    setData: function(language, data, overwriteExisting=true) {
        if(typeof data != "object") throw new Error("Data argument must be an object");
        if(!factory[language]) factory[language] = {};
        Object.keys(data).forEach(function(key){
            if(!overwriteExisting && !factory[language][key]) factory[language][key] = data[key];
            else factory[language][key] = data[key];
        });
        return module.exports;
    },
    /**
     * Set the default language. If empty, the default value is reset to the local language default.
     * @param {string} value Language i18n or another code.
     * @returns {module.exports} Returns the module.
     */
    setDefault: function(value) {
        if(!value) _default = Intl.DateTimeFormat().resolvedOptions().locale;
        else if(!factory[value]) 
        {
            console.warn(`Language ${value} not registered, switching to default (${__default}).`);
            _default = __default;
        }
        else _default = value;
        return module.exports;
    },
    config: function (setup = "cs") {        
        if(typeof setup == "string") {
            _ = factory[setup];
            if(!_) throw new Error("Locale " + setup + " not found.");
            else _default = setup;
            
        } else if(typeof setup == "object") _ = setup;
        else throw new Error("Custom locale must be an object.")
        return module.exports;
    },
    call: function(code, data = {}) {
        let _ = factory[_default];
        if(!code) return "";
        else if(typeof code == "object") {
            var _text = _default ? code[_default] : Object.entries(code)[0][1];
            return _replace(_text, data)
        }
        var _text = _[code];        
        if(!_text) return _replace(code,{value: code});
        else {
            _text = _replace(_text, data)
            return _text;
        }
    },
    /**
     * 
     * @returns Returns a list of available languages, both built-in and custom.
     */
    listLanguages: function(){
        return Object.keys(factory);
    }
}

const _replace = function(text, data) {
    var keys = (text.match(/\$\{(.*?)\}/g) || []).map(i => i.match(/\$\{(.*)\}/)[1]);
    keys.forEach(function(k){
        text = text.replace("\$\{" + k + "\}", () => data[k])
    });
    return text;
}