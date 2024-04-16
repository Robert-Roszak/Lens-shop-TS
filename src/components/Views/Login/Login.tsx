import React from 'react';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import styles from './Login.module.scss';

const Component: React.FC = () => {
  const validateLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('validateLogin');
    // const orderDetails = {} as OrderModel;
    const email = (document.getElementById('formEmail') as HTMLInputElement).value;
    const password = (document.getElementById('formPassword') as HTMLInputElement).value;
    console.log('email: ' + email);
    console.log('password: ' + password);
    // const address = (document.getElementById('formAddress') as HTMLInputElement).value;
    // const payment = (document.getElementById('formPayment') as HTMLInputElement).value;
    // const shipping = (document.getElementById('formShipping') as HTMLInputElement).value;
    // const message = (document.getElementById('formMessage') as HTMLInputElement).value;

    // if (contact && address && payment && shipping && validateEmail(email)) {
    //   orderDetails.contact = contact;
    //   orderDetails.address = address;
    //   orderDetails.payment = payment;
    //   orderDetails.shipping = shipping;
    //   orderDetails.message = message;
    //   orderDetails.email = email;
    //   orderDetails.items = cart;
    //   orderDetails.toPay = totalPrice;
    //   const createdOrder = await addNewOrder(orderDetails).unwrap();

    //   callback(createdOrder.orderId);
    // }
    // else alert('Please provided all details');
  };

  return (
    <Container className={styles.root} fluid={'md'}>
      <section>
        <Row className='justify-content-center'>
          <Col xs lg='5' className={styles.loginForm}>
            <Form className={styles.form} onSubmit={event => validateLogin(event)}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button className={styles.submit} variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export {
  Component as Login,
  Component as LoginComponent,
};
