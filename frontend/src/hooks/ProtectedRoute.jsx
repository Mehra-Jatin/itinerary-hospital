import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import Loading from "@/components/Loading";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  const [delayedLoading, setDelayedLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for loading
    const timer = setTimeout(() => setDelayedLoading(false), 1000); // 1 seconds
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  if (loading || delayedLoading) {
    return (
      <Loading />
    );
  }

  if (!user || user.role !== role) {
    const roleName = role ? role.charAt(0).toUpperCase() + role.slice(1) : "User";
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">Oops! Wrong Turn?</h1>
        <p className="text-xl mt-2 italic">
          This page is reserved for {roleName}s only. Are you lost?
        </p>
        <Navigate to="/auth/login" replace />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
