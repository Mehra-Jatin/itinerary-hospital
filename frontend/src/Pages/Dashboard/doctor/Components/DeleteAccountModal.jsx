import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { useDoctor } from "@/contexts/DoctorContext";

const DeleteAccountModal = () => {
  const { user, token, logout } = useAuth();
  const { deleteDoctor } = useDoctor();
  const { toast } = useToast();
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmationInput, setConfirmationInput] = useState("");

  const handleDeleteAccount = async () => {
    // Validate input
    if (confirmationInput !== "DELETE") {
      toast({
        title: "Verification Failed",
        description: `Please type ${user.email} to confirm account deletion.`,
        variant: "destructive"
      });
      return;
    }

    setIsDeleting(true);

    try {
      // Call delete doctor method with user ID and token
      await deleteDoctor(user._id, token);

      // Logout user after successful deletion
      await logout();
    } catch (error) {
      // Error handling is done in the deleteDoctor method
      console.error("Account deletion failed", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          <Trash2 className="mr-2 h-4 w-4" /> Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label>Type your email <span className="italic text-gray-600">"{user.email}"</span> to confirm</Label>
            <Input 
              placeholder="Type email to confirm"
              value={confirmationInput}
              onChange={(e) => setConfirmationInput(e.target.value)}
              className="mt-2"
            />
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button 
            variant="destructive" 
            onClick={handleDeleteAccount}
            disabled={
              confirmationInput !== "DELETE" ||
              isDeleting
            }
          >
            {isDeleting ? "Deleting..." : "I understand, delete my account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountModal;