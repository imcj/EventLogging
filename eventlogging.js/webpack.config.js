const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function DtsBundlePlugin(){}
DtsBundlePlugin.prototype.apply = function (compiler) {
  compiler.plugin('done', function(){
    var dts = require('dts-bundle');

    dts.bundle({
      name: libraryName,
      main: 'src/index.d.ts',
      out: '../index.d.ts',
      removeSource: true,
      outputAsModuleFolder: true // to use npm in-package typings
    });
  });
};

module.exports = {
  entry: {
    'eventlogging': './src/index.ts',
    'eventlogging.min': './src/index.ts'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'eventlogging.js',
    path: path.resolve(__dirname, 'dist'),
    // globalObject: 'this',
    libraryTarget: `umd`,
    library: "eventlogging",
    libraryExport: "default"
  },
  plugins: [
    // new CopyPlugin({
    //   patterns: [
    //     { from: "./sample/index.html", to: "./dist/index.html" }
    //   ],
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   minimize: true,
    //   sourceMap: true,
    //   include: /\.min\.js$/,
    // })
    // new DtsBundlePlugin(),
    new UglifyJsPlugin({ test: /\.js($|\?)/i, sourceMap: true })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    proxy: {
      '/api': {
        target: 'https://localhost:5001',
        secure: false,
        // pathRewrite: {'^/api' : ''}
      }
    }
  }
};
