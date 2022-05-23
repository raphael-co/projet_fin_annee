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
  Query
} from '@elrondnetwork/erdjs';
import {
  faPlus,
  faMinus,
  faDollarSign,
  faPlay,
  faPause,
  faDownload
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  contractPresaleAddress,
  network,
  midIdentifier,
  midToBuy,
  midPrice,
  contractAdminAddress
} from 'config';

/*TODO:
getEgldAmount (NB d'EGLD dans le wallet)
getEsdtAmount (NB d'ESDT restant dans le wallet)
GET PRICE FROM SC vs CONFIG
GET QTE FROM SC vs CONFIG
*/

const Actions = () => {
  const account = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { address } = account;

  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);

  const /*transactionSessionId*/ [, setTransactionSessionId] = React.useState<
      string | null
    >(null);

  //SC-isAdmin
  React.useEffect(() => {
    const query = new Query({
      address: new Address(contractPresaleAddress),
      func: new ContractFunction('isAdmin'),
      args: [new AddressValue(new Address(address))]
    });
    const proxy = new ProxyProvider(network.apiAddress);
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setIsAdmin(false);
            break;
          case '':
            setIsAdmin(false);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            if (decoded == '01') {
              setIsAdmin(true);
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

  const { sendTransactions } = transactionServices;

  //SET ESDT numbers
  const ticker = Buffer.from(midIdentifier, 'utf8').toString('hex');
  const sendSetEsdtQuantityPerUnit = async () => {
    const buyTransaction = {
      value: '0',
      data: 'setEsdtQuantityPerUnit@' + ticker + '@3635c9adc5dea00000',
      receiver: contractPresaleAddress
    }; //3635c9adc5dea00000 = 1000 000000000000000000
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

  //SET EGLD number
  const sendSetPrice = async () => {
    const setPriceTransaction = {
      value: '0',
      data: 'setPrice@' + ticker + '@0de0b6b3a7640000',
      receiver: contractPresaleAddress
    }; //0de0b6b3a7640000 = 1 000000000000000000
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: setPriceTransaction,
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

  //Ajout admin
  const sendAddAdmin = async () => {
    const hex = new Address(contractAdminAddress).hex();
    const addAdminTransaction = {
      value: '0',
      data: 'addAdmin@' + hex,

      receiver: contractPresaleAddress
    }; //3635c9adc5dea00000
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: addAdminTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing add admin transaction',
        errorMessage: 'An error has occured during add admin',
        successMessage: 'add admin transaction successful',
        transactionDuration: 10000
      }
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  //suppression admin
  const sendRemoveAdmin = async () => {
    const hex = new Address(contractAdminAddress).hex();
    const removeAdminTransaction = {
      value: '0',
      data: 'removeAdmin@' + hex,
      receiver: contractPresaleAddress
    }; //3635c9adc5dea00000
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: removeAdminTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing add admin transaction',
        errorMessage: 'An error has occured during add admin',
        successMessage: 'add admin transaction successful',
        transactionDuration: 10000
      }
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  //start
  const sendStart = async () => {
    const startTransaction = {
      value: '0',
      data: 'setActive@01',
      receiver: contractPresaleAddress
    }; //3635c9adc5dea00000
    //true : 74727565
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: startTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing start transaction',
        errorMessage: 'An error has occured during start',
        successMessage: 'start transaction successful',
        transactionDuration: 10000
      }
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  //stop
  const sendStop = async () => {
    const stopTransaction = {
      value: '0',
      data: 'setActive@00',
      receiver: contractPresaleAddress
    }; //3635c9adc5dea00000
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: stopTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing stop transaction',
        errorMessage: 'An error has occured during stop',
        successMessage: 'stop transaction successful',
        transactionDuration: 10000
      }
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  //WidthdrawAllEgld
  const sendWidthdrawAllEgld = async () => {
    const widthdrawAllEgldTransaction = {
      value: '0',
      data: 'widthdrawAllEgld',
      receiver: contractPresaleAddress
    }; //3635c9adc5dea00000
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: widthdrawAllEgldTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing remove EGLD transaction',
        errorMessage: 'An error has occured during remove EGLD',
        successMessage: 'Remove EGLD transaction successful',
        transactionDuration: 10000
      }
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  //widthdrawAllEsdt
  const sendWidthdrawAllEsdt = async () => {
    const widthdrawAllEsdtTransaction = {
      value: '0',
      data: 'widthdrawAllEsdt@' + ticker,
      receiver: contractPresaleAddress
    }; //3635c9adc5dea00000
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: widthdrawAllEsdtTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing remove ESDT transaction',
        errorMessage: 'An error has occured during remove ESDT',
        successMessage: 'Remove ESDT transaction successful',
        transactionDuration: 10000
      }
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  return (
    <div className='d-flex mt-4 justify-content-center'>
      {isAdmin ? (
        <>
          {
            <>
              <div className='action-btn' onClick={sendAddAdmin}>
                <button className='btn'>
                  <FontAwesomeIcon icon={faPlus} className='text-primary' />
                </button>
                <a href='/' className='text-white text-decoration-none'>
                  addAdmin()
                </a>
              </div>
              <div className='action-btn' onClick={sendRemoveAdmin}>
                <button className='btn'>
                  <FontAwesomeIcon icon={faMinus} className='text-primary' />
                </button>
                <a href='/' className='text-white text-decoration-none'>
                  removeAdmin()
                </a>
              </div>
              <div className='action-btn' onClick={sendSetPrice}>
                <button className='btn'>
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className='text-primary'
                  />
                </button>
                <a href='/' className='text-white text-decoration-none'>
                  <DappUI.Denominate
                    value={midPrice}
                    decimals={2}
                    showLastNonZeroDecimal={false}
                    denomination={18}
                  />
                </a>
              </div>
              <div className='action-btn' onClick={sendSetEsdtQuantityPerUnit}>
                <button className='btn'>
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className='text-primary'
                  />
                </button>
                <a href='/' className='text-white text-decoration-none'>
                  <DappUI.Denominate
                    value={midToBuy}
                    decimals={2}
                    token={midIdentifier}
                    showLastNonZeroDecimal={false}
                    denomination={18}
                  />
                </a>
              </div>

              {!isActive ? (
                <>
                  {' '}
                  <div className='action-btn' onClick={sendStart}>
                    <button className='btn'>
                      <FontAwesomeIcon icon={faPlay} className='text-primary' />
                    </button>
                    <a href='/' className='text-white text-decoration-none'>
                      start
                    </a>
                  </div>
                </>
              ) : (
                <>
                  {' '}
                  <div className='action-btn' onClick={sendStop}>
                    <button className='btn'>
                      <FontAwesomeIcon
                        icon={faPause}
                        className='text-primary'
                      />
                    </button>
                    <a href='/' className='text-white text-decoration-none'>
                      pause
                    </a>
                  </div>
                </>
              )}

              <div className='action-btn' onClick={sendWidthdrawAllEgld}>
                <button className='btn'>
                  <FontAwesomeIcon icon={faDownload} className='text-primary' />
                </button>
                <a href='/' className='text-white text-decoration-none'>
                  widthdrawAllEgld()
                </a>
              </div>
              <div className='action-btn' onClick={sendWidthdrawAllEsdt}>
                <button className='btn'>
                  <FontAwesomeIcon icon={faDownload} className='text-primary' />
                </button>
                <a href='/' className='text-white text-decoration-none'>
                  widthdrawAllEsdt()
                </a>
              </div>
            </>
          }
        </>
      ) : (
        <h3 className='text-white'>User Is not Admin</h3>
      )}
    </div>
  );
};

export default Actions;
