import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function GrowthChartStar({ size = 64, color = '#C9A24D', className }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M10 50L20 40L28 44L38 32L48 28" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="48" cy="28" r="2" fill={color}/>
      <path d="M48 14L50.5 20L57 21L52.5 25L54 32L48 28L42 32L43.5 25L39 21L45.5 20L48 14Z" fill={color}/>
    </svg>
  );
}

