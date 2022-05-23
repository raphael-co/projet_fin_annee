import React from 'react';
import { getIsLoggedIn } from '@elrondnetwork/dapp-core';
import { Link } from 'react-router-dom';
import { translate } from 'locale/local';
import { routeNames } from 'routes';
import { ReactComponent as Logoms } from '../../assets/img/logo-ms-header.svg';
import styles from './styles.module.scss';

const Home = () => {
  React.useEffect(() => {
    const isLoggedIn = getIsLoggedIn();
    if (isLoggedIn) {
      window.location.href = routeNames.dashboard;
    }
  }, []);

  return (
    <div className='d-flex flex-fill align-items-center container'>
      <div className='row w-100'>
        <div className='col-12 col-md-8 col-lg-5 mx-auto text-center'>
          <Logoms className='lead' style={{ width: 350 }} />
          <div className={styles.unlock}>
            <div
              style={{ margin: 0, padding: '10%' }}
              className={styles.wrapper}
            >
              <h2
                style={{ color: 'white', margin: '0.1%' }}
                className='mb-3'
                data-testid='title'
              >
                {translate('Dashboard', localStorage.getItem('langage'))}
              </h2>
              <p className='mb-3' style={{ color: 'white' }}>
                {translate(
                  'Login_with_Elrond_wallet',
                  localStorage.getItem('langage')
                )}
              </p>
              <Link
                to='/unlock'
                style={{ margin: 0, textDecoration: 'none' }}
                className={styles.connects}
              >
                <span className={styles.connect}>
                  <span className={styles.name}>
                    {translate('Login', localStorage.getItem('langage'))}
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
