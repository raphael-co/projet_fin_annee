import * as React from 'react';
import { DappUI } from '@elrondnetwork/dapp-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

import { Col, Container, Row } from 'react-bootstrap';
import { network } from 'config';
import { denominated } from 'helpers/denominate';
import { translate } from 'locale/local';
import styles from './styles.module.scss';
import '../../assets/sass/global.scss';
const Tokenomics = () => {
  const [contracts, setContracts] = React.useState({
    contracts: [
      {
        wallet_address_32:
          'erd1c3nfhvj5jgulw62yndr6fgh0fcmut34fful733tl998zpt9s2k5qrxumhs',
        contract_address_32:
          'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqyhllllsv4k7x2',
        staked: '0',
        serviceFee: '0',
        rewards: '0'
      }
    ],
    supply: [
      {
        id: '1',
        type: 'liquidity',
        amount: '0',
        txHash: ''
      }
    ],
    supply_sum: '',
    burn: [
      {
        id: '1',
        type: 'liquidity',
        amount: '0',
        txHash: ''
      }
    ],
    burn_sum: '',
    circulating: '',
    liquidity: {
      reserves0: '0',
      reserves1: '0',
      firstTokenPriceUSD: '0',
      lockedValueUSD: '0',
      ratio: '1:1000'
    }
  });

  React.useEffect(() => {
    const fetchTokenList = async () => {
      const { data } = await axios('https://api.middlestaking.fr/staking');

      setContracts({
        contracts: data.contracts ? data.contracts : [],
        supply: data.supply ? data.supply : [],
        supply_sum: data.supply_sum ? data.supply_sum : '0',
        burn: data.burn ? data.burn : [],
        burn_sum: data.burn_sum ? data.burn_sum : '0',
        circulating: data.circulating ? data.circulating : '0',
        liquidity: data.liquidity ? data.liquidity : ''
      });
    };
    fetchTokenList();
  }, [setContracts]);

  return (
    <div className={styles.dashboard}>
      {/* <div className='row'> */}
      <div className={'col-12 col-md-10 mx-auto' + ' ' + styles.colorborder}>
        <div className={'card' + ' ' + styles.colorborder}>
          <div className={'card-body p-1'}>
            <div
              className={
                'card rounded border-0 bg-primary' + ' ' + styles.colorborder
              }
            >
              <div className='card-body text-center p-4'>
                <Container className='text-white'>
                  <Row className={'sm-12 msbulle' + ' ' + styles.cardscolor}>
                    <Col>
                      {translate(
                        'Heading_Tokenomics',
                        localStorage.getItem('langage')
                      )}
                    </Col>
                  </Row>{' '}
                  {contracts.contracts ? (
                    contracts.contracts.map((item, index) => (
                      <Row
                        key={index}
                        className={'msbulle' + '  ' + styles.cardscolor}
                      >
                        <Col className='sm-12'>
                          <Row>
                            <Col className='lead'>
                              {translate(
                                'Staking_Position',
                                localStorage.getItem('langage')
                              )}{' '}
                              {'#' + (index + 1)}
                            </Col>
                          </Row>
                          <hr
                            style={{
                              height: '1px',
                              color: 'white',
                              backgroundColor: 'white',
                              marginTop: 0
                            }}
                          />
                          <Row>
                            <Col className='lead'>
                              {item.contract_address_32}
                            </Col>
                          </Row>{' '}
                          <Row>
                            <Col className='lead'>{item.wallet_address_32}</Col>
                          </Row>
                          <hr
                            style={{
                              height: '1px',
                              color: 'white',
                              backgroundColor: 'white',
                              marginTop: 0
                            }}
                          />
                          <Row className='lead'>
                            <Col>
                              {translate(
                                'Staked',
                                localStorage.getItem('langage')
                              )}
                            </Col>
                            <Col>
                              {translate(
                                'Rewards',
                                localStorage.getItem('langage')
                              )}
                            </Col>
                            <Col>
                              {translate(
                                'Service_Fees',
                                localStorage.getItem('langage')
                              )}
                            </Col>
                          </Row>
                          <Row className='lead'>
                            <Col>
                              {denominated(item.staked)} {network.egldLabel}
                            </Col>
                            <Col>
                              {' '}
                              {denominated(item.rewards)} {network.egldLabel}
                            </Col>
                            <Col>{Number(item.serviceFee) / 100} %</Col>
                          </Row>
                        </Col>
                      </Row>
                    ))
                  ) : (
                    <></>
                  )}{' '}
                  <Row className={'msbulle' + '  ' + styles.cardscolor}>
                    <Col className='sm-12'>
                      <Row>
                        <Col className='lead'>
                          {translate(
                            'DEX_Liquidity',
                            localStorage.getItem('langage')
                          )}{' '}
                          #1
                        </Col>
                      </Row>
                      <hr
                        style={{
                          height: '1px',
                          color: 'white',
                          backgroundColor: 'white',
                          marginTop: 0
                        }}
                      />
                      <Row>
                        <Col className='lead'>
                          erd1qqqqqqqqqqqqqpgqjs9xspq7usjfd37f3kty9y0q280kqnhl2jpsxh87wn
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
                      <Row>
                        <Col>
                          {denominated(contracts.liquidity.reserves1)}{' '}
                          {network.egldLabel}
                        </Col>
                        <Col> + </Col>
                        <Col>
                          {' '}
                          <Col>
                            <DappUI.Denominate
                              value={contracts.liquidity.reserves0}
                              token={'MID-ecb7bf'}
                              showLabel={true}
                              decimals={2}
                              data-testid='balance'
                            />
                          </Col>
                        </Col>
                      </Row>{' '}
                      <Row>
                        <Col>{contracts.liquidity.ratio} </Col>
                      </Row>
                      <Row>
                        <Col>
                          {translate(
                            'Locked_value',
                            localStorage.getItem('langage')
                          )}{' '}
                          : {contracts.liquidity.lockedValueUSD} $USD
                        </Col>
                      </Row>{' '}
                    </Col>
                  </Row>
                  <Row>
                    <Col className='sm-6'>
                      <Row className={'msbulle' + '  ' + styles.cardscolor}>
                        <Col className='sm-6'>
                          <Row>
                            <Col className='lead text-center'>
                              {translate(
                                'Emission',
                                localStorage.getItem('langage')
                              )}
                            </Col>
                          </Row>
                          <hr
                            style={{
                              height: '1px',
                              color: 'white',
                              backgroundColor: 'white',
                              marginTop: 0
                            }}
                          />
                          {contracts.supply ? (
                            contracts.supply.map((item, index) => (
                              <Row key={index}>
                                <Col className='lead text-center '>
                                  {item.txHash ? (
                                    <a
                                      className='text-white'
                                      target='_BLANK'
                                      rel='noreferrer'
                                      href={
                                        'https://explorer.elrond.com/transactions/' +
                                        item.txHash
                                      }
                                    >
                                      <FontAwesomeIcon icon={faSearch} />{' '}
                                      {item.type}
                                    </a>
                                  ) : (
                                    <>{item.type}</>
                                  )}
                                </Col>
                                <Col>
                                  {' '}
                                  <DappUI.Denominate
                                    value={item.amount}
                                    showLabel={true}
                                    decimals={2}
                                    token={'MID-ecb7bf'}
                                    data-testid='balance'
                                  />
                                </Col>
                              </Row>
                            ))
                          ) : (
                            <></>
                          )}
                        </Col>
                      </Row>
                    </Col>
                    <Col className='sm-6'>
                      <Row className={'msbulle' + '  ' + styles.cardscolor}>
                        <Col className='sm-6'>
                          <Row>
                            <Col className='lead text-center'>
                              {translate(
                                'Destruction',
                                localStorage.getItem('langage')
                              )}
                            </Col>
                          </Row>
                          <hr
                            style={{
                              height: '1px',
                              color: 'white',
                              backgroundColor: 'white',
                              marginTop: 0
                            }}
                          />
                          {contracts.burn ? (
                            contracts.burn.map((item, index) => (
                              <Row key={index}>
                                <Col className='lead text-center '>
                                  {item.txHash ? (
                                    <a
                                      className='text-white'
                                      target='_BLANK'
                                      rel='noreferrer'
                                      href={
                                        'https://explorer.elrond.com/transactions/' +
                                        item.txHash
                                      }
                                    >
                                      <FontAwesomeIcon icon={faSearch} />{' '}
                                      {item.type}
                                    </a>
                                  ) : (
                                    <>{item.type}</>
                                  )}
                                </Col>
                                <Col>
                                  {' '}
                                  <DappUI.Denominate
                                    value={item.amount}
                                    showLabel={true}
                                    decimals={2}
                                    token={'MID-ecb7bf'}
                                    data-testid='balance'
                                  />
                                </Col>
                              </Row>
                            ))
                          ) : (
                            <></>
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col className={'msbulle' + '  ' + styles.cardscolor}>
                      <DappUI.Denominate
                        value={contracts.supply_sum}
                        showLabel={true}
                        decimals={2}
                        token={'MID-ecb7bf'}
                        data-testid='balance'
                      />
                    </Col>
                    <Col className={'msbulle' + '  ' + styles.cardscolor}>
                      {' '}
                      <DappUI.Denominate
                        value={contracts.burn_sum}
                        showLabel={true}
                        decimals={2}
                        token={'MID-ecb7bf'}
                        data-testid='balance'
                      />
                    </Col>
                  </Row>{' '}
                  <Row className={'sm-12 msbulle' + '  ' + styles.cardscolor}>
                    <Col className='lead text-center'>
                      {translate(
                        'Circulating',
                        localStorage.getItem('langage')
                      )}{' '}
                      :
                    </Col>
                    <Col>
                      {' '}
                      <DappUI.Denominate
                        value={contracts.circulating}
                        token={'MID-ecb7bf'}
                        showLabel={true}
                        decimals={2}
                        data-testid='balance'
                      />
                    </Col>
                  </Row>
                </Container>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;
