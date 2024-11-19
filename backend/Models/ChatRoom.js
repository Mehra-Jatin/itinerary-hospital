import mongoose from 'mongoose';

const chatRoomSchema = mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model for the doctor
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model for the patient
      required: true,
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment', // You can reference a Payment model if you have one
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'completed'],
      default: 'active',
    },
    expiresIn: {
      type: Date,
      required: true,
    },
    chatContent: [
      {
        message: {
          type: String,
          required: true,
        },
        sender: {
          type: String,
          enum: ['doctor', 'patient'],
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create the ChatRoom model based on the schema
const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

export default ChatRoom;
