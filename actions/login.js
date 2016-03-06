import {
  TOGGLE_LOGIN_SHOW,
  LOGIN_START,
  LOGIN_END
} from '../constant'

import { $param } from '../utils'

function loginStart(email, password) {
  return {
    type: LOGIN_START,
    data: { email, password }
  }
}

function loginEnd(data) {
  return {
    type: LOGIN_END,
    data
  }
}

export function submitLogin(email, password) {
  return (dispatch, getState) => {
    let query = {
      app_name: 'radio_android',
      version: 100,
      email,
      password
    }

    dispatch(loginStart(email, password))

    return fetch('http://www.douban.com/j/app/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: $param(query)
      })
      .then(response => response.json())
      .then(json => dispatch(loginEnd(json)))
      .catch(json => dispatch(loginEnd(json)))

    }
}
