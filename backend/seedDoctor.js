import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Doctor from './Models/DoctorModel.js';


// Load environment variables
dotenv.config();

// Sample doctor data
const doctorData = [
  {
    FirstName: 'John',
    LastName: 'Doe',
    age: 40,
    gender:'Male',
    email: 'johndoe@example.com',
    password: 'password123', // Ideally, hash this password
    specialization: 'Cardiology',
    experience: 15,
  },
  {
    FirstName: 'Jane',
    LastName: 'Smith',
    age: 35,
    gender: 'Female',
    email: 'janesmith@example.com',
    password: 'password123', // Ideally, hash this password
    specialization: 'Neurology',
    experience: 10,
  },
  {
    FirstName: 'Alice',
    LastName: 'Johnson',
    age: 45,
    gender: 'Female',
    email: 'alicejohnson@example.com',
    password: 'password123', // Ideally, hash this password
    specialization: 'Pediatrics',
    experience: 20,
  },
  {
    FirstName: 'Robert',
    LastName: 'Brown',
    age: 50,
    gender: 'Male',
    email: 'robertbrown@example.com',
    password: 'password123', // Ideally, hash this password
    specialization: 'Orthopedics',
    experience: 25,
  },
];

// Seed database function
const seedDoctors = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI||"mongodb://127.0.0.1:27017/itinerary", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    // Clear existing data
    await Doctor.deleteMany();
    console.log('Existing doctors deleted');

    // Insert new data
    await Doctor.insertMany(doctorData);
    console.log('Doctors seeded successfully');

    // Disconnect from the database
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding doctors:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

// Run the seed function
seedDoctors();
