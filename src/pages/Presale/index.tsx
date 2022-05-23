import * as React from 'react';
import Actions from './Actions';

import styles from './styles.module.scss';
import TopInfo from './TopInfo';
import Transactions from './Transactions';

const Presale = () => {
  return (
    <div className={styles.dashboard}>
      <div className='card-body p-1'>
        <div
          className='card rounded border-0'
          style={{ backgroundColor: 'transparent' }}
        >
          <div className='card-body text-center p-4'>
            <TopInfo />
            <Actions />
          </div>
        </div>
        <Transactions />
      </div>
    </div>
  );
};

export default Presale;
