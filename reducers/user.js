import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SHOW_LOGIN,
  HIDE_LOGIN,
  LOGINING
} from '../constant'

function user(state = {
  data: {},
  // status: LOGIN,
  visible: false
}, action) {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, action.login)
    case SHOW_LOGIN:
      return Object.assign({}, state, { visible: true })
    case HIDE_LOGIN:
      return Object.assign({}, state, { visible: false })
    default:
      return state;
  }
}

export default user
