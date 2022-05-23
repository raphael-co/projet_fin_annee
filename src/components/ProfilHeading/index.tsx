import React, { FC, useState } from 'react';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core';
import {
  faExternalLinkAlt,
  faCog,
  faThLarge,
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import jwt_decode from 'jwt-decode';
import { Button, Col, Row, Toast, ToastContainer } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Action from 'components/Action';
import Loginin from 'components/LoginApi';
import Registerer from 'components/registerApi.tsx';

import { useGlobalContext } from 'context';

import { logout } from 'core';
import { translate } from 'locale/local';
import Identity from '../Heading/components/Identity';

import styles from './styles.module.scss';

interface SquareConfig {
  exp?: string;
  // width?: number;
}

const ProfilHeading: FC = () => {
  const { address } = useGetAccountInfo();
  const { contractDetails } = useGlobalContext();
  const d = new Date();
  const [SuccesRegister, setSuccesRegister] = useState({
    valid: false,
    message: 'test',
    date:
      localStorage.getItem('langage') == 'fr'
        ? d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear()
        : d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear()
  });
  const [show, setShow] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname === '/admin';

  const registersuccess = () => {
    if (SuccesRegister.valid == true) {
      return (
        <ToastContainer className='p-3' position={'top-end'}>
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={5000}
            autohide
          >
            <Toast.Header>
              <img
                src='holder.js/20x20?text=%20'
                className='rounded me-2'
                alt=''
              />
              <strong className='me-auto'>Middle Staking</strong>
              <small>{SuccesRegister.date}</small>
            </Toast.Header>
            <Toast.Body>{SuccesRegister.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      );
    } else {
      return;
    }
  };
  const token = localStorage.getItem('access_token');

  const testTokenJWT = () => {
    if (token) {
      const decodedToken: SquareConfig = jwt_decode(token);
      if (
        Number(decodedToken.exp) * 1000 < d.getTime() ||
        localStorage.getItem('access_token') == undefined
      ) {
        logout();
      } else {
        return (
          <Button variant='primary' onClick={logout}>
            {translate('Logout', localStorage.getItem('langage'))}
          </Button>
        );
      }
    } else {
      return (
        <Row xs='auto'>
          <Col>
            <Loginin />
          </Col>
          <Col>
            <Registerer setSuccesRegister={setSuccesRegister} />
          </Col>
        </Row>
      );
    }
  };

  return (
    <div className={styles.heading}>
      {registersuccess()}
      <Row>
        <div className={styles.meta}>
          <div className={styles.label}>
            {' '}
            {translate('MY_ADDRESS', localStorage.getItem('langage'))}
          </div>

          <div className='d-flex align-items-center'>
            <span className={styles.contract}>{address}</span>
            <a
              href={`https://explorer.elrond.com/accounts/${address}`}
              className={styles.icon}
              rel='noreferrer'
              target='_blank'
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </div>
        </div>
      </Row>
      <Row>
        <div>{testTokenJWT()}</div>
      </Row>

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

export default ProfilHeading;
