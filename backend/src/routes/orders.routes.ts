import { Router } from 'express';
import { addOrder, getOrderById, updateOrderStatus, getOrders } from '../controllers/orders.controller';
const router = Router();

router.post('/orders', addOrder);
router.put('/orders/order/:id/status', updateOrderStatus);
router.get('/orders/order/:id', getOrderById);
router.get('/orders', getOrders);

export default router;