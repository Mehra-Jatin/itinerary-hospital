import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Check, Trash2, EyeIcon } from 'lucide-react';
import { useAdmin } from "@/contexts/AdminContext"; // Import your AdminContext
// import { toast } from "@/hooks/use-toast";

const VerifyDoctor = () => {
  const { doctors, loading, fetchDoctors, handleValidation } = useAdmin();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  useEffect(() => {
    fetchDoctors(); // Fetch doctors when the component mounts
  }, []);

  const renderDoctorDetails = () => (
    <Dialog open={!!selectedDoctor} onOpenChange={() => setSelectedDoctor(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-orange-600">Doctor Details</DialogTitle>
          <DialogDescription>
            Detailed information about the unverified doctor
          </DialogDescription>
        </DialogHeader>
        {selectedDoctor && (
          <div className="grid gap-4 py-4">
            <div>
              <strong>Name:</strong> {selectedDoctor.FirstName} {selectedDoctor.LastName}
            </div>
            <div>
              <strong>Specialization:</strong> {selectedDoctor.specialization || 'N/A'}
            </div>
            <div>
              <strong>Email:</strong> {selectedDoctor.email}
            </div>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  if (loading) return <div className="text-orange-500">Loading doctors...</div>;

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold text-orange-600">Unverified Doctors</h2>
      {doctors.length === 0 ? (
        <p className="text-gray-500">No unverified doctors</p>
      ) : (
        <Table>
          <TableHeader className="bg-orange-100">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.map(doctor => (
              <TableRow key={doctor._id}>
                <TableCell className="font-medium">
                  {doctor.FirstName} {doctor.LastName}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-orange-200 text-orange-800">
                    {doctor.specialization || 'No Specialization'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button 
                    size="sm"
                    onClick={() => setSelectedDoctor(doctor)}
                    variant="outline"
                    className="mr-2"
                  >
                    <EyeIcon className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleValidation(doctor._id, 'verify')}
                    className="bg-green-500 hover:bg-green-600 mr-2"
                  >
                    <Check className="h-4 w-4 mr-1" /> Verify
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleValidation(doctor._id, 'delete')}
                    variant="destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {renderDoctorDetails()}
    </div>
  );
};

export default VerifyDoctor;
