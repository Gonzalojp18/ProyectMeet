import express from 'express';
import { getUser, loginUser, registerUser, updateUser } from '../controllers/authController.js';

const router = express.Router();

router.get('/', getUser)
router.post('/register', registerUser)
router.post('/login', loginUser);
router.put('/:id', updateUser)

export default router;