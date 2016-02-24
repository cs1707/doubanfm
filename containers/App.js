import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncPlay, pause, asyncSkip, asyncEnd, asyncLogin, asyncChannels, asyncChangeChannel } from '../actions/action.js';
import Player from '../components/Player.js';
import Login from '../components/Login.js';
import Channels from '../components/Channels.js';

class App extends Component {
  constructor() {
    super();
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.skip = this.skip.bind(this);
    this.end = this.end.bind(this);
    this.login = this.login.bind(this);
    this.changeChannel = this.changeChannel.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(asyncPlay());
    dispatch(asyncChannels());
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }
  render() {
    const {
      player:{
        current: song
      },
      channel: {
        channels
      }
    } = this.props;
    console.log(this.props);
    const { play, pause, end, skip, login} = this;
    return (
      <div>
        <Channels channels= {channels} changeChannel={this.changeChannel}/>
        <Login {...{login}}/>
        {song.url && <Player {
          ...{
            song,
            play,
            skip,
            pause,
            end,
          }
        }/> || ''}
      </div>
    )
  }

  login(obj) {
     this.props.dispatch(asyncLogin(obj));
  }

  play() {
    this.props.dispatch(asyncPlay());
  }

  pause() {
    this.props.dispatch(pause());
  }

  skip() {
    this.props.dispatch(asyncSkip());
  }

  end() {
    this.props.dispatch(asyncEnd());
  }

  changeChannel(channelId) {
    this.props.dispatch(asyncChangeChannel(channelId));
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  songs: PropTypes.array.isRequired,
  current: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(App);
