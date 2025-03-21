import React, { useEffect, useRef, useState } from 'react';
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
  
  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          setIsOpen(false);
          break;
        case 'ArrowDown':
          e.preventDefault();
          focusNextOption();
          break;
        case 'ArrowUp':
          e.preventDefault();
          focusPreviousOption();
          break;
        case 'Enter':
          e.preventDefault();
          const focusedOption = document.activeElement as HTMLDivElement;
          if (focusedOption?.dataset?.value) {
            handleSelect(focusedOption.dataset.value);
          }
          break;
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);
  
  const focusNextOption = () => {
    const options = menuRef.current?.querySelectorAll('[role="option"]');
    if (!options?.length) return;
    
    const currentIndex = Array.from(options).findIndex(
      opt => opt === document.activeElement
    );
    const nextIndex = currentIndex + 1 < options.length ? currentIndex + 1 : 0;
    (options[nextIndex] as HTMLElement).focus();
  };
  
  const focusPreviousOption = () => {
    const options = menuRef.current?.querySelectorAll('[role="option"]');
    if (!options?.length) return;
    
    const currentIndex = Array.from(options).findIndex(
      opt => opt === document.activeElement
    );
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
    (options[prevIndex] as HTMLElement).focus();
  };
  
  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue];
      onChange(newValues);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };
  
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
              onClick={() => !option.disabled && handleSelect(option.value)}
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