import TestC from 'components/test';
import React from 'react';

import styles from './styles.module.scss';

const Login: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <TestC />
      Login
    </div>
  );
};

export default Login;
