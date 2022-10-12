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