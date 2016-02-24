import { combineReducers } from 'redux';
import {
  PAUSE,
  PLAY,
  NEXT,
  RECEIVE_LIST,
  RECEIVE_CHANNELS,
  CHANGE_CHANNEL,
  SHOW_CHANNELS,
  HIDE_CHANNELS,
  LOGIN,
  SHOW_LOGIN,
  HIDE_LOGIN
} from '../constant/index.js';

function control(state = {
  control: PAUSE
}, action) {
  switch(action.type) {
    case PLAY:
      return Object.assign({}, state, { control: PLAY })
    case PAUSE:
      return Object.assign({}, state, { control: PAUSE })
    case NEXT:
      return Object.assign({}, action.current, { control: PLAY })
    default:
      return state;
  }
}

function songs(state=[], action) {
  switch(action.type) {
    case RECEIVE_LIST:
      console.log(action.songs);
      return action.songs;
    default:
      return state;
  }
}

function channel(state={
  channels: [],
  id: 0,
  visible: false
}, action) {
  switch(action.type) {
    case RECEIVE_CHANNELS:
      return Object.assign({}, state, {
        channels: action.channels
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

function login(state = {
  visible: false
}, action) {
  switch(action.type) {
    case LOGIN:
      return Object.assign({}, state, action.login)
    case SHOW_LOGIN:
      return Object.assign({}, state, { visible: true })
    case HIDE_LOGIN:
      return Object.assign({}, state, { visible: false });
    default:
      return state;
  }
}

let player = combineReducers({
  songs,
  current: control
})
let reducer = combineReducers({
  player,
  channel,
  login
});

export default reducer;
