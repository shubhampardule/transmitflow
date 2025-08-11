'use client';

interface SendifyLogoProps {
  size?: number;
  className?: string;
}

export default function SendifyLogo({ size = 100, className = "" }: SendifyLogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="sendifyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      
      <circle cx="50" cy="50" r="45" fill="url(#sendifyGradient)" />
      
      <g transform="scale(0.85) translate(8.8, 8.8)">
        <circle cx="25" cy="25" r="12" fill="white"/>
        <circle cx="75" cy="75" r="12" fill="white"/>
        <path 
          d="M35 35L45 50L35 65L65 35L55 50L65 65" 
          stroke="white" 
          strokeWidth="8" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
