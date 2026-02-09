'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { signalingService } from '@/lib/signaling';

interface DelayedLoaderProps {
  children: React.ReactNode;
  minimumLoadTime?: number; // in milliseconds
}

export default function DelayedLoader({ children, minimumLoadTime = 1500 }: DelayedLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'failed'>('connecting');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false);
  const [connectionResolved, setConnectionResolved] = useState(false);

  useEffect(() => {
    // Always ensure minimum loading time (1.5 seconds)
    const minTimer = setTimeout(() => {
      setMinimumTimeElapsed(true);
    }, minimumLoadTime);

    // Attempt to connect to signaling server with staged delays for visual effect
    const connectToServer = async () => {
      try {
        setConnectionStatus('connecting');
        console.log('Attempting to connect to signaling server...');
        
        // Give users time to see "Getting ready..." message (at least 800ms)
        await new Promise(resolve => setTimeout(resolve, 800));
        
        await signalingService.connect();
        
        console.log('Successfully connected to signaling server');
        setConnectionStatus('connected');
        
        // Give users time to see "All set!" message (at least 400ms)
        await new Promise(resolve => setTimeout(resolve, 400));
        
        setConnectionResolved(true);
      } catch (error) {
        console.error('Failed to connect to signaling server:', error);
        setConnectionStatus('failed');
        setErrorMessage(error instanceof Error ? error.message : 'Connection failed');
        
        // Give users time to see the error message (at least 600ms)
        await new Promise(resolve => setTimeout(resolve, 600));
        
        setConnectionResolved(true);
      }
    };

    connectToServer();

    return () => {
      clearTimeout(minTimer);
    };
  }, [minimumLoadTime]);

  // Effect to hide loading when both conditions are met
  useEffect(() => {
    if (minimumTimeElapsed && connectionResolved) {
      setIsExiting(true);
      const exitTimer = setTimeout(() => {
        setIsLoading(false);
      }, 260);

      return () => {
        clearTimeout(exitTimer);
      };
    }
  }, [minimumTimeElapsed, connectionResolved]);

  // Show loading spinner while connecting or during minimum time
  if (isLoading) {
    return (
      <LoadingSpinner
        connectionStatus={connectionStatus}
        errorMessage={errorMessage}
        isExiting={isExiting}
      />
    );
  }

  // Show content after connection is established and minimum time has passed
  return <>{children}</>;
}
