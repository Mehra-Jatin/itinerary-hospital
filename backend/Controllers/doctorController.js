import bcrypt from 'bcrypt';
import Doctor from '../Models/DoctorModel.js';
import nodemailer from 'nodemailer';
// Update Doctor
export const updateDoctor = async (req, res) => {
  const { doctorId } = req.params;
  const { FirstName, LastName, age, gender, email, password, specialization, experience, PhoneNo } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    // Check if the email is already in use by another doctor
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor && existingDoctor._id.toString() !== doctorId) {
      return res.status(400).json({ success: false, message: 'Email already in use by another doctor.' });
    }

    // Hash the password if it's being updated
    let updatedData = { FirstName, LastName, age, gender, email, specialization, experience, PhoneNo };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(password, salt);
    }

    // Find the doctor and update
    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, updatedData, { new: true, runValidators: true });

    if (!updatedDoctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found.' });
    }

    // Exclude sensitive fields like password before returning data
    updatedDoctor.password = undefined;

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

    // Exclude sensitive fields like password before returning data
    doctor.password = undefined;

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
        PhoneNo: doctor.PhoneNo,
      },
    });
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

// Validate Doctor by admin
export const validateDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Find and update the doctor atomically
    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { isValidated: true },
      { new: true } // Return the updated document
    );
     
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found.' });
    }

    // Send an email to the doctor
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD,
      },
      debug: true,
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: doctor.email,
      subject: 'Doctor Validation',
      text: `Hello ${doctor.FirstName},\n\nYour account has been validated by the admin.\n\nRegards,\nHealthcare Team`,
    };
    try{
       transporter.sendMail(mailOptions).then(() => {
        console.log(`Email sent successfully to ${doctor.email}`);
       });
    }
    catch(error){
      console.error('Error sending email:', error);
    }

    res.status(200).json({ success: true, message: 'Doctor validated successfully.', doctor });
  } catch (error) {
    console.error('Error validating doctor:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }

};


// Get All Doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find(); // Fetch all doctors from the database

    if (!doctors || doctors.length === 0) {
      return res.status(404).json({ success: false, message: 'No doctors found.' });
    }

    // Exclude sensitive fields like password before returning data
    doctors.forEach(doctor => doctor.password = undefined);

    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};
