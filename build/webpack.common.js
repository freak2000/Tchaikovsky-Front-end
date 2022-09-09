const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development'
const projectName = process.env.PROJECT_NAME;
const NODE_ENV = process.env.NODE_ENV;
const path = require('path')
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  entry: path.resolve(__dirname, '../src/main.js'),
  output: {
    path: path.resolve(__dirname, '../dist/' + projectName +'/'+NODE_ENV),
    filename: 'js/[name].[hash:6].js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          priority: 1, //设置优先级，首先抽离第三方模块
          name: 'vendor',
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0,
          minChunks: 1 //最少引入了1次
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  resolve: {
    extensions: ['.js', '.vue', 'json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: ['babel-loader'],
        exclude: /node_modules/ //排除 node_modules 目录
      },
      {
        test: /\.(sa|c|sc)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
              publicPath: '/',
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
        exclude: [/(node_modules)(?![/|\\](swiper|video|vant))/],
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, //10K
              esModule: false,
              name: isDev ? '[name].[ext]' : '[name]_[hash:6].[ext]',
              outputPath: 'assets'
            }
          }
        ],
        exclude: [/(node_modules)(?![/|\\](video))/],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      filename: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true
      },
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? 'css/[name].css' : 'css/[name].[hash:6].css'
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        PROJECT_NAME: JSON.stringify(process.env.PROJECT_NAME)
      }
    }),
    new webpack.NormalModuleReplacementPlugin(/.*APP_TARGET\./,
      function (resource) {
        let str = projectName.replace("\"","").replace("\"","");
        resource.request = resource.request.replace(/APP_TARGET/, `${str}`);
    }),
  ]
}
