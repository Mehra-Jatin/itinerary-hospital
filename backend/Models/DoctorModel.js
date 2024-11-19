import mongoose from 'mongoose';
import validator from 'validator';

const doctorSchema = mongoose.Schema(
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
    role: {
      type: String,
      default: 'doctor',
    },
    age:{
     type:Number,
    },
    gender:{
        type:String,
        enum:['male','female','other'],
    },
    specialization:{
        type:String,
        required:true,
    },
    experience:{
        type:Number,
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
