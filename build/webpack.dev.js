const merge = require('webpack-merge')
const commonWebpackConfig = require('./webpack.common')

module.exports = merge(commonWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  // devtool: 'source-map',
  devServer: {
    stats: "errors-only",
    inline: true,
    compress: true,
    historyApiFallback: true,
    // host: '10.10.101.80',
    host: '127.0.0.1',
    proxy: {
      '/api': {
        target: 'http://localhost:8852/', // 本地后端地址
        // target: 'http://106.15.179.105:3000/', // 线上后端地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
});
