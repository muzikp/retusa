var Vector = require("./libs/vector");
var Locale = require("./libs/locale");
var Matrix = require("./libs/matrix");

module.exports = {
    locale: function(locale) {
        Locale.config(locale);
    },
    Matrix: Matrix.Matrix,
    Match: Matrix.Match,
    NumericVector: Vector.NumericVector,
    StringVector: Vector.StringVector,
    BooleanVector: Vector.BooleanVector,
    vectorModels: Vector.Models,
    VectorOverview: Vector.VectorOverview
}