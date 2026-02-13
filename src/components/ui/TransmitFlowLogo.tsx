import React from 'react';

interface TransmitFlowLogoProps {
  size?: number;
  className?: string;
}

export default function TransmitFlowLogo({ size = 24, className = "" }: TransmitFlowLogoProps) {
  const id = React.useId();
  const g = `${id}-g`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="TransmitFlow logo"
    >
      <defs>
        <linearGradient id={g} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>

      {/* Large body */}
      <circle cx="58" cy="55" r="28" fill={`url(#${g})`} />

      {/* Orbiting small body */}
      <circle cx="24" cy="24" r="14" fill={`url(#${g})`} />
    </svg>
  );
}