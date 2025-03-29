import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Minus } from 'lucide-react';
import styles from './DropdownMenu.module.css';

// Main types
export interface DropdownMenuOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface DropdownMenuProps {
  /**
   * Options to display in the dropdown menu
   */
  options: DropdownMenuOption[];
  
  /**
   * Currently selected value
   */
  value?: string;
  
  /**
   * Callback when selection changes
   */
  onChange: (value: string) => void;
  
  /**
   * Optional placeholder text when no option is selected
   */
  placeholder?: string;
  
  /**
   * Optional title for the dropdown button (for accessibility)
   */
  title?: string;
  
  /**
   * Optional custom class name for the dropdown container
   */
  className?: string;
  
  /**
   * Optional custom class name for the dropdown menu
   */
  menuClassName?: string;
  
  /**
   * Optional size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Whether the dropdown is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Custom alignment of the dropdown menu
   * @default 'start'
   */
  align?: 'start' | 'center' | 'end';
  
  /**
   * Side to render the dropdown menu
   * @default 'auto'
   */
  side?: 'top' | 'right' | 'bottom' | 'left' | 'auto';
  
  /**
   * Offset from the trigger element
   * @default 5
   */
  sideOffset?: number;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select option',
  title,
  className,
  menuClassName,
  size = 'md',
  disabled = false,
  align = 'start',
  side = 'auto',
  sideOffset = 5
}) => {
  // State
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<React.CSSProperties>({});
  const [dropdownSide, setDropdownSide] = useState<'top' | 'bottom'>('bottom');
  const [isClosing, setIsClosing] = useState(false);
  
  // Refs
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLDivElement>(null);
  
  // Get the label of the selected option
  const getSelectedLabel = () => {
    const selectedOption = options.find(opt => opt.value === value);
    return selectedOption ? selectedOption.label : placeholder;
  };
  
  // Determine the best side for the dropdown based on available space
  const determineDropdownSide = useCallback(() => {
    if (side !== 'auto') return side;
    
    if (!triggerRef.current) return 'bottom';
    
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const menuHeight = menuRef.current?.getBoundingClientRect().height || 200; // Default height estimate
    
    // If there's not enough space below and more space above, flip to top
    if (spaceBelow < menuHeight && spaceAbove > spaceBelow) {
      return 'top';
    }
    
    return 'bottom';
  }, [side]);
  
  // Calculate position of the dropdown menu
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !menuRef.current) return {};
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const menuRect = menuRef.current.getBoundingClientRect();
    
    const { top, left, bottom, right, width, height } = triggerRect;
    const { innerWidth, innerHeight } = window;
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    
    const positionStyles: React.CSSProperties = {};
    const determinedSide = determineDropdownSide();
    setDropdownSide(determinedSide === 'top' ? 'top' : 'bottom');
    
    // Vertical positioning
    if (determinedSide === 'top') {
      positionStyles.bottom = innerHeight - top + sideOffset;
    } else if (determinedSide === 'bottom') {
      positionStyles.top = bottom + scrollY + sideOffset;
    } else if (determinedSide === 'right') {
      positionStyles.left = right + scrollX + sideOffset;
    } else if (determinedSide === 'left') {
      positionStyles.right = innerWidth - left + scrollX + sideOffset;
    }
    
    // Horizontal alignment
    if ((determinedSide === 'top' || determinedSide === 'bottom') && !positionStyles.left && !positionStyles.right) {
      switch (align) {
        case 'start':
          positionStyles.left = left + scrollX;
          break;
        case 'center':
          positionStyles.left = left + scrollX + (width / 2) - (menuRect.width / 2);
          break;
        case 'end':
          positionStyles.left = left + scrollX + width - menuRect.width;
          break;
      }
    }
    
    // Ensure the menu stays within viewport bounds
    if (positionStyles.left !== undefined) {
      const leftPos = positionStyles.left as number;
      positionStyles.left = Math.max(sideOffset, Math.min(leftPos, innerWidth - menuRect.width - sideOffset));
    }
    
    if (positionStyles.top !== undefined) {
      const topPos = positionStyles.top as number;
      positionStyles.top = Math.max(sideOffset, Math.min(topPos, innerHeight - menuRect.height - sideOffset + scrollY));
    }
    
    return positionStyles;
  }, [align, determineDropdownSide, sideOffset]);
  
  // Update position when needed
  const updatePosition = useCallback(() => {
    if (isOpen) {
      setPosition(calculatePosition());
    }
  }, [isOpen, calculatePosition]);
  
  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);
  
  // Handle window resize and scroll
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
      
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }
  }, [isOpen, updatePosition]);
  
  // Update position when opening the dropdown
  useEffect(() => {
    if (isOpen) {
      updatePosition();
      
      // Focus the first non-disabled item
      setTimeout(() => {
        if (firstItemRef.current) {
          firstItemRef.current.focus();
        }
      }, 10);
    }
  }, [isOpen, updatePosition]);
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case 'Escape':
        e.preventDefault();
        closeDropdown();
        break;
      case 'ArrowDown':
        if (isOpen) {
          e.preventDefault();
          focusNextItem();
        } else {
          e.preventDefault();
          setIsOpen(true);
        }
        break;
      case 'ArrowUp':
        if (isOpen) {
          e.preventDefault();
          focusPreviousItem();
        } else {
          e.preventDefault();
          setIsOpen(true);
        }
        break;
    }
  };
  
  // Handle key navigation within the menu
  const handleMenuKeyDown = (e: React.KeyboardEvent, option: DropdownMenuOption) => {
    if (option.disabled) return;
    
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleSelect(option);
        break;
      case 'Escape':
        e.preventDefault();
        closeDropdown();
        triggerRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        focusNextItem();
        break;
      case 'ArrowUp':
        e.preventDefault();
        focusPreviousItem();
        break;
      case 'Tab':
        // Do not prevent default to allow regular tabbing behavior
        setIsOpen(false);
        break;
    }
  };
  
  // Focus the next menu item
  const focusNextItem = () => {
    const menuItems = menuRef.current?.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])');
    if (!menuItems || menuItems.length === 0) return;
    
    const currentIndex = Array.from(menuItems).findIndex(
      item => item === document.activeElement
    );
    
    const nextIndex = currentIndex + 1 < menuItems.length ? currentIndex + 1 : 0;
    (menuItems[nextIndex] as HTMLElement).focus();
  };
  
  // Focus the previous menu item
  const focusPreviousItem = () => {
    const menuItems = menuRef.current?.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])');
    if (!menuItems || menuItems.length === 0) return;
    
    const currentIndex = Array.from(menuItems).findIndex(
      item => item === document.activeElement
    );
    
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
    (menuItems[prevIndex] as HTMLElement).focus();
  };
  
  // Handle option selection
  const handleSelect = (option: DropdownMenuOption) => {
    if (option.disabled) return;
    
    onChange(option.value);
    closeDropdown();
    triggerRef.current?.focus();
  };
  
  // Toggle the dropdown
  const toggleDropdown = () => {
    if (!disabled) {
      if (isOpen) {
        closeDropdown();
      } else {
        setIsOpen(true);
      }
    }
  };

  // Handle closing with animation
  const closeDropdown = () => {
    if (!isOpen) return;
    
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 150); // Match this duration to CSS animation time
  };
  
  return (
    <div className={`${styles.dropdownMenu} ${className || ''}`}>
      <button
        ref={triggerRef}
        className={`${styles.dropdownTrigger} ${isOpen ? styles.dropdownTriggerOpen : ''} ${size ? styles[size] : ''}`}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={title}
        disabled={disabled}
        type="button"
      >
        <span className={styles.buttonLabel}>{getSelectedLabel()}</span>
        <Plus 
          size={16} 
          className={`${styles.accordionIcon} ${isOpen ? styles.rotated : ''}`} 
          aria-hidden="true" 
        />
      </button>
      
      {(isOpen || isClosing) && createPortal(
        <div 
          ref={menuRef}
          className={`${styles.dropdownContent} ${isClosing ? styles.closing : ''} ${menuClassName || ''}`}
          style={{
            ...position,
            width: triggerRef.current ? `${triggerRef.current.offsetWidth}px` : undefined
          }}
          role="listbox"
          aria-orientation="vertical"
          data-side={dropdownSide}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isFirstNonDisabled = !option.disabled && options.findIndex(o => !o.disabled) === index;
            
            return (
              <div
                key={option.value}
                ref={isFirstNonDisabled ? firstItemRef : undefined}
                className={`${styles.dropdownItem} ${option.disabled ? styles.disabled : ''}`}
                onClick={() => handleSelect(option)}
                onKeyDown={(e) => handleMenuKeyDown(e, option)}
                role="menuitem"
                aria-selected={isSelected}
                aria-disabled={option.disabled}
                tabIndex={option.disabled ? -1 : 0}
                data-value={option.value}
              >
                {option.icon && (
                  <span className={styles.itemIcon}>{option.icon}</span>
                )}
                <span className={styles.itemText}>{option.label}</span>
              </div>
            );
          })}
        </div>,
        document.body
      )}
    </div>
  );
};

