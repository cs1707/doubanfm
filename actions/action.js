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

export function play() {
  return {
    type: PLAY
  };
}

export function pause() {
  return {
    type: PAUSE
  };
}

export function next(current) {
  return {
    type: NEXT,
    current
  };
}

export function login(obj) {
  return {
    type: LOGIN,
    login: obj
  };
}

function receiveList(songs) {
  return {
    type: RECEIVE_LIST,
    songs
  };
}

function receiveChannels(channels) {
  return {
    type: RECEIVE_CHANNELS,
    channels
  };
}

export function changeChannel(id) {
  return {
    type: CHANGE_CHANNEL,
    id
  }
}

function fetchSongs(type) {
  return (dispatch, getState) => {
    dispatch(requestSongList());
    return fetch(`http://www.douban.com/j/app/radio/people?app_name=radio_android&version=100&type=${type}&channel=0`)
      .then(response => response.json())
      .then(json => dispatch(receiveSongList(json.song)));
  }
}

export function asyncPlay() {
  return (dispatch, getState) => {
    let {
      player: {
        current,
        songs
      }
    } = getState();
    if(current.url) {
      return dispatch(play());
    }
    return dispatch(asyncNext());
  }
}

export function asyncNext(type) {
  return (dispatch, getState) => {
    let {
      player: {
        current,
        songs
      }
    } = getState();

    // 获取列表
    if(songs.length === 0) {
      return fetchSongList(getState)({
          type: type || 'n',
          sid: current.sid
        })
        .then(json => {
          dispatch(receiveList(json.song));
          dispatch(asyncNext());
        });
    }
    // 播放
    dispatch(next(songs[0]));
    if(songs.length === 1) {
      return fetchSongList(getState)({
          type: 'p',
          sid: songs[0].sid
        })
        .then(json => {
          dispatch(receiveList(json.song));
        });
    }
    dispatch(receiveList(songs.slice(1)));
  }
}
export function asyncEnd() {
  return (dispatch, getState) => {
    let {
      player:{
        current
      }
    } = getState();
    fetchSongList(getState)({
      type: 'e',
      sid: current.sid
    });
    return dispatch(asyncNext());
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

export function asyncSkip() {
  return (dispatch, getState) => {
    dispatch(receiveList([]));
    dispatch(asyncNext('s'));
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
function fetchSongList(getState) {
  let {
    channel: {
      id
    },
    login: {
      user_id,
      token,
      expire
    },
  } = getState();
  console.log(getState());
  return (obj = {}) => {
    let query = Object.assign({
      app_name: 'radio_android',
      version: 100
    }, {
      channel: id,
      user_id,
      token,
      expire
    },
    obj);
    return fetch('http://www.douban.com/j/app/radio/people?' + $param(query))
      .then(response => response.json());
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

function $param(obj) {
  let s = [];
  for(let key in obj) {
    if(obj[key] != null) {
      s.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
  }
  return s.join('&');
}

