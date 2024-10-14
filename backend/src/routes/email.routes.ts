import { Router } from 'express';
import { sendEmail } from '../controllers/email.controller';
const router = Router();

router.post('/send_email', sendEmail);

export default router;