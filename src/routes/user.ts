import { Router } from 'express';
import * as userController from '../controllers/user';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/users', userController.createUser);
router.get('/users', authenticateJWT, userController.getAllUsers);
router.get('/users/:id', authenticateJWT, userController.getUserById);
router.put('/users/:id', authenticateJWT, userController.updateUser);
router.delete('/users/:id', authenticateJWT, userController.deleteUser);

// Login route
router.post('/login', userController.loginUser);

export default router;
