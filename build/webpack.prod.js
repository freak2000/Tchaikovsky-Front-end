const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const commonWebpackConfig = require('./webpack.common')
const webpack = require('webpack')

module.exports = merge(commonWebpackConfig, {
  mode: 'production',
  devtool: false,
  plugins: [
    new OptimizeCssAssetsPlugin(),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
})