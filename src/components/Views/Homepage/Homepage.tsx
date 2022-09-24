import React from 'react';
//import { product } from '../../../models/product.model';

const Component: React.FC = () => {

  const products = [{
    _id: '123',
    sale: true,
    src: '../../../../public/photos/canon.jpg',
    oldPrice: 1500,
    price: 1399,
    name: 'Canon',
    description: 'The best camera on the market',
    inStock: 5,
    additionalPhotos: [
      '../../../../public/photos/canon-1.jpg',
      '../../../../public/photos/canon-2.jpg',
    ]
  }];

  console.log(products);

  return (
    <div>
      <p>Homepage</p>
    </div>
  )
}

export {
  Component as Homepage,
}