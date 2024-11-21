import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { 
  User, 
  Edit2, 
  Save, 
  Camera, 
  User2Icon
} from "lucide-react";

const DocProfile = () => {
  const { user, loading, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Please log in to view your profile
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await updateProfile(editedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed", error);
      // Consider adding user-friendly error notification
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedUser({});
    } else {
      setEditedUser({...user});
    }
    setIsEditing(prev => !prev);
  };

  const ProfileFields = [
    { key: 'FirstName', label: 'First Name' },
    { key: 'email', label: 'Email Address' },
    { key: 'PhoneNo', label: 'Phone Number' },
    { key: 'address', label: 'Address' },
    { key: 'specialization', label: 'Medical Specialization' },
  ];

  return (
    <div className="p-6 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden grid md:grid-cols-3 gap-6 p-8">
        {/* Profile Image Section */}
        <div className="col-span-1 flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            {user.profilePicture ? <img src={user.profilePicture} alt="Profile" className="w-48 h-48 rounded-full object-cover border-4 border-orange-100 shadow-lg" /> : <User2Icon size={200} />}
            <button className="absolute bottom-2 right-2 bg-orange-500 p-2 rounded-full text-white hover:bg-orange-600 transition">
              <Camera size={18} />
            </button>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 italic">Dr. {user.FirstName} {user.LastName}</h2>
            <p className="text-orange-600 font-medium">Doctor of Medicine</p>
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="col-span-2 space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h3 className="text-xl font-semibold text-gray-800">Profile Details</h3>
            <button 
              onClick={handleEditToggle}
              className="flex items-center gap-2 text-orange-600 hover:text-orange-800 transition"
            >
              {isEditing ? <Save size={20} /> : <Edit2 size={20} />}
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>

          <div className="space-y-4">
            {ProfileFields.map(({ key, label }) => (
              <div key={key} className="grid grid-cols-3 gap-4 items-center">
                <label className="text-gray-700 font-medium">{label}</label>
                {isEditing ? (
                  <input 
                    name={key}
                    value={editedUser[key] || user[key] || ''}
                    onChange={handleInputChange}
                    className="col-span-2 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-200 transition"
                  />
                ) : (
                  <p className="col-span-2 text-gray-600">{user[key] || 'Not specified'}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocProfile;