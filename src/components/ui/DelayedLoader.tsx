'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface DelayedLoaderProps {
  children: React.ReactNode;
  minimumLoadTime?: number; // in milliseconds
}

export default function DelayedLoader({ children, minimumLoadTime = 1500 }: DelayedLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set minimum loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, minimumLoadTime);

    return () => clearTimeout(timer);
  }, [minimumLoadTime]);

  // Show loading spinner for minimum time
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Show content after minimum time has passed
  return <>{children}</>;
}