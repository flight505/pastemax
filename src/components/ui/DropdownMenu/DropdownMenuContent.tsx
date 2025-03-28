import React, { useRef, useEffect } from 'react';
import { DropdownMenuContentProps } from './types';
import { useDropdownMenu } from './context';
import { createPortal } from 'react-dom';
import styles from './DropdownMenu.module.css';

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({
  children,
  className,
  sideOffset = 4,
  align = 'start',
  side = 'bottom'
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useDropdownMenu();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        dispatch({ type: 'CLOSE' });
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch({ type: 'CLOSE' });
      }
    };

    if (state.isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [state.isOpen, dispatch]);

  if (!state.isOpen || !state.triggerRect) return null;

  const getPosition = () => {
    if (!state.triggerRect || !contentRef.current) return {};
    
    const contentRect = contentRef.current.getBoundingClientRect();
    const { top, left, bottom, width } = state.triggerRect;
    
    let positionStyles: React.CSSProperties = {};
    
    switch (side) {
      case 'bottom':
        positionStyles.top = bottom + sideOffset;
        break;
      case 'top':
        positionStyles.bottom = window.innerHeight - top + sideOffset;
        break;
      case 'right':
        positionStyles.left = left + width + sideOffset;
        break;
      case 'left':
        positionStyles.right = window.innerWidth - left + sideOffset;
        break;
    }

    switch (align) {
      case 'start':
        positionStyles.left = left;
        break;
      case 'center':
        positionStyles.left = left + (width / 2) - (contentRect.width / 2);
        break;
      case 'end':
        positionStyles.left = left + width - contentRect.width;
        break;
    }

    return positionStyles;
  };

  return createPortal(
    <div
      ref={contentRef}
      className={`${styles.dropdownContent} ${className || ''}`}
      style={getPosition()}
      role="menu"
      aria-orientation="vertical"
    >
      {children}
    </div>,
    document.body
  );
}; 