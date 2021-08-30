import React, { Component, createRef } from 'react';
import AuthenticationContext from '../contexts/AuthenticationContext';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.emailInput = createRef();
    this.passwordInput = createRef();
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.context.onLoginAttempt({
      email: this.emailInput.current.value,
      password: this.passwordInput.current.value,
    });
    this.emailInput.current.value = '';
    this.passwordInput.current.value = '';
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="LoginForm">
        {this.props.errorMessage ? (
          <div className="LoginForm__error-message">
            {this.props.errorMessage}
          </div>
        ) : null}

        <label>
          Login
          <input
            ref={this.emailInput}
            type="text"
            defaultValue="lttyminski@gmail.com"
          />
        </label>
        <br />
        <label>
          Password
          <input
            ref={this.passwordInput}
            type="password"
            defaultValue="podlasieAZS1916"
          />
        </label>
        <br />
        <button>Log in</button>
      </form>
    );
  }
}

LoginForm.contextType = AuthenticationContext;

export default LoginForm;
