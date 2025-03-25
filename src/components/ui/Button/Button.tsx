import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'round' | 'icon' | 'pill';
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
   * Useful for icon-only buttons
   * @default false
   */
  iconOnly?: boolean;
  
  /**
   * If true, button will have fully rounded corners (pill shape)
   * Note: This is different from the 'pill' variant which has specific styling
   * @default false
   */
  pill?: boolean;
  
  /**
   * Button children (text content or other elements)
   */
  children?: React.ReactNode;
}

/**
 * Primary UI component for user interaction.
 * Supports multiple variants (primary, secondary, ghost, destructive, round, pill, icon) and sizes.
 * Round variant is always pill-shaped and inherits primary colors with enhanced styling.
 * Pill variant is a compact, high-contrast tag-like button (similar to the Platform badge in the reference).
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
    // Force pill shape for round variant and pill variant
    const isPillShaped = variant === 'round' || variant === 'pill' || pill;
    
    return (
      <button
        className={cn(
          styles.button,
          styles[variant],
          styles[size],
          iconOnly && styles.iconOnly,
          isPillShaped && !variant.includes('pill') && styles.pillShaped, // Apply pill shape but not pill styling
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