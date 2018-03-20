/* eslint-disable */
if (!global._babelPolyfill) {
  require('babel-polyfill');
}

import server from './server.js';
/* eslint-enable */

server();
