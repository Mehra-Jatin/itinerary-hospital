import express from 'express';
import { updateUser, deleteUser, getUser, getAllUsers,BookAppointment, getAllAppointments } from '../Controllers/userController.js';
import { updateDoctor, deleteDoctor, getDoctor, getAllDoctors,validateDoctor ,setAvailability,getAvailability ,removeAvailability, Putrating, getavgrating, GetReviews, PostReview, getDoctorRatingsAndReviews} from '../Controllers/doctorController.js';
import { register, login ,getHistory, getAppointment, updateAppointment, rescheduleAppointment,getNotification,updateNotification,deleteNotification} from '../Controllers/authController.js';
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
router.route('/doctor/rate/:doctorId').post(isAuthenticatedUser(), authorizeRoles('patient'), Putrating);//
router.route('/doctor/avg/:doctorId').get(isAuthenticatedUser(),authorizeRoles('admin','patient'), getavgrating);//
router.route('/doctor/getreview/:doctorId').get(isAuthenticatedUser(),authorizeRoles('admin','patient'), GetReviews);//
router.route('/doctor/postreview/:doctorId').post(isAuthenticatedUser(),authorizeRoles('admin','patient'), PostReview);//
router.route('/doctor/all/:doctorId').get(isAuthenticatedUser(), authorizeRoles('admin','patient'), getDoctorRatingsAndReviews);//
router.route('/doctor/:doctorId').get(isAuthenticatedUser(), getDoctor);
router.route('/doctors').get(getAllDoctors);
router.route('/setavailability/:doctorId').put(isAuthenticatedUser(),authorizeRoles('doctor'),setAvailability);
router.route('/getavailability/:doctorId').get(isAuthenticatedUser(),authorizeRoles('doctor'),getAvailability);
router.route('/cancleavailability/:doctorId').put(isAuthenticatedUser(),authorizeRoles('doctor'),removeAvailability);
router.route('/acceptvalidate/:doctorId').put(isAuthenticatedUser(),authorizeRoles('admin'),validateDoctor);
router.route('/canclevalidate/:doctorId').delete(isAuthenticatedUser(),authorizeRoles('admin'),deleteDoctor);
router.route('/history/:id').get(isAuthenticatedUser(),authorizeRoles('admin','patient','doctor'),getHistory);
router.route('/appointment/:id').get(isAuthenticatedUser(),authorizeRoles('admin','patient','doctor'),getAppointment);
router.route('/appointment/statusupdate').put(isAuthenticatedUser(),authorizeRoles('patient','doctor'),updateAppointment);
router.route('/rescheduleappointment').put(isAuthenticatedUser(),authorizeRoles('patient','doctor'),rescheduleAppointment);


router.route('/getnotification').get(isAuthenticatedUser(),authorizeRoles('admin'),getNotification);
router.route('/getallAppointement').get(isAuthenticatedUser(),authorizeRoles('admin'),getAllAppointments);
router.route('/updatenotification/:id').put(isAuthenticatedUser(),authorizeRoles('admin'),updateNotification);
router.route('/deletenotification/:id').delete(isAuthenticatedUser(),authorizeRoles('admin'),deleteNotification);

export default router;
