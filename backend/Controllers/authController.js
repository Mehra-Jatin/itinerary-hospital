import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";
import Doctor from "../Models/DoctorModel.js";

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
  } = req.body;

  try {
    if (!FirstName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "FirstName, email, password are required.",
      });
    }

    if (role === "doctor") {
      const existingdoctor = await Doctor.findOne({ email });
      const existinguser = await User.findOne({ email });
      if (existingdoctor || existinguser) {
        return res.status(400).json({
          success: false,
          message: "Doctor or User with this email already exists.",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newDoctor = new Doctor({
        FirstName,
        LastName,
        email,
        age,
        gender,
        password: hashedPassword,
        specialization,
        experience,
      });

      await newDoctor.save();

      res
        .status(201)
        .json({ success: true, message: "Doctor registered successfully." });
    } else {
      const existingUser = await User.findOne({ email });
      const existingdoctor = await Doctor.findOne({ email });
      if (existingUser || existingdoctor) {
        return res.status(400).json({
          success: false,
          message: "User or Doctor with this email already exists.",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        FirstName,
        LastName,
        email,
        age,
        gender,
        password: hashedPassword,
      });

      await newUser.save();

      res
        .status(201)
        .json({ success: true, message: "User registered successfully." });
    }
  } catch (error) {
    console.error("Error registering :-", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    }

    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      // if no user find if doctor exist
      user = await Doctor.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found." });
      }
    }

    // Compare provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "secretKey", // Use an environment variable for security
      { expiresIn: "1h" }
    );

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
