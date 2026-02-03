import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function CrescentCoin({ size = 64, color = '#C9A24D', className }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="32" cy="32" r="24" stroke={color} strokeWidth="3" fill="none"/>
      <path d="M38 20C38 26.627 32.627 32 26 32C27.5 32 29 31.5 30.5 30.5C35.5 27 38 23 38 20Z" fill={color}/>
      <circle cx="42" cy="18" r="2" fill={color}/>
    </svg>
  );
}

