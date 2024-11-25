import express from 'express';
import router from './Routes/userRoute.js';  // Your route file
import connectDB from './config/db.js';  // Your DB connection
import dotenv from 'dotenv';
import cors from 'cors';
// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Specify your frontend origin
  credentials: true,              // Allow credentials (cookies, headers)
}));
// Middleware to parse JSON request bodies
app.use(express.json());

// Route setup
app.use("/api/v1", router);

// Connect to MongoDB
connectDB();

// Default route (optional)
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Start the server
const PORT = process.env.PORT||4000 ;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
