import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function CirclePercentage({ size = 64, color = '#C9A24D', className }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="32" cy="32" r="26" stroke={color} strokeWidth="3"/>
      <text x="32" y="38" fontFamily="monospace" fontSize="16" fontWeight="bold" fill={color} textAnchor="middle">2.5%</text>
    </svg>
  );
}

