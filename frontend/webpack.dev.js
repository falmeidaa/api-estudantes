const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.(sa|sc|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
      ]
    }, {
      test: /\.css$/i,
      use: [
        'style-loader',
        'css-loader'
      ]
    }]
  },
  devServer: {
    contentBase: './dist',
    writeToDisk: true,
    historyApiFallback: true,
    port: 8080
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      publicPath: '/',
      template: './public/template.html'

    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css'

    })
  ]
})
