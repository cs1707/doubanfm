import {
  RECEIVE_CHANNELS,
  CHANGE_CHANNEL,
  TOGGLE_CHANNELS_SHOW
} from '../constants'

import { asyncControl } from './player'

function receiveChannels(list) {
  return {
    type: RECEIVE_CHANNELS,
    list
  };
}

function toggleChannelsShow() {
  return {
    type: TOGGLE_CHANNELS_SHOW,
  }
}

function changeChannel(current) {
  return {
    type: CHANGE_CHANNEL,
    current
  }
}


function asyncChangeChannel(current) {
  return (dispatch, getState) => {
    dispatch(changeChannel(current))
    dispatch(asyncControl('new'))
  }
}

function fetchChannels() {
  return (dispatch) => {
    return fetch('http://www.douban.com/j/app/radio/channels')
      .then(response => response.json())
      .then(({channels}) => {
        dispatch(receiveChannels(channels))
      })
  }
}

export {
  asyncChangeChannel,
  fetchChannels,
  toggleChannelsShow,
}

