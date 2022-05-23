import React, { FC } from 'react';
import { faCog, faThLarge, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';
import Action from 'components/Action';
import { useGlobalContext } from 'context';
import { translate } from 'locale/local';
import Identity from '../Heading/components/Identity';

import styles from './styles.module.scss';

const HeadingRewards: FC = () => {
  const { contractDetails } = useGlobalContext();

  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname === '/admin';

  return (
    <div className={styles.heading}>
      <div className={styles.meta}>
        <div className={styles.label}>
          {translate('My_Rewards', localStorage.getItem('langage'))}
        </div>

        <div className='d-flex align-items-center'>
          <p className={styles.contract}>
            {translate(
              'My_Rewards_heading_start',
              localStorage.getItem('langage')
            )}{' '}
            <br />
            {translate(
              'My_Rewards_heading_end',
              localStorage.getItem('langage')
            )}
          </p>
        </div>
      </div>

      {contractDetails.data && contractDetails.data.owner && (
        <div className='d-flex align-items-center'>
          <button
            type='button'
            onClick={() => navigate(isAdmin ? '/dashboard' : '/admin')}
            className={styles.button}
          >
            <span className={styles.icon}>
              <FontAwesomeIcon icon={isAdmin ? faThLarge : faCog} />
            </span>

            {isAdmin ? 'Dashboard' : 'Admin'}
          </button>

          {isAdmin && (
            <Action
              title='Agency Details'
              description='Update or set your agency details in order to validate your identity.'
              trigger={
                <div className={styles.button}>
                  <span className={styles.icon}>
                    <FontAwesomeIcon icon={faEdit} />
                  </span>
                  Identity
                </div>
              }
              render={<Identity />}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default HeadingRewards;
