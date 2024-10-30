import { OrderStatusesEnum } from '../enums';
import { Order } from '../models/orders.model';
import { RequestHandler } from 'express';

export const addOrder: RequestHandler = async (req, res) => {
  try {
    const { contact, address, payment, shipping, message, email, items, toPay, deliveryFee, orderStatus} = req.body;
    const newOrder = new Order({ contact, address, payment, shipping, message, email, items, toPay, deliveryFee, orderStatus});
    await newOrder.save();
    res.json({ orderId: newOrder._id });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

export const getOrderById: RequestHandler = async (req, res) => {
  try {
    const result = await Order.findById(req.params.id);
    if(!result) res.status(404).json({ order: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
};

export const updateOrderStatus : RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!Object.values(OrderStatusesEnum).includes(status as OrderStatusesEnum)) {
    return res.status(400).json({ message: 'Invalid status.' });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { orderStatus: status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Failed to update order status.' });
  }
};

export const getOrders: RequestHandler = async (req, res) => {
  try {
    const { email, isAdmin } = req.query;

    if (isAdmin === 'true') {
      if (email === 'admin@admin.com') {
        const orders = await Order.find().limit(3);
        if(!orders) res.status(404).json({ order: 'Not found' });
        else res.json(orders);
      } else {
        const orders = await Order.find();
        if(!orders) res.status(404).json({ order: 'Not found' });
        else res.json(orders);
      }
    } else {
      const orders = await Order.find({ email });
      if(!orders) res.status(404).json({ orders: 'Not found' });
      else res.json(orders);
    }    
  }
  catch(err) {
    res.status(500).json(err);
  }
};