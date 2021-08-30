import React, { useContext, Children } from 'react';
import AuthenticationContext from '../contexts/AuthenticationContext';
import UserGreeting from './UserGreeting';

const Header = ({ children }) => {
  const { onLogout } = useContext(AuthenticationContext);

  if (Children.count(children) < 1) {
    throw new Error('Header has to have at least one child!');
  }

  return (
    <div className="header">
      <UserGreeting />
      <a className="header__logout-link" href="#logout" onClick={onLogout}>
        {children}
      </a>
    </div>
  );
};

export default Header;
