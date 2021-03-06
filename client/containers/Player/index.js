import { connect } from 'react-redux'
import Player from '../../components/Player'
import { asyncControl, play, pause } from '../../actions/player'
import { toggleChannelsShow } from '../../actions/channels'
import { toggleLoginShow } from '../../actions/login'

const mapStateToProps = (state) => {
  return {
    song: state.player.playlist[0],
    control: state.player.control
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handle(type) {
      dispatch(asyncControl(type))
    },

    play() {
      dispatch(play())
    },

    pause() {
      dispatch(pause())
    },

    toggleChannelsShow() {
      dispatch(toggleChannelsShow())
    },

    toggleLoginShow() {
      dispatch(toggleLoginShow())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
