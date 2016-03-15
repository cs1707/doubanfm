import {
  PLAY,
  PAUSE,
  NEW,
  PLAYING,
  END,
  TOGGLE_RATE
} from '../constants'

import { $param } from '../utils'

function play() {
  return {
    type: PLAY
  }
}

function pause() {
  return {
    type: PAUSE
  }
}

/**
 * 下一曲，不在播放，启动
 * @param  {[type]} playlist [description]
 * @return {[type]}          [description]
 */
function skip(playlist) {
  return {
    type: NEW,
    playlist
  }
}

function playing(playlist) {
  return {
    type: PLAYING,
    playlist
  };
}

function end() {
  return {
    type: END
  }
}

function toggleRate(like, playlist) {
  return {
    type: TOGGLE_RATE,
    like,
    playlist
  }
}

function asyncControl(type) {
  let typeMap = {
    new: 'n',
    skip: 's',
    byb: 'b',
    playing: 'p',
    end: 'e',
    rate: 'r',
    unrate: 'u'
  }

  return (dispatch, getState) => {
    let {
          channels: {
            current: channelId
          },
          player: {
            control,
            playlist
          },
          user
        } = getState()
    console.log(getState())

    let [current] = playlist

    let loginInfo = {}
    if(user.data.r === 0) {
      loginInfo = {
        user_id: user.data.user_id,
        expire: user.data.expire,
        token: user.data.token
      }
    }

    let xhr = () => fetchPlaylist(Object.assign({
      type: typeMap[type],
      channel: channelId,
      sid: current && current.sid,
    }, loginInfo))

    switch(type) {
      case 'new':
      case 'skip':
      case 'byb':
        xhr().then(({song}) => {
          dispatch(skip(song))
          if(control === PAUSE) {
            dispatch(play())
          }
          dispatch(asyncControl('playing'))
        })
        break
      case 'end':
        dispatch(end())
        xhr().then(function({song}){
          dispatch(playing(song))
          dispatch(asyncControl('playing'))
        })
        break
      case 'playing':
        if(playlist.length === 0) {
          dispatch(asyncControl('new'))
        } else if(playlist.length === 1){
          xhr().then(({song}) => {
            dispatch(playing(song))
          })
        }
        break
      case 'rate':
      case 'unrate':
        xhr().then(({song}) => {
          dispatch(toggleRate(current.like, song))
        })
      default:
        return
    }

  }
}

function fetchPlaylist(params) {
    let query = Object.assign({
      app_name: 'radio_android',
      version: 100
    }, params);
    return fetch('http://www.douban.com/j/app/radio/people?' + $param(query))
      .then(response => response.json());
}

export {
  play,
  pause,
  asyncControl
}
