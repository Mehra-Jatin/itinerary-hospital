import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";
import Doctor from "../Models/DoctorModel.js";
import Appointment from "../Models/Appointement.js";
import History from "../Models/History.js";

// Register
export const register = async (req, res) => {
  const {
    FirstName,
    LastName,
    email,
    password,
    age,
    gender,
    role,
    specialization,
    experience,
    PhoneNo,
  } = req.body;

  try {
    // Validate required fields
    if (!FirstName || !email || !password || !PhoneNo) {
      return res.status(400).json({
        success: false,
        message: "FirstName, email, password, and PhoneNo are required.",
      });
    }

    // Check if the email already exists
     const existingDoctor = await Doctor.findOne({ $or: [{ email }, { PhoneNo }] });
     const existingUser = await User.findOne({ $or: [{ email }, { PhoneNo }] });

    if (existingUser || existingDoctor) {
      return res.status(400).json({
        success: false,
        message: `A ${role} with this email or PhoneNO already exists.`,
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the appropriate user or doctor
    if (role === "doctor") {
      const newDoctor = new Doctor({
        FirstName,
        LastName,
        email,
        age,
        gender,
        password: hashedPassword,
        specialization,
        experience,
        PhoneNo,
      });
      await newDoctor.save();
      return res.status(201).json({
        success: true,
        message: "Doctor registered successfully.",
      });
    } else {
      const newUser = new User({
        FirstName,
        LastName,
        email,
        age,
        gender,
        password: hashedPassword,
        PhoneNo,
      });
      await newUser.save();
      return res.status(201).json({
        success: true,
        message: "User registered successfully.",
      });
    }
  } catch (error) {
    console.error("Error registering user/doctor:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Find user or doctor by email
    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      user = await Doctor.findOne({ email }).select("+password");
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User or Doctor not found.",
        });
      }
    }

    // Compare provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials.",
      });
    }
   
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY||'secretKey', // Ensure a strong secret
      { expiresIn: "1h" }
    );
    
    user.password = undefined; // Don't send password
    // Send response with user info and token
    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

//get user or doctor history

export const getHistory = async (req, res) => {
  const {id}= req.params;
  try {
    const user = await User.findById(id);
    const doctor = await Doctor.findById(id);
    if (!user && !doctor) {
      return res.status(404).json({ success: false, message: "User or Doctor not found." });
    }
    
    const history = await History.find({$or: [{userId:id}, {doctorId:id}]});
    res.status(200).json({
      success: true,
      message: "History retrieved successfully.",
      history: history,
    });
  }
  catch (error) {
    console.error("Error getting user appointment:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// Get user or doctor appointment
export const getAppointment = async (req, res) => {
  const {id}= req.params;
  try {
    const user = await User.findById(id);
    const doctor = await Doctor.findById(id);
    if (!user && !doctor) {
      return res.status(404).json({ success: false, message: "User or Doctor not found." });
    }
    // 
    const now = new Date();
    // "2024-11-25T00:00:00.000Z"
    const offset= 5.5*60*60*1000;
    const compare = new Date(now.getTime() + offset);
    console.log(compare);
    const expiredAppointments = await Appointment.find({
      endtime: {$lte: compare}, 
      chat:true,
    });
    if(expiredAppointments.length>0){
        const updated = await Appointment.updateMany(
            {
            _id: {$in: expiredAppointments.map(appointment => appointment._id)},
           }, 
           {$set:{chat:false}}
        );
       
    }
    console.log('doc',id);
    
    // const apts=await Appointment.find()
    // console.log('sdn',apts);
    
    const appointment = await Appointment.find({$or: [{userId:id}, {doctorId:id}]});
    console.log('app',appointment);
    
    res.status(200).json({
      success: true,
      message: "Appointment retrieved successfully.",
      appointment: appointment,
    });
  }
  catch (error) {
    console.error("Error getting user appointment:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};


// update appointment status

export const updateAppointment = async (req, res) => {
  const { status,appointmentId } = req.body;
  try {
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, {appointmentStatus: status }, { new: true, runValidators: true });
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found." });
    }
    res.status(200).json({
      success: true,
      message: "Appointment updated successfully.",
      appointment,
    });
  }
  catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};