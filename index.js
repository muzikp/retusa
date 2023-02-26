var Vector = require("./libs/vector");
var Locale = require("./libs/locale");
var Matrix = require("./libs/matrix");
var parsers = require("./libs/parsers");
var dist = require("./libs/distribution");
var Schema = require("./libs/schemas");

module.exports = {
    Matrix: Matrix.Matrix,
    NumericVector: Vector.NumericVector,
    StringVector: Vector.StringVector,
    BooleanVector: Vector.BooleanVector,
    VectorAnalysis: Vector.VectorAnalysis,
    MatrixAnalysis: Matrix.MatrixAnalysis,
    vectorModels: Vector.Models,
    matrixModels: Matrix.Models,
    matrixMethods: Matrix.methods,
    locale: Locale,
    Schema: {
        Vector: {
            result: Schema.vectorResultSchemas
        }
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
            Locale.setDefault("en-GB");
            fs.writeFileSync("./docs/en/vector.md", Vector.VectorOverview());
            fs.writeFileSync("./docs/en/matrix.md", Matrix.MatrixOverview());
            Locale.setDefault("cs-CZ");
            fs.writeFileSync("./docs/cs/vector.md", Vector.VectorOverview());
            fs.writeFileSync("./docs/cs/matrix.md", Matrix.MatrixOverview());
        }
    }
}