import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { login } from 'core';
import { translate } from 'locale/local';
import styles from './styles.module.scss';

const Login = () => {
  const [refEmail, setRefEmail] = useState('');
  const [refPass, setPass] = useState('');

  const [error, setError] = useState({
    msg: '',
    status: 0,
    success: 0,
    token: ''
  });

  console.log(error);
  const handelLoin = async () => {
    const datas = {
      email: refEmail,
      password: refPass
    };

    // console.log(await login(datas));

    setError(await login(datas));
    setshowAlert(true);
  };

  function handleChangeEmail(event: any) {
    setRefEmail(event.target.value);
  }
  function handleChangePassword(event: any) {
    setPass(event.target.value);
  }
  // const handleShow = () => setShow(true);

  const [showAlert, setshowAlert] = useState(false);

  return (
    <div className='d-flex flex-fill align-items-center container'>
      <div className='row w-100'>
        <div className='col-12 col-md-8 col-lg-5 mx-auto text-center'>
          <div className={styles.unlock}>
            {showAlert ? (
              <Alert
                onClose={() => setshowAlert(false)}
                dismissible
                style={{ width: '100%' }}
                variant={error.success ? 'success' : 'danger'}
              >
                {error.msg}
              </Alert>
            ) : (
              ''
            )}
            <div
              style={{ margin: 0, padding: '10%' }}
              className={styles.wrapper}
            >
              <h2
                style={{ color: 'white', margin: '0.1%' }}
                className='mb-3'
                data-testid='title'
              >
                {translate('Login', localStorage.getItem('langage'))}
              </h2>
              <form className='form'>
                <div>
                  <div style={{ color: 'white' }}>Email</div>
                  <input
                    type='Email'
                    className={styles.input}
                    placeholder='email'
                    //   id='inlineFormInputGroupUsername2'
                    onChange={handleChangeEmail}
                  />
                  <div style={{ color: 'white' }}>Password</div>
                  <input
                    type='Password'
                    className={styles.input}
                    placeholder='password'
                    onChange={handleChangePassword}
                  />
                </div>
              </form>

              {/* <Button variant='primary'>
                {translate('Login', localStorage.getItem('langage'))}
              </Button>
              <Button variant='secondary'>
                {translate('Register', localStorage.getItem('langage'))}
              </Button> */}
              <div className={styles.connects}>
                {/* <Link
                  to='/dashboard'
                  style={{ margin: 0, textDecoration: 'none' }}
                  className={styles.connects}
                > */}
                <span onClick={handelLoin} className={styles.connect}>
                  <span className={styles.name}>
                    {translate('Login', localStorage.getItem('langage'))}
                  </span>
                </span>
                {/* </Link> */}
                <Link
                  to='/register'
                  style={{ margin: 0, textDecoration: 'none' }}
                  className={styles.connects}
                >
                  <span className={styles.connect}>
                    <span className={styles.name}>
                      {translate('Register', localStorage.getItem('langage'))}
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
