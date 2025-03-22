import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '../Button';
import { cn } from '../../../utils/cn';
import styles from './Dialog.module.css';

export interface DialogProps {
  /**
   * Whether the dialog is open
   */
  isOpen: boolean;
  
  /**
   * Callback when the dialog should close
   */
  onClose: () => void;
  
  /**
   * Dialog title
   */
  title: string;
  
  /**
   * Optional description text below the title
   */
  description?: string;
  
  /**
   * Dialog content
   */
  children: React.ReactNode;
  
  /**
   * Optional footer content (usually action buttons)
   */
  footer?: React.ReactNode;
  
  /**
   * Optional size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Optional custom class name
   */
  className?: string;
}

/**
 * Dialog component for modal interactions
 * Handles focus trapping, keyboard interactions, and animations
 */
export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  className,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  
  // Handle ESC key to close dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  
  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);
  
  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className={styles.backdrop}>
      <div 
        ref={dialogRef}
        className={cn(
          styles.dialog,
          styles[size],
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <div className={styles.header}>
          <h2 id="dialog-title" className={styles.title}>{title}</h2>
          <Button 
            variant="ghost"
            size="sm"
            iconOnly
            onClick={onClose}
            startIcon={<X size={16} />}
            title="Close dialog"
          />
        </div>
        
        {description && (
          <div className={styles.description}>
            {description}
          </div>
        )}
        
        <div className={styles.content}>
          {children}
        </div>
        
        {footer && (
          <div className={styles.footer}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}; 