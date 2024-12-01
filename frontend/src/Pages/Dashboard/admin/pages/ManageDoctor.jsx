import React, { useState, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent 
} from '@/components/ui/dialog';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  Trash2, 
  UserCircle, 
  Mail, 
  Phone, 
  Building2 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

function ManageDoctor() {
  const { 
    verifiedDoctors, 
    loading, 
    fetchVerifiedDoctors, 
    deleteDoctor 
  } = useAdmin();

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    fetchVerifiedDoctors();
  }, []);

  const handleDeleteDoctor = async (doctorId) => {
    try {
      await deleteDoctor(doctorId);
      setSelectedDoctor(null);
    } catch (error) {
      console.error('Failed to delete doctor:', error);
    }
  };

  const renderDoctorDetails = (doctor) => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center space-x-6">
          <UserCircle className="w-20 h-20 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {doctor.firstName} {doctor.lastName}
            </h2>
            <p className="text-blue-700 font-medium">{doctor.specialty || 'General Practice'}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { icon: Mail, label: 'Email', value: doctor.email },
            { icon: Phone, label: 'Phone', value: doctor.phone || 'Not Available' },
            { icon: Building2, label: 'Hospital', value: doctor.hospital || 'Not Specified' }
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
              <Icon className="w-6 h-6 text-blue-500" />
              <div>
                <p className="text-xs text-gray-500 uppercase">{label}</p>
                <p className="font-medium text-gray-800">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-xl text-gray-500">Loading doctors...</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-left">
        Verified Doctor Lists
      </h1>
      
      {verifiedDoctors.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Hospital</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {verifiedDoctors.map(doctor => (
              <TableRow key={doctor._id}>
                <TableCell>
                  {doctor.FirstName} {doctor.LastName}
                </TableCell>
                <TableCell>{doctor.specialty || 'General Practice'}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>{doctor.hospital || 'Not Specified'}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedDoctor(doctor)}
                    >
                      <Eye className="mr-2 w-4 h-4" /> View
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4" /> Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Doctor</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove {doctor.FirstName} {doctor.LastName}?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteDoctor(doctor._id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center text-gray-500 text-xl">
          No verified doctors available.
        </div>
      )}

      <Dialog open={!!selectedDoctor} onOpenChange={() => setSelectedDoctor(null)}>
        <DialogContent className="max-w-2xl">
          {selectedDoctor && renderDoctorDetails(selectedDoctor)}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ManageDoctor;