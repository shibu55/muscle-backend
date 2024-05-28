import { Router } from 'express';
import * as pingController from '../controllers/ping';

const router = Router();

router.get('/ping', pingController.ping);

export default router;