import {
  RECEIVE_CHANNELS,
  CHANGE_CHANNEL,
  TOGGLE_CHANNELS_SHOW
} from '../constants'

function channels(state = {
  list: [],
  current: 0,
  visible: false
}, action) {
  switch(action.type) {
    case RECEIVE_CHANNELS:
      return Object.assign({}, state, {
        list: action.list
      })
    case CHANGE_CHANNEL:
      return Object.assign({}, state, {
        current: action.current
      })
    case TOGGLE_CHANNELS_SHOW:
      return Object.assign({}, state, {
        visible: !state.visible
      })
    default:
      return state
  }
}

export default channels
