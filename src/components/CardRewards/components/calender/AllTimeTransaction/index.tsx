import * as React from 'react';
import { DappUI } from '@elrondnetwork/dapp-core';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { Container, Row } from 'react-bootstrap';
import { Tab, Tabs } from 'react-bootstrap';

import { translate } from 'locale/local';

import styles from './styles.module.scss';
import Graph from './TransacGraph/components/graph';
import Histo from './TransacGraph/components/histo';
import HistoYear from './TransacGraph/components/histoYear';

type Props = {
  data?: any;
  account?: any;
  points?: any;
  rewards?: any;
};
const AllTimeTransaction: React.FC<Props> = (data: Props) => {
  const OnSelectTabsFunction = (k: string) => {
    data.data.setUnderMenuAllTime(k);
    data.data.setShowOneYear(false);
  };

  const TryAllTimeTransaction = () => {
    try {
      return (
        <Container className={'text-white msbulle'}>
          <div style={{ textAlign: 'center' }}>
            <p>{data.data.data}</p>
          </div>
          <Row className={styles.rowmenu}>
            <Tabs
              variant='pills'
              id='controlled-tab-example'
              activeKey={data.data.underMenuAllTime}
              onSelect={(k) =>
                k != null
                  ? OnSelectTabsFunction(k)
                  : data.data.setUnderMenuAllTime('Chart')
              }
              className='mb-3'
            >
              <Tab
                eventKey='History'
                title={translate('History', localStorage.getItem('langage'))}
                tabClassName={
                  data.data.underMenuAllTime != 'All History'
                    ? styles.className
                    : ''
                }
              >
                <Histo data={data.data} />
              </Tab>
              <Tab
                eventKey='Chart'
                title={translate('Chart', localStorage.getItem('langage'))}
                tabClassName={
                  data.data.underMenuAllTime != 'Chart' ? styles.className : ''
                }
              >
                <Graph data={data.data} />
              </Tab>
              <Tab
                eventKey='Years'
                title={translate('Years', localStorage.getItem('langage'))}
                tabClassName={
                  data.data.underMenuAllTime != 'Years' ? styles.className : ''
                }
              >
                <HistoYear data={data.data} />
              </Tab>
            </Tabs>
          </Row>
        </Container>
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
  return TryAllTimeTransaction();
};

export default AllTimeTransaction;
