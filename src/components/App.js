import React, { useEffect, useState } from 'react';
import AxiosTimeboxesAPI from '../api/AxiosTimeboxesApi';
import AuthenticationContext from '../contexts/AuthenticationContext';
import AuthenticatedApp from './AuthenticatedApp';

import ErrorBoundary from './ErrorBoundary';
import LoginForm from './LoginForm';

const App = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [previousLoginAttemptFailed, setPreviousLoginAttemptFailed] =
    useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, [accessToken]);

  const isUserLoggedIn = () => {
    return !!accessToken;
  };

  const handleLoginAttempt = (credentials) => {
    AxiosTimeboxesAPI.login(credentials)
      .then(({ accessToken }) => {
        setAccessToken(accessToken);
        setPreviousLoginAttemptFailed(false);
        localStorage.setItem('accessToken', accessToken);
      })
      .catch(() => setPreviousLoginAttemptFailed(true));
  };

  const handleLogout = () => {
    setAccessToken(null);
    setPreviousLoginAttemptFailed(false);
    localStorage.removeItem('accessToken');
  };

  return (
    <div className="App">
      <ErrorBoundary message="Coś nie działa w całej aplikacji">
        <AuthenticationContext.Provider
          value={{
            accessToken,
            onLogout: handleLogout,
            onLoginAttempt: handleLoginAttempt,
          }}
        >
          {isUserLoggedIn() ? (
            <AuthenticatedApp />
          ) : (
            <LoginForm
              errorMessage={
                previousLoginAttemptFailed ? 'Failed to log in' : null
              }
            />
          )}
        </AuthenticationContext.Provider>
      </ErrorBoundary>
    </div>
  );
};

export default App;
