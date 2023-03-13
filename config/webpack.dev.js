const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { merge } = require('webpack-merge')

const common = require('./webpack.common')
const paths = require('./paths')

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',
  // Where webpack outputs the assets and bundles
  output: {
    path: paths.start,
    filename: '[name].bundle.js',
    publicPath: '/',
    hashFunction: "xxhash64"  
  },
  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  module: {
    rules: [
      // Styles: Inject CSS into the head with source maps
      {
        test: /\.css$/i, use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins:      // Removes/cleans build folders and unused assets when rebuilding
    [ new CleanWebpackPlugin(),// Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.json,
          to: 'json',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],

    }),],
})
