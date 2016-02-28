import { connect } from 'react-redux'
import Channels from '../components/Channels'
import { asyncChangeChannel, toggleChannelsShow} from '../actions/channels'

const mapStateToProps = (state) => {
  return {
    channels: state.channels.list,
    current: state.channels.current,
    visible: state.channels.visible
  }
}

const  mapDispatchToProps = (dispatch) => {
  return {
    changeChannel(id) {
      dispatch(asyncChangeChannel(id))
    },
    toggleChannelsShow() {
      dispatch(toggleChannelsShow())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Channels)
