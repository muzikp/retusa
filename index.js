var Vector = require("./libs/vector");
var Locale = require("./libs/locale");
var Matrix = require("./libs/matrix");
var parsers = require("./libs/parsers");
var dist = require("./libs/distribution");
var Schema = require("./libs/schemas");
const { VectorOverview } = require("./libs/markdown");

module.exports = {
    Matrix: Matrix.Matrix,
    NumericVector: Vector.NumericVector,
    StringVector: Vector.StringVector,
    BooleanVector: Vector.BooleanVector,
    vectorModels: Vector.Models,
    locale: function(locale) {
        Locale.config(locale);
        return module.exports;
    },
    register: {
        vectorMethod: function(model) {
            Vector.register(model);
            return module.exports
        },
        schema: function(schema) {
            Schema.register(schema);
            return module.exports;
        }
        
    },
    utils: {
        validators: parsers.validators,
        filters: parsers.filters,
        distribution: dist
    },
    docs: {
        /**
         * 
         * @param {module} fs FileStream module is required.
         */
        publish: function(fs){
            //fs.writeFileSync("./docs/cs/vector.md", Vector.VectorOverview());
            fs.writeFileSync("./docs/cs/matrix.md", Matrix.MatrixOverview());
        }
    }
}