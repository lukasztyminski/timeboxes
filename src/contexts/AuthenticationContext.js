import { createContext } from 'react';

const AuthenticationContext = createContext({
  accessToken: null,
  onLogout: () => {},
  onLoginAttempt: () => {},
});

export default AuthenticationContext;
