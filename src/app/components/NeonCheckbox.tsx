import React from 'react';

interface NeonCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
}

export default function NeonCheckbox({ checked, onChange, label, id }: NeonCheckboxProps) {
  return (
    <label htmlFor={id} className="flex items-center gap-2 cursor-pointer">
      <div className="neon-checkbox">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="neon-checkbox__frame">
          <div className="neon-checkbox__box">
            <div className="neon-checkbox__check-container">
              <svg viewBox="0 0 24 24" className="neon-checkbox__check">
                <path d="M3,12.5l7,7L21,5"></path>
              </svg>
            </div>
            <div className="neon-checkbox__glow"></div>
            <div className="neon-checkbox__borders">
              <span></span><span></span><span></span><span></span>
            </div>
          </div>
          <div className="neon-checkbox__effects">
            <div className="neon-checkbox__particles">
              <span></span><span></span><span></span><span></span>
              <span></span><span></span><span></span><span></span>
              <span></span><span></span><span></span><span></span>
            </div>
            <div className="neon-checkbox__rings">
              <div className="ring"></div>
              <div className="ring"></div>
              <div className="ring"></div>
            </div>
            <div className="neon-checkbox__sparks">
              <span></span><span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </div>
      {label && <span className="text-xs font-medium text-gray-300">{label}</span>}
    </label>
  );
}

