import React from 'react';
import { Container, Row } from 'react-bootstrap';
import styles from './Cart.module.scss';

const Component: React.FC = () => {

  return (
    <div className={styles.root}>
      <Container>
        <Row>
          <p>Cart</p>
        </Row>
      </Container>
    </div>
  );
};

export {
  Component as Cart,
};