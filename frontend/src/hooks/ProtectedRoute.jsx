import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;