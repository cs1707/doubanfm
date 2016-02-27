import {
  PAUSE,
  PLAY,
  NEW,
  RECEIVE_PLAYLIST,
  RECEIVE_CHANNELS,
  CHANGE_CHANNEL,
  SHOW_CHANNELS,
  HIDE_CHANNELS,
  SHOW_LOGIN,
  HIDE_LOGIN,
  PLAYING,
  END,
  TOGGLE_RATE
} from '../constant/index.js'



export function login(obj) {
  return {
    type: LOGIN,
    login: obj
  };
}

function receiveChannels(list) {
  return {
    type: RECEIVE_CHANNELS,
    list
  };
}

export function changeChannel(id) {
  return {
    type: CHANGE_CHANNEL,
    id
  }
}

export function asyncChangeChannel(channelId) {
  return (dispatch, getState) => {
    let {
      channel: {
        id
        }
    } = getState();
    if(id === channelId) {
      return;
    }
    dispatch(changeChannel(channelId));
    dispatch(receiveList([]));
    dispatch(asyncNext('n'));
  }
}


export function asyncLogin(obj = {}) {
  return (dispatch, getState) => {
    fetchLogin(obj)
      .then(json => {
        dispatch(login(json));
      });
  }
}

export function asyncChannels() {
  return (dispatch, getState) => {
    let {
      channel: {
        channels
      }
    } = getState();
    if(!channels.length) {
      fetchChannels()
        .then(json => {
          dispatch(receiveChannels(json.channels));
        });
    }
  }
}

function fetchLogin(obj = {}) {
  let query = Object.assign({}, {
    app_name: 'radio_android',
    version: 100
  }, obj);
  return fetch('http://www.douban.com/j/app/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: $param(query)
    })
    .then(response => response.json());
}

function fetchChannels() {
  return fetch('http://www.douban.com/j/app/radio/channels')
    .then(response => response.json());
}
