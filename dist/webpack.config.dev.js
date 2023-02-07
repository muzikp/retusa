"use strict";

var path = require('path');

module.exports = {
  optimization: {
    minimize: false
  },
  entry: './index.js',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'dist'),
    //library: 'retusa',
    libraryTarget: "umd" || 'commonjs',
    globalObject: "this",
  },
  mode: "development" || "production" || "development"
};