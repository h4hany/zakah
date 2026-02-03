import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function HandGiving({ size = 64, color = '#C9A24D', className }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M20 40C20 40 22 38 26 38C30 38 32 40 32 40V50C32 52 30 54 28 54H24C22 54 20 52 20 50V40Z" fill={color}/>
      <path d="M26 38V32C26 30 27 28 29 28H33C35 28 36 30 36 32V38" stroke={color} strokeWidth="2" fill="none"/>
      <circle cx="24" cy="24" r="3" fill={color}/>
      <circle cx="32" cy="20" r="3" fill={color}/>
      <circle cx="28" cy="16" r="2.5" fill={color}/>
    </svg>
  );
}

