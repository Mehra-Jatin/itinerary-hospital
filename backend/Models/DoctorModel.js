import mongoose from 'mongoose';
import validator from 'validator';

const doctorSchema = mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
      default: '',
    },
    LastName: {
      type: String,
      default: '',
    },
    Image: {
      type: String,
      default: '',
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
      select: false, // Hide the password by default
      minlength: 6, // Password length requirement
    },
    role: {
      type: String,
      default: 'doctor',
    },
    age: {
      type: Number,
      default: 18,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'other'],
      default: '',
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    PhoneNo: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          // Regular expression to match a valid phone number format
          return /^[0-9]{10}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
    },
    isValidated: {
      type: Boolean,
      default: false,
    },
    availability:{
      type:Array,
      default:[] // yyyy-mm-dd
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

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
