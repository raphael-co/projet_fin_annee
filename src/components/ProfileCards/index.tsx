import React, { FC } from 'react';
import { ReactNode, useEffect } from 'react';
import {
  DappUI,
  denominate,
  transactionServices,
  useGetAccountInfo
} from '@elrondnetwork/dapp-core';
import {
  ProxyProvider,
  Query,
  Address,
  ContractFunction,
  AddressValue,
  decodeUnsignedNumber,
  decodeString,
  decodeBigNumber
} from '@elrondnetwork/erdjs/out';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import moment from 'moment';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Logo from 'assets/Logo';
import Action from 'components/Action';
import useStakeData from 'components/Stake/hooks';
import { decimals, denomination, midIdentifier, network } from 'config';
import { useDispatch, useGlobalContext } from 'context';
import { UndelegateStakeListType } from 'context/state';
import { denominated } from 'helpers/denominate';
import modifiable from 'helpers/modifiable';
import { translate } from 'locale/local';

import styles from './styles.module.scss';

interface CardType {
  label: string;
  colors: Array<string>;
  data: any;
  title?: string;
  description?: string;
  modal?: ReactNode;
  icon: ReactNode;
  info?: any;
  unite?: any;
  bulle?: string;
}

const ProfileCards: FC = () => {
  const { userActiveStake, userClaimableRewards, undelegatedStakeList } =
    useGlobalContext();
  const { address, account } = useGetAccountInfo();
  const [token, setToken] = React.useState({
    name: '1',
    balance: '0',
    decimals: 0
  });

  const [herotag, setHerotag] = React.useState({
    username: '1'
  });

  const [price, setPrice] = React.useState(0);
  const [priceMid, setPriceMid] = React.useState(0);

  const dispatch = useDispatch();
  const { success, hasActiveTransactions } =
    transactionServices.useGetActiveTransactionsStatus();

  const getUndelegatedStakeList = async (): Promise<void> => {
    dispatch({
      type: 'getUndelegatedStakeList',
      undelegatedStakeList: {
        status: 'loading',
        data: null,
        error: null
      }
    });

    try {
      const provider = new ProxyProvider(network.gatewayAddress);
      const query = new Query({
        address: new Address(network.delegationContract),
        func: new ContractFunction('getUserUnDelegatedList'),
        args: [new AddressValue(new Address(account.address))]
      });

      const [data, config, status] = await Promise.all([
        provider.queryContract(query),
        provider.getNetworkConfig(),
        provider.getNetworkStatus()
      ]);

      const payload = data
        .outputUntyped()
        .reduce((total: any, item, index, array) => {
          if (index % 2 !== 0) {
            return total;
          } else {
            const next = array[index + 1];
            const getTime = (): number => {
              const epochsChangesRemaining = decodeUnsignedNumber(next);
              const roundsRemainingInEpoch =
                config.RoundsPerEpoch - status.RoundsPassedInCurrentEpoch;
              const roundEpochComplete =
                epochsChangesRemaining > 1
                  ? (epochsChangesRemaining - 1) * config.RoundsPerEpoch
                  : 0;

              return (
                moment().unix() +
                ((roundsRemainingInEpoch + roundEpochComplete) *
                  config.RoundDuration) /
                  1000
              );
            };

            const current = {
              timeLeft: decodeString(next) === '' ? 0 : getTime(),
              value: denominate({
                input: decodeBigNumber(item).toFixed(),
                decimals,
                denomination
              })
            };

            const exists = total.find(
              (withdrawal: UndelegateStakeListType) =>
                withdrawal.timeLeft === withdrawal.timeLeft
            );

            const value = exists
              ? (parseInt(exists.value) + parseInt(current.value)).toFixed()
              : 0;

            if (exists && current.timeLeft === exists.timeLeft) {
              return [
                ...(total.length > 1 ? total : []),
                {
                  ...exists,
                  value
                }
              ];
            } else {
              return [...total, current];
            }
          }
        }, []);

      dispatch({
        type: 'getUndelegatedStakeList',
        undelegatedStakeList: {
          status: 'loaded',
          error: null,
          data: payload.sort(
            (alpha: UndelegateStakeListType, beta: UndelegateStakeListType) =>
              alpha.timeLeft - beta.timeLeft
          )
        }
      });
    } catch (error) {
      dispatch({
        type: 'getUndelegatedStakeList',
        undelegatedStakeList: {
          status: 'error',
          data: null,
          error
        }
      });
    }
  };
  //recuperer les mid
  React.useEffect(() => {
    const fetchTokenList = async () => {
      const { data } = await axios(
        network.apiAddress + '/accounts/' + address + '/tokens/' + midIdentifier
      );
      setToken({
        name: data.name ? data.name : 'MID',
        balance: data.balance ? data.balance : 0,
        decimals: data.decimals ? data.decimals : 18
      });
    };

    const fetchHerotag = async () => {
      const { data } = await axios(
        network.apiAddress + '/accounts/' + address // recupe herotag
      );
      setHerotag({
        username: data.username ? data.username : 'null'
      });
    };
    fetchTokenList();
    fetchHerotag();
  }, [setToken, setHerotag]);

  const fetchFiat = () => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const pairs = await axios.get('https://api.elrond.com/mex-pairs', {
          cancelToken: source.token
        });

        const priceMids = pairs.data.find(
          (item: any) => item.baseId === 'MID-ecb7bf'
        );

        const prices = pairs.data.find(
          (item: any) => item.baseId === 'WEGLD-bd4d79'
        );
        setPrice(prices.basePrice);
        setPriceMid(priceMids.basePrice);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
      }
    };

    fetchData();
  };

  const withdrawalsCumulDispo = () => {
    try {
      if (undelegatedStakeList.data != null) {
        if (undelegatedStakeList.data.length == 1) {
          if (undelegatedStakeList.data[0].timeLeft == 0) {
            return undelegatedStakeList.data[0].value;
          } else {
            return 0;
          }
        }
        if (undelegatedStakeList.data.length > 1) {
          if (undelegatedStakeList.data[0].timeLeft == 0) {
            return undelegatedStakeList.data[0].value;
          } else {
            return 0;
          }
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    } catch {
      return 0;
    }
  };

  const withdrawalsCumul = () => {
    try {
      if (undelegatedStakeList.data != null) {
        if (undelegatedStakeList.data.length == 1) {
          return undelegatedStakeList.data[0].value;
        } else {
          return (
            Number(undelegatedStakeList.data[0].value) +
            Number(undelegatedStakeList.data[1].value)
          );
        }
      } else {
        return 0;
      }
    } catch {
      return 0;
    }
  };

  const withdrawalsCumulNonDispo = () => {
    try {
      if (undelegatedStakeList.data != null) {
        if (undelegatedStakeList.data.length == 1) {
          if (undelegatedStakeList.data[0].timeLeft != 0) {
            return undelegatedStakeList.data[0].value;
          } else {
            return 0;
          }
        } else {
          if (undelegatedStakeList.data[0].timeLeft != 0) {
            return (
              undelegatedStakeList.data[0].value +
              undelegatedStakeList.data[1].value
            );
          } else {
            return undelegatedStakeList.data[1].value;
          }
        }
      } else {
        return 0;
      }
    } catch {
      return 0;
    }
  };
  const CumuleEgld = () => {
    /// obligé de mettre /1000000000000000000 a la place de denominated car si le resulta est trop elever impossible de le mettre sous le format number
    return (
      Number(
        userActiveStake.data
          ? Number(Number(userActiveStake.data) / 1000000000000000000).toFixed(
              4
            )
          : 0
      ) +
      Number(userClaimableRewards.data) +
      Number(
        account.balance
          ? Number(account.balance / 1000000000000000000).toFixed(4)
          : 0
      ) +
      Number(withdrawalsCumul())
    );
  };

  const affHerotag = () => {
    try {
      if (herotag) {
        if (herotag.username == 'null') {
          return translate('No_Herotag', localStorage.getItem('langage'));
        }
        return herotag.username;
      } else
        return translate('No_Load_Herotag', localStorage.getItem('langage'));
    } catch {
      return translate('No_Load_Herotag', localStorage.getItem('langage'));
    }
  };
  useEffect(fetchFiat, []);
  const cards: Array<CardType> = [
    {
      label:
        translate('Total_of', localStorage.getItem('langage')) +
        ' ' +
        network.egldLabel,
      data: CumuleEgld().toFixed(4) + ' ' + network.egldLabel,
      colors: ['#2044F5', '#1B37C0'],
      icon: <Logo />,
      info: Number(
        Number(Number(CumuleEgld()) * price).toFixed(2)
      ).toLocaleString('en-US'),
      unite: '$',
      bulle: translate('Bubble_Total', localStorage.getItem('langage'))
    },
    {
      label: translate('Balance', localStorage.getItem('langage')),
      data: denominated(account.balance) + ' ' + network.egldLabel,
      colors: ['#6CADEF', '#5B96D2'],
      icon: <Logo />,
      info: Number(
        (Number(account.balance / 1000000000000000000) * price).toFixed(2)
      ).toLocaleString('en-US'),
      unite: '$',
      bulle:
        translate('Bubble_Balance_start', localStorage.getItem('langage')) +
        ' ' +
        network.egldLabel +
        ' ' +
        translate('Bubble_Balance_end', localStorage.getItem('langage'))
    },
    {
      label: translate('Staking', localStorage.getItem('langage')),
      data:
        userActiveStake.data != null
          ? denominated(userActiveStake.data) + ' ' + network.egldLabel
          : '0',
      colors: ['#36CA8C', '#2BA572'],
      icon: <Logo />,
      info:
        userActiveStake.data != null
          ? Number(
              (
                Number(Number(userActiveStake.data) / 1000000000000000000) *
                price
              ).toFixed(2)
            ).toLocaleString('en-US')
          : '0',
      unite: '$',
      bulle:
        translate('Bubble_Staking_start', localStorage.getItem('langage')) +
        ' ' +
        network.egldLabel +
        ' ' +
        translate('Bubble_Staking_end', localStorage.getItem('langage'))
    },

    {
      label: translate('Withdrawals', localStorage.getItem('langage')),
      data: Number(withdrawalsCumul()).toFixed(4) + ' ' + network.egldLabel,
      colors: ['#F3BF89', '#B68350'],
      icon: <Logo />,
      info: Number(
        (Number(withdrawalsCumul()) * price).toFixed(2)
      ).toLocaleString('en-US'),
      unite: '$',
      bulle:
        translate(
          'Bubbles_Withdrawals_start',
          localStorage.getItem('langage')
        ) +
        ' ' +
        network.egldLabel +
        ' ' +
        translate('Bubbles_Withdrawals_end', localStorage.getItem('langage'))
    },
    {
      label: translate(
        'Withdrawals_available',
        localStorage.getItem('langage')
      ),
      data:
        Number(withdrawalsCumulDispo()).toFixed(4) + ' ' + network.egldLabel,
      colors: ['#FBC34C', '#D49712'],
      icon: <Logo />,
      info: Number(
        (Number(withdrawalsCumulDispo()) * price).toFixed(2)
      ).toLocaleString('en-US'),
      unite: '$',
      bulle:
        translate(
          'Bubbles_Withdrawals_availables_start',
          localStorage.getItem('langage')
        ) +
        ' ' +
        network.egldLabel +
        ' ' +
        translate(
          'Bubbles_Withdrawals_availables_end',
          localStorage.getItem('langage')
        )
    },
    {
      label: translate(
        'Withdrawals_not_available',
        localStorage.getItem('langage')
      ),
      data:
        Number(withdrawalsCumulNonDispo()).toFixed(4) + ' ' + network.egldLabel,
      colors: ['#E48570', '#C25C45'],
      icon: <Logo />,
      info: Number(
        (Number(withdrawalsCumulNonDispo()) * price).toFixed(2)
      ).toLocaleString('en-US'),
      unite: '$',
      bulle:
        translate(
          'Bubbles_Withdrawals_not_availables_start',
          localStorage.getItem('langage')
        ) +
        ' ' +
        network.egldLabel +
        ' ' +
        translate(
          'Bubbles_Withdrawals_not_availables_end',
          localStorage.getItem('langage')
        )
    },
    {
      label: translate('Rewards', localStorage.getItem('langage')),
      data: Number(userClaimableRewards.data) + ' ' + network.egldLabel,
      colors: ['#2044F5', '#1B37C0'],
      icon: <Logo />,
      info: Number(
        (Number(userClaimableRewards.data) * price).toFixed(2)
      ).toLocaleString('en-US'),
      unite: '$',
      bulle: translate('Bubbles_Rewards', localStorage.getItem('langage'))
    },
    {
      label: translate('Total_Mid', localStorage.getItem('langage')),
      data: (
        <DappUI.Denominate
          value={token.balance}
          showLabel={false}
          data-testid='balance'
        />
      ),
      colors: ['#6CADEF', '#5B96D2'],
      icon: <Logo />,
      info: Number(
        ((Number(token.balance) / 1000000000000000000) * priceMid).toFixed(2)
      ).toLocaleString('en-US'),
      unite: '$',
      bulle: translate('Bubbles_Total_Mid', localStorage.getItem('langage'))
    },
    {
      label: translate('herotag', localStorage.getItem('langage')),
      data: affHerotag(),
      colors: ['#36CA8C', '#2BA572'],
      icon: <Logo />,
      info: 'herotag',
      unite: '',
      bulle: translate('Bubbles_herotag', localStorage.getItem('langage'))
    }
  ];
  useStakeData();

  const fetchUndelegatedStakeList = () => {
    if (!undelegatedStakeList.data) {
      getUndelegatedStakeList();
    }
  };

  const refetchUndelegatedStakeList = () => {
    if (hasActiveTransactions && success && undelegatedStakeList.data) {
      getUndelegatedStakeList();
    }
  };

  useEffect(fetchUndelegatedStakeList, [undelegatedStakeList.data]);
  useEffect(refetchUndelegatedStakeList, [hasActiveTransactions, success]);

  return (
    <div className={styles.cards}>
      {cards.map((card) => {
        const [alpha, beta] = card.colors;
        const background = `linear-gradient(180deg, ${alpha} 0%, ${beta} 100%)`;
        const interactive = card.modal && location.pathname === '/admin';

        return (
          <div key={card.label} className={styles.card} style={{ background }}>
            <div className={styles.heading}>
              <span>{card.label}</span>
              <OverlayTrigger
                placement='bottom'
                delay={{ show: 150, hide: 400 }}
                overlay={<Tooltip id='button-tooltip-2'>{card.bulle}</Tooltip>}
              >
                <div
                  style={{ fill: interactive ? beta : 'white' }}
                  className={modifiable(
                    'icon',
                    [interactive && 'fill'],
                    styles
                  )}
                >
                  {interactive ? (
                    <Action
                      render={card.modal}
                      title={card.title}
                      description={card.description}
                      trigger={
                        <span className={styles.trigger}>
                          <FontAwesomeIcon icon={faCog} size='lg' />
                        </span>
                      }
                    />
                  ) : (
                    card.icon
                  )}
                </div>
              </OverlayTrigger>
            </div>
            <div className={styles.value}>{card.data}</div>
            {card.info} <span>{card.unite}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileCards;
