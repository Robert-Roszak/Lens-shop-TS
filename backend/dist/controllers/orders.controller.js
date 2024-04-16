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
exports.getOrder = exports.addOrder = void 0;
const orders_model_1 = require("../models/orders.model");
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contact, address, payment, shipping, message, email, items, toPay } = req.body;
        const newOrder = new orders_model_1.Order({ contact, address, payment, shipping, message, email, items, toPay });
        yield newOrder.save();
        res.json({ orderId: newOrder._id });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.addOrder = addOrder;
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.getOrder = getOrder;
