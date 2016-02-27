import {
  PLAY,
  PAUSE,
  NEW,
  PLAYING,
  END,
  TOGGLE_RATE
} from '../constant'

function player(state = {
  control: PAUSE,
  playlist: []
}, action) {

  console.log(action);
  let { playlist } = state

  switch(action.type) {
    case PLAY:
      return Object.assign({}, state, { control: PLAY })
    case PAUSE:
      return Object.assign({}, state, { control: PAUSE })
    case NEW:
      return Object.assign({}, state, { playlist: action.playlist})
    case PLAYING:
      return Object.assign({}, state, { playlist: playlist.concat(action.playlist)})
    case END:
      return Object.assign({}, state, { playlist: playlist.slice(1)})
    case TOGGLE_RATE:
      return Object.assign({}, state, { playlist: [
        Object.assign({}, playlist[0], { like: !action.like }),
        ...playlist
      ]})
    default:
      return state
  }
}

export default player
