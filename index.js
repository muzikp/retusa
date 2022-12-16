var Vector = require("./libs/vector");
var Locale = require("./libs/locale");

module.exports = {
    locale: function(locale) {
        Locale.config(locale);
    },
    ScaleVector: Vector.ScaleVector,
}