# PEI Report Cards v2

Rebuilt PEI Report Cards using Handlebars.js for templating. Significant performance improvement on first one done (PSB Intermediate) - loads all of SIS's R3 report cards in under 30 seconds, with no reloading or errors.

This plugin will eventually contain new versions of all report cards. Structure will have to be different from v1.

## Current Report Cards (Branches)

- PSB Intermediate Report Card, 3-term version (currently on pei-test1)
- PSB Intermediate Report Card, 4-term version (ready to deploy to pei-test1)
- CSLF Intermediate Report Card (ready to deploy to test)
## To start new report card project

Originally started with a modified version of [Tania Rascia](https://www.taniarascia.com)'s [webpack Boilerplate](https://github.com/taniarascia/webpack-boilerplate), which got us around an blocking error around require.js and a conflict with something already running on PowerSchool. 

Note: Updated Webpack config to support multiple entry points, so all report cards can live together easily.

Code for the PS plugin will be maintained in the [Report Card Plugin repo](https://github.com/ubershibs/pei_report_card_plugin).

## Installation

Clone this repo and npm install.

```bash
npm i
```

## Usage

### Development server

```bash
npm start
```

You can view the development server at `localhost:8080`.

To view report cards in development, change the reference to 'students.json' in 'index.js' to 'students_fake.json', and the same thing for 'courses.json'. This file contains fake data in the correct format, with no SQL queries or PSHTML tags that only work within PowerSchool. 

### Production build

```bash
npm run build
```

Reports must then be content of each project's 'dist' folder can be added to a named folder for that report card in the pei_reportcards plugin.

## Features

- [webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)

## Dependencies

### webpack

- [`webpack`](https://github.com/webpack/webpack) - Module and asset bundler.
- [`webpack-cli`](https://github.com/webpack/webpack-cli) - Command line interface for webpack
- [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) - Development server for webpack
- [`webpack-merge`](https://github.com/survivejs/webpack-merge) - Simplify development/production configuration
- [`cross-env`](https://github.com/kentcdodds/cross-env) - Cross platform configuration

### Babel

- [`@babel/core`](https://www.npmjs.com/package/@babel/core) - Transpile ES6+ to backwards compatible JavaScript
- [`@babel/plugin-proposal-class-properties`](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties) - Use properties directly on a class (an example Babel config)
- [`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env) - Smart defaults for Babel

### Handlebars.js
- [`handlebars`](https://www.npmjs.com/package/handlebars) - Templating language used in v2 of report cards

### Loaders

- [`babel-loader`](https://webpack.js.org/loaders/babel-loader/) - Transpile files with Babel and webpack
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

Notes: I removed Sass and PostCSS because they were introducing vulnerabilities and neither was going to be in use. 
