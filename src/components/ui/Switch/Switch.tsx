import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './Switch.module.css';

export interface SwitchProps {
  /**
   * Whether the switch is checked
   */
  checked: boolean;
  
  /**
   * Function called when the switch is toggled
   */
  onChange: () => void;
  
  /**
   * Optional label to display beside the switch
   */
  label?: string;
  
  /**
   * Disables the switch
   */
  disabled?: boolean;
  
  /**
   * Optional additional className
   */
  className?: string;
  
  /**
   * Optional ID for the switch
   */
  id?: string;
}

/**
 * Switch component for toggling between two states
 */
export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className,
  id
}) => {
  const switchId = id || `switch-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className={cn(styles.switchContainer, className)}>
      {label && (
        <label htmlFor={switchId} className={styles.switchLabel}>
          {label}
        </label>
      )}
      <div
        className={cn(
          styles.switch,
          checked && styles.switchChecked,
          disabled && styles.switchDisabled
        )}
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={disabled ? undefined : onChange}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onChange();
          }
        }}
        id={switchId}
      >
        <div className={styles.switchThumb} />
      </div>
    </div>
  );
};

Switch.displayName = 'Switch'; 