import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 w-full h-screen flex flex-col items-center justify-center z-50 bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Logo/Brand Area */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight pb-2 dark:from-blue-300 dark:to-purple-300 transition-all duration-500">
          TransmitFlow
        </h1>
        <p className="text-lg text-muted-foreground dark:text-gray-400 transition-colors duration-300">
          Seamless file transmission
        </p>
      </div>

      {/* Modern Loading Animation */}
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin border-t-blue-500 dark:border-t-blue-400"></div>
        
        {/* Inner pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse"></div>
        </div>
        
        {/* Orbital dots */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}>
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full transform -translate-x-1/2 -translate-y-1"></div>
        </div>
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
          <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full transform -translate-x-1/2 translate-y-1"></div>
        </div>
      </div>

      {/* Loading text */}
      <div className="mt-6 flex items-center space-x-2">
        <span className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
          Loading
        </span>
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>

      {/* Progress bar simulation */}
      <div className="mt-8 w-64 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}
