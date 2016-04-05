
var webpack = require('webpack');
var path = require('path')
module.exports = {
   context: __dirname,
   entry: './src/index.js',
   devtool: 'source-map',
   output: {
      path: path.join(__dirname, '/lib'),
      filename: 'index.js',
      library: 'redux-redaction',
      libraryTarget: 'umd'
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
       /*
       new webpack.optimize.UglifyJsPlugin(),
       new webpack.optimize.OccurenceOrderPlugin()
       */
   ]
}
