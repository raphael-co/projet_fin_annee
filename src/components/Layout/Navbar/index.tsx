import React, { FC, ReactNode } from 'react';

import { logout, useGetAccountInfo } from '@elrondnetwork/dapp-core';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Container,
  Dropdown,
  Form,
  Nav,
  Navbar,
  Offcanvas,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import { IoCopyOutline } from 'react-icons/io5';
import { network } from 'config';
import { denominated } from 'helpers/denominate';

import { translate } from 'locale/local';
import { ReactComponent as MsNavLogo } from '../../../assets/img/logo-ms-header.svg';
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
  const { address, account } = useGetAccountInfo();
  const [tooltip, setTooltip] = React.useState('Click to Copy');

  const tooltipTimer = setTimeout(() => {
    setTooltip('Click to Copy');
  }, 2000);

  const adressButton: Array<ButtonsType> = [
    {
      icon: <IoCopyOutline size='15px' />,
      label: address,
      classnameCache: styles.cache,
      classnameTronquer: styles.tronquer,
      background: '#000000',
      onClick: () => {
        navigator.clipboard.writeText(address),
          setTooltip('Copied'),
          tooltipTimer;
      }
    }
  ];

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
    },
    {
      icon: '',
      label: 'Rewards',
      classnameTronquer: styles.tronquerNone,
      background: '#000000',
      onClick: () => (window.location.href = 'rewards')
    },

    {
      icon: '',
      label: '$MID',
      classnameTronquer: styles.tronquerNone,
      background: '#000000',
      onClick: () => (window.location.href = 'tokenomics')
    },
    {
      icon: '',
      background: '#000000',
      classnameTronquer: styles.tronquerNone,
      label: 'Presale',
      onClick: () => (window.location.href = 'presale')
    },

    {
      icon: '',
      background: '#000000',
      classnameTronquer: styles.tronquerNone,
      label: `${denominated(account.balance)} ${network.egldLabel}`
    }
  ];
  const isLoggedIn = Boolean(address);

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
            {isLoggedIn ? (
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
            )}
          </Navbar.Brand>
          <Form className='d-flex'>
            {isLoggedIn ? (
              <>
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
                      <Nav.Link onClick={adressButton[0].onClick}>
                        <OverlayTrigger
                          placement='bottom'
                          overlay={
                            <Tooltip id='button-tooltip-2'>{tooltip}</Tooltip>
                          }
                        >
                          <span className={styles.balisePMenuhover}>
                            <p style={{ color: '#909fbc', margin: 0 }}>
                              {/* <span className={adressButton[0].classnameCache}>
                        {adressButton[0].label}
                      </span> */}
                              <span>
                                {adressButton[0].label.slice(0, 8) +
                                  '....' +
                                  adressButton[0].label.slice(
                                    adressButton[0].label.length - 6,
                                    adressButton[0].label.length - 0
                                  )}
                              </span>
                              {''}{' '}
                              <span
                                style={{ fontSize: 'smaller', width: '10px' }}
                              >
                                {adressButton[0].icon}
                              </span>
                            </p>
                          </span>
                        </OverlayTrigger>
                      </Nav.Link>

                      <Nav.Link style={{ color: '#909fbc' }}>
                        <hr style={{ color: 'white' }} />
                      </Nav.Link>
                      <Nav.Link
                        onClick={() => logout(`${location.origin}/`)}
                        style={{ color: '#909fbc' }}
                        className={styles.balisePMenuhover}
                      >
                        <span>
                          {translate(
                            'Disconnect',
                            localStorage.getItem('langage')
                          )}{' '}
                          <FontAwesomeIcon icon={faPowerOff} />
                        </span>
                      </Nav.Link>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </>
            ) : (
              <Dropdown className={styles.dropdown} onSelect={handleChange}>
                <Dropdown.Toggle
                  childBsPrefix='success'
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
                  {translate(
                    ValueSelectLanguage,
                    localStorage.getItem('langage')
                  )}
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
            )}
          </Form>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarTest;
