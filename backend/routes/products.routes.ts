import { Router } from 'express';
import { getAll } from '../controllers/products.controller';
const router = Router();

router.get('/products', getAll);

export default router;