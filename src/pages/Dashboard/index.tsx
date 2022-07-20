import React, { FC, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { getUser } from 'core';

import styles from './styles.module.scss';

interface SquareConfig {
  exp?: string;
  data?: any;
  // width?: number;
}

const Dashboard: FC = () => {
  const [refemail, setRefemail] = useState('');
  const [refname, setname] = useState('');
  // const [refpassword, setpassword] = useState('');
  const [reflast_login, setreflast_login] = useState('');

  const dateNow = new Date();
  const token = localStorage.getItem('access_token');

  React.useEffect(() => {
    const fetchTokenList = async () => {
      try {
        const infoUser: any = await getUser();

        if (infoUser) {
          setRefemail(infoUser.data.data.email);
          setname(infoUser.data.data.name);
          setreflast_login(infoUser.data.data.last_login);
        }
      } catch (err) {
        console.log(err);
        // return logout('profile');
      }
    };
    fetchTokenList();
  }, []);

  const testTokenJWT = () => {
    try {
      if (token) {
        const decodedToken: SquareConfig = jwt_decode(token);
        // console.log(decodedToken);
        // console.log(decodedToken.exp);
        // console.log(dateNow.getTime() / 1000);

        if (Number(decodedToken.exp) < dateNow.getTime() / 1000) {
          window.location.href = 'login';
        } else {
          return (
            <div style={{ color: 'white' }}>
              <p>info user : </p>
              <br />
              <p>name : {refname}</p>
              <p>email : {refemail}</p>
              <p>last login : {reflast_login}</p>
            </div>
          );
        }
      } else {
        window.location.href = 'login';
      }
    } catch {
      localStorage.removeItem('access_token');
      location.reload();
    }
  };

  return <div className={styles.dashboard}>{testTokenJWT()}</div>;
};

export default Dashboard;
