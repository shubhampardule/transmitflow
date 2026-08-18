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
      role="img"
      aria-label="TransmitFlow logo"
    >
      {/* Flight path — two dots between the nodes */}
      <circle cx="47" cy="53" r="2.75" className="text-primary" fill="currentColor" />
      <circle cx="53" cy="47" r="2.75" className="text-primary" fill="currentColor" />

      {/* Node A (sender) */}
      <rect x="14" y="56" width="28" height="28" rx="3" fill="currentColor" />

      {/* Node B (receiver) */}
      <rect x="58" y="16" width="28" height="28" rx="3" fill="currentColor" />
    </svg>
  );
}
