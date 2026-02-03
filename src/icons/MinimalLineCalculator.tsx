import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function MinimalLineCalculator({ size = 64, color = '#C9A24D', className }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="18" y="12" width="28" height="40" rx="4" stroke={color} strokeWidth="2"/>
      <line x1="22" y1="20" x2="42" y2="20" stroke={color} strokeWidth="2"/>
      <line x1="22" y1="28" x2="26" y2="28" stroke={color} strokeWidth="2"/>
      <line x1="30" y1="28" x2="34" y2="28" stroke={color} strokeWidth="2"/>
      <line x1="38" y1="28" x2="42" y2="28" stroke={color} strokeWidth="2"/>
      <line x1="22" y1="34" x2="26" y2="34" stroke={color} strokeWidth="2"/>
      <line x1="30" y1="34" x2="34" y2="34" stroke={color} strokeWidth="2"/>
      <line x1="38" y1="34" x2="42" y2="34" stroke={color} strokeWidth="2"/>
      <line x1="22" y1="40" x2="26" y2="40" stroke={color} strokeWidth="2"/>
      <line x1="30" y1="40" x2="42" y2="40" stroke={color} strokeWidth="2"/>
    </svg>
  );
}

