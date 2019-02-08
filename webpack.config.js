const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const root = path.join(__dirname);
  const envPath = root + '/.env' + '.' + (argv.mode || 'development');
  const parsedEnv = dotenv.config({ path: envPath }).parsed;

  return {
    context: __dirname,
    entry: {
      hunt: "./frontend/thehunt.jsx",
      admin: "./frontend/huntadmin.jsx"
    },
    output: {
      path: path.resolve(__dirname),
      filename: "./frontend/[name]-bundle.js"
    },
    module: {
      rules: [
        {
          test: [/\.jsx?$/, /\.js?$/],
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env', '@babel/react']
          }
        },
      ]
    },
    plugins: [
      new webpack.DefinePlugin({ 'SOCKET_URL': JSON.stringify(parsedEnv['SOCKET_URL']) })
    ],
    devtool: 'source-map',
    resolve: {
      extensions: [".js", ".jsx", "*"]
    }
  };
}
