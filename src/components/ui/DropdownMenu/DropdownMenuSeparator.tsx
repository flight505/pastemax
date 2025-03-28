import React from 'react';
import { DropdownMenuSeparatorProps } from './types';
import styles from './DropdownMenu.module.css';

export const DropdownMenuSeparator: React.FC<DropdownMenuSeparatorProps> = ({
  className
}) => {
  return (
    <div 
      className={`${styles.dropdownSeparator} ${className || ''}`}
      role="separator"
    />
  );
}; 