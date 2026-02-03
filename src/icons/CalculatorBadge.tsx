import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  badgeColor?: string;
}

export default function CalculatorBadge({ size = 64, color = '#C9A24D', badgeColor = '#212325', className }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="14" y="10" width="28" height="44" rx="4" stroke={color} strokeWidth="2.5" fill="none"/>
      <rect x="18" y="16" width="20" height="8" rx="2" fill={color}/>
      <rect x="18" y="28" width="4" height="4" rx="1" fill={color}/>
      <rect x="24" y="28" width="4" height="4" rx="1" fill={color}/>
      <rect x="30" y="28" width="4" height="4" rx="1" fill={color}/>
      <rect x="18" y="34" width="4" height="4" rx="1" fill={color}/>
      <rect x="24" y="34" width="4" height="4" rx="1" fill={color}/>
      <rect x="30" y="34" width="4" height="4" rx="1" fill={color}/>
      <circle cx="46" cy="18" r="10" fill={color}/>
      <path d="M42 18L45 21L50 16" stroke={badgeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

