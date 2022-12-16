var built_in_locales = {
    cs: require("../locales/cs")
}
let _ = built_in_locales.cs;

module.exports = {
    config: function (setup = "cs") {        
        debugger;
        if(typeof setup == "string") {
            _ = built_in_locales[setup];
            if(!_) throw new Error("Locale " + setup + " not found.")
            
        } else if(typeof setup == "object") _ = setup;
        else throw new Error("Custom locale must be an object.")
        return module.exports;
    },
    call: function(code, data = {}) {
        if(!code) return "";
        var _text = _[code];        
        if(!_text) return _replace(code,{value: code});
        else {
            _text = _replace(_text, data)
            return _text;
        }
    }
    
}

const _replace = function(text, data) {
    var keys = (text.match(/\$\{(.*?)\}/g) || []).map(i => i.match(/\$\{(.*)\}/)[1]);
    keys.forEach(function(k){
        text = text.replace("\$\{" + k + "\}", () => data[k])
    });
    return text;
}