import express from 'express';
import { updateUser, deleteUser, getUser, getAllUsers } from '../Controllers/userController.js';
import { updateDoctor, deleteDoctor, getDoctor, getAllDoctors } from '../Controllers/doctorController.js';
import { register, login } from '../Controllers/authController.js';
import { authorizeRoles, isAuthenticatedUser } from '../Middleware/roleMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.route('/user/:userId')
  .put(isAuthenticatedUser(), authorizeRoles('patient', 'admin'), updateUser)
  .delete(isAuthenticatedUser(), authorizeRoles('admin','paitent'), deleteUser)
  .get(isAuthenticatedUser(), getUser);

router.route('/users')
  .get(isAuthenticatedUser(), authorizeRoles('admin'), getAllUsers);

router.route('/doctor/:doctorId').put(isAuthenticatedUser(), authorizeRoles('admin', 'doctor'), updateDoctor);
router.route('/doctor/:doctorId').delete(isAuthenticatedUser(), authorizeRoles('admin','doctor'), deleteDoctor);
router.route('/doctor/:doctorId').get(isAuthenticatedUser(), getDoctor);
router.route('/doctors').get(isAuthenticatedUser(), authorizeRoles('admin', 'patient'), getAllDoctors);

export default router;
