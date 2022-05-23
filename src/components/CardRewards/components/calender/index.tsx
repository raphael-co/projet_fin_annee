import * as React from 'react';

import { BiArrowBack } from 'react-icons/bi';
import { network } from 'config';
import { denominated } from 'helpers/denominate';
import { translate } from 'locale/local';
import AllTimeTransaction from './AllTimeTransaction';

import styles from './styles.module.scss';
import TransactionMonth from './TransactionMonth';

// types les elements que l'on reçoit du parent
type Props = {
  data?: string;
  tabYear?: [];
  account?: any;
  points?: any;
  rewards?: any;
  showTransaction?: any;
  graphique?: any;
  setShowTransaction?: any;
  setGraphique?: any;
  setYear?: any;
  setUnderMenuAllTime?: any;
  underMenuAllTime?: any;
  setShowOneYear?: any;
  showOneYear?: any;
};

interface CardType {
  month?: string;
  year?: string;
  onClick?: () => void;
  colors: Array<string>;
  data: string;
  title?: string;
  description?: string;
}

// data : Props = a tte les infos reçut du parent
const Calender: React.FC<Props> = (data: Props) => {
  //tableau qui affihe le calendrier des mois
  const calender: Array<CardType> = [
    {
      colors: ['#2044F5', '#1B37C0'],
      month: translate('January', localStorage.getItem('langage')),
      data:
        data.rewards.tx[data.data + '-01'.toString()] !== undefined
          ? data.rewards.tx[data.data + '-01'.toString()].length != 1
            ? data.rewards.tx[data.data + '-01']
                .reduce(
                  (stackValueTotal: any, currentValue: any) =>
                    Number(stackValueTotal) +
                    Number(denominated(currentValue.result)),
                  0
                )
                .toFixed(2) +
              ' ' +
              network.egldLabel
            : Number(
                denominated(
                  data.rewards.tx[data.data + '-01'.toString()][0].result
                )
              ) +
              ' ' +
              network.egldLabel
          : 0 + ' ' + network.egldLabel,
      onClick: () => data.setShowTransaction({ show: true, month: '01' })
    },
    {
      colors: ['#6CADEF', '#5B96D2'],
      month: translate('February', localStorage.getItem('langage')),
      data:
        data.rewards.tx[data.data + '-02'.toString()] !== undefined
          ? data.rewards.tx[data.data + '-02'.toString()].length != 1
            ? data.rewards.tx[data.data + '-02']
                .reduce(
                  (stackValueTotal: any, currentValue: any) =>
                    Number(stackValueTotal) +
                    Number(denominated(currentValue.result)),
                  0
                )
                .toFixed(2) +
              ' ' +
              network.egldLabel
            : Number(
                denominated(
                  data.rewards.tx[data.data + '-02'.toString()][0].result
                )
              ).toFixed(2) +
              ' ' +
              network.egldLabel
          : 0 + ' ' + network.egldLabel,
      onClick: () => data.setShowTransaction({ show: true, month: '02' })
    },
    {
      colors: ['#36CA8C', '#2BA572'],
      month: translate('March', localStorage.getItem('langage')),
      data:
        data.rewards.tx[data.data + '-03'.toString()] !== undefined
          ? data.rewards.tx[data.data + '-03'.toString()].length != 1
            ? data.rewards.tx[data.data + '-03']
                .reduce(
                  (stackValueTotal: any, currentValue: any) =>
                    Number(stackValueTotal) +
                    Number(denominated(currentValue.result)),
                  0
                )
                .toFixed(2) +
              ' ' +
              network.egldLabel
            : Number(
                denominated(
                  data.rewards.tx[data.data + '-03'.toString()][0].result
                )
              ).toFixed(2) +
              ' ' +
              network.egldLabel
          : 0 + ' ' + network.egldLabel,
      onClick: () => data.setShowTransaction({ show: true, month: '03' })
    },
    {
      colors: ['#2044F5', '#1B37C0'],
      month: translate('April', localStorage.getItem('langage')),
      data:
        data.rewards.tx[data.data + '-04'.toString()] !== undefined
          ? data.rewards.tx[data.data + '-04'.toString()].length != 1
            ? data.rewards.tx[data.data + '-04']
                .reduce(
                  (stackValueTotal: any, currentValue: any) =>
                    Number(stackValueTotal) +
                    Number(denominated(currentValue.result)),
                  0
                )
                .toFixed(2) +
              ' ' +
              network.egldLabel
            : Number(
                denominated(
                  data.rewards.tx[data.data + '-04'.toString()][0].result
                )
              ).toFixed(2) +
              ' ' +
              network.egldLabel
          : 0 + ' ' + network.egldLabel,
      onClick: () => data.setShowTransaction({ show: true, month: '04' })
    },
    {
      colors: ['#6CADEF', '#5B96D2'],
      month: translate('May', localStorage.getItem('langage')),
      data:
        data.rewards.tx[data.data + '-05'.toString()] !== undefined
          ? data.rewards.tx[data.data + '-05'.toString()].length != 1
            ? data.rewards.tx[data.data + '-05']
                .reduce(
                  (stackValueTotal: any, currentValue: any) =>
                    Number(stackValueTotal) +
                    Number(denominated(currentValue.result)),
                  0
                )
                .toFixed(2) +
              ' ' +
              network.egldLabel
            : Number(
                denominated(
                  data.rewards.tx[data.data + '-05'.toString()][0].result
                )
              ).toFixed(2) +
              ' ' +
              network.egldLabel
          : 0 + ' ' + network.egldLabel,
      onClick: () => data.setShowTransaction({ show: true, month: '05' })
    },
    {
      colors: ['#36CA8C', '#2BA572'],
      month: translate('June', localStorage.getItem('langage')),
      data:
        data.rewards.tx[data.data + '-06'.toString()] !== undefined
          ? data.rewards.tx[data.data + '-06'.toString()].length != 1
            ? data.rewards.tx[data.data + '-06']
                .reduce(
                  (stackValueTotal: any, currentValue: any) =>
                    Number(stackValueTotal) +
                    Number(denominated(currentValue.result)),
                  0
                )
                .toFixed(2) +
              ' ' +
              network.egldLabel
            : Number(
                denominated(
                  data.rewards.tx[data.data + '-06'.toString()][0].result
                )
              ).toFixed(2) +
              ' ' +
              network.egldLabel
          : 0 + ' ' + network.egldLabel,
      onClick: () => data.setShowTransaction({ show: true, month: '06' })
    },
    {
      colors: ['#2044F5', '#1B37C0'],
      month: translate('July', localStorage.getItem('langage')),
      data:
        data.rewards.tx[data.data + '-07'.toString()] !== undefined
          ? data.rewards.tx[data.data + '-07'.toString()].length != 1
            ? data.rewards.tx[data.data + '-07']
                .reduce(
                  (stackValueTotal: any, currentValue: any) =>
                    Number(stackValueTotal) +
                    Number(denominated(currentValue.result)),
                  0
                )
                .toFixed(2) +
              ' ' +
              network.egldLabel
            : Number(
                denominated(
                  data.rewards.tx[data.data + '-07'.toString()][0].result
                )
              ).toFixed(2) +
              ' ' +
              network.egldLabel
          : 0 + ' ' + network.egldLabel,
      onClick: () => data.setShowTransaction({ show: true, month: '07' })
    },
    {
      colors: ['#6CADEF', '#5B96D2'],
      month: translate('August', localStorage.getItem('langage')),
      data:
        data.rewards.tx[data.data + '-08'.toString()] !== undefined
          ? data.rewards.tx[data.data + '-08'.toString()].length != 1
            ? data.rewards.tx[data.data + '-08']
                .reduce(
                  (stackValueTotal: any, currentValue: any) =>
                    Number(stackValueTotal) +
                    Number(denominated(currentValue.result)),
                  0
                )
                .toFixed(2) +
              ' ' +
              network.egldLabel
            : Number(
                denominated(
                  data.rewards.tx[data.data + '-08'.toString()][0].result
                )
              ).toFixed(2) +
              ' ' +
              network.egldLabel
          : 0 + ' ' + network.egldLabel,
      onClick: () => data.setShowTransaction({ show: true, month: '08' })
    },
    {
      colors: ['#36CA8C', '#2BA572'],
      month: translate('September', localStorage.getItem('langage')),
      data:
        data.rewards.tx[data.data + '-09'.toString()] !== undefined
          ? data.rewards.tx[data.data + '-09'.toString()].length != 1
            ? data.rewards.tx[data.data + '-09']
                .reduce(
                  (stackValueTotal: any, currentValue: any) =>
                    Number(stackValueTotal) +
                    Number(denominated(currentValue.result)),
                  0
                )
                .toFixed(2) +
              ' ' +
              network.egldLabel
            : Number(
                denominated(
                  data.rewards.tx[data.data + '-09'.toString()][0].result
                )
              ).toFixed(2) +
              ' ' +
              network.egldLabel
          : 0 + ' ' + network.egldLabel,
      onClick: () => data.setShowTransaction({ show: true, month: '09' })
    },
    {
      colors: ['#2044F5', '#1B37C0'],
      month: translate('October', localStorage.getItem('langage')),
      data:
        data.rewards.tx[data.data + '-10'.toString()] !== undefined
          ? data.rewards.tx[data.data + '-10'.toString()].length != 1
            ? data.rewards.tx[data.data + '-10']
                .reduce(
                  (stackValueTotal: any, currentValue: any) =>
                    Number(stackValueTotal) +
                    Number(denominated(currentValue.result)),
                  0
                )
                .toFixed(2) +
              ' ' +
              network.egldLabel
            : Number(
                denominated(
                  data.rewards.tx[data.data + '-10'.toString()][0].result
                )
              ).toFixed(2) +
              ' ' +
              network.egldLabel
          : 0 + ' ' + network.egldLabel,
      onClick: () => data.setShowTransaction({ show: true, month: '10' })
    },
    {
      colors: ['#6CADEF', '#5B96D2'],
      month: translate('November', localStorage.getItem('langage')),

      data:
        data.rewards.tx[data.data + '-11'.toString()] !== undefined
          ? data.rewards.tx[data.data + '-11'.toString()].length != 1
            ? data.rewards.tx[data.data + '-11']
                .reduce(
                  (stackValueTotal: any, currentValue: any) =>
                    Number(stackValueTotal) +
                    Number(denominated(currentValue.result)),
                  0
                )
                .toFixed(2) +
              ' ' +
              network.egldLabel
            : Number(
                denominated(
                  data.rewards.tx[data.data + '-11'.toString()][0].result
                )
              ).toFixed(2) +
              ' ' +
              network.egldLabel
          : 0 + ' ' + network.egldLabel,
      onClick: () => data.setShowTransaction({ show: true, month: '11' })
    },
    {
      colors: ['#36CA8C', '#2BA572'],
      month: translate('December', localStorage.getItem('langage')),
      data:
        data.rewards.tx[data.data + '-12'.toString()] !== undefined
          ? data.rewards.tx[data.data + '-12'.toString()].length != 1
            ? data.rewards.tx[data.data + '-12']
                .reduce(
                  (stackValueTotal: any, currentValue: any) =>
                    Number(stackValueTotal) +
                    Number(denominated(currentValue.result)),
                  0
                )
                .toFixed(2) +
              ' ' +
              network.egldLabel
            : Number(
                denominated(
                  data.rewards.tx[data.data + '-12'.toString()][0].result
                )
              ).toFixed(2) +
              ' ' +
              network.egldLabel
          : 0 + ' ' + network.egldLabel,
      onClick: () => data.setShowTransaction({ show: true, month: '12' })
    }
  ];
  // showTransac et showCalender permet d'afficher le calender ou les rewards du moi selectionné

  const showTransac = () => {
    if (data.showTransaction.show === true) {
      return 'none';
    } else {
      return 'flex';
    }
  };

  const showCalender = () => {
    if (data.showTransaction.show === true) {
      return 'block';
    } else {
      return 'none';
    }
  };

  //affiche les mid recuperable l'année pro

  const showMidRewards = () => {
    if (data.data == '2021') {
      return (
        <p>
          {translate('Mid_to_receive', localStorage.getItem('langage'))} (2022)
          :{denominated(data.account.my2021)}
          MID-b1e2df.
        </p>
      );
    } else {
      return (
        <p>
          {translate('Mid_to_receive', localStorage.getItem('langage'))} (2023)
          :{denominated(data.account.my2022)}
          MID-b1e2df.
        </p>
      );
    }
  };

  const afficheCalenderOrAlltime = () => {
    try {
      if (data.data == 'All time') {
        return (
          <>
            <AllTimeTransaction data={data} />
          </>
        );
      } else {
        return (
          <div className={'msbulle' + ' ' + styles.calender}>
            <div className={styles.titre}>
              {translate('My_Rewards', localStorage.getItem('langage'))}{' '}
              {data.data} :
            </div>
            <div style={{ marginLeft: '10px', display: showTransac() }}>
              {showMidRewards()}
            </div>
            <div style={{ display: showTransac() }} className={styles.cards}>
              {calender.map((card, index) => {
                return (
                  <div
                    onClick={card.onClick}
                    key={index}
                    className={styles.card}
                    style={{
                      cursor: 'pointer'
                    }}
                  >
                    <div
                      className={styles.month}
                      style={{ textAlign: 'center' }}
                    >
                      {card.month}
                    </div>
                    <div className={styles.value}>{card.data}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: showCalender() }}>
              <div>
                <BiArrowBack
                  style={{
                    fontSize: '25px',
                    float: 'left'
                  }}
                  onClick={() =>
                    data.setShowTransaction({
                      show: false,
                      month: ''
                    })
                  }
                />
              </div>
              <div>
                <TransactionMonth
                  data={data}
                  month={data.showTransaction.month}
                />
              </div>
            </div>
          </div>
        );
      }
    } catch (err) {
      <p>
        {translate(
          'Error_message_loading_data',
          localStorage.getItem('langage')
        )}
      </p>;
    }
  };

  return <>{afficheCalenderOrAlltime()}</>;
};

export default Calender;
