import React, { Component, PropTypes } from 'react';

export default class Blobimg extends Component {
  constructor() {
    super();
    this.state = {
      objectUrl: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.src !== nextProps.src) {
      this.getImage(nextProps.src);
    }
  }

  componentDidMount() {
    this.getImage(this.props.src);
  }

  getImage(src) {
    this.setState({
      objectUrl: ''
    });
    return fetch(src)
      .then(response => {
        return response.blob();
      })
      .then(blob => {
        let objectUrl = URL.createObjectURL(blob);
        this.setState({
          objectUrl
        });
      });
  }

  render() {
    let divStyle = {
       backgroundImage: `url(${this.state.objectUrl})`
    };
    return (
      <div {...this.props} style={divStyle}></div>
    )
  }
}

Blobimg.propsTypes = {
  src: PropTypes.string.isRequired
};

