import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertTriangle, Eye, GraduationCap, IndianRupee, RefreshCw, SearchX, X } from 'lucide-react'
import { useDoctor } from '@/contexts/DoctorContext';
import DoctorFilter from '@/components/DoctorFilter';
import { useAuth } from '@/hooks/useAuth';

const StarRating = ({ rating, size = 'base' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    base: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sizes[size]} ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const DoctorCard = ({ doctor, user }) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-xl transition-shadow duration-300 overflow-hidden hover:border-orange-300 hover:border" title='Click to view'>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Avatar className="w-32 h-32">
            <AvatarImage src={doctor.avatar?.url || '/placeholder-user.jpg'} alt={`${doctor?.FirstName} ${doctor?.LastName}`} />
            <AvatarFallback>{doctor?.FirstName[0]}{doctor?.LastName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-primary">Dr. {doctor?.FirstName} {doctor?.LastName}</h3>
              <p className="text-orange-500 font-medium">{doctor?.specialization}</p>
            </div>
            <div className="flex items-center gap-4">
              <StarRating rating={doctor?.rating || 0} />
              <span className="text-sm text-muted-foreground">
                ({doctor?.numOfReviews || 0} reviews)
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-muted-foreground">
                  {doctor?.experience} years experience
                </span>
              </div>
              <div className="flex items-center">
                <IndianRupee className='w-4 h-4 text-muted-foreground' />
                <span className="text-md text-muted-foreground font-semibold">
                  {doctor?.fees} <span className='text-gray-500 text-xs'>per consultation</span>
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              {/* <Button
                variant="outline"
                onClick={() => navigate(`/doctor/${doctor?._id}`)}
                className="flex-1"
              >
                <Eye size={15} className="mr-2" />
                View Profile
              </Button>
              <Button
                onClick={() => navigate(`/book-appointment/${doctor._id}`)}
                className="flex-1"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Appointment
              </Button> */}
              <Button
                variant="outline"
                onClick={() => navigate(`/doctor/${doctor._id}`)}
                className="flex-1 bg-orange-50 border border-orange-500 hover:bg-orange-100"
              >
                <Eye size={15} />
                View Profile
              </Button>
              {user &&
                <Button
                  variant="primary"
                  onClick={() => navigate(`/doctor/appointment/${doctor._id}`)}
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Appointment
                </Button>
              }


            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DoctorSkeleton = () => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6 flex flex-col md:flex-row gap-6">
        <Skeleton className="w-32 h-32 rounded-lg" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-10 w-1/2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ErrorState = ({ error, onRetry }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <AlertTriangle className="w-16 h-16 mx-auto text-destructive mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-3">Unable to Load Doctors</h2>
          <p className="text-muted-foreground mb-4">
            We're experiencing difficulties connecting to our doctors database.
            Please check your internet connection and try again.
          </p>
          {error && (
            <div className="bg-destructive/10 p-3 rounded-md mb-4 text-left">
              <p className="text-destructive text-sm break-words">
                {error.toString()}
              </p>
            </div>
          )}
          <Button onClick={onRetry} className="mx-auto">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const NoResults = ({ searchQuery, hasActiveFilters, clearAllFilters }) => {
  let message = "No doctors found";
  let subMessage = "Try adjusting your search or filters";

  if (searchQuery) {
    message = `No doctors match "${searchQuery}"`;
  }

  if (hasActiveFilters) {
    subMessage = "Remove some filters to see more results";
  }

  return (
    <Card className="text-center py-10">
      <CardContent>
        <SearchX className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-xl font-semibold text-primary mb-2">{message}</h3>
        <p className="text-muted-foreground">{subMessage}</p>

        {(searchQuery || hasActiveFilters) && (
          <Button onClick={clearAllFilters} className="mt-4">
            Clear Search & Filters
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const Doctor = () => {
  const { doctors, loading, error } = useDoctor();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const parseQueryParams = () => {
    const searchParams = new URLSearchParams(location.search);
    return {
      query: searchParams.get('q') || '',
      specialty: searchParams.getAll('specialty'),
      rating: searchParams.getAll('rating')
    };
  };

  const initialParams = parseQueryParams();

  const [searchQuery, setSearchQuery] = useState(initialParams.query);
  const [filters, setFilters] = useState({
    specialty: initialParams.specialty,
    rating: initialParams.rating,
  });


  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery) {
      params.set('q', searchQuery);
    }

    filters.specialty.forEach(spec => {
      params.append('specialty', spec);
    });

    filters.rating.forEach(rate => {
      params.append('rating', rate);
    });

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [searchQuery, filters, navigate, location.pathname]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setFilters({ specialty: [], rating: [] });
  };

  const validatedDoctors = doctors.filter(doctor => doctor.isValidated);

  const filteredDoctors = validatedDoctors.filter(doctor => {
    const searchTermLower = searchQuery.toLowerCase().trim();
    const matchesSearch = searchTermLower === '' || (
      doctor.FirstName?.toLowerCase().includes(searchTermLower) ||
      doctor.LastName?.toLowerCase().includes(searchTermLower) ||
      `${doctor.FirstName} ${doctor.LastName}`.toLowerCase().includes(searchTermLower) ||
      doctor.specialty?.toLowerCase().includes(searchTermLower) ||
      doctor.specialization?.toLowerCase().includes(searchTermLower)
    );

    const matchesSpecialty = filters.specialty.length === 0 ||
      filters.specialty.includes(doctor.specialty);

    const matchesRating = filters.rating.length === 0 ||
      filters.rating.some(rating => doctor.rating >= parseFloat(rating));

    return matchesSearch && matchesSpecialty && matchesRating;
  });

  const specialtyOptions = [...new Set(validatedDoctors.map(d => d.specialization))].map(specialty => ({
    label: specialty,
    value: specialty,
    count: validatedDoctors.filter(d => d.specialization === specialty).length
  }));

  const ratingOptions = [
    { label: '4 Stars & Above', value: '4', count: validatedDoctors.filter(d => d.rating >= 4).length },
    { label: '3 Stars & Above', value: '3', count: validatedDoctors.filter(d => d.rating >= 3).length },
    { label: '2 Stars & Above', value: '2', count: validatedDoctors.filter(d => d.rating >= 2).length },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-12 w-1/2 mb-6" />
          <Skeleton className="h-12 w-full mb-6" />

          <div className="mt-6 flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/4 hidden lg:block">
              <Skeleton className="h-full w-full" />
            </div>
            <div className="lg:w-3/4 space-y-6">
              {[1, 2, 3].map((_, index) => (
                <DoctorSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState error={error} onRetry={() => window.location.reload()} />;
  }

  const hasActiveFilters = filters.specialty.length > 0 || filters.rating.length > 0;

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">Find Your Doctor</h1>

        <div className='z-50 bg-white/30 py-3 backdrop-blur-3xl rounded-lg border-none'>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, specialty, or specialization..."
            className="mb-6"
          />
        </div>


        <div className="flex flex-col lg:flex-row gap-6">
          <DoctorFilter
            specialtyOptions={specialtyOptions}
            ratingOptions={ratingOptions}
            onFilterChange={handleFilterChange}
          />

          <div className="lg:w-3/4">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-muted-foreground">
                {filteredDoctors.length} {filteredDoctors.length === 1 ? 'doctor' : 'doctors'} found
              </p>
            </div>

            {filteredDoctors.length === 0 ? (
              <NoResults
                searchQuery={searchQuery}
                hasActiveFilters={hasActiveFilters}
                clearAllFilters={clearAllFilters}
              />
            ) : (
              <div className="space-y-6">
                {filteredDoctors.map((doctor) => (
                  <DoctorCard key={doctor._id} doctor={doctor} user={user} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;

