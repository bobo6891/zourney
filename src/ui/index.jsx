/* eslint-disable */
if (!global._babelPolyfill) {
  require('babel-polyfill');
}

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Zourney from './components/Zourney';
import { APP_NAME } from 'settings';
import store from 'redux/store';
/* eslint-enable */

const rootElement = document.querySelector(`#${APP_NAME}`);
if (rootElement) {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Route path="*" exact component={Zourney} />
      </BrowserRouter>
    </Provider>,
    rootElement
  );
}
