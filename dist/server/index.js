/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var packageJSON = __webpack_require__(11);

var DEV_MODE = !process.env.NODE_ENV && (process.env.NODE_ENV !== 'production' || process.env.NODE_ENV !== 'staging');
var SERVER_PORT = process.env.SERVER_PORT || 4040;
var BUILD_VERSION = process.env.BUILD_VERSION || 'local';

var DATA_DIR = !DEV_MODE ? __dirname + '/dist/client/data' : __dirname + '/src/ui/data';

var settings = {
  DEV_MODE: DEV_MODE,
  SERVER_PORT: SERVER_PORT,
  APP_NAME: packageJSON.name,
  APP_VERSION: BUILD_VERSION,
  APP_DESCRIPTION: packageJSON.description,
  APP_AUTHOR: packageJSON.author,
  CLIENTJS: packageJSON.name + '-' + BUILD_VERSION,
  DATA_DIR: DATA_DIR,
  MORGAN_FORMAT: ':date[iso] :status :method :url {Authorization: :auth...} - :response-time ms'
};

module.exports = settings;
/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _server = __webpack_require__(3);

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/* eslint-disable */
if (!global._babelPolyfill) {
  __webpack_require__(12);
}

/* eslint-enable */

(0, _server2.default)();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _express = __webpack_require__(4);

var _express2 = _interopRequireDefault(_express);

var _morgan = __webpack_require__(5);

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = __webpack_require__(6);

var _cors2 = _interopRequireDefault(_cors);

var _webpack = __webpack_require__(0);

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = __webpack_require__(7);

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _ejs = __webpack_require__(8);

var _ejs2 = _interopRequireDefault(_ejs);

var _webpack3 = __webpack_require__(9);

var _webpack4 = _interopRequireDefault(_webpack3);

var _settings = __webpack_require__(1);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// eslint-disable-line import/no-extraneous-dependencies
var VIEW_DIR = __dirname + '/../ui/'; // eslint-disable-line import/no-extraneous-dependencies

var compiler = (0, _webpack2.default)(_webpack4.default);

module.exports = function () {
  var server = (0, _express2.default)();

  _morgan2.default.token('auth', function (req) {
    return (req.headers.authorization || '').substr(0, 10);
  });
  server.use((0, _cors2.default)({
    origin: '*'
  }));
  server.use((0, _morgan2.default)(_settings.MORGAN_FORMAT));

  server.use((0, _webpackDevMiddleware2.default)(compiler, {
    publicPath: _webpack4.default.output.publicPath
  }));
  server.engine("html", _ejs2.default.renderFile);
  server.set("view engine", "html");
  server.set("views", VIEW_DIR);

  server.get('/health', function (req, res) {
    return res.sendStatus(200);
  });

  server.get("*", function (req, res) {
    res.render("index", { CLIENTJS: _settings.CLIENTJS, APP_NAME: _settings.APP_NAME });
  });

  server.listen(_settings.SERVER_PORT, function () {
    return console.log(_settings.APP_NAME + ' running on port ' + _settings.SERVER_PORT);
  } // eslint-disable-line no-console
  );
};
/* WEBPACK VAR INJECTION */}.call(exports, "src/server"))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("ejs");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var webpack = __webpack_require__(0);
var path = __webpack_require__(10);

var _require = __webpack_require__(1),
    CLIENTJS = _require.CLIENTJS;

var wbConfig = {
  entry: ['./src/ui/index.jsx'],
  output: {
    path: __dirname + '/dist/client',
    publicPath: '/assets',
    filename: CLIENTJS + '.js'
  },

  plugins: [new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      SERVER_PORT: JSON.stringify(process.env.SERVER_PORT),
      BUILD_VERSION: JSON.stringify(process.env.BUILD_VERSION),
      CLUSTER_MANAGER_API: JSON.stringify(process.env.CLUSTER_MANAGER_API)
    }
  })],

  target: 'web',

  resolve: {
    modules: ['node_modules', 'src/ui/**/*', './'],
    extensions: ['.js', '.jsx', '.json']
  },

  module: {
    loaders: [{ test: /\.(js?|jsx?)$/, exclude: /node_modules/, loaders: ['babel-loader'] }],
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }]
  }
};

module.exports = wbConfig;
/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {"private":true,"name":"zourney","version":"0.1.0","description":"zourney","main":"dist/server/index.js","scripts":{"start-server":"node ./dist/server/index.js","dev":"gulp run","build":"gulp build","lint":"eslint . --ext .js --ext .jsx","unit-test":"mocha --compilers js:babel-register --require ./test/helpers.js --require ./test/dom.js --recursive 'src/**/*.spec.js?(x)'","integration-test":"mocha --compilers js:babel-register --require ./test/helpers.js --require ./test/dom.js --recursive 'test/**/*.spec.js?(x)'","test":"npm run unit-test && npm run integration-test"},"author":"","babel":{"presets":["es2015","react"]},"dependencies":{"compression":"1.7.1","cors":"2.8.4","ejs":"2.5.7","express":"4.16.2","lodash":"4.17.5","markdown":"0.5.0","morgan":"1.9.0","prop-types":"15.6.0","react":"16.2.0","react-document-title":"2.0.3","react-dom":"16.2.0","react-ga":"2.4.1","react-redux":"5.0.6","react-resize-detector":"2.2.0","react-router":"4.2.0","react-router-dom":"4.2.2","redux":"3.7.2","redux-immutable-state-invariant":"2.1.0","redux-thunk":"2.2.0","styled-components":"3.1.6","superagent":"3.8.2"},"devDependencies":{"babel-core":"6.26.0","babel-eslint":"8.2.1","babel-loader":"7.1.2","babel-polyfill":"6.26.0","babel-preset-es2015":"6.24.1","babel-preset-react":"6.24.1","chai":"4.1.2","enzyme":"3.3.0","enzyme-adapter-react-16":"1.1.1","eslint":"4.17.0","eslint-config-airbnb":"16.1.0","eslint-config-prettier":"2.9.0","eslint-loader":"1.9.0","eslint-plugin-chai-friendly":"0.4.1","eslint-plugin-import":"2.8.0","eslint-plugin-jsx-a11y":"6.0.3","eslint-plugin-prettier":"2.6.0","eslint-plugin-react":"7.6.1","gulp":"3.9.1","jsdom":"11.6.2","lint-staged":"6.1.0","mocha":"5.0.0","mocha-param":"1.0.2","nodemon":"1.14.12","prettier":"1.10.2","sinon":"4.3.0","webpack":"3.10.0","webpack-dev-middleware":"2.0.5","webpack-dev-server":"2.11.1"}}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map