import * as React from 'react';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core';
import { Col, Row } from 'react-bootstrap';
import { translate } from 'locale/local';
import styles from './styles.module.scss';

type Props = {
  data?: any;
};

const Cardfooting: React.FC<Props> = (data: Props) => {
  const { address } = useGetAccountInfo();
  const noRewardsLastYear = () => {
    if (data.data.rewards == '0') {
      if (data.data.address == null) {
        return (
          <Row className={'msbulle' + ' ' + styles.cardfooting}>
            <Col>
              {translate('No_Rewards', localStorage.getItem('langage'))}{' '}
              {address}{' '}
              {translate('in_2021_or_2022', localStorage.getItem('langage'))}
            </Col>
          </Row>
        );
      } else {
        <Row className={'msbulle' + ' ' + styles.cardfooting}>
          <Col>
            {translate('No_Rewards', localStorage.getItem('langage'))}{' '}
            {data.data.address}{' '}
            {translate('in_2021_or_2022', localStorage.getItem('langage'))}
          </Col>
        </Row>;
      }
    } else {
      return;
    }
  };
  return <>{noRewardsLastYear()}</>;
};

export default Cardfooting;
