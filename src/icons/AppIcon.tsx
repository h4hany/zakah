import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  bgColor?: string;
}

export default function AppIcon({ size = 64, color = '#C9A24D', bgColor = '#212325', className }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="8" y="8" width="48" height="48" rx="12" fill={color}/>
      <rect x="18" y="18" width="28" height="8" rx="2" fill={bgColor}/>
      <rect x="18" y="30" width="6" height="6" rx="2" fill={bgColor}/>
      <rect x="27" y="30" width="6" height="6" rx="2" fill={bgColor}/>
      <rect x="36" y="30" width="6" height="6" rx="2" fill={bgColor}/>
      <rect x="18" y="38" width="6" height="6" rx="2" fill={bgColor}/>
      <rect x="27" y="38" width="15" height="6" rx="2" fill={bgColor}/>
    </svg>
  );
}

