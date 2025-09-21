import React from 'react';

interface TransmitFlowLogoProps {
  size?: number;
  className?: string;
}

export default function TransmitFlowLogo({ size = 24, className = "" }: TransmitFlowLogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={`transmitGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      
      <circle cx="50" cy="50" r="50" fill={`url(#transmitGradient-${size})`} />
      
      <g transform="translate(50, 50)">
        {/* Main lightning bolt - original design - BIGGER SIZE */}
        <path d="M-12 -25 L12 -7 L-3 -7 L18 20 L-18 0 L3 0 Z" 
              fill="white" 
              stroke="none"/>
        
        {/* Small transmission dots */}
        <circle cx="-20" cy="-10" r="2.5" fill="white" opacity="0.8"/>
        <circle cx="20" cy="10" r="2.5" fill="white" opacity="0.8"/>
        <circle cx="-15" cy="15" r="2" fill="white" opacity="0.6"/>
        <circle cx="15" cy="-15" r="2" fill="white" opacity="0.6"/>
      </g>
    </svg>
  );
}