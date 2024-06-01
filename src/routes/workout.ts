import { Router } from 'express';
import * as workoutController from '../controllers/workout';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/workouts', authenticateJWT, workoutController.createWorkout);
router.get('/workouts', authenticateJWT, workoutController.getAllWorkouts);
router.get('/workouts/:id', authenticateJWT, workoutController.getWorkoutById);
router.put('/workouts/:id', authenticateJWT, workoutController.updateWorkout);
router.delete('/workouts/:id', authenticateJWT, workoutController.deleteWorkout);

export default router;
