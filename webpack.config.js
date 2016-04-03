
var webpack = require("webpack");

module.exports = {
   context: __dirname,
   entry: './src/index.js',
   devtool: 'source-map',
   output: {
      path: __dirname + '/dist',
      filename: 'redux-redaction.js'
   },
   module: {
      loaders: [
         {
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel',
         }
      ]
   },
   plugins: [
       new webpack.optimize.UglifyJsPlugin(),
       new webpack.optimize.OccurenceOrderPlugin()
   ]
}