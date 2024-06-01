import { Router } from 'express';
import * as exerciseController from '../controllers/exercise';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/exercises', authenticateJWT, exerciseController.createExercise);
router.get('/exercises', authenticateJWT, exerciseController.getAllExercises);
router.get('/exercises/:id', authenticateJWT, exerciseController.getExerciseById);
router.put('/exercises/:id', authenticateJWT, exerciseController.updateExercise);
router.delete('/exercises/:id', authenticateJWT, exerciseController.deleteExercise);

export default router;
