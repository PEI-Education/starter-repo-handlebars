const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = require('./paths')

const pages = ["psb_k","psb_elem","psb_int","psb_int4","psb_hs","cslf_m","cslf_elem","cslf_int","cslf_hs","summerschool"];

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
        // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },

      // Handle Handlebars
      {test: /\.hbs$/, use: [
        {
          loader: "handlebars-loader",
          options: {
            inlineRequire: "/json/",
            helperDirs: paths.helpers
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
      json: paths.json,
    },
  },
}
