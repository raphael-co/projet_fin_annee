import React, { useEffect } from 'react';
import { DappUI } from '@elrondnetwork/dapp-core';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Container, Row } from 'react-bootstrap';

import { Line } from 'react-chartjs-2';
import { network } from 'config';

import { denominated } from 'helpers/denominate';
import { translate } from 'locale/local';

import styles from './styles.module.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  data?: any;
  account?: any;
  points?: any;
  rewards?: any;
};

const labels = [
  translate('January', localStorage.getItem('langage')),
  translate('February', localStorage.getItem('langage')),
  translate('March', localStorage.getItem('langage')),
  translate('April', localStorage.getItem('langage')),
  translate('May', localStorage.getItem('langage')),
  translate('June', localStorage.getItem('langage')),
  translate('July', localStorage.getItem('langage')),
  translate('August', localStorage.getItem('langage')),
  translate('September', localStorage.getItem('langage')),
  translate('October', localStorage.getItem('langage')),
  translate('November', localStorage.getItem('langage')),
  translate('December', localStorage.getItem('langage'))
];
const month = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12'
];

const Graph: React.FC<Props> = (data: Props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: false,
        text: data.data.data
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || '';
            return (
              label + ': ' + context.formattedValue + ' ' + network.egldLabel
            );
          }
        }
      }
    },
    animations: {
      x: {
        from: (ctx: any) => {
          if (ctx.type === 'data') {
            if (ctx.mode === 'default' && !ctx.dropped) {
              ctx.dropped = true;
              return 0;
            }
          }
        }
      }
    }
  };
  //ce useEffect sert a
  useEffect(() => {
    document.location.href = '#chart';
  });
  //fonction qui reoturne un couleaur aléatoire
  function getRandomColor(max: any, min: any) {
    return (
      'rgba(' +
      Math.floor(Math.random() * (max - min + 1) + min).toString() +
      ', ' +
      Math.floor(Math.random() * (max - min + 1) + min).toString() +
      ', ' +
      Math.floor(Math.random() * (max - min + 1) + min).toString() +
      ')'
    ).toString();
  }

  const Graphs = () => {
    try {
      const tabData: any = [];
      const color: any = ['rgb(255, 99, 132)', 'rgb(53, 162, 235)'];

      //push une couleur aleatoire dans le tableau color pour la couleur des lignes du graphique
      data.data.tabYear.reverse().map(() => {
        color.push(getRandomColor(255, 0));
      });

      //maping des details du graphique (label,data ...) pour l'afficher autant de fois que l'utilisateurs a de données
      const dataPushInThetabData = {
        data: data.data.tabYear.reverse().map((y: any, index: number) => [
          {
            label: y,
            data: month.map((i) =>
              data.data.rewards.tx[(y + '-' + i).toString()] !== undefined
                ? data.data.rewards.tx[(y + '-' + i).toString()].length != 1
                  ? data.data.rewards.tx[y + '-' + i].reduce(
                      (stackValueTotal: any, currentValue: any) =>
                        Number(stackValueTotal) +
                        Number(denominated(currentValue.result)),
                      0
                    )
                  : Number(
                      denominated(
                        data.data.rewards.tx[(y + '-' + i).toString()][0].result
                      )
                    )
                : 0
            ),
            borderColor: color[index],
            backgroundColor:
              color[index].substring(0, color[index].length - 1) + ',0.5)',
            tension: 0.2
          }
        ])
      };

      //recupere les data du mapping de dataPushInThetabData pour les push dans un tableau
      dataPushInThetabData.data.map((index: [string]) => {
        tabData.push(index[0]);
      });

      // on recupere le tableau rempli de données des utilisateurs et on l'envoie au graphique
      const dataGraph = {
        labels,
        datasets: tabData
      };
      return (
        <Container id='chart' className={'text-white msbulle ' + styles.scroll}>
          <Row className={styles.scrollTaille}>
            <Line
              style={{
                cursor: 'pointer'
              }}
              className={styles.taille}
              options={options}
              data={dataGraph}
            />
          </Row>
        </Container>
      );
    } catch {
      return (
        <div className={styles.value + ' ' + 'my-5'}>
          {' '}
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
        </div>
      );
    }
  };
  return Graphs();
};

export default Graph;
