import React, { Component, PropTypes } from 'react';
import Channel from '../Channel';

export default class Channels extends Component {
  render() {
    let { channels, changeChannel, current, visible, toggleChannelsShow } = this.props;

    let Channels = channels.map((channel, index) => {
      return <Channel
        key={index}
        channel={channel}
        active={+current === +channel.channel_id}
        changeChannel={ () => changeChannel(channel.channel_id) }/>
    })
    return (
      <div className={'channels ' + (visible ? '': 'hidden')}>
        <span className="channel-close" onClick={toggleChannelsShow}>返回</span>
        { Channels }
      </div>
    )
  }
}

Channels.PropTypes = {
  channels: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  changeChannel: PropTypes.func.isRequired,
  toggleChannelsShow: PropTypes.func.isRequired,
}
