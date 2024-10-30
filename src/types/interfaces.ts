import { OrderStatusesEnum } from './enums';

interface Product {
  _id: string,
  src: string,
  price: number,
  name: string,
  description: string,
}

export interface productModel extends Product {
  sale: boolean,
  oldPrice: number,
  inStock: number,
  additionalPhotos: string[],
}

export interface CartModel extends Product {
  quantity: number,
  comment?: string,
}

export interface OrderModel {
  _id: string,
  contact: string;
  address: string;
  payment: string;
  shipping: string;
  message?: string;
  email: string;
  items: CartModel[];
  toPay: number;
  deliveryFee: number;
  orderStatus: OrderStatusesEnum;
}

export interface emailOptions extends OrderModel {
  emailTemplate: string,
}

export interface CartState {
  items: CartModel[];
}

export interface CommentModel {
  comment: string,
  id: string,
}

export interface QuantityModel {
  quantity: number,
  id: string,
}

export interface LoginRequest {
  email: string;
  password: string;
  url: string;
}

export interface LoginResponse {
  returnData: {
    _id: string;
    token: string;
    isAdmin?: boolean;
    email: string;
  }
}

export interface UserState {
  isAuthenticated: boolean | null;
  token: string | null;
  isAdmin?: boolean;
  errorMessage?: string | null;
  email: string | null;
  _id: string | null;
}