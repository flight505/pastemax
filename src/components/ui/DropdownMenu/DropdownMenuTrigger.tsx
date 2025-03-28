import React, { useRef, useEffect } from 'react';
import { DropdownMenuTriggerProps } from './types';
import { useDropdownMenu } from './context';
import styles from './DropdownMenu.module.css';

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({ 
  children, 
  className 
}) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { state, dispatch } = useDropdownMenu();

  useEffect(() => {
    if (triggerRef.current) {
      dispatch({ 
        type: 'SET_TRIGGER_RECT', 
        rect: triggerRef.current.getBoundingClientRect() 
      });
    }
  }, [dispatch]);

  const handleClick = () => {
    if (state.isOpen) {
      dispatch({ type: 'CLOSE' });
    } else {
      dispatch({ type: 'OPEN' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        dispatch({ type: 'OPEN' });
        break;
      case 'Escape':
        e.preventDefault();
        dispatch({ type: 'CLOSE' });
        break;
    }
  };

  return (
    <button
      ref={triggerRef}
      className={`${styles.dropdownTrigger} ${className || ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-haspopup="true"
      aria-expanded={state.isOpen}
      type="button"
    >
      {children}
    </button>
  );
}; 