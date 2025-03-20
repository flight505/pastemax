import React from 'react';
import { Button } from '../Button';
import styles from './ButtonGroup.module.css';

interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className = '',
  variant = 'horizontal',
  size = 'md'
}) => {
  // Apply the buttonGroup class and any additional className
  const groupClassName = `${styles.buttonGroup} ${styles[variant]} ${styles[size]} ${className}`;

  // Apply styling to children to connect them
  const childrenWithProps = React.Children.map(children, (child, index) => {
    // Skip non-Button children
    if (!React.isValidElement(child) || (child.type as any) !== Button) {
      console.warn("ButtonGroup should only contain Button components.");
      return child;
    }

    const isFirst = index === 0;
    const isLast = index === React.Children.count(children) - 1;

    // Calculate the position classes
    let positionClass = '';
    if (variant === 'horizontal') {
      if (isFirst) positionClass = styles.first;
      else if (isLast) positionClass = styles.last;
      else positionClass = styles.middle;
    } else { // vertical
      if (isFirst) positionClass = styles.top;
      else if (isLast) positionClass = styles.bottom;
      else positionClass = styles.center;
    }

    // Clone the child with additional className
    const childClassName = child.props.className || '';
    return React.cloneElement(child, {
      ...child.props,
      className: `${childClassName} ${positionClass}`,
      size: child.props.size || size, // Pass down size if not specified
    });
  });

  return (
    <div className={groupClassName}>
      {childrenWithProps}
    </div>
  );
};

ButtonGroup.displayName = 'ButtonGroup';

export { ButtonGroup }; 