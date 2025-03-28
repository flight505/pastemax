import React from 'react';
import { FileText, FileCode, Code } from 'lucide-react';
import { DropdownMenu } from './DropdownMenu';
import styles from './DropdownMenu.module.css';

// Match the interface of the original Dropdown component
interface DropdownAdapterProps {
  options: {
    value: string;
    label: string;
    description?: string;
    icon?: string;
    disabled?: boolean;
  }[];
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  multiple?: boolean;
  title?: string;
  className?: string;
  menuClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  side?: 'top' | 'bottom' | 'auto';
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
}

export const DropdownAdapter: React.FC<DropdownAdapterProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select option',
  title,
  className,
  menuClassName,
  size = 'md',
  disabled = false,
  side = 'auto',
  sideOffset = 5,
  align = 'start',
}) => {
  // Map option icons to Lucide components
  const getIconForOption = (option: { value: string; icon?: string }) => {
    switch (option.value) {
      case 'xml':
        return <Code size={16} className={styles.itemIcon} aria-hidden="true" />;
      case 'markdown':
        return <FileCode size={16} className={styles.itemIcon} aria-hidden="true" />;
      case 'plain':
        return <FileText size={16} className={styles.itemIcon} aria-hidden="true" />;
      default:
        return null;
    }
  };

  // Convert options to the format expected by the new DropdownMenu
  const dropdownOptions = options.map(option => ({
    value: option.value,
    label: option.label,
    icon: getIconForOption(option),
    disabled: option.disabled,
  }));

  return (
    <DropdownMenu
      options={dropdownOptions}
      value={value as string}
      onChange={(val) => onChange(val)}
      placeholder={placeholder}
      title={title}
      className={className}
      menuClassName={menuClassName}
      size={size}
      disabled={disabled}
      align={align}
      side={side}
      sideOffset={sideOffset}
    />
  );
}; 