import React, { useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { CartItem } from '../../Features/CartItem/CartItem';
import { Checkout } from '../../Features/Checkout/Checkout';
import { Container, Row, Col, Button } from 'react-bootstrap';
import clsx from 'clsx';
import styles from './Cart.module.scss';

const Component: React.FC = () => {
  const [showCheckout, setCheckout] = useState(false);
  const cart = useAppSelector(state => state.cart.items);
  let totalPrice = 0;
  let deliveryFee = 100;
  const freeDeliveryFrom = 1500;

  const handlePrice = () => {
    if (cart) {
      cart.forEach(item => totalPrice += item.price * item.quantity);
      if (totalPrice > freeDeliveryFrom) deliveryFee = 0;
      else totalPrice += deliveryFee;
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <Container className={styles.root}>
        <Row className={styles.emptyCart}>
          <Col xs lg="2">
            <p>Your cart is empty :(</p>
            <Button href="/" variant="primary">Go shopping!</Button>
          </Col>
        </Row>
      </Container>
    );
  }
  else {
    handlePrice();
    return (
      <Container className={styles.root}>
        <section>
          <Row className="justify-content-md-center">
            <Col xs lg="3">
              {
                showCheckout ?
                  <h2 className={styles.center}>Checkout</h2>
                  :
                  <h2 className={styles.center}>Cart</h2>
              }
              {
                cart.length === 1 ?
                  <p className={styles.center}>You have {cart.length} item in your cart</p>
                  :
                  <p className={styles.center}>You have {cart.length} items in your cart</p>
              }
            </Col>
          </Row>
        </section>
        
        <section>
          <CartItem cart={cart} showCheckout={showCheckout} />
        </section>
        
        <section>
          <Row className={clsx('justify-content-center', styles.checkout)}>
            <Col xs lg="5">
              {
                showCheckout ? <Checkout cart={cart} totalPrice={totalPrice}/>
                  :
                  <>
                    {
                      deliveryFee === 0 ?
                        <p className={styles.txtAlignEnd}>Free delivery!</p>
                        :
                        <p className={styles.txtAlignEnd}>Get items for <i>${(freeDeliveryFrom - totalPrice + deliveryFee)}</i> more to save <i>${deliveryFee}</i> delivery fee</p>
                    }
                    <p className={styles.txtAlignEnd}><strong>Total:</strong> ${totalPrice}</p>
                    <Button className={styles.fullWidth} variant="primary" onClick={() => setCheckout(true)} >Checkout</Button>
                  </>
              }
            </Col>
          </Row>
        </section>

      </Container>
    );
  }
};

export {
  Component as Cart,
};