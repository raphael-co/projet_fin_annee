import React, { FC, ReactNode, MouseEvent } from 'react';

import { faLock, faGift } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from 'assets/Logo';
import { network } from 'config';
import { useGlobalContext } from 'context';
import { denominated } from 'helpers/denominate';
import modifiable from 'helpers/modifiable';
import { translate } from 'locale/local';

import Delegate from './components/Delegate';
import Undelegate from './components/Undelegate';

import useStakeData from './hooks';

import styles from './styles.module.scss';

interface ActionType {
  label: string;
  render?: ReactNode;
  transaction?: (value: MouseEvent) => Promise<void>;
}

interface PanelType {
  subicon: ReactNode;
  color: string;
  title: string;
  value: string;
  disabled: boolean;
  actions: Array<ActionType>;
}

const Stake: FC = () => {
  const { userActiveStake, userClaimableRewards } = useGlobalContext();

  const { onRedelegate, onClaimRewards } = useStakeData();
  const { isLoading, isEmpty, isError } = {
    isEmpty: userActiveStake.data === '0',
    isLoading: userActiveStake.status === 'loading',
    isError: userActiveStake.status === 'error'
  };

  const panels: Array<PanelType> = [
    {
      subicon: <FontAwesomeIcon icon={faLock} />,
      color: '#2044F5',
      title: translate('Active_Delegation', localStorage.getItem('langage')),
      value: denominated(userActiveStake.data || '...', { addCommas: false }),
      disabled: false,
      actions: [
        {
          render: <Undelegate />,
          label: translate('Undelegate', localStorage.getItem('langage'))
        },
        {
          render: <Delegate />,
          label: translate('Delegate', localStorage.getItem('langage'))
        }
      ]
    },
    {
      subicon: <FontAwesomeIcon icon={faGift} />,
      color: '#27C180',
      title: translate('Claimable_Rewards', localStorage.getItem('langage')),
      value: `+ ${userClaimableRewards.data || '...'}`,
      disabled: !userClaimableRewards.data || userClaimableRewards.data === '0',
      actions: [
        {
          transaction: onClaimRewards,
          label: translate('Claim_Now', localStorage.getItem('langage'))
        },
        {
          transaction: onRedelegate,
          label: translate('Redelegate', localStorage.getItem('langage'))
        }
      ]
    }
  ];

  return (
    <div
      className={`${modifiable(
        'stake',
        [(isLoading || isError || isEmpty) && 'empty'],
        styles
      )}
    )} stake`}
    >
      {isLoading || isError || isEmpty ? (
        <div className={styles.wrapper}>
          <strong className={styles.heading}>
            {translate(
              'Welcome_to_Delegation_Dashboard',
              localStorage.getItem('langage')
            )}
          </strong>

          <div className={styles.logo}>
            <Logo />

            <div style={{ background: '#2044F5' }} className={styles.subicon}>
              <FontAwesomeIcon icon={faLock} />
            </div>
          </div>

          <div className={styles.message}>
            {isLoading
              ? 'Retrieving staking data...'
              : isError
              ? 'Unable to to retrieve staking data. You first need to delegate.'
              : `Currently you don't have any ${network.egldLabel} staked.`}
          </div>

          <Delegate />
        </div>
      ) : (
        panels.map((panel, index) => (
          <div key={panel.title} className={styles.panel}>
            <div
              className={modifiable('icon', [index > 0 && 'inversed'], styles)}
            >
              <Logo />

              {index > 0 &&
                Array.from({ length: 4 }).map((item, iteratee) => (
                  <strong
                    key={`plus-${iteratee}`}
                    className={modifiable('plus', [iteratee + 1], styles)}
                  >
                    +
                  </strong>
                ))}

              <div
                style={{ background: panel.color }}
                className={styles.subicon}
              >
                {panel.subicon}
              </div>
            </div>

            <div className={styles.title}>{panel.title}</div>

            <strong className={styles.value}>
              {panel.value}
              {network.egldLabel}
            </strong>

            <div className={styles.actions}>
              {panel.actions.map((action, iteratee) =>
                action.render ? (
                  <div key={action.label}>{action.render}</div>
                ) : (
                  <button
                    key={action.label}
                    type='button'
                    style={{ background: iteratee ? panel.color : '#303234' }}
                    className={modifiable(
                      'action',
                      [panel.disabled && 'disabled'],
                      styles
                    )}
                    onClick={action.transaction}
                  >
                    {action.label}
                  </button>
                )
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Stake;
