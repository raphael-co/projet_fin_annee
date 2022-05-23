import * as React from 'react';

import {
  transactionServices,
  useGetAccountInfo,
  useGetPendingTransactions,
  refreshAccount,
  DappUI
} from '@elrondnetwork/dapp-core';
import {
  Address,
  AddressValue,
  ContractFunction,
  ProxyProvider,
  Query,
  TokenIdentifierValue
} from '@elrondnetwork/erdjs';
import { faCheck, faPause, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, ProgressBar, Row, Button } from 'react-bootstrap';

import {
  contractPresaleAddress,
  network,
  midIdentifier,
  midToSell
} from 'config';
import { denominated } from 'helpers/denominate';
import { translate } from 'locale/local';
import styles from '.././styles.module.scss';

/*TODO : 
nothing ? but style
tester le solde utilisateur
*/

const Actions = () => {
  // eslint-disable-next-line
  const { address, account } = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { sendTransactions } = transactionServices;
  const [tokensLeft, setTokensLeft] = React.useState<string>('0');
  const [tokensPrice, setTokensPrice] = React.useState<string>('0');
  const [tokensQty, setTokensQty] = React.useState<string>('0');
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [hasBuyed, setHasBuyed] = React.useState<boolean>(false);
  const [hasPing, setHasPing] = React.useState<boolean>();
  const /*transactionSessionId*/ [, setTransactionSessionId] = React.useState<
      string | null
    >(null);

  //SC-READ ESDT LEFT
  React.useEffect(() => {
    const query = new Query({
      address: new Address(contractPresaleAddress),
      func: new ContractFunction('getEsdtAmount'),
      args: [new TokenIdentifierValue(Buffer.from(midIdentifier))]
    });
    const proxy = new ProxyProvider(network.apiAddress);
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setHasPing(true);
            break;
          case '':
            setHasPing(false);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setTokensLeft(
              parseInt(decoded, 16).toLocaleString('fullwide', {
                useGrouping: false
              })
            );
            setHasPing(false);
            break;
          }
        }
      })
      .catch((err) => {
        console.error('Unable to call VM query', err);
      });
  }, [hasPendingTransactions]);

  //SC-READ actif
  React.useEffect(() => {
    const query = new Query({
      address: new Address(contractPresaleAddress),
      func: new ContractFunction('active'),
      args: []
    });
    const proxy = new ProxyProvider(network.apiAddress);
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setIsActive(false);
            break;
          case '':
            setIsActive(false);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            if (decoded == '01') {
              setIsActive(true);
            }
            break;
          }
        }
      })
      .catch((err) => {
        console.error('Unable to call VM query', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPendingTransactions]);

  //SC-READ USERS hasBuyed
  React.useEffect(() => {
    const query = new Query({
      address: new Address(contractPresaleAddress),
      func: new ContractFunction('esdtHasBeenBoughtByUser'),
      args: [
        new TokenIdentifierValue(Buffer.from(midIdentifier)),
        new AddressValue(new Address(address))
      ]
    });
    const proxy = new ProxyProvider(network.apiAddress);
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;

        switch (encoded) {
          case undefined:
            setHasPing(true);
            setHasBuyed(false);
            break;
          case '':
            setHasPing(false);
            setHasBuyed(false);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            if (decoded == '01') {
              setHasBuyed(true);
            }
            setHasPing(false);
            break;
          }
        }
      })
      .catch((err) => {
        console.error('Unable to call VM query', err);
      });
  }, [hasPendingTransactions]);

  //SC-READ PRICE
  React.useEffect(() => {
    const query = new Query({
      address: new Address(contractPresaleAddress),
      func: new ContractFunction('price'),
      args: [new TokenIdentifierValue(Buffer.from(midIdentifier))]
    });
    const proxy = new ProxyProvider(network.apiAddress);
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setHasPing(true);
            break;
          case '':
            setHasPing(false);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setTokensPrice(
              parseInt(decoded, 16).toLocaleString('fullwide', {
                useGrouping: false
              })
            );
            setHasPing(false);
            break;
          }
        }
      })
      .catch((err) => {
        console.error('Unable to call VM query', err);
      });
  }, [hasPendingTransactions]);

  //SC-READ QTY
  React.useEffect(() => {
    const query = new Query({
      address: new Address(contractPresaleAddress),
      func: new ContractFunction('esdtQuantityPerUnit'),
      args: [new TokenIdentifierValue(Buffer.from(midIdentifier))]
    });
    const proxy = new ProxyProvider(network.apiAddress);
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setHasPing(true);
            break;
          case '':
            setHasPing(false);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setTokensQty(
              parseInt(decoded, 16).toLocaleString('fullwide', {
                useGrouping: false
              })
            );
            setHasPing(false);
            break;
          }
        }
      })
      .catch((err) => {
        console.error('Unable to call VM query', err);
      });
  }, [hasPendingTransactions]);

  //BUY ACTION BUTTON
  const ticker = Buffer.from(midIdentifier, 'utf8').toString('hex');
  const sendBuyTransaction = async () => {
    const buyTransaction = {
      value: tokensPrice,
      data: 'buyEsdt@' + ticker,
      receiver: contractPresaleAddress
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: buyTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Buy transaction',
        errorMessage: 'An error has occured during buy',
        successMessage: 'Buy transaction successful',
        transactionDuration: 10000
      }
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  //IS BUY ALLOWED ?
  const buyAllowed =
    tokensLeft > tokensQty && !hasPendingTransactions && isActive && !hasBuyed;
  const notAllowedClass = buyAllowed ? '' : 'not-allowed disabled';

  return (
    <div
      className={
        'd-flex mt-4 justify-content-center reset msbulle' +
        ' ' +
        styles.cardscolor
      }
    >
      <div className='card-body text-center p-4 text-white'>
        <Container>
          {' '}
          <Row
            style={{
              margin: 15
            }}
          >
            <Col>
              {translate(
                'Explanation_tokenomics_page',
                localStorage.getItem('langage')
              )}
            </Col>
          </Row>
          <Row
            className='text-center'
            style={{
              margin: 10
            }}
          >
            <Col>
              {translate('CURRENT_PRICE', localStorage.getItem('langage'))} :{' '}
              {denominated(tokensPrice)} {network.egldLabel}
            </Col>
            <Col>
              {translate('QTY_RECEIVED', localStorage.getItem('langage'))} :{' '}
              <DappUI.Denominate
                value={tokensQty}
                decimals={2}
                token={midIdentifier}
                showLastNonZeroDecimal={false}
                denomination={18}
              />{' '}
            </Col>
          </Row>{' '}
          <Row>
            <Col>
              <h3>
                <DappUI.Denominate
                  value={tokensLeft}
                  decimals={2}
                  token={midIdentifier}
                  showLastNonZeroDecimal={false}
                  denomination={18}
                  showLabel={true}
                />{' '}
                {translate('left_in_SC', localStorage.getItem('langage'))}
              </h3>
            </Col>
          </Row>
          <Row className='text-center'>
            <Col>
              <ProgressBar
                animated
                now={
                  ((parseInt(midToSell) - parseInt(tokensLeft)) * 100) /
                  parseInt(midToSell)
                }
                label={`${(
                  ((parseInt(midToSell) - parseInt(tokensLeft)) * 100) /
                  parseInt(midToSell)
                ).toFixed(2)}% sold`}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              {hasPing !== undefined && (
                <div className='card-body text-center p-4'>
                  {buyAllowed ? (
                    <>
                      <div className='primary' onClick={sendBuyTransaction}>
                        <Button
                          className='btn'
                          variant='light'
                          size='lg'
                          style={{}}
                        >
                          {translate('Buy', localStorage.getItem('langage'))}{' '}
                          <DappUI.Denominate
                            value={tokensQty}
                            decimals={2}
                            token={midIdentifier}
                            showLastNonZeroDecimal={false}
                            denomination={18}
                          />{' '}
                          {translate('For', localStorage.getItem('langage'))}{' '}
                          <DappUI.Denominate
                            value={tokensPrice}
                            decimals={2}
                            showLastNonZeroDecimal={false}
                            denomination={18}
                          />{' '}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='d-flex flex-column'>
                        <div
                          {...{
                            className: `action-btn ${notAllowedClass}`,
                            ...(buyAllowed
                              ? { onClick: sendBuyTransaction }
                              : {})
                          }}
                        >
                          <button className={`btn ${notAllowedClass}`}>
                            <FontAwesomeIcon
                              icon={
                                !isActive
                                  ? faPause
                                  : tokensLeft > tokensQty
                                  ? faCheck
                                  : faTimes
                              }
                              className='text-primary'
                            />
                          </button>
                          <span className='text-white'>
                            {tokensLeft > tokensQty ? (
                              <a
                                href='#'
                                className='text-white text-decoration-none'
                              >
                                {!isActive ? (
                                  <>
                                    {' '}
                                    {translate(
                                      'Contract_is_Paused',
                                      localStorage.getItem('langage')
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {hasBuyed ? (
                                      <>
                                        {translate(
                                          'You_already_bought_with_this_account',
                                          localStorage.getItem('langage')
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        {translate(
                                          'Processing',
                                          localStorage.getItem('langage')
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </a>
                            ) : (
                              <>
                                {!isActive ? (
                                  <>
                                    {translate(
                                      'Contract_is_Paused',
                                      localStorage.getItem('langage')
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {hasBuyed ? (
                                      <>
                                        {translate(
                                          'You_already_bought_with_this_account',
                                          localStorage.getItem('langage')
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        {translate(
                                          'No_token_left_in_SC',
                                          localStorage.getItem('langage')
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Actions;
