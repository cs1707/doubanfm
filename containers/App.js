import React, { Component } from 'react'
import Channels from './Channels'
import Player from './Player'

import { connect } from 'react-redux'
import { asyncControl } from '../actions/player'
import { fetchChannels } from '../actions/channels'


class App extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    let { init } = this.props
    init()
  }

  render() {
    return (
      <div>
        <Channels />
        <Player />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init() {
      dispatch(asyncControl('new'))
      dispatch(fetchChannels())
    }
  }
}

export default connect(null, mapDispatchToProps)(App)
