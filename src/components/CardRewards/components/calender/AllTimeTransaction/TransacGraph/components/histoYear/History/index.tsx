import * as React from 'react';
import { DappUI } from '@elrondnetwork/dapp-core';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import { network } from 'config';
import { denominated } from 'helpers/denominate';
import { translate } from 'locale/local';

import styles from './styles.module.scss';

type Props = {
  data?: any;
  account?: any;
  points?: any;
  rewards?: any;
  Year?: any;
};

const month = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12'
];

const HistoryForOneYear: React.FC<Props> = (data: Props) => {
  //affiche l'historique de touts les rewards
  const HistoryForOneYears = () => {
    try {
      return (
        <Container className={'text-white msbulle'}>
          <div className={styles.scroll}>
            {month.map((i: any, MonthIndex: number) =>
              data.data.data.rewards.tx[data.Year + '-' + i] != null ? (
                <Row
                  className={styles.scrollTaille}
                  key={data.Year + '-' + i + 'L' + MonthIndex}
                >
                  <Col className='sm-12'>
                    <Row>
                      <Col className='lead'>{data.Year + '-' + i}</Col>
                    </Row>
                    <Row className='lead'>
                      <Col style={{ textAlign: 'center' }}>
                        {' '}
                        {translate(
                          'Action',
                          localStorage.getItem('langage')
                        )}{' '}
                      </Col>
                      <Col style={{ textAlign: 'center' }}>
                        {' '}
                        {translate(
                          'Value',
                          localStorage.getItem('langage')
                        )}{' '}
                      </Col>
                      <Col style={{ textAlign: 'center' }}>
                        {' '}
                        {translate(
                          'Earn',
                          localStorage.getItem('langage')
                        )}{' '}
                      </Col>
                    </Row>{' '}
                    <hr
                      style={{
                        height: '1px',
                        color: 'white',
                        backgroundColor: 'white',
                        marginTop: 0
                      }}
                    />
                    {data.data.data.rewards.tx[data.Year + '-' + i] &&
                      data.data.data.rewards.tx[data.Year + '-' + i].map(
                        (item: string, index: number) => (
                          <Row
                            className='text-center'
                            key={data.Year + '-' + i + 'L' + index}
                          >
                            <Col>
                              <a
                                className='text-white'
                                target='_BLANK'
                                rel='noreferrer'
                                href={
                                  'https://explorer.elrond.com/transactions/' +
                                  data.data.data.rewards.tx[
                                    data.Year + '-' + i
                                  ][index].txHash
                                }
                              >
                                {data.data.data.rewards.tx[data.Year + '-' + i][
                                  index
                                ].data.includes('unDelegate') ? (
                                  <>unDelegate</>
                                ) : (
                                  data.data.data.rewards.tx[
                                    data.Year + '-' + i
                                  ][index].data
                                )}{' '}
                                <FontAwesomeIcon icon={faSearch} />
                              </a>
                            </Col>
                            <Col>
                              {denominated(
                                data.data.data.rewards.tx[data.Year + '-' + i][
                                  index
                                ].value
                              )}{' '}
                              {network.egldLabel}
                            </Col>
                            <Col>
                              {' '}
                              {denominated(
                                data.data.data.rewards.tx[data.Year + '-' + i][
                                  index
                                ].result
                              )}{' '}
                              {network.egldLabel}
                            </Col>
                          </Row>
                        )
                      )}
                  </Col>
                </Row>
              ) : (
                ''
              )
            )}
          </div>
        </Container>
      );
    } catch (err) {
      return (
        <div className={styles.value + ' ' + 'my-5'}>
          <DappUI.PageState
            icon={faExchangeAlt}
            className='text-muted fa-3x'
            title={translate(
              'Error_message_loading_data',
              localStorage.getItem('langage')
            )}
          />
        </div>
      );
    }
  };
  return HistoryForOneYears();
};

export default HistoryForOneYear;
