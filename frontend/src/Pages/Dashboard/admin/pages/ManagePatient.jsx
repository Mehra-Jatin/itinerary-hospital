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
  ListFilter
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

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
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
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
          <Button
            className="w-full"
            variant="destructive"
            onClick={() => setPatientToDelete(patient)}
          >
            Delete Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Mobile-friendly Patient Card for List View
  const MobilePatientCard = ({ patient, onView, onDelete }) => (
    <Card className="w-full mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">
              {patient.FirstName} {patient.LastName}
            </h3>
            <p className="text-sm text-gray-600">
              {patient.age} yrs, {patient.gender} | Joined: {new Date(patient.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(patient)}
              className="p-2"
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(patient)}
              className="p-2"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Mobile Filters Sheet
  const MobileFiltersSheet = () => (
    <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center">
          <ListFilter className="mr-2 w-4 h-4" /> Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl">
        <SheetHeader>
          <SheetTitle>Filters & Sorting</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium">Search</label>
            <Input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="mt-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Sort By</label>
            <Select
              value={`${sortConfig.key}-${sortConfig.direction}`}
              onValueChange={(value) => {
                const [key, direction] = value.split('-');
                setSortConfig({ key, direction });
                setCurrentPage(1);
                setMobileFilterOpen(false);
              }}
              className="mt-2"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sorting" />
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
      </SheetContent>
    </Sheet>
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
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        Patient Management
      </h1>

      {/* Mobile-friendly controls */}
      <div className="flex flex-col sm:flex-row justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="flex space-x-2 w-full">
          <MobileFiltersSheet />
          <div className="flex-grow">
            <Input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full md:hidden"
            />
          </div>
        </div>
      </div>

      {/* Responsive Patient Display */}
      {filteredPatients.length > 0 ? (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block w-full overflow-x-auto">
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

          {/* Mobile Card List */}
          <div className="md:hidden">
            {currentPatients.map(patient => (
              <MobilePatientCard
                key={patient._id}
                patient={patient}
                onView={() => setSelectedPatient(patient)}
                onDelete={() => setPatientToDelete(patient)}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center"
            >
              <ChevronLeft className="mr-2 w-4 h-4" /> Previous
            </Button>
            <p className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center"
            >
              Next <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center mt-10">
          <p className="text-gray-600 text-sm">No patients found.</p>
        </div>
      )}

      {/* Dialog for Viewing Patient Details */}
      {selectedPatient && (
        <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
          <DialogContent>
            {renderPatientDetails(selectedPatient)}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default ManagePatient;
