import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function StarShield({ size = 64, color = '#C9A24D', className }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M32 8L12 16V30C12 42 19 52 32 56C45 52 52 42 52 30V16L32 8Z" stroke={color} strokeWidth="2.5" fill="none"/>
      <path d="M32 22L34.5 28L41 29L36.5 33L38 40L32 36L26 40L27.5 33L23 29L29.5 28L32 22Z" fill={color}/>
    </svg>
  );
}

