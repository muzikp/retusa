var $ = require('./locale').call;

var lib = {
    numericVector: {
        title: "",
        description: "",
        isVector: true,
        vectorTypes: [1],
        parsable: true,
        validator: function(){}
    }
}

module.exports = class MatrixArgument {
    constructor(name, parent) {
        var model = lib[name];
        this.title = {
            key: model.title,
            value: $(model.title)
        };
        this.description = {
            key: model.description,
            value: $(model.description)
        };
        this.isVector = model.isVector || false;
        this.validate = function(value) {
            var _v = value;
            if(parent && model.isVector) _v = parent.item(v);
            
        }
    }
}