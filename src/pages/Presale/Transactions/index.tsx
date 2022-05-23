import React from 'react';
import {
  useGetAccountInfo,
  DappUI,
  transactionServices,
  refreshAccount
} from '@elrondnetwork/dapp-core';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { getTransactions } from 'apiRequests';
import { contractPresaleAddress, network } from 'config';
import { translate } from 'locale/local';
import TransactionsList from './TransactionsList';
import { StateType } from './types';

const Transactions = () => {
  const { apiAddress } = network;
  const { success, hasActiveTransactions } =
    transactionServices.useGetActiveTransactionsStatus();

  const [state, setState] = React.useState<StateType>({
    transactions: [],
    transactionsFetched: undefined
  });

  const account = useGetAccountInfo();
  const fetchData = () => {
    if (success || !hasActiveTransactions) {
      getTransactions({
        apiAddress,
        address: account.address,
        timeout: 3000,
        contractAddress: contractPresaleAddress
      }).then(({ data }) => {
        refreshAccount();
        setState({
          transactions: data,
          transactionsFetched: success
        });
      });
    }
  };

  React.useEffect(fetchData, [success]);

  const { transactions } = state;

  try {
    return transactions.length > 0 ? (
      <TransactionsList transactions={transactions} />
    ) : (
      <div className='my-5'>
        <DappUI.PageState
          icon={faExchangeAlt}
          className='text-muted fa-3x'
          title={translate('No_Transactions', localStorage.getItem('langage'))}
        />
      </div>
    );
  } catch (err) {
    return (
      <div className='my-5'>
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

export default Transactions;
