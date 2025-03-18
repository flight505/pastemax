import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button visual variant
   * @default 'primary'
   */
  variant?: ButtonVariant;
  
  /**
   * Button size
   * @default 'md'
   */
  size?: ButtonSize;
  
  /**
   * Optional icon to display before the button text
   */
  startIcon?: React.ReactNode;
  
  /**
   * Optional icon to display after the button text
   */
  endIcon?: React.ReactNode;
  
  /**
   * If true, button will have equal width and height, and padding will be adjusted
   */
  iconOnly?: boolean;
  
  /**
   * If true, button will have fully rounded corners
   */
  pill?: boolean;
  
  /**
   * Button children
   */
  children?: React.ReactNode;
}

/**
 * Primary UI component for user interaction.
 * Supports multiple variants and sizes with optional icons.
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
    return (
      <button
        className={cn(
          styles.button,
          styles[variant],
          styles[size],
          iconOnly && styles.iconOnly,
          pill && styles.pill,
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