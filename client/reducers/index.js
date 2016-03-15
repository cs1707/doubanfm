import { combineReducers } from 'redux';
import player from './player'
import channels from './channels'
import login from './login'

let reducer = combineReducers({
  player,
  channels,
  user: login
});

export default reducer;
