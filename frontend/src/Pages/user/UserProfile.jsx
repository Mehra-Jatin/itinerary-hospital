import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePatient } from "@/contexts/PatientContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  Trash2,
  Mail,
  Phone,
  Cake,
  User
} from "lucide-react";

import { useToast } from "@/hooks/use-toast";

const UserProfile = () => {
  const { user, loading, logout, updateUserData } = useAuth();
  const { updatePatientProfile, deletePatientAccount, isLoading, error } = usePatient();
  const [isEditing, setIsEditing] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast()


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
      <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (!user) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6 text-center">
          <UserCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold">Please log in to view your profile</h2>
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
    setValidationError(""); // Clear validation error when user starts typing
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
        // Update the user data in AuthContext
        updateUserData({
          ...user,
          ...formData
        });
        setIsEditing(false);

        // Add a success toast or message
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
          status: "success",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      // Add an error toast or message
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

  const handleDelete = async () => {
    try {
      const result = await deletePatientAccount(user._id);
      if (result.success) {
        // Logout is handled by PatientContext
      }
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="w-full">
        <CardHeader className="relative pb-8">
          <div className="absolute right-6 top-6 space-x-2">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  size="icon"
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
                  disabled={isLoading}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  variant="default"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2"
                >
                  {isSaving ? <LoadingSpinner /> : <Save className="h-4 w-4" />}
                  <span>{isSaving ? 'Saving' : 'Save'}</span>
                  {isSaving && <LoadingDots />}
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <UserCircle className="w-12 h-12 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">
                {isEditing ? (
                  <div className="flex gap-2">
                    <Input
                      name="FirstName"
                      value={formData.FirstName}
                      onChange={handleInputChange}
                      className="w-32"
                      disabled={isLoading}
                      placeholder="First Name"
                    />
                    <Input
                      name="LastName"
                      value={formData.LastName}
                      onChange={handleInputChange}
                      className="w-32"
                      disabled={isLoading}
                      placeholder="Last Name"
                    />
                  </div>
                ) : (
                  `${user.FirstName} ${user.LastName}`
                )}
              </CardTitle>
              <CardDescription>Patient Profile</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {(validationError || error) && (
            <Alert variant="destructive">
              <AlertDescription>
                {validationError || error}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email
              </Label>
              {isEditing ? (
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  placeholder="email@example.com"
                />
              ) : (
                <p className="text-sm text-muted-foreground">{user.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> Phone Number
              </Label>
              {isEditing ? (
                <Input
                  name="PhoneNo"
                  value={formData.PhoneNo}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  placeholder="Phone number"
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  {user.PhoneNo || "Not specified"}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Cake className="w-4 h-4" /> Age
              </Label>
              {isEditing ? (
                <Input
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  min="0"
                  max="150"
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  {user.age || "Not specified"}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <User className="w-4 h-4" /> Gender
              </Label>
              {isEditing ? (
                <Input
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  placeholder="Gender"
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  {user.gender || "Not specified"}
                </p>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between pt-6">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="flex items-center gap-2"
                disabled={isLoading}
              >
                <Trash2 className="w-4 h-4" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground"
                >
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserProfile;


const LoadingSpinner = () => (
  <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
);

const LoadingDots = () => (
  <span className="flex gap-1">
    <span className="animate-pulse">.</span>
    <span className="animate-pulse delay-100">.</span>
    <span className="animate-pulse delay-200">.</span>
  </span>
);