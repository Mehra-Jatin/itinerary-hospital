// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // // Custom Checkbox Component
// // const CustomCheckbox = ({ label, name, onChange }) => {
// //   const handleCheckboxChange = (e) => {
// //     const { checked } = e.target;
// //     onChange(name, checked);
// //   };
// //   const navigate=useNavigate();
// //   return (
// //     <label className="flex cursor-pointer items-center text-gray-700 font-bold hover:text-orange-500 space-x-3">
// //       <input
// //         className="peer hidden"
// //         id={name}
// //         name={name}
// //         type="checkbox"
// //         onChange={handleCheckboxChange}
// //       />
// //       <span className="w-5 h-5 border-2 border-gray-400 rounded-sm flex justify-center items-center peer-checked:border-orange-500 peer-checked:bg-orange-500">
// //         <svg
// //           className="hidden peer-checked:block w-4 h-4 text-white"
// //           fill="currentColor"
// //           xmlns="http://www.w3.org/2000/svg"
// //           viewBox="0 0 20 20"
// //         >
// //           <path d="M16.707 5.293a1 1 0 00-1.414-1.414L7 12.172 4.707 9.879a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l8-8z" />
// //         </svg>
// //       </span>
// //       <span>{label}</span>
// //     </label>
// //   );
// // };

// // // Filter Sidebar Component
// // const FilterSidebar = ({ onFilterChange }) => {
// //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

// //   const handleCheckboxChange = (name, checked) => {
// //     onFilterChange(name, checked);
// //   };

// //   return (
// //     <>
// //       {/* Sidebar for large screens */}
// //       <div className="hidden lg:block p-6 bg-white shadow-md rounded-lg space-y-6 w-1/4 pb-3">
// //         <h2 className="text-xl font-bold mb-4 border-b pb-2 text-orange-500">
// //           Filter by:
// //         </h2>
// //         <FilterItems onCheckboxChange={handleCheckboxChange} />
// //       </div>

// //       {/* Dropdown for small screens */}
// //       <div className="lg:hidden">
// //         <button
// //           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
// //           className="w-full p-3 bg-orange-500 text-white rounded-lg font-bold mb-4"
// //         >
// //           {isDropdownOpen ? "Close Filters" : "Open Filterssssss"}
// //         </button>
// //         {isDropdownOpen && (
// //           <div className="p-6 bg-white shadow-md rounded-lg space-y-6">
// //             <h2 className="text-xl font-bold mb-4 border-b pb-2 text-orange-500">
// //               Filter by:
// //             </h2>
// //             <FilterItems onCheckboxChange={handleCheckboxChange} />
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // // Filter Items Component
// // const FilterItems = ({ onCheckboxChange }) => (
// //   <>
// //     {/* Location Filter */}
// //     <div>
// //       <h3 className="text-lg font-bold mb-2">Location</h3>
// //       <div className="space-y-2">
// //         {["Mumbai", "Delhi", "Bangalore", "Chennai"].map((location, index) => (
// //           <CustomCheckbox
// //             key={index}
// //             label={location}
// //             name={`location-${location}`}
// //             onChange={onCheckboxChange}
// //           />
// //         ))}
// //       </div>
// //     </div>

// //     {/* Specialty Filter */}
// //     <div>
// //       <h3 className="text-lg font-bold mb-2">Specialty</h3>
// //       <div className="space-y-2">
// //         {["Cardiologist", "Dermatologist", "Orthopedist", "Pediatrician"].map(
// //           (specialty, index) => (
// //             <CustomCheckbox
// //               key={index}
// //               label={specialty}
// //               name={`specialty-${specialty}`}
// //               onChange={onCheckboxChange}
// //             />
// //           )
// //         )}
// //       </div>
// //     </div>

// //     {/* Rating Filter */}
// //     {/* Rating Filter */}
// // <div>
// //   <h3 className="text-lg font-bold mb-2">Rating</h3>
// //   <div className="space-y-2">
// //     {["5", "4", "3"].map((rating, index) => (
// //       <CustomCheckbox
// //         key={index}
// //         label={`${rating} Stars`}
// //         name={`rating-${rating}`}
// //         onChange={onCheckboxChange}
// //       />
// //     ))}
// //   </div>
// // </div>

// //   </>
// // );

// // // Star Rating Component
// // const StarRating = ({ rating }) => {
// //   const fullStars = Math.floor(rating);
// //   // const halfStar = rating % 1 !== 0;
// //   const emptyStars = 5 - Math.ceil(rating);

// //   return (
// //     <div className="flex">
// //       {[...Array(fullStars)].map((_, index) => (
// //         <span key={index} className="text-yellow-500 text-lg">
// //           ⭐
// //         </span>
// //       ))}
// //       {/* {halfStar && <span className="text-yellow-500 text-lg">⭐</span>} */}
// //       {[...Array(emptyStars)].map((_, index) => (
// //         <span key={index} className="text-gray-400 text-lg">
// //           ☆
// //         </span>
// //       ))}
// //     </div>
// //   );
// // };


// // // Doctor Listing Component
// // const DoctorCard = ({ doctor }) => {
// //   const navigate = useNavigate(); // Ensure the navigate hook is used here

// //   return (
// //     <div className="p-6 bg-white shadow-lg rounded-lg mb-6 flex flex-col md:flex-row gap-4 md:items-center sm:items-start">
// //       {/* Doctor Image */}
// //       <img
// //         src={doctor.image}
// //         alt={doctor.name}
// //         className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
// //       />
// //       <div className="flex-1">
// //         {/* Doctor Information */}
// //         <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
// //         <p className="text-orange-500">{doctor.specialty}</p>
// //         <p className="text-gray-500">{doctor.location}</p>

// //         {/* Description */}
// //         <p className="mt-2 text-sm text-gray-600">{doctor.description}</p>

// //         {/* Rating and Button */}
// //         <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-4">
// //           <StarRating rating={parseFloat(doctor.rating)} />
// //           <button
// //             className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 w-full md:w-auto"
// //             onClick={() => navigate(`doctorprofile`)} // Pass dynamic doctor name in the URL
// //           >
// //             View Profile
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };


// // // Main Doctor Component
// // const Doctor = () => {
// //   // Sample doctor data
// //   const doctors = [
// //     {
// //       name: "Dr. Pranay Maurya",
// //       specialty: "Cardiologist",
// //       location: "Mumbai",
// //       rating: "5",
// //       description: "Specialist in cardiovascular treatments.",
// //       image: "https://via.placeholder.com/150",
// //     },
// //     {
// //       name: "Dr. Sahil Sharma",
// //       specialty: "Cardiologist",
// //       location: "Mumbai",
// //       rating: "5",
// //       description:
// //         "Experienced Cardiologist specializing in heart-related issues.",
// //       image: "https://via.placeholder.com/150",
// //     },
// //     {
// //       name: "Dr. Rudra Maurya",
// //       specialty: "Cardiologist",
// //       location: "Mumbai",
// //       rating: "4",
// //       description:
// //         "Experienced Cardiologist specializing in heart-related issues.",
// //       image: "https://via.placeholder.com/150",
// //     },
// //     {
// //       name: "Dr. Sneha Kapoor",
// //       specialty: "Dermatologist",
// //       location: "Delhi",
// //       rating: "4",
// //       description:
// //         "Specialist in skin care, acne, and dermatological treatments.",
// //       image: "https://via.placeholder.com/150",
// //     },
// //     {
// //       name: "Dr. Amit Sharma",
// //       specialty: "Orthopedist",
// //       location: "Bangalore",
// //       rating: "5",
// //       description: "Expert in treating musculoskeletal disorders and injuries.",
// //       image: "https://via.placeholder.com/150",
// //     },
// //     // Add more doctor data...
// //   ];

// //   const [filteredDoctors, setFilteredDoctors] = useState(doctors);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [filters, setFilters] = useState({
// //     location: [],
// //     specialty: [],
// //     rating: [],
// //   });

// //   const handleFilterChange = (filterName, isChecked) => {
// //     const [filterType, filterValue] = filterName.split("-");
  
// //     setFilters((prevFilters) => {
// //       const newFilters = { ...prevFilters };
// //       if (isChecked) {
// //         newFilters[filterType] = [...newFilters[filterType], filterValue];
// //       } else {
// //         newFilters[filterType] = newFilters[filterType].filter(
// //           (item) => item !== filterValue
// //         );
// //       }
// //       return newFilters;
// //     });
// //   };
  

// //   const handleSearchChange = (e) => {
// //     setSearchQuery(e.target.value.toLowerCase());
// //   };

// //   const filteredList = doctors.filter((doctor) => {
// //     // Search filter
// //     const matchesSearch =
// //       doctor.name.toLowerCase().includes(searchQuery) ||
// //       doctor.specialty.toLowerCase().includes(searchQuery) ||
// //       doctor.location.toLowerCase().includes(searchQuery);
  
// //     // Location filter
// //     const matchesLocation =
// //       filters.location.length === 0 ||
// //       filters.location.includes(doctor.location);
  
// //     // Specialty filter
// //     const matchesSpecialty =
// //       filters.specialty.length === 0 ||
// //       filters.specialty.includes(doctor.specialty);
  
// //     // Rating filter
// //     const matchesRating =
// //       filters.rating.length === 0 ||
// //       filters.rating.some((rating) => parseFloat(doctor.rating) == parseFloat(rating));
  
// //     return matchesSearch && matchesLocation && matchesSpecialty && matchesRating;
// //   });
  
// //   return (
// //     <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen p-6">
// //       <FilterSidebar onFilterChange={handleFilterChange} />
// //       <div className="flex-1 px-6 pt-3">
// //         <input
// //           type="text"
// //           placeholder="Search doctors..."
// //           className="w-full p-3 border rounded-lg mb-6"
// //           onChange={handleSearchChange}
// //         />
// //         {filteredList.map((doctor, index) => (
// //           <DoctorCard key={index} doctor={doctor} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Doctor;





// // this code with proper doctor fetching and filtering

// import { useDoctor } from "@/contexts/DoctorContext";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";


// // Custom Checkbox Component
// const CustomCheckbox = ({ label, name, onChange }) => {
//   const handleCheckboxChange = (e) => {
//     const { checked } = e.target;
//     onChange(name, checked);
//   };

//   return (
//     <label className="flex cursor-pointer items-center text-gray-700 font-bold hover:text-orange-500 space-x-3">
//       <input
//         className="peer hidden"
//         id={name}
//         name={name}
//         type="checkbox"
//         onChange={handleCheckboxChange}
//       />
//       <span className="w-5 h-5 border-2 border-gray-400 rounded-sm flex justify-center items-center peer-checked:border-orange-500 peer-checked:bg-orange-500">
//         <svg
//           className="hidden peer-checked:block w-4 h-4 text-white"
//           fill="currentColor"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//         >
//           <path d="M16.707 5.293a1 1 0 00-1.414-1.414L7 12.172 4.707 9.879a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l8-8z" />
//         </svg>
//       </span>
//       <span>{label}</span>
//     </label>
//   );
// };

// // Star Rating Component
// const StarRating = ({ rating }) => {
//   const fullStars = Math.floor(rating);
//   const emptyStars = 5 - Math.ceil(rating);

//   return (
//     <div className="flex">
//       {[...Array(fullStars)].map((_, index) => (
//         <span key={index} className="text-yellow-500 text-lg">
//           ⭐
//         </span>
//       ))}
//       {[...Array(emptyStars)].map((_, index) => (
//         <span key={index} className="text-gray-400 text-lg">
//           ☆
//         </span>
//       ))}
//     </div>
//   );
// };

// // Doctor Card Component
// const DoctorCard = ({ doctor }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="p-6 bg-white shadow-lg rounded-lg mb-6 flex flex-col md:flex-row gap-4 md:items-center sm:items-start">
//       {/* Doctor Image */}
//       <img
//         src={doctor.avatar?.url || '/default-doctor-image.png'} // Add a default image path
//         alt={doctor.name}
//         className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
//       />
//       <div className="flex-1">
//         {/* Doctor Information */}
//         <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
//         <p className="text-orange-500">{doctor.specialty}</p>
//         <p className="text-gray-500">{doctor.location}</p>
        
//         {/* Additional Details */}
//         <div className="mt-2 text-sm text-gray-600 space-y-1">
//           <p>{doctor.description}</p>
//           <p>Experience: {doctor.experience} years</p>
//           <p>Consultation Fee: ₹{doctor.consultationFee}</p>
//         </div>

//         {/* Rating and Actions */}
//         <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-4">
//           <div className="flex items-center gap-2">
//             <StarRating rating={doctor.rating || 0} />
//             <span className="text-sm text-gray-600">
//               ({doctor.numOfReviews || 0} reviews)
//             </span>
//           </div>
          
//           <div className="flex gap-2 w-full md:w-auto">
//             <button
//               className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 flex-1 md:flex-none"
//               onClick={() => navigate(`/doctor/${doctor._id}`)}
//             >
//               View Profile
//             </button>
//             <button
//               className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex-1 md:flex-none"
//               onClick={() => navigate(`/book-appointment/${doctor._id}`)}
//             >
//               Book Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Filter Items Component
// const FilterItems = ({ onCheckboxChange }) => (
//   <>
//     {/* Location Filter */}
//     <div>
//       <h3 className="text-lg font-bold mb-2">Location</h3>
//       <div className="space-y-2">
//         {["Mumbai", "Delhi", "Bangalore", "Chennai"].map((location) => (
//           <CustomCheckbox
//             key={location}
//             label={location}
//             name={`location-${location}`}
//             onChange={onCheckboxChange}
//           />
//         ))}
//       </div>
//     </div>

//     {/* Specialty Filter */}
//     <div>
//       <h3 className="text-lg font-bold mb-2">Specialty</h3>
//       <div className="space-y-2">
//         {["Cardiologist", "Dermatologist", "Orthopedist", "Pediatrician"].map(
//           (specialty) => (
//             <CustomCheckbox
//               key={specialty}
//               label={specialty}
//               name={`specialty-${specialty}`}
//               onChange={onCheckboxChange}
//             />
//           )
//         )}
//       </div>
//     </div>

//     {/* Rating Filter */}
//     <div>
//       <h3 className="text-lg font-bold mb-2">Rating</h3>
//       <div className="space-y-2">
//         {["5", "4", "3"].map((rating) => (
//           <CustomCheckbox
//             key={rating}
//             label={`${rating} Stars & Up`}
//             name={`rating-${rating}`}
//             onChange={onCheckboxChange}
//           />
//         ))}
//       </div>
//     </div>
//   </>
// );

// // Filter Sidebar Component
// const FilterSidebar = ({ onFilterChange }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   return (
//     <>
//       {/* Sidebar for large screens */}
//       <div className="hidden lg:block p-6 bg-white shadow-md rounded-lg space-y-6 w-1/4 h-fit">
//         <h2 className="text-xl font-bold mb-4 border-b pb-2 text-orange-500">
//           Filter by:
//         </h2>
//         <FilterItems onCheckboxChange={onFilterChange} />
//       </div>

//       {/* Dropdown for small screens */}
//       <div className="lg:hidden w-full mb-6">
//         <button
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           className="w-full p-3 bg-orange-500 text-white rounded-lg font-bold"
//         >
//           {isDropdownOpen ? "Close Filters" : "Open Filters"}
//         </button>
//         {isDropdownOpen && (
//           <div className="p-6 bg-white shadow-md rounded-lg space-y-6 mt-4">
//             <h2 className="text-xl font-bold mb-4 border-b pb-2 text-orange-500">
//               Filter by:
//             </h2>
//             <FilterItems onCheckboxChange={onFilterChange} />
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// // Main Doctor Component
// const Doctor = () => {
//   const { doctors, loading, error } = useDoctor();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filters, setFilters] = useState({
//     location: [],
//     specialty: [],
//     rating: [],
//   });

//   console.log(doctors);
  

//   const handleFilterChange = (filterName, isChecked) => {
//     const [filterType, filterValue] = filterName.split("-");
  
//     setFilters((prevFilters) => {
//       const newFilters = { ...prevFilters };
//       if (isChecked) {
//         newFilters[filterType] = [...newFilters[filterType], filterValue];
//       } else {
//         newFilters[filterType] = newFilters[filterType].filter(
//           (item) => item !== filterValue
//         );
//       }
//       return newFilters;
//     });
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };

//   const filteredList = doctors.filter((doctor) => {
//     const matchesSearch =
//       doctor.name.toLowerCase().includes(searchQuery) ||
//       doctor.specialty.toLowerCase().includes(searchQuery) ||
//       doctor.location.toLowerCase().includes(searchQuery);
  
//     const matchesLocation =
//       filters.location.length === 0 ||
//       filters.location.includes(doctor.location);
  
//     const matchesSpecialty =
//       filters.specialty.length === 0 ||
//       filters.specialty.includes(doctor.specialty);
  
//     const matchesRating =
//       filters.rating.length === 0 ||
//       filters.rating.some((rating) => doctor.rating >= parseFloat(rating));
  
//     return matchesSearch && matchesLocation && matchesSpecialty && matchesRating;
//   });

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-xl font-bold text-orange-500">Loading...</div>
//       </div>
//     );
//   }

//   if (doctors.length === 0) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-xl font-bold text-red-500">No doctors found.</div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen p-6 gap-6">
//       <FilterSidebar onFilterChange={handleFilterChange} />
//       <div className="flex-1">
//         {/* Search and Results Count */}
//         <div className="mb-6 space-y-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search doctors by name, specialty, or location..."
//               className="w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//               onChange={handleSearchChange}
//             />
//             <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//               🔍
//             </span>
//           </div>
//           <p className="text-gray-600">
//             Found {filteredList.length} doctor{filteredList.length !== 1 ? 's' : ''}
//           </p>
//         </div>

//         {/* Doctor Cards */}
//         {filteredList.length > 0 ? (
//           <div className="space-y-6">
//             {filteredList.map((doctor) => (
//               <DoctorCard key={doctor._id} doctor={doctor} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center p-6 bg-white rounded-lg shadow">
//             <p className="text-xl text-gray-600">No doctors found matching your criteria</p>
//             <p className="text-gray-500 mt-2">Try adjusting your filters or search term</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Doctor;




import React, { useState, useEffect } from 'react';
import { useDoctor } from '@/contexts/DoctorContext';
import { useNavigate } from 'react-router-dom';
import { Eye, GraduationCap } from 'lucide-react';

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
  // ... (unchanged)
};

// Improved Search Bar Component
const SearchBar = ({ value, onChange }) => (
  <div className="relative">
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search by name, specialty, or location..."
      className="w-full p-4 pl-12 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
    />
    <svg
      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </div>
);

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

  console.log(doctor);
  
  
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden" onClick={() => navigate(`/doctor/${doctor._id}`)}>
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    location: [],
    specialty: [],
    rating: [],
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = (filterName, isChecked) => {
    const [filterType, filterValue] = filterName.split("-");
    setFilters(prev => ({
      ...prev,
      [filterType]: isChecked
        ? [...prev[filterType], filterValue]
        : prev[filterType].filter(item => item !== filterValue)
    }));
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = 
      (doctor.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (doctor.specialty?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (doctor.location?.toLowerCase() || '').includes(searchQuery.toLowerCase());

    const matchesLocation = filters.location.length === 0 || 
      filters.location.includes(doctor.location);

    const matchesSpecialty = filters.specialty.length === 0 ||
      filters.specialty.includes(doctor.specialty);

    const matchesRating = filters.rating.length === 0 ||
      filters.rating.some(rating => doctor.rating >= parseFloat(rating));

    return matchesSearch && matchesLocation && matchesSpecialty && matchesRating;
  });

  // Generate filter options
  const locationOptions = [...new Set(doctors.map(d => d.location))].map(location => ({
    label: location,
    value: location,
    count: doctors.filter(d => d.location === location).length
  }));

  const specialtyOptions = [...new Set(doctors.map(d => d.specialty))].map(specialty => ({
    label: specialty,
    value: specialty,
    count: doctors.filter(d => d.specialty === specialty).length
  }));

  const ratingOptions = [
    { label: '4 Stars & Above', value: '4', count: doctors.filter(d => d.rating >= 4).length },
    { label: '3 Stars & Above', value: '3', count: doctors.filter(d => d.rating >= 3).length },
    { label: '2 Stars & Above', value: '2', count: doctors.filter(d => d.rating >= 2).length },
  ];

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

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Find a Doctor</h1>
        
        <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

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
                onClick={() => setFilters({ location: [], specialty: [], rating: [] })}
                className="text-sm text-orange-500 hover:text-orange-600"
              >
                Clear All
              </button>
            </div>
            
            <FilterSection 
              title="Location" 
              options={locationOptions}
              selectedFilters={filters.location}
              onChange={handleFilterChange}
            />

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
              <p className="text-gray-600">{filteredDoctors.length} doctors found</p>
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
            <div className="space-y-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;

