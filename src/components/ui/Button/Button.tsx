import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'round';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button visual variant */
  variant?: ButtonVariant;
  
  /** Button size */
  size?: ButtonSize;
  
  /** Icon to display before button text */
  startIcon?: React.ReactNode;
  
  /** Icon to display after button text */
  endIcon?: React.ReactNode;
  
  /** Make button square with equal width/height (for icon buttons) */
  iconOnly?: boolean;
  
  /** Make button have fully rounded corners */
  pill?: boolean;
  
  /** Button content */
  children?: React.ReactNode;
}

/**
 * Button component for user interaction.
 * Supports multiple variants, sizes, and icon placements.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      startIcon,
      endIcon,
      iconOnly = false,
      pill = false,
      children,
      ...props
    },
    ref
  ) => {
    // Round variant is always pill-shaped
    const isPill = variant === 'round' ? true : pill;
    
    return (
      <button
        className={cn(
          styles.button,
          styles[variant === 'round' ? 'primary' : variant],
          styles[size],
          iconOnly && styles.iconOnly,
          isPill && styles.pill,
          variant === 'round' && styles.round,
          className
        )}
        ref={ref}
        {...props}
      >
        {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
        {children}
        {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button'; 