import * as React from 'react';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core';
import axios from 'axios';

import { Tab, Tabs } from 'react-bootstrap';
import { network, TheDadteYear } from 'config';

import { denominated } from 'helpers/denominate';
import { translate } from 'locale/local';

import Calender from './components/calender';
import Cardfooting from './components/cardfooting';
import styles from './styles.module.scss';
interface CardType {
  colors: Array<string>;
  data: string;
  title?: string;
  description?: string;
}

const CardRewards: React.FC = () => {
  const { address } = useGetAccountInfo();
  const [graphique, setGraphique] = React.useState(true);
  const [showOneYear, setShowOneYear] = React.useState(true);
  const [underMenuAllTime, setUnderMenuAllTime] = React.useState('Chart');
  const tabYear: any = [];
  const [key, setKey] = React.useState(TheDadteYear.toString());
  const [showTransaction, setShowTransaction] = React.useState({
    show: false,
    month: ''
  });
  const [account, setAccount] = React.useState({
    id: '0',
    address: '',
    rewards: '',
    ry2021: '0',
    my2021: '0',
    tx2021: '',
    ry2022: '0',
    my2022: '0',
    tx2022: ''
  });

  const [points, setPoints] = React.useState({
    points: ['']
  });

  const [rewards, setRewards] = React.useState<any>({
    tx: {
      '202111': [
        {
          txHash:
            'ff8c4102739b9468127273b8f35a6b1a376731141185a0c177151e3677d2d2bb',
          value: '0',
          data: 'withdraw',
          timestamp: '1637005044',
          result: ''
        }
      ]
    }
  });
  //recupe les infos de l'api et les met dans des useState

  React.useEffect(() => {
    const fetchTokenList = async () => {
      try {
        // data = toutes les infos de la route de l'api 'https://api.middlestaking.fr/rewards/accounts/' + address
        const { data } = await axios(
          'https://api.middlestaking.fr/rewards/accounts/' + address

          // adresse test erd1ve2jekzgdeg2mvss8su56p0huuqkr7rjp9cl94xy65y9k3mxlp9s5uxtfe
        );

        //les set servent a recuperer les info dans les useState
        setPoints({
          points: data.points
        });
        setAccount({
          id: data.rewards.id,
          address: data.rewards.address,
          rewards: data.rewards.rewards ? data.rewards.rewards : '0',
          ry2021: data.rewards.ry2021 ? data.rewards.ry2021 : '0',
          my2021: data.rewards.my2021 ? data.rewards.my2021 : '0',
          tx2021: data.rewards.tx2021 ? data.rewards.tx2021 : '',
          ry2022: data.rewards.ry2022 ? data.rewards.ry2022 : '0',
          my2022: data.rewards.my2022 ? data.rewards.my2022 : '0',
          tx2022: data.rewards.tx2022 ? data.rewards.tx2022 : ''
        });
        setRewards({
          tx: data.tx
        });
      } catch (err) {
        return;
      }
    };
    fetchTokenList();
  }, [setAccount, setRewards]);

  const cards: Array<CardType> = [
    {
      colors: ['#2044F5', '#1B37C0'],
      data:
        translate('Rewards_All_Time', localStorage.getItem('langage')) +
        ' ' +
        denominated(account.rewards) +
        ' ' +
        network.egldLabel
    }
  ];
  //recupere les années ou il y a eu au moins une resupération de rewards
  const recoveryYears = () => {
    try {
      points.points.map((point) => {
        const choicejJustYear = point.substr(0, 4);
        if (tabYear.includes(choicejJustYear) !== true) {
          tabYear.push(choicejJustYear);
        }
      });
    } catch (error) {
      return tabYear.push();
    }
  };

  recoveryYears();

  function OnSelectFunctionsStart(k: string) {
    setKey(k),
      setShowTransaction({
        show: false,
        month: ''
      });
    setUnderMenuAllTime('Chart');
    setShowOneYear(false);
  }
  return (
    <div>
      <div>
        <Tabs
          variant='tabs'
          id='controlled-tab-example'
          activeKey={key}
          onSelect={(k) =>
            k != null ? OnSelectFunctionsStart(k) : setKey('All time')
          }
          // className='mb-3'
          style={{ width: '100%', color: 'white' }}
          className={styles.className}
        >
          {tabYear.length != 0 ? (
            cards.map((card, index) => {
              return (
                <Tab
                  tabClassName={key != 'All time' ? styles.className : ''}
                  eventKey='All time'
                  title={card.data}
                  key={index}
                >
                  <Calender
                    data={'All time'}
                    tabYear={tabYear}
                    account={account}
                    points={points}
                    rewards={rewards}
                    graphique={graphique}
                    showTransaction={showTransaction}
                    setShowTransaction={setShowTransaction}
                    setGraphique={setGraphique}
                    underMenuAllTime={underMenuAllTime}
                    setUnderMenuAllTime={setUnderMenuAllTime}
                    showOneYear={showOneYear}
                    setShowOneYear={setShowOneYear}
                  />
                </Tab>
              );
            })
          ) : (
            <div
              className={styles.card}
              style={
                {
                  // cursor: 'pointer'
                }
              }
            >
              <div className={styles.value}>
                {translate('Unable_no_data', localStorage.getItem('langage'))}
              </div>
            </div>
          )}
          {tabYear.length != 0
            ? // .map = boucle for et ressort les infos d'un tableau
              tabYear.map((tab: any, index: number) => {
                return (
                  <Tab
                    tabClassName={key != tab ? styles.className : ''}
                    key={index}
                    eventKey={tab}
                    title={
                      tab == '2022'
                        ? tab +
                          ' : ' +
                          denominated(account['ry2022']) +
                          ' ' +
                          network.egldLabel
                        : tab +
                          ' : ' +
                          denominated(account['ry2021']) +
                          ' ' +
                          network.egldLabel
                    }
                    style={{ color: '#ffffff' }}
                  >
                    <Calender
                      data={tab}
                      tabYear={tabYear}
                      account={account}
                      points={points}
                      rewards={rewards}
                      graphique={graphique}
                      showTransaction={showTransaction}
                      setShowTransaction={setShowTransaction}
                      setGraphique={setGraphique}
                    />
                  </Tab>
                );
              })
            : ''}
        </Tabs>
      </div>
      <Cardfooting data={account} />
    </div>
  );
};

export default CardRewards;
