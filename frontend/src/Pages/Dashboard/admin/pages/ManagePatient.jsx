import React, { useState, useMemo, useEffect } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
  UserCircle,
  Mail,
  Phone,
  MapPin,
  Search,
  X,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

function ManagePatient() {
  const {
    Patients,
    loading,
    fetchPatients,
    deletePatientAccount
  } = useAdmin();

  useEffect(() => {
    fetchPatients();
  }, []);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'createdAt',
    direction: 'desc'
  });

  const patientsPerPage = 10;

  // Sorting function
  const sortedPatients = useMemo(() => {
    if (!Patients) return [];

    return [...Patients].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [Patients, sortConfig]);

  // Filtering function
  const filteredPatients = useMemo(() => {
    if (!sortedPatients) return [];

    return sortedPatients.filter(patient =>
      Object.values(patient).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedPatients, searchTerm]);

  // Pagination logic
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
    setCurrentPage(1);
  };

  // Handle delete patient
  const handleDeletePatient = async () => {
    if (patientToDelete) {
      try {
        await deletePatientAccount(patientToDelete._id);

        toast({
          title: "Patient Deleted",
          description: `${patientToDelete.FirstName} ${patientToDelete.LastName}'s account has been deleted.`,
          variant: "default"
        });

        window.location.reload();
      } catch (error) {
        console.error('Error deleting patient:', error);

        toast({
          title: "Error",
          description: "Failed to delete patient account.",
          variant: "destructive"
        });
      }
    }
  };

  // Render patient details
  const renderPatientDetails = (patient) => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center space-x-6">
          <UserCircle className="w-20 h-20 text-orange-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {patient.FirstName} {patient.LastName}
            </h2>
            <p className="text-orange-700 font-medium">
              {patient.age} years old, {patient.gender}
            </p>
            <p className="text-sm text-gray-500">
              Joined: {new Date(patient.createdAt).toLocaleDateString()}
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
              <Icon className="w-6 h-6 text-orange-500" />
              <div>
                <p className="text-xs text-gray-500 uppercase">{label}</p>
                <p className="font-medium text-gray-800">{value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end space-x-3 bg-gray-50 p-3 rounded-lg">
          <Button className="w-1/3 flex " variant="destructive" onClick={() => setPatientToDelete(patient)}>Delete Account</Button>
        </div>
      </CardContent>
    </Card>
  );

  // Pagination controls
  const PaginationControls = () => (
    <>
      {Patients.length > 10 && (
        <div className="flex justify-evenly items-center mt-4 w-full">
          <div className="flex items-center space-x-10">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="mr-2 w-4 h-4" /> Previous
            </Button>

            <span className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>

  );

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-xl text-gray-500">Loading Patients...</div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Patient Management
      </h1>

      {/* Search and Sort Controls */}
      <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
        {/* Search Input */}
        <div className="relative flex-grow md:mr-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search patients..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setSearchTerm('')}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Select
            value={`${sortConfig.key}-${sortConfig.direction}`}
            onValueChange={(value) => {
              const [key, direction] = value.split('-');
              setSortConfig({ key, direction });
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt-desc">Newest First</SelectItem>
              <SelectItem value="createdAt-asc">Oldest First</SelectItem>
              <SelectItem value="FirstName-asc">Name (A-Z)</SelectItem>
              <SelectItem value="FirstName-desc">Name (Z-A)</SelectItem>
              <SelectItem value="age-asc">Age (Low-High)</SelectItem>
              <SelectItem value="age-desc">Age (High-Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Patient Table */}
      {filteredPatients.length > 0 ? (
        <>
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    onClick={() => handleSort('FirstName')}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      Name
                      <ArrowUpDown className="ml-2 w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort('age')}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      Age
                      <ArrowUpDown className="ml-2 w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort('gender')}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      Gender
                      <ArrowUpDown className="ml-2 w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead
                    onClick={() => handleSort('createdAt')}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      Joined Date
                      <ArrowUpDown className="ml-2 w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPatients.map(patient => (
                  <TableRow key={patient._id}>
                    <TableCell>
                      {patient.FirstName} {patient.LastName}
                    </TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>
                      {new Date(patient.createdAt).toLocaleDateString()}
                    </TableCell>
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
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => setPatientToDelete(patient)}
                            >
                              <Trash2 className="w-4 h-4" /> Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Patient Account</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete the account for <span className='font-semibold italic underline text-lg'>{patientToDelete?.FirstName} {patientToDelete?.LastName}</span>?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setPatientToDelete(null)}>
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction onClick={handleDeletePatient}>
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

          {/* Pagination Controls */}
          <PaginationControls />
        </>
      ) : (
        <div className="text-center text-gray-500 text-xl">
          No Patients found.
        </div>
      )}

      {/* Patient Details Dialog */}
      <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
        <DialogContent className="max-w-2xl">
          {selectedPatient && renderPatientDetails(selectedPatient)}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ManagePatient;