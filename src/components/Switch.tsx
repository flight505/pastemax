import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  id?: string;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange, label, id }) => {
  const switchId = id || `switch-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className="switch-container">
      {label && (
        <label htmlFor={switchId} className="switch-label">
          {label}
        </label>
      )}
      <div 
        className={`switch ${checked ? 'switch-checked' : ''}`} 
        onClick={onChange}
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onChange();
          }
        }}
        id={switchId}
      >
        <div className="switch-thumb" />
      </div>
    </div>
  );
};

export default Switch; 