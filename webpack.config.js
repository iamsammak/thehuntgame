const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: "./frontend/thehunt.jsx",
  output: {
    path: path.resolve(__dirname),
    filename: "./frontend/bundle.js"
  },
  module: {
    // change from 'loaders' to 'rules'
    rules: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          // presets: ['es2015', 'react']
          presets: ['@babel/env', '@babel/react']
        }
      },
    //   {
    //     test: /\.scss$/,
    //     use: ExtractTextPlugin.extract({
    //       fallback: 'style-loader',
    //       //resolve-url-loader may be chained before sass-loader if necessary
    //       use: ['css-loader', 'sass-loader']
    //     })
    //   }
    ]
  },
  // plugins: [
  //   new ExtractTextPlugin({ filename: './css/style.css', allChunks: true })
  // ],
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};
