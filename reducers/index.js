import { combineReducers } from 'redux';
import player from './player'
import channels from './channels'
import user from './user'

let reducer = combineReducers({
  player,
  channels,
  user
});

export default reducer;
