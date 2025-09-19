import React, { useEffect, useState } from "react";

export default function LoadingSpinner() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved dark mode preference first
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    } else if (savedTheme === 'light') {
      setIsDarkMode(false);
    } else {
      // If no saved preference, check system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemPrefersDark);
    }
  }, []);

  return (
    <div className={`fixed inset-0 w-full h-screen flex flex-col items-center justify-center z-50 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-950' : 'bg-white'
    }`}>
      {/* Logo/Brand Area */}
      <div className="mb-8 text-center">
        <h1 className={`text-4xl font-bold bg-gradient-to-r ${
          isDarkMode 
            ? 'from-blue-300 to-purple-300' 
            : 'from-blue-400 to-purple-400'
        } bg-clip-text text-transparent leading-tight pb-2 transition-all duration-500`}>
          TransmitFlow
        </h1>
        <p className={`text-lg transition-colors duration-300 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Seamless file transmission
        </p>
      </div>

      {/* Modern Loading Animation */}
      <div className="relative">
        {/* Outer rotating ring */}
        <div className={`w-16 h-16 border-4 ${
          isDarkMode ? 'border-gray-700 border-t-blue-400' : 'border-gray-200 border-t-blue-500'
        } rounded-full animate-spin`}></div>
        
        {/* Inner pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-3 h-3 ${
            isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
          } rounded-full animate-pulse`}></div>
        </div>
        
        {/* Orbital dots */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}>
          <div className={`absolute top-0 left-1/2 w-2 h-2 ${
            isDarkMode ? 'bg-purple-400' : 'bg-purple-500'
          } rounded-full transform -translate-x-1/2 -translate-y-1`}></div>
        </div>
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
          <div className={`absolute bottom-0 left-1/2 w-1.5 h-1.5 ${
            isDarkMode ? 'bg-green-400' : 'bg-green-500'
          } rounded-full transform -translate-x-1/2 translate-y-1`}></div>
        </div>
      </div>

      {/* Loading text */}
      <div className="mt-6 flex items-center space-x-2">
        <span className={`text-sm transition-colors duration-300 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Loading
        </span>
        <div className="flex space-x-1">
          <div className={`w-1 h-1 ${
            isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
          } rounded-full animate-bounce`}></div>
          <div className={`w-1 h-1 ${
            isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
          } rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
          <div className={`w-1 h-1 ${
            isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
          } rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>

      {/* Progress bar simulation */}
      <div className={`mt-8 w-64 h-1 ${
        isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
      } rounded-full overflow-hidden`}>
        <div className={`h-full bg-gradient-to-r ${
          isDarkMode 
            ? 'from-blue-400 to-purple-400' 
            : 'from-blue-500 to-purple-500'
        } rounded-full animate-pulse`}></div>
      </div>
    </div>
  );
}
