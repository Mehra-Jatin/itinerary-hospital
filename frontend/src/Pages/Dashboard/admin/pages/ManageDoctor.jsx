import React, { useState, useEffect, useMemo } from 'react';
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
import { Input } from '@/components/ui/input';
import { 
  Eye, 
  Trash2, 
  UserCircle, 
  Mail, 
  Phone, 
  Building2,
  ArrowUpDown,
  Search,
  X
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
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ 
    key: null, 
    direction: 'ascending' 
  });

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

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'ascending' 
        ? 'descending' 
        : 'ascending'
    }));
  };

  const filteredAndSortedDoctors = useMemo(() => {
    let result = verifiedDoctors.filter(doctor => 
      Object.values(doctor).some(val => 
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) 
          return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) 
          return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [verifiedDoctors, searchTerm, sortConfig]);

  const renderDoctorDetails = (doctor) => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-4 space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <UserCircle className="w-16 h-16 text-blue-600" />
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800">
              {doctor.FirstName} {doctor.LastName}
            </h2>
            <p className="text-blue-700 font-medium">
              {doctor.specialty || 'General Practice'}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {[
            { icon: Mail, label: 'Email', value: doctor.email },
            { icon: Phone, label: 'Phone', value: doctor.phone || 'Not Available' },
            { icon: Building2, label: 'Hospital', value: doctor.hospital || 'Not Specified' }
          ].map(({ icon: Icon, label, value }) => (
            <div 
              key={label} 
              className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg"
            >
              <Icon className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-xs text-gray-500 uppercase">{label}</p>
                <p className="font-medium text-gray-800 text-sm break-words">
                  {value}
                </p>
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
        <div className="animate-pulse text-lg text-gray-500">
          Loading doctors...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 py-4 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        Doctor Lists
      </h1>
      
      {/* Search Section */}
      <div className="relative w-full">
        <Input 
          placeholder="Search doctors..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-10 w-full"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        {searchTerm && (
          <X 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" 
            onClick={() => setSearchTerm('')}
          />
        )}
      </div>
      
      {filteredAndSortedDoctors.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {[
                  { key: 'FirstName', label: 'Name' },
                  { key: 'specialty', label: 'Specialty' },
                  { key: 'email', label: 'Email' },
                  { key: 'hospital', label: 'Hospital' }
                ].map(({ key, label }) => (
                  <TableHead 
                    key={key} 
                    className="cursor-pointer whitespace-nowrap" 
                    onClick={() => handleSort(key)}
                  >
                    <div className="flex items-center">
                      {label}
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                ))}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedDoctors.map(doctor => (
                <TableRow key={doctor._id} className="hover:bg-gray-50">
                  <TableCell className="font-medium whitespace-nowrap">
                    {doctor.FirstName} {doctor.LastName}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {doctor.specialty || 'General Practice'}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {doctor.email}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {doctor.hospital || 'Not Specified'}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-2 min-w-[120px]">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => setSelectedDoctor(doctor)}
                      >
                        <Eye className="mr-2 w-4 h-4" /> View
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            className="w-full"
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Doctor</AlertDialogTitle>
                            <AlertDialogDescription>
                              Remove {doctor.FirstName} {doctor.LastName}?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteDoctor(doctor._id)}
                            >
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
        </div>
      ) : (
        <div className="text-center text-gray-500">
          {searchTerm 
            ? `No doctors found matching "${searchTerm}"` 
            : 'No verified doctors available.'
          }
        </div>
      )}

      <Dialog 
        open={!!selectedDoctor} 
        onOpenChange={() => setSelectedDoctor(null)}
      >
        <DialogContent className="max-w-sm sm:max-w-md">
          {selectedDoctor && renderDoctorDetails(selectedDoctor)}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ManageDoctor;