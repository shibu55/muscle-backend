import { Router } from 'express';
import * as bodyMeasurementController from '../controllers/bodyMeasurement';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/body-measurements', authenticateJWT, bodyMeasurementController.createBodyMeasurement);
router.get('/body-measurements', authenticateJWT, bodyMeasurementController.getAllBodyMeasurements);
router.get('/body-measurements/:id', authenticateJWT, bodyMeasurementController.getBodyMeasurementById);
router.put('/body-measurements/:id', authenticateJWT, bodyMeasurementController.updateBodyMeasurement);
router.delete('/body-measurements/:id', authenticateJWT, bodyMeasurementController.deleteBodyMeasurement);

export default router;
