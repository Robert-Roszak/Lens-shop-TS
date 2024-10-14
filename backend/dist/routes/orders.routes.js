"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_controller_1 = require("../controllers/orders.controller");
const router = (0, express_1.Router)();
router.post('/orders', orders_controller_1.addOrder);
router.get('/orders/:id', orders_controller_1.getOrder);
exports.default = router;
