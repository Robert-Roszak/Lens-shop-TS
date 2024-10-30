"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.updateOrderStatus = exports.getOrderById = exports.addOrder = void 0;
const enums_1 = require("../enums");
const orders_model_1 = require("../models/orders.model");
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contact, address, payment, shipping, message, email, items, toPay, deliveryFee, orderStatus } = req.body;
        const newOrder = new orders_model_1.Order({ contact, address, payment, shipping, message, email, items, toPay, deliveryFee, orderStatus });
        yield newOrder.save();
        res.json({ orderId: newOrder._id });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.addOrder = addOrder;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield orders_model_1.Order.findById(req.params.id);
        if (!result)
            res.status(404).json({ order: 'Not found' });
        else
            res.json(result);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getOrderById = getOrderById;
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    if (!Object.values(enums_1.OrderStatusesEnum).includes(status)) {
        return res.status(400).json({ message: 'Invalid status.' });
    }
    try {
        const updatedOrder = yield orders_model_1.Order.findByIdAndUpdate(id, { orderStatus: status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        res.status(200).json(updatedOrder);
    }
    catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Failed to update order status.' });
    }
});
exports.updateOrderStatus = updateOrderStatus;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, isAdmin } = req.query;
        if (isAdmin === 'true') {
            if (email === 'admin@admin.com') {
                const orders = yield orders_model_1.Order.find().limit(3);
                if (!orders)
                    res.status(404).json({ order: 'Not found' });
                else
                    res.json(orders);
            }
            else {
                const orders = yield orders_model_1.Order.find();
                if (!orders)
                    res.status(404).json({ order: 'Not found' });
                else
                    res.json(orders);
            }
        }
        else {
            const orders = yield orders_model_1.Order.find({ email });
            if (!orders)
                res.status(404).json({ orders: 'Not found' });
            else
                res.json(orders);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getOrders = getOrders;
