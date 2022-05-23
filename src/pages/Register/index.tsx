import React from 'react';
import { Link } from 'react-router-dom';
import { translate } from 'locale/local';
import styles from './styles.module.scss';

const Register = () => {
  return (
    <div className='d-flex flex-fill align-items-center container'>
      <div className='row w-100'>
        <div className='col-12 col-md-8 col-lg-5 mx-auto text-center'>
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
                    //   id='inlineFormInputGroupUsername2'
                  />
                  <div style={{ color: 'white' }}>Email</div>
                  <input
                    type='email'
                    className={styles.input}
                    placeholder='email'
                    //   id='inlineFormInputGroupUsername2'
                  />
                  <div style={{ color: 'white' }}>Password</div>
                  <input
                    type='Password'
                    className={styles.input}
                    placeholder='password'
                    //   id='inlineFormInputGroupUsername2'
                  />
                  <div style={{ color: 'white' }}> Valide Password</div>
                  <input
                    type='Password'
                    className={styles.input}
                    placeholder='Valide password'
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
                <Link
                  to='/login'
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

export default Register;
