import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  innerColor?: string;
}

export default function ShieldCalculator({ size = 64, color = '#C9A24D', innerColor = '#212325', className }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M32 6L10 14V28C10 41.2 18.4 52.6 32 56C45.6 52.6 54 41.2 54 28V14L32 6Z" 
        fill={color} 
        stroke={color} 
        strokeWidth="2"
      />
      <rect x="22" y="22" width="4" height="4" fill={innerColor}/>
      <rect x="28" y="22" width="4" height="4" fill={innerColor}/>
      <rect x="34" y="22" width="4" height="4" fill={innerColor}/>
      <rect x="22" y="28" width="4" height="4" fill={innerColor}/>
      <rect x="28" y="28" width="4" height="4" fill={innerColor}/>
      <rect x="34" y="28" width="4" height="4" fill={innerColor}/>
      <rect x="22" y="34" width="4" height="4" fill={innerColor}/>
      <rect x="28" y="34" width="10" height="4" fill={innerColor}/>
    </svg>
  );
}

