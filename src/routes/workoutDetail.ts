import { Router } from 'express';
import * as workoutDetailController from '../controllers/workoutDetail';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/workout-details', authenticateJWT, workoutDetailController.createWorkoutDetail);
router.get('/workout-details', authenticateJWT, workoutDetailController.getAllWorkoutDetails);
router.get('/workout-details/:id', authenticateJWT, workoutDetailController.getWorkoutDetailById);
router.put('/workout-details/:id', authenticateJWT, workoutDetailController.updateWorkoutDetail);
router.delete('/workout-details/:id', authenticateJWT, workoutDetailController.deleteWorkoutDetail);

export default router;
