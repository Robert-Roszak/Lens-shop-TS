import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchOneProductQuery } from '../../../redux/productsRedux';
import { productModel } from '../../../types/product.model';
import { IMAGES_URL } from '../../../config';
import clsx from 'clsx';
import { Container, Row, Spinner, Col, Image, Carousel, Button, Form } from 'react-bootstrap';
import styles from './Product.module.scss';

const Component: React.FC = () => {
  const {id} = useParams();
  const { data } = useFetchOneProductQuery(id);
  const product = data;
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = (event: React.MouseEvent, product: productModel) => {
    event.preventDefault();
    console.log('handleAddToCart ' + product);
  };

  const handleQuantity = (value: string, inStock: number) => {
    const parsedValue = parseInt(value);
    if (parsedValue <= inStock && parsedValue >= 0) setQuantity(parsedValue);
    else if (parsedValue > inStock) alert('No more products in stock');
    else if (parsedValue < 0) alert('Value cannot be lower than 0');
  };

  if (product) {
    return (
      <Container className={styles.root} fluid={'md'}>
        <h2>Product</h2>
        <Row className={styles.allBorders}>
          <Col>
            <Carousel fade>
              <Carousel.Item interval={1000}>
                <Image src={`${IMAGES_URL}/${product.src}`} className={clsx('d-block', 'w-100', styles.image)} alt={product.src}/>
              </Carousel.Item>
              {
                product.additionalPhotos ?
                  product.additionalPhotos.map((photo, index) => (
                    <Carousel.Item key={index} interval={1000}>
                      <Image src={`${IMAGES_URL}/${photo}`} className={clsx('d-block', 'w-100', styles.image)} alt={photo} />
                    </Carousel.Item>
                  ))
                  : ''
              }
            </Carousel>
          </Col>
          <Col>
            <Row className={styles.borderBottom}>
              <h2>{product.name}</h2>
            </Row>
            <Row className={styles.borderBottom}>
              <h6>{product.description}</h6>
            </Row>
            <Row className={styles.borderBottom}>
              {
                product.sale ?
                  <p className={styles.salePrice}>
                  Sale from <span className={styles.oldPrice}>${product.oldPrice} </span>
                  to <span className={styles.newPrice}> ${product.price}</span>
                  </p>
                  :
                  <p>${product.price}</p>
              }
            </Row>
            <Row>
              <p>Availability: {
                (product.inStock === null || product.inStock === 0) ?
                  <strong>out of stock!</strong>
                  :
                  `${product.inStock} products in stock`
              }
              </p>
            </Row>
            <Row className={styles.buy} as={Form}>
              <Form.Control
                type='number'
                id='quantity'
                name='quantity'
                className={styles.quantityInput}
                value={quantity}
                min='0'
                max={product.inStock}
                onChange={e => handleQuantity(e.target.value, product.inStock)}
              />
              <Button variant='primary' type='submit' className={styles.btn} onClick={((event) => handleAddToCart(event, product))}>Add to cart</Button>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
  else {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    );
  }
};

export {
  Component as Product,
  Component as ProductComponent,
};
