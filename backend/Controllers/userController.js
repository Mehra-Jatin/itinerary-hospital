
import User from '../Models/UserModel.js';


// update user
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

// Get User
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

