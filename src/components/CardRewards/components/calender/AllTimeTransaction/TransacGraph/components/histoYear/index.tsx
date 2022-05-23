import * as React from 'react';
import { DappUI } from '@elrondnetwork/dapp-core';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { BiArrowBack } from 'react-icons/bi';
import { network } from 'config';
import { denominated } from 'helpers/denominate';
import { translate } from 'locale/local';
import HistoryForOneYear from './History';

import styles from './styles.module.scss';

type Props = {
  data?: any;
  account?: any;
  points?: any;
  rewards?: any;
};
const HistoYear: React.FC<Props> = (data: Props) => {
  const [year, setYear] = React.useState('');

  const showTransac = () => {
    if (data.data.showOneYear === true) {
      return 'none';
    } else {
      return 'flex';
    }
  };

  const showCalender = () => {
    if (data.data.showOneYear === true) {
      return 'block';
    } else {
      return 'none';
    }
  };

  const someFunc = (show: boolean, YearMap: string) => {
    data.data.setShowOneYear(show);
    setYear(YearMap);
  };

  const HistoYears = () => {
    try {
      return (
        <div className={'msbulle' + ' ' + styles.calender}>
          <div style={{ display: showTransac() }} className={styles.cards}>
            {data.data.tabYear.map((YearMap: string, index: any) => (
              <div
                onClick={() => someFunc(true, YearMap)}
                key={index}
                className={styles.card}
                style={{
                  cursor: 'pointer'
                }}
              >
                <div className={styles.month} style={{ textAlign: 'center' }}>
                  {YearMap}
                </div>
                <div className={styles.value}>
                  {YearMap == '2022'
                    ? denominated(data.data.account['ry2022']) +
                      ' ' +
                      network.egldLabel
                    : denominated(data.data.account['ry2021']) +
                      ' ' +
                      network.egldLabel}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: showCalender() }}>
            <div>
              <BiArrowBack
                className={styles.Arrow}
                style={{
                  fontSize: '25px',
                  float: 'left'
                }}
                onClick={() => data.data.setShowOneYear(false)}
              />
            </div>
            <div>
              <HistoryForOneYear data={data} Year={year} />
            </div>
          </div>
        </div>
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
  return HistoYears();
};

export default HistoYear;
