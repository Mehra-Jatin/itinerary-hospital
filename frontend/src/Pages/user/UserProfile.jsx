import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePatient } from "@/contexts/PatientContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  UserCircle,
  Edit2,
  Save,
  X,
  Mail,
  Phone,
  Cake,
  User,
  Loader2,
  Camera
} from "lucide-react";

import { useToast } from "@/hooks/use-toast";

const DEFAULT_PROFILE_IMAGE = "/api/placeholder/200/200?text=User";

const UserProfile = () => {
  const { user, loading, updateUserData } = useAuth();
  const { updatePatientProfile, isLoading, error } = usePatient();
  const [isEditing, setIsEditing] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.profilePicture || DEFAULT_PROFILE_IMAGE);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    FirstName: user?.FirstName || "",
    LastName: user?.LastName || "",
    email: user?.email || "",
    PhoneNo: user?.PhoneNo || "",
    age: user?.age || "",
    gender: user?.gender || ""
  });

  useEffect(() => {
    if (user) {
      setFormData({
        FirstName: user.FirstName || "",
        LastName: user.LastName || "",
        email: user.email || "",
        PhoneNo: user.PhoneNo || "",
        age: user.age || "",
        gender: user.gender || ""
      });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (!user) {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardContent className="p-8 text-center">
          <UserCircle className="w-20 h-20 mx-auto mb-6 text-primary/70" />
          <h2 className="text-2xl font-semibold text-gray-700">Please log in to view your profile</h2>
        </CardContent>
      </Card>
    );
  }

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.FirstName || !formData.LastName) {
      setValidationError("First name and last name are required");
      return false;
    }
    if (!formData.email) {
      setValidationError("Email is required");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      setValidationError("Invalid email format");
      return false;
    }
    if (formData.age && (isNaN(formData.age) || formData.age < 0 || formData.age > 150)) {
      setValidationError("Please enter a valid age");
      return false;
    }

    setValidationError("");
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setValidationError("");
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setIsSaving(true);
      if (!user?._id) {
        throw new Error('User ID is missing');
      }

      const result = await updatePatientProfile(user._id, formData);
      if (result.success) {
        updateUserData({
          ...user,
          ...formData
        });
        setIsEditing(false);

        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
          status: "success",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast({
        title: "Update Failed",
        description: error.message,
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsSaving(false);
    }
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

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <Card className="w-full border-none shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/20 py-8 px-6 relative">
          <div className="absolute right-6 top-6 space-x-2 z-10">
            {isEditing ? (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsEditing(false);
                    setValidationError("");
                    setFormData({
                      FirstName: user.FirstName || "",
                      LastName: user.LastName || "",
                      email: user.email || "",
                      PhoneNo: user.PhoneNo || "",
                      age: user.age || "",
                      gender: user.gender || ""
                    });
                  }}
                  disabled={isSaving}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <X className="h-4 w-4 mr-2" /> Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-orange-600 text-white hover:bg-orange-600/90 flex items-center"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
                className="text-primary hover:bg-primary/10"
              >
                <Edit2 className="h-5 w-5" />
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-6 relative z-0">
            {/* <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <UserCircle className="w-16 h-16 text-primary/70" />
              )}
            </div> */}
            <div className="relative group">
              {user.image ? (
                <>
                  <img
                    src={user.image}
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
            <div>
              <CardTitle className="text-3xl font-bold text-gray-800">
                {isEditing ? (
                  <div className="flex gap-3">
                    <Input
                      name="FirstName"
                      value={formData.FirstName}
                      onChange={handleInputChange}
                      className="w-40 bg-white/80"
                      disabled={isSaving}
                      placeholder="First Name"
                    />
                    <Input
                      name="LastName"
                      value={formData.LastName}
                      onChange={handleInputChange}
                      className="w-40 bg-white/80"
                      disabled={isSaving}
                      placeholder="Last Name"
                    />
                  </div>
                ) : (
                  `${user.FirstName} ${user.LastName}`
                )}
              </CardTitle>
              <CardDescription className="text-gray-600">Patient Profile</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6 bg-white">
          {(validationError || error) && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>
                {validationError || error}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <Mail className="w-5 h-5 text-primary" />,
                label: "Email",
                name: "email",
                type: "email"
              },
              {
                icon: <Phone className="w-5 h-5 text-primary" />,
                label: "Phone Number",
                name: "PhoneNo"
              },
              {
                icon: <Cake className="w-5 h-5 text-primary" />,
                label: "Age",
                name: "age",
                type: "number"
              },
              {
                icon: <User className="w-5 h-5 text-primary" />,
                label: "Gender",
                name: "gender"
              }
            ].map(({ icon, label, name, type = "text" }) => (
              <div key={name} className="space-y-2">
                <Label className="flex items-center gap-2 text-gray-700">
                  {icon} {label}
                </Label>
                {isEditing ? (
                  <Input
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleInputChange}
                    disabled={isSaving}
                    className="bg-gray-50 border-gray-200 focus:ring-primary/30"
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                ) : (
                  <p className="text-sm text-gray-600">
                    {user[name] || "Not specified"}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;