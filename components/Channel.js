import React, { Component, PropTypes } from 'react';

export default class Channel extends Component {
  render() {
    let { channel } = this.props;
    return (
      <span onClick={ e => {
        this.props.changeChannel(channel.channel_id);
      } }>
        {channel.name}
      </span>
    )
  }
}
