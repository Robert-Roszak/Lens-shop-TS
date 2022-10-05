import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { Products } from '../Products/Products';
//import { product } from '../../../models/product.model';

import styles from './Homepage.module.scss';

const Component: React.FC = () => {

  const products = [{
    _id: '123',
    sale: true,
    src: './photos/canon.jpg',
    oldPrice: 1500,
    price: 1399,
    name: 'Canon',
    description: 'The best camera on the market',
    inStock: 5,
    additionalPhotos: [
      './photos/canon-1.jpg',
      './photos/canon-2.jpg',
    ]
  }];

  if (products) {
    return (
      <div className={styles.root}>
        <Container>
          <Row className="g-4">
            <h2>Our products</h2>
            {
              products.map(product => (<Products product={product} key={product._id}/>))
            }
          </Row>
        </Container>
      </div>
    );
  }
  else {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
}

export {
  Component as Homepage,
}