const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = require('./paths')

const pages = ["psb_elem","psb_int","psb_int4","psb_hs","cslf_int"];

module.exports = {
  // Where webpack looks to start building the bundle
  entry: pages.reduce((config, page) => {
    config[page] = `./src/${page}.js`;
    return config;
  }, {}),

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  // Customize the webpack build process

  plugins: 
  [].concat(
    pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: true,
          template: `./src/${page}.html`,
          filename: `${page}.html`,
          chunks: [page]
        })
    ),

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
