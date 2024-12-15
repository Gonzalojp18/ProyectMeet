import express from 'express';
import { getUser, loginUser, registerUser, updateUser } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getUser)
router.post('/register', registerUser)
router.post('/login', loginUser);
router.put('/:id', protect, updateUser)

export default router;