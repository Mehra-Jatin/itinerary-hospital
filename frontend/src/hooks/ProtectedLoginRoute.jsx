import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import Loading from "@/components/Loading";

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
      <Loading />
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children; // Login or Registration Component
}

export default ProtectedLoginRoute;
