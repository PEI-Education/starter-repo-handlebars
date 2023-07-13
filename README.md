# About this repository
## Background notes
Originally started with a modified version of [Tania Rascia](https://www.taniarascia.com)'s [webpack Boilerplate](https://github.com/taniarascia/webpack-boilerplate), because using Node allows us to precompile handlebars templates for faster rendering, and webpack let us bundle the necessary code without intererence from the built-in versions of the same packages in PowerSchool (specifically, Handlebars was giving problems.). 

To simplify, I updated Webpack config to support multiple entry points, so all report cards can live together easily, and removed Babel as a dependencies, since we have no need to transpile ES6. I also made a few changes to the production output to make it easier to debug, since we can't run a dev server like most projects, as this code only runs within the PowerSchool environment and debugging has to happen there.

## Installing thie repo
*Note: these are not the instructions for installing a plugin in PowerSchool. These are the instructions for installing the repo on your local machine for development purposes.

Clone this repo and npm install (note: unless you have admin rights, an EUS Technician from ITSS will have to install Node on your machine - get them to select the latest LTS version.)

```bash
npm i
```

## Usage

### Development server

```bash
npm start
```

You can view the development server at `localhost:8080`.

To view report cards in development, change the reference to your JSON file in 'index.js' to 'students_fake.json', and the same thing for 'courses.json'. This file contains fake data in the correct format, with no SQL queries or PSHTML tags that only work within PowerSchool. 

### Production build

```bash
npm run build
```

Reports must then be content of each project's 'dist' folder can be added to a named folder for that report card in the pei_reportcards plugin.

## Features

- [webpack](https://webpack.js.org/)

## Dependencies

### webpack
- [`webpack`](https://github.com/webpack/webpack) - Module and asset bundler.
- [`webpack-cli`](https://github.com/webpack/webpack-cli) - Command line interface for webpack
- [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) - Development server for webpack
- [`webpack-merge`](https://github.com/survivejs/webpack-merge) - Simplify development/production configuration
- [`cross-env`](https://github.com/kentcdodds/cross-env) - Cross platform configuration

### Handlebars.js
- [`handlebars`](https://www.npmjs.com/package/handlebars) - Templating language used in v2 of report cards

### Loaders
- [`css-loader`](https://webpack.js.org/loaders/css-loader/) - Resolve CSS imports
- [`style-loader`](https://webpack.js.org/loaders/style-loader/) - Inject CSS into the DOM
- [`handlebars-loader`](https://webpack.js.org/loaders/handlebars-loader) -

### Plugins
- [`clean-webpack-plugin`](https://github.com/johnagan/clean-webpack-plugin) - Remove/clean build folders
- [`copy-webpack-plugin`](https://github.com/webpack-contrib/copy-webpack-plugin) - Copy files to build directory
- [`html-webpack-plugin`](https://github.com/jantimon/html-webpack-plugin) - Generate HTML files from template
- [`mini-css-extract-plugin`](https://github.com/webpack-contrib/mini-css-extract-plugin) - Extract CSS into separate files
- [`css-minimizer-webpack-plugin`](https://webpack.js.org/plugins/css-minimizer-webpack-plugin/) - Optimize and minimize CSS assets

### Linters
- [`eslint`](https://github.com/eslint/eslint) - Enforce styleguide across application
- [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) - Implement prettier rules
  - - [`prettier`](https://github.com/prettier/prettier) - Dependency for `prettier-webpack-plugin` plugin
- [`eslint-import-resolver-webpack`](https://github.com/benmosher/eslint-plugin-import/tree/master/resolvers/webpack) - Throw exceptions for import/export in webpack

Notes on diffs from original config: 
- I adjusted the config files to handle multi-page projects instead of single pages. Each page (handlebars template) needs to be added to the *pages* array in webpack.common.js using the same name as the template file.
- I removed Sass and PostCSS because they were introducing vulnerabilities and neither was going to be in use. 
- I removed Babel because all users are on managed evergreen versions of Chrome or Edge and can interpret ES6 code without transpiling.
- The linters are having a hard time with both Handlebars templates (mixed context) and PowerSchool DATs (tlist_sql especially), but I haven't had a chance to really investigate how we could possibly solve that