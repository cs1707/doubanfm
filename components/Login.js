import React, { Component, PropTypes } from 'react';

export default class Login extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
  }
  render() {
    return (
      <div>
        <input type="text" ref="email" />
        <br/>
        <input type="password" ref="password"/>
        <br/>
        <button onClick={this.login}>登录</button>
      </div>
    );
  }

  login() {
    let email = this.refs.email.getDOMNode().value;
    let password = this.refs.password.getDOMNode().value;
    if(!email || !password) {
      alert('用户名或密码错误');
      return;
    }
    this.props.login({
      email,
      password
    });
  }
}
