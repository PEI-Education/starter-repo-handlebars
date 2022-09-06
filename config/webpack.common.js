const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = require('./paths')

const pages = ["psb_int3","psb_int4"];

module.exports = {
  // Where webpack looks to start building the bundle
  entry: pages.reduce((config, page) => {
    config[page] = `./src/${page}.js`;
    return config;
  }, {}),

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
    hashFunction: "xxhash64"  
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  // Customize the webpack build process
  plugins: [].concat(
    pages.map(
      (page) =>
        new HtmlWebpackPlguin({
          inject: true,
          template: `./${page}.html`,
          filename: `${page}.html`,
          chunks: [page]
        })
    ),
  
  [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],

    }),
  ],

  ),
  // Determine how modules within the project are treated'
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.js$/, use: ['babel-loader'] },

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },

      // Handle Handlebars
      {test: /\.hbs$/, use: [
        {
          loader: "handlebars-loader",
          options: {
            inlineRequire: "/assets/"
          }
        }
      ]}
    ],
  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
      assets: paths.public,
    },
  },
}
