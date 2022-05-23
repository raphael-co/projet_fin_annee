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
          href='https://middlestaking.fr'
        >
          Made with <HeartIcon className='mx-1' /> by Middle Staking.
        </a>
      </div>
    </footer>
  );
};

export default Footer;
