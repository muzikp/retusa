var Vector = require("./libs/vector");
var Locale = require("./libs/locale");

module.exports = {
    locale: function(locale) {
        Locale.config(locale);
    },
    NumericVector: Vector.NumericVector,
    StringVector: Vector.StringVector,
    BooleanVector: Vector.BooleanVector,
    vectorModels: Vector.Models,
    VectorOverview: Vector.VectorOverview
}