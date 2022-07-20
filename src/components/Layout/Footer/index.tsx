import React from 'react';
import { ReactComponent as HeartIcon } from '../../../assets/img/heart.svg';

const Footer = () => {
  return (
    <footer className='text-center pt-2 pb-3 msdark'>
      <div>
        <a
          {...{
            target: '_blank'
          }}
          style={{ color: 'white' }}
          className='d-flex align-items-center'
          href='https://github.com/raphael-co/projet_fin_annee'
        >
          Made with <HeartIcon className='mx-1' /> by Raphael Ronan Michal.
        </a>
      </div>
    </footer>
  );
};

export default Footer;
