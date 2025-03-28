import React from 'react';
import { Dialog } from './Dialog'; // Use the updated Dialog
import { Button } from './Button';
import styles from './Dialog/Dialog.module.css'; // Can use styles if needed, but footer handles centering

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'destructive'; // Semantic variant for the dialog itself
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default' // This prop influences the overall dialog but not buttons directly here
}: ConfirmationDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose(); // Typically close after confirm
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      size="sm" // Keep it small for confirmations
      footer={ // Pass buttons as the footer content
        <>
          <Button
            variant="ghost" // Standard cancel button
            size="sm"
            onClick={onClose}
          >
            {cancelLabel}
          </Button>
          <Button
            variant="primary" // Standard confirm button (not destructive red)
            size="sm"
            onClick={handleConfirm}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      {/* No children needed if description covers the content */}
      {/* If there was more complex content, it would go here */}
      <div style={{ minHeight: '20px' }}></div> {/* Add some minimal height if description is short */}
    </Dialog>
  );
}