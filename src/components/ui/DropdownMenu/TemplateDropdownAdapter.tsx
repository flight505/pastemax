import React from 'react';
import { 
  BookText, 
  FileText, 
  BarChart, 
  TestTube, 
  CheckCircle 
} from 'lucide-react';
import { DropdownMenu } from './DropdownMenu';
import { TemplateCategory } from '../../../constants/promptTemplates';
import styles from './DropdownMenu.module.css';

// Match the interface needed for the templateSelector
interface TemplateDropdownAdapterProps {
  options: {
    value: string;
    label: string;
    description?: string;
    category: TemplateCategory;
    icon?: string;
    disabled?: boolean;
  }[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  title?: string;
  className?: string;
  menuClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left' | 'auto';
  sideOffset?: number;
}

export const TemplateDropdownAdapter: React.FC<TemplateDropdownAdapterProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select template',
  title,
  className,
  menuClassName,
  size = 'md',
  disabled = false,
  align = 'start',
  side = 'bottom',
  sideOffset = 5,
}) => {
  // Map category to Lucide component icons with enhanced visibility
  const getIconForCategory = (category: TemplateCategory) => {
    const iconProps = {
      size: 18,
      className: `${styles.itemIcon} ${styles.categoryIcon}`,
      strokeWidth: 2,
      'aria-hidden': true,
    };
    
    switch (category) {
      case 'Code Review':
        return <BookText {...iconProps} />;
      case 'Documentation Generation':
        return <FileText {...iconProps} />;
      case 'Analysis and Improvement':
        return <BarChart {...iconProps} />;
      case 'Testing':
        return <TestTube {...iconProps} />;
      case 'Code Quality':
        return <CheckCircle {...iconProps} />;
      default:
        return null;
    }
  };

  // Convert options to the format expected by DropdownMenu
  const dropdownOptions = options.map(option => ({
    value: option.value,
    label: option.label,
    description: option.description,
    icon: getIconForCategory(option.category),
    disabled: option.disabled,
  }));

  return (
    <DropdownMenu
      options={dropdownOptions}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      title={title}
      className={`${styles.templateDropdown} ${className || ''}`}
      menuClassName={`${styles.templateDropdownMenu} ${menuClassName || ''}`}
      size={size}
      disabled={disabled}
      align={align}
      side={side}
      sideOffset={sideOffset}
    />
  );
}; 