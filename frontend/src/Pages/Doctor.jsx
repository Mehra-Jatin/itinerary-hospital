import React, { useState } from "react";

// Custom Checkbox Component
const CustomCheckbox = ({ label, name, onChange }) => {
  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    onChange(name, checked);
  };

  return (
    <label className="flex cursor-pointer items-center text-gray-700 font-bold hover:text-orange-500 space-x-3">
      <input
        className="peer hidden"
        id={name}
        name={name}
        type="checkbox"
        onChange={handleCheckboxChange}
      />
      <span className="w-5 h-5 border-2 border-gray-400 rounded-sm flex justify-center items-center peer-checked:border-orange-500 peer-checked:bg-orange-500">
        <svg
          className="hidden peer-checked:block w-4 h-4 text-white"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M16.707 5.293a1 1 0 00-1.414-1.414L7 12.172 4.707 9.879a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l8-8z" />
        </svg>
      </span>
      <span>{label}</span>
    </label>
  );
};

// Filter Sidebar Component
const FilterSidebar = ({ onFilterChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCheckboxChange = (name, checked) => {
    onFilterChange(name, checked);
  };

  return (
    <>
      {/* Sidebar for large screens */}
      <div className="hidden lg:block p-6 bg-white shadow-md rounded-lg space-y-6 w-1/4 pb-3">
        <h2 className="text-xl font-bold mb-4 border-b pb-2 text-orange-500">
          Filter by:
        </h2>
        <FilterItems onCheckboxChange={handleCheckboxChange} />
      </div>

      {/* Dropdown for small screens */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full p-3 bg-orange-500 text-white rounded-lg font-bold mb-4"
        >
          {isDropdownOpen ? "Close Filters" : "Open Filters"}
        </button>
        {isDropdownOpen && (
          <div className="p-6 bg-white shadow-md rounded-lg space-y-6">
            <h2 className="text-xl font-bold mb-4 border-b pb-2 text-orange-500">
              Filter by:
            </h2>
            <FilterItems onCheckboxChange={handleCheckboxChange} />
          </div>
        )}
      </div>
    </>
  );
};

// Filter Items Component
const FilterItems = ({ onCheckboxChange }) => (
  <>
    {/* Location Filter */}
    <div>
      <h3 className="text-lg font-bold mb-2">Location</h3>
      <div className="space-y-2">
        {["Mumbai", "Delhi", "Bangalore", "Chennai"].map((location, index) => (
          <CustomCheckbox
            key={index}
            label={location}
            name={`location-${location}`}
            onChange={onCheckboxChange}
          />
        ))}
      </div>
    </div>

    {/* Specialty Filter */}
    <div>
      <h3 className="text-lg font-bold mb-2">Specialty</h3>
      <div className="space-y-2">
        {["Cardiologist", "Dermatologist", "Orthopedist", "Pediatrician"].map(
          (specialty, index) => (
            <CustomCheckbox
              key={index}
              label={specialty}
              name={`specialty-${specialty}`}
              onChange={onCheckboxChange}
            />
          )
        )}
      </div>
    </div>

    {/* Rating Filter */}
    <div>
      <h3 className="text-lg font-bold mb-2">Rating</h3>
      <div className="space-y-2">
        {["⭐⭐⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐"].map((rating, index) => (
          <CustomCheckbox
            key={index}
            label={rating}
            name={`rating-${rating}`}
            onChange={onCheckboxChange}
          />
        ))}
      </div>
    </div>
  </>
);

// Star Rating Component
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, index) => (
        <span key={index} className="text-yellow-500 text-lg">⭐</span>
      ))}
      {halfStar && <span className="text-yellow-500 text-lg">⭐</span>}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={index} className="text-gray-400 text-lg">☆</span>
      ))}
    </div>
  );
};

// Doctor Listing Component
const DoctorCard = ({ doctor }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mb-6 flex flex-col md:flex-row gap-4 md:items-center sm:items-start">
      {/* Doctor Image */}
      <img
        src={doctor.image}
        alt={doctor.name}
        className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
      />
      <div className="flex-1">
        {/* Doctor Information */}
        <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
        <p className="text-orange-500">{doctor.specialty}</p>
        <p className="text-gray-500">{doctor.location}</p>
        
        {/* Description */}
        <p className="mt-2 text-sm text-gray-600">{doctor.description}</p>

        {/* Rating and Button */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-4">
          <StarRating rating={parseFloat(doctor.rating)} />
          <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 w-full md:w-auto">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};


// Main Doctor Component
const Doctor = () => {
  // Sample doctor data
  const doctors = [
    {
      name: "Dr. Pranay Maurya",
      specialty: "Cardiologist",
      location: "Mumbai",
      rating: "5",
      description: "Specialist in cardiovascular treatments.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Dr. Sahil Sharma",
      specialty: "Cardiologist",
      location: "Mumbai",
      rating: "5",
      description: "Experienced Cardiologist specializing in heart-related issues.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Dr. Rudra Maurya",
      specialty: "Cardiologist",
      location: "Mumbai",
      rating: "4.5",
      description: "Experienced Cardiologist specializing in heart-related issues.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Dr. Sneha Kapoor",
      specialty: "Dermatologist",
      location: "Delhi",
      rating: "4",
      description: "Specialist in skin care, acne, and dermatological treatments.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Dr. Amit Sharma",
      specialty: "Orthopedist",
      location: "Bangalore",
      rating: "5",
      description: "Expert in treating musculoskeletal disorders and injuries.",
      image: "https://via.placeholder.com/150",
    },
    // Add more doctor data...
  ];

  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    location: [],
    specialty: [],
    rating: [],
  });

  const handleFilterChange = (filterName, isChecked) => {
    const [filterType, filterValue] = filterName.split("-");

    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (isChecked) {
        newFilters[filterType].push(filterValue);
      } else {
        newFilters[filterType] = newFilters[filterType].filter(
          (item) => item !== filterValue
        );
      }
      return newFilters;
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredList = doctors.filter((doctor) => {
    // Search filter
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery) ||
      doctor.specialty.toLowerCase().includes(searchQuery) ||
      doctor.location.toLowerCase().includes(searchQuery);

    // Location filter
    const matchesLocation =
      filters.location.length === 0 ||
      filters.location.includes(doctor.location);

    // Specialty filter
    const matchesSpecialty =
      filters.specialty.length === 0 ||
      filters.specialty.includes(doctor.specialty);

    // Rating filter
    const matchesRating =
      filters.rating.length === 0 ||
      filters.rating.some((rating) => {
        const ratingValue = {
          "⭐⭐⭐⭐⭐": 5,
          "⭐⭐⭐⭐": 4,
          "⭐⭐⭐": 3,
        }[rating];
        return parseFloat(doctor.rating) >= ratingValue;
      });

    return matchesSearch && matchesLocation && matchesSpecialty && matchesRating;
  });

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen p-6">
      <FilterSidebar onFilterChange={handleFilterChange} />
      <div className="flex-1 px-6 pt-3">
        <input
          type="text"
          placeholder="Search doctors..."
          className="w-full p-3 border rounded-lg mb-6"
          onChange={handleSearchChange}
        />
        {filteredList.map((doctor, index) => (
          <DoctorCard key={index} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default Doctor;
