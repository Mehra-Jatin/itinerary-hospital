import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { 
  User2Icon, 
  Edit2, 
  Save, 
  Camera,
  X
} from "lucide-react";

const DEFAULT_PROFILE_IMAGE = "https://cdn.pixabay.com/photo/2017/01/31/22/32/doctor-2027768_640.png";

const DocProfile = () => {
  const { user, loading, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [profileImage, setProfileImage] = useState(user?.profilePicture || DEFAULT_PROFILE_IMAGE);
  const [isSaving, setIsSaving] = useState(false);

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setEditedUser(prev => ({
          ...prev,
          profilePicture: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile(editedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed", error);
      // Consider adding user-friendly error notification
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedUser({});
    setProfileImage(user.image || DEFAULT_PROFILE_IMAGE);
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      handleCancel();
    } else {
      setEditedUser({...user});
      setIsEditing(true);
    }
  };

  const ProfileFields = [
    { key: 'FirstName', label: 'First Name' },
    { key: 'LastName', label: 'Last Name' },
    { key: 'email', label: 'Email Address' },
    { key: 'PhoneNo', label: 'Phone Number' },
    { key: 'address', label: 'Address' },
    { key: 'specialization', label: 'Medical Specialization' },
  ];

  return (
    <div className="p-6 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden md:grid md:grid-cols-3 gap-6 p-8">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center justify-center space-y-4 my-5">
          <div className="relative">
            {user.image ? (
              <>
                <img 
                  src={profileImage}
                  className="w-48 h-48 rounded-full object-cover border-4 border-orange-100 shadow-lg"
                />
              </>
            ) : (
              <><div className="w-48 h-48 rounded-full bg-gray-300 flex items-center justify-center italic font-semibold border-2 border-orange-500 text-gray-500">Upload Profile Image</div></>
            )}
            {isEditing && (
              <input 
                type="file" 
                id="profileImageUpload"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            )}
            {isEditing && (
              <label 
                htmlFor="profileImageUpload"
                className="absolute bottom-2 right-2 bg-orange-500 p-2 rounded-full text-white hover:bg-orange-600 transition cursor-pointer"
              >
                <Camera size={18} />
              </label>
            )}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 italic">
              Dr. {user.FirstName || 'N/A'} {user.LastName || 'N/A'}
            </h2>
            <p className="text-orange-600 font-medium">
              {user.specialization ? `Doctor of ${user.specialization}` : 'Medical Professional'}
            </p>
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="col-span-2 space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Profile Details
            </h3>
            <div className="flex items-center gap-4">
              {isEditing && !isSaving && (
                <button 
                  onClick={handleCancel}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
                >
                  <X size={20} /> Cancel
                </button>
              )}
              <button 
                onClick={isEditing ? handleSave : handleEditToggle}
                disabled={isSaving}
                className={`flex items-center gap-2 ${
                  isEditing 
                    ? 'text-green-600 hover:text-green-800' 
                    : 'text-orange-600 hover:text-orange-800'
                } transition ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSaving ? (
                  <div className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-current"></span>
                    Saving...
                  </div>
                ) : (
                  <>
                    {isEditing ? <Save size={20} /> : <Edit2 size={20} />}
                    {isEditing ? 'Save' : 'Edit'}
                  </>
                )}
              </button>
            </div>
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
                  <p className="col-span-2 text-gray-600">
                    {user[key] || 'N/A'}
                  </p>
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