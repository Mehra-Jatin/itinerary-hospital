import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://jatin:1234@cluster0.xox4g.mongodb.net/itinerary", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};

export default connectDB;
// 'mongodb://127.0.0.1:27017/itinerary'