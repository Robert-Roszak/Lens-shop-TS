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
exports.getOneProduct = exports.getAll = void 0;
const products_model_1 = require("../models/products.model");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield products_model_1.Product.find();
        if (!result)
            res.status(404).json({ product: 'Not found' });
        else
            res.json(result);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getAll = getAll;
const getOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield products_model_1.Product.findById(req.params.id);
        if (!result)
            res.status(404).json({ product: 'Not found' });
        else
            res.json(result);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getOneProduct = getOneProduct;
