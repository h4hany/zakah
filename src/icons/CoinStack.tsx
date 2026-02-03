import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function CoinStack({ size = 64, color = '#C9A24D', className }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse cx="24" cy="44" rx="12" ry="4" fill={color}/>
      <ellipse cx="24" cy="38" rx="12" ry="4" fill={color} opacity="0.8"/>
      <ellipse cx="24" cy="32" rx="12" ry="4" fill={color} opacity="0.6"/>
      <path d="M40 20C40 25.5 36 30 30 32C31.5 32 33 31.5 34.5 30.5C38.5 28 40 24 40 20Z" fill={color}/>
      <circle cx="44" cy="18" r="2" fill={color}/>
    </svg>
  );
}

