import { createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
// import promiseMiddleware from 'redux-promise'
import reducer from '../reducers/index.js'

const createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState)

  return store
}
