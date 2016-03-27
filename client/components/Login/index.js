import React, { Component, PropTypes } from 'react';

export default class Login extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
  }
  render() {
    let { visible } = this.props.user
    return (
      <form onSubmit={this.login} className={'form-login ' + (visible ? '':'hidden')} >
        <div className="form-group">
          <input className="form-control" type="text" ref="email" placeholder="邮箱"/>
        </div>
        <div className="form-group">
          <input className="form-control" type="password" ref="password" placeholder="密码"/>
        </div>
        <div className="form-group">
          <button className="btn-login" type="submit">登录</button>
        </div>
      </form>
    )
  }

  login(e) {
    e.preventDefault()
    let email = this.refs.email.value
    let password = this.refs.password.value
    if(!email || !password) {
      return
    }
    this.props.submitLogin(
      email,
      password
    );
  }
}
