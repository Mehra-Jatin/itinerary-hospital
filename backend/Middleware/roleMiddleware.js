import jwt from 'jsonwebtoken';
import User from "../Models/UserModel.js";

const isAuthenticatedUser = () => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'secretKey');
      req.user = await User.findById(decoded.userId);
      console.log(req.user.role);

      if (!req.user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      next();
    } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
  };
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }

    next();
  };
};

export { isAuthenticatedUser, authorizeRoles };
