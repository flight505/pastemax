import React from 'react';
import { Dialog } from './Dialog'; // Use the updated Dialog
import { Button } from './Button';

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

  // Determine the button variant based on the dialog variant
  const buttonVariant = variant === 'destructive' ? 'destructive' : 'primary';

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
            variant={buttonVariant} // Use destructive or primary variant based on dialog variant
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