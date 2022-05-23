import React from 'react';
import { useGetAccountInfo, DappUI } from '@elrondnetwork/dapp-core';
import moment from 'moment';
import { network } from 'config';
import { translate } from 'locale/local';
import styles from '.././styles.module.scss';

import StatusIcon from './StatusIcon';
import txStatus from './txStatus';
import { TransactionType } from './types';

function sortByDate(a: TransactionType, b: TransactionType) {
  if (a.timestamp < b.timestamp) {
    return 1;
  }
  if (a.timestamp > b.timestamp) {
    return -1;
  }
  return 0;
}

const fakeSender =
  'erd000000000000000000000000000000000000000000000000000000000a';

const TransactionList = ({
  transactions
}: {
  transactions: TransactionType[];
}) => {
  const account = useGetAccountInfo();
  const incoming = (sender: string) =>
    sender === account.address && sender !== fakeSender;

  // eslint-disable-next-line
  const doubleOwnTransactions = transactions
    .filter((tx) => tx.sender === tx.receiver && tx.blockHash !== '')
    .map((tx) => ({ ...tx, sender: fakeSender, timestamp: tx.timestamp + 1 }));

  const sortedTransactions: TransactionType[] = (
    [
      ...transactions,
      ...(doubleOwnTransactions.length > 0 ? doubleOwnTransactions : [])
    ].filter((el: any) => el !== undefined) as any
  ).sort(sortByDate);

  return (
    <div className={'p-3 mt-3' + ' ' + styles.cardscolor}>
      <h4 className='mb-3 font-weight-normal' style={{ color: 'white' }}>
        {translate(
          'Error_message_loading_data',
          localStorage.getItem('langage')
        )}
      </h4>
      <div className='table-responsive'>
        <table className='transactions table pb-3' style={{ color: 'white' }}>
          <thead>
            <tr className=''>
              <th className='border-0 font-weight-normal text-center'></th>
              <th className='border-0 font-weight-normal text-center'>
                {translate('Tx_hash', localStorage.getItem('langage'))}
              </th>
              <th className='border-0 font-weight-normal text-center'>
                {translate('Date', localStorage.getItem('langage'))}
              </th>
              <th className='border-0 font-weight-normal text-center'>
                {translate('Amount', localStorage.getItem('langage'))}
              </th>
            </tr>
          </thead>
          <tbody data-testid='transactionsList'>
            {sortedTransactions.map((tx: TransactionType, i) => {
              const incomingTransaction = incoming(tx.sender);

              return (
                <tr key={tx.txHash + i}>
                  <td className='text-center'>
                    <div
                      className='transaction-icon bg-light d-flex align-items-center justify-content-center'
                      title={txStatus[tx.status]}
                    >
                      <StatusIcon
                        tx={tx}
                        incomingTransaction={incomingTransaction}
                      />
                    </div>
                  </td>
                  <td className='transaction-hash text-center'>
                    <a
                      style={{ color: 'white' }}
                      href={`${network.explorerAddress}/transactions/${tx.txHash}`}
                      {...{
                        target: '_blank'
                      }}
                      title='View in Explorer'
                    >
                      {/* <Ui.Trim data-testid='txHash' text={tx.txHash} /> */}
                      {tx.txHash.slice(0, 4) +
                        '....' +
                        tx.txHash.slice(
                          tx.txHash.length - 4,
                          tx.txHash.length - 0
                        )}
                    </a>
                  </td>
                  <td className=' text-center'>
                    {moment.unix(tx.timestamp).format('MMM Do YYYY, h:mm A')}
                  </td>
                  <td className='text-center'>
                    {tx.value === '0' ? (
                      ''
                    ) : (
                      <>{tx.sender === account.address ? '-' : '+'}</>
                    )}
                    <DappUI.Denominate value={tx.value} decimals={2} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='d-flex justify-content-center'>
        <a
          style={{ color: 'white' }}
          href={`${network.explorerAddress}/address/${account.address}`}
          {...{
            target: '_blank'
          }}
        >
          {translate('See_all_transactions', localStorage.getItem('langage'))}
        </a>
      </div>
    </div>
  );
};

export default TransactionList;
