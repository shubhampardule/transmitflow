import React from 'react';

interface TransmitFlowLogoOnlyProps {
  size?: number;
  className?: string;
  color?: string;
}

export default function TransmitFlowLogoOnly({ 
  size = 48, 
  className = "", 
  color = "currentColor" 
}: TransmitFlowLogoOnlyProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 60 60" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g transform="translate(30, 30)">
        {/* Main lightning bolt - original design - centered without background */}
        <path d="M-12 -25 L12 -7 L-3 -7 L18 20 L-18 0 L3 0 Z" 
              fill={color} 
              stroke="none"/>
        
        {/* Small transmission dots */}
        <circle cx="-20" cy="-10" r="2.5" fill={color} opacity="0.8"/>
        <circle cx="20" cy="10" r="2.5" fill={color} opacity="0.8"/>
        <circle cx="-15" cy="15" r="2" fill={color} opacity="0.6"/>
        <circle cx="15" cy="-15" r="2" fill={color} opacity="0.6"/>
      </g>
    </svg>
  );
}