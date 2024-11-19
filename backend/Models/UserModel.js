import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, 'Invalid email format'], // Added custom error message
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Password length requirement
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['patient', 'admin'],
      default: 'patient',
    },
    // appointments: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Appointment',
    //   },
    // ],
    // history: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'History',
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
