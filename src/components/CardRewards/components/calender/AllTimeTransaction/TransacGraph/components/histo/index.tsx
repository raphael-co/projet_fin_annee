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
};
const Histo: React.FC<Props> = (data: Props) => {
  //affiche l'historique de touts les rewards
  const Histor = () => {
    try {
      return (
        <Container className={'text-white msbulle'}>
          <div className={styles.scroll}>
            {data.data.points.points.length > 0 ? (
              data.data.points.points.map((Ditem: any, Dindex: any) => (
                <Row className={styles.scrollTaille} key={Dindex}>
                  <Col className='sm-12'>
                    <Row>
                      <Col className='lead'>{Ditem}</Col>
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
                    {data.data.rewards.tx[Ditem] &&
                      data.data.rewards.tx[Ditem].map(
                        (item: string, index: number) => (
                          <Row
                            className='text-center'
                            key={Ditem + 'L' + index}
                          >
                            <Col>
                              <a
                                className='text-white'
                                target='_BLANK'
                                rel='noreferrer'
                                href={
                                  'https://explorer.elrond.com/transactions/' +
                                  data.data.rewards.tx[Ditem][index].txHash
                                }
                              >
                                {data.data.rewards.tx[Ditem][
                                  index
                                ].data.includes('unDelegate') ? (
                                  <>unDelegate</>
                                ) : (
                                  data.data.rewards.tx[Ditem][index].data
                                )}{' '}
                                <FontAwesomeIcon icon={faSearch} />
                              </a>
                            </Col>
                            <Col>
                              {denominated(
                                data.data.rewards.tx[Ditem][index].value
                              )}{' '}
                              {network.egldLabel}
                            </Col>
                            <Col>
                              {' '}
                              {denominated(
                                data.data.rewards.tx[Ditem][index].result
                              )}{' '}
                              {network.egldLabel}
                            </Col>
                          </Row>
                        )
                      )}
                  </Col>
                </Row>
              ))
            ) : (
              <>
                <div className={styles.value + ' ' + 'my-5'}>
                  <DappUI.PageState
                    icon={faExchangeAlt}
                    className='text-muted fa-3x'
                    title='vous n’avez jamais effectuée da transaction'
                  />
                </div>
              </>
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
  return Histor();
};

export default Histo;
