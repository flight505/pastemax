# PasteMax UI Implementation Guide

This document provides detailed implementation instructions for our shadcn/ui-inspired component system.

## Getting Started

### Required Dependencies

We'll need to add these packages:

```bash
# Core libraries for styling and variants
npm install clsx tailwind-merge class-variance-authority
```

### Directory Structure Setup

```
src/
  components/
    ui/           # Base components (new)
      Button/
      Card/
      Input/
      Switch/
      Toggle/
      Dropdown/
    [existing components]  # Will gradually migrate
```

## Component Implementation Process

### 1. Set Up Core Utilities

#### Create Class Name Utility

Create `src/utils/cn.ts`:

```typescript
import { clsx, type ClassValue } from 'clsx';

/**
 * Combines multiple class names into a single string.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
```

#### Create Variant Utility

Create `src/utils/create-variants.ts`:

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Re-export cva for creating component variants
 */
export { cva };
export type { VariantProps };
```

### 2. Implement Core Components

#### Button Component

1. Create `src/components/ui/Button/Button.module.css`:

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  font-size: 14px;
  padding: 8px 16px;
  gap: 8px;
  white-space: nowrap;
}

.button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--ring-color);
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Variants */
.primary {
  background-color: var(--primary-button-background);
  color: var(--primary-button-text);
  border: 1px solid var(--primary-button-background);
}

.primary:hover:not(:disabled) {
  opacity: 0.9;
}

.secondary {
  background-color: var(--background-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.secondary:hover:not(:disabled) {
  background-color: var(--hover-color);
}

.ghost {
  background-color: transparent;
  color: var(--text-primary);
  border: 1px solid transparent;
}

.ghost:hover:not(:disabled) {
  background-color: var(--hover-color);
}

.destructive {
  background-color: var(--error-color);
  color: white;
  border: 1px solid var(--error-color);
}

.destructive:hover:not(:disabled) {
  opacity: 0.9;
}

/* Sizes */
.sm {
  font-size: 12px;
  padding: 4px 12px;
  height: 30px;
}

.md {
  font-size: 14px;
  padding: 8px 16px;
  height: 38px;
}

.lg {
  font-size: 16px;
  padding: 10px 20px;
  height: 44px;
}
```

2. Create `src/components/ui/Button/Button.tsx`:

```typescript
import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button visual variant
   * @default 'primary'
   */
  variant?: ButtonVariant;
  
  /**
   * Button size
   * @default 'md'
   */
  size?: ButtonSize;
  
  /**
   * Optional icon to display before the button text
   */
  startIcon?: React.ReactNode;
  
  /**
   * Optional icon to display after the button text
   */
  endIcon?: React.ReactNode;
  
  /**
   * Button children
   */
  children?: React.ReactNode;
}

/**
 * Primary UI component for user interaction
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      startIcon,
      endIcon,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          styles.button,
          styles[variant],
          styles[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {startIcon && <span className="button-start-icon">{startIcon}</span>}
        {children}
        {endIcon && <span className="button-end-icon">{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

3. Create `src/components/ui/Button/index.ts`:

```typescript
export * from './Button';
```

#### Input Component

1. Create `src/components/ui/Input/Input.module.css`:

```css
.input {
  display: flex;
  width: 100%;
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  background-color: var(--background-primary);
  color: var(--text-primary);
  font-size: 14px;
  padding: 8px 12px;
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 1px var(--accent-color);
}

.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.input-wrapper {
  position: relative;
  display: flex;
  width: 100%;
}

.with-icon-left {
  padding-left: 36px;
}

.with-icon-right {
  padding-right: 36px;
}

.icon-left,
.icon-right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-left {
  left: 12px;
}

.icon-right {
  right: 12px;
}

/* Validation states */
.error {
  border-color: var(--error-color);
}

.error:focus {
  box-shadow: 0 0 0 1px var(--error-color);
}
```

2. Create `src/components/ui/Input/Input.tsx`:

```typescript
import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Show error styling
   */
  error?: boolean;
  
  /**
   * Icon to display at the start of the input
   */
  startIcon?: React.ReactNode;
  
  /**
   * Icon to display at the end of the input
   */
  endIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, startIcon, endIcon, ...props }, ref) => {
    return (
      <div className={styles['input-wrapper']}>
        {startIcon && (
          <div className={styles['icon-left']}>{startIcon}</div>
        )}
        <input
          className={cn(
            styles.input,
            error && styles.error,
            startIcon && styles['with-icon-left'],
            endIcon && styles['with-icon-right'],
            className
          )}
          ref={ref}
          {...props}
        />
        {endIcon && (
          <div className={styles['icon-right']}>{endIcon}</div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

3. Create `src/components/ui/Input/index.ts`:

```typescript
export * from './Input';
```

#### Similar process for other components:
- Switch
- Card
- Dropdown
- Toggle

### 3. Migrate Existing Components

Start with key components mentioned in the requirements:

1. Update CopyButton to use new Button component
2. Update SearchBar to use new Input component
3. Adjust User Instructions component
4. Create new Download button next to Copy All Selected

## Testing Component System

For each component:
1. Test in both light and dark mode
2. Verify focus states and keyboard navigation
3. Check responsive behavior
4. Ensure transitions are smooth

## Documentation Approach

1. Document each component with:
   - Available props
   - Variants/options
   - Example usage
   - Accessibility considerations

2. Add inline comments for complex logic

## Updating Application Components

We'll gradually migrate application components to use our new UI system while preserving functionality. This incremental approach ensures we can test each component thoroughly before moving to the next.

## Recommended Implementation Order

1. Core utilities
2. Button (highest priority)
3. Input and Search
4. Switch/Toggle
5. Card styling
6. Dropdown components
7. Existing app components migration 