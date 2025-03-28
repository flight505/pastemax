import React from 'react';
import { DropdownMenuItemProps } from './types';
import { useDropdownMenu } from './context';
import styles from './DropdownMenu.module.css';

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  children,
  className,
  disabled,
  onSelect,
  icon
}) => {
  const { dispatch } = useDropdownMenu();

  const handleClick = () => {
    if (disabled) return;
    onSelect?.();
    dispatch({ type: 'CLOSE' });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        onSelect?.();
        dispatch({ type: 'CLOSE' });
        break;
    }
  };

  return (
    <div
      className={`${styles.dropdownItem} ${disabled ? styles.disabled : ''} ${className || ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      {icon && <span className={styles.itemIcon}>{icon}</span>}
      {children}
    </div>
  );
}; 