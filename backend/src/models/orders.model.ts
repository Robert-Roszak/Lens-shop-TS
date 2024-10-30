import { Schema, model } from 'mongoose';
import { OrderModel, OrderStatuses } from '../interfaces';

const orderSchema = new Schema<OrderModel>({
  contact: { type: String, required: true },
  address: { type: String, required: true },
  payment: { type: String, required: true },
  shipping: { type: String, required: true },
  message: { type: String },
  email: { type: String, required: true },
  items: { type: [Object], required: true },
  toPay: { type: Number, required: true },
  deliveryFee: { type: Number, required: true },
  orderStatus: {
    type: String,
    enum: Object.values(OrderStatuses),
    default: OrderStatuses.New,
  },
});

export const Order = model<OrderModel>('Order', orderSchema);