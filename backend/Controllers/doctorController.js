import Doctor from '../Models/DoctorModel.js';

// Update Doctor
export const updateDoctor = async (req, res) => {
  const { doctorId } = req.params;
  const { FirstName, LastName, age, gender, email, password, specialization, experience } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor && existingDoctor._id.toString() !== doctorId) {
      return res.status(400).json({ success: false, message: 'Email already in use.' });
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { FirstName, LastName, age, gender, email, password, specialization, experience },
      { new: true, runValidators: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Doctor updated successfully.',
      updatedDoctor,
    });
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

// Delete Doctor
export const deleteDoctor = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const doctor = await Doctor.findByIdAndDelete(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found.' });
    }

    res.status(200).json({ success: true, message: 'Doctor deleted successfully.' });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

// Get Doctor

export const getDoctor = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found.' });
    }

    res.status(200).json({
      success: true,
      doctor: {
        doctorId: doctor._id,
        FirstName: doctor.FirstName,
        LastName: doctor.LastName,
        age: doctor.age,
        gender: doctor.gender,
        email: doctor.email,
        role: doctor.role,
        specialization: doctor.specialization,
        experience: doctor.experience,
      },
    });
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find(); // Fetch all doctors from the database

    if (!doctors || doctors.length === 0) {
      return res.status(404).json({ success: false, message: 'No doctors found.' });
    }

    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};