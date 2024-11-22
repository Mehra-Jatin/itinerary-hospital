import express from 'express';
import { updateUser, deleteUser, getUser, getAllUsers,BookAppointment } from '../Controllers/userController.js';
import { updateDoctor, deleteDoctor, getDoctor, getAllDoctors,validateDoctor } from '../Controllers/doctorController.js';
import { register, login ,getHistory, getAppointment, updateAppointment} from '../Controllers/authController.js';
import { authorizeRoles, isAuthenticatedUser } from '../Middleware/roleMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.route('/user/:userId')
  .put(isAuthenticatedUser(), authorizeRoles('patient', 'admin'), updateUser)
  .delete(isAuthenticatedUser(), authorizeRoles('admin','paitent'), deleteUser)
  .get(isAuthenticatedUser(), getUser);
router.route('/user/bookappointment').post(isAuthenticatedUser(),authorizeRoles('patient'),BookAppointment);
router.route('/users')
  .get(isAuthenticatedUser(), authorizeRoles('admin'), getAllUsers);

router.route('/doctor/:doctorId').put(isAuthenticatedUser(), authorizeRoles('admin', 'doctor'), updateDoctor);
router.route('/doctor/:doctorId').delete(isAuthenticatedUser(), authorizeRoles('admin','doctor'), deleteDoctor);
router.route('/doctor/:doctorId').get(isAuthenticatedUser(), getDoctor);
router.route('/doctors').get(isAuthenticatedUser(), authorizeRoles('admin', 'patient'), getAllDoctors);

router.route('/validate/:doctorId').put(isAuthenticatedUser(),authorizeRoles('admin'),validateDoctor);
router.route('/history/:id').get(isAuthenticatedUser(),authorizeRoles('admin','patient','doctor'),getHistory);
router.route('/appointment/:id').get(isAuthenticatedUser(),authorizeRoles('admin','patient','doctor'),getAppointment);

router.route('/appointment/update').put(isAuthenticatedUser(),authorizeRoles('patient','doctor'),updateAppointment);
export default router;
