import React, { Component, PropTypes } from 'react';
import Channel from './Channel.js';

export default class Channels extends Component {
  render() {
    let { channels, changeChannel } = this.props;
    return (
      <div>
      {channels.map(channel => {
        return <Channel channel={channel} changeChannel={ changeChannel }/>
      })}
      </div>
    )
  }
}
