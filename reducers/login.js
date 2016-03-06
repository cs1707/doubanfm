import {
  LOGIN_START,
  LOGIN_END,
  TOGGLE_LOGIN_SHOW
} from '../constant'

export default function login(state = {
  data: {},
  visible: false,
  loading: false
}, action) {
  switch(action.type) {
    case LOGIN_START:
      return Object.assign({}, state, { loading: true})
    case LOGIN_END:
      return Object.assign({}, state, {
        loading: false,
        data: action.data
      })
    case TOGGLE_LOGIN_SHOW:
      return Object.assign({}, state, { visible: true })
    default:
      return state;
  }
}
