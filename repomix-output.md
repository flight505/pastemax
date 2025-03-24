This file is a merged representation of a subset of the codebase, containing specifically included files and files not matching ignore patterns, combined into a single document by Repomix.
The content has been processed where line numbers have been added.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: src/, preload.js, main.js
- Files matching these patterns are excluded: src/__tests__/utils/**, **/*.md, docs/**, scripts/**, node_modules/**, dist/**, .git/**, **/*.log, **/*.lock, **/*.svg
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Line numbers have been added to the beginning of each line
- Files are sorted by Git change count (files with more changes are at the bottom)

## Additional Info

# Directory Structure
```
src/
  __tests__/
    setup.ts
  components/
    ui/
      Button/
        Button.module.css
        Button.tsx
        index.ts
      ButtonGroup/
        ButtonGroup.module.css
        ButtonGroup.tsx
        index.ts
      Card/
        Card.module.css
        Card.tsx
        index.ts
      Dialog/
        Dialog.module.css
        Dialog.tsx
        index.ts
      Dropdown/
        Dropdown.module.css
        Dropdown.tsx
        DropdownDemo.tsx
        index.ts
      Input/
        index.ts
        Input.module.css
        Input.tsx
      Switch/
        index.ts
        Switch.module.css
        Switch.tsx
      ConfirmationDialog.tsx
      index.ts
    ControlContainer.module.css
    ControlContainer.tsx
    FileCard.module.css
    FileCard.tsx
    FileList.module.css
    FileList.tsx
    FileTreeHeader.module.css
    FileTreeHeader.tsx
    IgnorePatterns.module.css
    IgnorePatterns.tsx
    SearchBar.module.css
    SearchBar.tsx
    Sidebar.module.css
    Sidebar.module.css.d.ts
    Sidebar.tsx
    ThemeToggle.module.css
    ThemeToggle.tsx
    TreeItem.module.css
    TreeItem.tsx
    UserInstructions.module.css
    UserInstructions.tsx
  constants/
    theme.ts
  context/
    ThemeContext.tsx
    ThemeContextType.ts
  hooks/
    useTheme.ts
  styles/
    globals.css
    index.css
  types/
    css.d.ts
    electron.d.ts
    FileTypes.ts
    index.ts
  utils/
    cn.ts
    create-variants.ts
    pathUtils.ts
  App.module.css
  App.tsx
  declarations.d.ts
  main.tsx
  react-app-env.d.ts
```

# Files

## File: src/main.tsx
```typescript
 1: import React from "react";
 2: import ReactDOM from "react-dom/client";
 3: import App from "./App";
 4: import "./styles/index.css";
 5: 
 6: ReactDOM.createRoot(document.getElementById("root")!).render(
 7:   <React.StrictMode>
 8:     <App />
 9:   </React.StrictMode>,
10: );
```

## File: src/__tests__/setup.ts
```typescript
 1: import '@testing-library/jest-dom';
 2: import { TextEncoder, TextDecoder } from 'util';
 3: 
 4: global.TextEncoder = TextEncoder;
 5: global.TextDecoder = TextDecoder as any;
 6: 
 7: // Mock window.matchMedia
 8: Object.defineProperty(window, 'matchMedia', {
 9:   writable: true,
10:   value: jest.fn().mockImplementation(query => ({
11:     matches: false,
12:     media: query,
13:     onchange: null,
14:     addListener: jest.fn(),
15:     removeListener: jest.fn(),
16:     addEventListener: jest.fn(),
17:     removeEventListener: jest.fn(),
18:     dispatchEvent: jest.fn(),
19:   })),
20: });
21: 
22: // Mock ResizeObserver
23: global.ResizeObserver = class ResizeObserver {
24:   observe = jest.fn();
25:   unobserve = jest.fn();
26:   disconnect = jest.fn();
27: };
28: 
29: // Mock IntersectionObserver
30: global.IntersectionObserver = jest.fn().mockImplementation(() => ({
31:   root: null,
32:   rootMargin: '',
33:   thresholds: [],
34:   disconnect: jest.fn(),
35:   observe: jest.fn(),
36:   takeRecords: jest.fn(),
37:   unobserve: jest.fn(),
38: }));
```

## File: src/components/ui/ButtonGroup/ButtonGroup.module.css
```css
 1: .buttonGroup {
 2:   display: flex;
 3:   align-items: center;
 4: }
 5: 
 6: /* Horizontal variant - default */
 7: .horizontal {
 8:   display: flex;
 9:   flex-direction: row;
10: }
11: 
12: /* Vertical variant */
13: .vertical {
14:   display: flex;
15:   flex-direction: column;
16: }
17: 
18: /* Position-based styles for horizontal variant */
19: .first {
20:   border-top-right-radius: 0;
21:   border-bottom-right-radius: 0;
22:   border-right: none;
23: }
24: 
25: .middle {
26:   border-radius: 0;
27:   border-right: none;
28: }
29: 
30: .last {
31:   border-top-left-radius: 0;
32:   border-bottom-left-radius: 0;
33:   border-left: 1px solid var(--border-color);
34: }
35: 
36: /* Position-based styles for vertical variant */
37: .top {
38:   border-bottom-left-radius: 0;
39:   border-bottom-right-radius: 0;
40:   border-bottom: none;
41: }
42: 
43: .center {
44:   border-radius: 0;
45:   border-bottom: none;
46: }
47: 
48: .bottom {
49:   border-top-left-radius: 0;
50:   border-top-right-radius: 0;
51:   border-top: 1px solid var(--border-color);
52: }
53: 
54: /* Handle hover and active states - ensure proper z-index */
55: .buttonGroup button:hover:not(:disabled) {
56:   z-index: 1;
57: }
58: 
59: .buttonGroup button:active:not(:disabled) {
60:   z-index: 2;
61: }
62: 
63: /* Sizes */
64: .sm {
65:   gap: 0;
66: }
67: 
68: .md {
69:   gap: 0;
70: }
71: 
72: .lg {
73:   gap: 0;
74: }
```

## File: src/components/ui/ButtonGroup/ButtonGroup.tsx
```typescript
 1: import React from 'react';
 2: import { Button } from '../Button';
 3: import styles from './ButtonGroup.module.css';
 4: 
 5: interface ButtonGroupProps {
 6:   children: React.ReactNode;
 7:   className?: string;
 8:   variant?: 'horizontal' | 'vertical';
 9:   size?: 'sm' | 'md' | 'lg';
10: }
11: 
12: const ButtonGroup: React.FC<ButtonGroupProps> = ({
13:   children,
14:   className = '',
15:   variant = 'horizontal',
16:   size = 'md'
17: }) => {
18:   // Apply the buttonGroup class and any additional className
19:   const groupClassName = `${styles.buttonGroup} ${styles[variant]} ${styles[size]} ${className}`;
20: 
21:   // Apply styling to children to connect them
22:   const childrenWithProps = React.Children.map(children, (child, index) => {
23:     // Skip non-Button children
24:     if (!React.isValidElement(child) || (child.type as any) !== Button) {
25:       console.warn("ButtonGroup should only contain Button components.");
26:       return child;
27:     }
28: 
29:     const isFirst = index === 0;
30:     const isLast = index === React.Children.count(children) - 1;
31: 
32:     // Calculate the position classes
33:     let positionClass = '';
34:     if (variant === 'horizontal') {
35:       if (isFirst) positionClass = styles.first;
36:       else if (isLast) positionClass = styles.last;
37:       else positionClass = styles.middle;
38:     } else { // vertical
39:       if (isFirst) positionClass = styles.top;
40:       else if (isLast) positionClass = styles.bottom;
41:       else positionClass = styles.center;
42:     }
43: 
44:     // Clone the child with additional className
45:     const childClassName = child.props.className || '';
46:     return React.cloneElement(child, {
47:       ...child.props,
48:       className: `${childClassName} ${positionClass}`,
49:       size: child.props.size || size, // Pass down size if not specified
50:     });
51:   });
52: 
53:   return (
54:     <div className={groupClassName}>
55:       {childrenWithProps}
56:     </div>
57:   );
58: };
59: 
60: ButtonGroup.displayName = 'ButtonGroup';
61: 
62: export { ButtonGroup };
```

## File: src/components/ui/ButtonGroup/index.ts
```typescript
1: export { ButtonGroup } from './ButtonGroup';
```

## File: src/components/ui/Card/Card.tsx
```typescript
  1: import React from 'react';
  2: import { cn } from '../../../utils/cn';
  3: import styles from './Card.module.css';
  4: 
  5: // Card component types
  6: export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  7:   /**
  8:    * Whether the card is selected
  9:    */
 10:   selected?: boolean;
 11:   
 12:   /**
 13:    * Makes the card interactive (clickable)
 14:    */
 15:   interactive?: boolean;
 16: }
 17: 
 18: /**
 19:  * Card component container
 20:  */
 21: export const Card = React.forwardRef<HTMLDivElement, CardProps>(
 22:   ({ className, selected = false, interactive = false, ...props }, ref) => {
 23:     return (
 24:       <div
 25:         className={cn(
 26:           styles.card,
 27:           selected && styles.cardSelected,
 28:           interactive && styles.cardInteractive,
 29:           className
 30:         )}
 31:         ref={ref}
 32:         {...props}
 33:       />
 34:     );
 35:   }
 36: );
 37: 
 38: Card.displayName = 'Card';
 39: 
 40: // Card Header types
 41: export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
 42: 
 43: /**
 44:  * Card header section
 45:  */
 46: export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
 47:   ({ className, ...props }, ref) => {
 48:     return (
 49:       <div
 50:         className={cn(styles.cardHeader, className)}
 51:         ref={ref}
 52:         {...props}
 53:       />
 54:     );
 55:   }
 56: );
 57: 
 58: CardHeader.displayName = 'CardHeader';
 59: 
 60: // Card Title types
 61: export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
 62: 
 63: /**
 64:  * Card title element
 65:  */
 66: export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
 67:   ({ className, ...props }, ref) => {
 68:     return (
 69:       <h3
 70:         className={cn(styles.cardTitle, className)}
 71:         ref={ref}
 72:         {...props}
 73:       />
 74:     );
 75:   }
 76: );
 77: 
 78: CardTitle.displayName = 'CardTitle';
 79: 
 80: // Card Description types
 81: export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
 82: 
 83: /**
 84:  * Card description element
 85:  */
 86: export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
 87:   ({ className, ...props }, ref) => {
 88:     return (
 89:       <p
 90:         className={cn(styles.cardDescription, className)}
 91:         ref={ref}
 92:         {...props}
 93:       />
 94:     );
 95:   }
 96: );
 97: 
 98: CardDescription.displayName = 'CardDescription';
 99: 
100: // Card Content types
101: export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
102: 
103: /**
104:  * Card content section
105:  */
106: export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
107:   ({ className, ...props }, ref) => {
108:     return (
109:       <div
110:         className={cn(styles.cardContent, className)}
111:         ref={ref}
112:         {...props}
113:       />
114:     );
115:   }
116: );
117: 
118: CardContent.displayName = 'CardContent';
119: 
120: // Card Footer types
121: export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
122: 
123: /**
124:  * Card footer section
125:  */
126: export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
127:   ({ className, ...props }, ref) => {
128:     return (
129:       <div
130:         className={cn(styles.cardFooter, className)}
131:         ref={ref}
132:         {...props}
133:       />
134:     );
135:   }
136: );
137: 
138: CardFooter.displayName = 'CardFooter';
```

## File: src/components/ui/Card/index.ts
```typescript
1: export * from './Card';
```

## File: src/components/ui/Dialog/Dialog.module.css
```css
  1: .backdrop {
  2:   position: fixed;
  3:   top: 0;
  4:   left: 0;
  5:   right: 0;
  6:   bottom: 0;
  7:   background-color: hsl(var(--background) / 0.8);
  8:   display: flex;
  9:   justify-content: center;
 10:   align-items: center;
 11:   z-index: var(--z-index-modal, 50);
 12:   backdrop-filter: blur(4px);
 13:   animation: fadeIn 0.15s ease-out;
 14: }
 15: 
 16: .dialogOverlay {
 17:   position: fixed;
 18:   inset: 0;
 19:   background: rgba(0, 0, 0, 0.4);
 20:   backdrop-filter: blur(4px);
 21:   z-index: var(--z-index-modal);
 22:   transition: opacity 0.15s ease-out;
 23: }
 24: 
 25: .dialogContent {
 26:   position: fixed;
 27:   top: 50%;
 28:   left: 50%;
 29:   transform: translate(-50%, -50%);
 30:   width: 90vw;
 31:   max-width: 500px;
 32:   max-height: 85vh;
 33:   padding: 1.5rem;
 34:   background: var(--background-primary);
 35:   border: 1px solid var(--border-color);
 36:   border-radius: var(--radius);
 37:   box-shadow: var(--shadow-lg);
 38:   z-index: var(--z-index-modal);
 39:   transition: all 0.15s ease-out;
 40:   overflow-y: auto;
 41: }
 42: 
 43: /* Size variants */
 44: .sm {
 45:   max-width: 400px;
 46: }
 47: 
 48: .md {
 49:   max-width: 600px;
 50: }
 51: 
 52: .lg {
 53:   max-width: 800px;
 54: }
 55: 
 56: .header {
 57:   display: flex;
 58:   justify-content: space-between;
 59:   align-items: center;
 60:   padding: 16px 20px;
 61:   border-bottom: 1px solid hsl(var(--border));
 62: }
 63: 
 64: .title {
 65:   margin: 0;
 66:   font-size: 18px;
 67:   font-weight: 600;
 68:   color: hsl(var(--foreground));
 69:   line-height: 1.4;
 70: }
 71: 
 72: .description {
 73:   padding: 12px 20px 0;
 74:   font-size: 14px;
 75:   color: hsl(var(--muted-foreground));
 76:   line-height: 1.5;
 77: }
 78: 
 79: .content {
 80:   padding: 20px;
 81: }
 82: 
 83: .footer {
 84:   display: flex;
 85:   justify-content: flex-end;
 86:   gap: 12px;
 87:   padding: 16px 20px;
 88:   border-top: 1px solid hsl(var(--border));
 89:   background-color: hsl(var(--muted) / 0.5);
 90: }
 91: 
 92: /* Animations */
 93: @keyframes fadeIn {
 94:   from {
 95:     opacity: 0;
 96:   }
 97:   to {
 98:     opacity: 1;
 99:   }
100: }
101: 
102: @keyframes slideIn {
103:   from {
104:     opacity: 0;
105:     transform: translateY(-2px) scale(0.98);
106:   }
107:   to {
108:     opacity: 1;
109:     transform: translateY(0) scale(1);
110:   }
111: }
```

## File: src/components/ui/Dialog/Dialog.tsx
```typescript
  1: import React, { useEffect, useRef } from 'react';
  2: import { X } from 'lucide-react';
  3: import { Button } from '../Button';
  4: import { cn } from '../../../utils/cn';
  5: import styles from './Dialog.module.css';
  6: 
  7: export interface DialogProps {
  8:   /**
  9:    * Whether the dialog is open
 10:    */
 11:   isOpen: boolean;
 12:   
 13:   /**
 14:    * Callback when the dialog should close
 15:    */
 16:   onClose: () => void;
 17:   
 18:   /**
 19:    * Dialog title
 20:    */
 21:   title: string;
 22:   
 23:   /**
 24:    * Optional description text below the title
 25:    */
 26:   description?: string;
 27:   
 28:   /**
 29:    * Dialog content
 30:    */
 31:   children: React.ReactNode;
 32:   
 33:   /**
 34:    * Optional footer content (usually action buttons)
 35:    */
 36:   footer?: React.ReactNode;
 37:   
 38:   /**
 39:    * Optional size variant
 40:    * @default 'md'
 41:    */
 42:   size?: 'sm' | 'md' | 'lg';
 43:   
 44:   /**
 45:    * Optional custom class name
 46:    */
 47:   className?: string;
 48: }
 49: 
 50: /**
 51:  * Dialog component for modal interactions
 52:  * Handles focus trapping, keyboard interactions, and animations
 53:  */
 54: export const Dialog: React.FC<DialogProps> = ({
 55:   isOpen,
 56:   onClose,
 57:   title,
 58:   description,
 59:   children,
 60:   footer,
 61:   size = 'md',
 62:   className,
 63: }) => {
 64:   const dialogRef = useRef<HTMLDivElement>(null);
 65:   
 66:   // Handle ESC key to close dialog
 67:   useEffect(() => {
 68:     const handleKeyDown = (e: KeyboardEvent) => {
 69:       if (e.key === 'Escape' && isOpen) {
 70:         onClose();
 71:       }
 72:     };
 73:     
 74:     window.addEventListener('keydown', handleKeyDown);
 75:     return () => window.removeEventListener('keydown', handleKeyDown);
 76:   }, [isOpen, onClose]);
 77:   
 78:   // Handle click outside to close
 79:   useEffect(() => {
 80:     const handleClickOutside = (e: MouseEvent) => {
 81:       if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
 82:         onClose();
 83:       }
 84:     };
 85:     
 86:     if (isOpen) {
 87:       document.addEventListener('mousedown', handleClickOutside);
 88:       return () => document.removeEventListener('mousedown', handleClickOutside);
 89:     }
 90:   }, [isOpen, onClose]);
 91:   
 92:   // Prevent body scroll when dialog is open
 93:   useEffect(() => {
 94:     if (isOpen) {
 95:       document.body.style.overflow = 'hidden';
 96:       return () => {
 97:         document.body.style.overflow = 'unset';
 98:       };
 99:     }
100:   }, [isOpen]);
101:   
102:   if (!isOpen) return null;
103:   
104:   return (
105:     <div className={styles.backdrop}>
106:       <div 
107:         ref={dialogRef}
108:         className={cn(
109:           styles.dialog,
110:           styles[size],
111:           className
112:         )}
113:         role="dialog"
114:         aria-modal="true"
115:         aria-labelledby="dialog-title"
116:       >
117:         <div className={styles.header}>
118:           <h2 id="dialog-title" className={styles.title}>{title}</h2>
119:           <Button 
120:             variant="ghost"
121:             size="sm"
122:             iconOnly
123:             onClick={onClose}
124:             startIcon={<X size={16} />}
125:             title="Close dialog"
126:           />
127:         </div>
128:         
129:         {description && (
130:           <div className={styles.description}>
131:             {description}
132:           </div>
133:         )}
134:         
135:         <div className={styles.content}>
136:           {children}
137:         </div>
138:         
139:         {footer && (
140:           <div className={styles.footer}>
141:             {footer}
142:           </div>
143:         )}
144:       </div>
145:     </div>
146:   );
147: };
```

## File: src/components/ui/Dialog/index.ts
```typescript
1: export * from './Dialog';
```

## File: src/components/ui/Dropdown/index.ts
```typescript
1: export { Dropdown } from './Dropdown';
2: export type { DropdownOption, DropdownProps } from './Dropdown';
```

## File: src/components/ui/Input/index.ts
```typescript
1: export * from './Input';
```

## File: src/components/ui/Switch/index.ts
```typescript
1: export * from './Switch';
```

## File: src/components/ui/Switch/Switch.tsx
```typescript
 1: import React from 'react';
 2: import { cn } from '../../../utils/cn';
 3: import styles from './Switch.module.css';
 4: 
 5: export interface SwitchProps {
 6:   /**
 7:    * Whether the switch is checked
 8:    */
 9:   checked: boolean;
10:   
11:   /**
12:    * Function called when the switch is toggled
13:    */
14:   onChange: () => void;
15:   
16:   /**
17:    * Optional label to display beside the switch
18:    */
19:   label?: string;
20:   
21:   /**
22:    * Disables the switch
23:    */
24:   disabled?: boolean;
25:   
26:   /**
27:    * Optional additional className
28:    */
29:   className?: string;
30:   
31:   /**
32:    * Optional ID for the switch
33:    */
34:   id?: string;
35: }
36: 
37: /**
38:  * Switch component for toggling between two states
39:  */
40: export const Switch: React.FC<SwitchProps> = ({
41:   checked,
42:   onChange,
43:   label,
44:   disabled = false,
45:   className,
46:   id
47: }) => {
48:   const switchId = id || `switch-${Math.random().toString(36).substring(2, 9)}`;
49: 
50:   return (
51:     <div className={cn(styles.switchContainer, className)}>
52:       {label && (
53:         <label htmlFor={switchId} className={styles.switchLabel}>
54:           {label}
55:         </label>
56:       )}
57:       <div
58:         className={cn(
59:           styles.switch,
60:           checked && styles.switchChecked,
61:           disabled && styles.switchDisabled
62:         )}
63:         role="switch"
64:         aria-checked={checked}
65:         aria-disabled={disabled}
66:         tabIndex={disabled ? -1 : 0}
67:         onClick={disabled ? undefined : onChange}
68:         onKeyDown={(e) => {
69:           if (disabled) return;
70:           if (e.key === 'Enter' || e.key === ' ') {
71:             e.preventDefault();
72:             onChange();
73:           }
74:         }}
75:         id={switchId}
76:       >
77:         <div className={styles.switchThumb} />
78:       </div>
79:     </div>
80:   );
81: };
82: 
83: Switch.displayName = 'Switch';
```

## File: src/components/ui/ConfirmationDialog.tsx
```typescript
 1: import React from 'react';
 2: import { Dialog } from './Dialog';
 3: import { Button } from './Button';
 4: 
 5: interface ConfirmationDialogProps {
 6:   isOpen: boolean;
 7:   onClose: () => void;
 8:   onConfirm: () => void;
 9:   title: string;
10:   description: string;
11:   confirmLabel?: string;
12:   cancelLabel?: string;
13:   variant?: 'default' | 'destructive';
14: }
15: 
16: export function ConfirmationDialog({
17:   isOpen,
18:   onClose,
19:   onConfirm,
20:   title,
21:   description,
22:   confirmLabel = 'Confirm',
23:   cancelLabel = 'Cancel',
24:   variant = 'default'
25: }: ConfirmationDialogProps) {
26:   const handleConfirm = () => {
27:     onConfirm();
28:     onClose();
29:   };
30: 
31:   return (
32:     <Dialog
33:       isOpen={isOpen}
34:       onClose={onClose}
35:       title={title}
36:       description={description}
37:       size="sm"
38:     >
39:       <div className="flex justify-end gap-3 mt-6">
40:         <Button
41:           variant="ghost"
42:           size="sm"
43:           onClick={onClose}
44:         >
45:           {cancelLabel}
46:         </Button>
47:         <Button
48:           variant={variant === 'destructive' ? 'destructive' : 'primary'}
49:           size="sm"
50:           onClick={handleConfirm}
51:         >
52:           {confirmLabel}
53:         </Button>
54:       </div>
55:     </Dialog>
56:   );
57: }
```

## File: src/components/SearchBar.tsx
```typescript
 1: import React from "react";
 2: import { Search, X } from "lucide-react";
 3: import { Input } from "./ui";
 4: import styles from "./SearchBar.module.css";
 5: 
 6: interface SearchBarProps {
 7:   searchTerm: string;
 8:   onSearchChange: (term: string) => void;
 9:   placeholder?: string;
10: }
11: 
12: const SearchBar = ({
13:   searchTerm,
14:   onSearchChange,
15:   placeholder = "Search...",
16: }: SearchBarProps) => {
17:   // Create a custom end icon that clears the search when clicked
18:   const ClearButton = searchTerm ? (
19:     <button
20:       className={styles.clearButton}
21:       onClick={() => onSearchChange("")}
22:       aria-label="Clear search"
23:     >
24:       <X size={14} />
25:     </button>
26:   ) : null;
27: 
28:   return (
29:     <div className={styles.searchBarWrapper}>
30:       <Input
31:         type="text"
32:         placeholder={placeholder}
33:         value={searchTerm}
34:         onChange={(e) => onSearchChange(e.target.value)}
35:         isSearchInput
36:         startIcon={<Search size={16} />}
37:         endIcon={ClearButton}
38:         className={styles.searchInput}
39:       />
40:     </div>
41:   );
42: };
43: 
44: export default SearchBar;
```

## File: src/components/Sidebar.module.css.d.ts
```typescript
 1: declare const styles: {
 2:   readonly sidebar: string;
 3:   readonly sidebarSearch: string;
 4:   readonly sidebarActions: string;
 5:   readonly fileTree: string;
 6:   readonly treeEmpty: string;
 7:   readonly treeLoading: string;
 8:   readonly spinner: string;
 9:   readonly sidebarEmptyState: string;
10:   readonly sidebarEmptyIcon: string;
11:   readonly sidebarResizeHandle: string;
12: };
13: 
14: export default styles;
```

## File: src/constants/theme.ts
```typescript
1: export const STORAGE_KEY = "pastemax-theme";
```

## File: src/context/ThemeContextType.ts
```typescript
 1: import { createContext } from "react";
 2: 
 3: export type ThemeType = "light" | "dark" | "system";
 4: 
 5: export interface ThemeContextType {
 6:   theme: ThemeType;
 7:   currentTheme: "light" | "dark"; // The actual applied theme
 8:   setTheme: (theme: ThemeType) => void;
 9: }
10: 
11: // Create context with proper typing
12: const defaultThemeContext: ThemeContextType = {
13:   theme: "system",
14:   currentTheme: "light",
15:   setTheme: () => {},
16: };
17: 
18: export const ThemeContext = createContext(defaultThemeContext);
```

## File: src/styles/globals.css
```css
 1: :root {
 2:   /* Base colors */
 3:   --background: #ffffff;
 4:   --background-primary: #ffffff;
 5:   --background-secondary: #f1f5f9;
 6:   --background-selected: #f8fafc;
 7:   --foreground: #0f172a;
 8:   
 9:   /* Text colors */
10:   --text-primary: #0f172a;
11:   --text-secondary: #64748b;
12:   --text-muted: #94a3b8;
13:   
14:   /* Border colors */
15:   --border-color: #e2e8f0;
16:   --border-hover: #cbd5e1;
17:   
18:   /* Component colors */
19:   --accent-color: #0ea5e9;
20:   --accent-hover: #0284c7;
21:   --accent-muted: #e0f2fe;
22:   
23:   /* Status colors */
24:   --success: #22c55e;
25:   --warning: #f59e0b;
26:   --error: #ef4444;
27:   
28:   /* Shadows */
29:   --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
30:   --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
31:   --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
32:   
33:   /* Radii */
34:   --radius: 6px;
35:   --radius-lg: 8px;
36:   --radius-full: 9999px;
37: }
38: 
39: .dark-mode {
40:   /* Base colors */
41:   --background: #0f172a;
42:   --background-primary: #1e293b;
43:   --background-secondary: #0f172a;
44:   --background-selected: #334155;
45:   --foreground: #f8fafc;
46:   
47:   /* Text colors */
48:   --text-primary: #f8fafc;
49:   --text-secondary: #94a3b8;
50:   --text-muted: #64748b;
51:   
52:   /* Border colors */
53:   --border-color: #1e293b;
54:   --border-hover: #334155;
55:   
56:   /* Component colors */
57:   --accent-color: #0ea5e9;
58:   --accent-hover: #38bdf8;
59:   --accent-muted: #0c4a6e;
60:   
61:   /* Status colors */
62:   --success: #22c55e;
63:   --warning: #f59e0b;
64:   --error: #ef4444;
65:   
66:   /* Shadows */
67:   --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
68:   --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
69:   --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.4);
70: }
71: 
72: /* ... rest of the existing styles ... */
```

## File: src/types/css.d.ts
```typescript
1: declare module '*.module.css' {
2:   const classes: { [key: string]: string };
3:   export default classes;
4: }
```

## File: src/types/electron.d.ts
```typescript
 1: declare global {
 2:   interface Window {
 3:     /**
 4:      * Electron API exposed through contextBridge in preload.js
 5:      */
 6:     electron: {
 7:       /**
 8:        * IPC Renderer interface for communication with the main process
 9:        */
10:       ipcRenderer: {
11:         /**
12:          * Send a message to the main process
13:          * @param channel - The channel to send the message on
14:          * @param data - Optional data to send with the message
15:          */
16:         send: (channel: string, data?: any) => void;
17:         
18:         /**
19:          * Register a listener for messages from the main process
20:          * @param channel - The channel to listen on
21:          * @param func - The callback function to handle the message
22:          */
23:         on: (channel: string, func: (...args: any[]) => void) => void;
24:         
25:         /**
26:          * Remove a listener for messages from the main process
27:          * @param channel - The channel to remove the listener from
28:          * @param func - The callback function to remove
29:          */
30:         removeListener: (channel: string, func: (...args: any[]) => void) => void;
31:         
32:         /**
33:          * Invoke a method in the main process and get a response
34:          * @param channel - The channel to invoke the method on
35:          * @param data - Optional data to send with the invocation
36:          * @returns A promise that resolves with the result from the main process
37:          */
38:         invoke: <T = any>(channel: string, data?: any) => Promise<T>;
39:         
40:         /**
41:          * Set the maximum number of listeners for a channel
42:          * @param n - The maximum number of listeners
43:          */
44:         setMaxListeners?: (n: number) => void;
45:       };
46:     };
47:   }
48: }
49: 
50: export {};
```

## File: src/types/index.ts
```typescript
1: // Re-export all types from FileTypes.ts
2: export * from './FileTypes';
```

## File: src/utils/create-variants.ts
```typescript
 1: /**
 2:  * Creates a map of variant classes for a component.
 3:  * Based on the concept of class-variance-authority but simplified.
 4:  */
 5: export function createVariants<T extends string>(
 6:   baseClass: string,
 7:   variantMap: Record<T, string>
 8: ): {
 9:   base: string;
10:   variants: Record<T, string>;
11:   getVariantClass: (variant: T) => string;
12: } {
13:   return {
14:     base: baseClass,
15:     variants: variantMap,
16:     getVariantClass: (variant: T) => variantMap[variant] || ''
17:   };
18: }
```

## File: src/components/ui/Card/Card.module.css
```css
 1: .card {
 2:   border: 1px solid var(--border-color);
 3:   border-radius: var(--radius);
 4:   background-color: var(--card-background);
 5:   color: var(--text-primary);
 6:   transition: border-color 0.2s ease, box-shadow 0.2s ease;
 7: }
 8: 
 9: .card:hover {
10:   border-color: var(--accent-color);
11:   box-shadow: var(--shadow-sm);
12: }
13: 
14: .cardSelected {
15:   border-color: var(--accent-color);
16:   box-shadow: var(--shadow-md);
17: }
18: 
19: .cardInteractive {
20:   cursor: pointer;
21: }
22: 
23: .cardInteractive:hover {
24:   box-shadow: var(--shadow-md);
25: }
26: 
27: .cardHeader {
28:   display: flex;
29:   align-items: center;
30:   justify-content: space-between;
31:   padding: 12px 16px;
32:   border-bottom: 1px solid var(--border-color);
33: }
34: 
35: .cardTitle {
36:   font-weight: 600;
37:   font-size: 16px;
38:   margin: 0;
39:   color: var(--text-primary);
40: }
41: 
42: .cardDescription {
43:   color: var(--text-secondary);
44:   font-size: 14px;
45:   margin-top: 4px;
46: }
47: 
48: .cardContent {
49:   padding: 16px;
50: }
51: 
52: .cardFooter {
53:   display: flex;
54:   align-items: center;
55:   justify-content: flex-end;
56:   padding: 12px 16px;
57:   border-top: 1px solid var(--border-color);
58: }
```

## File: src/components/ui/Dropdown/DropdownDemo.tsx
```typescript
 1: import React, { useState } from 'react';
 2: import { Dropdown, DropdownOption } from './';
 3: import { FileIcon, FolderIcon, SettingsIcon } from 'lucide-react';
 4: 
 5: const demoOptions: DropdownOption[] = [
 6:   { value: 'file', label: 'New File', icon: <FileIcon size={16} /> },
 7:   { value: 'folder', label: 'New Folder', icon: <FolderIcon size={16} /> },
 8:   { value: 'settings', label: 'Settings', icon: <SettingsIcon size={16} /> },
 9:   { value: 'disabled', label: 'Disabled Option', disabled: true },
10: ];
11: 
12: export const DropdownDemo: React.FC = () => {
13:   const [singleValue, setSingleValue] = useState<string>();
14:   const [multiValue, setMultiValue] = useState<string[]>([]);
15: 
16:   // Properly typed onChange handlers
17:   const handleSingleChange = (value: string | string[]) => {
18:     if (typeof value === 'string') {
19:       setSingleValue(value);
20:     }
21:   };
22: 
23:   const handleMultiChange = (value: string | string[]) => {
24:     if (Array.isArray(value)) {
25:       setMultiValue(value);
26:     }
27:   };
28: 
29:   const noopHandler = (_value: string | string[]) => {
30:     // No operation
31:   };
32: 
33:   return (
34:     <div className="space-y-4 p-4">
35:       <div>
36:         <h3 className="mb-2 text-sm font-medium">Single Select</h3>
37:         <Dropdown
38:           options={demoOptions}
39:           value={singleValue}
40:           onChange={handleSingleChange}
41:           placeholder="Select an action"
42:         />
43:       </div>
44: 
45:       <div>
46:         <h3 className="mb-2 text-sm font-medium">Multi Select</h3>
47:         <Dropdown
48:           options={demoOptions}
49:           value={multiValue}
50:           onChange={handleMultiChange}
51:           placeholder="Select actions"
52:           multiple
53:         />
54:       </div>
55: 
56:       <div>
57:         <h3 className="mb-2 text-sm font-medium">Size Variants</h3>
58:         <div className="space-y-2">
59:           <Dropdown
60:             options={demoOptions}
61:             placeholder="Small Dropdown"
62:             size="sm"
63:             onChange={noopHandler}
64:           />
65:           <Dropdown
66:             options={demoOptions}
67:             placeholder="Medium Dropdown (default)"
68:             size="md"
69:             onChange={noopHandler}
70:           />
71:           <Dropdown
72:             options={demoOptions}
73:             placeholder="Large Dropdown"
74:             size="lg"
75:             onChange={noopHandler}
76:           />
77:         </div>
78:       </div>
79: 
80:       <div>
81:         <h3 className="mb-2 text-sm font-medium">Disabled State</h3>
82:         <Dropdown
83:           options={demoOptions}
84:           placeholder="Disabled Dropdown"
85:           disabled
86:           onChange={noopHandler}
87:         />
88:       </div>
89:     </div>
90:   );
91: };
```

## File: src/components/ui/Input/Input.module.css
```css
 1: .inputWrapper {
 2:   position: relative;
 3:   display: flex;
 4:   width: 100%;
 5: }
 6: 
 7: .input {
 8:   width: 100%;
 9:   height: var(--button-height-md);
10:   padding: 0 12px;
11:   border: 1px solid var(--border-color);
12:   border-radius: var(--radius);
13:   font-family: inherit;
14:   font-size: 14px;
15:   outline: none;
16:   background-color: var(--background-primary);
17:   color: var(--text-primary);
18:   transition: all 0.2s ease;
19: }
20: 
21: .input:hover:not(:disabled) {
22:   border-color: var(--text-secondary);
23: }
24: 
25: .input:focus {
26:   outline: none;
27:   border-color: var(--ring-color);
28:   box-shadow: 0 0 0 2px var(--background-primary),
29:               0 0 0 4px var(--ring-color);
30: }
31: 
32: .input:disabled {
33:   opacity: 0.5;
34:   cursor: not-allowed;
35:   background-color: var(--background-secondary);
36: }
37: 
38: .withStartIcon {
39:   padding-left: 36px;
40: }
41: 
42: .withEndIcon {
43:   padding-right: 36px;
44: }
45: 
46: .startIcon,
47: .endIcon {
48:   position: absolute;
49:   top: 50%;
50:   transform: translateY(-50%);
51:   color: var(--text-secondary);
52:   display: flex;
53:   align-items: center;
54:   justify-content: center;
55:   pointer-events: none;
56:   width: 36px;
57: }
58: 
59: .startIcon {
60:   left: 0;
61: }
62: 
63: .endIcon {
64:   right: 0;
65: }
66: 
67: .inputError {
68:   border-color: var(--error-color);
69: }
70: 
71: .inputError:focus {
72:   border-color: var(--error-color);
73:   box-shadow: 0 0 0 2px var(--background-primary),
74:               0 0 0 4px var(--error-color);
75: }
76: 
77: /* Search input specific styles */
78: .searchInput {
79:   padding-left: 36px;
80:   background-color: var(--background-secondary);
81:   border-color: transparent;
82: }
83: 
84: .searchInput:focus {
85:   background-color: var(--background-primary);
86:   border-color: var(--ring-color);
87: }
```

## File: src/components/ui/Input/Input.tsx
```typescript
 1: import React from 'react';
 2: import { cn } from '../../../utils/cn';
 3: import styles from './Input.module.css';
 4: 
 5: export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
 6:   /**
 7:    * Shows error styling
 8:    */
 9:   error?: boolean;
10:   
11:   /**
12:    * Icon to display at the start of the input
13:    */
14:   startIcon?: React.ReactNode;
15:   
16:   /**
17:    * Icon to display at the end of the input
18:    */
19:   endIcon?: React.ReactNode;
20:   
21:   /**
22:    * Applies search input styling
23:    */
24:   isSearchInput?: boolean;
25: }
26: 
27: /**
28:  * Input component for text entry
29:  */
30: export const Input = React.forwardRef<HTMLInputElement, InputProps>(
31:   ({ className, error, startIcon, endIcon, isSearchInput, ...props }, ref) => {
32:     return (
33:       <div className={styles.inputWrapper}>
34:         {startIcon && <div className={styles.startIcon}>{startIcon}</div>}
35:         <input
36:           className={cn(
37:             styles.input,
38:             startIcon ? styles.withStartIcon : null,
39:             endIcon ? styles.withEndIcon : null,
40:             isSearchInput ? styles.searchInput : null,
41:             error ? styles.inputError : null,
42:             className
43:           )}
44:           ref={ref}
45:           {...props}
46:         />
47:         {endIcon && <div className={styles.endIcon}>{endIcon}</div>}
48:       </div>
49:     );
50:   }
51: );
52: 
53: Input.displayName = 'Input';
```

## File: src/components/FileList.module.css
```css
 1: .fileListContainer {
 2:   flex: 1;
 3:   overflow: hidden;
 4:   display: flex;
 5:   flex-direction: column;
 6: }
 7: 
 8: .fileList {
 9:   flex: 1;
10:   overflow-y: auto;
11:   padding: 1.25rem;
12:   display: grid;
13:   grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
14:   grid-auto-rows: max-content;
15:   align-content: start;
16:   gap: 1rem;
17:   background-color: var(--background-primary);
18: }
19: 
20: /* Specific scrollbar styling for file list */
21: .fileList::-webkit-scrollbar-track {
22:   background-color: var(--scrollbar-track-color);
23: }
24: 
25: .fileList::-webkit-scrollbar-thumb {
26:   background-color: var(--scrollbar-thumb-color);
27:   border-radius: var(--radius-full);
28: }
29: 
30: .fileList::-webkit-scrollbar-thumb:hover {
31:   background-color: var(--scrollbar-thumb-hover-color);
32: }
33: 
34: .fileListEmpty {
35:   display: flex;
36:   align-items: center;
37:   justify-content: center;
38:   height: 100%;
39:   color: var(--text-secondary);
40:   font-size: 16px;
41:   padding: 32px;
42:   text-align: center;
43: }
```

## File: src/components/ThemeToggle.module.css
```css
 1: .themeSegmentedControl {
 2:   display: flex;
 3:   background-color: var(--background-secondary);
 4:   border-radius: 9999px;
 5:   padding: 2px;
 6:   width: fit-content;
 7:   position: relative;
 8:   height: 28px;
 9:   border: 1px solid hsla(240, 5.9%, 90%, 0.3);
10:   gap: 1px;
11:   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03), inset 0 0 0 1px rgba(255, 255, 255, 0.03);
12:   overflow: hidden;
13: }
14: 
15: .themeSegmentsBackground {
16:   position: absolute;
17:   top: 2px;
18:   left: 2px;
19:   width: calc(33.33% - 2px);
20:   height: calc(100% - 4px);
21:   background-color: var(--background-primary);
22:   border-radius: 9999px;
23:   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.04);
24:   z-index: 0;
25:   transform: translateX(0);
26: }
27: 
28: .themeSegmentsBackground.animated {
29:   transition-property: transform, box-shadow;
30: }
31: 
32: .themeSegmentsBackground.light {
33:   transform: translateX(0);
34: }
35: 
36: .themeSegmentsBackground.dark {
37:   transform: translateX(100%);
38: }
39: 
40: .themeSegmentsBackground.system {
41:   transform: translateX(200%);
42: }
43: 
44: .themeSegment {
45:   display: flex;
46:   align-items: center;
47:   justify-content: center;
48:   width: 28px;
49:   height: 24px;
50:   border: none;
51:   background: none;
52:   color: var(--text-secondary);
53:   position: relative;
54:   z-index: 1;
55:   transition: color 0.2s ease;
56:   border-radius: 9999px;
57:   cursor: pointer;
58:   padding: 0;
59: }
60: 
61: .themeSegment:hover {
62:   color: var(--text-primary);
63:   background: none;
64: }
65: 
66: .themeSegment:focus {
67:   outline: none;
68:   box-shadow: none;
69: }
70: 
71: .themeSegment:focus-visible {
72:   outline: none;
73:   box-shadow: 0 0 0 1px var(--accent-color);
74: }
75: 
76: .themeSegment.active {
77:   color: var(--text-primary);
78: }
79: 
80: /* Dark mode adjustments */
81: :global(.dark-mode) .themeSegmentedControl {
82:   border-color: hsla(240, 3.7%, 25%, 0.3);
83:   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.02);
84: }
85: 
86: :global(.dark-mode) .themeSegmentsBackground {
87:   background-color: var(--background-selected);
88:   box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05);
89: }
```

## File: src/components/UserInstructions.module.css
```css
 1: .userInstructionsContainer {
 2:   padding: 1rem 0.75rem 0.75rem 0.75rem;
 3:   display: flex;
 4:   flex-direction: column;
 5:   background-color: var(--instructions-background);
 6:   border-bottom: 1px solid var(--instructions-border);
 7:   border-top: 1px solid var(--instructions-border);
 8:   margin: 0.5rem 1rem;
 9:   border-radius: var(--radius);
10:   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
11: }
12: 
13: .userInstructions {
14:   display: flex;
15:   flex-direction: column;
16: }
17: 
18: .textarea {
19:   width: 100%;
20:   resize: vertical;
21:   padding: 1rem;
22:   border: 1px solid var(--border-color);
23:   border-radius: var(--radius);
24:   font-family: inherit;
25:   font-size: 1rem;
26:   background-color: var(--card-background);
27:   color: var(--text-primary);
28:   min-height: 100px;
29:   line-height: 1.5;
30:   box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
31:   transition: border-color 0.2s ease, box-shadow 0.2s ease;
32: }
33: 
34: .textarea:focus {
35:   outline: none;
36:   border-color: var(--accent-color);
37:   box-shadow: 0 0 0 1px var(--accent-color);
38: }
39: 
40: .userInstructionsHeader {
41:   display: flex;
42:   justify-content: space-between;
43:   align-items: center;
44:   padding: 0.75rem 1rem;
45:   margin-bottom: 0.5rem;
46:   background-color: var(--instructions-background);
47:   font-weight: 500;
48: }
```

## File: src/hooks/useTheme.ts
```typescript
 1: import { useContext } from "react";
 2: import { ThemeContext } from "../context/ThemeContextType";
 3: 
 4: export const useTheme = () => {
 5:   const context = useContext(ThemeContext);
 6:   if (context === undefined) {
 7:     throw new Error("useTheme must be used within a ThemeProvider");
 8:   }
 9:   return context;
10: };
```

## File: src/components/ui/Button/index.ts
```typescript
1: export * from './Button';
```

## File: src/components/ui/Switch/Switch.module.css
```css
 1: .switchContainer {
 2:   display: inline-flex;
 3:   align-items: center;
 4: }
 5: 
 6: .switchLabel {
 7:   margin-right: 8px;
 8:   font-size: 14px;
 9:   color: var(--text-primary);
10: }
11: 
12: .switch {
13:   position: relative;
14:   display: inline-flex;
15:   width: 36px;
16:   height: 20px;
17:   border-radius: var(--radius-full);
18:   background-color: var(--text-disabled);
19:   transition: background-color 0.2s ease;
20:   cursor: pointer;
21: }
22: 
23: .switchChecked {
24:   background-color: var(--accent-color);
25: }
26: 
27: .switch:focus-visible {
28:   outline: none;
29:   box-shadow: 0 0 0 2px var(--background-primary),
30:               0 0 0 4px var(--ring-color);
31: }
32: 
33: .switchDisabled {
34:   opacity: 0.5;
35:   cursor: not-allowed;
36: }
37: 
38: .switchThumb {
39:   position: absolute;
40:   top: 3px;
41:   left: 3px;
42:   width: 14px;
43:   height: 14px;
44:   border-radius: var(--radius-full);
45:   background-color: var(--background-primary);
46:   box-shadow: var(--shadow-sm);
47:   transition: transform 0.2s ease;
48: }
49: 
50: .switchChecked .switchThumb {
51:   transform: translateX(16px);
52: }
```

## File: src/components/ControlContainer.module.css
```css
  1: .controlContainer {
  2:   border: 1px solid var(--border-color);
  3:   border-radius: var(--radius);
  4:   margin-bottom: 16px;
  5:   background-color: var(--background-primary);
  6:   display: flex;
  7:   flex-direction: column;
  8: }
  9: 
 10: .controlContainerHeader {
 11:   background-color: var(--background-secondary);
 12:   padding: 8px 12px;
 13:   font-weight: 500;
 14:   color: var(--text-primary);
 15:   border-bottom: 1px solid var(--border-color);
 16:   border-top-left-radius: var(--radius);
 17:   border-top-right-radius: var(--radius);
 18:   font-size: 14px;
 19: }
 20: 
 21: .controlItems {
 22:   padding: 12px;
 23:   display: flex;
 24:   flex-direction: row;
 25:   gap: 24px;
 26:   align-items: flex-start;
 27: }
 28: 
 29: .controlItem {
 30:   display: flex;
 31:   align-items: center;
 32:   gap: 8px;
 33: }
 34: 
 35: /* For the tree mode selector */
 36: .controlSelect {
 37:   flex: 1;
 38:   padding: 6px 10px;
 39:   background-color: var(--background-primary);
 40:   border: 1px solid var(--border-color);
 41:   border-radius: var(--radius);
 42:   color: var(--text-primary);
 43:   font-size: 13px;
 44:   height: 28px;
 45:   min-width: 160px;
 46:   appearance: none;
 47:   background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
 48:   background-repeat: no-repeat;
 49:   background-position: right 8px center;
 50:   background-size: 14px;
 51:   transition: border-color 0.15s, box-shadow 0.15s;
 52: }
 53: 
 54: .controlSelect:focus {
 55:   outline: none;
 56:   border-color: var(--accent-color);
 57:   box-shadow: 0 0 0 1px var(--accent-color);
 58: }
 59: 
 60: .dark .controlSelect {
 61:   background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
 62: }
 63: 
 64: .controlSelectLabel {
 65:   font-size: 13px;
 66:   color: var(--text-primary);
 67:   font-weight: 500;
 68:   white-space: nowrap;
 69: }
 70: 
 71: /* Control groups */
 72: .controlGroup {
 73:   display: flex;
 74:   flex-direction: column;
 75:   gap: 8px;
 76:   min-width: 200px;
 77: }
 78: 
 79: .controlGroupTitle {
 80:   font-size: 13px;
 81:   font-weight: 500;
 82:   color: var(--text-primary);
 83:   margin-bottom: 4px;
 84:   padding-bottom: 4px;
 85:   border-bottom: 1px solid var(--border-color);
 86: }
 87: 
 88: /* Remove CopyButton related styles */
 89: .copyButtonWrapper {
 90:   display: flex;
 91:   align-items: center;
 92:   gap: 8px;
 93:   width: 100%;
 94: }
 95: 
 96: .tokenBarContainer {
 97:   height: 3px;
 98:   width: 100%;
 99:   background-color: hsl(240, 5.9%, 90%);
100:   border-radius: 9999px;
101:   overflow: hidden;
102:   margin-top: 0.5rem;
103:   position: relative;
104: }
105: 
106: .tokenBar {
107:   height: 100%;
108:   width: 0;
109:   background: var(--accent-color);
110:   transition: width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
111:   border-radius: 9999px;
112: }
113: 
114: .dark .tokenBarContainer {
115:   background-color: hsl(240, 3.7%, 25%);
116: }
117: 
118: @media (max-width: 768px) {
119:   .controlItems {
120:     flex-direction: column;
121:     gap: 16px;
122:   }
123:   
124:   .controlGroup {
125:     width: 100%;
126:   }
127:   
128:   .copyButtonWrapper {
129:     width: 100%;
130:   }
131: }
132: 
133: .outputButtons {
134:   display: flex;
135:   align-items: center;
136: }
137: 
138: .outputButtons > button:first-child {
139:   border-top-right-radius: 0;
140:   border-bottom-right-radius: 0;
141:   border-right: none;
142: }
143: 
144: .outputButtons > button:last-child {
145:   border-top-left-radius: 0;
146:   border-bottom-left-radius: 0;
147:   border-left: 1px solid var(--border-color);
148: }
149: 
150: /* Ensure hover is visible */
151: .outputButtons > button:hover:not(:disabled) {
152:   background-color: var(--hover-color);
153:   z-index: 1;
154: }
155: 
156: /* Active state */
157: .outputButtons > button:active:not(:disabled) {
158:   background-color: var(--secondary-button-active);
159:   z-index: 2;
160: }
```

## File: src/components/FileCard.module.css
```css
  1: .fileCard {
  2:   display: flex;
  3:   flex-direction: column;
  4:   margin-bottom: 8px;
  5:   transition: all 0.2s ease;
  6:   border: 1px solid var(--border-color);
  7:   border-radius: var(--radius);
  8:   position: relative;
  9:   height: auto;
 10:   min-height: 100px;
 11:   background-color: var(--card-background);
 12:   color: var(--card-foreground);
 13:   box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
 14: }
 15: 
 16: .fileCard:hover {
 17:   background-color: var(--card-background);
 18:   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
 19:   border-color: var(--border-color);
 20:   transform: translateY(-1px);
 21: }
 22: 
 23: .fileCard.selected {
 24:   border-color: var(--file-card-selected-border);
 25:   box-shadow: 0 0 0 1px var(--file-card-selected-border);
 26: }
 27: 
 28: .fileCardContent {
 29:   padding: 12px !important;
 30: }
 31: 
 32: .fileCardHeader {
 33:   display: flex;
 34:   align-items: center;
 35:   gap: 8px;
 36:   margin-bottom: 8px;
 37: }
 38: 
 39: .fileCardIcon {
 40:   color: var(--text-secondary);
 41:   display: flex;
 42:   align-items: center;
 43:   margin-right: 0.5rem;
 44:   flex-shrink: 0;
 45: }
 46: 
 47: .fileCardName {
 48:   flex: 1;
 49:   font-family: monospace;
 50:   white-space: nowrap;
 51:   overflow: hidden;
 52:   text-overflow: ellipsis;
 53:   font-weight: 500;
 54:   color: var(--card-foreground);
 55: }
 56: 
 57: .fileCardInfo {
 58:   display: flex;
 59:   flex-direction: column;
 60:   margin-bottom: 24px;
 61:   flex-grow: 1;
 62: }
 63: 
 64: .fileCardTokens {
 65:   font-size: 12px;
 66:   color: var(--text-secondary);
 67:   margin-bottom: 4px;
 68: }
 69: 
 70: .fileCardStatus {
 71:   font-size: 13px;
 72:   color: var(--text-secondary);
 73: }
 74: 
 75: .tokenBarContainer {
 76:   width: 100%;
 77:   height: 4px;
 78:   background-color: var(--background-secondary);
 79:   border-radius: 2px;
 80:   overflow: hidden;
 81: }
 82: 
 83: .tokenBar {
 84:   height: 100%;
 85:   background-color: var(--accent-color);
 86:   border-radius: 2px;
 87:   transition: width 0.3s ease;
 88: }
 89: 
 90: .fileCardActions {
 91:   display: flex;
 92:   gap: 2px;
 93:   position: absolute;
 94:   bottom: 8px;
 95:   right: 12px;
 96:   opacity: 0;
 97:   transition: opacity 0.2s ease;
 98: }
 99: 
100: .fileCard:hover .fileCardActions {
101:   opacity: 1;
102: }
103: 
104: .fileCardAction {
105:   width: 24px !important;
106:   height: 24px !important;
107:   padding: 0 !important;
108: }
109: 
110: .copySuccess {
111:   color: var(--success-color);
112:   animation: pulse 1s ease-in-out;
113: }
114: 
115: @keyframes pulse {
116:   0% {
117:     transform: scale(1);
118:   }
119:   50% {
120:     transform: scale(1.2);
121:   }
122:   100% {
123:     transform: scale(1);
124:   }
125: }
```

## File: src/components/FileCard.tsx
```typescript
  1: import React, { useEffect, useState } from "react";
  2: import { Plus, X, FileText, Copy } from "lucide-react";
  3: import { Card, CardContent, Button } from "./ui";
  4: import styles from "./FileCard.module.css";
  5: 
  6: interface FileCardComponentProps {
  7:   file: {
  8:     name: string;
  9:     path: string;
 10:     tokenCount: number;
 11:     content: string;
 12:   };
 13:   isSelected: boolean;
 14:   toggleSelection: (path: string) => void;
 15:   maxTokenCount?: number; // Maximum token count among all displayed files
 16: }
 17: 
 18: const FileCard = ({
 19:   file,
 20:   isSelected,
 21:   toggleSelection,
 22:   maxTokenCount = 5000, // Default if not provided
 23: }: FileCardComponentProps) => {
 24:   const { name, path: filePath, tokenCount, content } = file;
 25:   const [barWidth, setBarWidth] = useState(0);
 26:   const [copied, setCopied] = useState(false);
 27: 
 28:   // Format token count for display
 29:   const formattedTokens = tokenCount.toLocaleString();
 30: 
 31:   // Calculate the percentage width for the token bar based on the highest token count
 32:   useEffect(() => {
 33:     // Start with 0 width
 34:     setBarWidth(0);
 35:     
 36:     // Animate to the correct width with a slight delay for visual appeal
 37:     const timer = setTimeout(() => {
 38:       // If token count is very small compared to max, ensure it has at least some visible width
 39:       let percentage;
 40:       if (maxTokenCount <= 0) {
 41:         percentage = 0;
 42:       } else {
 43:         // Use relative scaling with a minimum percentage to ensure visibility
 44:         const minPercentage = 5; // Ensure even small files have a visible bar
 45:         percentage = Math.max(
 46:           minPercentage,
 47:           Math.min((tokenCount / maxTokenCount) * 100, 100)
 48:         );
 49:       }
 50:       setBarWidth(percentage);
 51:     }, 50);
 52:     
 53:     return () => clearTimeout(timer);
 54:   }, [tokenCount, maxTokenCount]);
 55: 
 56:   const handleCopy = async () => {
 57:     try {
 58:       await navigator.clipboard.writeText(content);
 59:       setCopied(true);
 60:       setTimeout(() => setCopied(false), 2000);
 61:     } catch (err) {
 62:       console.error("Failed to copy:", err);
 63:     }
 64:   };
 65: 
 66:   return (
 67:     <Card 
 68:       selected={isSelected} 
 69:       className={styles.fileCard}
 70:     >
 71:       <CardContent className={styles.fileCardContent}>
 72:         <div className={styles.fileCardHeader}>
 73:           <div className={styles.fileCardIcon}>
 74:             <FileText size={16} />
 75:           </div>
 76:           <div className={styles.fileCardName}>{name}</div>
 77:         </div>
 78:         <div className={styles.fileCardInfo}>
 79:           <div className={styles.fileCardTokens}>~{formattedTokens} tokens</div>
 80:           <div className={styles.tokenBarContainer}>
 81:             <div 
 82:               className={styles.tokenBar} 
 83:               style={{ width: `${barWidth}%` }}
 84:               title={`${tokenCount} tokens (${Math.round(barWidth)}% of largest file)`}
 85:             ></div>
 86:           </div>
 87:         </div>
 88: 
 89:         <div className={styles.fileCardActions}>
 90:           <Button
 91:             variant="ghost"
 92:             size="sm"
 93:             iconOnly
 94:             onClick={() => toggleSelection(filePath)}
 95:             title={isSelected ? "Remove from selection" : "Add to selection"}
 96:             startIcon={isSelected ? <X size={16} /> : <Plus size={16} />}
 97:             className={styles.fileCardAction}
 98:           />
 99:           <Button
100:             variant="ghost"
101:             size="sm"
102:             iconOnly
103:             onClick={handleCopy}
104:             title={copied ? "Copied!" : "Copy to clipboard"}
105:             startIcon={copied ? <Copy size={16} className={styles.copySuccess} /> : <Copy size={16} />}
106:             className={styles.fileCardAction}
107:           />
108:         </div>
109:       </CardContent>
110:     </Card>
111:   );
112: };
113: 
114: export default FileCard;
```

## File: src/components/FileList.tsx
```typescript
 1: import React from "react";
 2: import { FileListProps, FileData } from "../types/FileTypes";
 3: import FileCard from "./FileCard";
 4: import { arePathsEqual } from "../utils/pathUtils";
 5: import styles from "./FileList.module.css";
 6: 
 7: const FileList = ({
 8:   files,
 9:   selectedFiles,
10:   toggleFileSelection,
11: }: FileListProps) => {
12:   // Only show files that are in the selectedFiles array and not binary/skipped
13:   const displayableFiles = files.filter(
14:     (file: FileData) =>
15:       selectedFiles.some(selectedPath => arePathsEqual(selectedPath, file.path)) && 
16:       !file.isBinary && 
17:       !file.isSkipped,
18:   );
19: 
20:   // Find the maximum token count for relative scaling
21:   const maxTokenCount = displayableFiles.length > 0
22:     ? Math.max(...displayableFiles.map(file => file.tokenCount))
23:     : 5000; // Default if no files
24: 
25:   return (
26:     <div className={styles.fileListContainer}>
27:       {displayableFiles.length > 0 ? (
28:         <div className={styles.fileList}>
29:           {displayableFiles.map((file) => (
30:             <FileCard
31:               key={file.path}
32:               file={file}
33:               isSelected={true} // Always true since we're already filtering for selected files
34:               toggleSelection={toggleFileSelection}
35:               maxTokenCount={maxTokenCount}
36:             />
37:           ))}
38:         </div>
39:       ) : (
40:         <div className={styles.fileListEmpty}>
41:           No files selected. Select files from the sidebar to see them here.
42:         </div>
43:       )}
44:     </div>
45:   );
46: };
47: 
48: export default FileList;
```

## File: src/components/SearchBar.module.css
```css
 1: .searchBarWrapper {
 2:   width: 100%;
 3:   position: relative;
 4:   display: flex;
 5:   align-items: center;
 6:   background-color: var(--background-primary);
 7:   border: 1px solid var(--border-color);
 8:   border-radius: var(--radius);
 9:   height: 28px; /* Fixed height to fit in sidebar */
10:   transition: border-color 0.2s, box-shadow 0.2s;
11: }
12: 
13: .searchBarWrapper.focused {
14:   border-color: var(--accent-color);
15: }
16: 
17: .searchIcon {
18:   position: absolute;
19:   left: 8px;
20:   top: 50%;
21:   transform: translateY(-50%);
22:   color: var(--icon-color);
23:   display: flex;
24:   align-items: center;
25:   justify-content: center;
26:   pointer-events: none;
27:   z-index: 2;
28:   width: 14px;
29:   height: 14px;
30: }
31: 
32: .searchInput {
33:   width: 100%;
34:   padding: 0 28px 0 30px !important;
35:   height: 26px;
36:   border: none;
37:   border-radius: var(--radius);
38:   font-size: 13px;
39:   outline: none;
40:   background-color: transparent;
41:   color: var(--text-primary);
42: }
43: 
44: .searchInput:focus {
45:   border-color: var(--accent-color);
46:   box-shadow: 0 0 0 1px var(--accent-color);
47: }
48: 
49: .clearButton {
50:   position: absolute;
51:   right: 6px;
52:   top: 50%;
53:   transform: translateY(-50%);
54:   background: none;
55:   border: none;
56:   padding: 2px;
57:   color: var(--text-secondary);
58:   display: flex;
59:   align-items: center;
60:   justify-content: center;
61:   border-radius: 50%;
62:   cursor: pointer;
63:   z-index: 2;
64:   width: 16px;
65:   height: 16px;
66:   transition: color 0.2s ease, background-color 0.2s ease;
67: }
68: 
69: .clearButton:hover {
70:   color: var(--text-primary);
71:   background-color: var(--hover-color);
72: }
```

## File: src/components/TreeItem.module.css
```css
  1: .treeItem {
  2:   display: flex;
  3:   align-items: center;
  4:   padding: 4px 8px;
  5:   cursor: pointer;
  6:   font-size: 14px;
  7:   position: relative;
  8:   color: var(--text-primary);
  9:   transition: background-color 0.1s ease;
 10:   border-radius: 4px;
 11: }
 12: 
 13: .treeItem:hover {
 14:   background-color: var(--hover-color);
 15: }
 16: 
 17: .treeItemSelected {
 18:   background-color: var(--background-selected);
 19: }
 20: 
 21: /* When selected, extend background to full width */
 22: .treeItemSelected,
 23: .treeItem:hover {
 24:   margin-left: -8px;
 25:   margin-right: -8px;
 26:   padding-left: 16px;
 27:   padding-right: 16px;
 28:   width: calc(100% + 16px);
 29: }
 30: 
 31: .treeItemContent {
 32:   display: flex;
 33:   align-items: center;
 34:   width: 100%;
 35:   min-width: 0;
 36:   overflow: hidden;
 37: }
 38: 
 39: .treeItemIndent {
 40:   display: inline-block;
 41:   width: 16px;
 42:   flex-shrink: 0;
 43: }
 44: 
 45: .treeItemIcon {
 46:   display: flex;
 47:   align-items: center;
 48:   margin-right: 4px;
 49:   color: var(--icon-color);
 50:   flex-shrink: 0;
 51: }
 52: 
 53: .treeItemCheckbox {
 54:   margin-right: 4px;
 55:   cursor: pointer;
 56:   accent-color: var(--accent-color);
 57: }
 58: 
 59: .treeItemName {
 60:   overflow: hidden;
 61:   text-overflow: ellipsis;
 62:   white-space: nowrap;
 63:   flex-grow: 1;
 64:   font-size: 0.85rem;
 65: }
 66: 
 67: .treeItemTokens {
 68:   margin-left: 4px;
 69:   color: var(--text-secondary);
 70:   font-size: 0.75rem;
 71:   white-space: nowrap;
 72: }
 73: 
 74: .treeItemExpander {
 75:   cursor: pointer;
 76:   display: flex;
 77:   align-items: center;
 78:   justify-content: center;
 79:   width: 20px;
 80:   height: 20px;
 81:   margin-right: 4px;
 82:   transition: transform 0.15s ease-in-out;
 83:   color: var(--icon-color);
 84:   z-index: 2;
 85: }
 86: 
 87: .treeItemExpanderRotated {
 88:   transform: rotate(90deg);
 89: }
 90: 
 91: .fileIcon {
 92:   color: var(--text-secondary);
 93: }
 94: 
 95: .folderIcon {
 96:   color: var(--accent-color);
 97: }
 98: 
 99: .disabledItem {
100:   opacity: 0.5;
101:   cursor: not-allowed;
102: }
103: 
104: .treeItemBadge {
105:   font-size: 10px;
106:   padding: 1px 5px;
107:   border-radius: var(--radius);
108:   background-color: var(--hover-color);
109:   color: var(--text-secondary);
110:   margin-left: 6px;
111:   white-space: nowrap;
112: }
```

## File: src/components/UserInstructions.tsx
```typescript
 1: import React from "react";
 2: import styles from "./UserInstructions.module.css";
 3: 
 4: interface UserInstructionsProps {
 5:   instructions: string;
 6:   setInstructions: (value: string) => void;
 7: }
 8: 
 9: const UserInstructions = ({
10:   instructions,
11:   setInstructions,
12: }: UserInstructionsProps): JSX.Element => {
13:   return (
14:     <>
15:       <div className={styles.userInstructionsHeader}>
16:         <label className="content-title" htmlFor="userInstructionsInput">
17:           User Instructions
18:         </label>
19:       </div>
20:       <div className={styles.userInstructionsContainer}>
21:         <div className={styles.userInstructions}>
22:           <textarea
23:             id="userInstructionsInput"
24:             value={instructions}
25:             onChange={(e) => setInstructions(e.target.value)}
26:             placeholder="Add instructions to pass to the LLM about how to transform the content..."
27:             className={styles.textarea}
28:           />
29:         </div>
30:       </div>
31:     </>
32:   );
33: };
34: 
35: export default UserInstructions;
```

## File: src/utils/cn.ts
```typescript
 1: /**
 2:  * Merges class names conditionally
 3:  * @param classes - Array of class names or objects with class names as keys and booleans as values
 4:  * @returns Merged class names string
 5:  */
 6: export function cn(...classes: (string | boolean | undefined | null | { [key: string]: boolean })[]): string {
 7:   return classes
 8:     .filter(Boolean)
 9:     .map((item) => {
10:       if (typeof item === 'string') return item;
11:       if (typeof item === 'object' && item !== null) {
12:         return Object.entries(item)
13:           .filter(([, value]) => value)
14:           .map(([key]) => key)
15:           .join(' ');
16:       }
17:       return '';
18:     })
19:     .join(' ')
20:     .trim();
21: }
```

## File: src/declarations.d.ts
```typescript
 1: // Type declarations for external modules
 2: declare module "react";
 3: declare module "react-dom/client";
 4: declare module "react/jsx-runtime";
 5: declare module "electron";
 6: declare module "tiktoken";
 7: declare module "ignore";
 8: declare module "gpt-3-encoder";
 9: 
10: // Allow importing CSS files
11: declare module "*.css" {
12:   const content: { [className: string]: string };
13:   export default content;
14: }
15: 
16: // Allow importing various file types
17: declare module "*.svg" {
18:   const content: string;
19:   export default content;
20: }
21: 
22: declare module "*.png" {
23:   const content: string;
24:   export default content;
25: }
26: 
27: declare module "*.jpg" {
28:   const content: string;
29:   export default content;
30: }
31: 
32: // Add CSS module declarations
33: declare module '*.module.css' {
34:   const classes: { [key: string]: string };
35:   export default classes;
36: }
37: 
38: // React / TypeScript setup fixes
39: import 'react';
40: 
41: declare module 'react' {
42:   export type FC<P = Record<string, never>> = React.FunctionComponent<P>;
43:   
44:   export interface FunctionComponent<P = Record<string, never>> {
45:     (props: P, context?: any): React.ReactElement<any, any> | null;
46:     displayName?: string;
47:   }
48:   
49:   export type MouseEvent<T = Element> = React.MouseEvent<T>;
50:   export type ChangeEvent<T = Element> = React.ChangeEvent<T>;
51:   export type ReactElement = React.ReactElement;
52: }
```

## File: src/components/ui/Dropdown/Dropdown.module.css
```css
  1: .dropdown {
  2:   position: relative;
  3:   display: inline-flex;
  4:   vertical-align: middle;
  5: }
  6: 
  7: .button {
  8:   display: inline-flex;
  9:   align-items: center;
 10:   justify-content: center;
 11:   gap: 0.5rem;
 12:   padding: 0.5rem;
 13:   font-size: 0.875rem;
 14:   color: var(--icon-color);
 15:   border-radius: var(--radius);
 16:   cursor: pointer;
 17:   transition: all 0.15s ease;
 18:   background: transparent;
 19:   border: none;
 20:   height: 32px;
 21:   width: 32px;
 22: }
 23: 
 24: .button:hover:not(:disabled) {
 25:   background: var(--hover-color);
 26: }
 27: 
 28: .button:focus-visible {
 29:   outline: 2px solid var(--ring-color);
 30:   outline-offset: -1px;
 31: }
 32: 
 33: .button.active {
 34:   background: var(--hover-color);
 35: }
 36: 
 37: .buttonLabel {
 38:   flex: 1;
 39:   text-align: left;
 40:   overflow: hidden;
 41:   text-overflow: ellipsis;
 42:   white-space: nowrap;
 43: }
 44: 
 45: .chevron {
 46:   color: var(--text-secondary);
 47:   transition: transform 0.2s ease;
 48:   width: 16px;
 49:   height: 16px;
 50: }
 51: 
 52: .chevronOpen {
 53:   transform: rotate(180deg);
 54: }
 55: 
 56: .menu {
 57:   position: absolute;
 58:   top: 100%;
 59:   right: 0;
 60:   z-index: var(--z-index-dropdown);
 61:   min-width: 180px;
 62:   margin-top: 0.25rem;
 63:   padding: 0.375rem;
 64:   background: var(--background-primary);
 65:   border: 1px solid var(--border-color);
 66:   border-radius: var(--radius);
 67:   box-shadow: var(--shadow-md);
 68:   overflow-y: auto;
 69:   max-height: 300px;
 70:   animation: dropdownFadeIn 0.15s ease;
 71: }
 72: 
 73: .option {
 74:   display: flex;
 75:   align-items: center;
 76:   gap: 0.5rem;
 77:   padding: 0.5rem 0.75rem;
 78:   font-size: 0.875rem;
 79:   color: var(--text-primary);
 80:   cursor: pointer;
 81:   border-radius: var(--radius);
 82:   transition: background-color 0.1s ease;
 83:   user-select: none;
 84: }
 85: 
 86: .option:hover:not(.disabled) {
 87:   background: var(--hover-color);
 88: }
 89: 
 90: .option:focus {
 91:   outline: none;
 92:   background: var(--hover-color);
 93: }
 94: 
 95: .option.selected {
 96:   background: var(--background-selected);
 97:   color: var(--text-primary);
 98: }
 99: 
100: .option.disabled {
101:   opacity: 0.5;
102:   cursor: not-allowed;
103: }
104: 
105: .optionIcon {
106:   flex-shrink: 0;
107:   color: var(--icon-color);
108:   width: 16px;
109:   height: 16px;
110: }
111: 
112: .optionLabel {
113:   flex: 1;
114:   white-space: nowrap;
115:   overflow: hidden;
116:   text-overflow: ellipsis;
117: }
118: 
119: .checkmark {
120:   color: var(--accent-color);
121: }
122: 
123: /* Size variants */
124: .sm .button {
125:   height: 28px;
126:   width: 28px;
127:   padding: 0.25rem;
128: }
129: 
130: .lg .button {
131:   height: 36px;
132:   width: 36px;
133:   padding: 0.75rem;
134: }
135: 
136: @keyframes dropdownFadeIn {
137:   from {
138:     opacity: 0;
139:     transform: translateY(-2px);
140:   }
141:   to {
142:     opacity: 1;
143:     transform: translateY(0);
144:   }
145: }
146: 
147: /* Dark mode enhancements */
148: :global(.dark-mode) .menu {
149:   background: var(--dropdown-menu-background);
150:   border-color: var(--border-color);
151: }
152: 
153: :global(.dark-mode) .option:hover:not(.disabled) {
154:   background: var(--dropdown-item-hover);
155: }
156: 
157: /* Improved focus styles for keyboard navigation */
158: .option:focus-visible {
159:   outline: none;
160:   box-shadow: 0 0 0 2px var(--background-primary), 0 0 0 4px var(--ring-color);
161: }
162: 
163: /* Add subtle divider between groups of options if needed */
164: .option + .option {
165:   border-top: 1px solid transparent;
166: }
167: 
168: .option:hover + .option {
169:   border-top-color: transparent;
170: }
```

## File: src/components/IgnorePatterns.module.css
```css
  1: .modal {
  2:   position: fixed;
  3:   top: 0;
  4:   left: 0;
  5:   width: 100%;
  6:   height: 100%;
  7:   background-color: rgba(0, 0, 0, 0.5);
  8:   display: flex;
  9:   justify-content: center;
 10:   align-items: center;
 11:   z-index: var(--z-index-modal);
 12: }
 13: 
 14: .content {
 15:   background-color: var(--background-primary);
 16:   border-radius: var(--radius);
 17:   width: 90%;
 18:   max-width: 700px;
 19:   max-height: 90vh;
 20:   padding: 24px;
 21:   box-shadow: var(--shadow-lg);
 22:   overflow-y: auto;
 23: }
 24: 
 25: .header {
 26:   display: flex;
 27:   justify-content: space-between;
 28:   align-items: center;
 29:   margin-bottom: 16px;
 30: }
 31: 
 32: .header h2 {
 33:   margin: 0;
 34:   font-size: 1.5rem;
 35:   color: var(--text-primary);
 36: }
 37: 
 38: .description {
 39:   margin-bottom: 16px;
 40:   font-size: 0.9rem;
 41:   color: var(--text-secondary);
 42:   line-height: 1.4;
 43: }
 44: 
 45: .scopeSelector {
 46:   display: flex;
 47:   margin-bottom: 12px;
 48:   border-bottom: 1px solid var(--border-color);
 49:   padding: 0 4px;
 50:   gap: 1px;
 51: }
 52: 
 53: .scopeBtn {
 54:   flex: 1;
 55:   border-radius: var(--radius) var(--radius) 0 0 !important;
 56:   font-size: 0.95rem !important;
 57:   padding: 10px 15px !important;
 58:   transition: all 0.15s ease-out;
 59: }
 60: 
 61: .scopeBtn:first-child {
 62:   border-top-right-radius: 0 !important;
 63: }
 64: 
 65: .scopeBtn:last-child {
 66:   border-top-left-radius: 0 !important;
 67: }
 68: 
 69: .scopeBtn:hover {
 70:   background-color: var(--hover-color);
 71:   opacity: 0.9;
 72: }
 73: 
 74: .scopeBtn.active {
 75:   font-weight: 500 !important;
 76:   position: relative;
 77: }
 78: 
 79: .scopeBtn.active::after {
 80:   content: "";
 81:   position: absolute;
 82:   bottom: -1px;
 83:   left: 0;
 84:   width: 100%;
 85:   height: 2px;
 86:   background-color: var(--accent-color);
 87: }
 88: 
 89: .scopeDescription {
 90:   margin-bottom: 16px;
 91:   font-size: 0.85rem;
 92:   color: var(--text-secondary);
 93:   padding: 0 8px;
 94: }
 95: 
 96: .folderSelector {
 97:   margin-bottom: 16px;
 98: }
 99: 
100: .folderSelector label {
101:   display: block;
102:   margin-bottom: 6px;
103:   font-size: 0.9rem;
104:   font-weight: 500;
105:   color: var(--text-primary);
106: }
107: 
108: .customSelect {
109:   position: relative;
110:   width: 100%;
111:   cursor: pointer;
112: }
113: 
114: .selectedValue {
115:   display: flex;
116:   justify-content: space-between;
117:   align-items: center;
118:   padding: 10px 12px;
119:   background-color: var(--background-secondary);
120:   border: 1px solid var(--border-color);
121:   border-radius: var(--radius);
122:   font-size: 0.9rem;
123:   transition: border-color 0.2s;
124: }
125: 
126: .selectedValue:hover {
127:   border-color: var(--accent-color);
128: }
129: 
130: .chevron {
131:   transition: transform 0.2s;
132: }
133: 
134: .chevron.open {
135:   transform: rotate(180deg);
136: }
137: 
138: .optionsContainer {
139:   position: absolute;
140:   top: 100%;
141:   left: 0;
142:   right: 0;
143:   background-color: var(--background-primary);
144:   border: 1px solid var(--border-color);
145:   border-radius: var(--radius);
146:   box-shadow: var(--shadow-md);
147:   z-index: var(--z-index-dropdown);
148:   max-height: 200px;
149:   overflow-y: auto;
150: }
151: 
152: .option {
153:   padding: 8px 12px;
154:   font-size: 0.9rem;
155:   cursor: pointer;
156: }
157: 
158: .option:hover {
159:   background-color: var(--hover-color);
160: }
161: 
162: .pathDisplay {
163:   margin-top: 4px;
164:   font-size: 0.8rem;
165:   color: var(--text-secondary);
166:   font-family: monospace;
167: }
168: 
169: .patternsSection {
170:   margin-bottom: 20px;
171: }
172: 
173: .patternsInput {
174:   width: 100%;
175:   height: 200px;
176:   font-family: monospace;
177:   font-size: 14px;
178:   padding: 12px;
179:   background-color: var(--background-primary);
180:   color: var(--text-primary);
181:   border: 1px solid var(--border-color);
182:   border-radius: var(--radius);
183:   resize: vertical;
184: }
185: 
186: .patternsInput:focus {
187:   outline: none;
188:   border-color: var(--accent-color);
189:   box-shadow: 0 0 0 1px var(--accent-color);
190: }
191: 
192: .patternComment {
193:   color: var(--text-secondary);
194: }
195: 
196: .patternsHelp {
197:   margin-top: 8px;
198:   font-size: 0.8rem;
199:   color: var(--text-secondary);
200: }
201: 
202: .patternsHelp p {
203:   margin: 4px 0;
204: }
205: 
206: .modalStatus {
207:   margin-bottom: 16px;
208:   min-height: 20px;
209: }
210: 
211: .unsaved {
212:   color: var(--warning-color);
213:   font-size: 0.85rem;
214: }
215: 
216: .modalActions {
217:   display: flex;
218:   justify-content: center;
219:   gap: 12px;
220:   margin-top: 24px;
221:   padding: 0 12px;
222: }
223: 
224: .modalActions button {
225:   min-width: 100px;
226: }
227: 
228: .destructiveIcon {
229:   color: var(--error-color);
230: }
231: 
232: /* We'll override these with our Button component */
```

## File: src/components/Sidebar.module.css
```css
  1: .sidebar {
  2:   display: flex;
  3:   flex-direction: column;
  4:   height: 100%;
  5:   border-right: 1px solid var(--border-color);
  6:   background: var(--background-primary);
  7:   position: relative;
  8: }
  9: 
 10: .sidebarSearch {
 11:   padding: 6px 8px;
 12:   border-bottom: 1px solid var(--border-color);
 13:   height: 40px;
 14:   display: flex;
 15:   align-items: center;
 16: }
 17: 
 18: .sidebarActions {
 19:   display: flex;
 20:   padding: 6px 8px;
 21:   gap: 8px;
 22:   border-bottom: 1px solid var(--border-color);
 23:   justify-content: center;
 24:   align-items: center;
 25:   height: 40px;
 26: }
 27: 
 28: .fileTree {
 29:   flex: 1;
 30:   overflow-y: auto;
 31:   padding: 8px 0;
 32: }
 33: 
 34: .treeEmpty {
 35:   padding: 16px;
 36:   text-align: center;
 37:   color: var(--text-secondary);
 38: }
 39: 
 40: .treeLoading {
 41:   display: flex;
 42:   flex-direction: column;
 43:   align-items: center;
 44:   justify-content: center;
 45:   padding: 32px;
 46:   gap: 16px;
 47:   color: var(--text-secondary);
 48: }
 49: 
 50: .spinner {
 51:   border: 2px solid var(--border-color);
 52:   border-top: 2px solid var(--text-primary);
 53:   border-radius: 50%;
 54:   width: 24px;
 55:   height: 24px;
 56:   animation: spin 1s linear infinite;
 57: }
 58: 
 59: .sidebarEmptyState {
 60:   display: flex;
 61:   flex-direction: column;
 62:   align-items: center;
 63:   justify-content: center;
 64:   height: 100%;
 65:   padding: 32px;
 66:   text-align: center;
 67:   gap: 16px;
 68:   color: var(--text-secondary);
 69: }
 70: 
 71: .sidebarEmptyIcon {
 72:   color: var(--text-secondary);
 73:   opacity: 0.5;
 74: }
 75: 
 76: .sidebarResizeHandle {
 77:   position: absolute;
 78:   right: -4px;
 79:   top: 0;
 80:   bottom: 0;
 81:   width: 8px;
 82:   cursor: col-resize;
 83:   background: transparent;
 84:   transition: background-color 0.2s;
 85: }
 86: 
 87: .sidebarResizeHandle:hover {
 88:   background: var(--accent);
 89: }
 90: 
 91: @keyframes spin {
 92:   0% { transform: rotate(0deg); }
 93:   100% { transform: rotate(360deg); }
 94: }
 95: 
 96: .excludedFilesIndicator {
 97:   font-size: 0.75rem;
 98:   color: var(--text-secondary);
 99:   padding: 6px 8px;
100:   margin: 4px 8px;
101:   text-align: center;
102:   font-style: italic;
103:   opacity: 0.7;
104:   background-color: var(--background-secondary);
105:   border-radius: var(--radius);
106: }
107: 
108: .excludedFilesMessage {
109:   font-size: 0.75rem;
110:   color: var(--text-secondary);
111:   padding: 4px 8px;
112:   text-align: center;
113:   font-style: italic;
114:   opacity: 0.7;
115:   border-bottom: 1px solid var(--border-color);
116: }
```

## File: src/utils/pathUtils.ts
```typescript
  1: /**
  2:  * Browser-compatible path utilities to replace Node.js path module
  3:  */
  4: 
  5: import { FileTreeMode } from "../types/FileTypes";
  6: 
  7: /**
  8:  * Normalizes a file path to use forward slashes regardless of operating system
  9:  * This helps with path comparison across different platforms
 10:  * 
 11:  * @param filePath The file path to normalize
 12:  * @returns The normalized path with forward slashes
 13:  */
 14: export function normalizePath(filePath: string): string {
 15:   if (!filePath) return filePath;
 16:   
 17:   // Replace backslashes with forward slashes
 18:   return filePath.replace(/\\/g, '/');
 19: }
 20: 
 21: /**
 22:  * Detects the operating system
 23:  * 
 24:  * @returns The detected operating system ('windows', 'mac', 'linux', or 'unknown')
 25:  */
 26: export function detectOS(): 'windows' | 'mac' | 'linux' | 'unknown' {
 27:   if (typeof window !== 'undefined' && window.navigator) {
 28:     const platform = window.navigator.platform.toLowerCase();
 29:     
 30:     if (platform.includes('win')) {
 31:       return 'windows';
 32:     } else if (platform.includes('mac')) {
 33:       return 'mac';
 34:     } else if (platform.includes('linux')) {
 35:       return 'linux';
 36:     }
 37:   }
 38:   
 39:   return 'unknown';
 40: }
 41: 
 42: /**
 43:  * Compares two paths for equality, handling different OS path separators
 44:  * 
 45:  * @param path1 First path to compare
 46:  * @param path2 Second path to compare
 47:  * @returns True if the paths are equivalent, false otherwise
 48:  */
 49: export function arePathsEqual(path1: string, path2: string): boolean {
 50:   return normalizePath(path1) === normalizePath(path2);
 51: }
 52: 
 53: /**
 54:  * Extract the basename from a path string
 55:  * @param path The path to extract the basename from
 56:  * @returns The basename (last part of the path)
 57:  */
 58: export function basename(path: string | null | undefined): string {
 59:   if (!path) return "";
 60: 
 61:   // Ensure path is a string
 62:   const pathStr = String(path);
 63: 
 64:   // Handle both forward and backslashes
 65:   const normalizedPath = pathStr.replace(/\\/g, "/");
 66:   // Remove trailing slashes
 67:   const trimmedPath = normalizedPath.endsWith("/")
 68:     ? normalizedPath.slice(0, -1)
 69:     : normalizedPath;
 70:   // Get the last part after the final slash
 71:   const parts = trimmedPath.split("/");
 72:   return parts[parts.length - 1] || "";
 73: }
 74: 
 75: /**
 76:  * Extract the directory name from a path string
 77:  * @param path The path to extract the directory from
 78:  * @returns The directory (everything except the last part)
 79:  */
 80: export function dirname(path: string | null | undefined): string {
 81:   if (!path) return ".";
 82: 
 83:   // Ensure path is a string
 84:   const pathStr = String(path);
 85: 
 86:   // Handle both forward and backslashes
 87:   const normalizedPath = pathStr.replace(/\\/g, "/");
 88:   // Remove trailing slashes
 89:   const trimmedPath = normalizedPath.endsWith("/")
 90:     ? normalizedPath.slice(0, -1)
 91:     : normalizedPath;
 92:   // Get everything before the final slash
 93:   const lastSlashIndex = trimmedPath.lastIndexOf("/");
 94:   return lastSlashIndex === -1 ? "." : trimmedPath.slice(0, lastSlashIndex);
 95: }
 96: 
 97: /**
 98:  * Join path segments together
 99:  * @param segments The path segments to join
100:  * @returns The joined path
101:  */
102: export function join(...segments: (string | null | undefined)[]): string {
103:   return segments
104:     .filter(Boolean)
105:     .map((seg) => String(seg))
106:     .join("/")
107:     .replace(/\/+/g, "/"); // Replace multiple slashes with a single one
108: }
109: 
110: /**
111:  * Get the file extension
112:  * @param path The path to get the extension from
113:  * @returns The file extension including the dot
114:  */
115: export function extname(path: string | null | undefined): string {
116:   if (!path) return "";
117: 
118:   const basenameValue = basename(path);
119:   const dotIndex = basenameValue.lastIndexOf(".");
120:   return dotIndex === -1 || dotIndex === 0 ? "" : basenameValue.slice(dotIndex);
121: }
122: 
123: /**
124:  * Generate an ASCII representation of the file tree for the selected files
125:  * @param files Array of selected FileData objects
126:  * @param rootPath The root directory path
127:  * @param mode The FileTreeMode to use for generation
128:  * @returns ASCII string representing the file tree
129:  */
130: export function generateAsciiFileTree(
131:   files: { path: string }[], 
132:   rootPath: string,
133:   mode: FileTreeMode = "selected"
134: ): string {
135:   if (!files.length) return "No files selected.";
136: 
137:   // Normalize the root path for consistent path handling
138:   const normalizedRoot = rootPath.replace(/\\/g, "/").replace(/\/$/, "");
139:   
140:   // Create a tree structure from the file paths
141:   interface TreeNode {
142:     name: string;
143:     isFile: boolean;
144:     children: Record<string, TreeNode>;
145:     // Add a flag to identify if this node contains a selected file
146:     hasSelectedFile?: boolean;
147:   }
148:   
149:   const root: TreeNode = { 
150:     name: basename(normalizedRoot), 
151:     isFile: false, 
152:     children: {},
153:     hasSelectedFile: false
154:   };
155:   
156:   // Insert a file path into the tree
157:   const insertPath = (filePath: string, node: TreeNode, isSelected: boolean = true) => {
158:     const normalizedPath = filePath.replace(/\\/g, "/");
159:     if (!normalizedPath.startsWith(normalizedRoot)) return;
160:     
161:     const relativePath = normalizedPath.substring(normalizedRoot.length).replace(/^\//, "");
162:     if (!relativePath) return;
163:     
164:     const pathParts = relativePath.split("/");
165:     let currentNode = node;
166:     
167:     for (let i = 0; i < pathParts.length; i++) {
168:       const part = pathParts[i];
169:       const isFile = i === pathParts.length - 1;
170:       
171:       if (!currentNode.children[part]) {
172:         currentNode.children[part] = {
173:           name: part,
174:           isFile,
175:           children: {},
176:           hasSelectedFile: isSelected && isFile
177:         };
178:       }
179:       
180:       // If this file is selected, mark this node and all parent nodes
181:       if (isSelected && isFile && i === pathParts.length - 1) {
182:         currentNode.children[part].hasSelectedFile = true;
183:       }
184:       
185:       currentNode = currentNode.children[part];
186:     }
187:     
188:     // Mark parent directories as having selected files
189:     if (isSelected) {
190:       let tempNode = node;
191:       for (let i = 0; i < pathParts.length - 1; i++) {
192:         const part = pathParts[i];
193:         if (tempNode.children[part]) {
194:           tempNode.children[part].hasSelectedFile = true;
195:           tempNode = tempNode.children[part];
196:         }
197:       }
198:     }
199:   };
200:   
201:   // Insert files into the tree based on the mode
202:   if (mode === "complete") {
203:     // In complete mode, insert all files, marking the selected ones
204:     files.forEach(file => {
205:       // Determine if this file is among the selected files
206:       // This requires a full list of files, where some might be selected and others not
207:       const isSelected = "selected" in file ? Boolean(file.selected) : true;
208:       insertPath(file.path, root, isSelected);
209:     });
210:   } else {
211:     // In selected mode or selected-with-roots mode, all files we're given are selected
212:     files.forEach(file => insertPath(file.path, root, true));
213:   }
214:   
215:   // Generate ASCII representation
216:   const generateAscii = (node: TreeNode, prefix = "", isLast = true, isRoot = true): string => {
217:     // For selected-with-roots mode, only include nodes that have selected files
218:     if (mode === "selected-with-roots" && !node.hasSelectedFile && !isRoot) {
219:       return "";
220:     }
221:     
222:     if (!isRoot) {
223:       let result = prefix;
224:       result += isLast ? "└── " : "├── ";
225:       result += node.name;
226:       
227:       // In complete mode, mark selected files with a '*'
228:       if (mode === "complete" && node.hasSelectedFile && node.isFile) {
229:         result += " *";
230:       }
231:       
232:       result += "\n";
233:       prefix += isLast ? "    " : "│   ";
234:       
235:       const children = Object.values(node.children).sort((a, b) => {
236:         // Sort by type (directories first) then by name
237:         if (a.isFile !== b.isFile) {
238:           return a.isFile ? 1 : -1;
239:         }
240:         return a.name.localeCompare(b.name);
241:       });
242:       
243:       return result + children
244:         .map((child, index) =>
245:           generateAscii(child, prefix, index === children.length - 1, false)
246:         )
247:         .join("");
248:     } else {
249:       // Root node special handling
250:       const children = Object.values(node.children).sort((a, b) => {
251:         // Sort by type (directories first) then by name
252:         if (a.isFile !== b.isFile) {
253:           return a.isFile ? 1 : -1;
254:         }
255:         return a.name.localeCompare(b.name);
256:       });
257:       
258:       return children
259:         .map((child, index) => {
260:           // For selected-with-roots mode, only include nodes that have selected files
261:           if (mode === "selected-with-roots" && !child.hasSelectedFile) {
262:             return "";
263:           }
264:           return generateAscii(child, prefix, index === children.length - 1, false);
265:         })
266:         .join("");
267:     }
268:   };
269:   
270:   return generateAscii(root);
271: }
```

## File: src/react-app-env.d.ts
```typescript
 1: /// <reference types="react" />
 2: /// <reference types="react-dom" />
 3: /// <reference types="react-scripts" />
 4: 
 5: // Add missing TypeScript definitions
 6: declare namespace React {
 7:   interface MouseEvent<T extends Element> extends globalThis.MouseEvent {
 8:     currentTarget: T;
 9:   }
10:   interface ChangeEvent<T extends Element> extends Event {
11:     target: T;
12:   }
13: }
14: 
15: // Fix the type parameters that are unused
16: interface ImportMeta {
17:    
18:   readonly hot: {
19:     readonly data: any;
20:     accept(): void;
21:     accept(cb: (dependencies: any) => void): void;
22:     accept(path: string, cb: (dependencies: any) => void): void;
23:   };
24: }
25: 
26: declare module '*.module.css' {
27:   const classes: Record<string, string>;
28:   export default classes;
29: }
30: 
31: declare module '*.svg' {
32:   const content: string;
33:   export default content;
34: }
35: 
36: declare module '*.png' {
37:   const content: string;
38:   export default content;
39: }
40: 
41: declare module '*.jpg' {
42:   const content: string;
43:   export default content;
44: }
45: 
46: declare module '*.jpeg' {
47:   const content: string;
48:   export default content;
49: }
50: 
51: declare module '*.gif' {
52:   const content: string;
53:   export default content;
54: }
55: 
56: declare module '*.webp' {
57:   const content: string;
58:   export default content;
59: }
60: 
61: declare module '*.ico' {
62:   const content: string;
63:   export default content;
64: }
65: 
66: declare module '*.bmp' {
67:   const content: string;
68:   export default content;
69: }
```

## File: src/components/ui/Dropdown/Dropdown.tsx
```typescript
  1: import React, { useEffect, useRef, useState, useCallback } from 'react';
  2: import { ChevronDown } from 'lucide-react';
  3: import { cn } from '../../../utils/cn';
  4: import styles from './Dropdown.module.css';
  5: 
  6: export interface DropdownOption {
  7:   label: string;
  8:   value: string;
  9:   icon?: React.ReactNode;
 10:   disabled?: boolean;
 11: }
 12: 
 13: export interface DropdownProps {
 14:   /**
 15:    * Array of options to display in the dropdown
 16:    */
 17:   options: DropdownOption[];
 18:   
 19:   /**
 20:    * Currently selected value(s)
 21:    */
 22:   value?: string | string[];
 23:   
 24:   /**
 25:    * Callback when selection changes
 26:    */
 27:   onChange: (value: string | string[]) => void;
 28:   
 29:   /**
 30:    * Optional placeholder text when no option is selected
 31:    */
 32:   placeholder?: string;
 33:   
 34:   /**
 35:    * Whether the dropdown supports multiple selections
 36:    * @default false
 37:    */
 38:   multiple?: boolean;
 39:   
 40:   /**
 41:    * Optional title for the dropdown button (for accessibility)
 42:    */
 43:   title?: string;
 44:   
 45:   /**
 46:    * Optional custom trigger element
 47:    */
 48:   trigger?: React.ReactNode;
 49:   
 50:   /**
 51:    * Optional custom class name for the dropdown container
 52:    */
 53:   className?: string;
 54:   
 55:   /**
 56:    * Optional custom class name for the dropdown menu
 57:    */
 58:   menuClassName?: string;
 59:   
 60:   /**
 61:    * Optional size variant
 62:    * @default 'md'
 63:    */
 64:   size?: 'sm' | 'md' | 'lg';
 65:   
 66:   /**
 67:    * Optional style variant
 68:    * @default 'default'
 69:    */
 70:   variant?: string;
 71:   
 72:   /**
 73:    * Optional icon to display in the dropdown
 74:    */
 75:   icon?: React.ReactNode;
 76:   
 77:   /**
 78:    * Whether the dropdown is disabled
 79:    * @default false
 80:    */
 81:   disabled?: boolean;
 82:   
 83:   /**
 84:    * Optional maximum height for the dropdown menu in pixels
 85:    * @default 300
 86:    */
 87:   maxHeight?: number;
 88: }
 89: 
 90: export const Dropdown: React.FC<DropdownProps> = ({
 91:   options,
 92:   value,
 93:   onChange,
 94:   placeholder = 'Select option',
 95:   multiple = false,
 96:   title,
 97:   trigger,
 98:   className,
 99:   menuClassName,
100:   size = 'md',
101:   disabled = false,
102:   maxHeight = 300,
103: }) => {
104:   const [isOpen, setIsOpen] = useState(false);
105:   const dropdownRef = useRef<HTMLDivElement>(null);
106:   const menuRef = useRef<HTMLDivElement>(null);
107:   
108:   // Handle click outside to close dropdown
109:   useEffect(() => {
110:     const handleClickOutside = (event: MouseEvent) => {
111:       if (
112:         dropdownRef.current &&
113:         !dropdownRef.current.contains(event.target as Node)
114:       ) {
115:         setIsOpen(false);
116:       }
117:     };
118:     
119:     if (isOpen) {
120:       document.addEventListener('mousedown', handleClickOutside);
121:       return () => document.removeEventListener('mousedown', handleClickOutside);
122:     }
123:   }, [isOpen]);
124:   
125:   const handleSelect = useCallback((option: DropdownOption) => {
126:     if (!option.disabled) {
127:       onChange(option.value);
128:       setIsOpen(false);
129:     }
130:   }, [onChange]);
131: 
132:   const handleKeyDown = useCallback((event: KeyboardEvent) => {
133:     const optionElements = Array.from(dropdownRef.current?.querySelectorAll('[role="option"]') || []);
134:     const currentIndex = optionElements.findIndex(opt => opt === document.activeElement);
135: 
136:     switch (event.key) {
137:       case 'ArrowDown': {
138:         event.preventDefault();
139:         const nextIndex = currentIndex + 1 < optionElements.length ? currentIndex + 1 : 0;
140:         (optionElements[nextIndex] as HTMLElement).focus();
141:         break;
142:       }
143:       case 'ArrowUp': {
144:         event.preventDefault();
145:         const prevIndex = currentIndex > 0 ? currentIndex - 1 : optionElements.length - 1;
146:         (optionElements[prevIndex] as HTMLElement).focus();
147:         break;
148:       }
149:       case 'Enter':
150:       case 'Space': {
151:         event.preventDefault();
152:         const focusedOption = document.activeElement as HTMLDivElement;
153:         if (focusedOption?.dataset?.value) {
154:           const optionValue = focusedOption.dataset.value;
155:           const foundOption = options.find(opt => opt.value === optionValue);
156:           if (foundOption) {
157:             handleSelect(foundOption);
158:           }
159:         }
160:         break;
161:       }
162:       case 'Escape': {
163:         event.preventDefault();
164:         setIsOpen(false);
165:         break;
166:       }
167:     }
168:   }, [handleSelect, options]);
169: 
170:   useEffect(() => {
171:     if (isOpen) {
172:       document.addEventListener('keydown', handleKeyDown);
173:       return () => document.removeEventListener('keydown', handleKeyDown);
174:     }
175:   }, [isOpen, handleKeyDown]);
176:   
177:   const getSelectedLabel = () => {
178:     if (multiple) {
179:       const selectedCount = Array.isArray(value) ? value.length : 0;
180:       return selectedCount > 0
181:         ? `${selectedCount} selected`
182:         : placeholder;
183:     }
184:     
185:     const selectedOption = options.find(opt => opt.value === value);
186:     return selectedOption ? selectedOption.label : placeholder;
187:   };
188:   
189:   const isSelected = (optionValue: string) => {
190:     if (multiple) {
191:       return Array.isArray(value) && value.includes(optionValue);
192:     }
193:     return value === optionValue;
194:   };
195:   
196:   return (
197:     <div
198:       ref={dropdownRef}
199:       className={cn(
200:         styles.dropdown,
201:         styles[size],
202:         disabled && styles.disabled,
203:         className
204:       )}
205:     >
206:       {trigger ? (
207:         <div
208:           onClick={() => !disabled && setIsOpen(!isOpen)}
209:           className={cn(styles.trigger, isOpen && styles.active)}
210:         >
211:           {trigger}
212:         </div>
213:       ) : (
214:         <button
215:           type="button"
216:           className={cn(
217:             styles.button,
218:             isOpen && styles.active,
219:             size && styles[size],
220:             disabled && styles.disabled,
221:             className
222:           )}
223:           onClick={() => !disabled && setIsOpen(!isOpen)}
224:           aria-haspopup="listbox"
225:           aria-expanded={isOpen}
226:           disabled={disabled}
227:           title={title}
228:         >
229:           <span className={styles.buttonLabel}>{getSelectedLabel()}</span>
230:           <ChevronDown
231:             size={16}
232:             className={cn(styles.chevron, isOpen && styles.chevronOpen)}
233:           />
234:         </button>
235:       )}
236:       
237:       {isOpen && (
238:         <div
239:           ref={menuRef}
240:           className={cn(styles.menu, menuClassName)}
241:           style={{ maxHeight }}
242:           role="listbox"
243:           aria-multiselectable={multiple}
244:         >
245:           {options.map((option) => (
246:             <div
247:               key={option.value}
248:               className={cn(
249:                 styles.option,
250:                 isSelected(option.value) && styles.selected,
251:                 option.disabled && styles.disabled
252:               )}
253:               onClick={() => handleSelect(option)}
254:               role="option"
255:               aria-selected={isSelected(option.value)}
256:               tabIndex={0}
257:               data-value={option.value}
258:             >
259:               {option.icon && (
260:                 <span className={styles.optionIcon}>{option.icon}</span>
261:               )}
262:               <span className={styles.optionLabel}>{option.label}</span>
263:               {multiple && isSelected(option.value) && (
264:                 <span className={styles.checkmark}>✓</span>
265:               )}
266:             </div>
267:           ))}
268:         </div>
269:       )}
270:     </div>
271:   );
272: };
```

## File: src/components/ui/index.ts
```typescript
1: export { Button } from './Button';
2: export { Switch } from './Switch';
3: export { ButtonGroup } from './ButtonGroup';
4: export * from './Input';
5: export * from './Card';
6: export * from './Dialog';
7: export * from './Dropdown';
```

## File: src/components/ui/Button/Button.tsx
```typescript
 1: import React from 'react';
 2: import { cn } from '../../../utils/cn';
 3: import styles from './Button.module.css';
 4: 
 5: export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'round' | 'icon';
 6: export type ButtonSize = 'sm' | 'md' | 'lg';
 7: 
 8: export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 9:   /**
10:    * Button visual variant
11:    * @default 'primary'
12:    */
13:   variant?: ButtonVariant;
14:   
15:   /**
16:    * Button size
17:    * @default 'md'
18:    */
19:   size?: ButtonSize;
20:   
21:   /**
22:    * Optional icon to display before the button text
23:    */
24:   startIcon?: React.ReactNode;
25:   
26:   /**
27:    * Optional icon to display after the button text
28:    */
29:   endIcon?: React.ReactNode;
30:   
31:   /**
32:    * If true, button will have equal width and height, and padding will be adjusted
33:    * Useful for icon-only buttons
34:    * @default false
35:    */
36:   iconOnly?: boolean;
37:   
38:   /**
39:    * If true, button will have fully rounded corners (pill shape)
40:    * Note: Round variant will always be pill-shaped regardless of this prop
41:    * @default false
42:    */
43:   pill?: boolean;
44:   
45:   /**
46:    * Button children (text content or other elements)
47:    */
48:   children?: React.ReactNode;
49: }
50: 
51: /**
52:  * Primary UI component for user interaction.
53:  * Supports multiple variants (primary, secondary, ghost, destructive, round) and sizes.
54:  * Round variant is always pill-shaped and inherits primary colors with enhanced styling.
55:  */
56: export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
57:   (
58:     {
59:       className,
60:       variant = 'primary',
61:       size = 'md',
62:       startIcon,
63:       endIcon,
64:       iconOnly = false,
65:       pill = false,
66:       children,
67:       ...props
68:     },
69:     ref
70:   ) => {
71:     // Force pill shape for round variant
72:     const isPill = variant === 'round' ? true : pill;
73:     
74:     return (
75:       <button
76:         className={cn(
77:           styles.button,
78:           // Round variant inherits primary colors but adds its own enhancements
79:           styles[variant === 'round' ? 'primary' : variant],
80:           styles[size],
81:           iconOnly && styles.iconOnly,
82:           isPill && styles.pill,
83:           variant === 'round' && styles.round,
84:           className
85:         )}
86:         ref={ref}
87:         {...props}
88:       >
89:         {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
90:         {children}
91:         {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
92:       </button>
93:     );
94:   }
95: );
96: 
97: Button.displayName = 'Button';
```

## File: src/context/ThemeContext.tsx
```typescript
 1: import React, { useState, useEffect } from "react";
 2: import { ThemeType, ThemeContext } from "./ThemeContextType";
 3: 
 4: export const ThemeProvider = ({
 5:   children,
 6: }: {
 7:   children: React.ReactNode;
 8: }): JSX.Element => {
 9:   // Initialize theme from localStorage or default to "system"
10:   const [theme, setThemeState] = useState<ThemeType>(() => {
11:     const savedTheme = localStorage.getItem("theme") as ThemeType;
12:     return savedTheme && ["light", "dark", "system"].includes(savedTheme) ? savedTheme : "system";
13:   });
14:   
15:   const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
16: 
17:   // Function to set theme and save to localStorage
18:   const setTheme = (newTheme: ThemeType) => {
19:     setThemeState(newTheme);
20:     localStorage.setItem("theme", newTheme);
21:   };
22: 
23:   // Effect to apply the correct theme based on selection or system preference
24:   useEffect(() => {
25:     const applyTheme = (themeName: "light" | "dark") => {
26:       setCurrentTheme(themeName);
27:       
28:       if (themeName === "dark") {
29:         document.body.classList.add("dark-mode");
30:       } else {
31:         document.body.classList.remove("dark-mode");
32:       }
33:     };
34:     
35:     // Check for system preference
36:     const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
37:     
38:     // Apply theme based on selection or system preference
39:     if (theme === "system") {
40:       applyTheme(prefersDark ? "dark" : "light");
41:     } else {
42:       applyTheme(theme as "light" | "dark");
43:     }
44:     
45:     // Listen for system preference changes if in auto mode
46:     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
47:     
48:     const handleSystemThemeChange = (e: MediaQueryListEvent) => {
49:       if (theme === "system") {
50:         applyTheme(e.matches ? "dark" : "light");
51:       }
52:     };
53:     
54:     mediaQuery.addEventListener("change", handleSystemThemeChange);
55:     
56:     return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
57:   }, [theme]);
58: 
59:   return (
60:     <ThemeContext.Provider value={{ theme, currentTheme, setTheme }}>
61:       {children}
62:     </ThemeContext.Provider>
63:   );
64: };
```

## File: src/components/TreeItem.tsx
```typescript
  1: import React, {
  2:   useRef,
  3:   useEffect,
  4: } from "react";
  5: import { TreeItemProps, TreeNode } from "../types/FileTypes";
  6: import { ChevronRight, File, Folder } from "lucide-react";
  7: import { arePathsEqual } from "../utils/pathUtils";
  8: import styles from "./TreeItem.module.css";
  9: 
 10: const TreeItem = ({
 11:   node,
 12:   selectedFiles,
 13:   toggleFileSelection,
 14:   toggleFolderSelection,
 15:   toggleExpanded,
 16: }: TreeItemProps) => {
 17:   const { id, name, path, type, depth, isExpanded, fileData } = node;
 18:   const checkboxRef = useRef<HTMLInputElement>(null);
 19: 
 20:   const isSelected = type === "file" && selectedFiles.some(selectedPath => 
 21:     arePathsEqual(selectedPath, path)
 22:   );
 23: 
 24:   // Check if file is disabled (excluded by patterns)
 25:   const isDisabled = fileData?.excluded || false;
 26: 
 27:   // Recursive function to check if all files in a directory are selected
 28:   const areAllFilesInDirectorySelected = (node: TreeNode): boolean => {
 29:     if (node.type === "file") {
 30:       return selectedFiles.some(selectedPath =>
 31:         arePathsEqual(selectedPath, node.path)
 32:       );
 33:     }
 34: 
 35:     if (
 36:       node.type === "directory" &&
 37:       node.children &&
 38:       node.children.length > 0
 39:     ) {
 40:       return node.children.every(child =>
 41:         areAllFilesInDirectorySelected(child)
 42:       );
 43:     }
 44: 
 45:     return false;
 46:   };
 47: 
 48:   // Recursive function to check if any file in a directory is selected
 49:   const isAnyFileInDirectorySelected = (node: TreeNode): boolean => {
 50:     if (node.type === "file") {
 51:       return selectedFiles.some(selectedPath =>
 52:         arePathsEqual(selectedPath, node.path)
 53:       );
 54:     }
 55: 
 56:     if (
 57:       node.type === "directory" &&
 58:       node.children &&
 59:       node.children.length > 0
 60:     ) {
 61:       return node.children.some(child => isAnyFileInDirectorySelected(child));
 62:     }
 63: 
 64:     return false;
 65:   };
 66: 
 67:   // For directories, check if all children are selected
 68:   const isDirectorySelected =
 69:     type === "directory" && node.children && node.children.length > 0
 70:       ? areAllFilesInDirectorySelected(node)
 71:       : false;
 72: 
 73:   // Check if some but not all files in this directory are selected
 74:   const isDirectoryPartiallySelected =
 75:     type === "directory" && node.children && node.children.length > 0
 76:       ? isAnyFileInDirectorySelected(node) && !isDirectorySelected
 77:       : false;
 78: 
 79:   // Update the indeterminate state manually whenever it changes
 80:   useEffect(() => {
 81:     if (checkboxRef.current) {
 82:       checkboxRef.current.indeterminate = isDirectoryPartiallySelected;
 83:     }
 84:   }, [isDirectoryPartiallySelected]);
 85: 
 86:   const handleToggle = (e: React.MouseEvent<HTMLDivElement>): void => {
 87:     e.stopPropagation();
 88:     toggleExpanded(id);
 89:   };
 90: 
 91:   const handleItemClick = (e: React.MouseEvent<HTMLDivElement>): void => {
 92:     e.stopPropagation();
 93:     if (type === "directory") {
 94:       toggleExpanded(id);
 95:     } else if (type === "file" && !isDisabled) {
 96:       toggleFileSelection(path);
 97:     }
 98:   };
 99: 
100:   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
101:     e.stopPropagation();
102:     if (type === "file") {
103:       toggleFileSelection(path);
104:     } else if (type === "directory") {
105:       toggleFolderSelection(path, e.target.checked);
106:     }
107:   };
108: 
109:   const handleCheckboxClick = (e: React.MouseEvent<HTMLInputElement>): void => {
110:     e.stopPropagation();
111:   };
112: 
113:   // Generate indentation for nested levels
114:   const indentation = [];
115:   for (let i = 0; i < depth; i++) {
116:     indentation.push(
117:       <span key={`indent-${i}`} className={styles.treeItemIndent} />
118:     );
119:   }
120: 
121:   return (
122:     <div
123:       className={`${styles.treeItem} ${
124:         (isSelected || isDirectorySelected) ? styles.treeItemSelected : ""
125:       } ${isDisabled ? styles.disabledItem : ""}`}
126:       onClick={handleItemClick}
127:       data-testid={`tree-item-${name}`}
128:     >
129:       <div className={styles.treeItemContent}>
130:         {indentation}
131: 
132:         {type === "directory" && (
133:           <div
134:             className={`${styles.treeItemExpander} ${
135:               isExpanded ? styles.treeItemExpanderRotated : ""
136:             }`}
137:             onClick={handleToggle}
138:           >
139:             <ChevronRight size={14} />
140:           </div>
141:         )}
142: 
143:         <input
144:           type="checkbox"
145:           checked={isSelected || isDirectorySelected}
146:           onChange={handleCheckboxChange}
147:           onClick={handleCheckboxClick}
148:           ref={type === "directory" ? checkboxRef : null}
149:           className={styles.treeItemCheckbox}
150:           disabled={isDisabled}
151:         />
152: 
153:         <div className={styles.treeItemIcon}>
154:           {type === "directory" ? (
155:             <Folder size={16} className={styles.folderIcon} />
156:           ) : (
157:             <File size={16} className={styles.fileIcon} />
158:           )}
159:         </div>
160: 
161:         <span
162:           className={styles.treeItemName}
163:           title={path}
164:           onClick={(e) => {
165:             e.stopPropagation();
166:             if (type === "file" && !isDisabled) {
167:               toggleFileSelection(path);
168:             } else if (type === "directory") {
169:               toggleExpanded(id);
170:             }
171:           }}
172:         >
173:           {name}
174:         </span>
175:         
176:         {/* Display token count or excluded label */}
177:         {type === "file" && fileData && (
178:           <span className={styles.treeItemTokens}>
179:             {isDisabled ? "Excluded" : fileData.tokenCount > 0 ? `(${fileData.tokenCount.toLocaleString()})` : ""}
180:           </span>
181:         )}
182:       </div>
183:     </div>
184:   );
185: };
186: 
187: export default TreeItem;
```

## File: src/types/FileTypes.ts
```typescript
 1: export interface FileData {
 2:   name: string;
 3:   path: string;
 4:   content: string;
 5:   tokenCount: number;
 6:   size: number;
 7:   isBinary: boolean;
 8:   isSkipped: boolean;
 9:   error?: string;
10:   fileType?: string;
11:   type?: "file" | "directory";
12:   excludedByDefault?: boolean;
13:   lastModified?: number;
14:   isAppDirectory?: boolean;
15:   excluded?: boolean;
16: }
17: 
18: export interface TreeNode {
19:   id: string;
20:   name: string;
21:   path: string;
22:   type: "file" | "directory";
23:   children?: TreeNode[];
24:   isExpanded?: boolean;
25:   isSelected?: boolean;
26:   depth: number;
27:   parentId?: string;
28:   fileData?: FileData;
29: }
30: 
31: export interface SidebarProps {
32:   selectedFolder: string | null;
33:   openFolder: () => void;
34:   allFiles: FileData[];
35:   selectedFiles: string[];
36:   toggleFileSelection: (filePath: string) => void;
37:   toggleFolderSelection: (folderPath: string, isSelected: boolean) => void;
38:   searchTerm: string;
39:   onSearchChange: (term: string) => void;
40:   selectAllFiles: () => void;
41:   deselectAllFiles: () => void;
42:   expandedNodes: Map<string, boolean>;
43:   toggleExpanded: (nodeId: string) => void;
44: }
45: 
46: export interface FileListProps {
47:   files: FileData[];
48:   selectedFiles: string[];
49:   toggleFileSelection: (filePath: string) => void;
50: }
51: 
52: export interface FileCardProps {
53:   file: FileData;
54:   isSelected: boolean;
55:   toggleSelection: (filePath: string) => void;
56: }
57: 
58: export interface TreeItemProps {
59:   node: TreeNode;
60:   selectedFiles: string[];
61:   toggleFileSelection: (filePath: string) => void;
62:   toggleFolderSelection: (folderPath: string, isSelected: boolean) => void;
63:   toggleExpanded: (nodeId: string) => void;
64: }
65: 
66: export interface SortOption {
67:   value: string;
68:   label: string;
69: }
70: 
71: export interface SearchBarProps {
72:   searchTerm: string;
73:   onSearchChange: (term: string) => void;
74: }
75: 
76: export type FileTreeMode = "none" | "selected" | "selected-with-roots" | "complete";
77: 
78: // Add SortOrder type for file tree sorting
79: export type SortOrder = "name-asc" | "name-desc" | "ext-asc" | "ext-desc" | "date-newest";
80: 
81: // Add IgnorePattern interface for ignore patterns feature
82: export interface IgnorePattern {
83:   pattern: string;
84:   isGlobal: boolean;
85: }
```

## File: src/components/ui/Button/Button.module.css
```css
  1: .button {
  2:   display: inline-flex;
  3:   align-items: center;
  4:   justify-content: center;
  5:   cursor: pointer;
  6:   font-family: inherit;
  7:   font-size: 13px;
  8:   gap: 8px;
  9:   padding: 0 12px;
 10:   border-radius: 6px;
 11:   transition: all 0.15s ease;
 12:   white-space: nowrap;
 13:   font-weight: 500;
 14:   height: 32px;
 15:   background-color: var(--background-primary);
 16:   color: var(--text-primary);
 17:   border: 1px solid var(--border-color);
 18: }
 19: 
 20: .button:hover:not(:disabled) {
 21:   background-color: var(--hover-color);
 22: }
 23: 
 24: .button:active:not(:disabled) {
 25:   background-color: var(--secondary-button-active);
 26: }
 27: 
 28: .button:disabled {
 29:   opacity: 0.5;
 30:   cursor: not-allowed;
 31: }
 32: 
 33: /* Variants */
 34: .ghost {
 35:   background-color: transparent;
 36:   border: 1px solid var(--border-color);
 37:   color: var(--text-primary);
 38: }
 39: 
 40: .ghost:hover:not(:disabled) {
 41:   background-color: var(--hover-color);
 42: }
 43: 
 44: .ghost:active:not(:disabled) {
 45:   background-color: var(--secondary-button-active);
 46: }
 47: 
 48: .secondary {
 49:   background-color: transparent;
 50:   border: 1px solid var(--border-color);
 51:   color: var(--text-primary);
 52: }
 53: 
 54: .secondary:hover:not(:disabled) {
 55:   background-color: var(--hover-color);
 56: }
 57: 
 58: .secondary:active:not(:disabled) {
 59:   background-color: var(--secondary-button-active);
 60: }
 61: 
 62: /* Icon styles */
 63: .startIcon {
 64:   margin-right: 4px;
 65:   display: flex;
 66:   align-items: center;
 67: }
 68: 
 69: .endIcon {
 70:   margin-left: 4px;
 71:   display: flex;
 72:   align-items: center;
 73: }
 74: 
 75: /* Variants */
 76: .primary {
 77:   background-color: var(--primary-button-background);
 78:   color: var(--primary-button-text);
 79:   border: 1px solid var(--primary-button-border);
 80: }
 81: 
 82: .primary:hover:not(:disabled) {
 83:   background-color: var(--primary-button-hover);
 84:   border-color: var(--primary-button-border);
 85: }
 86: 
 87: .primary:active:not(:disabled) {
 88:   background-color: var(--primary-button-active);
 89:   border-color: var(--primary-button-border);
 90: }
 91: 
 92: .destructive {
 93:   background-color: var(--error-color);
 94:   color: white;
 95:   border: 1px solid var(--error-color);
 96: }
 97: 
 98: .destructive:hover:not(:disabled) {
 99:   opacity: 0.9;
100: }
101: 
102: .destructive:active:not(:disabled) {
103:   opacity: 0.8;
104: }
105: 
106: /* Sizes */
107: .sm {
108:   font-size: 12px;
109:   padding: 0 12px;
110:   height: var(--button-height-sm);
111: }
112: 
113: .md {
114:   font-size: 14px;
115:   padding: 0 16px;
116:   height: var(--button-height-md);
117: }
118: 
119: .lg {
120:   font-size: 16px;
121:   padding: 0 20px;
122:   height: var(--button-height-lg);
123: }
124: 
125: /* Icon styles */
126: .startIcon {
127:   margin-right: 4px;
128:   display: flex;
129:   align-items: center;
130: }
131: 
132: .endIcon {
133:   margin-left: 4px;
134:   display: flex;
135:   align-items: center;
136: }
137: 
138: .iconOnly {
139:   padding: 0;
140:   aspect-ratio: 1/1;
141:   justify-content: center;
142: }
143: 
144: .iconOnly.sm {
145:   width: var(--button-height-sm);
146: }
147: 
148: .iconOnly.md {
149:   width: var(--button-height-md);
150: }
151: 
152: .iconOnly.lg {
153:   width: var(--button-height-lg);
154: }
155: 
156: /* Pill variant */
157: .pill {
158:   border-radius: var(--radius-full);
159: }
160: 
161: /* Round variant - inherits from primary but with enhancements */
162: .round {
163:   background-color: var(--primary-button-background);
164:   color: var(--primary-button-text);
165:   border-color: var(--primary-button-background);
166:   padding: 0 20px;
167:   border-width: 1.5px;
168:   font-weight: 600;
169:   letter-spacing: 0.01em;
170: }
171: 
172: .round:hover:not(:disabled) {
173:   background-color: var(--primary-button-hover);
174:   border-color: var(--primary-button-hover);
175:   box-shadow: var(--shadow-sm);
176: }
177: 
178: .round:active:not(:disabled) {
179:   background-color: var(--primary-button-active);
180:   border-color: var(--primary-button-active);
181: }
182: 
183: .round.iconOnly {
184:   padding: 0;
185:   width: var(--button-height-md);
186:   height: var(--button-height-md);
187: }
188: 
189: .round.sm.iconOnly {
190:   width: var(--button-height-sm);
191:   height: var(--button-height-sm);
192: }
193: 
194: .round.lg.iconOnly {
195:   width: var(--button-height-lg);
196:   height: var(--button-height-lg);
197: }
198: 
199: /* Adjust icon spacing for round variant */
200: .round .startIcon {
201:   margin-right: 8px;
202: }
203: 
204: .round .endIcon {
205:   margin-left: 8px;
206: }
207: 
208: .round.iconOnly .startIcon,
209: .round.iconOnly .endIcon {
210:   margin: 0;
211: }
212: 
213: /* Icon variant - for icon-only buttons without background effects */
214: .icon {
215:   background-color: transparent;
216:   border: none;
217:   color: var(--icon-color);
218:   padding: 0;
219:   transition: transform 0.2s ease, color 0.2s ease;
220: }
221: 
222: .icon:hover:not(:disabled) {
223:   background-color: transparent;
224:   color: var(--text-primary);
225:   opacity: 0.8;
226:   transform: scale(1.1);
227: }
228: 
229: .icon:active:not(:disabled) {
230:   background-color: transparent;
231:   opacity: 0.9;
232:   transform: scale(1.05);
233: }
```

## File: src/components/FileTreeHeader.module.css
```css
 1: .fileTreeHeader {
 2:   display: flex;
 3:   align-items: center;
 4:   gap: 0.5rem;
 5:   padding: 0.5rem;
 6:   background: var(--background-secondary);
 7:   border-bottom: 1px solid var(--border-color);
 8:   height: 52px;
 9:   justify-content: center;
10: }
11: 
12: .fileTreeBtn:focus-visible {
13:   outline: 2px solid var(--focus-ring);
14:   outline-offset: -1px;
15: }
16: 
17: .dropdownContainer {
18:   position: relative;
19:   display: inline-flex;
20:   align-items: center;
21:   height: 32px;
22: }
23: 
24: .excludedFilesCount {
25:   padding: 0.5rem;
26:   font-size: 0.875rem;
27:   color: var(--text-secondary);
28:   background: var(--bg-secondary);
29:   border-bottom: 1px solid var(--border-color);
30: }
```

## File: src/components/ThemeToggle.tsx
```typescript
 1: import React, { useEffect, useState } from 'react';
 2: import { useTheme } from '../hooks/useTheme';
 3: import { Sun, Moon, Monitor } from 'lucide-react';
 4: import styles from './ThemeToggle.module.css';
 5: 
 6: const ThemeToggle: React.FC = () => {
 7:   const { theme, setTheme } = useTheme();
 8:   const [isAnimated, setIsAnimated] = useState(false);
 9: 
10:   useEffect(() => {
11:     // Add animation class after initial render
12:     const timer = setTimeout(() => setIsAnimated(true), 0);
13:     return () => clearTimeout(timer);
14:   }, []);
15: 
16:   return (
17:     <div className={styles.themeSegmentedControl}>
18:       <div
19:         className={`${styles.themeSegmentsBackground} ${styles[theme]} ${
20:           isAnimated ? styles.animated : ''
21:         }`}
22:       />
23:       <button
24:         className={`${styles.themeSegment} ${theme === 'light' ? styles.active : ''}`}
25:         onClick={() => setTheme('light')}
26:         title="Light theme"
27:       >
28:         <Sun size={16} />
29:       </button>
30:       <button
31:         className={`${styles.themeSegment} ${theme === 'dark' ? styles.active : ''}`}
32:         onClick={() => setTheme('dark')}
33:         title="Dark theme"
34:       >
35:         <Moon size={16} />
36:       </button>
37:       <button
38:         className={`${styles.themeSegment} ${theme === 'system' ? styles.active : ''}`}
39:         onClick={() => setTheme('system')}
40:         title="System theme"
41:       >
42:         <Monitor size={16} />
43:       </button>
44:     </div>
45:   );
46: };
47: 
48: export default ThemeToggle;
```

## File: src/App.module.css
```css
  1: .app {
  2:   display: flex;
  3:   flex-direction: column;
  4:   height: 100vh;
  5:   background: var(--bg-primary);
  6:   color: var(--text-primary);
  7: }
  8: 
  9: .header {
 10:   display: flex;
 11:   align-items: center;
 12:   justify-content: space-between;
 13:   padding: 0.5rem;
 14:   background: var(--bg-secondary);
 15:   border-bottom: 1px solid var(--border-color);
 16: }
 17: 
 18: .headerLeft,
 19: .headerRight {
 20:   display: flex;
 21:   align-items: center;
 22:   gap: 0.25rem;
 23: }
 24: 
 25: .headerBtn {
 26:   color: var(--text-primary);
 27: }
 28: 
 29: .headerBtn:hover {
 30:   background: var(--bg-hover);
 31: }
 32: 
 33: .dropdownContainer {
 34:   position: relative;
 35:   display: inline-flex;
 36:   align-items: center;
 37:   height: 32px;
 38: }
 39: 
 40: .appContainer {
 41:   display: flex;
 42:   flex-direction: column;
 43:   height: 100vh;
 44:   width: 100%;
 45:   overflow: hidden;
 46: }
 47: 
 48: .mainContainer {
 49:   display: flex;
 50:   flex: 1;
 51:   overflow: hidden;
 52: }
 53: 
 54: .contentArea {
 55:   flex-grow: 1;
 56:   padding: 0;
 57:   overflow-y: auto;
 58:   display: flex;
 59:   flex-direction: column;
 60:   height: 100%;
 61:   background: var(--background);
 62:   border-left: 1px solid var(--border);
 63: }
 64: 
 65: .contentHeader {
 66:   display: flex;
 67:   justify-content: space-between;
 68:   align-items: center;
 69:   padding: 0.75rem 1rem;
 70:   border-bottom: 1px solid var(--border-color);
 71:   background: var(--background-primary);
 72:   height: 52px;
 73:   position: sticky;
 74:   top: 0;
 75:   z-index: 10;
 76: }
 77: 
 78: .contentTitle {
 79:   font-size: 1.125rem;
 80:   font-weight: 600;
 81:   color: var(--text-primary);
 82:   margin: 0;
 83:   line-height: 1.4;
 84:   flex-shrink: 0;
 85:   margin-right: 1rem;
 86: }
 87: 
 88: .contentActions {
 89:   display: flex;
 90:   gap: 1rem;
 91:   align-items: center;
 92:   height: 32px;
 93:   margin-left: auto;
 94: }
 95: 
 96: .folderPathDisplay {
 97:   font-size: 0.875rem;
 98:   color: var(--text-secondary);
 99:   padding: 0 0.75rem;
100:   background: var(--background-secondary);
101:   width: 320px;
102:   height: 32px;
103:   display: inline-flex;
104:   align-items: center;
105:   border-radius: var(--radius);
106:   border: 1px solid var(--border-color);
107:   overflow: hidden;
108:   text-overflow: ellipsis;
109:   white-space: nowrap;
110: }
111: 
112: .fileStats {
113:   font-size: 0.875rem;
114:   color: var(--text-secondary);
115:   padding: 0 0.75rem;
116:   height: 32px;
117:   display: flex;
118:   align-items: center;
119:   background: var(--background-secondary);
120:   border-radius: var(--radius);
121:   border: 1px solid var(--border-color);
122:   white-space: nowrap;
123: }
124: 
125: .appHeader {
126:   display: flex;
127:   justify-content: space-between;
128:   align-items: center;
129:   padding: 0.5rem 1rem;
130:   background-color: var(--background-secondary);
131:   border-bottom: 1px solid var(--border-color);
132: }
133: 
134: .headerActions {
135:   display: flex;
136:   align-items: center;
137:   gap: 0.5rem;
138: }
139: 
140: .headerLink {
141:   color: var(--text-primary);
142:   text-decoration: none;
143:   transition: color 0.2s;
144: }
145: 
146: .headerLink:hover {
147:   color: var(--accent-color);
148: }
149: 
150: .headerSeparator {
151:   width: 1px;
152:   height: 24px;
153:   background-color: var(--border-color);
154:   margin: 0 0.5rem;
155: }
156: 
157: .githubButton {
158:   display: flex;
159:   align-items: center;
160:   gap: 0.5rem;
161:   padding: 0.5rem;
162:   border-radius: var(--radius);
163:   text-decoration: none;
164:   color: var(--text-primary);
165:   transition: color 0.2s;
166: }
167: 
168: .githubButton:hover {
169:   color: var(--accent-color);
170: }
171: 
172: .treeEmpty {
173:   display: flex;
174:   flex-direction: column;
175:   align-items: center;
176:   justify-content: center;
177:   padding: 2rem;
178:   text-align: center;
179:   color: var(--text-secondary);
180: }
181: 
182: .treeLoading {
183:   display: flex;
184:   flex-direction: column;
185:   align-items: center;
186:   justify-content: center;
187:   padding: 2rem;
188:   text-align: center;
189:   color: var(--text-secondary);
190: }
191: 
192: .spinner {
193:   border: 3px solid rgba(0, 0, 0, 0.1);
194:   border-top: 3px solid var(--accent-color);
195:   border-radius: 50%;
196:   width: 20px;
197:   height: 20px;
198:   animation: spin 1s linear infinite;
199:   margin-bottom: 1rem;
200: }
201: 
202: .processingIndicator {
203:   display: flex;
204:   align-items: center;
205:   justify-content: center;
206:   gap: 0.5rem;
207:   padding: 0.5rem;
208:   background-color: var(--background-secondary);
209:   color: var(--text-secondary);
210:   font-size: 0.9rem;
211: }
212: 
213: .errorMessage {
214:   padding: 0.5rem 1rem;
215:   background-color: var(--error-color);
216:   color: white;
217:   font-size: 0.9rem;
218: }
219: 
220: .userInstructionsContainer {
221:   margin-top: 1rem;
222: }
223: 
224: .emptyStateContent {
225:   display: flex;
226:   flex-direction: column;
227:   align-items: center;
228:   justify-content: center;
229:   padding: 2rem;
230:   text-align: center;
231: }
232: 
233: .emptyStateContent h2 {
234:   margin-bottom: 1rem;
235: }
236: 
237: .emptyStateContent ul {
238:   text-align: left;
239:   margin-top: 1rem;
240: }
241: 
242: @keyframes spin {
243:   0% { transform: rotate(0deg); }
244:   100% { transform: rotate(360deg); }
245: }
246: 
247: @keyframes dropdownFadeIn {
248:   from {
249:     opacity: 0;
250:     transform: translateY(-8px);
251:   }
252:   to {
253:     opacity: 1;
254:     transform: translateY(0);
255:   }
256: }
257: 
258: @keyframes tooltipFadeIn {
259:   from {
260:     opacity: 0;
261:     transform: translateY(-4px);
262:   }
263:   to {
264:     opacity: 1;
265:     transform: translateY(0);
266:   }
267: }
```

## File: src/components/FileTreeHeader.tsx
```typescript
  1: import React from "react";
  2: import { Folder, ArrowUpDown, Filter, X, RefreshCw } from "lucide-react";
  3: import { SortOrder } from "../types/FileTypes";
  4: import { Button } from "./ui";
  5: import { Dropdown } from "./ui/Dropdown";
  6: import styles from "./FileTreeHeader.module.css";
  7: 
  8: interface FileTreeHeaderProps {
  9:   onOpenFolder: () => void;
 10:   onSortChange: (sortOrder: SortOrder) => void;
 11:   onClearSelection: () => void;
 12:   onRemoveAllFolders: () => void;
 13:   onReloadFileTree: () => void;
 14:   onOpenIgnorePatterns: (isGlobal: boolean) => void;
 15:   excludedFilesCount?: number;
 16: }
 17: 
 18: const sortOptions = [
 19:   { value: "name-asc", label: "Name (⬆ A-Z)" },
 20:   { value: "name-desc", label: "Name (⬇ Z-A)" },
 21:   { value: "ext-asc", label: "Extension (⬆ A-Z)" },
 22:   { value: "ext-desc", label: "Extension (⬇ Z-A)" },
 23:   { value: "date-newest", label: "Date (⬇ Newest)" },
 24: ];
 25: 
 26: const clearOptions = [
 27:   { value: "clear", label: "Clear selection" },
 28:   { value: "removeAll", label: "Remove All Folders" },
 29: ];
 30: 
 31: const FileTreeHeader = ({
 32:   onOpenFolder,
 33:   onSortChange,
 34:   onClearSelection,
 35:   onRemoveAllFolders,
 36:   onReloadFileTree,
 37:   onOpenIgnorePatterns,
 38:   excludedFilesCount,
 39: }: FileTreeHeaderProps): JSX.Element => {
 40:   
 41:   const handleSortSelect = (value: string | string[]) => {
 42:     onSortChange(value as SortOrder);
 43:   };
 44: 
 45:   const handleClearSelect = (value: string | string[]) => {
 46:     if (typeof value === 'string') {
 47:       if (value === 'clear') {
 48:         onClearSelection();
 49:       } else if (value === 'removeAll') {
 50:         onRemoveAllFolders();
 51:       }
 52:     }
 53:   };
 54: 
 55:   return (
 56:     <>
 57:       <div className={styles.fileTreeHeader}>
 58:         <Button 
 59:           variant="icon"
 60:           size="sm"
 61:           iconOnly
 62:           startIcon={<Folder size={16} />}
 63:           onClick={onOpenFolder}
 64:           title="Select Folder"
 65:           className={styles.fileTreeBtn}
 66:         />
 67:         
 68:         <div className={styles.dropdownContainer}>
 69:           <Dropdown
 70:             options={sortOptions}
 71:             onChange={handleSortSelect}
 72:             placeholder="Sort by..."
 73:             trigger={
 74:               <Button 
 75:                 variant="icon"
 76:                 size="sm"
 77:                 iconOnly
 78:                 startIcon={<ArrowUpDown size={16} />}
 79:                 title="Sort By"
 80:                 className={styles.fileTreeBtn}
 81:               />
 82:             }
 83:             menuClassName={styles.headerDropdownMenu}
 84:           />
 85:         </div>
 86:         
 87:         <Button 
 88:           variant="icon"
 89:           size="sm"
 90:           iconOnly
 91:           startIcon={<Filter size={16} />}
 92:           onClick={() => onOpenIgnorePatterns(false)}
 93:           title="Ignore Patterns"
 94:           className={styles.fileTreeBtn}
 95:         />
 96:         
 97:         <div className={styles.dropdownContainer}>
 98:           <Dropdown
 99:             options={clearOptions}
100:             onChange={handleClearSelect}
101:             placeholder="Clear options..."
102:             trigger={
103:               <Button 
104:                 variant="icon"
105:                 size="sm"
106:                 iconOnly
107:                 startIcon={<X size={16} />}
108:                 title="Clear"
109:                 className={styles.fileTreeBtn}
110:               />
111:             }
112:             menuClassName={styles.headerDropdownMenu}
113:           />
114:         </div>
115:         
116:         <Button 
117:           variant="icon"
118:           size="sm"
119:           iconOnly
120:           startIcon={<RefreshCw size={16} />}
121:           onClick={onReloadFileTree}
122:           title="Reload"
123:           className={styles.fileTreeBtn}
124:         />
125:       </div>
126:       
127:       {excludedFilesCount !== undefined && excludedFilesCount > 0 && (
128:         <div className={styles.excludedFilesCount}>
129:           {excludedFilesCount} {excludedFilesCount === 1 ? 'file' : 'files'} excluded by ignore patterns
130:         </div>
131:       )}
132:     </>
133:   );
134: };
135: 
136: export default FileTreeHeader;
```

## File: src/components/IgnorePatterns.tsx
```typescript
  1: import React, { useState, useEffect, useRef } from 'react';
  2: import { X, RefreshCw, ChevronDown, Trash2 } from "lucide-react";
  3: import { Button } from "./ui";
  4: import styles from "./IgnorePatterns.module.css";
  5: 
  6: // Props interface
  7: interface IgnorePatternsProps {
  8:   isOpen: boolean;
  9:   onClose: () => void;
 10:   globalIgnorePatterns: string;
 11:   localIgnorePatterns: string;
 12:   localFolderPath?: string;
 13:   processingStatus?: {
 14:     status: "idle" | "processing" | "complete" | "error";
 15:     message: string;
 16:   };
 17:   saveIgnorePatterns: (patterns: string, isGlobal: boolean, folderPath?: string) => Promise<void>;
 18:   resetIgnorePatterns: (isGlobal: boolean, folderPath?: string) => Promise<void>;
 19:   clearIgnorePatterns: (folderPath: string) => Promise<void>;
 20:   systemIgnorePatterns: string[];
 21:   recentFolders: string[];
 22: }
 23: 
 24: const IgnorePatterns: React.FC<IgnorePatternsProps> = ({
 25:   isOpen,
 26:   onClose,
 27:   globalIgnorePatterns,
 28:   localIgnorePatterns,
 29:   localFolderPath,
 30:   processingStatus = { status: "idle", message: "" },
 31:   saveIgnorePatterns,
 32:   resetIgnorePatterns,
 33:   clearIgnorePatterns,
 34:   systemIgnorePatterns,
 35:   recentFolders
 36: }) => {
 37:   // State for the active tab
 38:   const [activeTab, setActiveTab] = useState<"global" | "local">("global");
 39:   
 40:   // State for the textarea values
 41:   const [globalPatterns, setGlobalPatterns] = useState<string>(globalIgnorePatterns);
 42:   const [localPatterns, setLocalPatterns] = useState<string>(localIgnorePatterns);
 43:   
 44:   // State for the selected folder
 45:   const [selectedFolder, setSelectedFolder] = useState<string | undefined>(localFolderPath);
 46:   
 47:   // State for pattern application status
 48:   const [applyingPatterns, setApplyingPatterns] = useState<boolean>(false);
 49:   const [folderSelectOpen, setFolderSelectOpen] = useState(false);
 50:   
 51:   // Ref for the textarea to focus it
 52:   const textareaRef = useRef<HTMLTextAreaElement>(null);
 53:   
 54:   // Effect to initialize the components with the props
 55:   useEffect(() => {
 56:     if (isOpen) {
 57:       setGlobalPatterns(globalIgnorePatterns);
 58:       setLocalPatterns(localIgnorePatterns);
 59:       setSelectedFolder(localFolderPath);
 60:       
 61:       // Reset the pattern application status
 62:       setApplyingPatterns(false);
 63:     }
 64:   }, [isOpen, globalIgnorePatterns, localIgnorePatterns, localFolderPath]);
 65:   
 66:   // Effect to update local patterns when selectedFolder changes
 67:   useEffect(() => {
 68:     if (selectedFolder === localFolderPath) {
 69:       setLocalPatterns(localIgnorePatterns);
 70:     } else {
 71:       // Reset local patterns when a different folder is selected
 72:       setLocalPatterns('');
 73:     }
 74:   }, [selectedFolder, localFolderPath, localIgnorePatterns]);
 75:   
 76:   // Effect to update UI based on processing status
 77:   useEffect(() => {
 78:     if (!processingStatus) {
 79:       return; // Exit early if processingStatus is undefined or null
 80:     }
 81:     
 82:     if (processingStatus.status === 'processing') {
 83:       setApplyingPatterns(true);
 84:     } else if (processingStatus.status === 'complete' || processingStatus.status === 'error') {
 85:       // Delay resetting to allow for visual feedback
 86:       setTimeout(() => {
 87:         setApplyingPatterns(false);
 88:       }, 500);
 89:     }
 90:   }, [processingStatus]);
 91:   
 92:   // Function to handle tab change
 93:   const handleTabChange = (isGlobal: boolean) => {
 94:     setActiveTab(isGlobal ? "global" : "local");
 95:   };
 96:   
 97:   // Function to handle textarea change
 98:   const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
 99:     const { value } = e.target;
100:     
101:     if (activeTab === 'global') {
102:       setGlobalPatterns(value);
103:     } else {
104:       setLocalPatterns(value);
105:     }
106:   };
107:   
108:   // Function to handle folder selection
109:   const handleFolderChange = (folderPath: string) => {
110:     setSelectedFolder(folderPath);
111:     setFolderSelectOpen(false);
112:   };
113:   
114:   // Functions to handle saving patterns
115:   const handleSaveGlobalPatterns = async () => {
116:     setApplyingPatterns(true);
117:     await saveIgnorePatterns(globalPatterns, true);
118:   };
119:   
120:   const handleSaveLocalPatterns = async () => {
121:     if (selectedFolder) {
122:       setApplyingPatterns(true);
123:       await saveIgnorePatterns(localPatterns, false, selectedFolder);
124:     }
125:   };
126:   
127:   // Functions to handle resetting patterns
128:   const handleResetGlobalPatterns = async () => {
129:     setApplyingPatterns(true);
130:     await resetIgnorePatterns(true);
131:   };
132:   
133:   const handleResetLocalPatterns = async () => {
134:     if (selectedFolder) {
135:       setApplyingPatterns(true);
136:       await resetIgnorePatterns(false, selectedFolder);
137:     }
138:   };
139:   
140:   // Function to handle clearing patterns
141:   const handleClearLocalPatterns = async () => {
142:     if (selectedFolder) {
143:       setApplyingPatterns(true);
144:       await clearIgnorePatterns(selectedFolder);
145:     }
146:   };
147:   
148:   // Function to handle keyboard events
149:   const handleKeyDown = (e: React.KeyboardEvent) => {
150:     // Save on Ctrl+S / Cmd+S
151:     if ((e.ctrlKey || e.metaKey) && e.key === 's') {
152:       e.preventDefault();
153:       
154:       if (activeTab === 'global') {
155:         handleSaveGlobalPatterns();
156:       } else if (selectedFolder) {
157:         handleSaveLocalPatterns();
158:       }
159:     }
160:     
161:     // Close on Escape
162:     if (e.key === 'Escape') {
163:       onClose();
164:     }
165:   };
166:   
167:   // If the modal is not open, don't render anything
168:   if (!isOpen) {
169:     return null;
170:   }
171:   
172:   // Function to render the processing status message
173:   const renderStatusMessage = () => {
174:     if (!processingStatus || processingStatus.status === 'idle') {
175:       return null;
176:     }
177:     
178:     let statusClass = styles.statusMessage;
179:     
180:     switch (processingStatus.status) {
181:       case 'processing':
182:         statusClass += ` ${styles.processing}`;
183:         break;
184:       case 'complete':
185:         statusClass += ` ${styles.complete}`;
186:         break;
187:       case 'error':
188:         statusClass += ` ${styles.error}`;
189:         break;
190:       default:
191:         statusClass += ` ${styles.idle}`;
192:     }
193:     
194:     return (
195:       <div className={statusClass}>
196:         {processingStatus.message}
197:       </div>
198:     );
199:   };
200:   
201:   return (
202:     <div className={styles.modal}>
203:       <div className={styles.content}>
204:         <div className={styles.header}>
205:           <h2>
206:             Ignore Patterns
207:             {applyingPatterns && <span className={styles.applying}>(Applying changes...)</span>}
208:           </h2>
209:           <Button 
210:             variant="secondary" 
211:             size="sm" 
212:             iconOnly
213:             onClick={onClose}
214:             startIcon={<X size={16} />}
215:             title="Close"
216:             disabled={applyingPatterns}
217:           />
218:         </div>
219:         
220:         <div className={styles.description}>
221:           Edit ignore patterns. Global patterns apply to all folders, while local patterns apply only to the selected folder.
222:         </div>
223:         
224:         <div className={styles.scopeSelector}>
225:           <Button 
226:             variant={activeTab === "local" ? "secondary" : "ghost"}
227:             className={`${styles.scopeBtn} ${activeTab === "local" ? styles.active : ""}`}
228:             onClick={() => handleTabChange(false)}
229:             disabled={applyingPatterns}
230:           >
231:             Local Folder
232:           </Button>
233:           <Button 
234:             variant={activeTab === "global" ? "secondary" : "ghost"}
235:             className={`${styles.scopeBtn} ${activeTab === "global" ? styles.active : ""}`}
236:             onClick={() => handleTabChange(true)}
237:             disabled={applyingPatterns}
238:           >
239:             Global Defaults
240:           </Button>
241:         </div>
242:         
243:         <div className={styles.scopeDescription}>
244:           {activeTab === "global" 
245:             ? "Global patterns apply to all folders. One pattern per line. Use * as wildcard." 
246:             : "Local patterns apply only to the selected folder. One pattern per line. Use * as wildcard."}
247:         </div>
248:         
249:         {activeTab === "local" && (
250:           <div className={styles.folderSelector}>
251:             <label>Select Folder</label>
252:             <div className={styles.customSelect} onClick={() => !applyingPatterns && setFolderSelectOpen(!folderSelectOpen)}>
253:               <div className={styles.selectedValue}>
254:                 {selectedFolder || 'Select a folder'}
255:                 <ChevronDown size={16} className={`${styles.chevron} ${folderSelectOpen ? styles.open : ''}`} />
256:               </div>
257:               {folderSelectOpen && (
258:                 <div className={styles.optionsContainer}>
259:                   {recentFolders.length > 0 ? (
260:                     recentFolders.map((folder, index) => (
261:                       <div 
262:                         key={index} 
263:                         className={styles.option} 
264:                         onClick={() => handleFolderChange(folder)}
265:                       >
266:                         {folder}
267:                       </div>
268:                     ))
269:                   ) : (
270:                     <div className={styles.option}>{selectedFolder || 'No folders available'}</div>
271:                   )}
272:                 </div>
273:               )}
274:             </div>
275:             <div className={styles.pathDisplay}>
276:               {selectedFolder ? `${selectedFolder}/.repo_ignore` : 'No folder selected'}
277:             </div>
278:           </div>
279:         )}
280:         
281:         <div className={styles.patternsSection}>
282:           <textarea 
283:             ref={textareaRef}
284:             className={styles.patternsInput}
285:             value={activeTab === "global" ? globalPatterns : localPatterns}
286:             onChange={handleTextareaChange}
287:             onKeyDown={handleKeyDown}
288:             placeholder="Enter ignore patterns, one per line..."
289:             disabled={applyingPatterns || (activeTab === "local" && !selectedFolder)}
290:           />
291:           
292:           {activeTab === "global" && (
293:             <div className={styles.systemPatterns}>
294:               <h3>System Patterns (Always Applied)</h3>
295:               <div className={styles.systemPatternsList}>
296:                 {systemIgnorePatterns.map((pattern, index) => (
297:                   <div key={index} className={styles.systemPattern}>{pattern}</div>
298:                 ))}
299:               </div>
300:             </div>
301:           )}
302:         </div>
303:         
304:         {/* Status Message */}
305:         {renderStatusMessage()}
306:         
307:         <div className={styles.modalActions}>
308:           {activeTab === "global" ? (
309:             <>
310:               <Button 
311:                 variant="primary" 
312:                 onClick={handleSaveGlobalPatterns}
313:                 disabled={applyingPatterns}
314:               >
315:                 Save Global Patterns
316:               </Button>
317:               <Button 
318:                 variant="secondary" 
319:                 onClick={handleResetGlobalPatterns}
320:                 disabled={applyingPatterns}
321:               >
322:                 Reset to Defaults
323:               </Button>
324:             </>
325:           ) : (
326:             <>
327:               <Button 
328:                 variant="primary" 
329:                 onClick={handleSaveLocalPatterns}
330:                 disabled={!selectedFolder || applyingPatterns}
331:               >
332:                 Save Local Patterns
333:               </Button>
334:               <Button 
335:                 variant="secondary" 
336:                 onClick={handleResetLocalPatterns}
337:                 disabled={!selectedFolder || applyingPatterns}
338:               >
339:                 Reset to Defaults
340:               </Button>
341:               <Button 
342:                 variant="destructive" 
343:                 onClick={handleClearLocalPatterns}
344:                 disabled={!selectedFolder || applyingPatterns}
345:               >
346:                 Clear All Patterns
347:               </Button>
348:             </>
349:           )}
350:           
351:           <Button 
352:             variant="ghost"
353:             onClick={onClose}
354:             disabled={applyingPatterns}
355:           >
356:             Cancel
357:           </Button>
358:         </div>
359:       </div>
360:     </div>
361:   );
362: };
363: 
364: export default IgnorePatterns;
```

## File: src/components/ControlContainer.tsx
```typescript
  1: import React, { useState } from 'react';
  2: import { FileTreeMode } from '../types';
  3: import { Switch, Button, ButtonGroup } from './ui';
  4: import { Copy, Download, Check } from 'lucide-react';
  5: import styles from './ControlContainer.module.css';
  6: 
  7: interface ControlContainerProps {
  8:   fileTreeMode: FileTreeMode;
  9:   setFileTreeMode: (value: FileTreeMode) => void;
 10:   showUserInstructions: boolean;
 11:   setShowUserInstructions: (value: boolean) => void;
 12:   getSelectedFilesContent: () => string;
 13:   selectedFilesCount: number;
 14:   fileTreeSortOrder?: "name-asc" | "name-desc" | "ext-asc" | "ext-desc" | "date-newest";
 15:   setFileTreeSortOrder?: (value: "name-asc" | "name-desc" | "ext-asc" | "ext-desc" | "date-newest") => void;
 16:   ignorePatterns?: string;
 17:   setIgnorePatterns?: (patterns: string) => void;
 18:   loadIgnorePatterns?: (folderPath: string, isGlobal?: boolean) => void;
 19:   saveIgnorePatterns?: (patterns: string, isGlobal: boolean, folderPath: string) => void;
 20:   resetIgnorePatterns?: (isGlobal: boolean, folderPath: string) => void;
 21:   reloadFolder?: () => void;
 22:   clearSelection?: () => void;
 23:   removeAllFolders?: () => void;
 24: }
 25: 
 26: const ControlContainer: React.FC<ControlContainerProps> = ({
 27:   fileTreeMode,
 28:   setFileTreeMode,
 29:   showUserInstructions,
 30:   setShowUserInstructions,
 31:   getSelectedFilesContent,
 32:   selectedFilesCount,
 33:   fileTreeSortOrder,
 34:   setFileTreeSortOrder,
 35:   ignorePatterns,
 36:   setIgnorePatterns,
 37:   loadIgnorePatterns,
 38:   saveIgnorePatterns,
 39:   resetIgnorePatterns,
 40:   reloadFolder,
 41:   clearSelection,
 42:   removeAllFolders,
 43: }) => {
 44:   const [copied, setCopied] = useState(false);
 45: 
 46:   const handleCopy = async () => {
 47:     const content = getSelectedFilesContent();
 48:     try {
 49:       await navigator.clipboard.writeText(content);
 50:       setCopied(true);
 51:       setTimeout(() => setCopied(false), 2000);
 52:     } catch (err) {
 53:       console.error('Failed to copy:', err);
 54:     }
 55:   };
 56: 
 57:   const handleDownload = () => {
 58:     const content = getSelectedFilesContent();
 59:     const blob = new Blob([content], { type: 'text/plain' });
 60:     const url = URL.createObjectURL(blob);
 61:     const a = document.createElement('a');
 62:     a.href = url;
 63:     a.download = 'selected-files.txt';
 64:     document.body.appendChild(a);
 65:     a.click();
 66:     document.body.removeChild(a);
 67:     URL.revokeObjectURL(url);
 68:   };
 69: 
 70:   return (
 71:     <div className={styles.controlContainer}>
 72:       <div className={styles.controlContainerHeader}>Controls</div>
 73:       <div className={styles.controlItems}>
 74:         {/* Display Options Group */}
 75:         <div className={styles.controlGroup}>
 76:           <div className={styles.controlGroupTitle}>Display Options</div>
 77:           
 78:           <div className={styles.controlItem}>
 79:             <Switch
 80:               checked={showUserInstructions}
 81:               onChange={() => setShowUserInstructions(!showUserInstructions)}
 82:               label="Show User Instructions"
 83:               id="user-instructions-toggle"
 84:             />
 85:           </div>
 86:           
 87:           <div className={styles.controlItem}>
 88:             <label className={styles.controlSelectLabel} htmlFor="file-tree-mode">File Tree:</label>
 89:             <select
 90:               id="file-tree-mode"
 91:               value={fileTreeMode}
 92:               onChange={(e) => setFileTreeMode(e.target.value as FileTreeMode)}
 93:               className={styles.controlSelect}
 94:             >
 95:               <option value="none">None</option>
 96:               <option value="selected">Selected Files Only</option>
 97:               <option value="selected-with-roots">Selected Files with Path</option>
 98:               <option value="complete">Complete Tree</option>
 99:             </select>
100:           </div>
101:         </div>
102:         
103:         {/* Output Options Group */}
104:         <div className={styles.controlGroup}>
105:           <div className={styles.controlGroupTitle}>Output Options</div>
106:           
107:           <div className={styles.controlItem}>
108:             <ButtonGroup size="sm">
109:               <Button
110:                 variant="secondary"
111:                 onClick={handleCopy}
112:                 startIcon={copied ? <Check size={16} /> : <Copy size={16} />}
113:                 disabled={selectedFilesCount === 0}
114:               >
115:                 {copied ? 'Copied!' : `Copy (${selectedFilesCount})`}
116:               </Button>
117:               <Button
118:                 variant="secondary"
119:                 onClick={handleDownload}
120:                 startIcon={<Download size={16} />}
121:                 disabled={selectedFilesCount === 0}
122:               >
123:                 Save
124:               </Button>
125:             </ButtonGroup>
126:           </div>
127:         </div>
128:       </div>
129:     </div>
130:   );
131: };
132: 
133: export default ControlContainer;
```

## File: src/components/Sidebar.tsx
```typescript
  1: import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
  2: import { SidebarProps, TreeNode, SortOrder } from "../types/FileTypes";
  3: import TreeItem from "./TreeItem";
  4: import FileTreeHeader from "./FileTreeHeader";
  5: import IgnorePatterns from "./IgnorePatterns";
  6: import { FolderPlus } from "lucide-react";
  7: import { Button } from "./ui";
  8: import SearchBar from "./SearchBar";
  9: import styles from "./Sidebar.module.css";
 10: 
 11: // Debounce delay in ms
 12: const DEBOUNCE_DELAY = 300;
 13: 
 14: // Extend the existing SidebarProps from FileTypes
 15: interface ExtendedSidebarProps extends SidebarProps {
 16:   reloadFolder: () => void;
 17:   clearSelection: () => void;
 18:   removeAllFolders: () => void;
 19:   ignorePatterns: string;
 20:   setIgnorePatterns: (patterns: string) => void;
 21:   loadIgnorePatterns: (folderPath: string, isGlobal?: boolean) => void;
 22:   saveIgnorePatterns: (patterns: string, isGlobal: boolean, folderPath: string) => void;
 23:   resetIgnorePatterns?: (isGlobal: boolean, folderPath: string) => void;
 24:   systemIgnorePatterns: string[];
 25:   clearIgnorePatterns: (folderPath: string) => void;
 26:   onClearSelectionClick?: () => void;
 27:   onRemoveAllFoldersClick?: () => void;
 28:   onResetPatternsClick?: (isGlobal: boolean, folderPath: string) => void;
 29:   fileTreeSortOrder?: SortOrder;
 30:   onSortOrderChange?: (newSortOrder: SortOrder) => void;
 31: }
 32: 
 33: const Sidebar: React.FC<ExtendedSidebarProps> = ({
 34:   selectedFolder,
 35:   openFolder,
 36:   allFiles,
 37:   selectedFiles,
 38:   toggleFileSelection,
 39:   toggleFolderSelection,
 40:   searchTerm,
 41:   onSearchChange,
 42:   selectAllFiles,
 43:   deselectAllFiles,
 44:   expandedNodes,
 45:   toggleExpanded,
 46:   reloadFolder,
 47:   clearSelection,
 48:   removeAllFolders,
 49:   ignorePatterns,
 50:   setIgnorePatterns,
 51:   loadIgnorePatterns,
 52:   saveIgnorePatterns,
 53:   resetIgnorePatterns,
 54:   systemIgnorePatterns,
 55:   clearIgnorePatterns,
 56:   onClearSelectionClick,
 57:   onRemoveAllFoldersClick,
 58:   onResetPatternsClick,
 59:   fileTreeSortOrder,
 60:   onSortOrderChange,
 61: }: ExtendedSidebarProps) => {
 62:   const [fileTree, setFileTree] = useState<TreeNode[]>([]);
 63:   const [isTreeBuildingComplete, setIsTreeBuildingComplete] = useState(false);
 64:   const [sidebarWidth, setSidebarWidth] = useState(300);
 65:   const [isResizing, setIsResizing] = useState(false);
 66:   
 67:   // State for ignore patterns modal
 68:   const [ignoreModalOpen, setIgnoreModalOpen] = useState(false);
 69:   const [ignoreGlobal, setIgnoreGlobal] = useState(false);
 70:   const [globalIgnorePatterns, setGlobalIgnorePatterns] = useState("");
 71:   const [localIgnorePatterns, setLocalIgnorePatterns] = useState("");
 72:   
 73:   // Min and max width constraints
 74:   const MIN_SIDEBAR_WIDTH = 200;
 75:   const MAX_SIDEBAR_WIDTH = 500;
 76: 
 77:   // All component level refs need to be defined here
 78:   const loadedFoldersRef = useRef<Set<string>>(new Set());
 79:   const lastProcessedFolderRef = useRef<string | null>(null);
 80:   const isBuildingTreeRef = useRef(false);
 81:   const isUpdatingExpandedNodesRef = useRef(false);
 82: 
 83:   // Define all helper functions first before they're used
 84:   
 85:   // Helper function for file tree - Flatten the tree for rendering
 86:   const flattenTree = useCallback((nodes: TreeNode[]): TreeNode[] => {
 87:     let result: TreeNode[] = [];
 88:     
 89:     for (const node of nodes) {
 90:       result.push(node);
 91:       
 92:       if (node.type === "directory" && node.isExpanded && node.children && node.children.length > 0) {
 93:         result = result.concat(flattenTree(node.children));
 94:       }
 95:     }
 96:     
 97:     return result;
 98:   }, []);
 99:   
100:   // Helper function for file tree - Filter the tree based on search term
101:   const filterTree = useCallback((nodes: TreeNode[], term: string): TreeNode[] => {
102:     if (!term) return nodes;
103:     
104:     const lowerTerm = term.toLowerCase();
105:     
106:     // Helper function to check if a node matches the search term
107:     const hasMatchingChild = (node: TreeNode): boolean => {
108:       if (node.type === "file") {
109:         return node.name.toLowerCase().includes(lowerTerm);
110:       }
111:       
112:       if (node.type === "directory") {
113:         const dirMatch = node.name.toLowerCase().includes(lowerTerm);
114:         const childMatch = node.children && node.children.some(hasMatchingChild);
115:         
116:         return dirMatch || Boolean(childMatch);
117:       }
118:       
119:       return false;
120:     };
121:     
122:     const filterWithExpanded = (node: TreeNode): TreeNode | null => {
123:       if (node.type === "file") {
124:         return node.name.toLowerCase().includes(lowerTerm) ? node : null;
125:       }
126:       
127:       if (node.type === "directory") {
128:         // Keep this directory if it matches or has matching children
129:         const isMatching = hasMatchingChild(node);
130:         
131:         if (isMatching) {
132:           // Filter children, but keep the structure
133:           const filteredChildren = node.children && node.children
134:             .map(filterWithExpanded)
135:             .filter((n): n is TreeNode => n !== null);
136:           
137:           // Return a new node with expanded state if it's matching
138:           return {
139:             ...node,
140:             children: filteredChildren || [],
141:             isExpanded: true, // Always expand matching directories
142:           };
143:         }
144:       }
145:       
146:       return null;
147:     };
148:     
149:     return nodes
150:       .map(filterWithExpanded)
151:       .filter((n): n is TreeNode => n !== null);
152:   }, []);
153:   
154:   // Now that we've defined filterTree and flattenTree, we can use them in useMemo
155:   const memoizedFilteredTree = useMemo(() => {
156:     return searchTerm ? filterTree(fileTree, searchTerm) : fileTree;
157:   }, [fileTree, searchTerm, filterTree]);
158:   
159:   const memoizedFlattenedTree = useMemo(() => {
160:     return flattenTree(memoizedFilteredTree);
161:   }, [memoizedFilteredTree, flattenTree]);
162: 
163:   // Handle mouse down for resizing
164:   const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>) => {
165:     e.preventDefault();
166:     setIsResizing(true);
167:   };
168: 
169:   // Handle resize effect
170:   useEffect(() => {
171:     const handleResize = (e: globalThis.MouseEvent) => {
172:       if (isResizing) {
173:         const newWidth = e.clientX;
174:         if (newWidth >= MIN_SIDEBAR_WIDTH && newWidth <= MAX_SIDEBAR_WIDTH) {
175:           setSidebarWidth(newWidth);
176:         }
177:       }
178:     };
179: 
180:     const handleResizeEnd = () => {
181:       setIsResizing(false);
182:     };
183: 
184:     document.addEventListener("mousemove", handleResize);
185:     document.addEventListener("mouseup", handleResizeEnd);
186: 
187:     return () => {
188:       document.removeEventListener("mousemove", handleResize);
189:       document.removeEventListener("mouseup", handleResizeEnd);
190:     };
191:   }, [isResizing]);
192: 
193:   // Load ignore patterns when folder changes - with optimization to prevent infinite loops
194:   useEffect(() => {
195:     // Skip if no folder is selected
196:     if (!selectedFolder) return;
197:     
198:     // Skip if we already processed this exact folder
199:     if (lastProcessedFolderRef.current === selectedFolder && 
200:         loadedFoldersRef.current.has(selectedFolder)) return;
201:     
202:     // Set the last processed folder reference
203:     lastProcessedFolderRef.current = selectedFolder;
204:     
205:     // Track that we're processing this folder
206:     loadedFoldersRef.current.add(selectedFolder);
207:     
208:     // Load the patterns
209:     loadIgnorePatterns(selectedFolder, false);
210:     
211:   }, [selectedFolder, loadIgnorePatterns]); // Added loadIgnorePatterns as dependency
212: 
213:   // Sort file tree nodes - memoized with useCallback to prevent recreation on every render
214:   const sortFileTreeNodes = useCallback((nodes: TreeNode[]): TreeNode[] => {
215:     return [...nodes].sort((a, b) => {
216:       // Always sort directories first
217:       if (a.type === "directory" && b.type === "file") return -1;
218:       if (a.type === "file" && b.type === "directory") return 1;
219:       
220:       // Sort based on selected sort order
221:       switch (fileTreeSortOrder) {
222:         case "name-asc":
223:           return a.name.localeCompare(b.name);
224:         case "name-desc":
225:           return b.name.localeCompare(a.name);
226:         case "ext-asc": {
227:           const extA = a.name.includes('.') ? a.name.split('.').pop() || '' : '';
228:           const extB = b.name.includes('.') ? b.name.split('.').pop() || '' : '';
229:           return extA.localeCompare(extB) || a.name.localeCompare(b.name);
230:         }
231:         case "ext-desc": {
232:           const extA = a.name.includes('.') ? a.name.split('.').pop() || '' : '';
233:           const extB = b.name.includes('.') ? b.name.split('.').pop() || '' : '';
234:           return extB.localeCompare(extA) || a.name.localeCompare(b.name);
235:         }
236:         case "date-newest":
237:           if (a.type === "file" && b.type === "file") {
238:             const dateA = a.fileData?.lastModified || 0;
239:             const dateB = b.fileData?.lastModified || 0;
240:             return dateB - dateA;
241:           }
242:           return a.name.localeCompare(b.name);
243:         default:
244:           return a.name.localeCompare(b.name);
245:       }
246:     });
247:   }, [fileTreeSortOrder]); // Only depends on the sort order
248: 
249:   // Update tree with expanded state
250:   const updateTreeWithExpandedState = useCallback(() => {
251:     if (fileTree.length === 0 || isUpdatingExpandedNodesRef.current) {
252:       return;
253:     }
254:     
255:     isUpdatingExpandedNodesRef.current = true;
256:     
257:     // Add change detection to prevent unnecessary updates
258:     let hasChanged = false;
259:     
260:     const updateNodes = (nodes: TreeNode[]): TreeNode[] => {
261:       return nodes.map(node => {
262:         const nodeExpanded = expandedNodes.has(node.id) ? !!expandedNodes.get(node.id) : false;
263:         const isExpanded = nodeExpanded || node.isExpanded;
264:         
265:         // Check if there's a change in expanded state
266:         if (isExpanded !== node.isExpanded) {
267:           hasChanged = true;
268:         }
269:         
270:         // Check if directory has children to update
271:         if (node.type === "directory" && node.children && node.children.length > 0) {
272:           return {
273:             ...node,
274:             isExpanded,
275:             children: updateNodes(node.children),
276:           };
277:         }
278:         
279:         return {
280:           ...node,
281:           isExpanded,
282:         };
283:       });
284:     };
285:     
286:     // Only update if there are actual changes
287:     if (hasChanged) {
288:       // Create a new tree reference to avoid mutating state
289:       const updatedTree = updateNodes([...fileTree]);
290:       setFileTree(updatedTree);
291:     }
292:     
293:     // Always reset the flag when done, even if no changes were made
294:     isUpdatingExpandedNodesRef.current = false;
295:   }, [expandedNodes, fileTree]);
296: 
297:   // Set up the effect for building the file tree
298:   useEffect(() => {
299:     // Return early if there are no files
300:     if (!allFiles || allFiles.length === 0) {
301:       setFileTree([]);
302:       return;
303:     }
304:     
305:     // Skip if we're already building the tree or updating expanded nodes
306:     if (isBuildingTreeRef.current || isUpdatingExpandedNodesRef.current) {
307:       return;
308:     }
309: 
310:     // Debounce the tree building to prevent rapid UI updates
311:     const debounceId = setTimeout(() => {
312:       try {
313:         isBuildingTreeRef.current = true;
314:         
315:         if (sortFileTreeNodes) {
316:           const builtTree = buildFileTree(allFiles, selectedFolder || "", fileTreeSortOrder);
317:           
318:           // Only update if necessary by doing a shallow comparison
319:           setFileTree(prevTree => {
320:             // Simple length check as first comparison
321:             if (prevTree.length !== builtTree.length) {
322:               return builtTree;
323:             }
324:             
325:             // If same length, compare a sample of nodes
326:             const hasChanged = prevTree.length === 0 || 
327:               prevTree[0]?.id !== builtTree[0]?.id || 
328:               prevTree[prevTree.length - 1]?.id !== builtTree[builtTree.length - 1]?.id;
329:               
330:             return hasChanged ? builtTree : prevTree;
331:           });
332:         }
333:         
334:         isBuildingTreeRef.current = false;
335:         
336:         // Only update expanded state after the tree has been built
337:         // and when we're not already in the process of updating
338:         const hasExpandedNodes = expandedNodes.size > 0;
339:         if (hasExpandedNodes && !isUpdatingExpandedNodesRef.current) {
340:           // Use setTimeout to ensure tree build finishes first
341:           setTimeout(() => {
342:             updateTreeWithExpandedState();
343:           }, 0);
344:         }
345:       } catch (error) {
346:         console.error("Error building file tree:", error);
347:         isBuildingTreeRef.current = false;
348:       }
349:     }, DEBOUNCE_DELAY);
350:     
351:     return () => {
352:       clearTimeout(debounceId);
353:     };
354:   }, [allFiles, selectedFolder, fileTreeSortOrder, sortFileTreeNodes]);
355: 
356:   // Handle opening the ignore patterns modal
357:   const handleOpenIgnorePatterns = (isGlobal = false) => {
358:     setIgnoreGlobal(isGlobal);
359:     
360:     // Ensure we have patterns loaded
361:     if (isGlobal) {
362:       loadPatterns(true);
363:     } else {
364:       loadPatterns(false);
365:     }
366:     
367:     setIgnoreModalOpen(true);
368:   };
369: 
370:   // Load patterns based on global or local scope
371:   const loadPatterns = useCallback(async (isGlobal: boolean) => {
372:     try {
373:       // Load global patterns if needed
374:       if (isGlobal) {
375:         if (!globalIgnorePatterns) {
376:           await loadIgnorePatterns('', true);
377:         } else {
378:           setIgnorePatterns(globalIgnorePatterns);
379:         }
380:       } 
381:       // Load local patterns if needed
382:       else if (selectedFolder && !localIgnorePatterns) {
383:         await loadIgnorePatterns(selectedFolder, false);
384:       } else if (selectedFolder) {
385:         setIgnorePatterns(localIgnorePatterns);
386:       }
387:     } catch (err) {
388:       console.error(`Error loading ${isGlobal ? 'global' : 'local'} patterns:`, err);
389:     }
390:   }, [selectedFolder, loadIgnorePatterns, globalIgnorePatterns, localIgnorePatterns, setIgnorePatterns]);
391: 
392:   // Handle reset button click in ignore patterns modal
393:   const handleResetIgnorePatterns = useCallback(async () => {
394:     if (!window.electron) return;
395:     
396:     // Determine whether to reset global or local patterns based on the active tab
397:     const isGlobal = ignoreGlobal;
398:     const folderPath = isGlobal ? undefined : selectedFolder;
399:     
400:     if (resetIgnorePatterns) {
401:       await resetIgnorePatterns(isGlobal, folderPath || '');
402:     }
403:     
404:     // Reload patterns after reset
405:     await loadPatterns(isGlobal);
406:   }, [selectedFolder, loadPatterns, ignoreGlobal, resetIgnorePatterns]);
407: 
408:   // Handle clear button click in ignore patterns modal
409:   const handleClearIgnorePatterns = (folderPath?: string) => {
410:     // Use the provided folderPath if available, otherwise use selectedFolder
411:     const targetFolder = folderPath || selectedFolder || '';
412:     
413:     if (targetFolder) {
414:       // Call the parent's clear function
415:       clearIgnorePatterns(targetFolder);
416:       
417:       // Preview empty patterns in the UI immediately
418:       setLocalIgnorePatterns('');
419:       if (!ignoreGlobal) {
420:         setIgnorePatterns('');
421:       }
422:     }
423:   };
424: 
425:   // Get a list of available folders for the folder selector
426:   const getAvailableFolders = () => {
427:     const folders = new Set<string>();
428:     
429:     // Collect all unique folder paths
430:     allFiles.forEach((file) => {
431:       if (file.path) {
432:         // Extract directory without the file name
433:         const lastSlashIndex = Math.max(
434:           file.path.lastIndexOf('/'),
435:           file.path.lastIndexOf('\\')
436:         );
437:         
438:         if (lastSlashIndex > 0) {
439:           const folder = file.path.substring(0, lastSlashIndex);
440:           folders.add(folder);
441:         }
442:       }
443:     });
444:     
445:     return Array.from(folders);
446:   };
447: 
448:   // Count files excluded by ignore patterns
449:   const countExcludedFiles = () => {
450:     // For simplicity, we just return 0 here until we can compute this properly
451:     const excludedFilesCount = allFiles.filter(file => file.excluded).length;
452:     return excludedFilesCount;
453:   };
454: 
455:   // Function to build file tree structure from flat list of files
456:   const buildFileTree = useCallback((files: FileData[], rootFolder: string, currentSortOrder: SortOrder): TreeNode[] => {
457:     // Create a structured representation using nested objects first
458:     const fileMap: Record<string, any> = {};
459: 
460:     // First pass: create directories and files
461:     files.forEach((file) => {
462:       if (!file.path) return;
463: 
464:       const relativePath =
465:         rootFolder && file.path.startsWith(rootFolder)
466:           ? file.path
467:               .substring(rootFolder.length)
468:               .replace(/^\/|^\\/, "")
469:           : file.path;
470: 
471:       const parts = relativePath.split(/[/\\]/);
472:       let currentPath = "";
473:       let current = fileMap;
474: 
475:       // Process path parts to create directory structure
476:       for (let i = 0; i < parts.length; i++) {
477:         const part = parts[i];
478:         if (!part) continue; // Skip empty parts
479:         
480:         currentPath = currentPath ? `${currentPath}/${part}` : part;
481:         
482:         if (i === parts.length - 1) {
483:           // This is a file
484:           current[part] = {
485:             type: "file",
486:             name: part,
487:             path: file.path,
488:             fileData: file,
489:           };
490:         } else {
491:           // This is a directory
492:           if (!current[part]) {
493:             current[part] = {
494:               type: "directory",
495:               name: part,
496:               children: {},
497:             };
498:           }
499:           current = current[part].children;
500:         }
501:       }
502:     });
503: 
504:     // Convert the nested object structure to TreeNode array with proper nesting
505:     const convertToTreeNodes = (
506:       node: Record<string, any>,
507:       level = 0,
508:     ): TreeNode[] => {
509:       return Object.keys(node).map((key) => {
510:         const item = node[key];
511:         const id = `node-${Math.random().toString(36).substring(2, 9)}`;
512:         
513:         if (item.type === "directory") {
514:           return {
515:             id,
516:             name: item.name,
517:             type: "directory",
518:             path: "", // Add empty string as default path for directory nodes
519:             children: convertToTreeNodes(item.children, level + 1),
520:             isExpanded: level < 2 || (expandedNodes.has(id) ? !!expandedNodes.get(id) : false),
521:             depth: level,
522:           };
523:         } else {
524:           return {
525:             id,
526:             name: item.name,
527:             type: "file",
528:             path: item.path,
529:             children: [],
530:             isExpanded: false,
531:             fileData: item.fileData,
532:             depth: level,
533:           };
534:         }
535:       });
536:     };
537: 
538:     // Convert the fileMap to a TreeNode array
539:     const unsortedTree = convertToTreeNodes(fileMap);
540:     
541:     // Sort the tree if a sort function is available
542:     return sortFileTreeNodes ? sortFileTreeNodes(unsortedTree) : unsortedTree;
543:   }, [expandedNodes, sortFileTreeNodes]);
544: 
545:   // Handle sort change events
546:   const handleSortChange = (newSortOrder: SortOrder) => {
547:     // Pass the sort order change back to the parent component
548:     if (fileTreeSortOrder !== newSortOrder) {
549:       // We need to handle this in the App component, not locally
550:       if (onSortOrderChange) {
551:         onSortOrderChange(newSortOrder);
552:       }
553:     }
554:   };
555: 
556:   return (
557:     <div className={styles.sidebar} style={{ width: `${sidebarWidth}px` }}>
558:       <FileTreeHeader 
559:         onOpenFolder={openFolder}
560:         onSortChange={handleSortChange}
561:         onClearSelection={onClearSelectionClick || clearSelection}
562:         onRemoveAllFolders={onRemoveAllFoldersClick || removeAllFolders}
563:         onReloadFileTree={reloadFolder}
564:         onOpenIgnorePatterns={() => handleOpenIgnorePatterns(false)}
565:         excludedFilesCount={countExcludedFiles()}
566:       />
567:       
568:       {selectedFolder ? (
569:         <>
570:           <div className={styles.sidebarSearch}>
571:             <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
572:           </div>
573: 
574:           <div className={styles.sidebarActions}>
575:             <Button
576:               variant="primary"
577:               size="sm"
578:               onClick={selectAllFiles}
579:               title="Select all files"
580:             >
581:               Select All
582:             </Button>
583:             <Button
584:               variant="primary"
585:               size="sm"
586:               onClick={deselectAllFiles}
587:               title="Deselect all files"
588:             >
589:               Deselect All
590:             </Button>
591:           </div>
592: 
593:           <div className={styles.fileTree}>
594:             {isTreeBuildingComplete ? (
595:               memoizedFlattenedTree.length > 0 ? (
596:                 <>
597:                   {memoizedFlattenedTree.map((node) => (
598:                     <TreeItem
599:                       key={node.id}
600:                       node={node}
601:                       selectedFiles={selectedFiles}
602:                       toggleFileSelection={toggleFileSelection}
603:                       toggleFolderSelection={toggleFolderSelection}
604:                       toggleExpanded={toggleExpanded}
605:                     />
606:                   ))}
607:                 </>
608:               ) : (
609:                 <div className={styles.treeEmpty}>
610:                   {searchTerm
611:                     ? "No files match your search."
612:                     : "No files in this folder."}
613:                 </div>
614:               )
615:             ) : (
616:               <div className={styles.treeLoading}>
617:                 <div className={styles.spinner}></div>
618:                 <p>Loading files...</p>
619:               </div>
620:             )}
621:           </div>
622:         </>
623:       ) : (
624:         <div className={styles.sidebarEmptyState}>
625:           <FolderPlus size={48} className={styles.sidebarEmptyIcon} />
626:           <h3>No Folder Selected</h3>
627:           <p>Click the folder icon above to select a project folder.</p>
628:         </div>
629:       )}
630: 
631:       <div
632:         className={styles.sidebarResizeHandle}
633:         onMouseDown={handleResizeStart}
634:         title="Resize sidebar"
635:       />
636:       
637:       <IgnorePatterns 
638:         isOpen={ignoreModalOpen}
639:         onClose={() => setIgnoreModalOpen(false)}
640:         onSave={(patterns, isGlobal, folderPath) => {
641:           // Update the appropriate state
642:           if (isGlobal) {
643:             setGlobalIgnorePatterns(patterns);
644:           } else {
645:             // Get the target folder - either the provided one or the currently selected one
646:             const targetFolder = folderPath || selectedFolder || '';
647:             
648:             if (targetFolder) {
649:               setLocalIgnorePatterns(patterns);
650:             }
651:           }
652:           
653:           // Call the saveIgnorePatterns which will save to disk
654:           // Use the provided folderPath if available, otherwise use selectedFolder
655:           saveIgnorePatterns(patterns, isGlobal, folderPath || selectedFolder || '');
656:           
657:           // Close the modal
658:           setIgnoreModalOpen(false);
659:           
660:           // If patterns are for the current folder, reload the folder
661:           if (!isGlobal && (folderPath === selectedFolder || !folderPath)) {
662:             reloadFolder();
663:           }
664:         }}
665:         onReset={handleResetIgnorePatterns}
666:         onClear={handleClearIgnorePatterns}
667:         currentFolder={selectedFolder || ""}
668:         existingPatterns={ignorePatterns}
669:         isGlobal={ignoreGlobal}
670:         globalPatterns={globalIgnorePatterns}
671:         localPatterns={localIgnorePatterns}
672:         systemPatterns={systemIgnorePatterns}
673:         availableFolders={getAvailableFolders()}
674:         onTabChange={(isGlobal) => {
675:           setIgnoreGlobal(isGlobal);
676:           // Load the appropriate patterns if needed
677:           if (isGlobal) {
678:             setIgnorePatterns(globalIgnorePatterns);
679:           } else {
680:             setIgnorePatterns(localIgnorePatterns);
681:           }
682:         }}
683:       />
684:     </div>
685:   );
686: };
687: 
688: export default Sidebar;
```

## File: src/styles/index.css
```css
  1: :root {
  2:   /* Monochrome Zinc theme - shadcn inspired */
  3:   --background-primary: hsl(0, 0%, 100%);
  4:   --background-primary-dark: hsl(240, 10%, 3.9%);
  5:   --background-secondary: hsl(240, 4.8%, 95.9%);
  6:   --background-selected: hsl(240, 4.8%, 95.9%);
  7:   --card-background: hsl(0, 0%, 100%);
  8:   --card-foreground: hsl(240, 10%, 3.9%);
  9:   --accent-color: hsl(240, 3.8%, 46.1%);
 10:   --border-color: hsl(240, 5.9%, 90%);
 11:   --hover-color: hsl(240, 4.8%, 90%);
 12:   --text-primary: hsl(240, 10%, 3.9%);
 13:   --text-secondary: hsl(240, 3.8%, 46.1%);
 14:   --text-disabled: hsl(240, 3.8%, 70%);
 15:   --icon-color: hsl(240, 3.8%, 46.1%);
 16:   --success-color: hsl(142, 72%, 29%);
 17:   --warning-color: hsl(40, 92%, 40%);
 18:   --error-color: hsl(0, 84.2%, 60.2%);
 19:   --primary-button-background: transparent;
 20:   --primary-button-text: var(--text-primary);
 21:   --primary-button-border: var(--border-color);
 22:   --primary-button-hover: var(--hover-color);
 23:   --primary-button-active: var(--secondary-button-active);
 24:   --secondary-button-background: hsl(240, 4.8%, 95.9%);
 25:   --secondary-button-hover: hsl(240, 4.8%, 90%);
 26:   --secondary-button-active: hsl(240, 4.8%, 85%);
 27:   --file-card-selected-border: hsl(240, 5.9%, 90%);
 28:   --popover: hsl(0, 0%, 100%);
 29:   --popover-foreground: hsl(0, 0%, 0%);
 30: 
 31:   /* Component Sizing */
 32:   --button-height-sm: 28px;
 33:   --button-height-md: 32px;
 34:   --button-height-lg: 38px;
 35:   
 36:   /* Border radius */
 37:   --radius: 0.5rem;
 38:   --radius-full: 9999px;
 39:   
 40:   /* Focus ring */
 41:   --ring-color: hsl(240, 5.9%, 10%);
 42:   
 43:   /* Scrollbar */
 44:   --scrollbar-width: 8px;
 45:   --scrollbar-height: 8px;
 46:   --scrollbar-track-color: transparent;
 47:   --scrollbar-thumb-color: hsl(240, 3.8%, 80%);
 48:   --scrollbar-thumb-hover-color: hsl(240, 3.8%, 70%);
 49:   
 50:   /* Z-index layers */
 51:   --z-index-modal: 1000;
 52:   --z-index-dropdown: 100;
 53:   --z-index-tooltip: 50;
 54:   
 55:   /* Elevation (box-shadows) */
 56:   --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
 57:   --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
 58:   --shadow-lg: 0 4px 12px rgba(0, 0, 0, 0.2);
 59:   --shadow-xl: 0 8px 16px rgba(0, 0, 0, 0.3);
 60: }
 61: 
 62: /* Dark theme variables */
 63: .dark-mode {
 64:   --background-primary: hsl(240, 10%, 3.9%);
 65:   --background-primary-dark: hsl(240, 3.7%, 15.9%);
 66:   --background-secondary: hsl(240, 3.7%, 15.9%);
 67:   --background-selected: hsl(240, 3.7%, 15.9%);
 68:   --card-background: hsl(240, 10%, 3.9%);
 69:   --card-foreground: hsl(0, 0%, 98%);
 70:   --accent-color: hsl(240, 5%, 64.9%);
 71:   --border-color: hsl(240, 3.7%, 15.9%);
 72:   --hover-color: hsl(240, 3.7%, 25%);
 73:   --text-primary: hsl(0, 0%, 98%);
 74:   --text-secondary: hsl(240, 5%, 64.9%);
 75:   --text-disabled: hsl(240, 5%, 44.9%);
 76:   --icon-color: hsl(240, 5%, 64.9%);
 77:   --primary-button-background: transparent;
 78:   --primary-button-text: var(--text-primary);
 79:   --primary-button-border: var(--border-color);
 80:   --primary-button-hover: var(--hover-color);
 81:   --primary-button-active: var(--secondary-button-active);
 82:   --secondary-button-background: hsl(240, 3.7%, 15.9%);
 83:   --secondary-button-hover: hsl(240, 3.7%, 20%);
 84:   --secondary-button-active: hsl(240, 3.7%, 25%);
 85:   --file-card-selected-border: hsl(240, 3.7%, 15.9%);
 86:   --scrollbar-thumb-color: hsl(240, 5%, 25%);
 87:   --scrollbar-thumb-hover-color: hsl(240, 5%, 35%);
 88:   --popover-foreground: hsl(0, 0%, 98%);
 89:   --dropdown-menu-background: hsl(240, 10%, 3.9%);
 90:   --dropdown-item-hover: hsl(240, 3.7%, 15.9%);
 91: }
 92: 
 93: /* Reset and base styles */
 94: * {
 95:   margin: 0;
 96:   padding: 0;
 97:   box-sizing: border-box;
 98: }
 99: 
100: :root,
101: .dark-mode {
102:   transition: 
103:     color 0.15s ease-out,
104:     background-color 0.15s ease-out,
105:     border-color 0.15s ease-out,
106:     box-shadow 0.15s ease-out;
107: }
108: 
109: body {
110:   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
111:   -webkit-font-smoothing: antialiased;
112:   -moz-osx-font-smoothing: grayscale;
113:   background-color: var(--background-primary);
114:   color: var(--text-primary);
115:   transition: background-color 0.15s ease-out, color 0.15s ease-out;
116: }
117: 
118: #root {
119:   min-height: 100vh;
120:   display: flex;
121:   flex-direction: column;
122: }
123: 
124: /* Global scrollbar styling */
125: ::-webkit-scrollbar {
126:   width: var(--scrollbar-width);
127:   height: var(--scrollbar-height);
128: }
129: 
130: ::-webkit-scrollbar-track {
131:   background: var(--scrollbar-track-color);
132: }
133: 
134: ::-webkit-scrollbar-thumb {
135:   background: var(--scrollbar-thumb-color);
136:   border-radius: var(--radius-full);
137: }
138: 
139: ::-webkit-scrollbar-thumb:hover {
140:   background: var(--scrollbar-thumb-hover-color);
141: }
142: 
143: ::-webkit-scrollbar-corner {
144:   background: transparent;
145: }
```

## File: src/App.tsx
```typescript
   1: import React, { useState, useEffect, useCallback, useMemo } from "react";
   2: import Sidebar from "./components/Sidebar";
   3: import FileList from "./components/FileList";
   4: import UserInstructions from "./components/UserInstructions";
   5: import ControlContainer from "./components/ControlContainer";
   6: import { FileData, FileTreeMode, SortOrder } from "./types/FileTypes";
   7: import { ThemeProvider } from "./context/ThemeContext";
   8: import ThemeToggle from "./components/ThemeToggle";
   9: import { generateAsciiFileTree, normalizePath, arePathsEqual } from "./utils/pathUtils";
  10: import { Github, ArrowUpDown } from "lucide-react";
  11: import styles from "./App.module.css";
  12: import { Dropdown } from "./components/ui";
  13: import { ConfirmationDialog } from "./components/ui/ConfirmationDialog";
  14: 
  15: // Access the electron API from the window object
  16: declare global {
  17:   interface Window {
  18:     electron: {
  19:       ipcRenderer: {
  20:         send: (channel: string, data?: any) => void;
  21:         on: (channel: string, func: (...args: any[]) => void) => void;
  22:         removeListener: (
  23:           channel: string,
  24:           func: (...args: any[]) => void
  25:         ) => void;
  26:         invoke: (channel: string, data?: any) => Promise<any>;
  27:         setMaxListeners?: (n: number) => void;
  28:       };
  29:     };
  30:   }
  31: }
  32: 
  33: // Keys for localStorage
  34: const STORAGE_KEYS = {
  35:   SELECTED_FOLDER: "pastemax-selected-folder",
  36:   SELECTED_FILES: "pastemax-selected-files",
  37:   SORT_ORDER: "pastemax-sort-order",
  38:   SEARCH_TERM: "pastemax-search-term",
  39:   EXPANDED_NODES: "pastemax-expanded-nodes",
  40: };
  41: 
  42: // Default system patterns as fallback if not provided by main process
  43: const DEFAULT_SYSTEM_PATTERNS = [
  44:   // Binary and image files
  45:   "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.ico", 
  46:   "**/*.webp", "**/*.svg", "**/*.pdf", "**/*.zip", "**/*.tar.gz",
  47:   "**/*.tgz", "**/*.rar", "**/*.7z", "**/*.mp4", "**/*.mov",
  48:   "**/*.avi", "**/*.mkv", "**/*.mp3", "**/*.wav", "**/*.flac",
  49:   
  50:   // Database files
  51:   "**/*.sqlite", "**/*.db", "**/*.sql",
  52:   
  53:   // Document files
  54:   "**/*.doc", "**/*.docx", "**/*.xls", "**/*.xlsx", "**/*.ppt", "**/*.pptx",
  55:   
  56:   // Large binary files
  57:   "**/*.iso", "**/*.bin", "**/*.exe", "**/*.dll", "**/*.so", "**/*.dylib",
  58:   
  59:   // Minified files
  60:   "**/*.min.js", "**/*.min.css",
  61: ];
  62: 
  63: const App = () => {
  64:   // Load initial state from localStorage if available
  65:   const savedFolder = localStorage.getItem(STORAGE_KEYS.SELECTED_FOLDER);
  66:   const savedFiles = localStorage.getItem(STORAGE_KEYS.SELECTED_FILES);
  67:   const savedSortOrder = localStorage.getItem(STORAGE_KEYS.SORT_ORDER);
  68:   const savedSearchTerm = localStorage.getItem(STORAGE_KEYS.SEARCH_TERM);
  69:   const savedExpandedNodes = localStorage.getItem(STORAGE_KEYS.EXPANDED_NODES);
  70:   const savedShowInstructions = localStorage.getItem('pastemax-show-instructions');
  71: 
  72:   // State for user interface controls
  73:   const [showUserInstructions, setShowUserInstructions] = useState(savedShowInstructions !== 'false');
  74:   const [fileTreeMode, setFileTreeMode] = useState<FileTreeMode>('complete');
  75: 
  76:   // Initialize expanded nodes from localStorage if available
  77:   const initialExpandedNodes = useMemo(() => {
  78:     const map = new Map<string, boolean>();
  79:     if (savedExpandedNodes) {
  80:       try {
  81:         const parsedNodes = JSON.parse(savedExpandedNodes);
  82:         
  83:         // Handle array format [key, value][]
  84:         if (Array.isArray(parsedNodes)) {
  85:           parsedNodes.forEach(([key, value]) => {
  86:             if (typeof key === 'string' && typeof value === 'boolean') {
  87:               map.set(key, value);
  88:             }
  89:           });
  90:         }
  91:         // Handle object format {key: value}
  92:         else if (typeof parsedNodes === 'object' && parsedNodes !== null) {
  93:           Object.entries(parsedNodes).forEach(([key, value]) => {
  94:             if (typeof value === 'boolean') {
  95:               map.set(key, value);
  96:             }
  97:           });
  98:         }
  99:       } catch (error) {
 100:         console.error("Error parsing saved expanded nodes:", error);
 101:       }
 102:     }
 103:     return map;
 104:   }, [savedExpandedNodes]);
 105: 
 106:   const [selectedFolder, setSelectedFolder] = useState(
 107:     savedFolder as string | null
 108:   );
 109:   const [allFiles, setAllFiles] = useState([] as FileData[]);
 110:   const [selectedFiles, setSelectedFiles] = useState(
 111:     savedFiles ? JSON.parse(savedFiles) : ([] as string[])
 112:   );
 113:   const [sortOrder, setSortOrder] = useState(savedSortOrder || "tokens-desc");
 114:   const [searchTerm, setSearchTerm] = useState(savedSearchTerm || "");
 115:   const [expandedNodes, setExpandedNodes] = useState<Map<string, boolean>>(initialExpandedNodes);
 116:   const [displayedFiles, setDisplayedFiles] = useState([] as FileData[]);
 117:   const [processingStatus, setProcessingStatus] = useState({
 118:     status: "idle",
 119:     message: "",
 120:   } as {
 121:     status: "idle" | "processing" | "complete" | "error";
 122:     message: string;
 123:   });
 124: 
 125:   // NEW: State for user instructions
 126:   const [userInstructions, setUserInstructions] = useState("");
 127: 
 128:   // NEW: State for file tree sorting and ignore patterns
 129:   const [fileTreeSortOrder, setFileTreeSortOrder] = useState("name-asc" as SortOrder);
 130:   const [ignorePatterns, setIgnorePatterns] = useState("");
 131:   const [globalIgnorePatterns, setGlobalIgnorePatterns] = useState("");
 132:   const [localIgnorePatterns, setLocalIgnorePatterns] = useState("");
 133:   const [systemIgnorePatterns, setSystemIgnorePatterns] = useState<string[]>(DEFAULT_SYSTEM_PATTERNS);
 134: 
 135:   // Check if we're running in Electron or browser environment
 136:   const isElectron = window.electron !== undefined;
 137: 
 138:   // Load expanded nodes state from localStorage
 139:   useEffect(() => {
 140:     const savedExpandedNodes = localStorage.getItem(
 141:       STORAGE_KEYS.EXPANDED_NODES
 142:     );
 143:     if (savedExpandedNodes) {
 144:       try {
 145:         const parsedNodes = JSON.parse(savedExpandedNodes);
 146:         
 147:         // Check if it's an object that needs to be converted to entries
 148:         if (parsedNodes && typeof parsedNodes === 'object' && !Array.isArray(parsedNodes)) {
 149:           // Convert object to array of entries
 150:           const entries = Object.entries(parsedNodes).map(([key, value]) => [key, Boolean(value)]) as [string, boolean][];
 151:           setExpandedNodes(new Map(entries));
 152:         } else if (Array.isArray(parsedNodes)) {
 153:           // It's already in the format of [key, value] pairs
 154:           const typedEntries = parsedNodes.map(([key, value]) => [key, Boolean(value)]) as [string, boolean][];
 155:           setExpandedNodes(new Map(typedEntries));
 156:         } else {
 157:           // Reset to empty Map if format is not recognized
 158:           setExpandedNodes(new Map());
 159:         }
 160:       } catch (error) {
 161:         console.error("Error parsing saved expanded nodes:", error);
 162:         // Reset to empty Map on error
 163:         setExpandedNodes(new Map());
 164:       }
 165:     }
 166:   }, []);
 167: 
 168:   // Persist selected folder when it changes
 169:   useEffect(() => {
 170:     if (selectedFolder) {
 171:       localStorage.setItem(STORAGE_KEYS.SELECTED_FOLDER, selectedFolder);
 172:     } else {
 173:       localStorage.removeItem(STORAGE_KEYS.SELECTED_FOLDER);
 174:     }
 175:   }, [selectedFolder]);
 176: 
 177:   // Persist selected files when they change
 178:   useEffect(() => {
 179:     localStorage.setItem(
 180:       STORAGE_KEYS.SELECTED_FILES,
 181:       JSON.stringify(selectedFiles)
 182:     );
 183:   }, [selectedFiles]);
 184: 
 185:   // Persist sort order when it changes
 186:   useEffect(() => {
 187:     localStorage.setItem(STORAGE_KEYS.SORT_ORDER, sortOrder);
 188:   }, [sortOrder]);
 189: 
 190:   // Persist search term when it changes
 191:   useEffect(() => {
 192:     localStorage.setItem(STORAGE_KEYS.SEARCH_TERM, searchTerm);
 193:   }, [searchTerm]);
 194: 
 195:   // Load initial data from saved folder
 196:   useEffect(() => {
 197:     if (!isElectron || !selectedFolder) return;
 198: 
 199:     // Use a flag in sessionStorage to ensure we only load data once per session
 200:     const hasLoadedInitialData = sessionStorage.getItem("hasLoadedInitialData");
 201:     if (hasLoadedInitialData === "true") return;
 202: 
 203:     console.log("Loading saved folder on startup:", selectedFolder);
 204:     setProcessingStatus({
 205:       status: "processing",
 206:       message: "Loading files from previously selected folder...",
 207:     });
 208:     window.electron.ipcRenderer.send("request-file-list", selectedFolder);
 209: 
 210:     // Mark that we've loaded the initial data
 211:     sessionStorage.setItem("hasLoadedInitialData", "true");
 212:   }, [isElectron, selectedFolder]);
 213: 
 214:   // Listen for folder selection from main process
 215:   useEffect(() => {
 216:     if (!isElectron) {
 217:       console.warn("Not running in Electron environment");
 218:       return;
 219:     }
 220: 
 221:     const handleFolderSelected = (folderPath: string) => {
 222:       // Check if folderPath is valid string
 223:       if (typeof folderPath === "string") {
 224:         console.log("Folder selected:", folderPath);
 225:         setSelectedFolder(folderPath);
 226:         // We'll select all files after they're loaded
 227:         setSelectedFiles([]);
 228:         setProcessingStatus({
 229:           status: "processing",
 230:           message: "Requesting file list...",
 231:         });
 232:         window.electron.ipcRenderer.send("request-file-list", folderPath);
 233:       } else {
 234:         console.error("Invalid folder path received:", folderPath);
 235:         setProcessingStatus({
 236:           status: "error",
 237:           message: "Invalid folder path received",
 238:         });
 239:       }
 240:     };
 241: 
 242:     const handleFileListData = (files: FileData[]) => {
 243:       console.log("Received file list data:", files.length, "files");
 244:       
 245:       // Check if this is the app directory - special case
 246:       if (files.length === 1 && files[0].isAppDirectory) {
 247:         console.log("Detected app directory selection");
 248:         setAllFiles([]);
 249:         setSelectedFiles([]);
 250:         setDisplayedFiles([]);
 251:         setProcessingStatus({
 252:           status: "error",
 253:           message: "Please select a project directory instead of the PasteMax application directory",
 254:         });
 255:         return;
 256:       }
 257:       
 258:       setAllFiles(files);
 259:       setProcessingStatus({
 260:         status: "complete",
 261:         message: `Loaded ${files.length} files`,
 262:       });
 263: 
 264:       // Apply filters and sort to the new files
 265:       applyFiltersAndSort(files, sortOrder, searchTerm);
 266: 
 267:       // Select only files that are not binary, not skipped, and not excluded by default
 268:       const selectablePaths = files
 269:         .filter(
 270:           (file: FileData) =>
 271:             !file.isBinary && !file.isSkipped && !file.excludedByDefault // Respect the excludedByDefault flag
 272:         )
 273:         .map((file: FileData) => file.path);
 274: 
 275:       setSelectedFiles(selectablePaths);
 276:     };
 277: 
 278:     const handleProcessingStatus = (status: {
 279:       status: "idle" | "processing" | "complete" | "error";
 280:       message: string;
 281:     }) => {
 282:       console.log("Processing status:", status);
 283:       setProcessingStatus(status);
 284:     };
 285: 
 286:     window.electron.ipcRenderer.on("folder-selected", handleFolderSelected);
 287:     window.electron.ipcRenderer.on("file-list-data", handleFileListData);
 288:     window.electron.ipcRenderer.on(
 289:       "file-processing-status",
 290:       handleProcessingStatus
 291:     );
 292: 
 293:     return () => {
 294:       window.electron.ipcRenderer.removeListener(
 295:         "folder-selected",
 296:         handleFolderSelected
 297:       );
 298:       window.electron.ipcRenderer.removeListener(
 299:         "file-list-data",
 300:         handleFileListData
 301:       );
 302:       window.electron.ipcRenderer.removeListener(
 303:         "file-processing-status",
 304:         handleProcessingStatus
 305:       );
 306:     };
 307:   }, [isElectron, sortOrder, searchTerm]);
 308: 
 309:   // Add ESC key handler for directory loading
 310:   useEffect(() => {
 311:     const handleEscKey = (e: KeyboardEvent) => {
 312:       if (e.key === "Escape" && processingStatus.status === "processing") {
 313:         console.log("ESC pressed - cancelling directory loading");
 314:         window.electron.ipcRenderer.send("cancel-directory-loading");
 315:       }
 316:     };
 317: 
 318:     // Only add the event listener when processing
 319:     if (processingStatus.status === "processing") {
 320:       window.addEventListener("keydown", handleEscKey);
 321:       return () => window.removeEventListener("keydown", handleEscKey);
 322:     }
 323:   }, [processingStatus.status]);
 324: 
 325:   const openFolder = () => {
 326:     if (isElectron) {
 327:       console.log("Opening folder dialog");
 328:       setProcessingStatus({ status: "idle", message: "Select a folder..." });
 329:       window.electron.ipcRenderer.send("open-folder");
 330:     } else {
 331:       console.warn("Folder selection not available in browser");
 332:     }
 333:   };
 334: 
 335:   // Apply filters and sorting to files
 336:   const applyFiltersAndSort = (
 337:     files: FileData[],
 338:     sort: string,
 339:     filter: string
 340:   ) => {
 341:     let filtered = files;
 342: 
 343:     // Apply filter
 344:     if (filter) {
 345:       const lowerFilter = filter.toLowerCase();
 346:       filtered = files.filter(
 347:         (file) =>
 348:           file.name.toLowerCase().includes(lowerFilter) ||
 349:           file.path.toLowerCase().includes(lowerFilter)
 350:       );
 351:     }
 352: 
 353:     // Apply sort
 354:     const [sortKey, sortDir] = sort.split("-");
 355:     const sorted = [...filtered].sort((a, b) => {
 356:       let comparison = 0;
 357: 
 358:       if (sortKey === "name") {
 359:         comparison = a.name.localeCompare(b.name);
 360:       } else if (sortKey === "tokens") {
 361:         comparison = a.tokenCount - b.tokenCount;
 362:       } else if (sortKey === "size") {
 363:         comparison = a.size - b.size;
 364:       }
 365: 
 366:       return sortDir === "asc" ? comparison : -comparison;
 367:     });
 368: 
 369:     setDisplayedFiles(sorted);
 370:   };
 371: 
 372:   // Toggle file selection
 373:   const toggleFileSelection = (filePath: string) => {
 374:     // Normalize the incoming file path to handle cross-platform issues
 375:     const normalizedPath = normalizePath(filePath);
 376:     
 377:     setSelectedFiles((prev: string[]) => {
 378:       // Check if the file is already selected
 379:       const isSelected = prev.some((path: string) => arePathsEqual(path, normalizedPath));
 380:       
 381:       if (isSelected) {
 382:         // Remove the file from selected files
 383:         const newSelection = prev.filter((path: string) => !arePathsEqual(path, normalizedPath));
 384:         return newSelection;
 385:       } else {
 386:         // Add the file to selected files
 387:         const newSelection = [...prev, normalizedPath];
 388:         return newSelection;
 389:       }
 390:     });
 391:   };
 392: 
 393:   // Handle select all files
 394:   const selectAllFiles = () => {
 395:     const selectablePaths = displayedFiles
 396:       .filter((file: FileData) => !file.isBinary && !file.isSkipped && !file.excludedByDefault)
 397:       .map((file: FileData) => file.path);
 398: 
 399:     setSelectedFiles((prev: string[]) => {
 400:       const newSelection = [...prev];
 401:       selectablePaths.forEach((path: string) => {
 402:         if (!newSelection.includes(path)) {
 403:           newSelection.push(path);
 404:         }
 405:       });
 406:       return newSelection;
 407:     });
 408:   };
 409: 
 410:   // Handle deselect all files
 411:   const deselectAllFiles = () => {
 412:     const displayedPaths = displayedFiles.map((file: FileData) => file.path);
 413:     setSelectedFiles((prev: string[]) =>
 414:       prev.filter((path: string) => !displayedPaths.includes(path))
 415:     );
 416:   };
 417: 
 418:   // Toggle folder selection (select/deselect all files within a folder)
 419:   const toggleFolderSelection = (folderPath: string, isSelected: boolean) => {
 420:     if (!folderPath) return;
 421:     
 422:     setSelectedFiles((prev: string[]) => {
 423:       // Create a copy of the current selectedFiles array
 424:       const newSelectedFiles = [...prev];
 425:       
 426:       // Find all files that match this folder path prefix
 427:       const filesInFolder = allFiles.filter(
 428:         (file) => 
 429:           file.path.startsWith(folderPath) && 
 430:           !file.excluded && 
 431:           file.type !== 'directory'
 432:       );
 433:       
 434:       // Use a Set for better lookup performance
 435:       const selectedFilesSet = new Set(newSelectedFiles);
 436:       
 437:       // Check if we should select or deselect
 438:       if (isSelected) {
 439:         // Add all files in the folder to selection
 440:         filesInFolder.forEach((file) => {
 441:           if (!selectedFilesSet.has(file.path)) {
 442:             selectedFilesSet.add(file.path);
 443:           }
 444:         });
 445:       } else {
 446:         // Remove all files in the folder from selection
 447:         filesInFolder.forEach((file) => {
 448:           selectedFilesSet.delete(file.path);
 449:         });
 450:       }
 451:       
 452:       // Convert Set back to array
 453:       return Array.from(selectedFilesSet);
 454:     });
 455:   };
 456: 
 457:   // Update the sort change handler
 458:   const handleSortChange = (value: string | string[]) => {
 459:     if (typeof value === 'string') {
 460:       setSortOrder(value);
 461:       applyFiltersAndSort(allFiles, value, searchTerm);
 462:     }
 463:   };
 464: 
 465:   // Handle search change
 466:   const handleSearchChange = (newSearch: string) => {
 467:     setSearchTerm(newSearch);
 468:     applyFiltersAndSort(allFiles, sortOrder, newSearch);
 469:   };
 470: 
 471:   // Calculate total tokens from selected files
 472:   const calculateTotalTokens = () => {
 473:     return selectedFiles.reduce((total: number, path: string) => {
 474:       const file = allFiles.find((f: FileData) => f.path === path);
 475:       return total + (file ? file.tokenCount : 0);
 476:     }, 0);
 477:   };
 478: 
 479:   // Concatenate selected files content for copying,
 480:   // and add user instructions (wrapped in tags) at the bottom if provided.
 481:   const getSelectedFilesContent = () => {
 482:     // Sort selected files according to current sort order
 483:     const [sortKey, sortDir] = sortOrder.split("-");
 484:     const sortedSelected = allFiles
 485:       .filter((file: FileData) => selectedFiles.includes(file.path))
 486:       .sort((a: FileData, b: FileData) => {
 487:         let comparison = 0;
 488: 
 489:         if (sortKey === "name") {
 490:           comparison = a.name.localeCompare(b.name);
 491:         } else if (sortKey === "tokens") {
 492:           comparison = a.tokenCount - b.tokenCount;
 493:         } else if (sortKey === "size") {
 494:           comparison = a.size - b.size;
 495:         }
 496: 
 497:         return sortDir === "asc" ? comparison : -comparison;
 498:       });
 499: 
 500:     if (sortedSelected.length === 0) {
 501:       return "No files selected.";
 502:     }
 503: 
 504:     let concatenatedString = "";
 505: 
 506:     // Add ASCII file tree based on the selected mode
 507:     if (fileTreeMode !== "none" && selectedFolder) {
 508:       let filesToInclude = sortedSelected;
 509:       
 510:       // For the 'complete' mode, include all files
 511:       if (fileTreeMode === "complete") {
 512:         filesToInclude = allFiles;
 513:       }
 514:       
 515:       // For all modes, we pass the fileTreeMode parameter to the function
 516:       const asciiTree = generateAsciiFileTree(filesToInclude, selectedFolder, fileTreeMode);
 517:       concatenatedString += `<file_map>\n${selectedFolder}\n${asciiTree}\n</file_map>\n\n`;
 518:     }
 519: 
 520:     // Improve formatting of file header - add file path and token count
 521:     sortedSelected.forEach((file: FileData) => {
 522:       // Extract relative path from the full path
 523:       let relativePath = "";
 524:       if (selectedFolder && file.path.startsWith(selectedFolder)) {
 525:         relativePath = file.path.substring(selectedFolder.length);
 526:         if (relativePath.startsWith("/") || relativePath.startsWith("\\")) {
 527:           relativePath = relativePath.substring(1);
 528:         }
 529:       } else {
 530:         relativePath = file.path;
 531:       }
 532:       
 533:       // Add formatted file header with token count and path
 534:       concatenatedString += `\n\n// ---- File: ${relativePath} (${file.tokenCount} tokens) ----\n\n`;
 535:       concatenatedString += file.content;
 536:     });
 537: 
 538:     // Wrap user instructions if any and add to the bottom
 539:     const userInstructionsBlock = userInstructions.trim()
 540:       ? `\n<user_instructions>\n${userInstructions}\n</user_instructions>\n\n`
 541:       : "";
 542:     return concatenatedString + userInstructionsBlock;
 543:   };
 544: 
 545:   // Sort options for the dropdown
 546:   const sortOptions = [
 547:     { value: "tokens-desc", label: "Tokens (High to Low)" },
 548:     { value: "tokens-asc", label: "Tokens (Low to High)" },
 549:     { value: "name-asc", label: "Name (A to Z)" },
 550:     { value: "name-desc", label: "Name (Z to A)" },
 551:     { value: "date-newest", label: "Date Modified (Newest)" },
 552:     { value: "date-oldest", label: "Date Modified (Oldest)" },
 553:   ];
 554: 
 555:   // Handle expand/collapse state changes
 556:   const toggleExpanded = (nodeId: string) => {
 557:     setExpandedNodes((prev: Map<string, boolean>) => {
 558:       const newState = new Map(prev);
 559:       const currentValue = prev.get(nodeId);
 560:       newState.set(nodeId, currentValue === undefined ? true : !currentValue);
 561:       
 562:       // Save to localStorage as an array of entries [key, value]
 563:       try {
 564:         localStorage.setItem(
 565:           STORAGE_KEYS.EXPANDED_NODES,
 566:           JSON.stringify(Array.from(newState.entries()))
 567:         );
 568:       } catch (error) {
 569:         console.error("Error saving expanded nodes:", error);
 570:       }
 571:       
 572:       return newState;
 573:     });
 574:   };
 575: 
 576:   // Define loadIgnorePatterns with useCallback before it's used
 577:   const loadIgnorePatterns = useCallback(async (folderPath: string, isGlobal: boolean = false) => {
 578:     if (!window.electron) {
 579:       console.log("Not in Electron environment, skipping loadIgnorePatterns");
 580:       return "";
 581:     }
 582:     
 583:     // Prevent duplicate loading of patterns
 584:     if (isGlobal && globalIgnorePatterns !== "") {
 585:       console.log("Global ignore patterns already loaded, skipping...");
 586:       return globalIgnorePatterns;
 587:     }
 588:     
 589:     if (!isGlobal && folderPath === selectedFolder && localIgnorePatterns !== "") {
 590:       console.log("Local ignore patterns already loaded for current folder, skipping...");
 591:       return localIgnorePatterns;
 592:     }
 593:     
 594:     console.log(`Loading ${isGlobal ? 'global' : 'local'} ignore patterns${!isGlobal ? ` for ${folderPath}` : ''}`);
 595:     
 596:     try {
 597:       const result = await window.electron.ipcRenderer.invoke("load-ignore-patterns", {
 598:         folderPath,
 599:         isGlobal
 600:       });
 601:       
 602:       if (result.success) {
 603:         console.log(`Successfully loaded ${isGlobal ? 'global' : 'local'} ignore patterns`);
 604:         
 605:         // Debug log the patterns that were loaded
 606:         const patterns = result.patterns || '';
 607:         if (patterns.trim()) {
 608:           console.log(`Loaded user patterns:\n${patterns}`);
 609:         } else {
 610:           console.log(`No ${isGlobal ? 'global' : 'local'} patterns found`);
 611:         }
 612:         
 613:         // Store system patterns if provided
 614:         if (result.systemPatterns && Array.isArray(result.systemPatterns)) {
 615:           console.log(`Received ${result.systemPatterns.length} system patterns from main process`);
 616:           setSystemIgnorePatterns(result.systemPatterns);
 617:         } else {
 618:           console.warn('No system patterns received from main process or not in expected format');
 619:         }
 620:         
 621:         // Update pattern state
 622:         if (isGlobal) {
 623:           setGlobalIgnorePatterns(patterns);
 624:         } else if (folderPath === selectedFolder) {
 625:           // Only update local patterns if they're for the current folder
 626:           setLocalIgnorePatterns(patterns);
 627:         }
 628:         
 629:         return patterns;
 630:       } else {
 631:         console.error(`Error loading ${isGlobal ? 'global' : 'local'} ignore patterns:`, result.error);
 632:         return "";
 633:       }
 634:     } catch (error) {
 635:       console.error("Error invoking load-ignore-patterns:", error);
 636:       return "";
 637:     }
 638:   }, [globalIgnorePatterns, localIgnorePatterns, selectedFolder]);
 639: 
 640:   // Setup listener for ignore patterns loaded event
 641:   useEffect(() => {
 642:     if (isElectron) {
 643:       const handleIgnorePatternsLoaded = (patterns: string) => {
 644:         setIgnorePatterns(patterns);
 645:       };
 646:       
 647:       window.electron.ipcRenderer.on("ignore-patterns-loaded", handleIgnorePatternsLoaded);
 648:       
 649:       return () => {
 650:         window.electron.ipcRenderer.removeListener("ignore-patterns-loaded", handleIgnorePatternsLoaded);
 651:       };
 652:     }
 653:   }, [isElectron]);
 654: 
 655:   // Load global patterns on startup
 656:   useEffect(() => {
 657:     if (isElectron) {
 658:       // Only load global patterns on startup if we haven't loaded them yet
 659:       if (globalIgnorePatterns === "") {
 660:         loadIgnorePatterns('', true);
 661:       }
 662:     }
 663:   }, [isElectron, globalIgnorePatterns, loadIgnorePatterns]);
 664: 
 665:   // Function to save ignore patterns
 666:   const saveIgnorePatterns = async (patterns: string, isGlobal: boolean, folderPath?: string) => {
 667:     setProcessingStatus({
 668:       status: "processing",
 669:       message: `Saving ${isGlobal ? "global" : "local"} ignore patterns...`,
 670:     });
 671: 
 672:     try {
 673:       // Update state first to show immediate feedback in UI
 674:       if (isGlobal) {
 675:         setGlobalIgnorePatterns(patterns);
 676:       } else if (folderPath) {
 677:         setLocalIgnorePatterns(patterns);
 678:       }
 679: 
 680:       // Use async/await with the new invoke pattern
 681:       const result = await window.electron.ipcRenderer.invoke("save-ignore-patterns", {
 682:         patterns,
 683:         isGlobal,
 684:         folderPath: folderPath || selectedFolder
 685:       });
 686: 
 687:       if (result.success) {
 688:         console.log(`Successfully saved ${isGlobal ? 'global' : 'local'} ignore patterns`);
 689:         
 690:         setProcessingStatus({
 691:           status: "complete",
 692:           message: `${isGlobal ? "Global" : "Local"} ignore patterns saved successfully.`,
 693:         });
 694:         
 695:         // Only reload if absolutely necessary
 696:         // For local patterns, only reload if the folder being modified is the selected folder
 697:         if (!isGlobal && folderPath === selectedFolder) {
 698:           // Use a small delay to allow UI to stabilize before reloading
 699:           setTimeout(() => {
 700:             reloadFolder();
 701:           }, 300);
 702:         }
 703:         // For global patterns, only reload if we're viewing files (have a selected folder)
 704:         else if (isGlobal && selectedFolder) {
 705:           // Use a small delay to allow UI to stabilize before reloading
 706:           setTimeout(() => {
 707:             reloadFolder();
 708:           }, 300);
 709:         }
 710:       } else {
 711:         console.error(`Error saving ${isGlobal ? 'global' : 'local'} ignore patterns:`, result.error);
 712:         
 713:         setProcessingStatus({
 714:           status: "error",
 715:           message: `Error saving ${isGlobal ? "global" : "local"} ignore patterns: ${result.error}`,
 716:         });
 717:       }
 718:     } catch (error) {
 719:       console.error("Error invoking save-ignore-patterns:", error);
 720:       
 721:       setProcessingStatus({
 722:         status: "error",
 723:         message: `Error saving ${isGlobal ? "global" : "local"} ignore patterns: ${String(error)}`,
 724:       });
 725:     }
 726:   };
 727: 
 728:   // Function to reset ignore patterns to defaults
 729:   const resetIgnorePatterns = async (isGlobal: boolean, folderPath?: string) => {
 730:     setProcessingStatus({
 731:       status: "processing",
 732:       message: `Resetting ${isGlobal ? "global" : "local"} ignore patterns...`,
 733:     });
 734: 
 735:     try {
 736:       // Update state immediately for UI feedback
 737:       if (isGlobal) {
 738:         setGlobalIgnorePatterns("");
 739:       } else if (folderPath) {
 740:         setLocalIgnorePatterns("");
 741:       }
 742: 
 743:       // Use async/await with the new invoke pattern
 744:       const result = await window.electron.ipcRenderer.invoke("reset-ignore-patterns", {
 745:         isGlobal,
 746:         folderPath: folderPath || selectedFolder
 747:       });
 748: 
 749:       if (result.success) {
 750:         console.log(`Successfully reset ${isGlobal ? 'global' : 'local'} ignore patterns`);
 751:         
 752:         // Update the local pattern state if applicable
 753:         if (!isGlobal && folderPath) {
 754:           setLocalIgnorePatterns("");
 755:         } else if (isGlobal) {
 756:           setGlobalIgnorePatterns("");
 757:         }
 758:         
 759:         setProcessingStatus({
 760:           status: "complete",
 761:           message: `${isGlobal ? "Global" : "Local"} ignore patterns have been reset.`,
 762:         });
 763:         
 764:         // Only reload if necessary and with a delay
 765:         if (!isGlobal && folderPath === selectedFolder) {
 766:           setTimeout(() => {
 767:             reloadFolder();
 768:           }, 300);
 769:         } else if (isGlobal && selectedFolder) {
 770:           setTimeout(() => {
 771:             reloadFolder();
 772:           }, 300);
 773:         }
 774:       } else {
 775:         console.error(`Error resetting ${isGlobal ? 'global' : 'local'} ignore patterns:`, result.error);
 776:         
 777:         setProcessingStatus({
 778:           status: "error",
 779:           message: `Error resetting ${isGlobal ? "global" : "local"} ignore patterns: ${result.error}`,
 780:         });
 781:       }
 782:     } catch (error) {
 783:       console.error("Error invoking reset-ignore-patterns:", error);
 784:       
 785:       setProcessingStatus({
 786:         status: "error",
 787:         message: `Error resetting ${isGlobal ? "global" : "local"} ignore patterns: ${String(error)}`,
 788:       });
 789:     }
 790:   };
 791: 
 792:   // Wrap reloadFolder in useCallback to prevent recreating it on every render
 793:   const reloadFolder = useCallback(() => {
 794:     if (isElectron && selectedFolder) {
 795:       console.log(`Reloading folder: ${selectedFolder}`);
 796:       setProcessingStatus({
 797:         status: "processing",
 798:         message: "Loading files...",
 799:       });
 800:       
 801:       // Clear state
 802:       setAllFiles([]);
 803:       setDisplayedFiles([]);
 804:       
 805:       // Trigger folder loading - use the correct event name
 806:       window.electron.ipcRenderer.send("reload-file-list", selectedFolder);
 807:     }
 808:   }, [isElectron, selectedFolder, setProcessingStatus, setAllFiles, setDisplayedFiles]);
 809: 
 810:   // Now add the ignore-patterns-saved handler after reloadFolder is defined
 811:   useEffect(() => {
 812:     if (isElectron) {
 813:       const handleIgnorePatternsSaved = (result: { 
 814:         success: boolean, 
 815:         isGlobal?: boolean, 
 816:         folderPath?: string,
 817:         error?: string 
 818:       }) => {
 819:         if (result.success) {
 820:           console.log("Ignore patterns saved successfully");
 821:           
 822:           // Auto-reload when patterns are saved
 823:           if (selectedFolder) {
 824:             // If global patterns were changed, or if local patterns for current folder were changed
 825:             if (result.isGlobal || (!result.isGlobal && result.folderPath === selectedFolder)) {
 826:               console.log("Automatically reloading file list after pattern change");
 827:               reloadFolder();
 828:             }
 829:           }
 830:         } else {
 831:           console.error("Failed to save ignore patterns:", result.error);
 832:         }
 833:       };
 834:       
 835:       // Increase the maximum number of listeners to prevent the warning
 836:       if (window.electron.ipcRenderer.setMaxListeners) {
 837:         window.electron.ipcRenderer.setMaxListeners(20);
 838:       }
 839:       
 840:       window.electron.ipcRenderer.on("ignore-patterns-saved", handleIgnorePatternsSaved);
 841:       
 842:       return () => {
 843:         window.electron.ipcRenderer.removeListener("ignore-patterns-saved", handleIgnorePatternsSaved);
 844:       };
 845:     }
 846:   }, [isElectron, selectedFolder, reloadFolder]);
 847: 
 848:   // Add dialog states
 849:   const [showClearSelectionDialog, setShowClearSelectionDialog] = useState(false);
 850:   const [showRemoveAllFoldersDialog, setShowRemoveAllFoldersDialog] = useState(false);
 851:   const [showResetPatternsDialog, setShowResetPatternsDialog] = useState(false);
 852:   const [resetPatternsContext, setResetPatternsContext] = useState<{isGlobal: boolean; folderPath: string} | null>(null);
 853: 
 854:   // Update handlers to show dialogs
 855:   const handleClearSelectionClick = () => {
 856:     setShowClearSelectionDialog(true);
 857:   };
 858: 
 859:   const clearSelection = () => {
 860:     setSelectedFiles([]);
 861:     setShowClearSelectionDialog(false);
 862:   };
 863: 
 864:   const handleRemoveAllFoldersClick = () => {
 865:     setShowRemoveAllFoldersDialog(true);
 866:   };
 867: 
 868:   const removeAllFolders = () => {
 869:     setSelectedFolder(null);
 870:     setAllFiles([]);
 871:     setSelectedFiles([]);
 872:     setDisplayedFiles([]);
 873:     
 874:     // Clear localStorage
 875:     localStorage.removeItem(STORAGE_KEYS.SELECTED_FOLDER);
 876:     localStorage.removeItem(STORAGE_KEYS.SELECTED_FILES);
 877:     localStorage.removeItem(STORAGE_KEYS.EXPANDED_NODES);
 878:     
 879:     // Clear sessionStorage flag to allow loading data next time
 880:     sessionStorage.removeItem("hasLoadedInitialData");
 881:     setShowRemoveAllFoldersDialog(false);
 882:   };
 883: 
 884:   const handleResetPatternsClick = (isGlobal: boolean, folderPath: string) => {
 885:     setResetPatternsContext({ isGlobal, folderPath });
 886:     setShowResetPatternsDialog(true);
 887:   };
 888: 
 889:   // Initialize system patterns with defaults on component mount
 890:   useEffect(() => {
 891:     console.log(`App initialized with ${DEFAULT_SYSTEM_PATTERNS.length} default system patterns`);
 892:     console.log('System patterns sample:', DEFAULT_SYSTEM_PATTERNS.slice(0, 5));
 893:   }, []);
 894: 
 895:   // Clear ignore patterns state when folder changes
 896:   useEffect(() => {
 897:     if (selectedFolder) {
 898:       // Reset local patterns state when folder changes
 899:       setLocalIgnorePatterns("");
 900:       console.log("Folder changed, clearing local patterns state");
 901:     }
 902:   }, [selectedFolder]);
 903: 
 904:   // Function to clear local ignore patterns for a folder
 905:   const clearLocalIgnorePatterns = async (folderPath: string) => {
 906:     setProcessingStatus({
 907:       status: "processing",
 908:       message: "Clearing local ignore patterns...",
 909:     });
 910: 
 911:     try {
 912:       // Update state immediately for UI feedback
 913:       setLocalIgnorePatterns("");
 914:       
 915:       const result = await window.electron.ipcRenderer.invoke("clear-local-ignore-patterns", {
 916:         folderPath
 917:       });
 918: 
 919:       if (result.success) {
 920:         console.log("Successfully cleared local ignore patterns");
 921:         
 922:         setLocalIgnorePatterns("");
 923:         
 924:         setProcessingStatus({
 925:           status: "complete",
 926:           message: "Local ignore patterns cleared successfully.",
 927:         });
 928:         
 929:         // Only reload if the folder being cleared is the current selected folder
 930:         if (folderPath === selectedFolder) {
 931:           setTimeout(() => {
 932:             reloadFolder();
 933:           }, 300);
 934:         }
 935:       } else {
 936:         console.error("Error clearing local ignore patterns:", result.error);
 937:         
 938:         setProcessingStatus({
 939:           status: "error",
 940:           message: `Error clearing local ignore patterns: ${result.error}`,
 941:         });
 942:       }
 943:     } catch (error) {
 944:       console.error("Error invoking clear-local-ignore-patterns:", error);
 945:       
 946:       setProcessingStatus({
 947:         status: "error",
 948:         message: `Error clearing local ignore patterns: ${String(error)}`,
 949:       });
 950:     }
 951:   };
 952: 
 953:   const truncatePath = (path: string) => {
 954:     const parts = path.split('/');
 955:     if (parts.length <= 3) return path;
 956:     
 957:     // Get the last two meaningful parts
 958:     const lastParts = parts.filter(p => p).slice(-2);
 959:     return `.../${lastParts.join('/')}`;
 960:   };
 961: 
 962:   return (
 963:     <ThemeProvider>
 964:       <div className={styles.appContainer}>
 965:         <header className={styles.appHeader}>
 966:           <h1>PasteMax</h1>
 967:           <div className={styles.headerActions}>
 968:             <a href="#" className={styles.headerLink}>Guide</a>
 969:             <div className={styles.headerSeparator}></div>
 970:             <ThemeToggle />
 971:             <div className={styles.headerSeparator}></div>
 972:             <a
 973:               href="https://github.com/jsulpis/pastemax"
 974:               target="_blank"
 975:               rel="noopener noreferrer"
 976:               className={styles.githubButton}
 977:             >
 978:               <Github size={16} />
 979:             </a>
 980:           </div>
 981:         </header>
 982: 
 983:         {processingStatus.status === "processing" && (
 984:           <div className={styles.processingIndicator}>
 985:             <div className={styles.spinner}></div>
 986:             <span>{processingStatus.message}</span>
 987:           </div>
 988:         )}
 989: 
 990:         {processingStatus.status === "error" && (
 991:           <div className={styles.errorMessage}>Error: {processingStatus.message}</div>
 992:         )}
 993: 
 994:         <div className={styles.mainContainer}>
 995:           <Sidebar
 996:             selectedFolder={selectedFolder}
 997:             openFolder={openFolder}
 998:             allFiles={allFiles}
 999:             selectedFiles={selectedFiles}
1000:             toggleFileSelection={toggleFileSelection}
1001:             toggleFolderSelection={toggleFolderSelection}
1002:             searchTerm={searchTerm}
1003:             onSearchChange={handleSearchChange}
1004:             selectAllFiles={selectAllFiles}
1005:             deselectAllFiles={deselectAllFiles}
1006:             expandedNodes={expandedNodes}
1007:             toggleExpanded={toggleExpanded}
1008:             reloadFolder={reloadFolder}
1009:             clearSelection={clearSelection}
1010:             removeAllFolders={removeAllFolders}
1011:             ignorePatterns={ignorePatterns}
1012:             setIgnorePatterns={setIgnorePatterns}
1013:             loadIgnorePatterns={loadIgnorePatterns}
1014:             saveIgnorePatterns={saveIgnorePatterns}
1015:             resetIgnorePatterns={resetIgnorePatterns}
1016:             systemIgnorePatterns={systemIgnorePatterns}
1017:             clearIgnorePatterns={clearLocalIgnorePatterns}
1018:             onClearSelectionClick={handleClearSelectionClick}
1019:             onRemoveAllFoldersClick={handleRemoveAllFoldersClick}
1020:             onResetPatternsClick={handleResetPatternsClick}
1021:             fileTreeSortOrder={fileTreeSortOrder}
1022:             onSortOrderChange={setFileTreeSortOrder}
1023:           />
1024:           
1025:           {selectedFolder ? (
1026:             <div className={styles.contentArea}>
1027:               <div className={styles.contentHeader}>
1028:                 <h1 className={styles.contentTitle}>Files</h1>
1029:                 <div className={styles.contentActions}>
1030:                   <div className={styles.folderPathDisplay}>
1031:                     {truncatePath(selectedFolder)}
1032:                   </div>
1033:                   <div className={styles.headerSeparator} />
1034:                   <div className={styles.fileStats}>
1035:                     {selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'} | ~
1036:                     {calculateTotalTokens().toLocaleString()} tokens
1037:                   </div>
1038:                   <div className={styles.headerSeparator} />
1039:                   <div className={styles.dropdownContainer}>
1040:                     <Dropdown
1041:                       options={sortOptions}
1042:                       value={sortOrder}
1043:                       onChange={handleSortChange}
1044:                       variant="icon"
1045:                       size="sm"
1046:                       icon={<ArrowUpDown />}
1047:                       title="Sort files"
1048:                     />
1049:                   </div>
1050:                 </div>
1051:               </div>
1052: 
1053:               <FileList
1054:                 files={displayedFiles}
1055:                 selectedFiles={selectedFiles}
1056:                 toggleFileSelection={toggleFileSelection}
1057:               />
1058: 
1059:               {showUserInstructions && (
1060:                 <div className={styles.userInstructionsContainer}>
1061:                   <UserInstructions
1062:                     instructions={userInstructions}
1063:                     setInstructions={setUserInstructions}
1064:                   />
1065:                 </div>
1066:               )}
1067: 
1068:               <ControlContainer
1069:                 fileTreeMode={fileTreeMode}
1070:                 setFileTreeMode={setFileTreeMode}
1071:                 showUserInstructions={showUserInstructions}
1072:                 setShowUserInstructions={setShowUserInstructions}
1073:                 getSelectedFilesContent={getSelectedFilesContent}
1074:                 selectedFilesCount={selectedFiles.length}
1075:                 fileTreeSortOrder={fileTreeSortOrder}
1076:                 setFileTreeSortOrder={setFileTreeSortOrder}
1077:                 ignorePatterns={ignorePatterns}
1078:                 setIgnorePatterns={setIgnorePatterns}
1079:                 loadIgnorePatterns={loadIgnorePatterns}
1080:                 saveIgnorePatterns={saveIgnorePatterns}
1081:                 resetIgnorePatterns={resetIgnorePatterns}
1082:                 reloadFolder={reloadFolder}
1083:                 clearSelection={clearSelection}
1084:                 removeAllFolders={removeAllFolders}
1085:               />
1086:             </div>
1087:           ) : (
1088:             <div className={styles.contentArea}>
1089:               <div className={styles.emptyStateContent}>
1090:                 <h2>Welcome to PasteMax</h2>
1091:                 <p>Select a folder from the file tree panel to start working with your files.</p>
1092:                 <p>PasteMax helps you format your code for AI models by:</p>
1093:                 <ul>
1094:                   <li>Selecting specific files</li>
1095:                   <li>Organizing them in a tree structure</li>
1096:                   <li>Adding custom instructions</li>
1097:                   <li>Calculating token counts</li>
1098:                 </ul>
1099:               </div>
1100:             </div>
1101:           )}
1102:         </div>
1103: 
1104:         {/* Add confirmation dialogs */}
1105:         <ConfirmationDialog
1106:           isOpen={showClearSelectionDialog}
1107:           onClose={() => setShowClearSelectionDialog(false)}
1108:           onConfirm={clearSelection}
1109:           title="Clear Selection"
1110:           description="Are you sure you want to clear all selected files?"
1111:           confirmLabel="Clear Selection"
1112:           variant="destructive"
1113:         />
1114: 
1115:         <ConfirmationDialog
1116:           isOpen={showRemoveAllFoldersDialog}
1117:           onClose={() => setShowRemoveAllFoldersDialog(false)}
1118:           onConfirm={removeAllFolders}
1119:           title="Remove All Folders"
1120:           description="Are you sure you want to remove all folders? This will reset the application state."
1121:           confirmLabel="Remove All"
1122:           variant="destructive"
1123:         />
1124: 
1125:         <ConfirmationDialog
1126:           isOpen={showResetPatternsDialog}
1127:           onClose={() => setShowResetPatternsDialog(false)}
1128:           onConfirm={() => {
1129:             if (resetPatternsContext) {
1130:               resetIgnorePatterns(
1131:                 resetPatternsContext.isGlobal,
1132:                 resetPatternsContext.folderPath
1133:               );
1134:               setShowResetPatternsDialog(false);
1135:               setResetPatternsContext(null);
1136:             }
1137:           }}
1138:           title={`Reset ${resetPatternsContext?.isGlobal ? 'Global' : 'Local'} Ignore Patterns`}
1139:           description="Are you sure you want to reset the ignore patterns to their default values?"
1140:           confirmLabel="Reset Patterns"
1141:           variant="destructive"
1142:         />
1143:       </div>
1144:     </ThemeProvider>
1145:   );
1146: };
1147: 
1148: export default App;
```
