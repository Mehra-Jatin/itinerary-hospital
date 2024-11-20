import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },

    LastName: {
      type: String,
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
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'other'],
    },    
    role: {
      type: String,
      enum: ['patient', 'admin'],
      default: 'patient',
    },
    PhoneNo: {
      type: Number,
      required: true,
      validate: {
        validator: function(v) {
          // Regular expression to match a valid phone number format
          return /^[0-9]{10}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
    }
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
