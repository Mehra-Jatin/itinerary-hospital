import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    status: {
      type: String,
      enum: ['created', 'confirmed', 'completed', 'cancelled'],
      default: 'created',
    },
    createdAt: {
      type: Date,
      default: Date.now, 
    },
  },
  {
    timestamps: true, 
  }
);


const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
