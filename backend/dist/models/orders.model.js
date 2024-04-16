"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    contact: { type: String, required: true },
    address: { type: String, required: true },
    payment: { type: String, required: true },
    shipping: { type: String, required: true },
    message: { type: String },
    email: { type: String, required: true },
    items: { type: [Object], required: true },
    toPay: { type: Number, required: true },
});
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
