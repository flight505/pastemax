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
}) => {
  // Map category to Lucide component icons
  const getIconForCategory = (category: TemplateCategory) => {
    switch (category) {
      case 'Code Review':
        return <BookText size={16} className={styles.itemIcon} aria-hidden="true" />;
      case 'Documentation Generation':
        return <FileText size={16} className={styles.itemIcon} aria-hidden="true" />;
      case 'Analysis and Improvement':
        return <BarChart size={16} className={styles.itemIcon} aria-hidden="true" />;
      case 'Testing':
        return <TestTube size={16} className={styles.itemIcon} aria-hidden="true" />;
      case 'Code Quality':
        return <CheckCircle size={16} className={styles.itemIcon} aria-hidden="true" />;
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
      className={className}
      menuClassName={menuClassName}
      size={size}
      disabled={disabled}
      align="start"
      side="bottom"
      sideOffset={5}
    />
  );
}; 