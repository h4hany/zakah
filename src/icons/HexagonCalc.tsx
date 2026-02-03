import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function HexagonCalc({ size = 64, color = '#C9A24D', className }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M32 8L48 18V38L32 48L16 38V18L32 8Z" stroke={color} strokeWidth="2.5" fill="none"/>
      <circle cx="26" cy="26" r="2" fill={color}/>
      <circle cx="32" cy="26" r="2" fill={color}/>
      <circle cx="38" cy="26" r="2" fill={color}/>
      <circle cx="26" cy="32" r="2" fill={color}/>
      <circle cx="32" cy="32" r="2" fill={color}/>
      <circle cx="38" cy="32" r="2" fill={color}/>
      <circle cx="26" cy="38" r="2" fill={color}/>
      <rect x="30" y="36" width="10" height="4" rx="2" fill={color}/>
    </svg>
  );
}

