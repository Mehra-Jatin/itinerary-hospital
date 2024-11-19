import mongoose from 'mongoose';

const paymentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model (patient)
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model (doctor)
      required: true,
    },
    chatId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatRoom',
        required: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true, 
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending', 
    },
    paymentDate: {
      type: Date,
      default: Date.now, 
    },
  },
  {
    timestamps: true, 
  }
);


const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
