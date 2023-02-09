"use strict";

var Vector = require("./libs/vector");

var Locale = require("./libs/locale");

var Matrix = require("./libs/matrix");

var parsers = require("./libs/parsers");

var dist = require("./libs/distribution");

var Schema = require("./libs/schemas");

var _require = require("./libs/markdown"),
    VectorOverview = _require.VectorOverview;

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
  locale: function locale(_locale) {
    Locale.config(_locale);
    return module.exports;
  },
  Schema: {
    Vector: {
      result: Schema.vectorResultSchemas
    }
  },
  register: {
    vectorMethod: function vectorMethod(model) {
      Vector.register(model);
      return module.exports;
    },
    schema: function schema(_schema) {
      Schema.register(_schema);
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
    publish: function publish(fs) {
      fs.writeFileSync("./docs/cs/vector.md", Vector.VectorOverview());
      fs.writeFileSync("./docs/cs/matrix.md", Matrix.MatrixOverview());
    }
  }
};