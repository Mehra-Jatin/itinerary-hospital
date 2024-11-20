import express from 'express';
import { updateUser, deleteUser, getUser } from '../Controllers/userController.js';
import { updateDoctor,deleteDoctor,getDoctor, getAllDoctors } from '../Controllers/doctorController.js';
import { register,login } from '../Controllers/authController.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);

router.put('/user/:userId', authMiddleware, updateUser); 
router.delete('/user/:userId', authMiddleware, deleteUser);
router.get('/user/:userId', authMiddleware, getUser); 

router.put('/doctor/:doctorId', authMiddleware, updateDoctor);
router.delete('/doctor/:doctorId', authMiddleware, deleteDoctor);
router.get('/doctor/:doctorId', authMiddleware, getDoctor);
router.get('/doctors', getAllDoctors);

export default router;
