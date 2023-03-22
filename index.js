var Vector = require("./libs/vector");
var Locale = require("./libs/locale");
var Matrix = require("./libs/matrix");
var dist = require("./libs/distribution");

module.exports = {
    Matrix: Matrix.Matrix,
    matrix: function(){
        return new Matrix.Matrix(...arguments);
    },
    vector: function(){
        return [...arguments].vectorify();
    },
    NumericVector: Vector.NumericVector,
    StringVector: Vector.StringVector,
    BooleanVector: Vector.BooleanVector,
    VectorAnalysis: Vector.VectorAnalysis,
    MatrixAnalysis: Matrix.MatrixAnalysis,
    Argument: require("./libs/argument").Argument,
    Output: require("./libs/output").Output,
    locale: Locale,
    utils: {
        distribution: dist
    }
}