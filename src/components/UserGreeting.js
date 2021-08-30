import React, { useContext } from 'react';
import jwt from 'jsonwebtoken';
import AuthenticationContext from '../contexts/AuthenticationContext';

const UserGreeting = () => {
  const { accessToken } = useContext(AuthenticationContext);
  return (
    <>
      Witaj <strong> {accessToken ? getUserEmail(accessToken) : null}</strong>
    </>
  );
};

const getUserEmail = (accessToken) => {
  const decodedToken = jwt.decode(accessToken);
  return decodedToken.email;
};

export default UserGreeting;
