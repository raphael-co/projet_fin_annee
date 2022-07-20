import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { register } from 'core';
import { translate } from 'locale/local';
import styles from './styles.module.scss';

const Register = () => {
  const [refEmail, setRefEmail] = useState('');
  const [refPass, setPass] = useState('');
  const [refConfPass, setConfPass] = useState('');
  const [refName, setLastName] = useState('');
  const [show, setshowAlert] = useState(false);

  const [error, setError] = useState({
    msg: '',
    status: 0,
    success: 0,
    token: ''
  });

  const handelLoin = async () => {
    const data = {
      name: refName,
      email: refEmail,
      password: refPass,
      conf_password: refConfPass
    };
    if ((await register(data)) == true) {
      // console.log('oui');
    } else {
      setshowAlert(true);
      setError(await register(data));
      // register(data);
      // }
    }
  };

  function handleChangeEmail(event: any) {
    setRefEmail(event.target.value);
  }

  function handleChangePassword(event: any) {
    setPass(event.target.value);
  }

  function handleChangeConfPassword(event: any) {
    setConfPass(event.target.value);
  }

  function handleChangeName(event: any) {
    setLastName(event.target.value);
  }

  return (
    <div className='d-flex flex-fill align-items-center container'>
      <div className='row w-100'>
        <div className='col-12 col-md-8 col-lg-5 mx-auto text-center'>
          {show ? (
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
          <div className={styles.unlock}>
            <div
              style={{ margin: 0, padding: '10%' }}
              className={styles.wrapper}
            >
              <h2
                style={{ color: 'white', margin: '0.1%' }}
                className='mb-3'
                data-testid='title'
              >
                {translate('Register', localStorage.getItem('langage'))}
              </h2>
              <form className='form'>
                <div>
                  <div style={{ color: 'white' }}>Username</div>
                  <input
                    type='text'
                    className={styles.input}
                    placeholder='Username'
                    onChange={handleChangeName}
                    //   id='inlineFormInputGroupUsername2'
                  />
                  <div style={{ color: 'white' }}>Email</div>
                  <input
                    type='email'
                    className={styles.input}
                    placeholder='email'
                    onChange={handleChangeEmail}
                    //   id='inlineFormInputGroupUsername2'
                  />
                  <div style={{ color: 'white' }}>Password</div>
                  <input
                    type='Password'
                    className={styles.input}
                    placeholder='password'
                    onChange={handleChangePassword}
                    //   id='inlineFormInputGroupUsername2'
                  />
                  <div style={{ color: 'white' }}> Valide Password</div>
                  <input
                    type='Password'
                    className={styles.input}
                    placeholder='Valide password'
                    onChange={handleChangeConfPassword}
                    //   id='inlineFormInputGroupUsername2'
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
                <Link
                  to='/login'
                  style={{ margin: 0, textDecoration: 'none' }}
                  className={styles.connects}
                >
                  <span className={styles.connect}>
                    <span className={styles.name}>
                      {translate('Login', localStorage.getItem('langage'))}
                    </span>
                  </span>
                </Link>

                <span onClick={handelLoin} className={styles.connect}>
                  <span className={styles.name}>
                    {translate('Register', localStorage.getItem('langage'))}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
