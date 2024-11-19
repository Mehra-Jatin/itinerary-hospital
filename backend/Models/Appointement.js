import mongoose from 'mongoose';

const appointmentSchema = mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the doctor, assuming they are in the 'User' collection
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the patient, assuming they are also in the 'User' collection
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending', // Default value is pending
    },
    appointmentStatus: {
      type: String,
      enum: ['confirmed', 'completed', 'cancelled'],
      default: 'confirmed', // Default value is confirmed
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` timestamps
  }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
