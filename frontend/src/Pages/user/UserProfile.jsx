import { useAuth } from "@/hooks/useAuth";
import React, { useState } from "react";
import { MdEditSquare } from "react-icons/md";



const UserProfile = () => {
  // const [isEditing, setIsEditing] = useState(false);
  // const { user } = useAuth();

  // const handleEditToggle = () => {
  //   setIsEditing((prev) => !prev);
  // };

  // const handleInputChange = (e) => {
  //   // const { name, value } = e.target;
  //   // setuser((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleSave = () => {
    
  //   console.log("Updated data:", user);
  //   setIsEditing(false);
  // };

  const [isEditing, setIsEditing] = useState(false);
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in</div>;
  }

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="flex gap-6 p-6 bg-gray-50 min-h-screen items-start  flex-wrap mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center w-72">
        <div className="w-24 h-24 mb-4">
          <img
            src="https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww"
            alt="Profile"
            className="rounded-full w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-semibold mb-2">{user.FirstName}</h2>
        <p className="text-gray-600 mb-2">Full Stack Developer</p>
        <p className="text-gray-500 text-sm mb-6">{user.address}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 flex-1">
        <div className="flex justify-between items-start">
          <div className="space-y-6 flex-1">
            {Object.entries(user).map(([key, value]) => (
              <React.Fragment key={key}>
                <div className="flex flex-wrap gap-8">
                  <label className="text-gray-900 block capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name={key}
                      value={value}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    />
                  ) : (
                    <p className="text-gray-600">{value}</p>
                  )}
                </div>
                <hr />
              </React.Fragment>
            ))}
          </div>
          <button
            className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition-colors"
            onClick={handleEditToggle}
          >
            <MdEditSquare className="text-lg" />
          </button>
        </div>
        {isEditing && (
          <div className="mt-6">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
