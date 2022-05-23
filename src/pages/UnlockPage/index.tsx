import React, { FC } from 'react';

import { getIsLoggedIn, DappUI } from '@elrondnetwork/dapp-core';

import Extension from 'assets/Extension';
import Ledger from 'assets/Ledger';
import Logo from 'assets/Logo';
import Maiar from 'assets/Maiar';

import { network } from 'config';
import { translate } from 'locale/local';
import { routeNames } from 'routes';

import { ReactComponent as Logoms } from '../../assets/img/logo-ms-header.svg';

import styles from './styles.module.scss';

interface ConnectionType {
  title: string;
  name: string;
  background: string;
  icon: any;
  component: any;
}

export const UnlockRoute: FC = () => {
  const connects: Array<ConnectionType> = [
    {
      title: 'Desktop',
      name: 'Elrond Web Wallet',
      background: '#000000',
      icon: Logo,
      component: DappUI.WebWalletLoginButton
    },
    {
      title: 'Hardware',
      name: 'Ledger',
      background: '#000000',
      icon: Ledger,
      component: DappUI.LedgerLoginButton
    },
    {
      title: 'Mobile',
      name: 'Maiar App',
      background: 'linear-gradient(225deg, #2C58DA 0%, #1A2ABA 100%)',
      icon: Maiar,
      component: DappUI.WalletConnectLoginButton
    },
    {
      title: 'Browser',
      name: 'Maiar DeFi Wallet',
      background: 'linear-gradient(225deg, #2C58DA 0%, #1A2ABA 100%)',
      icon: Extension,
      component: DappUI.ExtensionLoginButton
    }
  ];

  React.useEffect(() => {
    const isLoggedIn = getIsLoggedIn();
    if (isLoggedIn) {
      window.location.href = routeNames.dashboard;
    }
  }, []);

  return (
    <div className='align-items-center'>
      {/* <div className='row'> */}
      <div className='col-12 mx-auto text-center'>
        <Logoms className='lead' style={{ width: 350 }} />
        <div className={styles.unlock}>
          <div className={styles.wrapper}>
            <div className={styles.logo}>
              <Logo />
            </div>

            <strong className={styles.heading}>
              Elrond Delegation Manager
            </strong>

            <div className={styles.description}>
              {` ${translate(
                'Delegate_Elrond',
                localStorage.getItem('langage')
              )}(${network.egldLabel}) ${translate(
                'And_Earn_EGLD_&_$MID',
                localStorage.getItem('langage')
              )}`}
            </div>

            <div className={styles.connects}>
              {connects.map((connect: ConnectionType) => (
                <connect.component
                  key={connect.name}
                  callbackRoute='/dashboard'
                  logoutRoute='/unlock'
                >
                  <span className={styles.connect}>
                    <span className={styles.title}>{connect.title}</span>

                    <span
                      className={styles.icon}
                      style={{ background: connect.background }}
                    >
                      <connect.icon />
                    </span>
                    <span className={styles.name}>{connect.name}</span>
                  </span>
                </connect.component>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default UnlockRoute;
