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
  MapPin 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

function ManagePatient() {
  const { 
    patients, 
    loading, 
    fetchPatients, 
    deletePatient 
  } = useAdmin();

  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDeletePatient = async (patientId) => {
    try {
      await deletePatient(patientId);
      setSelectedPatient(null);
    } catch (error) {
      console.error('Failed to delete patient:', error);
    }
  };

  const renderPatientDetails = (patient) => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center space-x-6">
          <UserCircle className="w-20 h-20 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {patient.firstName} {patient.lastName}
            </h2>
            <p className="text-blue-700 font-medium">
              {patient.age} years old, {patient.gender}
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { icon: Mail, label: 'Email', value: patient.email },
            { icon: Phone, label: 'Phone', value: patient.phone || 'Not Available' },
            { icon: MapPin, label: 'Address', value: patient.address || 'Not Specified' }
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
        <div className="animate-pulse text-xl text-gray-500">Loading patients...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Patient Management
      </h1>
      
      {patients && patients.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map(patient => (
              <TableRow key={patient._id}>
                <TableCell>
                  {patient.firstName} {patient.lastName}
                </TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedPatient(patient)}
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
                          <AlertDialogTitle>Delete Patient</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove {patient.firstName} {patient.lastName}?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeletePatient(patient._id)}>
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
          No patients available.
        </div>
      )}

      <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
        <DialogContent className="max-w-2xl">
          {selectedPatient && renderPatientDetails(selectedPatient)}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ManagePatient;