const path = require('path')

module.exports = {
  // Source files
  src: path.resolve(__dirname, '../src'),

  // Production build files
  build: path.resolve(__dirname, '../dist/WEB_ROOT/admin/pei_reportcards_v2'),

  // Static files that get copied to build folder
  public: path.resolve(__dirname, '../public'),

  // Images that get copied to build folder
  images: path.resolve(__dirname, '../images'),

  // Preferences pages
  prefs: path.resolve(__dirname,  '../prefs')

}
