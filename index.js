import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore.js'

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>, document.querySelector('#app'));
