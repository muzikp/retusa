const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'dist'),
    //library: 'retusa',
    libraryTarget: "umd" || 'commonjs',
    globalObject: "this"
  },
  mode: "development" || "production"
};
