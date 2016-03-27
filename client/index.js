import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store'
import './assets/reset.css'
import './assets/style.css'

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>, document.querySelector('#app'));
