import * as React from 'react';
import { useGetAccountInfo, DappUI } from '@elrondnetwork/dapp-core';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';

import {
  contractPresaleAddress,
  midIdentifier,
  midToSell,
  network
} from 'config';
import { translate } from 'locale/local';
import { ReactComponent as LogoMsTicker } from './../../assets/img/logo-ms.svg';
import styles from './styles.module.scss';

const TopInfo = () => {
  const { address, account } = useGetAccountInfo();
  //Token selectionné
  const [token, setToken] = React.useState({
    name: '1',
    balance: '0',
    decimals: 0
  });

  React.useEffect(() => {
    const fetchTokenList = async () => {
      const { data } = await axios(
        network.apiAddress + '/accounts/' + address + '/tokens/' + midIdentifier
      );
      setToken({
        name: data.name,
        balance: data.balance ? data.balance : 0,
        decimals: data.decimals
      });
    };
    fetchTokenList();
  }, [setToken]);

  return (
    <div className='text-white reset' data-testid='topInfo'>
      <Container className='text-left'>
        <Row className={'msbulle' + ' ' + styles.cardscolor}>
          <Col className='text-center'>
            {' '}
            <div className='opacity-6 mr-1'>
              {translate('Your_Address', localStorage.getItem('langage'))}:
            </div>
            <div data-testid='accountAddress'> {address}</div>
          </Col>
        </Row>{' '}
        <Row className=''>
          <Col className={'msbulle sm-5' + ' ' + styles.cardscolor}>
            <div>
              {network.egldLabel}{' '}
              {translate('Available', localStorage.getItem('langage'))}:
            </div>
            <div>
              <DappUI.Denominate
                value={account.balance}
                showLabel={false}
                data-testid='balance'
              />
            </div>
          </Col>
          <Col className='sm-2'></Col>
          <Col className={'msbulle sm-5' + ' ' + styles.cardscolor}>
            <div>
              {' '}
              {midIdentifier}{' '}
              {translate('Owned', localStorage.getItem('langage'))}:
            </div>
            <div>
              {' '}
              <DappUI.Denominate
                value={token.balance}
                showLabel={false}
                decimals={2}
                data-testid='balance'
              />
            </div>
          </Col>
        </Row>
        <Row className={'msbulle' + ' ' + styles.cardscolor}>
          <Col sm={10}>
            <Row>
              <Col sm={12}>
                {translate(
                  'Middle_Staking_presale',
                  localStorage.getItem('langage')
                )}{' '}
                :.
              </Col>
            </Row>{' '}
            <Row>
              <Col sm={12}>
                {translate(
                  'First_wave_supply',
                  localStorage.getItem('langage')
                )}{' '}
                :{' '}
                <DappUI.Denominate
                  value={midToSell}
                  decimals={2}
                  token={midIdentifier}
                  showLastNonZeroDecimal={false}
                  denomination={18}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12}>SC : {contractPresaleAddress}</Col>
            </Row>
            <Row className=''>
              <Col sm={6}>
                {translate('Starting_date', localStorage.getItem('langage'))} ;
                01/06/2021 21:00 PM UTC
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                {translate('Ending_date', localStorage.getItem('langage'))} :
                08/06/2021 21:00 PM UTC
              </Col>
            </Row>
          </Col>
          <Col className='' sm={2}>
            <LogoMsTicker className='logo-ms' />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopInfo;
