
var path = require('path');
var webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');

var nodeModulesPath = path.join(__dirname, 'node_modules');
var isProduction = process.env.NODE_ENV == 'production';
var isDevServer = process.env.WEBPACK_ENV == 'devserver';

var config = {
  devtool: isProduction ? false : 'sourcemap',
  context: path.join(__dirname, 'src', 'ts'),
  entry: {
    app: [
      "webpack/hot/only-dev-server",
      path.join(__dirname, 'src', 'ts', 'index.ts')
    ]
  },

  devServer: {
    host: "0.0.0.0",
    port: 3000
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  output: {
      path: path.join(__dirname, 'build'),
      filename: '[name].js',
  },

  plugins: [
    new copyWebpackPlugin([
        { from: '../../src/html' },
        { from: '../../src/js', to: 'js' },
        { from: '../../src/css', to: 'css' }
    ]),
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  optimization: {
    splitChunks: {
        cacheGroups: {
            commons: { test: /[\\/]node_modules[\\/]/, name: "vendors", chunks: "all" }
        }
    }
  } 
};
if (isProduction) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
     compress: {
        warnings: false
    }
  }));
}
module.exports = config;
