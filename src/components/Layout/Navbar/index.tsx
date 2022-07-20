import React, { FC, ReactNode } from 'react';

import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Container,
  Dropdown,
  Form,
  Nav,
  Navbar,
  Offcanvas
} from 'react-bootstrap';
import { translate } from 'locale/local';
import styles from './styles.module.scss';

interface ButtonsType {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  copy?: boolean;
  classnameCache?: string;
  classnameTronquer?: string;
  background: string;
}

interface propsTest {
  lang?: string;
  setLangage?: any;
}

const NavbarTest: FC<propsTest> = () => {
  const buttons: Array<ButtonsType> = [
    {
      icon: '',
      background: '#000000',
      classnameTronquer: styles.tronquerNone,
      label: 'Dashboard',
      onClick: () => (window.location.href = 'dashboard')
    },
    {
      icon: '',
      background: '#000000',
      classnameTronquer: styles.tronquerNone,
      label: 'profile',
      onClick: () => (window.location.href = 'profile')
    }
  ];
  // const isLoggedIn = Boolean(address);

  const ValueSelectLanguage: any =
    localStorage.getItem('langage') !== null
      ? localStorage.getItem('langage')
      : 'en';

  const handleChange = (event: any) => {
    localStorage.setItem('langage', event);
    window.location.reload();
  };

  return (
    <>
      <Navbar expand={'10000000000px'} variant='dark' className={styles.nav}>
        <Container fluid>
          <Navbar.Brand>
            {/* {isLoggedIn ? (
              <Nav.Link href='/dashboard'>
                <span className={styles.logo}>
                  {' '}
                  <MsNavLogo className='' style={{ height: 50 }} />
                </span>
              </Nav.Link>
            ) : (
              <Nav.Link href='/'>
                <span className={styles.logo}>
                  {' '}
                  <MsNavLogo className='' style={{ height: 50 }} />
                </span>
              </Nav.Link>
            )} */}
          </Navbar.Brand>
          <Form className='d-flex'>
            <Navbar.Brand>
              <Dropdown className={styles.dropdown} onSelect={handleChange}>
                {/* classe a enlever btn btn-primary */}
                <Dropdown.Toggle
                  childBsPrefix={styles.dropdownToggles}
                  className={styles.dropdownToggles}
                >
                  <img
                    className={styles.dropdownTogglesflag}
                    src={translate(
                      'Flag_' + ValueSelectLanguage,
                      localStorage.getItem('langage')
                    )}
                    alt=''
                  />{' '}
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles.dropdownMenu}>
                  <Dropdown.Item
                    className={styles.dropdownItem}
                    value='en'
                    eventKey='en'
                  >
                    <img
                      className={styles.flag}
                      src={translate(
                        'Flag_en',
                        localStorage.getItem('langage')
                      )}
                      alt=''
                    />{' '}
                    {translate('English', localStorage.getItem('langage'))}
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={styles.dropdownItem}
                    value='fr'
                    eventKey='fr'
                  >
                    <img
                      className={styles.flag}
                      src={translate(
                        'Flag_fr',
                        localStorage.getItem('langage')
                      )}
                      alt=''
                    />{' '}
                    {translate('French', localStorage.getItem('langage'))}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={'offcanvasNavbar-expand-xxl'}>
              {/* <GiHamburgerMenu /> */}
            </Navbar.Toggle>
            <Navbar.Offcanvas
              id={'offcanvasNavbar-expand'}
              aria-labelledby={'offcanvasNavbarLabel-expand-xxl'}
              placement='end'
              style={{ backgroundColor: '#1f4079', color: '#909fbc' }}
              className={styles.test}
            >
              <Offcanvas.Header
                style={{ color: '#ffffff' }}
                closeButton
                closeVariant='white'
              >
                <Offcanvas.Title id={'offcanvasNavbarLabel-expand-xxl'}>
                  {translate('Menu', localStorage.getItem('langage'))}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav
                  className={
                    styles.balisePMenuhover +
                    ' justify-content-end flex-grow-1 pe-3'
                  }
                >
                  {buttons.map((button) => (
                    <Nav.Link onClick={button.onClick} key={button.label}>
                      <div>
                        <span className={styles.balisePMenuhover}>
                          <p style={{ margin: 0, color: '#909fbc' }}>
                            <span className={button.classnameCache}>
                              {button.label}
                            </span>
                            {''}{' '}
                            <span
                              style={{
                                color: '#909fbc',
                                fontSize: 'smaller',
                                width: '10px'
                              }}
                            >
                              {button.icon}
                            </span>
                          </p>
                        </span>
                      </div>
                    </Nav.Link>
                  ))}
                  <Nav.Link style={{ color: '#909fbc' }}>
                    <hr style={{ color: 'white' }} />
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => (window.location.href = '/')}
                    style={{ color: '#909fbc' }}
                    className={styles.balisePMenuhover}
                  >
                    <span>
                      {translate('Disconnect', localStorage.getItem('langage'))}{' '}
                      <FontAwesomeIcon icon={faPowerOff} />
                    </span>
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Form>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarTest;
