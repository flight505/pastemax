import React, { useRef, useEffect } from 'react';
import { DropdownMenuProps } from './types';
import { DropdownMenuProvider } from './context';
import styles from './DropdownMenu.module.css';

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, className }) => {
  return (
    <DropdownMenuProvider>
      <div className={`${styles.dropdownMenu} ${className || ''}`}>
        {children}
      </div>
    </DropdownMenuProvider>
  );
};

export * from './DropdownMenuTrigger';
export * from './DropdownMenuContent';
export * from './DropdownMenuItem';
export * from './DropdownMenuSeparator';
export * from './DropdownMenuGroup';
export * from './DropdownMenuLabel'; 