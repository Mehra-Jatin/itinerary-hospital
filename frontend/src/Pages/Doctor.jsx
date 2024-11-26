import React, { useState, useEffect } from 'react';
import { useDoctor } from '@/contexts/DoctorContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { Eye, GraduationCap, SearchX, X } from 'lucide-react';

// Reusable Button Component (unchanged)
const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = 'px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2';
  const variants = {
    primary: 'bg-orange-500 hover:bg-orange-600 text-white',
    secondary: 'bg-green-500 hover:bg-green-600 text-white',
    outline: 'border-2 border-orange-500 text-orange-500 hover:bg-orange-50'
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Enhanced Custom Checkbox with animation (unchanged)
const CustomCheckbox = ({ label, name, count, onChange }) => {
  return (
    <label className="flex items-center justify-between group p-2 hover:bg-orange-50 rounded-md cursor-pointer transition-colors duration-200">
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="checkbox"
            name={name}
            id={name}
            onChange={(e) => onChange(name, e.target.checked)}
            className="peer hidden"
          />
          <div className="w-5 h-5 border-2 border-gray-300 rounded transition-colors duration-200 flex items-center justify-center peer-checked:border-orange-500 peer-checked:bg-orange-500">
            <svg
              className="w-3 h-3 text-white scale-0 transition-transform duration-200 peer-checked:scale-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <span className="text-gray-700 group-hover:text-orange-500 transition-colors duration-200">
          {label}
        </span>
      </div>
      {count !== undefined && (
        <span className="text-sm text-gray-500">{count}</span>
      )}
    </label>
  );
};

// Improved Search Bar Component
const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-4 pl-12 pr-12 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
      />
      {/* Search Icon */}
      <svg
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      
      {/* Clear Button */}
      {value && (
        <button
          onClick={() => {
            // Create a synthetic event to clear the input
            const event = { target: { value: '' } };
            onChange(event);
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          aria-label="Clear search"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

// Enhanced Star Rating (unchanged)
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
          className={`${sizes[size]} ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// Doctor Card Component with animations (unchanged)
const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  // console.log(doctor);
  
  
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer hover:border-orange-300 hover:border" title='Click to view' onClick={() => navigate(`/doctor/${doctor._id}`)}>
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <img
              src={doctor.avatar?.url || 'https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png'}
              alt={doctor.FirstName + ' ' + doctor.LastName}
              className="w-32 h-32 rounded-lg object-cover shadow-md transform transition-transform duration-300 hover:scale-105"
            />
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 italic capitalize"><span>Dr.</span> {doctor.FirstName} {doctor.LastName}</h3>
              <p className="text-orange-500 font-medium">{doctor.specialty}</p>
              <div className="flex items-center gap-2 mt-1">
                <GraduationCap className='text-gray-600 w-5 h-5'/>
                <span className="text-gray-600 text-sm">{doctor.specialization}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <StarRating rating={doctor.rating || 0} />
              <span className="text-sm text-gray-500">
                ({doctor.numOfReviews || 0} reviews)
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-gray-600">
                  {doctor.experience} years experience
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-gray-600">
                  ₹{doctor.consultationFee} consultation fee
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => navigate(`/doctor/${doctor._id}`)}
                className="flex-1"
              >
                <Eye size={15}/>
                View Profile
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate(`/book-appointment/${doctor._id}`)}
                className="flex-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// New Filter Component
const FilterSection = ({ title, options, selectedFilters, onChange }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-gray-700 mb-3">{title}</h3>
    <div className="space-y-2">
      {options.map((option) => (
        <CustomCheckbox
          key={option.value}
          label={option.label}
          name={`${title.toLowerCase()}-${option.value}`}
          count={option.count}
          onChange={onChange}
        />
      ))}
    </div>
  </div>
);

// Main Doctor Component
const Doctor = () => {
  const { doctors, loading, error } = useDoctor();
  const location = useLocation();
  const navigate = useNavigate();

  // Parse URL query parameters
  const parseQueryParams = () => {
    const searchParams = new URLSearchParams(location.search);
    return {
      query: searchParams.get('q') || '',
      specialty: searchParams.getAll('specialty'),
      rating: searchParams.getAll('rating')
    };
  };

  // Initial state from URL
  const initialParams = parseQueryParams();
  
  const [searchQuery, setSearchQuery] = useState(initialParams.query);
  const [filters, setFilters] = useState({
    location: [],
    specialty: initialParams.specialty,
    rating: initialParams.rating,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Update URL when filters or search change
  useEffect(() => {
    const params = new URLSearchParams();
    
    // Add search query
    if (searchQuery) {
      params.set('q', searchQuery);
    }
    
    // Add specialty filters
    filters.specialty.forEach(spec => {
      params.append('specialty', spec);
    });
    
    // Add rating filters
    filters.rating.forEach(rate => {
      params.append('rating', rate);
    });

    // Update URL without page reload
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [searchQuery, filters, navigate, location.pathname]);

  const handleFilterChange = (filterName, isChecked) => {
    const [filterType, filterValue] = filterName.split("-");
    setFilters(prev => ({
      ...prev,
      [filterType]: isChecked
        ? [...prev[filterType], filterValue]
        : prev[filterType].filter(item => item !== filterValue)
    }));
  };

  // Filter only validated doctors
  const validatedDoctors = doctors.filter(doctor => doctor.isValidated);

  const filteredDoctors = validatedDoctors.filter(doctor => {
    // Improved search logic to check multiple fields
    const searchTermLower = searchQuery.toLowerCase().trim();
    const matchesSearch = searchTermLower === '' || (
      // Check first name
      doctor.FirstName?.toLowerCase().includes(searchTermLower) ||
      // Check last name
      doctor.LastName?.toLowerCase().includes(searchTermLower) ||
      // Check full name
      `${doctor.FirstName} ${doctor.LastName}`.toLowerCase().includes(searchTermLower) ||
      // Check specialty
      doctor.specialty?.toLowerCase().includes(searchTermLower) ||
      // Check specialization
      doctor.specialization?.toLowerCase().includes(searchTermLower) ||
      // Check location
      doctor.location?.toLowerCase().includes(searchTermLower)
    );

    const matchesLocation = filters.location.length === 0 || 
      filters.location.includes(doctor.location);

    const matchesSpecialty = filters.specialty.length === 0 ||
      filters.specialty.includes(doctor.specialty);

    const matchesRating = filters.rating.length === 0 ||
      filters.rating.some(rating => doctor.rating >= parseFloat(rating));

    return matchesSearch && matchesLocation && matchesSpecialty && matchesRating;
  });

  // Generate filter options based on validated doctors
  const specialtyOptions = [...new Set(validatedDoctors.map(d => d.specialty))].map(specialty => ({
    label: specialty,
    value: specialty,
    count: validatedDoctors.filter(d => d.specialty === specialty).length
  }));

  const ratingOptions = [
    { label: '4 Stars & Above', value: '4', count: validatedDoctors.filter(d => d.rating >= 4).length },
    { label: '3 Stars & Above', value: '3', count: validatedDoctors.filter(d => d.rating >= 3).length },
    { label: '2 Stars & Above', value: '2', count: validatedDoctors.filter(d => d.rating >= 2).length },
  ];

  // Clear all filters and search
  const clearAllFilters = () => {
    setSearchQuery('');
    setFilters({ location: [], specialty: [], rating: [] });
  };

  // NoResults Component remains the same
  const NoResults = ({ searchQuery, hasActiveFilters }) => {
    let message = "No doctors found";
    let subMessage = "Try adjusting your search or filters";

    if (searchQuery) {
      message = `No doctors match "${searchQuery}"`;
    }

    if (hasActiveFilters) {
      subMessage = "Remove some filters to see more results";
    }

    return (
      <div className="text-center py-10 bg-white rounded-xl shadow-md">
        <SearchX className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">{message}</h3>
        <p className="text-gray-500">{subMessage}</p>
        
        {(searchQuery || hasActiveFilters) && (
          <button 
            onClick={clearAllFilters}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Clear Search & Filters
          </button>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <svg className="w-12 h-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold">Error Loading Doctors</h3>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  // Check if there are any active filters
  const hasActiveFilters = 
    filters.location.length > 0 || 
    filters.specialty.length > 0 || 
    filters.rating.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Find a Verified Doctor</h1>
        
        <SearchBar 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          placeholder="Search by name, specialty, or location..."
        />

        <div className="mt-6 flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <aside className={`
            lg:w-1/4 lg:block
            ${isFilterOpen ? 'block' : 'hidden'}
            bg-white rounded-xl shadow-md p-6 h-fit
          `}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              <button 
                onClick={() => {
                  setFilters({ location: [], specialty: [], rating: [] });
                  setSearchQuery('');
                }}
                className="text-sm text-orange-500 hover:text-orange-600"
              >
                Clear All
              </button>
            </div>
            
            <FilterSection 
              title="Specialty" 
              options={specialtyOptions}
              selectedFilters={filters.specialty}
              onChange={handleFilterChange}
            />

            <FilterSection 
              title="Rating" 
              options={ratingOptions}
              selectedFilters={filters.rating}
              onChange={handleFilterChange}
            />
          </aside>

          {/* Doctor List */}
          <div className="lg:w-3/4">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                {filteredDoctors.length} verified 
                {filteredDoctors.length === 1 ? ' doctor' : ' doctors'} found
              </p>
              <Button 
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
            
            {filteredDoctors.length === 0 ? (
              <NoResults 
                searchQuery={searchQuery} 
                hasActiveFilters={hasActiveFilters}
              />
            ) : (
              <div className="space-y-6">
                {filteredDoctors.map((doctor) => (
                  <DoctorCard key={doctor._id} doctor={doctor} />
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