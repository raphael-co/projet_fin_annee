import React, { useState } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import { register } from 'core';
import { translate } from 'locale/local';
import styles from './styles.module.scss';

type Props = {
  setSuccesRegister: any;
};

const Registere: React.FC<Props> = (success: Props) => {
  console.log(success);
  const [refEmail, setRefEmail] = useState('');
  const [refPass, setPass] = useState('');
  const [refName, setName] = useState('');

  const [show, setShow] = useState(false);

  const [error, setError] = useState({
    message: '',
    status: null,
    success: null
  });
  const [showAlert, setshowAlert] = useState(false);
  const d = new Date();

  const handelLoin = async () => {
    const data = {
      name: refName,
      email: refEmail,
      password: refPass
    };

    // login(data);

    if ((await register(data)) == true) {
      setShow(false);
      success.setSuccesRegister({
        valid: true,
        message: translate('RegisterSuccess', localStorage.getItem('langage')),
        date:
          localStorage.getItem('langage') == 'fr'
            ? d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear()
            : d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear()
      });
    } else {
      setError(await register(data));
      console.log(error);

      // register(data);
      setshowAlert(true);
      // }
    }
  };
  function handleChangeName(event: any) {
    setName(event.target.value);
  }

  function handleChangeEmail(event: any) {
    setRefEmail(event.target.value);
  }
  function handleChangePassword(event: any) {
    setPass(event.target.value);
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        {translate('Register', localStorage.getItem('langage'))}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <div className={styles.modalG}>
          {showAlert ? (
            <Alert
              onClose={() => setshowAlert(false)}
              dismissible
              style={{ position: 'absolute', width: '100%' }}
              variant={error.status !== 201 ? 'danger' : 'success'}
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
              {translate('Register', localStorage.getItem('langage'))}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className='form'>
              <div>
                <div>UserName</div>
                <input
                  type='text'
                  className={styles.input}
                  placeholder='Name'
                  //   id='inlineFormInputGroupUsername2'
                  onChange={handleChangeName}
                />
                <div>Email</div>
                <input
                  type='email'
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
};

export default Registere;
