import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './Input.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Shows error styling
   */
  error?: boolean;
  
  /**
   * Icon to display at the start of the input
   */
  startIcon?: React.ReactNode;
  
  /**
   * Icon to display at the end of the input
   */
  endIcon?: React.ReactNode;
  
  /**
   * Applies search input styling
   */
  isSearchInput?: boolean;
}

/**
 * Input component for text entry
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, startIcon, endIcon, isSearchInput, ...props }, ref) => {
    return (
      <div className={styles.inputWrapper}>
        {startIcon && <div className={styles.startIcon}>{startIcon}</div>}
        <input
          className={cn(
            styles.input,
            startIcon ? styles.withStartIcon : null,
            endIcon ? styles.withEndIcon : null,
            isSearchInput ? styles.searchInput : null,
            error ? styles.inputError : null,
            className
          )}
          ref={ref}
          {...props}
        />
        {endIcon && <div className={styles.endIcon}>{endIcon}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input'; 