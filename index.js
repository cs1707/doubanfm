import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './containers/App.js';
import configureStore from './store/configureStore.js';

const store = configureStore();

React.render(
  <Provider store={store}>
    { ()=> <App />}
  </Provider>
, document.body);
