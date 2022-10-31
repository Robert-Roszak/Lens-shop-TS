import { Router } from 'express';
import { addOrder } from '../controllers/orders.controller';
const router = Router();

router.post('/orders', addOrder);

export default router;