import React from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faShoppingBasket, faCamera, faUser } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';

const Component: React.FC = () => {
  const cart = useAppSelector(state => state.cart.items);
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);
  return (
    <header className={styles.root}>
      <Container>
        <Row className='align-items-center'>
          <Col xs={4} className={styles.phoneNumber}>
            <p>
              <FontAwesomeIcon className={styles.icon} icon={faMobileAlt} /> 2300 - 3560 - 222
            </p>
          </Col>

          <Col xs={4} className={styles.logo}>
            <NavLink to='/' className={styles.link}>
              <FontAwesomeIcon className={styles.icon} icon={faCamera} />
              <p>Lens shop</p>
            </NavLink>
          </Col>
          
          <Col xs={4} className={styles.cart}>
            <NavLink to={'/cart'} className='active'>
              <button className={styles.cartBox}>
                <div className={styles.cartIcon}>
                  <FontAwesomeIcon className={styles.icon} icon={faShoppingBasket} />
                </div>
                <div className={styles.cartCounter}>{cart.length}</div>
              </button>
            </NavLink>
            {isAuthenticated ? (
              <div className={styles.loginBox}>
                <NavLink to='/myorders' className={styles.login}>
                  <FontAwesomeIcon className={styles.icon} icon={faUser} />
                </NavLink>

                <NavLink to='/logout' className={styles.textLink}>
                  <span className={styles.text}>Logout</span>
                </NavLink>
              </div>
            ) : (
              <div className={styles.loginBox}>
                <NavLink to='/login' className={styles.login}>
                  <FontAwesomeIcon className={styles.icon} icon={faUser} />
                </NavLink>

                <NavLink to='/login' className={styles.textLink}>
                  <span className={styles.text}>Login</span>
                </NavLink>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export {
  Component as Header,
  Component as HeaderComponent,
};


