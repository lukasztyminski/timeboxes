import React, { useContext, useRef } from 'react';
import AuthenticationContext from '../contexts/AuthenticationContext';

const LoginForm = ({ errorMessage }) => {
  const emailInput = useRef();
  const passwordInput = useRef();
  const { onLoginAttempt } = useContext(AuthenticationContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    onLoginAttempt({
      email: emailInput.current.value,
      password: passwordInput.current.value,
    });
    emailInput.current.value = '';
    passwordInput.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="LoginForm">
      {errorMessage ? (
        <div className="LoginForm__error-message">{errorMessage}</div>
      ) : null}

      <label>
        Login
        <input
          ref={emailInput}
          type="text"
          defaultValue="lttyminski@gmail.com"
        />
      </label>
      <br />
      <label>
        Password
        <input
          ref={passwordInput}
          type="password"
          defaultValue="podlasieAZS1916"
        />
      </label>
      <br />
      <button>Log in</button>
    </form>
  );
};

export default LoginForm;
