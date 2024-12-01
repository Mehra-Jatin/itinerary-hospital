import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import {
  Bell,
  Moon,
  Sun,
  Globe,
  Lock,
  Shield,
  Smartphone,
  Trash2 
} from "lucide-react";
import DeleteAccountModal from "./Components/DeleteAccountModal";

// const DeleteAccountModal = () => {
//   const { user, logout } = useAuth();
//   const { toast } = useToast();
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [confirmEmail, setConfirmEmail] = useState("");

//   // const handleDeleteAccount = async () => {
//   //   // Validate inputs
//   //   if (confirmEmail !== user.email) {
//   //     toast({
//   //       title: "Verification Failed",
//   //       description: "Please verify your inputs correctly.",
//   //       variant: "destructive"
//   //     });
//   //     return;
//   //   }

//   //   try {
//   //     setIsDeleting(true);
//   //     // Simulate account deletion API call
//   //     // Replace with actual account deletion logic
//   //     await new Promise(resolve => setTimeout(resolve, 1000));

//   //     // Show success toast and logout
//   //     toast({
//   //       title: "Account Deleted",
//   //       description: "Your account has been permanently deleted.",
//   //     });

//   //     // Logout user
//   //     await logout();
//   //   } catch (error) {
//   //     toast({
//   //       title: "Delete Account Failed",
//   //       description: "There was an error deleting your account. Please try again.",
//   //       variant: "destructive"
//   //     });
//   //   } finally {
//   //     setIsDeleting(false);
//   //   }
//   // };

//   // return (
//   //   <Dialog>
//   //     <DialogTrigger asChild>
//   //       <Button variant="destructive" className="w-full">
//   //         <Trash2 className="mr-2 h-4 w-4" /> Delete Account
//   //       </Button>
//   //     </DialogTrigger>
//   //     <DialogContent>
//   //       <DialogHeader>
//   //         <DialogTitle>Delete Account</DialogTitle>
//   //         <DialogDescription>
//   //           This action cannot be undone. This will permanently delete your account.
//   //         </DialogDescription>
//   //       </DialogHeader>
        
//   //       <div className="space-y-4">
//   //         {/* <div>
//   //           <Label>Type your username to confirm</Label>
//   //           <Input 
//   //             placeholder="Enter your username"
//   //             value={confirmationInput}
//   //             onChange={(e) => setConfirmationInput(e.target.value)}
//   //             className="mt-2"
//   //           />
//   //         </div> */}
          
//   //         <div>
//   //           <Label>Type your email to confirm <span className="text-gray-500 italic">"{user.email}"</span></Label>
//   //           <Input 
//   //             placeholder="Enter your email"
//   //             value={confirmEmail}
//   //             onChange={(e) => setConfirmEmail(e.target.value)}
//   //             className="mt-2"
//   //           />
//   //         </div>
//   //       </div>
        
//   //       <DialogFooter>
//   //         <DialogClose asChild>
//   //           <Button variant="ghost">Cancel</Button>
//   //         </DialogClose>
//   //         <Button 
//   //           variant="destructive" 
//   //           onClick={handleDeleteAccount}
//   //           disabled={
//   //             // confirmationInput !== user.username || 
//   //             confirmEmail !== user.email ||
//   //             isDeleting
//   //           }
//   //         >
//   //           {isDeleting ? "Deleting..." : "I understand, delete my account"}
//   //         </Button>
//   //       </DialogFooter>
//   //     </DialogContent>
//   //   </Dialog>
//   // );
// };

const UserSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Theme state
  const [theme, setTheme] = useState("system");

  // Handle theme change
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      // System preference
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  }, [theme]);

  // Mock function for notification save
  const handleSaveNotifications = async (value) => {
    try {
      toast({
        title: "Settings Updated",
        description: "Your notification preferences have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Password change handler
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      // Implement password change logic
      toast({
        title: "Password Updated",
        description: "Your password has been successfully changed.",
      });
    } catch (error) {
      toast({
        title: "Password Change Failed",
        description: "Unable to update password. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full h-full dark:bg-gray-900 p-6">
      {/* Delete Account Section */}
      <Card className=" border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="w-5 h-5" />
            Delete Account
          </CardTitle>
          <CardDescription className="text-destructive/80">
            Permanently remove your account and all associated data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DeleteAccountModal />
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 ">
            <Sun className="w-5 h-5" />
            Appearance
          </CardTitle>
          <CardDescription>
            Customize how the application looks on your device
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label>Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security
          </CardTitle>
          <CardDescription>Manage your account security settings</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="change-password">
              <AccordionTrigger className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Change Password
              </AccordionTrigger>
              <AccordionContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <Input placeholder="Current Password" type="password" />
                  <Input placeholder="New Password" type="password" />
                  <Input placeholder="Confirm New Password" type="password" />
                  <Button type="submit">Update Password</Button>
                </form>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
          <CardDescription>Manage your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Email Notifications</Label>
            <Switch
              onCheckedChange={handleSaveNotifications}
              checked={true}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>SMS Notifications</Label>
            <Switch
              onCheckedChange={handleSaveNotifications}
              checked={false}
            />
          </div>
        </CardContent>
      </Card>

      {/* Language Settings */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Language & Region
          </CardTitle>
          <CardDescription>
            Choose your preferred language and time zone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Language</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Time Zone</Label>
              <Select defaultValue="utc">
                <SelectTrigger>
                  <SelectValue placeholder="Select time zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">Eastern Time</SelectItem>
                  <SelectItem value="pst">Pacific Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default UserSettings;