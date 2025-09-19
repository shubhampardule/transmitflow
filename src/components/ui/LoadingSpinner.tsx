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
      <div className="relative w-24 h-24">
        {/* Center breathing/popout blue dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-6 h-6 ${
            isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
          } rounded-full`} 
          style={{
            animation: 'breathe 1.5s ease-in-out infinite'
          }}></div>
        </div>
        
        {/* Orbiting purple dot with collision bounce */}
        <div className="absolute inset-0" style={{
          animation: 'orbit1 2s linear infinite'
        }}>
          <div className={`absolute top-0 left-1/2 w-3 h-3 ${
            isDarkMode ? 'bg-purple-400' : 'bg-purple-500'
          } rounded-full transform -translate-x-1/2 -translate-y-1.5`}
          style={{
            animation: 'bounce-collision 2s ease-in-out infinite'
          }}></div>
        </div>
        
        {/* Orbiting green dot with collision bounce */}
        <div className="absolute inset-0" style={{
          animation: 'orbit2 2.5s linear infinite'
        }}>
          <div className={`absolute bottom-0 left-1/2 w-2.5 h-2.5 ${
            isDarkMode ? 'bg-green-400' : 'bg-green-500'
          } rounded-full transform -translate-x-1/2 translate-y-1.5`}
          style={{
            animation: 'bounce-collision 2.5s ease-in-out infinite reverse'
          }}></div>
        </div>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes breathe {
            0%, 100% { 
              transform: scale(1);
              opacity: 0.8;
            }
            50% { 
              transform: scale(1.3);
              opacity: 1;
            }
          }
          
          @keyframes orbit1 {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes orbit2 {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
          }
          
          @keyframes bounce-collision {
            0%, 100% { 
              transform: scale(1) translateY(0px);
            }
            25% { 
              transform: scale(1.2) translateY(-2px);
            }
            50% { 
              transform: scale(0.9) translateY(0px);
            }
            75% { 
              transform: scale(1.1) translateY(2px);
            }
          }
        `}</style>
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
