import React from 'react';
import { Container, Row, Col, Button} from 'react-bootstrap';
import styles from './NewOrderConfirmation.module.scss';

interface NewOrderConfirmationProps {
  orderId: string,
}

const Component: React.FC<NewOrderConfirmationProps> = ({orderId}) => {
  return (
    <Container className={styles.root} fluid={'md'}>
      <section>
        <Row className='justify-content-center'>
          <Col xs lg='5' className={styles.confirmation}>
            <p>Thank you for trusting us with your order.</p>
            <p>We have given it id {orderId}</p>
            <p>Order summary was sent to the email from the order.</p>
            <p>Log in to view its status</p>
            <Button className={styles.button} href='/login'>Log in</Button> 
            <br/>
            <Button className={styles.button} href='/'>Continue shopping</Button>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export {
  Component as NewOrderConfirmation,
  Component as NewOrderConfirmationComponent,
};
