import React from 'react';
import CurrentTimebox from './CurrentTimebox';
import Header from './Header';
import InspirationalQuote from './InspirationalQuoteContainer';
import TimeboxesManager from './TimeboxesManager';

const AuthenticatedApp = () => {
  return (
    <>
      <Header children={'Logout'} />
      <TimeboxesManager />
      <CurrentTimebox />
      <InspirationalQuote />
    </>
  );
};

export default AuthenticatedApp;
