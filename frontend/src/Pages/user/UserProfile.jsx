import React, { useState } from "react";
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
// import { useToast } from "@/components/ui/use-toast";
import { 
  UserCircle, 
  Edit2, 
  Save, 
  X, 
  Trash2, 
  Mail, 
  Phone, 
  Cake,
  User, 
  MapPin
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const UserProfile = () => {
  const { user, loading, logout } = useAuth();
  const { updatePatientProfile, deletePatientAccount, isLoading } = usePatient();
  // const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    FirstName: user?.FirstName || "",
    LastName: user?.LastName || "",
    email: user?.email || "",
    PhoneNo: user?.PhoneNo || "",
    age: user?.age || "",
    gender: user?.gender || "",
    address: user?.address || "",
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const result = await updatePatientProfile(user.userId, formData);
      if (result.success) {
        // toast({
        //   title: "Profile Updated",
        //   description: "Your profile has been successfully updated.",
        // });
        setIsEditing(false);
      }
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Failed to update profile. Please try again.",
      //   variant: "destructive",
      // });
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deletePatientAccount(user.userId);
      if (result.success) {
        // toast({
        //   title: "Account Deleted",
        //   description: "Your account has been successfully deleted.",
        // });
        logout();
      }
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Failed to delete account. Please try again.",
      //   variant: "destructive",
      // });
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
                  onClick={() => setIsEditing(false)}
                  disabled={isLoading}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  variant="default"
                  size=""
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
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
              <CardTitle className="text-2xl capitalize">
                {isEditing ? (
                  <div className="flex gap-2">
                    <Input
                      name="FirstName"
                      value={formData.FirstName}
                      onChange={handleInputChange}
                      className="w-32"
                      disabled={isLoading}
                    />
                    <Input
                      name="LastName"
                      value={formData.LastName}
                      onChange={handleInputChange}
                      className="w-32"
                      disabled={isLoading}
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
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email
              </Label>
              {isEditing ? (
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
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
                />
              ) : (
                <p className="text-sm text-muted-foreground">{user.PhoneNo}</p>
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
                />
              ) : (
                <p className="text-sm text-muted-foreground">{user.age ? user.age : "N/A"}</p>
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
                />
              ) : (
                <p className="text-sm text-muted-foreground">{user.gender}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Address
              </Label>
              {isEditing ? (
                <Textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{user.address ? user.address : "N/A"}</p>
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