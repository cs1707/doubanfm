import React, { Component, PropTypes } from 'react'

export default class Progress extends Component {
  render() {
    let { now } = this.props
    return (
      <div className="progress">
        <div className="progress-inner" style={{width: now}}></div>
      </div>
    )
  }
}

Progress.propTypes = {
  now: PropTypes.string.isRequired
}
