import React, { useEffect, useState } from "react";
import TransmitFlowLogoOnly from "./TransmitFlowLogoOnly";

interface LoadingSpinnerProps {
  connectionStatus?: 'connecting' | 'connected' | 'failed';
  errorMessage?: string;
}

export default function LoadingSpinner({ connectionStatus = 'connecting', errorMessage = '' }: LoadingSpinnerProps) {
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to light mode

  useEffect(() => {
    // Check for saved theme preference first
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    } else if (savedTheme === 'light') {
      setIsDarkMode(false);
    } else {
      // For first-time users with no saved preference, default to light mode
      // (We already initialized with false, so no need to change)
      setIsDarkMode(false);
    }
  }, []);

  return (
    <div className={`fixed inset-0 w-full h-screen flex flex-col items-center justify-center z-50 transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-900' : 'bg-indigo-50'
    }`}>
      {/* Logo/Brand Area */}
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <TransmitFlowLogoOnly 
            size={64} 
            color={isDarkMode ? "#8B5CF6" : "#6366F1"}
            className="animate-pulse"
          />
        </div>
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
      <div className="relative w-24 h-24 mx-auto">
        {/* Ambient glow rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-20 h-20 border border-opacity-20 ${
            isDarkMode ? 'border-blue-300' : 'border-blue-400'
          } rounded-full`}
          style={{
            animation: 'glow-pulse 3s ease-in-out infinite'
          }}></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-16 h-16 border border-opacity-30 ${
            isDarkMode ? 'border-purple-300' : 'border-purple-400'
          } rounded-full`}
          style={{
            animation: 'glow-pulse 2s ease-in-out infinite reverse'
          }}></div>
        </div>

        {/* Center breathing/popout blue dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-6 h-6 ${
            isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
          } rounded-full shadow-lg`} 
          style={{
            animation: 'breathe 1.5s ease-in-out infinite',
            boxShadow: isDarkMode 
              ? '0 0 20px rgba(96, 165, 250, 0.6)' 
              : '0 0 20px rgba(59, 130, 246, 0.6)'
          }}></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 ${
                isDarkMode ? 'bg-gray-400' : 'bg-gray-300'
              } rounded-full opacity-60`}
              style={{
                left: `${20 + i * 10}%`,
                top: `${15 + (i % 3) * 25}%`,
                animation: `float-particle ${2 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
        
        {/* Orbiting purple dot with collision bounce */}
        <div className="absolute inset-0 flex items-center justify-center" style={{
          animation: 'orbit1 2s linear infinite'
        }}>
          <div className={`absolute w-3 h-3 ${
            isDarkMode ? 'bg-purple-400' : 'bg-purple-500'
          } rounded-full shadow-lg`}
          style={{
            top: '-6px',
            left: '50%',
            transform: 'translateX(-50%)',
            transformOrigin: '50% 42px',
            animation: 'bounce-collision 2s ease-in-out infinite',
            boxShadow: isDarkMode 
              ? '0 0 15px rgba(196, 181, 253, 0.5)' 
              : '0 0 15px rgba(168, 85, 247, 0.5)'
          }}></div>
        </div>
        
        {/* Orbiting green dot with collision bounce */}
        <div className="absolute inset-0 flex items-center justify-center" style={{
          animation: 'orbit2 2.5s linear infinite'
        }}>
          <div className={`absolute w-2.5 h-2.5 ${
            isDarkMode ? 'bg-green-400' : 'bg-green-500'
          } rounded-full shadow-lg`}
          style={{
            bottom: '-5px',
            left: '50%',
            transform: 'translateX(-50%)',
            transformOrigin: '50% -37px',
            animation: 'bounce-collision 2.5s ease-in-out infinite reverse',
            boxShadow: isDarkMode 
              ? '0 0 15px rgba(74, 222, 128, 0.5)' 
              : '0 0 15px rgba(34, 197, 94, 0.5)'
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
          
          @keyframes glow-pulse {
            0%, 100% { 
              opacity: 0.2;
              transform: scale(1);
            }
            50% { 
              opacity: 0.6;
              transform: scale(1.05);
            }
          }
          
          @keyframes float-particle {
            0%, 100% { 
              transform: translateY(0px) scale(0.8);
              opacity: 0.3;
            }
            50% { 
              transform: translateY(-8px) scale(1);
              opacity: 0.8;
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
      
      {/* Connection Status */}
      <div className="mt-8 text-center">
        {connectionStatus === 'connecting' && (
          <p className={`text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Getting ready...
          </p>
        )}
        
        {connectionStatus === 'connected' && (
          <p className={`text-sm font-medium transition-colors duration-300 ${
            isDarkMode ? 'text-green-400' : 'text-green-600'
          }`}>
            ✓ All set!
          </p>
        )}
        
        {connectionStatus === 'failed' && (
          <div className="space-y-2">
            <p className={`text-sm font-medium transition-colors duration-300 ${
              isDarkMode ? 'text-red-400' : 'text-red-600'
            }`}>
              ✗ Something went wrong
            </p>
            {errorMessage && (
              <p className={`text-xs transition-colors duration-300 ${
                isDarkMode ? 'text-gray-500' : 'text-gray-500'
              }`}>
                {errorMessage}
              </p>
            )}
            <p className={`text-xs transition-colors duration-300 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-500'
            }`}>
              Please check your internet connection and try again
            </p>
          </div>
        )}
      </div>
    </div>
  );
}