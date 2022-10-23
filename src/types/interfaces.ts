export interface productModel {
  _id: string,
  sale: boolean,
  src: string,
  oldPrice: number,
  price: number,
  name: string,
  description: string,
  inStock: number,
  additionalPhotos: string[]
}

export interface CartModel {
  _id: string,
  sale: boolean,
  src: string,
  price: number,
  name: string,
  description: string,
  quantity: number
}