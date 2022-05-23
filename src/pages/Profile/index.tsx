import React, { useState, useEffect } from 'react';

import { useGetAccountInfo } from '@elrondnetwork/dapp-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import ProfileCards from 'components/ProfileCards';
import ProfilHeading from 'components/ProfilHeading';
import RecupetestUser from 'components/RecupetestUser';

import { logout } from 'core';
import useGlobalData from '../../hooks/useGlobalData';

import styles from './styles.module.scss';

interface SquareConfig {
  exp?: string;
  data?: any;
  // width?: number;
}

const Profile: React.FC = () => {
  const { address } = useGetAccountInfo();
  const [loading, setLoading] = useState<boolean>(true);
  const dateNow = new Date();

  const token = localStorage.getItem('access_token');

  const testTokenJWT = () => {
    try {
      if (token) {
        const decodedToken: SquareConfig = jwt_decode(token);
        // console.log(decodedToken);
        const timeToken = Number(decodedToken.exp) * 1000 - dateNow.getTime();
        if (
          Number(decodedToken.exp) * 1000 < dateNow.getTime() ||
          localStorage.getItem('access_token') == undefined
        ) {
          logout();
        } else {
          // handelUser();
          return (
            <div>
              <RecupetestUser />
              <p>temps restant du token : {timeToken * 1000}</p>;
            </div>
          );
        }
      }
    } catch {
      console.log('hello pas de token pas bon');
      localStorage.removeItem('access_token');
      location.reload();
    }
  };
  // console.log(posts !== undefined ? posts.data.user.name : 'non');

  const navigate = useNavigate();
  const handleRedirect = () =>
    Boolean(address) ? setLoading(false) : navigate('/unlock');

  useEffect(handleRedirect, [address]);
  useGlobalData();

  if (loading) {
    return (
      <div
        style={{ fontSize: '30px' }}
        className='d-flex align-items-center justify-content-center text-white flex-fill'
      >
        <FontAwesomeIcon
          icon={faSpinner}
          size='2x'
          spin={true}
          className='mr-3'
        />
        Loading...
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <ProfilHeading />
      <ProfileCards />

      {/* {token !== undefined || null? } */}

      {testTokenJWT()}

      {/* {handelUser()} */}
    </div>
  );
};

export default Profile;
