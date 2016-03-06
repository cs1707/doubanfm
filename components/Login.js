import React, { Component, PropTypes } from 'react';

export default class Login extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
  }
  render() {
    return (
      <form className="form-login">
        <div className="form-group">
          <input className="form-control" type="text" ref="email" placeholder="邮箱"/>
        </div>
        <div className="form-group">
          <input className="form-control" type="password" ref="password" placeholder="密码"/>
        </div>
        <div className="form-group">
          <button className="btn-login" onClick={this.login}>登录</button>
        </div>
      </form>
    )
  }

  login() {
    let email = this.refs.email.getDOMNode().value;
    let password = this.refs.password.getDOMNode().value;
    if(!email || !password) {
      return;
    }
    this.props.submitLogin(
      email,
      password
    );
  }
}
