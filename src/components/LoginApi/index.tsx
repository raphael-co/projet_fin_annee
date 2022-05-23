import React, { useState } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import { login } from 'core';
import { translate } from 'locale/local';
// import { NavLink } from 'react-router-dom';
import styles from './styles.module.scss';

function Loginin() {
  const [refEmail, setRefEmail] = useState('');
  const [refPass, setPass] = useState('');
  const [error, setError] = useState({
    message: '',
    status: null,
    success: null
  });

  const handelLoin = async () => {
    const data = {
      email: refEmail,
      password: refPass
    };

    // login(data);
    console.log(error);
    if (await login(data)) {
      setshowAlert(false);
      console.log('ici');
      location.reload();
    } else {
      setError(await login(data));
      setshowAlert(true);
    }
    // setTimeout(() => {
    //     setshowAlert(false);
    //   setError({
    //     message: '',
    //     status: null,
    //     success: null
    //   });
    // }, 5000);

    // login(data);
    // console.log(data);
    // const data_JSON = await getData(URL_LOGIN, data);
    // console.log('Mmm.... ', data_JSON);
    // connUp(data_JSON.conectado);
    // console.log(conn);
    // setError(data_JSON.error);
  };

  function handleChangeEmail(event: any) {
    setRefEmail(event.target.value);
  }
  function handleChangePassword(event: any) {
    setPass(event.target.value);
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showAlert, setshowAlert] = useState(false);

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        {translate('Login', localStorage.getItem('langage'))}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <div className={styles.modalG}>
          {showAlert ? (
            <Alert
              onClose={() => setshowAlert(false)}
              dismissible
              style={{ position: 'absolute', width: '100%' }}
              variant={error.status ? 'danger' : 'success'}
            >
              {error.message}
            </Alert>
          ) : (
            ''
          )}
          <Modal.Header
            className={styles.modalHeader}
            //   closeButton
          >
            <Modal.Title>
              {' '}
              {translate('Login', localStorage.getItem('langage'))}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className='form'>
              <div>
                <div>Email</div>
                <input
                  type='Email'
                  className={styles.input}
                  placeholder='email'
                  //   id='inlineFormInputGroupUsername2'
                  onChange={handleChangeEmail}
                />
                <div>Password</div>
                <input
                  type='Password'
                  className={styles.input}
                  placeholder='password'
                  //   id='inlineFormInputGroupUsername2'
                  onChange={handleChangePassword}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer className={styles.modalFooter}>
            <Button variant='primary' onClick={handelLoin}>
              {translate('Login', localStorage.getItem('langage'))}
            </Button>
            <Button variant='secondary' onClick={handleClose}>
              {translate('Close', localStorage.getItem('langage'))}
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default Loginin;
