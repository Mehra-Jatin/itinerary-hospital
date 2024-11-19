import express from 'express';
import { registerUser, loginUser, updateUser, deleteUser, getUser } from '../Controllers/userController.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);

router.put('/user/:userId', authMiddleware, updateUser); 
router.delete('/user/:userId', authMiddleware, deleteUser);
router.get('/user/:userId', authMiddleware, getUser); 

export default router;
