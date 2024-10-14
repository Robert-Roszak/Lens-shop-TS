"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const router = (0, express_1.Router)();
router.get('/products', products_controller_1.getAll);
router.get('/products/:id', products_controller_1.getOneProduct);
exports.default = router;
