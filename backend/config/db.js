import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect( process.env.MONGODB_URL, {
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};

export default connectDB;
// The connectDB function connects to MongoDB using the MONGODB_URL environment variable.
// mongodb+srv://jatin:1234@cluster0.xox4g.mongodb.net/itinerary