import * as React from 'react';
import CardRewards from 'components/CardRewards';
import HeadingRewards from 'components/HeadingRewards';
import styles from './styles.module.scss';
import '../../assets/sass/global.scss';

const Rewards = () => {
  return (
    <div className={styles.dashboard}>
      <HeadingRewards />

      <CardRewards />
    </div>
  );
};

export default Rewards;
