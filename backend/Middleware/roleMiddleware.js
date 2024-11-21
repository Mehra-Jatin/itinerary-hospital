import jwt from 'jsonwebtoken';
import User from "../Models/UserModel.js";
import Doctor from '../Models/DoctorModel.js';

// Authentication middleware
const isAuthenticatedUser = () => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'secretKey');
      console.log('Decoded JWT:', decoded); // Log the decoded JWT

      // Try to find the user and the doctor using the decoded userId
      const user = await User.findById(decoded.userId);
      const doctor = await Doctor.findById(decoded.userId);

      if (!user && !doctor) {
        return res.status(404).json({ message: 'User or Doctor not found.' });
      }

      // Assign the user or doctor to the request object
      if (user) {
        req.user = user;
      }

      if (doctor) {
        req.doctor = doctor;
      }

      console.log('User:', req.user); // Log the user details
      console.log('Doctor:', req.doctor); // Log the doctor details (if applicable)

      next();
    } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
  };
};

// Authorization middleware
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const currentUser = req.user || req.doctor;

    if (!currentUser) {
      return res.status(401).json({ message: 'User or Doctor not authenticated.' });
    }

    if (!roles.includes(currentUser.role)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }

    next();
  };
};

export { isAuthenticatedUser, authorizeRoles };
