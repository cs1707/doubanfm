import React, { Component, PropTypes } from 'react'

export default class Channel extends Component {
  render() {
    let { channel, changeChannel, active } = this.props
    return (
      <span className="channel" className={ "channel " + (active ? 'active' : '')} onClick={ changeChannel }>
        {channel.name}
      </span>
    )
  }
}

Channel.PropTypes = {
  active: PropTypes.bool.isRequired,
  channel: PropTypes.object.isRequired,
  changeChannel: PropTypes.func.isRequired
}
