const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/index.ts',
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
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    // globalObject: 'this',
    libraryTarget: `umd`,
    library: "eventlogging",
    libraryExport: "default"
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./sample/index.html", to: "./dist/index.html" }
      ],
    }),
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
