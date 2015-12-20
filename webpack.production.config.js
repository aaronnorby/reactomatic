var path = require('path');

module.exports = {
  entry: [
    './src/index.jsx'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    },
    {
      test: /\.scss$/,
      loader: 'style!css!sass'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname + 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
};
