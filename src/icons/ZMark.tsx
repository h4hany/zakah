import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function ZMark({ size = 64, color = '#C9A24D', className }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="32" cy="32" r="26" stroke={color} strokeWidth="2.5"/>
      <path d="M22 24H38L26 36H22L34 48H42L30 36H34L46 24H38V20H22V24Z" fill={color}/>
    </svg>
  );
}

