import {
  RECEIVE_CHANNELS,
  CHANGE_CHANNEL,
  SHOW_CHANNELS,
  HIDE_CHANNELS
} from '../constant'

function channels(state = {
  list: [],
  current: 0,
  visible: false
}, action) {
  switch(action.type) {
    case RECEIVE_CHANNELS:
      return Object.assign({}, state, {
        list: action.list
      });
    case CHANGE_CHANNEL:
      return Object.assign({}, state, {
        id: action.id
      });
    case SHOW_CHANNELS:
      return Object.assign({}, state, {
        visible: true
      });
    case HIDE_CHANNELS:
      return Object.assign({}, state, {
        visible: false
      });
    default:
      return state;
  }
}

export default channels
