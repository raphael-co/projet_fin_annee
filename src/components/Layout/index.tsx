import React from 'react';
import { AuthenticatedRoutesWrapper } from '@elrondnetwork/dapp-core';
import { useLocation } from 'react-router-dom';
import routes, { routeNames } from 'routes';
import Footer from './Footer';
import Navbar from './Navbar';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const Layout = (props: Props) => {
  const { search } = useLocation();
  return (
    <div className='layout d-flex flex-column flex-fill wrapper'>
      <Navbar />
      <main className='d-flex flex-column flex-grow-1 layout'>
        <AuthenticatedRoutesWrapper
          routes={routes}
          unlockRoute={`${routeNames.unlock}${search}`}
        >
          {props.children}
        </AuthenticatedRoutesWrapper>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
