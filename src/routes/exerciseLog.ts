import { Router } from 'express';
import * as exerciseLogController from '../controllers/exerciseLog';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/exercise-logs', authenticateJWT, exerciseLogController.createExerciseLog);
router.get('/exercise-logs', authenticateJWT, exerciseLogController.getAllExerciseLogs);
router.get('/exercise-logs/:id', authenticateJWT, exerciseLogController.getExerciseLogById);
router.put('/exercise-logs/:id', authenticateJWT, exerciseLogController.updateExerciseLog);
router.delete('/exercise-logs/:id', authenticateJWT, exerciseLogController.deleteExerciseLog);

export default router;
