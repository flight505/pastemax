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
  const backdropRef = useRef<HTMLDivElement>(null); // Ref for the backdrop

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

  // Handle click outside (on backdrop) to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Only close if clicking directly on the backdrop
      if (backdropRef.current === e.target) {
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
      // Focus the dialog container or first focusable element on open
      dialogRef.current?.focus();
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef} // Add ref to backdrop
      className={styles.backdrop}
      role="presentation" // Backdrop is presentational
    >
      <div
        ref={dialogRef}
        className={cn(
          styles.dialog, // Use .dialog for the main container
          styles[size],
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        tabIndex={-1} // Make the dialog focusable
      >
        <div className={styles.header}>
          <h2 id="dialog-title" className={styles.title}>{title}</h2>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            onClick={onClose}
            startIcon={<X size={16} />} // Correctly uses Button component
            title="Close dialog"
            aria-label="Close dialog" // Add aria-label
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