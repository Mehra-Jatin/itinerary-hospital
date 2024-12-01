import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import Loading from "@/components/Loading";

// function ProtectedLoginRoute({ children }) {
//   const { user, loading } = useAuth();
//   const [delayedLoading, setDelayedLoading] = useState(true);

//   useEffect(() => {
//     // Add a small delay to ensure smooth loading
//     const timer = setTimeout(() => setDelayedLoading(false), 1000); // 1 second
//     return () => clearTimeout(timer); // Cleanup on unmount
//   }, []);

//   if (loading || delayedLoading) {
//     return (
//       <Loading />
//     );
//   }

//   if (user) {
//     if (user.role === 'doctor' && user.validated) {
//       return <Navigate to="/doctor-profile" replace />;
//     }
//     if (user.role === 'admin') {
//       return <Navigate to="/admin-dashboard" replace />;
//     }
//     return <Navigate to="/" replace />;
//   }

//   return children; // Login or Registration Component
// }

// export default ProtectedLoginRoute;

function ProtectedLoginRoute({ children }) {
  const { user } = useAuth();

  // console.log(user.isValidated);
  


  if (user && user.role === 'doctor' && user.isValidated) {
    return <Navigate to="/doctor-profile" replace />;
  }
  if (user && user.role === 'admin') {
    return <Navigate to="/admin-dashboard" replace />;
  }
  if (user && user.role === 'patient') {
  return <Navigate to="/" replace />;
  }


  return children; // Allow access to login page
}

export default ProtectedLoginRoute;
