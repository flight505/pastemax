import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../../utils/cn';
import styles from './Dropdown.module.css';

export interface DropdownOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface DropdownProps {
  /**
   * Array of options to display in the dropdown
   */
  options: DropdownOption[];
  
  /**
   * Currently selected value(s)
   */
  value?: string | string[];
  
  /**
   * Callback when selection changes
   */
  onChange: (value: string | string[]) => void;
  
  /**
   * Optional placeholder text when no option is selected
   */
  placeholder?: string;
  
  /**
   * Whether the dropdown supports multiple selections
   * @default false
   */
  multiple?: boolean;
  
  /**
   * Optional custom trigger element
   */
  trigger?: React.ReactNode;
  
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
   * Optional maximum height for the dropdown menu in pixels
   * @default 300
   */
  maxHeight?: number;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select option',
  multiple = false,
  trigger,
  className,
  menuClassName,
  size = 'md',
  disabled = false,
  maxHeight = 300,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);
  
  const handleSelect = useCallback((option: DropdownOption) => {
    if (!option.disabled) {
      onChange(option.value);
      setIsOpen(false);
    }
  }, [onChange]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const options = Array.from(dropdownRef.current?.querySelectorAll('[role="option"]') || []);
    const currentIndex = options.findIndex(opt => opt === document.activeElement);

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        const nextIndex = currentIndex + 1 < options.length ? currentIndex + 1 : 0;
        (options[nextIndex] as HTMLElement).focus();
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
        (options[prevIndex] as HTMLElement).focus();
        break;
      }
      case 'Enter':
      case 'Space': {
        event.preventDefault();
        const focusedOption = document.activeElement as HTMLDivElement;
        if (focusedOption?.dataset?.value) {
          const option = options.find(opt => opt.value === focusedOption.dataset.value);
          if (option) {
            handleSelect(option);
          }
        }
        break;
      }
      case 'Escape': {
        event.preventDefault();
        setIsOpen(false);
        break;
      }
    }
  }, [handleSelect, options]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);
  
  const getSelectedLabel = () => {
    if (multiple) {
      const selectedCount = Array.isArray(value) ? value.length : 0;
      return selectedCount > 0
        ? `${selectedCount} selected`
        : placeholder;
    }
    
    const selectedOption = options.find(opt => opt.value === value);
    return selectedOption ? selectedOption.label : placeholder;
  };
  
  const isSelected = (optionValue: string) => {
    if (multiple) {
      return Array.isArray(value) && value.includes(optionValue);
    }
    return value === optionValue;
  };
  
  return (
    <div
      ref={dropdownRef}
      className={cn(
        styles.dropdown,
        styles[size],
        disabled && styles.disabled,
        className
      )}
    >
      {trigger ? (
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(styles.trigger, isOpen && styles.active)}
        >
          {trigger}
        </div>
      ) : (
        <button
          type="button"
          className={cn(styles.button, isOpen && styles.active)}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          disabled={disabled}
        >
          <span className={styles.buttonLabel}>{getSelectedLabel()}</span>
          <ChevronDown
            size={16}
            className={cn(styles.chevron, isOpen && styles.chevronOpen)}
          />
        </button>
      )}
      
      {isOpen && (
        <div
          ref={menuRef}
          className={cn(styles.menu, menuClassName)}
          style={{ maxHeight }}
          role="listbox"
          aria-multiselectable={multiple}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={cn(
                styles.option,
                isSelected(option.value) && styles.selected,
                option.disabled && styles.disabled
              )}
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={isSelected(option.value)}
              tabIndex={0}
              data-value={option.value}
            >
              {option.icon && (
                <span className={styles.optionIcon}>{option.icon}</span>
              )}
              <span className={styles.optionLabel}>{option.label}</span>
              {multiple && isSelected(option.value) && (
                <span className={styles.checkmark}>✓</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 