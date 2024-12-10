import mongoose from 'mongoose';

const appointmentSchema = mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor', // Reference to the doctor, assuming they are in the 'Doctor' collection
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the patient, assuming they are also in the 'User' collection
      required: true,
    },
    time:{
      type:String, //stored as HH:MM
      required:true,
    } ,
    endtime:{
      type:Date,
    } ,
    date: {
      type: Date,  //yyyy-mm-dd
      required: true,
    },
    // reason:{
    //   type:String,
    //   required:true,
    // },
    chat:{
      type:Boolean,
      default:false,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending', // Default value is pending
    },
    appointmentStatus: {
      type: String,
      enum: ['confirmed', 'completed', 'cancelled','pending',],
      default: 'pending', // Default value is confirmed
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` timestamps
  }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
