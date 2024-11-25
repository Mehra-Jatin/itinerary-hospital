import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from './Loading'; // The loading component we created earlier

// Wrapper component to handle loading states
export const LoadingWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show loading screen
    setIsLoading(true);

    // Hide loading screen after a minimum delay
    // This prevents flash of loading screen for quick transitions
    const minimumLoadingTime = 500;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, minimumLoadingTime);

    return () => clearTimeout(timer);
  }, [location.pathname]); // Trigger on route change

  if (isLoading) {
    return <Loading />;
  }

  return children;
};