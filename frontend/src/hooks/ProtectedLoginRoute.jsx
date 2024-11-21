import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";

function ProtectedLoginRoute({ children }) {
  const { user, loading } = useAuth();
  const [delayedLoading, setDelayedLoading] = useState(true);

  useEffect(() => {
    // Add a small delay to ensure smooth loading
    const timer = setTimeout(() => setDelayedLoading(false), 1000); // 1 second
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  if (loading || delayedLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
        <p className="ml-4 text-xl font-semibold text-orange-600">Checking...</p>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children; // Login or Registration Component
}

export default ProtectedLoginRoute;
