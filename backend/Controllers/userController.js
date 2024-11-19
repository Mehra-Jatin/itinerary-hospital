import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/UserModel.js';

// Register User
// Register User
export const registerUser = async (req, res) => {
  const { FirstName,LastName, email, password,age,gender} = req.body;

  try {
    if (!FirstName || !email || !password ) {
      return res.status(400).json({ success: false, message: 'FirstName, email, password are required.' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User with this email already exists.' });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ success: false, message: 'Username already taken.' });
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

    res.status(201).json({ success: true, message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};



export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Compare provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id},
      process.env.JWT_SECRET || 'secretKey', // Use an environment variable for security
      { expiresIn: '1h' }
    );

    // Send response with user info and token
    res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        userId: user._id,
        FirstName: user.FirstName,
        LastName: user.LastName,
        age:user.age,
        gender:user.gender,
        email: user.email,
        role: user.role,
        // history: user.history,
        // appointment: user.appointment,
      },
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { FirstName,LastName,age,gender,email,password } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ success: false, message: ' email  required.' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(400).json({ success: false, message: 'Email already in use.' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { FirstName,LastName,age,gender,email,password },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully.',
      updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.status(200).json({ success: true, message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

export const getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Get user by userId
    const user = await User.findById(userId)
      // .populate('appointments') // Assuming you have appointments and history collections
      // .populate('history');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Send user details
    res.status(200).json({
      success: true,
      user: {
        userId: user._id,
        FirstName: user.FirstName,
        LastName: user.LastName,
        age:user.age,
        gender:user.gender,
        email: user.email,
        role: user.role,
        // appointments: user.appointments,
        // history: user.history,
      },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

