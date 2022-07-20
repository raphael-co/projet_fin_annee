import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const Layout = (props: Props) => {
  return (
    <div className='layout d-flex flex-column flex-fill wrapper'>
      <Navbar />
      <main className='d-flex flex-column flex-grow-1 layout'>
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
