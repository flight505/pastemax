import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './Card.module.css';

// Card component types
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the card is selected
   */
  selected?: boolean;
  
  /**
   * Makes the card interactive (clickable)
   */
  interactive?: boolean;
}

/**
 * Card component container
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, selected = false, interactive = false, ...props }, ref) => {
    return (
      <div
        className={cn(
          styles.card,
          selected && styles.cardSelected,
          interactive && styles.cardInteractive,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

// Card Header types
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Card header section
 */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(styles.cardHeader, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

CardHeader.displayName = 'CardHeader';

// Card Title types
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

/**
 * Card title element
 */
export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        className={cn(styles.cardTitle, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

CardTitle.displayName = 'CardTitle';

// Card Description types
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * Card description element
 */
export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        className={cn(styles.cardDescription, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

CardDescription.displayName = 'CardDescription';

// Card Content types
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Card content section
 */
export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(styles.cardContent, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

CardContent.displayName = 'CardContent';

// Card Footer types
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Card footer section
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(styles.cardFooter, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

CardFooter.displayName = 'CardFooter'; 