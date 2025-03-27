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
    __tests__/
      IgnorePatterns.test.tsx
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
    ErrorBoundary.tsx
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
    patternUtils.ts
    sortIcons.tsx
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

## File: src/components/__tests__/IgnorePatterns.test.tsx
```typescript
  1: import React from 'react';
  2: import { render, screen, fireEvent } from '@testing-library/react';
  3: import '@testing-library/jest-dom';
  4: import IgnorePatterns from '../IgnorePatterns';
  5: 
  6: describe('IgnorePatterns Component', () => {
  7:   const defaultProps = {
  8:     isOpen: true,
  9:     onClose: jest.fn(),
 10:     globalIgnorePatterns: '',
 11:     localIgnorePatterns: '',
 12:     systemIgnorePatterns: ['**/.git/**', '**/node_modules/**'],
 13:     recentFolders: ['/test/folder1', '/test/folder2'],
 14:     saveIgnorePatterns: jest.fn(),
 15:     resetIgnorePatterns: jest.fn(),
 16:     clearIgnorePatterns: jest.fn(),
 17:   };
 18: 
 19:   beforeEach(() => {
 20:     jest.clearAllMocks();
 21:   });
 22: 
 23:   describe('Controlled Mode Tests', () => {
 24:     const mockSetExcludedPatterns = jest.fn();
 25: 
 26:     it('initializes with provided excluded patterns', () => {
 27:       render(
 28:         <IgnorePatterns
 29:           {...defaultProps}
 30:           excludedSystemPatterns={['**/.git/**']}
 31:           setExcludedSystemPatterns={mockSetExcludedPatterns}
 32:         />
 33:       );
 34: 
 35:       const gitSwitch = screen.getByLabelText('**/.git/**');
 36:       const nodeModulesSwitch = screen.getByLabelText('**/node_modules/**');
 37: 
 38:       expect(gitSwitch).not.toBeChecked();
 39:       expect(nodeModulesSwitch).toBeChecked();
 40:     });
 41: 
 42:     it('syncs state with parent on pattern toggle', () => {
 43:       render(
 44:         <IgnorePatterns
 45:           {...defaultProps}
 46:           excludedSystemPatterns={[]}
 47:           setExcludedSystemPatterns={mockSetExcludedPatterns}
 48:         />
 49:       );
 50: 
 51:       const nodeModulesPattern = screen.getByText('**/node_modules/**');
 52:       const toggleButton = nodeModulesPattern.closest('div')?.querySelector('button');
 53:       
 54:       if (!toggleButton) {
 55:         throw new Error('Toggle button not found');
 56:       }
 57: 
 58:       fireEvent.click(toggleButton);
 59:       expect(mockSetExcludedPatterns).toHaveBeenCalledWith(['**/node_modules/**']);
 60:     });
 61: 
 62:     it('syncs state with parent on modal close', () => {
 63:       render(
 64:         <IgnorePatterns
 65:           {...defaultProps}
 66:           excludedSystemPatterns={[]}
 67:           setExcludedSystemPatterns={mockSetExcludedPatterns}
 68:         />
 69:       );
 70: 
 71:       const closeButton = screen.getByLabelText('Close');
 72:       fireEvent.click(closeButton);
 73: 
 74:       expect(mockSetExcludedPatterns).toHaveBeenCalledWith([]);
 75:       expect(defaultProps.onClose).toHaveBeenCalled();
 76:     });
 77:   });
 78: 
 79:   describe('Uncontrolled Mode Tests', () => {
 80:     it('works with only excludedSystemPatterns (no setter)', () => {
 81:       render(
 82:         <IgnorePatterns
 83:           {...defaultProps}
 84:           excludedSystemPatterns={['**/.git/**']}
 85:         />
 86:       );
 87: 
 88:       const nodeModulesPattern = screen.getByText('**/node_modules/**');
 89:       const toggleButton = nodeModulesPattern.closest('div')?.querySelector('button');
 90:       
 91:       if (!toggleButton) {
 92:         throw new Error('Toggle button not found');
 93:       }
 94: 
 95:       fireEvent.click(toggleButton);
 96:       expect(defaultProps.saveIgnorePatterns).not.toHaveBeenCalled();
 97:     });
 98: 
 99:     it('works with neither prop', () => {
100:       render(<IgnorePatterns {...defaultProps} />);
101: 
102:       const nodeModulesPattern = screen.getByText('**/node_modules/**');
103:       const toggleButton = nodeModulesPattern.closest('div')?.querySelector('button');
104:       
105:       if (!toggleButton) {
106:         throw new Error('Toggle button not found');
107:       }
108: 
109:       fireEvent.click(toggleButton);
110:       expect(defaultProps.saveIgnorePatterns).not.toHaveBeenCalled();
111:     });
112:   });
113: 
114:   describe('Pattern Management Tests', () => {
115:     it('saves global patterns correctly', async () => {
116:       render(<IgnorePatterns {...defaultProps} />);
117: 
118:       const saveButton = screen.getByText('Save');
119:       fireEvent.click(saveButton);
120: 
121:       expect(defaultProps.saveIgnorePatterns).toHaveBeenCalledWith('', true);
122:     });
123: 
124:     it('handles keyboard shortcuts', () => {
125:       render(<IgnorePatterns {...defaultProps} />);
126: 
127:       fireEvent.keyDown(window, { key: 's', ctrlKey: true });
128:       expect(defaultProps.saveIgnorePatterns).toHaveBeenCalled();
129:     });
130:   });
131: 
132:   describe('UI Interaction Tests', () => {
133:     it('toggles pattern categories', () => {
134:       render(<IgnorePatterns {...defaultProps} />);
135: 
136:       const categoryHeader = screen.getByText('Version Control').closest('div');
137:       
138:       if (!categoryHeader) {
139:         throw new Error('Category header not found');
140:       }
141: 
142:       fireEvent.click(categoryHeader);
143:       expect(categoryHeader.parentElement).not.toHaveClass('categoryExpanded');
144: 
145:       fireEvent.click(categoryHeader);
146:       expect(categoryHeader.parentElement).toHaveClass('categoryExpanded');
147:     });
148: 
149:     it('switches between global and local tabs', () => {
150:       render(<IgnorePatterns {...defaultProps} />);
151: 
152:       const localTab = screen.getByText('Local');
153:       fireEvent.click(localTab);
154: 
155:       expect(screen.getByLabelText('Folder select')).toBeInTheDocument();
156:     });
157:   });
158: });
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

## File: src/components/ErrorBoundary.tsx
```typescript
 1: import React, { Component, ErrorInfo } from 'react';
 2: 
 3: interface Props {
 4:   children: React.ReactNode;
 5:   fallback?: React.ReactNode;
 6: }
 7: 
 8: interface State {
 9:   hasError: boolean;
10:   error: Error | null;
11: }
12: 
13: /**
14:  * Error Boundary component for catching and handling React component errors.
15:  * Provides a fallback UI when child components throw errors.
16:  */
17: export class ErrorBoundary extends Component<Props, State> {
18:   constructor(props: Props) {
19:     super(props);
20:     this.state = {
21:       hasError: false,
22:       error: null
23:     };
24:   }
25: 
26:   static getDerivedStateFromError(error: Error): State {
27:     return {
28:       hasError: true,
29:       error
30:     };
31:   }
32: 
33:   componentDidCatch(error: Error, errorInfo: ErrorInfo) {
34:     console.error('Error caught by boundary:', error);
35:     console.error('Component stack:', errorInfo.componentStack);
36:   }
37: 
38:   render() {
39:     if (this.state.hasError) {
40:       return this.props.fallback || (
41:         <div className="error-boundary">
42:           <h3>Something went wrong</h3>
43:           <p>{this.state.error?.message}</p>
44:           <button onClick={() => this.setState({ hasError: false, error: null })}>
45:             Try again
46:           </button>
47:         </div>
48:       );
49:     }
50: 
51:     return this.props.children;
52:   }
53: }
```

## File: src/components/SearchBar.tsx
```typescript
  1: import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
  2: import { SidebarProps, TreeNode, SortOrder, FileData } from "../types/FileTypes";
  3: import TreeItem from "./TreeItem";
  4: import FileTreeHeader from "./FileTreeHeader";
  5: import IgnorePatterns from "./IgnorePatterns"; // Keep import if modal is triggered here
  6: import { FolderPlus } from "lucide-react";
  7: import { Button } from "./ui";
  8: import SearchBar from "./SearchBar";
  9: import styles from "./Sidebar.module.css";
 10: import { normalizePath } from "../utils/pathUtils"; // Import normalizePath
 11: 
 12: // Define the structure for pattern state passed from App
 13: interface IgnorePatternsState {
 14:   patterns: string;
 15:   excludedSystemPatterns: string[];
 16: }
 17: 
 18: // Extend the existing SidebarProps from FileTypes
 19: interface ExtendedSidebarProps extends SidebarProps {
 20:   reloadFolder: () => void;
 21:   clearSelection: () => void; // Used by FileTreeHeader -> Dropdown
 22:   removeAllFolders: () => void; // Used by FileTreeHeader -> Dropdown
 23:   // Ignore pattern related props passed down from App
 24:   loadIgnorePatterns: (folderPath: string, isGlobal?: boolean) => Promise<void>; // Changed return type
 25:   saveIgnorePatterns: (patterns: string, isGlobal: boolean, folderPath?: string) => Promise<void>;
 26:   resetIgnorePatterns: (isGlobal: boolean, folderPath?: string) => Promise<void>; // Changed prop name to match App
 27:   systemIgnorePatterns: string[];
 28:   clearIgnorePatterns: (folderPath: string) => Promise<void>; // Changed prop name to match App
 29:   onClearSelectionClick: () => void; // Keep for dialog trigger
 30:   onRemoveAllFoldersClick: () => void; // Keep for dialog trigger
 31:   onResetPatternsClick: (isGlobal: boolean, folderPath: string) => void; // Prop to trigger dialog in App
 32:   fileTreeSortOrder?: SortOrder;
 33:   onSortOrderChange?: (newSortOrder: SortOrder) => void;
 34:   // New props for controlled IgnorePatterns modal
 35:   globalPatternsState: IgnorePatternsState;
 36:   localPatternsState: IgnorePatternsState;
 37:   onExcludedSystemPatternsChange: (patterns: string[]) => void;
 38: }
 39: 
 40: // Debounce delay in ms
 41: const DEBOUNCE_DELAY = 250; // Slightly increased debounce
 42: 
 43: // Use a timeout to prevent infinite tree building loops
 44: const TREE_BUILD_TIMEOUT = 7000; // Increased timeout
 45: 
 46: const Sidebar: React.FC<ExtendedSidebarProps> = ({
 47:   selectedFolder,
 48:   openFolder,
 49:   allFiles, // Contains only metadata now
 50:   selectedFiles,
 51:   toggleFileSelection,
 52:   toggleFolderSelection,
 53:   searchTerm,
 54:   onSearchChange,
 55:   selectAllFiles,
 56:   deselectAllFiles,
 57:   expandedNodes,
 58:   toggleExpanded,
 59:   reloadFolder,
 60:   clearSelection, // Renamed prop from App
 61:   removeAllFolders, // Renamed prop from App
 62:   loadIgnorePatterns,
 63:   saveIgnorePatterns,
 64:   resetIgnorePatterns, // Prop for triggering App's reset logic (via confirmation)
 65:   systemIgnorePatterns,
 66:   clearIgnorePatterns, // Prop for triggering App's clear logic (via confirmation)
 67:   onClearSelectionClick, // Prop to trigger confirmation dialog in App
 68:   onRemoveAllFoldersClick, // Prop to trigger confirmation dialog in App
 69:   onResetPatternsClick, // Prop to trigger confirmation dialog in App
 70:   fileTreeSortOrder,
 71:   onSortOrderChange,
 72:   // Pass through new props for IgnorePatterns
 73:   globalPatternsState,
 74:   localPatternsState,
 75:   onExcludedSystemPatternsChange,
 76: }) => {
 77:   const [fileTree, setFileTree] = useState<TreeNode[]>([]);
 78:   const [sidebarWidth, setSidebarWidth] = useState(300);
 79:   const [isResizing, setIsResizing] = useState(false);
 80: 
 81:   // State for ignore patterns modal visibility
 82:   const [ignoreModalOpen, setIgnoreModalOpen] = useState(false);
 83: 
 84:   const MIN_SIDEBAR_WIDTH = 200;
 85:   const MAX_SIDEBAR_WIDTH = 600; // Increased max width slightly
 86: 
 87:   // Refs
 88:   const isBuildingTreeRef = useRef(false);
 89:   const buildTimeoutRef = useRef<NodeJS.Timeout | null>(null);
 90:   // const lastSelectedFilesRef = useRef<string[]>([]); // Maybe not needed
 91: 
 92:   // useEffect(() => { lastSelectedFilesRef.current = selectedFiles; }, [selectedFiles]); // Maybe not needed
 93: 
 94:   // Helper: Flatten tree (Iterative)
 95:   const flattenTree = useCallback((nodes: TreeNode[]): TreeNode[] => {
 96:     const result: TreeNode[] = [];
 97:     const stack: TreeNode[] = [...nodes].reverse(); // Use reverse for depth-first correct order
 98: 
 99:     while (stack.length > 0) {
100:         const node = stack.pop(); // Get the last node
101:         if (!node) continue;
102: 
103:         result.push(node);
104: 
105:         // If expanded and has children, add children to the stack (in reverse order to process them correctly)
106:         if (node.type === "directory" && node.isExpanded && node.children?.length) {
107:             // Add children in reverse order so they are popped in the correct order
108:             for (let i = node.children.length - 1; i >= 0; i--) {
109:                  stack.push(node.children[i]);
110:             }
111:         }
112:     }
113:     return result;
114:   }, []);
115: 
116: 
117:   // Helper: Filter tree (no changes needed)
118:   const filterTree = useCallback((nodes: TreeNode[], term: string): TreeNode[] => {
119:      if (!term) return nodes;
120:      const lowerTerm = term.toLowerCase();
121:      const hasMatch = (node: TreeNode): boolean => {
122:         if (node.name.toLowerCase().includes(lowerTerm)) return true;
123:         return node.type === "directory" && !!node.children?.some(hasMatch);
124:      };
125:      const filterNode = (node: TreeNode): TreeNode | null => {
126:         if (!hasMatch(node)) return null;
127:         if (node.type === "file") return node;
128:         if (node.type === "directory") {
129:             const filteredChildren = node.children?.map(filterNode).filter((n): n is TreeNode => n !== null) || [];
130:              if (node.name.toLowerCase().includes(lowerTerm) || filteredChildren.length > 0) {
131:                  return { ...node, isExpanded: true, children: filteredChildren };
132:              }
133:              return null;
134:         }
135:         return null;
136:      };
137:      return nodes.map(filterNode).filter((n): n is TreeNode => n !== null);
138:   }, []);
139: 
140:   const memoizedFilteredTree = useMemo(() => {
141:     return searchTerm ? filterTree(fileTree, searchTerm) : fileTree;
142:   }, [fileTree, searchTerm, filterTree]);
143: 
144:   const memoizedFlattenedTree = useMemo(() => {
145:     return flattenTree(memoizedFilteredTree);
146:   }, [memoizedFilteredTree, flattenTree]);
147: 
148:   // Resize handlers (no changes needed)
149:   const handleResizeStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
150:     e.preventDefault(); setIsResizing(true);
151:   }, []);
152:   useEffect(() => {
153:     const handleResize = (e: globalThis.MouseEvent) => {
154:       if (isResizing) {
155:         const newWidth = Math.max(MIN_SIDEBAR_WIDTH, Math.min(e.clientX, MAX_SIDEBAR_WIDTH));
156:         setSidebarWidth(newWidth);
157:       }
158:     };
159:     const handleResizeEnd = () => setIsResizing(false);
160:     if (isResizing) {
161:         document.addEventListener("mousemove", handleResize);
162:         document.addEventListener("mouseup", handleResizeEnd);
163:     }
164:     return () => {
165:       document.removeEventListener("mousemove", handleResize);
166:       document.removeEventListener("mouseup", handleResizeEnd);
167:     };
168:   }, [isResizing]); // MAX_SIDEBAR_WIDTH removed as it's constant
169: 
170:   // --- Tree Sorting Logic ---
171:   const sortFileTreeNodes = useCallback((nodes: TreeNode[]): TreeNode[] => {
172:     if (!nodes) return [];
173:     return [...nodes].sort((a, b) => {
174:       if (a.type !== b.type) return a.type === "directory" ? -1 : 1;
175:       const order = fileTreeSortOrder || "name-ascending"; // Default sort
176:       const [key, dir] = order.split('-');
177:       let comparison = 0;
178:       // Use optional chaining and default values safely
179:       const aVal = key === 'tokens' ? (a.fileData?.tokenCount ?? 0) : key === 'date' ? (a.fileData?.lastModified ?? 0) : a.name;
180:       const bVal = key === 'tokens' ? (b.fileData?.tokenCount ?? 0) : key === 'date' ? (b.fileData?.lastModified ?? 0) : b.name;
181: 
182:       if (typeof aVal === 'string' && typeof bVal === 'string') comparison = aVal.localeCompare(bVal);
183:       else if (typeof aVal === 'number' && typeof bVal === 'number') comparison = aVal - bVal;
184: 
185:       return dir === 'ascending' ? comparison : -comparison;
186:     });
187:   }, [fileTreeSortOrder]);
188: 
189:   const sortNodesRecursively = useCallback((nodes: TreeNode[]): TreeNode[] => {
190:     if (!nodes) return [];
191:     const sorted = sortFileTreeNodes(nodes);
192:     return sorted.map(node =>
193:       node.type === 'directory' && node.children
194:         ? { ...node, children: sortNodesRecursively(node.children) }
195:         : node
196:     );
197:   }, [sortFileTreeNodes]);
198: 
199:   // --- Tree Building Logic ---
200:   const buildFileTree = useCallback((files: FileData[], rootFolder: string): TreeNode[] => {
201:      if (!files || files.length === 0 || !rootFolder) return [];
202:      const fileMap: Record<string, any> = {};
203:      const normalizedRoot = normalizePath(rootFolder); // Normalize root path once
204: 
205:      files.forEach(file => {
206:         const normalizedPath = normalizePath(file.path);
207:         // Basic check if the path starts with the root. More robust checks might be needed for edge cases like symlinks outside root.
208:         if (!normalizedPath.startsWith(normalizedRoot)) {
209:             // console.warn(`File path ${normalizedPath} does not start with root ${normalizedRoot}, skipping.`);
210:             return; // Skip files not strictly within the root
211:         }
212: 
213: 
214:         const relativePath = normalizedPath.substring(normalizedRoot.length).replace(/^[/\\]/, '');
215:         if (!relativePath) return; // Skip root itself if listed
216: 
217:         const parts = relativePath.split(/[/\\]/);
218:         let currentLevel = fileMap;
219:         let currentPath = normalizedRoot;
220: 
221:         parts.forEach((part, index) => {
222:           // Handle cases where part might be empty string if there are multiple slashes
223:           if (!part) return;
224: 
225:           currentPath += '/' + part;
226:           const isLastPart = index === parts.length - 1;
227:           if (!currentLevel[part]) {
228:             currentLevel[part] = {
229:               name: part,
230:               path: currentPath,
231:               id: currentPath, // Use path as unique ID
232:               type: isLastPart ? "file" : "directory",
233:               children: {},
234:               fileData: isLastPart ? file : undefined, // Assign metadata only to file nodes
235:             };
236:           }
237:            // Ensure directory type if intermediate part already exists as file (edge case)
238:           if (!isLastPart && currentLevel[part].type === 'file') {
239:               console.warn(`Path conflict: ${currentPath} exists as both file and directory. Treating as directory.`);
240:               currentLevel[part].type = 'directory';
241:               currentLevel[part].fileData = undefined; // Remove file data if it's actually a dir
242:               if (!currentLevel[part].children) { // Ensure children object exists
243:                   currentLevel[part].children = {};
244:               }
245:           }
246:           // Ensure we move down the tree correctly, even if fixing type conflict
247:           currentLevel = currentLevel[part].children;
248:         });
249:      });
250: 
251:      const convertToNodes = (obj: Record<string, any>, depth = 0): TreeNode[] => {
252:         return Object.values(obj).map((item: any): TreeNode => {
253:           const nodeId = item.id;
254:           // Check expanded state from the map passed via props
255:           const isExpanded = expandedNodes.get(nodeId) ?? (depth < 1); // Auto-expand first level
256:           if (item.type === "directory") {
257:             return {
258:               ...item, // Spread existing item properties
259:               children: convertToNodes(item.children || {}, depth + 1), // Ensure children is an object
260:               isExpanded: isExpanded,
261:               depth: depth,
262:               fileData: undefined, // Explicitly remove fileData for directories
263:             };
264:           }
265:           // For files, fileData is already assigned during map creation
266:           return { ...item, depth: depth, children: undefined }; // Explicitly remove children for files
267:         });
268:      };
269: 
270:      const tree = convertToNodes(fileMap);
271:      return sortNodesRecursively(tree); // Sort after building
272: 
273:   }, [expandedNodes, sortNodesRecursively]); // Dependencies: expandedNodes, sortNodesRecursively
274: 
275:   // Effect to build tree
276:   useEffect(() => {
277:     if (!allFiles || !selectedFolder) {
278:       setFileTree([]);
279:       return;
280:     }
281:     if (isBuildingTreeRef.current) {
282:         console.log("Tree build already in progress, skipping new request.");
283:         return; // Prevent multiple concurrent builds
284:     }
285: 
286:     isBuildingTreeRef.current = true;
287:     if (buildTimeoutRef.current) clearTimeout(buildTimeoutRef.current);
288: 
289:     const buildId = Math.random().toString(36).substring(2, 9);
290:     console.log(`Scheduling tree build ${buildId}...`);
291: 
292:     const buildWork = () => {
293:         console.log(`Starting tree build ${buildId}...`);
294:         // Use Promise.resolve().then() to ensure async break and prevent blocking UI
295:         Promise.resolve().then(() => {
296:             try {
297:                 // Safety check: limit number of files processed if necessary
298:                 const filesToProcess = allFiles.length > 10000 ? allFiles.slice(0, 10000) : allFiles;
299:                 if (allFiles.length > 10000) {
300:                     console.warn(`Processing only the first 10,000 files out of ${allFiles.length} due to performance limits.`);
301:                 }
302:                 const newTree = buildFileTree(filesToProcess, selectedFolder);
303:                 setFileTree(newTree);
304:                 console.log(`Tree build ${buildId} completed.`);
305:             } catch (error) {
306:                 console.error(`Tree build ${buildId} failed:`, error);
307:                 setFileTree([]); // Reset on error
308:             } finally {
309:                 isBuildingTreeRef.current = false;
310:                 // Clear timeout reference only if it matches the one we set
311:                 if (buildTimeoutRef.current === timeoutId) {
312:                     buildTimeoutRef.current = null;
313:                 }
314:             }
315:         }).catch(error => {
316:             // Catch errors from the Promise itself (less likely here)
317:              console.error(`Error in tree build Promise ${buildId}:`, error);
318:              isBuildingTreeRef.current = false;
319:              if (buildTimeoutRef.current === timeoutId) {
320:                 buildTimeoutRef.current = null;
321:              }
322:         });
323:     };
324: 
325:      // Set timeout for actual work
326:     const timeoutId = setTimeout(buildWork, DEBOUNCE_DELAY);
327:     buildTimeoutRef.current = timeoutId; // Store timeout ID
328: 
329:     return () => {
330:       console.log(`Cleaning up tree build ${buildId}`);
331:       clearTimeout(timeoutId);
332:       // Reset flag only if this cleanup corresponds to the currently running/scheduled build
333:       if (buildTimeoutRef.current === timeoutId) {
334:           isBuildingTreeRef.current = false; // Ensure flag is reset if component unmounts or effect re-runs
335:           buildTimeoutRef.current = null;
336:       }
337:     };
338:   }, [allFiles, selectedFolder, buildFileTree]); // Rebuild when files or folder change
339: 
340:   // --- Ignore Patterns Modal ---
341:   const handleOpenIgnorePatterns = useCallback(() => {
342:     setIgnoreModalOpen(true);
343:   }, []);
344: 
345: 
346:   // Get available folders (memoized)
347:   const getAvailableFolders = useMemo(() => {
348:     const folders = new Set<string>();
349:     const rootPath = selectedFolder ? normalizePath(selectedFolder) : null;
350:     if (!rootPath) return [];
351: 
352:     // Use a map for potentially faster lookups if allFiles is huge
353:     const filePaths = allFiles.map(f => normalizePath(f.path));
354: 
355:     filePaths.forEach(normPath => {
356:         // Ensure path comparison is robust
357:         if (normPath.startsWith(rootPath + '/') || normPath === rootPath) {
358:             const parts = normPath.substring(rootPath.length).split('/').filter(p => p);
359:             let currentSubPath = rootPath;
360:             // Iterate up to the parent directory of the file
361:             for (let i = 0; i < parts.length - 1; i++) {
362:                 currentSubPath += '/' + parts[i];
363:                 folders.add(currentSubPath);
364:             }
365:         }
366:     });
367:      // Add the root folder itself
368:     folders.add(rootPath);
369:     return Array.from(folders).sort(); // Sort for consistent display
370:   }, [allFiles, selectedFolder]);
371: 
372:   // Count excluded files (memoized)
373:   const countExcludedFiles = useMemo(() => {
374:     // Check the 'excluded' flag set by the main process based on combined patterns
375:     return allFiles.filter(file => file.excluded === true).length;
376:   }, [allFiles]);
377: 
378:   // Handle sort change - Call prop passed from App
379:   const handleSortChange = useCallback((newSortOrder: SortOrder) => {
380:     if (onSortOrderChange) {
381:       onSortOrderChange(newSortOrder);
382:     }
383:   }, [onSortOrderChange]);
384: 
385:   return (
386:     <div className={styles.sidebar} style={{ width: `${sidebarWidth}px` }}>
387:       <FileTreeHeader
388:         onOpenFolder={openFolder}
389:         onSortChange={handleSortChange}
390:         onClearSelection={onClearSelectionClick} // Use prop for dialog trigger
391:         onRemoveAllFolders={onRemoveAllFoldersClick} // Use prop for dialog trigger
392:         onReloadFileTree={reloadFolder}
393:         onOpenIgnorePatterns={handleOpenIgnorePatterns} // Opens the modal
394:         excludedFilesCount={countExcludedFiles}
395:         currentSortOrder={fileTreeSortOrder}
396:       />
397: 
398:       {selectedFolder ? (
399:         <>
400:           <div className={styles.sidebarSearch}>
401:             <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
402:           </div>
403:           <div className={styles.sidebarActions}>
404:             <Button variant="secondary" size="sm" onClick={selectAllFiles}> Select All </Button>
405:             <Button variant="secondary" size="sm" onClick={deselectAllFiles}> Deselect All </Button>
406:           </div>
407:           <div className={styles.fileTree}>
408:             {isBuildingTreeRef.current ? (
409:                <div className={styles.treeLoading}><div className={styles.spinner}></div>Building tree...</div>
410:             ) : memoizedFlattenedTree.length > 0 ? (
411:               memoizedFlattenedTree.map((node) => (
412:                 <TreeItem
413:                   key={node.id}
414:                   node={node}
415:                   selectedFiles={selectedFiles}
416:                   toggleFileSelection={toggleFileSelection}
417:                   toggleFolderSelection={toggleFolderSelection}
418:                   toggleExpanded={toggleExpanded}
419:                 />
420:               ))
421:             ) : (
422:               <div className={styles.treeEmpty}>
423:                 {searchTerm ? "No files match search." : "No files found or folder is empty."}
424:               </div>
425:             )}
426:           </div>
427:         </>
428:       ) : (
429:         <div className={styles.sidebarEmptyState}>
430:           <FolderPlus size={48} className={styles.sidebarEmptyIcon} />
431:           <h3>No Folder Selected</h3>
432:           <p>Click the folder icon above to select a project folder.</p>
433:         </div>
434:       )}
435: 
436:       <div className={styles.sidebarResizeHandle} onMouseDown={handleResizeStart} title="Resize sidebar" />
437: 
438:       {/* Ignore Patterns Modal - Renders based on ignoreModalOpen state */}
439:       {ignoreModalOpen && (
440:         <IgnorePatterns
441:           isOpen={ignoreModalOpen}
442:           onClose={() => setIgnoreModalOpen(false)}
443:           // Pass full state objects from App
444:           globalPatternsState={globalPatternsState}
445:           localPatternsState={localPatternsState}
446:           localFolderPath={selectedFolder || ""}
447:           // Pass callbacks from App
448:           saveIgnorePatterns={saveIgnorePatterns}
449:           resetIgnorePatterns={onResetPatternsClick} // Pass the DIALOG TRIGGER prop
450:           clearIgnorePatterns={clearIgnorePatterns} // Pass clear function trigger
451:           onExcludedSystemPatternsChange={onExcludedSystemPatternsChange} // Pass handler to update App state
452:           systemIgnorePatterns={systemIgnorePatterns}
453:           recentFolders={getAvailableFolders} // Pass memoized folders
454:           // processingStatus prop can be added if needed from App
455:         />
456:       )}
457:     </div>
458:   );
459: };
460: 
461: export default Sidebar;
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

## File: src/utils/patternUtils.ts
```typescript
  1: // System pattern categories - Moved from App.tsx
  2: export const SYSTEM_PATTERN_CATEGORIES = {
  3:     versionControl: [
  4:       "**/.git/**",
  5:       "**/.svn/**",
  6:       "**/.hg/**",
  7:       "**/.cvs/**" // Added .cvs
  8:     ],
  9:     buildOutput: [
 10:       "**/node_modules/**",
 11:       "**/dist/**",
 12:       "**/build/**",
 13:       "**/.output/**", // Added .output
 14:       "**/.next/**",
 15:     ],
 16:     caches: [
 17:       "**/.cache/**",
 18:       "**/__pycache__/**",
 19:       "**/.pytest_cache/**",
 20:     ],
 21:     logs: [
 22:       "**/logs/**",
 23:       "**/*.log",
 24:     ],
 25:     ide: [
 26:       "**/.idea/**",
 27:       "**/.vscode/**",
 28:       "**/.vs/**",
 29:     ],
 30:     temp: [
 31:       "**/tmp/**",
 32:       "**/temp/**",
 33:     ],
 34:     os: [
 35:       "**/.DS_Store",
 36:       "**/Thumbs.db",
 37:     ],
 38:   };
 39:   
 40:   // Parse ignore patterns content to extract disabled patterns and user patterns - Moved from App.tsx
 41:   export const parseIgnorePatternsContent = (content: string): { excludedPatterns: string[]; userPatterns: string } => {
 42:     if (!content) {
 43:       return { excludedPatterns: [], userPatterns: '' };
 44:     }
 45:     const lines = content.split('\n');
 46:     const excludedPatterns: string[] = [];
 47:     const userPatterns: string[] = [];
 48:   
 49:     lines.forEach(line => {
 50:       const trimmedLine = line.trim();
 51:       if (trimmedLine.startsWith('# DISABLED:')) {
 52:         const pattern = trimmedLine.substring('# DISABLED:'.length).trim();
 53:         if (pattern) {
 54:           excludedPatterns.push(pattern);
 55:         }
 56:       } else if (trimmedLine !== '' && !trimmedLine.startsWith('#')) {
 57:         // Add non-empty, non-comment lines to user patterns
 58:         userPatterns.push(line); // Keep original line to preserve indentation/whitespace if any
 59:       }
 60:       // Ignore empty lines and regular comments
 61:     });
 62:   
 63:     // Ensure excluded patterns are unique
 64:     const uniqueExcluded = Array.from(new Set(excludedPatterns));
 65:   
 66:     return {
 67:       excludedPatterns: uniqueExcluded,
 68:       userPatterns: userPatterns.join('\n')
 69:     };
 70:   };
 71:   
 72:   
 73:   // --- Keep existing functions below if they are used ---
 74:   
 75:   // Selection handlers (Example, confirm if used or remove)
 76:   export const handleSelectionChange = (prevSelected: string[], newSelected: string[]) => {
 77:     return newSelected;
 78:   };
 79:   
 80:   export const handleFolderSelect = (prev: string[]) => {
 81:     return prev;
 82:   };
 83:   
 84:   // Pattern state update function (Example, confirm if used or remove)
 85:   export const handlePatternStateUpdate = (patterns: string | string[]): string => {
 86:     return Array.isArray(patterns) ? patterns.join('\n') : patterns;
 87:   };
 88:   
 89:   export const updatePatternState = (
 90:     patterns: string | string[],
 91:     isGlobal: boolean,
 92:     setGlobalPatterns: (value: any) => void,
 93:     setLocalPatterns: (value: any) => void,
 94:     folderPath?: string
 95:   ) => {
 96:     const normalizedPatterns = handlePatternStateUpdate(patterns);
 97:   
 98:     if (isGlobal) {
 99:       setGlobalPatterns((prev: any) => ({
100:         ...prev,
101:         patterns: normalizedPatterns
102:       }));
103:     } else if (folderPath) {
104:       setLocalPatterns((prev: any) => ({
105:         ...prev,
106:         patterns: normalizedPatterns
107:       }));
108:     }
109:   };
```

## File: src/utils/sortIcons.tsx
```typescript
 1: import React from 'react';
 2: import type { LucideIcon } from 'lucide-react';
 3: import { 
 4:   ArrowUpDown,        // Default icon
 5:   ArrowDownAZ,        // For name-ascending
 6:   ArrowUpZA,          // For name-descending
 7:   ArrowUp01,          // For tokens-ascending
 8:   ArrowDown10,        // For tokens-descending
 9:   ArrowUpNarrowWide,  // For date-ascending
10:   ArrowDownWideNarrow // For date-descending
11: } from "lucide-react";
12: 
13: // Map sort options to corresponding Lucide icons
14: export const sortIconMap = {
15:   "name-ascending": "ArrowDownAZ",
16:   "name-descending": "ArrowUpZA",
17:   "tokens-ascending": "ArrowUp01",
18:   "tokens-descending": "ArrowDown10",
19:   "date-ascending": "ArrowUpNarrowWide",
20:   "date-descending": "ArrowDownWideNarrow"
21: } as const;
22: 
23: // Icon component lookup for direct reference
24: export const iconComponents: Record<string, LucideIcon> = {
25:   "ArrowDownAZ": ArrowDownAZ,
26:   "ArrowUpZA": ArrowUpZA,
27:   "ArrowUp01": ArrowUp01,
28:   "ArrowDown10": ArrowDown10,
29:   "ArrowUpNarrowWide": ArrowUpNarrowWide,
30:   "ArrowDownWideNarrow": ArrowDownWideNarrow,
31:   "ArrowUpDown": ArrowUpDown  // Default
32: };
33: 
34: // Helper function to get the appropriate icon component
35: export const getSortIcon = (sortOrder?: string, size: number = 16): JSX.Element => {
36:   try {
37:     const iconName = sortOrder && sortIconMap[sortOrder as keyof typeof sortIconMap] 
38:       ? sortIconMap[sortOrder as keyof typeof sortIconMap] 
39:       : "ArrowUpDown";
40:     
41:     const IconComponent = iconComponents[iconName];
42:     return <IconComponent size={size} />;
43:   } catch (error) {
44:     console.error("Error rendering sort icon:", error);
45:     return <ArrowUpDown size={size} />;
46:   }
47: };
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
 59:   left: 0;
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
139:     transform: translateY(4px);
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
 12:   backdrop-filter: blur(4px);
 13:   animation: fadeIn 0.2s ease-out;
 14: }
 15: 
 16: .content {
 17:   background-color: var(--background-primary);
 18:   border-radius: var(--radius-lg);
 19:   width: 90%;
 20:   max-width: 700px;
 21:   max-height: 85vh;
 22:   padding: 1.5rem;
 23:   box-shadow: var(--shadow-lg);
 24:   overflow-y: auto;
 25:   animation: slideUp 0.2s ease-out;
 26: }
 27: 
 28: .header {
 29:   display: flex;
 30:   justify-content: space-between;
 31:   align-items: center;
 32:   margin-bottom: 16px;
 33: }
 34: 
 35: .header h2 {
 36:   margin: 0;
 37:   font-size: 1.5rem;
 38:   color: var(--text-primary);
 39: }
 40: 
 41: .description {
 42:   margin-bottom: 16px;
 43:   font-size: 0.9rem;
 44:   color: var(--text-secondary);
 45:   line-height: 1.4;
 46: }
 47: 
 48: .scopeSelector {
 49:   display: flex;
 50:   margin-bottom: 12px;
 51:   border-bottom: 1px solid var(--border-color);
 52:   padding: 0 4px;
 53:   gap: 1px;
 54: }
 55: 
 56: .scopeBtn {
 57:   flex: 1;
 58:   border-radius: var(--radius) var(--radius) 0 0 !important;
 59:   font-size: 0.95rem !important;
 60:   padding: 10px 15px !important;
 61:   transition: all 0.15s ease-out;
 62: }
 63: 
 64: .scopeBtn:first-child {
 65:   border-top-right-radius: 0 !important;
 66: }
 67: 
 68: .scopeBtn:last-child {
 69:   border-top-left-radius: 0 !important;
 70: }
 71: 
 72: .scopeBtn:hover {
 73:   background-color: var(--hover-color);
 74:   opacity: 0.9;
 75: }
 76: 
 77: .scopeBtn.active {
 78:   font-weight: 500 !important;
 79:   position: relative;
 80: }
 81: 
 82: .scopeBtn.active::after {
 83:   content: "";
 84:   position: absolute;
 85:   bottom: -1px;
 86:   left: 0;
 87:   width: 100%;
 88:   height: 2px;
 89:   background-color: var(--accent-color);
 90: }
 91: 
 92: .scopeDescription {
 93:   margin-bottom: 16px;
 94:   font-size: 0.85rem;
 95:   color: var(--text-secondary);
 96:   padding: 0 8px;
 97: }
 98: 
 99: .folderSelector {
100:   margin-bottom: 16px;
101: }
102: 
103: .folderSelector label {
104:   display: block;
105:   margin-bottom: 6px;
106:   font-size: 0.9rem;
107:   font-weight: 500;
108:   color: var(--text-primary);
109: }
110: 
111: .customSelect {
112:   position: relative;
113:   width: 100%;
114:   cursor: pointer;
115: }
116: 
117: .selectedValue {
118:   display: flex;
119:   justify-content: space-between;
120:   align-items: center;
121:   padding: 10px 12px;
122:   background-color: var(--background-secondary);
123:   border: 1px solid var(--border-color);
124:   border-radius: var(--radius);
125:   font-size: 0.9rem;
126:   transition: border-color 0.2s;
127: }
128: 
129: .selectedValue:hover {
130:   border-color: var(--accent-color);
131: }
132: 
133: .chevron {
134:   transition: transform 0.2s;
135: }
136: 
137: .chevron.open {
138:   transform: rotate(180deg);
139: }
140: 
141: .optionsContainer {
142:   position: absolute;
143:   top: 100%;
144:   left: 0;
145:   right: 0;
146:   background-color: var(--background-primary);
147:   border: 1px solid var(--border-color);
148:   border-radius: var(--radius);
149:   box-shadow: var(--shadow-md);
150:   z-index: var(--z-index-dropdown);
151:   max-height: 200px;
152:   overflow-y: auto;
153: }
154: 
155: .option {
156:   padding: 8px 12px;
157:   font-size: 0.9rem;
158:   cursor: pointer;
159: }
160: 
161: .option:hover {
162:   background-color: var(--hover-color);
163: }
164: 
165: .pathDisplay {
166:   margin-top: 4px;
167:   font-size: 0.8rem;
168:   color: var(--text-secondary);
169:   font-family: monospace;
170: }
171: 
172: .patternsSection {
173:   margin-bottom: 20px;
174: }
175: 
176: .patternsInput {
177:   width: 100%;
178:   height: 200px;
179:   font-family: monospace;
180:   font-size: 14px;
181:   padding: 12px;
182:   background-color: var(--background-primary);
183:   color: var(--text-primary);
184:   border: 1px solid var(--border-color);
185:   border-radius: var(--radius);
186:   resize: vertical;
187: }
188: 
189: .patternsInput:focus {
190:   outline: none;
191:   border-color: var(--accent-color);
192:   box-shadow: 0 0 0 1px var(--accent-color);
193: }
194: 
195: .patternComment {
196:   color: var(--text-secondary);
197: }
198: 
199: .patternsHelp {
200:   margin-top: 8px;
201:   font-size: 0.8rem;
202:   color: var(--text-secondary);
203: }
204: 
205: .patternsHelp p {
206:   margin: 4px 0;
207: }
208: 
209: .modalStatus {
210:   margin-bottom: 16px;
211:   min-height: 20px;
212: }
213: 
214: .unsaved {
215:   color: var(--warning-color);
216:   font-size: 0.85rem;
217: }
218: 
219: .modalActions {
220:   display: flex;
221:   justify-content: center;
222:   gap: 12px;
223:   margin-top: 24px;
224:   padding: 0 12px;
225: }
226: 
227: .modalActions button {
228:   min-width: 100px;
229: }
230: 
231: .destructiveIcon {
232:   color: var(--error-color);
233: }
234: 
235: /* We'll override these with our Button component */
236: 
237: .systemPatterns {
238:   margin-top: 16px;
239:   padding: 12px;
240:   background-color: var(--background-secondary);
241:   border: 1px solid var(--border-color);
242:   border-radius: var(--radius);
243: }
244: 
245: .systemPatterns h3 {
246:   margin: 0 0 12px 0;
247:   font-size: 1rem;
248:   color: var(--text-primary);
249: }
250: 
251: .systemPatternsList {
252:   display: flex;
253:   flex-direction: column;
254:   gap: 8px;
255:   max-height: 200px;
256:   overflow-y: auto;
257: }
258: 
259: .systemPatternItem {
260:   display: flex;
261:   justify-content: space-between;
262:   align-items: center;
263:   padding: 4px 8px;
264:   font-family: monospace;
265:   font-size: 13px;
266:   transition: background-color 0.15s ease;
267:   border-radius: var(--radius);
268: }
269: 
270: .systemPatternItem:hover {
271:   background-color: var(--hover-color);
272: }
273: 
274: .toggleButton {
275:   display: flex;
276:   align-items: center;
277:   justify-content: center;
278:   padding: 4px;
279:   background: none;
280:   border: 1px solid var(--border-color);
281:   border-radius: var(--radius);
282:   color: var(--text-primary);
283:   cursor: pointer;
284:   transition: all 0.15s;
285: }
286: 
287: .toggleButton:hover {
288:   background-color: var(--hover-color);
289:   border-color: var(--accent-color);
290: }
291: 
292: .disabledPattern {
293:   color: var(--text-secondary);
294:   text-decoration: line-through;
295: }
296: 
297: .previewContainer {
298:   background-color: var(--background-secondary);
299:   border: 1px solid var(--border-color);
300:   border-radius: var(--radius);
301:   padding: 12px;
302:   max-height: 150px;
303:   overflow-y: auto;
304:   margin-top: 16px;
305:   font-family: monospace;
306:   font-size: 13px;
307: }
308: 
309: .previewHeader {
310:   display: flex;
311:   justify-content: space-between;
312:   align-items: center;
313:   margin-bottom: 8px;
314:   font-weight: 500;
315:   font-size: 14px;
316: }
317: 
318: .previewLine {
319:   padding: 2px 0;
320: }
321: 
322: .previewSystem {
323:   color: var(--accent-color);
324: }
325: 
326: .previewGlobal {
327:   color: var(--text-primary);
328: }
329: 
330: .previewLocal {
331:   color: var(--success-color);
332: }
333: 
334: .previewBadge {
335:   display: inline-block;
336:   font-size: 10px;
337:   padding: 1px 4px;
338:   border-radius: 4px;
339:   margin-left: 8px;
340:   background-color: var(--background-secondary);
341:   color: var(--text-secondary);
342: }
343: 
344: .notification {
345:   position: fixed;
346:   bottom: 20px;
347:   right: 20px;
348:   padding: 12px 16px;
349:   border-radius: var(--radius);
350:   background-color: var(--background-primary);
351:   color: var(--text-primary);
352:   box-shadow: var(--shadow-md);
353:   transform: translateY(100%);
354:   opacity: 0;
355:   transition: transform 0.3s ease, opacity 0.3s ease;
356:   z-index: var(--z-index-modal);
357: }
358: 
359: .notification.visible {
360:   transform: translateY(0);
361:   opacity: 1;
362: }
363: 
364: .notification.success {
365:   border-left: 4px solid var(--success-color);
366: }
367: 
368: .notification.error {
369:   border-left: 4px solid var(--error-color);
370: }
371: 
372: @keyframes slideIn {
373:   from {
374:     transform: scaleX(0);
375:   }
376:   to {
377:     transform: scaleX(1);
378:   }
379: }
380: 
381: @keyframes fadeIn {
382:   from {
383:     opacity: 0;
384:   }
385:   to {
386:     opacity: 1;
387:   }
388: }
389: 
390: @keyframes slideUp {
391:   from {
392:     opacity: 0;
393:     transform: translateY(10px);
394:   }
395:   to {
396:     opacity: 1;
397:     transform: translateY(0);
398:   }
399: }
400: 
401: @keyframes togglePulse {
402:   0% { transform: scale(1); }
403:   50% { transform: scale(1.05); }
404:   100% { transform: scale(1); }
405: }
406: 
407: .patternCategory {
408:   margin-bottom: 8px;
409:   border: 1px solid var(--border-color);
410:   border-radius: var(--radius);
411:   overflow: hidden;
412: }
413: 
414: .categoryHeader {
415:   display: flex;
416:   justify-content: space-between;
417:   align-items: center;
418:   padding: 10px 12px;
419:   background-color: var(--background-secondary);
420:   cursor: pointer;
421:   transition: background-color 0.15s ease;
422: }
423: 
424: .categoryHeader:hover {
425:   background-color: var(--hover-color);
426: }
427: 
428: .categoryTitle {
429:   font-weight: 500;
430:   font-size: 14px;
431:   color: var(--text-primary);
432: }
433: 
434: .categoryMeta {
435:   display: flex;
436:   align-items: center;
437:   gap: 8px;
438: }
439: 
440: .categoryCount {
441:   font-size: 12px;
442:   color: var(--text-secondary);
443: }
444: 
445: .chevronRotated {
446:   transform: rotate(180deg);
447: }
448: 
449: .categoryItems {
450:   padding: 8px 12px;
451:   max-height: 0;
452:   overflow: hidden;
453:   transition: max-height 0.3s ease, padding 0.3s ease;
454: }
455: 
456: .categoryExpanded .categoryItems {
457:   max-height: 1000px;
458:   padding: 8px 12px;
459: }
460: 
461: .smallerSwitch {
462:   transform: scale(0.9);
463: }
```

## File: src/components/ui/Button/Button.tsx
```typescript
 1: import React from 'react';
 2: import { cn } from '../../../utils/cn';
 3: import styles from './Button.module.css';
 4: 
 5: export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'round' | 'icon' | 'pill';
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
40:    * Note: This is different from the 'pill' variant which has specific styling
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
53:  * Supports multiple variants (primary, secondary, ghost, destructive, round, pill, icon) and sizes.
54:  * Round variant is always pill-shaped and inherits primary colors with enhanced styling.
55:  * Pill variant is a compact, high-contrast tag-like button (similar to the Platform badge in the reference).
56:  */
57: export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
58:   (
59:     {
60:       className,
61:       variant = 'primary',
62:       size = 'md',
63:       startIcon,
64:       endIcon,
65:       iconOnly = false,
66:       pill = false,
67:       children,
68:       ...props
69:     },
70:     ref
71:   ) => {
72:     // Force pill shape for round variant and pill variant
73:     const isPillShaped = variant === 'round' || variant === 'pill' || pill;
74:     
75:     return (
76:       <button
77:         className={cn(
78:           styles.button,
79:           styles[variant],
80:           styles[size],
81:           iconOnly && styles.iconOnly,
82:           isPillShaped && !variant.includes('pill') && styles.pillShaped, // Apply pill shape but not pill styling
83:           className
84:         )}
85:         ref={ref}
86:         {...props}
87:       >
88:         {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
89:         {children}
90:         {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
91:       </button>
92:     );
93:   }
94: );
95: 
96: Button.displayName = 'Button';
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

## File: src/components/TreeItem.tsx
```typescript
  1: import React, { useRef, useEffect, useMemo, memo } from "react";
  2: import { TreeItemProps, TreeNode } from "../types/FileTypes";
  3: import { ChevronRight, File, Folder } from "lucide-react";
  4: import { arePathsEqual } from "../utils/pathUtils";
  5: import styles from "./TreeItem.module.css";
  6: 
  7: /**
  8:  * TreeItem component that renders a file or directory in the file tree.
  9:  * Optimized with memoization to prevent unnecessary re-renders.
 10:  */
 11: const TreeItem = memo(({
 12:   node,
 13:   selectedFiles,
 14:   toggleFileSelection,
 15:   toggleFolderSelection,
 16:   toggleExpanded,
 17: }: TreeItemProps) => {
 18:   const { id, name, path, type, depth, isExpanded, fileData } = node;
 19:   const checkboxRef = useRef<HTMLInputElement>(null);
 20: 
 21:   // Check if file is selected - optimized with useMemo
 22:   const isSelected = useMemo(() => {
 23:     if (type === "file") {
 24:       return selectedFiles.some(selectedPath => arePathsEqual(selectedPath, path));
 25:     }
 26:     return false;
 27:   }, [type, path, selectedFiles]);
 28: 
 29:   // Check if file is disabled (excluded by patterns)
 30:   const isDisabled = fileData?.excluded || false;
 31: 
 32:   // Optimize directory selection calculations
 33:   const { isDirectorySelected, isDirectoryPartiallySelected } = useMemo(() => {
 34:     if (type !== "directory" || !node.children || node.children.length === 0) {
 35:       return { isDirectorySelected: false, isDirectoryPartiallySelected: false };
 36:     }
 37: 
 38:     // Use a more efficient approach to determine selection state
 39:     const counts = {
 40:       total: 0,
 41:       selected: 0
 42:     };
 43: 
 44:     // Recursive function to count files
 45:     const countFiles = (node: TreeNode) => {
 46:       if (node.type === "file") {
 47:         if (node.fileData?.excluded) return; // Skip excluded files
 48:         counts.total++;
 49:         if (selectedFiles.some(path => arePathsEqual(path, node.path))) {
 50:           counts.selected++;
 51:         }
 52:       } else if (node.type === "directory" && node.children) {
 53:         node.children.forEach(countFiles);
 54:       }
 55:     };
 56: 
 57:     // Count all files in this directory
 58:     node.children.forEach(countFiles);
 59: 
 60:     // Determine selection state
 61:     const isAllSelected = counts.total > 0 && counts.selected === counts.total;
 62:     const isPartiallySelected = counts.selected > 0 && counts.selected < counts.total;
 63: 
 64:     return {
 65:       isDirectorySelected: isAllSelected,
 66:       isDirectoryPartiallySelected: isPartiallySelected
 67:     };
 68:   }, [node, type, selectedFiles]);
 69: 
 70:   // Update the indeterminate state of the checkbox
 71:   useEffect(() => {
 72:     if (checkboxRef.current) {
 73:       checkboxRef.current.indeterminate = isDirectoryPartiallySelected;
 74:     }
 75:   }, [isDirectoryPartiallySelected]);
 76: 
 77:   // Event handlers - using inline functions for better clarity
 78:   const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
 79:     e.stopPropagation();
 80:     toggleExpanded(id);
 81:   };
 82: 
 83:   const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
 84:     e.stopPropagation();
 85:     if (type === "directory") {
 86:       toggleExpanded(id);
 87:     } else if (type === "file" && !isDisabled) {
 88:       toggleFileSelection(path);
 89:     }
 90:   };
 91: 
 92:   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 93:     e.stopPropagation();
 94:     if (type === "file") {
 95:       toggleFileSelection(path);
 96:     } else if (type === "directory") {
 97:       toggleFolderSelection(path, e.target.checked);
 98:     }
 99:   };
100: 
101:   const handleCheckboxClick = (e: React.MouseEvent<HTMLInputElement>) => {
102:     e.stopPropagation();
103:   };
104: 
105:   // Generate indentation for nested levels - memoized
106:   const indentation = useMemo(() => {
107:     const result = [];
108:     for (let i = 0; i < depth; i++) {
109:       result.push(
110:         <span key={`indent-${i}`} className={styles.treeItemIndent} />
111:       );
112:     }
113:     return result;
114:   }, [depth]);
115: 
116:   return (
117:     <div
118:       className={`${styles.treeItem} ${
119:         (isSelected || isDirectorySelected) ? styles.treeItemSelected : ""
120:       } ${isDisabled ? styles.disabledItem : ""}`}
121:       onClick={handleItemClick}
122:       data-testid={`tree-item-${name}`}
123:     >
124:       <div className={styles.treeItemContent}>
125:         {indentation}
126: 
127:         {type === "directory" && (
128:           <div
129:             className={`${styles.treeItemExpander} ${
130:               isExpanded ? styles.treeItemExpanderRotated : ""
131:             }`}
132:             onClick={handleToggle}
133:           >
134:             <ChevronRight size={14} />
135:           </div>
136:         )}
137: 
138:         <input
139:           type="checkbox"
140:           checked={isSelected || isDirectorySelected}
141:           onChange={handleCheckboxChange}
142:           onClick={handleCheckboxClick}
143:           ref={type === "directory" ? checkboxRef : null}
144:           className={styles.treeItemCheckbox}
145:           disabled={isDisabled}
146:         />
147: 
148:         <div className={styles.treeItemIcon}>
149:           {type === "directory" ? (
150:             <Folder size={16} className={styles.folderIcon} />
151:           ) : (
152:             <File size={16} className={styles.fileIcon} />
153:           )}
154:         </div>
155: 
156:         <span
157:           className={styles.treeItemName}
158:           title={path}
159:           onClick={(e) => {
160:             e.stopPropagation();
161:             if (type === "file" && !isDisabled) {
162:               toggleFileSelection(path);
163:             } else if (type === "directory") {
164:               toggleExpanded(id);
165:             }
166:           }}
167:         >
168:           {name}
169:         </span>
170:         
171:         {/* Display token count or excluded label */}
172:         {type === "file" && fileData && (
173:           <span className={styles.treeItemTokens}>
174:             {isDisabled ? "Excluded" : fileData.tokenCount > 0 ? `(${fileData.tokenCount.toLocaleString()})` : ""}
175:           </span>
176:         )}
177:       </div>
178:     </div>
179:   );
180: });
181: 
182: TreeItem.displayName = "TreeItem";
183: 
184: export default TreeItem;
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

## File: src/types/FileTypes.ts
```typescript
 1: export interface FileData {
 2:   name: string;
 3:   path: string;
 4:   content?: string;
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
34:   allFiles: Omit<FileData, 'content'>[];
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
47:   files: Omit<FileData, 'content'>[];
48:   selectedFiles: string[];
49:   toggleFileSelection: (filePath: string) => void;
50: }
51: 
52: export interface FileCardProps {
53:   file: Omit<FileData, 'content'>;
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
78: // SortOrder type with consistent naming
79: export type SortOrder = 
80:   | "name-ascending" 
81:   | "name-descending" 
82:   | "tokens-ascending" 
83:   | "tokens-descending" 
84:   | "date-ascending" 
85:   | "date-descending";
86: 
87: // Add IgnorePattern interface for ignore patterns feature
88: export interface IgnorePattern {
89:   pattern: string;
90:   isGlobal: boolean;
91: }
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
156: /* Pill shape - just the border radius */
157: .pillShaped {
158:   border-radius: var(--radius-full);
159: }
160: 
161: /* Pill variant - tag/badge style button */
162: .pill {
163:   border-radius: var(--radius-full);
164:   background-color: var(--background-primary-dark);
165:   color: white;
166:   border: none;
167:   padding: 0 12px;
168:   font-size: 12px;
169:   font-weight: 500;
170:   height: 24px;
171:   letter-spacing: 0.01em;
172:   text-transform: capitalize;
173:   transition: opacity 0.2s ease;
174: }
175: 
176: .pill:hover:not(:disabled) {
177:   background-color: var(--background-primary-dark);
178:   opacity: 0.9;
179: }
180: 
181: .pill:active:not(:disabled) {
182:   background-color: var(--background-primary-dark);
183:   opacity: 0.8;
184: }
185: 
186: /* Dark mode support for pill */
187: :global(.dark-mode) .pill {
188:   background-color: hsl(240, 5%, 84.9%);
189:   color: var(--background-primary-dark);
190: }
191: 
192: :global(.dark-mode) .pill:hover:not(:disabled),
193: :global(.dark-mode) .pill:active:not(:disabled) {
194:   background-color: hsl(240, 5%, 84.9%);
195: }
196: 
197: /* Round variant - inherits from primary but with enhancements */
198: .round {
199:   background-color: var(--primary-button-background);
200:   color: var(--primary-button-text);
201:   border-color: var(--primary-button-background);
202:   padding: 0 20px;
203:   border-width: 1.5px;
204:   font-weight: 600;
205:   letter-spacing: 0.01em;
206: }
207: 
208: .round:hover:not(:disabled) {
209:   background-color: var(--primary-button-hover);
210:   border-color: var(--primary-button-hover);
211:   box-shadow: var(--shadow-sm);
212: }
213: 
214: .round:active:not(:disabled) {
215:   background-color: var(--primary-button-active);
216:   border-color: var(--primary-button-active);
217: }
218: 
219: .round.iconOnly {
220:   padding: 0;
221:   width: var(--button-height-md);
222:   height: var(--button-height-md);
223: }
224: 
225: .round.sm.iconOnly {
226:   width: var(--button-height-sm);
227:   height: var(--button-height-sm);
228: }
229: 
230: .round.lg.iconOnly {
231:   width: var(--button-height-lg);
232:   height: var(--button-height-lg);
233: }
234: 
235: /* Adjust icon spacing for round variant */
236: .round .startIcon {
237:   margin-right: 8px;
238: }
239: 
240: .round .endIcon {
241:   margin-left: 8px;
242: }
243: 
244: .round.iconOnly .startIcon,
245: .round.iconOnly .endIcon {
246:   margin: 0;
247: }
248: 
249: /* Icon variant - for icon-only buttons without background effects */
250: .icon {
251:   background-color: transparent;
252:   border: none;
253:   color: var(--icon-color);
254:   padding: 0;
255:   transition: transform 0.2s ease, color 0.2s ease;
256: }
257: 
258: .icon:hover:not(:disabled) {
259:   background-color: transparent;
260:   color: var(--text-primary);
261:   opacity: 0.8;
262:   transform: scale(1.1);
263: }
264: 
265: .icon:active:not(:disabled) {
266:   background-color: transparent;
267:   opacity: 0.9;
268:   transform: scale(1.05);
269: }
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
 67:   align-items: center;
 68:   padding: 0.75rem 1rem;
 69:   border-bottom: 1px solid var(--border-color);
 70:   background: var(--background-primary);
 71:   height: 52px;
 72:   position: sticky;
 73:   top: 0;
 74:   z-index: 10;
 75: }
 76: 
 77: .contentTitle {
 78:   font-size: 1.125rem;
 79:   font-weight: 600;
 80:   color: var(--text-primary);
 81:   margin: 0;
 82:   line-height: 1.4;
 83:   flex-shrink: 0;
 84:   margin-right: 0.75rem;
 85: }
 86: 
 87: .contentActions {
 88:   display: flex;
 89:   gap: 0.75rem;
 90:   align-items: center;
 91:   height: 32px;
 92:   flex: 1;
 93: }
 94: 
 95: .folderPathDisplay {
 96:   font-size: 0.875rem;
 97:   color: var(--text-secondary);
 98:   padding: 0 0.75rem;
 99:   background: var(--background-secondary);
100:   width: 320px;
101:   height: 32px;
102:   display: inline-flex;
103:   align-items: center;
104:   border-radius: var(--radius);
105:   border: 1px solid var(--border-color);
106:   overflow: hidden;
107:   text-overflow: ellipsis;
108:   white-space: nowrap;
109:   margin-right: auto;
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

## File: src/components/ControlContainer.tsx
```typescript
  1: import React, { useState, useCallback } from 'react'; // Import useCallback
  2: import { FileTreeMode } from '../types';
  3: import { Switch, Button, ButtonGroup } from './ui';
  4: import { Copy, Download, Check, Loader2 } from 'lucide-react'; // Added Loader2
  5: import styles from './ControlContainer.module.css';
  6: 
  7: interface ControlContainerProps {
  8:   fileTreeMode: FileTreeMode;
  9:   setFileTreeMode: (value: FileTreeMode) => void;
 10:   showUserInstructions: boolean;
 11:   setShowUserInstructions: (value: boolean) => void;
 12:   getSelectedFilesContent: () => Promise<string>; // Make async
 13:   selectedFilesCount: number;
 14:   // Removed unused props (previously prefixed with _)
 15: }
 16: 
 17: const ControlContainer: React.FC<ControlContainerProps> = ({
 18:   fileTreeMode,
 19:   setFileTreeMode,
 20:   showUserInstructions,
 21:   setShowUserInstructions,
 22:   getSelectedFilesContent,
 23:   selectedFilesCount,
 24: }) => {
 25:   const [copied, setCopied] = useState(false);
 26:   const [isCopying, setIsCopying] = useState(false); // Add loading state for copy
 27:   const [isDownloading, setIsDownloading] = useState(false); // Add loading state for download
 28: 
 29:   const handleCopy = useCallback(async () => {
 30:     if (selectedFilesCount === 0 || isCopying) return;
 31:     setIsCopying(true);
 32:     setCopied(false); // Reset copied state
 33:     try {
 34:       const content = await getSelectedFilesContent(); // Await the async function
 35:       await navigator.clipboard.writeText(content);
 36:       setCopied(true);
 37:       setTimeout(() => setCopied(false), 2000);
 38:     } catch (err) {
 39:       console.error('Failed to copy:', err);
 40:       // TODO: Show user error feedback
 41:     } finally {
 42:       setIsCopying(false);
 43:     }
 44:   }, [getSelectedFilesContent, selectedFilesCount, isCopying]); // Add dependencies
 45: 
 46:   const handleDownload = useCallback(async () => {
 47:     if (selectedFilesCount === 0 || isDownloading) return;
 48:     setIsDownloading(true);
 49:     try {
 50:         const content = await getSelectedFilesContent(); // Await the async function
 51:         const blob = new Blob([content], { type: 'text/plain;charset=utf-8' }); // Specify charset
 52:         const url = URL.createObjectURL(blob);
 53:         const a = document.createElement('a');
 54:         a.href = url;
 55:         // Generate filename based on current context if possible
 56:         const filename = `pastemax_output_${new Date().toISOString().split('T')[0]}.txt`;
 57:         a.download = filename;
 58:         document.body.appendChild(a);
 59:         a.click();
 60:         document.body.removeChild(a);
 61:         URL.revokeObjectURL(url);
 62:     } catch (err) {
 63:         console.error('Failed to download:', err);
 64:         // TODO: Show user error feedback
 65:     } finally {
 66:         setIsDownloading(false);
 67:     }
 68:   }, [getSelectedFilesContent, selectedFilesCount, isDownloading]); // Add dependencies
 69: 
 70:   return (
 71:     <div className={styles.controlContainer}>
 72:       <div className={styles.controlContainerHeader}>Controls</div>
 73:       <div className={styles.controlItems}>
 74:         {/* Display Options Group */}
 75:         <div className={styles.controlGroup}>
 76:           <div className={styles.controlGroupTitle}>Display Options</div>
 77:           <div className={styles.controlItem}>
 78:             <Switch checked={showUserInstructions} onChange={() => setShowUserInstructions(!showUserInstructions)} label="Show User Instructions" id="user-instructions-toggle" />
 79:           </div>
 80:           <div className={styles.controlItem}>
 81:             <label className={styles.controlSelectLabel} htmlFor="file-tree-mode">File Tree:</label>
 82:             <select id="file-tree-mode" value={fileTreeMode} onChange={(e) => setFileTreeMode(e.target.value as FileTreeMode)} className={styles.controlSelect}>
 83:               <option value="none">None</option>
 84:               <option value="selected">Selected Files Only</option>
 85:               <option value="selected-with-roots">Selected Files with Path</option>
 86:               <option value="complete">Complete Tree (Mark Selected)</option>
 87:             </select>
 88:           </div>
 89:         </div>
 90: 
 91:         {/* Output Options Group */}
 92:         <div className={styles.controlGroup}>
 93:           <div className={styles.controlGroupTitle}>Output</div>
 94:           <div className={styles.controlItem}>
 95:             <ButtonGroup size="sm">
 96:               <Button
 97:                 variant="secondary"
 98:                 onClick={handleCopy}
 99:                 startIcon={isCopying ? <Loader2 size={16} className="animate-spin" /> : copied ? <Check size={16} /> : <Copy size={16} />}
100:                 disabled={selectedFilesCount === 0 || isCopying || isDownloading}
101:                 title={isCopying ? "Copying..." : copied ? "Copied!" : `Copy ${selectedFilesCount} selected files to clipboard`}
102:               >
103:                 {isCopying ? 'Copying...' : copied ? 'Copied!' : `Copy (${selectedFilesCount})`}
104:               </Button>
105:               <Button
106:                 variant="secondary"
107:                 onClick={handleDownload}
108:                 startIcon={isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
109:                 disabled={selectedFilesCount === 0 || isCopying || isDownloading}
110:                 title={isDownloading ? "Saving..." : "Save selected files content"}
111:               >
112:                 {isDownloading ? 'Saving...' : 'Save'}
113:               </Button>
114:             </ButtonGroup>
115:           </div>
116:         </div>
117:       </div>
118:     </div>
119:   );
120: };
121: 
122: export default ControlContainer;
```

## File: src/components/FileTreeHeader.tsx
```typescript
 1: import React, { useCallback } from "react"; // Import useCallback
 2: import { Folder, Filter, X, RefreshCw } from "lucide-react"; // Removed unused sort icons
 3: import { SortOrder } from "../types/FileTypes";
 4: import { Button } from "./ui";
 5: import { Dropdown } from "./ui/Dropdown";
 6: import { getSortIcon } from "../utils/sortIcons"; // Keep this utility
 7: import styles from "./FileTreeHeader.module.css";
 8: 
 9: // Removed unused sortIconMap and iconComponents
10: 
11: interface FileTreeHeaderProps {
12:   onOpenFolder: () => void;
13:   onSortChange: (sortOrder: SortOrder) => void;
14:   onClearSelection: () => void; // Should trigger dialog in App
15:   onRemoveAllFolders: () => void; // Should trigger dialog in App
16:   onReloadFileTree: () => void;
17:   onOpenIgnorePatterns: () => void; // Simplified: always opens modal
18:   excludedFilesCount?: number;
19:   currentSortOrder?: SortOrder;
20: }
21: 
22: // Keep sortOptions definition
23: const sortOptions = [
24:   { value: "name-ascending", label: "Name (A to Z)" },
25:   { value: "name-descending", label: "Name (Z to A)" },
26:   { value: "tokens-ascending", label: "Tokens (Asc)" }, // Updated labels for brevity if desired
27:   { value: "tokens-descending", label: "Tokens (Desc)" },
28:   { value: "date-ascending", label: "Date (Oldest)" },
29:   { value: "date-descending", label: "Date (Newest)" }
30: ];
31: 
32: // Keep clearOptions definition
33: const clearOptions = [
34:   { value: "clear", label: "Clear selection" },
35:   { value: "removeAll", label: "Remove All Folders" },
36: ];
37: 
38: const FileTreeHeader: React.FC<FileTreeHeaderProps> = ({ // Use React.FC for consistency
39:   onOpenFolder,
40:   onSortChange,
41:   onClearSelection,
42:   onRemoveAllFolders,
43:   onReloadFileTree,
44:   onOpenIgnorePatterns,
45:   excludedFilesCount,
46:   currentSortOrder,
47: }) => {
48: 
49:   // Use useCallback for handlers passed to Dropdown
50:   const handleSortSelect = useCallback((value: string | string[]) => {
51:     if (typeof value === 'string') {
52:         onSortChange(value as SortOrder);
53:     }
54:   }, [onSortChange]);
55: 
56:   const handleClearSelect = useCallback((value: string | string[]) => {
57:     if (typeof value === 'string') {
58:       if (value === 'clear') onClearSelection();
59:       else if (value === 'removeAll') onRemoveAllFolders();
60:     }
61:   }, [onClearSelection, onRemoveAllFolders]);
62: 
63:   return (
64:     <>
65:       <div className={styles.fileTreeHeader}>
66:         <Button variant="icon" size="sm" iconOnly startIcon={<Folder size={16} />} onClick={onOpenFolder} title="Select Folder" className={styles.fileTreeBtn} />
67:         <div className={styles.dropdownContainer}>
68:           <Dropdown
69:             options={sortOptions}
70:             onChange={handleSortSelect}
71:             value={currentSortOrder}
72:             trigger={<Button variant="icon" size="sm" iconOnly startIcon={getSortIcon(currentSortOrder)} title="Sort By" className={styles.fileTreeBtn} />}
73:             menuClassName={styles.headerDropdownMenu} // Ensure this class exists or remove
74:           />
75:         </div>
76:         <Button variant="icon" size="sm" iconOnly startIcon={<Filter size={16} />} onClick={onOpenIgnorePatterns} title="Ignore Patterns" className={styles.fileTreeBtn} />
77:         <div className={styles.dropdownContainer}>
78:           <Dropdown
79:             options={clearOptions}
80:             onChange={handleClearSelect}
81:             trigger={<Button variant="icon" size="sm" iconOnly startIcon={<X size={16} />} title="Clear Actions" className={styles.fileTreeBtn} />}
82:             menuClassName={styles.headerDropdownMenu} // Ensure this class exists or remove
83:           />
84:         </div>
85:         <Button variant="icon" size="sm" iconOnly startIcon={<RefreshCw size={16} />} onClick={onReloadFileTree} title="Reload" className={styles.fileTreeBtn} />
86:       </div>
87: 
88:       {excludedFilesCount !== undefined && excludedFilesCount > 0 && (
89:         <div className={styles.excludedFilesCount}>
90:           {excludedFilesCount} {excludedFilesCount === 1 ? 'file' : 'files'} excluded
91:         </div>
92:       )}
93:     </>
94:   );
95: };
96: 
97: export default FileTreeHeader; // Add default export if not already present
```

## File: src/components/IgnorePatterns.tsx
```typescript
  1: import React, { useState, useEffect, useRef, useCallback } from 'react';
  2: import { X, ChevronDown } from "lucide-react";
  3: import { Button, Switch } from "./ui";
  4: import { ErrorBoundary } from './ErrorBoundary';
  5: import styles from "./IgnorePatterns.module.css";
  6: import { SYSTEM_PATTERN_CATEGORIES } from "../utils/patternUtils";
  7: 
  8: // Define the structure for pattern state passed from App
  9: interface IgnorePatternsState {
 10:   patterns: string;
 11:   excludedSystemPatterns: string[];
 12: }
 13: 
 14: // Props interface - Updated
 15: interface IgnorePatternsProps {
 16:   isOpen: boolean;
 17:   onClose: () => void;
 18:   // Pass the full state objects
 19:   globalPatternsState: IgnorePatternsState;
 20:   localPatternsState: IgnorePatternsState; // Only 'patterns' part is relevant here
 21:   localFolderPath?: string;
 22:   processingStatus?: {
 23:     status: "idle" | "processing" | "complete" | "error";
 24:     message: string;
 25:   };
 26:   // Callbacks to App.tsx
 27:   saveIgnorePatterns: (patterns: string, isGlobal: boolean, folderPath?: string) => Promise<void>;
 28:   resetIgnorePatterns: (isGlobal: boolean, folderPath?: string) => Promise<void>;
 29:   clearIgnorePatterns: (folderPath: string) => Promise<void>;
 30:   // For controlling excluded system patterns
 31:   onExcludedSystemPatternsChange: (patterns: string[]) => void;
 32:   systemIgnorePatterns: string[]; // Full list of available system patterns
 33:   recentFolders: string[];
 34: }
 35: 
 36: // Custom error for pattern validation
 37: class PatternValidationError extends Error {
 38:  constructor(message: string) {
 39:   super(message);
 40:   this.name = 'PatternValidationError';
 41:  }
 42: }
 43: 
 44: // Validates a glob pattern for syntax errors
 45: const validatePattern = (pattern: string): boolean => {
 46:   if (!pattern.trim()) {
 47:    throw new PatternValidationError(`Invalid pattern: Pattern cannot be empty`);
 48:   }
 49:   return true;
 50: };
 51: 
 52: 
 53: const IgnorePatternsWithErrorBoundary: React.FC<IgnorePatternsProps> = (props) => (
 54:   <ErrorBoundary fallback={ <div>Error loading ignore patterns component.</div> }>
 55:     <IgnorePatterns {...props} />
 56:   </ErrorBoundary>
 57: );
 58: 
 59: const IgnorePatterns: React.FC<IgnorePatternsProps> = ({
 60:   isOpen,
 61:   onClose,
 62:   globalPatternsState, // Now an object { patterns, excludedSystemPatterns }
 63:   localPatternsState,  // Now an object { patterns, excludedSystemPatterns } (but we only use patterns)
 64:   localFolderPath,
 65:   processingStatus = { status: "idle", message: "" },
 66:   saveIgnorePatterns,
 67:   resetIgnorePatterns,
 68:   clearIgnorePatterns,
 69:   onExcludedSystemPatternsChange,
 70:   systemIgnorePatterns,
 71:   recentFolders,
 72: }) => {
 73:   /**
 74:    * Component State Management
 75:    */
 76:   const isInitialized = useRef(false);
 77: 
 78:   // Use safe initializers for useState, relying on useEffect for sync
 79:   const [currentGlobalPatterns, setCurrentGlobalPatterns] = useState<string>('');
 80:   const [currentLocalPatterns, setCurrentLocalPatterns] = useState<string>('');
 81:   const [mergedPreview, setMergedPreview] = useState<string>("");
 82:   const [activeTab, setActiveTab] = useState<"global" | "local">("global");
 83:   const [selectedFolder, setSelectedFolder] = useState<string | undefined>(localFolderPath);
 84:   const [applyingPatterns, setApplyingPatterns] = useState<boolean>(false);
 85:   const [folderSelectOpen, setFolderSelectOpen] = useState(false);
 86: 
 87:   // Derive excluded patterns directly from props for controlled behavior
 88:   // Add safe fallback for initial render if globalPatternsState is somehow undefined briefly
 89:   const excludedSystemPatterns = globalPatternsState?.excludedSystemPatterns || [];
 90: 
 91:   const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
 92:     Object.keys(SYSTEM_PATTERN_CATEGORIES).reduce((acc, category) => ({ ...acc, [category]: true }), {})
 93:   );
 94:   const textareaRef = useRef<HTMLTextAreaElement>(null);
 95: 
 96:   /**
 97:    * Sync internal state with props when modal opens or props change
 98:    */
 99:   useEffect(() => {
100:     if (isOpen) {
101:       // Safely access props, providing defaults if undefined during initial render cycle
102:       setCurrentGlobalPatterns(globalPatternsState?.patterns ?? '');
103:       if (selectedFolder === localFolderPath) {
104:           setCurrentLocalPatterns(localPatternsState?.patterns ?? '');
105:       } else if (!isInitialized.current) {
106:           setCurrentLocalPatterns(''); // Start fresh if different folder on init
107:       }
108:       setSelectedFolder(localFolderPath); // Sync selected folder
109:       setApplyingPatterns(processingStatus.status === 'processing');
110: 
111:       if (!isInitialized.current) {
112:         isInitialized.current = true;
113:       }
114:     } else {
115:       // Reset init flag when closed
116:       isInitialized.current = false;
117:     }
118:   }, [isOpen, globalPatternsState, localPatternsState, localFolderPath, processingStatus, selectedFolder]); // Ensure all relevant props are dependencies
119: 
120: 
121:   // Generate merged preview - depends on local edits and props
122:   useEffect(() => {
123:     const userPatterns = activeTab === "global" ? currentGlobalPatterns : currentLocalPatterns;
124:     // Ensure excludedSystemPatterns is an array before filtering
125:     const safeExcluded = Array.isArray(excludedSystemPatterns) ? excludedSystemPatterns : [];
126:     const activeSystemPatterns = systemIgnorePatterns.filter(
127:       pattern => !safeExcluded.includes(pattern)
128:     );
129:     const userPatternLines = userPatterns.split("\n").filter(line => line.trim() !== "");
130:     const mergedLines = [...activeSystemPatterns, ...userPatternLines];
131:     setMergedPreview(mergedLines.join("\n"));
132:   }, [activeTab, currentGlobalPatterns, currentLocalPatterns, systemIgnorePatterns, excludedSystemPatterns]); // excludedSystemPatterns comes from props via globalPatternsState
133: 
134:   /**
135:    * Event Handlers
136:    */
137:   const handleTabChange = (isGlobal: boolean) => setActiveTab(isGlobal ? "global" : "local");
138: 
139:   const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
140:     const { value } = e.target;
141:     if (activeTab === 'global') setCurrentGlobalPatterns(value);
142:     else setCurrentLocalPatterns(value);
143:   };
144: 
145:   const handleFolderChange = (folderPath: string) => {
146:     setSelectedFolder(folderPath);
147:     setFolderSelectOpen(false);
148:     if (folderPath === localFolderPath) {
149:        // Safely access patterns from prop state
150:        setCurrentLocalPatterns(localPatternsState?.patterns ?? '');
151:     } else {
152:        setCurrentLocalPatterns('');
153:        console.warn("Selecting a different folder than the App's current one. Local patterns shown are temporary until saved for that specific folder.");
154:     }
155:   };
156: 
157:   const toggleCategory = (category: string) => {
158:     setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
159:   };
160: 
161:   // System pattern management - Calls the callback prop
162:   const handleToggleSystemPattern = useCallback((pattern: string) => {
163:     try {
164:       validatePattern(pattern);
165:        // Ensure excludedSystemPatterns is an array before operating on it
166:       const safeExcluded = Array.isArray(excludedSystemPatterns) ? excludedSystemPatterns : [];
167:       const newExcluded = safeExcluded.includes(pattern)
168:         ? safeExcluded.filter(p => p !== pattern)
169:         : [...safeExcluded, pattern];
170:       onExcludedSystemPatternsChange(newExcluded); // Update App state
171: 
172:       // Visual feedback (optional)
173:       const patternElement = document.querySelector(`[data-pattern="${pattern}"]`);
174:       if (patternElement) {
175:         patternElement.classList.add(styles.patternToggled);
176:         setTimeout(() => patternElement.classList.remove(styles.patternToggled), 300);
177:       }
178:     } catch (error) {
179:       console.error('Error toggling pattern:', error);
180:       if (error instanceof PatternValidationError) console.warn('Pattern validation failed:', error.message);
181:     }
182:   }, [excludedSystemPatterns, onExcludedSystemPatternsChange]); // Use derived excludedSystemPatterns
183: 
184:   // Pattern saving handlers - Use current local edits + props
185:   const handleSaveGlobalPatterns = useCallback(async () => {
186:     try {
187:       setApplyingPatterns(true);
188:       const userPatterns = currentGlobalPatterns.split('\n').filter(p => p.trim());
189:       userPatterns.forEach(validatePattern);
190: 
191:       // Format disabled patterns using the derived prop value
192:       const safeExcluded = Array.isArray(excludedSystemPatterns) ? excludedSystemPatterns : [];
193:       const disabledPatternsSection = safeExcluded
194:         .map(pattern => `# DISABLED: ${pattern}`)
195:         .join('\n');
196: 
197:       const patternsToSave = disabledPatternsSection
198:         ? `${disabledPatternsSection}\n\n${currentGlobalPatterns}`
199:         : currentGlobalPatterns;
200: 
201:       await saveIgnorePatterns(patternsToSave, true); // Call App's save function
202:     } catch (error) {
203:       console.error('Error saving global patterns:', error);
204:       if (error instanceof PatternValidationError) console.warn('Pattern validation failed:', error.message);
205:     } finally {
206:        // Let useEffect watching processingStatus handle resetting applyingPatterns
207:     }
208:   }, [currentGlobalPatterns, excludedSystemPatterns, saveIgnorePatterns]);
209: 
210:   const handleSaveLocalPatterns = useCallback(async () => {
211:     if (!selectedFolder) return;
212:     try {
213:       setApplyingPatterns(true);
214:       const userPatterns = currentLocalPatterns.split('\n').filter(p => p.trim());
215:       userPatterns.forEach(validatePattern);
216:       await saveIgnorePatterns(currentLocalPatterns, false, selectedFolder); // Call App's save function
217:     } catch (error) {
218:       console.error('Error saving local patterns:', error);
219:       if (error instanceof PatternValidationError) console.warn('Pattern validation failed:', error.message);
220:     } finally {
221:        // Let useEffect watching processingStatus handle resetting applyingPatterns
222:     }
223:   }, [currentLocalPatterns, selectedFolder, saveIgnorePatterns]);
224: 
225:   // Trigger confirmation dialogs via App's handlers - Passed via props
226:   const triggerReset = useCallback((isGlobal: boolean) => {
227:      // This now correctly calls the prop passed from App, which should show a dialog
228:      resetIgnorePatterns(isGlobal, selectedFolder || "");
229:   }, [resetIgnorePatterns, selectedFolder]);
230: 
231:   const triggerClear = useCallback(() => {
232:     if (selectedFolder) {
233:       // This now correctly calls the prop passed from App, which should show a dialog
234:       clearIgnorePatterns(selectedFolder);
235:     }
236:   }, [clearIgnorePatterns, selectedFolder]);
237: 
238: 
239:   // Modal management
240:   const handleModalClose = useCallback(() => onClose(), [onClose]); // Wrap in useCallback
241: 
242:   const handleKeyDown = useCallback((e: React.KeyboardEvent) => { // Wrap in useCallback
243:     if ((e.ctrlKey || e.metaKey) && e.key === 's') {
244:       e.preventDefault();
245:       if (activeTab === 'global') handleSaveGlobalPatterns();
246:       else if (selectedFolder) handleSaveLocalPatterns();
247:     }
248:     if (e.key === 'Escape') handleModalClose();
249:   }, [activeTab, selectedFolder, handleSaveGlobalPatterns, handleSaveLocalPatterns, handleModalClose]); // Add dependencies
250: 
251:   // --- Render ---
252:   if (!isOpen) return null;
253: 
254:   return (
255:     <div className={styles.modal} onKeyDown={handleKeyDown}> {/* Attach keydown listener here */}
256:       <div className={styles.content}>
257:         <div className={styles.header}>
258:           <h2>
259:             Ignore Patterns
260:             {applyingPatterns && <span className={styles.applying}>(Applying...)</span>}
261:           </h2>
262:           <Button variant="ghost" size="sm" onClick={handleModalClose} startIcon={<X size={16} />} title="Close" aria-label="Close" disabled={applyingPatterns} />
263:         </div>
264: 
265:         <div className={styles.description}>
266:             Manage patterns to exclude files from processing. Global patterns apply everywhere, local patterns apply only to the selected folder. System patterns can be toggled on/off globally.
267:         </div>
268: 
269:         {/* Scope Selector (Tabs) */}
270:         <div className={styles.scopeSelector}>
271:             <Button variant={activeTab === "global" ? "secondary" : "ghost"} className={`${styles.scopeBtn} ${activeTab === "global" ? styles.active : ""}`} onClick={() => handleTabChange(true)} disabled={applyingPatterns}> Global </Button>
272:             <Button variant={activeTab === "local" ? "secondary" : "ghost"} className={`${styles.scopeBtn} ${activeTab === "local" ? styles.active : ""}`} onClick={() => handleTabChange(false)} disabled={applyingPatterns}> Local Folder </Button>
273:         </div>
274: 
275:         {/* Global Tab Content */}
276:         {activeTab === "global" && (
277:           <>
278:             {/* System Patterns Section */}
279:             <div className={styles.systemPatternsSection}>
280:               {/* Ensure excludedSystemPatterns is array before calculating length */}
281:               <h3 className={styles.sectionTitle}> System Defaults ({systemIgnorePatterns.length - (Array.isArray(excludedSystemPatterns) ? excludedSystemPatterns.length : 0)} active) </h3>
282:                {Object.entries(SYSTEM_PATTERN_CATEGORIES).map(([category, patternsInCategory]) => { // Renamed variable
283:                     // Ensure excludedSystemPatterns is array before filtering
284:                     const safeExcluded = Array.isArray(excludedSystemPatterns) ? excludedSystemPatterns : [];
285:                     // Filter patterns from the *main* system list that belong to this category
286:                     const categoryPatterns = systemIgnorePatterns.filter(p => patternsInCategory.includes(p));
287:                     if (categoryPatterns.length === 0) return null; // Skip empty categories
288:                     const enabledInCategory = categoryPatterns.filter(p => !safeExcluded.includes(p)).length;
289: 
290:                     return (
291:                         <div key={category} className={`${styles.patternCategory} ${expandedCategories[category] ? styles.categoryExpanded : ''}`}>
292:                           <div className={styles.categoryHeader} onClick={() => toggleCategory(category)}>
293:                             <div className={styles.categoryTitle}> {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} </div>
294:                             <div className={styles.categoryMeta}>
295:                               <span className={styles.categoryCount}> {enabledInCategory}/{categoryPatterns.length} </span>
296:                               <ChevronDown size={16} className={`${styles.chevron} ${expandedCategories[category] ? styles.chevronRotated : ''}`} />
297:                             </div>
298:                           </div>
299:                           {expandedCategories[category] && (
300:                             <div className={styles.categoryItems}>
301:                               {categoryPatterns.map(pattern => {
302:                                 // Ensure excludedSystemPatterns is array before checking includes
303:                                 const safeExcludedInner = Array.isArray(excludedSystemPatterns) ? excludedSystemPatterns : [];
304:                                 const isEnabled = !safeExcludedInner.includes(pattern);
305:                                 return (
306:                                   <div key={pattern} className={`${styles.systemPatternItem} ${isEnabled ? '' : styles.disabledPattern}`} data-pattern={pattern}>
307:                                     <span className={styles.patternText} title={pattern}>{pattern}</span>
308:                                     <Switch
309:                                         checked={isEnabled}
310:                                         onChange={() => handleToggleSystemPattern(pattern)}
311:                                         className={styles.smallerSwitch}
312:                                         id={`switch-${pattern}-${category}`} // Make ID more unique
313:                                         aria-label={pattern} // Use pattern as label
314:                                     />
315:                                   </div>
316:                                 );
317:                               })}
318:                             </div>
319:                           )}
320:                         </div>
321:                     );
322:                 })}
323:             </div>
324: 
325:             {/* Global Custom Patterns Section */}
326:             <div className={styles.patternEntrySection}>
327:                 <h3 className={styles.sectionTitle}> Global Custom Patterns </h3>
328:                 <textarea ref={textareaRef} className={styles.patternsInput} value={currentGlobalPatterns} onChange={handleTextareaChange} placeholder="Enter global ignore patterns..." disabled={applyingPatterns} />
329:             </div>
330:           </>
331:         )}
332: 
333:         {/* Local Tab Content */}
334:         {activeTab === "local" && (
335:             <div className={styles.patternEntrySection}>
336:                 <h3 className={styles.sectionTitle}> Local Custom Patterns </h3>
337:                 <div className={styles.folderSelector}>
338:                     <label htmlFor="folder-select-dropdown">Select Folder</label> {/* Add label */}
339:                     <div id="folder-select-dropdown" className={styles.customSelect} onClick={() => !applyingPatterns && setFolderSelectOpen(!folderSelectOpen)} aria-haspopup="listbox">
340:                         <div className={styles.selectedValue} role="button" aria-expanded={folderSelectOpen}>
341:                             {selectedFolder || 'Select a folder'}
342:                             <ChevronDown size={16} className={`${styles.chevron} ${folderSelectOpen ? styles.open : ''}`} />
343:                         </div>
344:                         {folderSelectOpen && (
345:                         <div className={styles.optionsContainer} role="listbox">
346:                             {recentFolders.length > 0 ? (
347:                             recentFolders.map((folder, index) => (
348:                                 <div key={index} className={styles.option} onClick={() => handleFolderChange(folder)} role="option" aria-selected={folder === selectedFolder}> {folder} </div>
349:                             ))
350:                             ) : (
351:                             <div className={styles.option} role="option" aria-disabled="true"> {selectedFolder || 'No recent folders'} </div>
352:                             )}
353:                         </div>
354:                         )}
355:                     </div>
356:                     <div className={styles.pathDisplay}> Path: {selectedFolder ? `${selectedFolder}/.repo_ignore` : 'N/A'} </div>
357:                 </div>
358:                 <textarea ref={textareaRef} className={styles.patternsInput} value={currentLocalPatterns} onChange={handleTextareaChange} placeholder="Enter local ignore patterns..." disabled={applyingPatterns || !selectedFolder} />
359:             </div>
360:         )}
361: 
362:         {/* Preview Section (Always visible) */}
363:         <div className={styles.previewSection}>
364:             <div className={styles.previewContainer}>
365:                 <div className={styles.previewHeader}>
366:                     <span>Effective Patterns Preview</span>
367:                     <span className={styles.patternCount}>{mergedPreview.split('\n').filter(line => line.trim()).length} active</span>
368:                 </div>
369:                 {mergedPreview.split('\n').map((line, index) => {
370:                     if (!line.trim()) return null;
371:                     const safeExcluded = Array.isArray(excludedSystemPatterns) ? excludedSystemPatterns : [];
372:                     const isSystem = systemIgnorePatterns.includes(line) && !safeExcluded.includes(line);
373:                     // Check against CURRENT edited patterns for the active tab
374:                     const isGlobalUser = activeTab === 'global' && currentGlobalPatterns.split('\n').includes(line);
375:                     const isLocalUser = activeTab === 'local' && currentLocalPatterns.split('\n').includes(line);
376: 
377:                     let badgeText = 'Unknown';
378:                     let badgeClass = ''; // No default class
379:                     if (isSystem) {
380:                         badgeText = 'System';
381:                         badgeClass = styles.previewSystem;
382:                     } else if (isGlobalUser || (activeTab === 'local' && globalPatternsState?.patterns?.split('\n').includes(line))) { // Also check prop state for inactive tab preview
383:                         badgeText = 'Global';
384:                         badgeClass = styles.previewGlobal;
385:                     } else if (isLocalUser || (activeTab === 'global' && localPatternsState?.patterns?.split('\n').includes(line))) { // Also check prop state for inactive tab preview
386:                         badgeText = 'Local';
387:                          badgeClass = styles.previewLocal;
388:                     } else if (line.startsWith('#')) {
389:                          badgeText = 'Comment'; // Indicate comments if needed
390:                          badgeClass = styles.previewComment; // Add style for comments
391:                     }
392: 
393:                     return (
394:                         <div key={index} className={`${styles.previewLine} ${badgeClass}`}>
395:                             {line}
396:                              {badgeText !== 'Unknown' && badgeText !== 'Comment' && <span className={styles.previewBadge}> {badgeText} </span>}
397:                         </div>
398:                     );
399:                 })}
400:             </div>
401:         </div>
402: 
403:         {/* Modal Actions */}
404:         <div className={styles.modalActions}>
405:             {activeTab === "global" ? (
406:                 <>
407:                     <Button variant="primary" onClick={handleSaveGlobalPatterns} disabled={applyingPatterns}> Save Global </Button>
408:                     {/* Button now triggers confirmation dialog via App prop */}
409:                     <Button variant="secondary" onClick={() => resetIgnorePatterns(true, '')} disabled={applyingPatterns}> Reset Global </Button>
410:                 </>
411:             ) : (
412:                 <>
413:                     <Button variant="primary" onClick={handleSaveLocalPatterns} disabled={!selectedFolder || applyingPatterns}> Save Local </Button>
414:                     {/* Button now triggers confirmation dialog via App prop */}
415:                     <Button variant="secondary" onClick={() => resetIgnorePatterns(false, selectedFolder || '')} disabled={!selectedFolder || applyingPatterns}> Reset Local </Button>
416:                     <Button variant="destructive" onClick={() => clearIgnorePatterns(selectedFolder || '')} disabled={!selectedFolder || applyingPatterns}> Clear Local </Button>
417:                 </>
418:             )}
419:             <Button variant="ghost" onClick={handleModalClose} disabled={applyingPatterns}> Cancel </Button>
420:         </div>
421:       </div>
422:     </div>
423:   );
424: };
425: 
426: export default IgnorePatternsWithErrorBoundary;
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

## File: src/components/Sidebar.tsx
```typescript
  1: import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
  2: import { SidebarProps, TreeNode, SortOrder, FileData } from "../types/FileTypes";
  3: import TreeItem from "./TreeItem";
  4: import FileTreeHeader from "./FileTreeHeader";
  5: import IgnorePatterns from "./IgnorePatterns";
  6: import { FolderPlus } from "lucide-react";
  7: import { Button } from "./ui";
  8: import SearchBar from "./SearchBar";
  9: import styles from "./Sidebar.module.css";
 10: 
 11: // Extend the existing SidebarProps from FileTypes
 12: interface ExtendedSidebarProps extends SidebarProps {
 13:   reloadFolder: () => void;
 14:   clearSelection: () => void;
 15:   removeAllFolders: () => void;
 16:   ignorePatterns: string;
 17:   setIgnorePatterns: (patterns: string) => void;
 18:   loadIgnorePatterns: (folderPath: string, isGlobal?: boolean) => Promise<void>;
 19:   saveIgnorePatterns: (patterns: string, isGlobal: boolean, folderPath?: string) => Promise<void>;
 20:   resetIgnorePatterns: (isGlobal: boolean, folderPath?: string) => Promise<void>;
 21:   systemIgnorePatterns: string[];
 22:   clearIgnorePatterns: (folderPath: string) => Promise<void>;
 23:   onClearSelectionClick: () => void;
 24:   onRemoveAllFoldersClick: () => void;
 25:   onResetPatternsClick: (isGlobal: boolean, folderPath: string) => void;
 26:   fileTreeSortOrder: SortOrder;
 27:   onSortOrderChange: (order: SortOrder) => void;
 28:   globalPatternsState: IgnorePatternsState;
 29:   localPatternsState: IgnorePatternsState;
 30:   onExcludedSystemPatternsChange: (patterns: string[]) => void;
 31: }
 32: 
 33: // Define IgnorePatternsState interface
 34: interface IgnorePatternsState {
 35:   patterns: string;
 36:   excludedSystemPatterns: string[];
 37: }
 38: 
 39: // Debounce delay in ms
 40: const DEBOUNCE_DELAY = 200;
 41: 
 42: // Use a timeout to prevent infinite tree building loops
 43: const TREE_BUILD_TIMEOUT = 5000;
 44: 
 45: const Sidebar: React.FC<ExtendedSidebarProps> = ({
 46:   selectedFolder,
 47:   openFolder,
 48:   allFiles,
 49:   selectedFiles,
 50:   toggleFileSelection,
 51:   toggleFolderSelection,
 52:   searchTerm,
 53:   onSearchChange,
 54:   selectAllFiles,
 55:   deselectAllFiles,
 56:   expandedNodes,
 57:   toggleExpanded,
 58:   reloadFolder,
 59:   clearSelection,
 60:   removeAllFolders,
 61:   ignorePatterns,
 62:   setIgnorePatterns,
 63:   loadIgnorePatterns,
 64:   saveIgnorePatterns,
 65:   resetIgnorePatterns,
 66:   systemIgnorePatterns,
 67:   clearIgnorePatterns,
 68:   onClearSelectionClick,
 69:   onRemoveAllFoldersClick,
 70:   onResetPatternsClick,
 71:   fileTreeSortOrder,
 72:   onSortOrderChange,
 73:   globalPatternsState,
 74:   localPatternsState,
 75:   onExcludedSystemPatternsChange,
 76: }) => {
 77:   const [fileTree, setFileTree] = useState<TreeNode[]>([]);
 78:   const [sidebarWidth, setSidebarWidth] = useState(300);
 79:   const [isResizing, setIsResizing] = useState(false);
 80:   
 81:   // State for ignore patterns modal
 82:   const [ignoreModalOpen, setIgnoreModalOpen] = useState(false);
 83:   const [ignoreGlobal, setIgnoreGlobal] = useState(false);
 84:   const [globalIgnorePatterns, setGlobalIgnorePatterns] = useState("");
 85:   const [localIgnorePatterns, setLocalIgnorePatterns] = useState("");
 86:   
 87:   // Min and max width constraints
 88:   const MIN_SIDEBAR_WIDTH = 200;
 89:   const MAX_SIDEBAR_WIDTH = 500;
 90: 
 91:   // All component level refs need to be defined here
 92:   const loadedFoldersRef = useRef<Set<string>>(new Set());
 93:   const lastProcessedFolderRef = useRef<string | null>(null);
 94:   const isBuildingTreeRef = useRef(false);
 95:   const isUpdatingExpandedNodesRef = useRef(false);
 96:   const buildTimeoutRef = useRef<NodeJS.Timeout | null>(null);
 97:   const lastSelectedFilesRef = useRef<string[]>([]);
 98: 
 99:   // Cache the previous selected files to optimize render
100:   useEffect(() => {
101:     lastSelectedFilesRef.current = selectedFiles;
102:   }, [selectedFiles]);
103: 
104:   // Helper function for file tree - Flatten the tree for rendering
105:   const flattenTree = useCallback((nodes: TreeNode[]): TreeNode[] => {
106:     let result: TreeNode[] = [];
107:     
108:     for (const node of nodes) {
109:       result.push(node);
110:       
111:       if (node.type === "directory" && node.isExpanded && node.children && node.children.length > 0) {
112:         result = result.concat(flattenTree(node.children));
113:       }
114:     }
115:     
116:     return result;
117:   }, []);
118:   
119:   // Helper function for file tree - Filter the tree based on search term with performance optimizations
120:   const filterTree = useCallback((nodes: TreeNode[], term: string): TreeNode[] => {
121:     if (!term) return nodes;
122:     
123:     const lowerTerm = term.toLowerCase();
124:     
125:     // Helper function to check if a node or its children match the search term
126:     const hasMatch = (node: TreeNode): boolean => {
127:       if (node.name.toLowerCase().includes(lowerTerm)) {
128:         return true;
129:       }
130:       
131:       if (node.type === "directory" && node.children && node.children.length > 0) {
132:         return node.children.some(hasMatch);
133:       }
134:       
135:       return false;
136:     };
137:     
138:     const filterNode = (node: TreeNode): TreeNode | null => {
139:       if (!hasMatch(node)) {
140:         return null;
141:       }
142:       
143:       if (node.type === "file") {
144:         return node;
145:       }
146:       
147:       if (node.type === "directory") {
148:         const filteredChildren = node.children 
149:           ? node.children
150:               .map(filterNode)
151:               .filter((n): n is TreeNode => n !== null)
152:           : [];
153:         
154:         return {
155:           ...node,
156:           isExpanded: true, // Always expand matching directories
157:           children: filteredChildren
158:         };
159:       }
160:       
161:       return null;
162:     };
163:     
164:     return nodes
165:       .map(filterNode)
166:       .filter((n): n is TreeNode => n !== null);
167:   }, []);
168:   
169:   // Use memoization to avoid unnecessary recalculations
170:   const memoizedFilteredTree = useMemo(() => {
171:     return searchTerm ? filterTree(fileTree, searchTerm) : fileTree;
172:   }, [fileTree, searchTerm, filterTree]);
173:   
174:   const memoizedFlattenedTree = useMemo(() => {
175:     return flattenTree(memoizedFilteredTree);
176:   }, [memoizedFilteredTree, flattenTree]);
177: 
178:   // Handle mouse down for resizing
179:   const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>) => {
180:     e.preventDefault();
181:     setIsResizing(true);
182:   };
183: 
184:   // Handle resize effect
185:   useEffect(() => {
186:     const handleResize = (e: globalThis.MouseEvent) => {
187:       if (isResizing) {
188:         const newWidth = e.clientX;
189:         if (newWidth >= MIN_SIDEBAR_WIDTH && newWidth <= MAX_SIDEBAR_WIDTH) {
190:           setSidebarWidth(newWidth);
191:         }
192:       }
193:     };
194: 
195:     const handleResizeEnd = () => {
196:       setIsResizing(false);
197:     };
198: 
199:     document.addEventListener("mousemove", handleResize);
200:     document.addEventListener("mouseup", handleResizeEnd);
201: 
202:     return () => {
203:       document.removeEventListener("mousemove", handleResize);
204:       document.removeEventListener("mouseup", handleResizeEnd);
205:     };
206:   }, [isResizing]);
207: 
208:   // Load ignore patterns when folder changes - with optimization to prevent infinite loops
209:   useEffect(() => {
210:     // Skip if no folder is selected
211:     if (!selectedFolder) return;
212:     
213:     // Skip if we already processed this exact folder
214:     if (lastProcessedFolderRef.current === selectedFolder && 
215:         loadedFoldersRef.current.has(selectedFolder)) return;
216:     
217:     // Set the last processed folder reference
218:     lastProcessedFolderRef.current = selectedFolder;
219:     
220:     // Track that we're processing this folder
221:     loadedFoldersRef.current.add(selectedFolder);
222:     
223:     // Load the patterns
224:     loadIgnorePatterns(selectedFolder, false);
225:     
226:   }, [selectedFolder, loadIgnorePatterns]);
227: 
228:   // Sort file tree nodes - memoized with useCallback to prevent recreation on every render
229:   const sortFileTreeNodes = useCallback((nodes: TreeNode[]): TreeNode[] => {
230:     if (!nodes || nodes.length === 0) return [];
231: 
232:     // Create a new array to avoid mutating the input
233:     return [...nodes].sort((a, b) => {
234:       // Always sort directories first
235:       if (a.type === "directory" && b.type === "file") return -1;
236:       if (a.type === "file" && b.type === "directory") return 1;
237:       
238:       // Sort based on selected sort order
239:       switch (fileTreeSortOrder) {
240:         case "name-ascending":
241:           return a.name.localeCompare(b.name);
242:         case "name-descending":
243:           return b.name.localeCompare(a.name);
244:         case "tokens-ascending":
245:           return (a.fileData?.tokenCount || 0) - (b.fileData?.tokenCount || 0);
246:         case "tokens-descending":
247:           return (b.fileData?.tokenCount || 0) - (a.fileData?.tokenCount || 0);
248:         case "date-ascending":
249:           return (a.fileData?.lastModified || 0) - (b.fileData?.lastModified || 0);
250:         case "date-descending":
251:           return (b.fileData?.lastModified || 0) - (a.fileData?.lastModified || 0);
252:         default:
253:           return a.name.localeCompare(b.name);
254:       }
255:     });
256:   }, [fileTreeSortOrder]);
257: 
258:   // Apply sort recursively to the entire tree
259:   const sortNodesRecursively = useCallback((nodes: TreeNode[]): TreeNode[] => {
260:     if (!nodes || nodes.length === 0) return [];
261: 
262:     // Sort the current level
263:     const sortedNodes = sortFileTreeNodes(nodes);
264:     
265:     // Recursively sort children
266:     return sortedNodes.map(node => {
267:       if (node.type === "directory" && node.children && node.children.length > 0) {
268:         return {
269:           ...node,
270:           children: sortNodesRecursively(node.children)
271:         };
272:       }
273:       return node;
274:     });
275:   }, [sortFileTreeNodes]);
276: 
277:   // Build file tree structure from flat list of files - optimized
278:   const buildFileTree = useCallback(async (files: FileData[], rootFolder: string): Promise<TreeNode[]> => {
279:     if (!files || files.length === 0) return [];
280:     
281:     // Create a stable map of paths to prevent recursion issues
282:     const pathMap = new Map<string, FileData>();
283:     files.forEach(file => {
284:       if (file.path) {
285:         pathMap.set(file.path, file);
286:       }
287:     });
288:     
289:     try {
290:       // Create a map to store the file tree structure
291:       const fileMap: Record<string, any> = {};
292:       
293:       // Process each file
294:       Array.from(pathMap.entries()).forEach(([path, file]) => {
295:         let relativePath = path;
296:         if (relativePath.startsWith(rootFolder)) {
297:           relativePath = relativePath.substring(rootFolder.length);
298:           if (relativePath.startsWith('/') || relativePath.startsWith('\\')) {
299:             relativePath = relativePath.substring(1);
300:           }
301:         }
302:         
303:         const parts = relativePath.split(/[/\\]/);
304:         let current = fileMap;
305:         
306:         // Build the tree structure
307:         parts.forEach((part, index) => {
308:           if (!current[part]) {
309:             const fullPath = rootFolder + '/' + parts.slice(0, index + 1).join('/');
310:             const nodeId = `${fullPath}`;
311:             current[part] = {
312:               name: part,
313:               path: fullPath,
314:               id: nodeId, 
315:               type: index === parts.length - 1 ? "file" as const : "directory" as const,
316:               children: {},
317:               fileData: index === parts.length - 1 ? file : undefined
318:             };
319:           }
320:           current = current[part].children;
321:         });
322:       });
323:       
324:       // Convert the nested object structure to an array of TreeNodes
325:       const convertToTreeNodes = (
326:         obj: Record<string, any>,
327:         level = 0
328:       ): TreeNode[] => {
329:         const nodes = Object.values(obj)
330:           .filter(item => item !== undefined)
331:           .map((item: any): TreeNode => {
332:             const nodeId = item.id;
333:             const isNodeExpanded = expandedNodes.get(nodeId);
334:             
335:             // Auto-expand first level when no explicit expansion state is saved
336:             const shouldAutoExpand = isNodeExpanded === undefined && level < 1;
337:             
338:             if (item.type === "directory") {
339:               const children = convertToTreeNodes(item.children, level + 1);
340:               return {
341:                 id: nodeId,
342:                 name: item.name,
343:                 path: item.path,
344:                 type: "directory" as const,
345:                 children: children,
346:                 isExpanded: isNodeExpanded !== undefined ? isNodeExpanded : shouldAutoExpand,
347:                 depth: level,
348:               };
349:             }
350:             
351:             return {
352:               id: nodeId,
353:               name: item.name,
354:               path: item.path,
355:               type: "file" as const,
356:               fileData: item.fileData,
357:               depth: level,
358:             };
359:           });
360:         
361:         return nodes;
362:       };
363:       
364:       // Convert with timeout protection
365:       let result = convertToTreeNodes(fileMap);
366:       
367:       // Apply sorting recursively
368:       result = sortNodesRecursively(result);
369:       
370:       return result;
371:         
372:     } catch (error) {
373:       console.error('Error building file tree:', error);
374:       return [];
375:     }
376:   }, [expandedNodes, sortNodesRecursively]);
377: 
378:   // Set up the effect for building the file tree with debouncing and cleanup
379:   useEffect(() => {
380:     if (!allFiles || allFiles.length === 0) {
381:       setFileTree([]);
382:       isBuildingTreeRef.current = false;
383:       return;
384:     }
385:     
386:     // Skip if we're already building a tree
387:     if (isBuildingTreeRef.current) {
388:       console.log('Tree building in progress, skipping...');
389:       return;
390:     }
391:     
392:     // Clear any existing timeout
393:     if (buildTimeoutRef.current) {
394:       clearTimeout(buildTimeoutRef.current);
395:       buildTimeoutRef.current = null;
396:     }
397:     
398:     let isCurrentBuild = true;
399:     const buildId = Math.random().toString(36).substring(2, 9); // Unique ID for logging
400:     
401:     const buildTreeWithDebounce = async () => {
402:       try {
403:         isBuildingTreeRef.current = true;
404:         console.log(`Starting tree build ${buildId}...`);
405:         
406:         // Safety timeout to prevent tree building from hanging
407:         const timeoutPromise = new Promise<TreeNode[]>((_, reject) => {
408:           buildTimeoutRef.current = setTimeout(() => {
409:             console.warn(`Tree build ${buildId} timed out after ${TREE_BUILD_TIMEOUT}ms`);
410:             reject(new Error('Tree build timed out'));
411:           }, TREE_BUILD_TIMEOUT);
412:         });
413:         
414:         // Actual tree building process
415:         const buildPromise = buildFileTree(allFiles, selectedFolder || "");
416:         
417:         // Race between timeout and completion
418:         const result = await Promise.race([timeoutPromise, buildPromise]);
419:         
420:         // Only update if this is still the current build and we have a valid result
421:         if (isCurrentBuild && result) {
422:           setFileTree(result);
423:           console.log(`Tree build ${buildId} completed successfully with ${result.length} root nodes`);
424:         }
425:       } catch (error) {
426:         console.error(`Tree build ${buildId} failed:`, error);
427:         if (isCurrentBuild) {
428:           setFileTree([]);
429:         }
430:       } finally {
431:         if (isCurrentBuild) {
432:           isBuildingTreeRef.current = false;
433:           if (buildTimeoutRef.current) {
434:             clearTimeout(buildTimeoutRef.current);
435:             buildTimeoutRef.current = null;
436:           }
437:         }
438:       }
439:     };
440:     
441:     // Debounce the tree build to avoid unnecessary work during rapid state changes
442:     const timeoutId = setTimeout(buildTreeWithDebounce, DEBOUNCE_DELAY);
443:     
444:     return () => {
445:       isCurrentBuild = false;
446:       clearTimeout(timeoutId);
447:       if (buildTimeoutRef.current) {
448:         clearTimeout(buildTimeoutRef.current);
449:         buildTimeoutRef.current = null;
450:       }
451:       console.log(`Cleaning up tree build ${buildId}`);
452:     };
453:   }, [allFiles, selectedFolder, buildFileTree]);
454: 
455:   // Handle opening the ignore patterns modal
456:   const handleOpenIgnorePatterns = async (isGlobal = false) => {
457:     try {
458:       setIgnoreGlobal(isGlobal);
459:       setIgnoreModalOpen(true);
460:       
461:       // Ensure we have patterns loaded
462:       if (isGlobal) {
463:         await loadPatterns(true);
464:       } else {
465:         await loadPatterns(false);
466:       }
467:     } catch (error) {
468:       console.error('Error opening ignore patterns modal:', error);
469:       // Reset modal state on error
470:       setIgnoreModalOpen(false);
471:     }
472:   };
473: 
474:   // Load patterns based on global or local scope
475:   const loadPatterns = useCallback(async (isGlobal: boolean) => {
476:     try {
477:       // Load global patterns if needed
478:       if (isGlobal) {
479:         if (!globalIgnorePatterns) {
480:           await loadIgnorePatterns('', true);
481:         } else {
482:           setIgnorePatterns(globalIgnorePatterns);
483:         }
484:       } 
485:       // Load local patterns if needed
486:       else if (selectedFolder && !localIgnorePatterns) {
487:         await loadIgnorePatterns(selectedFolder, false);
488:       } else if (selectedFolder) {
489:         setIgnorePatterns(localIgnorePatterns);
490:       }
491:     } catch (err) {
492:       console.error(`Error loading ${isGlobal ? 'global' : 'local'} patterns:`, err);
493:     }
494:   }, [selectedFolder, loadIgnorePatterns, globalIgnorePatterns, localIgnorePatterns, setIgnorePatterns]);
495: 
496:   // Handle reset button click in ignore patterns modal
497:   const handleResetIgnorePatterns = useCallback(async () => {
498:     if (!window.electron) return;
499:     
500:     // Determine whether to reset global or local patterns based on the active tab
501:     const isGlobal = ignoreGlobal;
502:     const folderPath = isGlobal ? undefined : selectedFolder;
503:     
504:     if (resetIgnorePatterns) {
505:       await resetIgnorePatterns(isGlobal, folderPath || '');
506:     }
507:     
508:     // Reload patterns after reset
509:     await loadPatterns(isGlobal);
510:   }, [selectedFolder, loadPatterns, ignoreGlobal, resetIgnorePatterns]);
511: 
512:   // Handle clear button click in ignore patterns modal
513:   const handleClearIgnorePatterns = (folderPath?: string) => {
514:     // Use the provided folderPath if available, otherwise use selectedFolder
515:     const targetFolder = folderPath || selectedFolder || '';
516:     
517:     if (targetFolder) {
518:       // Call the parent's clear function
519:       clearIgnorePatterns(targetFolder);
520:       
521:       // Preview empty patterns in the UI immediately
522:       setLocalIgnorePatterns('');
523:       if (!ignoreGlobal) {
524:         setIgnorePatterns('');
525:       }
526:     }
527:   };
528: 
529:   // Get a list of available folders for the folder selector
530:   const getAvailableFolders = () => {
531:     const folders = new Set<string>();
532:     
533:     // Collect all unique folder paths
534:     allFiles.forEach((file) => {
535:       if (file.path) {
536:         // Extract directory without the file name
537:         const lastSlashIndex = Math.max(
538:           file.path.lastIndexOf('/'),
539:           file.path.lastIndexOf('\\')
540:         );
541:         
542:         if (lastSlashIndex > 0) {
543:           const folder = file.path.substring(0, lastSlashIndex);
544:           folders.add(folder);
545:         }
546:       }
547:     });
548:     
549:     return Array.from(folders);
550:   };
551: 
552:   // Count files excluded by ignore patterns
553:   const countExcludedFiles = () => {
554:     return allFiles.filter(file => file.excluded).length;
555:   };
556: 
557:   // Handle sort change events
558:   const handleSortChange = (newSortOrder: SortOrder) => {
559:     // Pass the sort order change back to the parent component
560:     if (fileTreeSortOrder !== newSortOrder) {
561:       // We need to handle this in the App component, not locally
562:       if (onSortOrderChange) {
563:         onSortOrderChange(newSortOrder);
564:       }
565:     }
566:   };
567: 
568:   return (
569:     <div className={styles.sidebar} style={{ width: `${sidebarWidth}px` }}>
570:       <FileTreeHeader 
571:         onOpenFolder={openFolder}
572:         onSortChange={handleSortChange}
573:         onClearSelection={onClearSelectionClick || clearSelection}
574:         onRemoveAllFolders={onRemoveAllFoldersClick || removeAllFolders}
575:         onReloadFileTree={reloadFolder}
576:         onOpenIgnorePatterns={() => handleOpenIgnorePatterns(false)}
577:         excludedFilesCount={countExcludedFiles()}
578:         currentSortOrder={fileTreeSortOrder}
579:       />
580:       
581:       {selectedFolder ? (
582:         <>
583:           <div className={styles.sidebarSearch}>
584:             <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
585:           </div>
586: 
587:           <div className={styles.sidebarActions}>
588:             <Button
589:               variant="primary"
590:               size="sm"
591:               onClick={selectAllFiles}
592:               title="Select all files"
593:             >
594:               Select All
595:             </Button>
596:             <Button
597:               variant="primary"
598:               size="sm"
599:               onClick={deselectAllFiles}
600:               title="Deselect all files"
601:             >
602:               Deselect All
603:             </Button>
604:           </div>
605: 
606:           <div className={styles.fileTree}>
607:             {memoizedFlattenedTree.length > 0 ? (
608:               <>
609:                 {memoizedFlattenedTree.map((node) => (
610:                   <TreeItem
611:                     key={node.id}
612:                     node={node}
613:                     selectedFiles={selectedFiles}
614:                     toggleFileSelection={toggleFileSelection}
615:                     toggleFolderSelection={toggleFolderSelection}
616:                     toggleExpanded={toggleExpanded}
617:                   />
618:                 ))}
619:               </>
620:             ) : (
621:               <div className={styles.treeEmpty}>
622:                 {searchTerm
623:                   ? "No files match your search."
624:                   : "No files in this folder."}
625:               </div>
626:             )}
627:           </div>
628:         </>
629:       ) : (
630:         <div className={styles.sidebarEmptyState}>
631:           <FolderPlus size={48} className={styles.sidebarEmptyIcon} />
632:           <h3>No Folder Selected</h3>
633:           <p>Click the folder icon above to select a project folder.</p>
634:         </div>
635:       )}
636: 
637:       <div
638:         className={styles.sidebarResizeHandle}
639:         onMouseDown={handleResizeStart}
640:         title="Resize sidebar"
641:       />
642:       
643:       <IgnorePatterns 
644:         isOpen={ignoreModalOpen}
645:         onClose={() => setIgnoreModalOpen(false)}
646:         globalIgnorePatterns={globalIgnorePatterns}
647:         localIgnorePatterns={localIgnorePatterns}
648:         localFolderPath={selectedFolder || ""}
649:         processingStatus={{ status: "idle", message: "" }}
650:         saveIgnorePatterns={async (patterns, isGlobal, folderPath) => {
651:           await Promise.resolve(saveIgnorePatterns(patterns, isGlobal, folderPath || ""));
652:         }}
653:         resetIgnorePatterns={async (isGlobal, folderPath) => {
654:           if (resetIgnorePatterns) {
655:             await Promise.resolve(resetIgnorePatterns(isGlobal, folderPath || ""));
656:           }
657:         }}
658:         clearIgnorePatterns={async (folderPath) => {
659:           await Promise.resolve(clearIgnorePatterns(folderPath));
660:         }}
661:         systemIgnorePatterns={systemIgnorePatterns}
662:         recentFolders={getAvailableFolders()}
663:         systemPatternCategories={{
664:           versionControl: ["**/.git/**", "**/.svn/**", "**/.hg/**"],
665:           buildFiles: ["**/dist/**", "**/build/**", "**/.output/**"],
666:           mediaFiles: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif"],
667:           documentation: ["**/*.pdf", "**/*.doc", "**/*.docx"],
668:           dependencies: ["**/node_modules/**", "**/__pycache__/**", "**/venv/**"]
669:         }}
670:       />
671:     </div>
672:   );
673: };
674: 
675: export default Sidebar;
```

## File: src/App.tsx
```typescript
  1: import React, { useState, useEffect, useCallback, useMemo } from "react";
  2: import Sidebar from "./components/Sidebar";
  3: import FileList from "./components/FileList";
  4: import UserInstructions from "./components/UserInstructions";
  5: import ControlContainer from "./components/ControlContainer";
  6: import { FileData, FileTreeMode, SortOrder, SidebarProps } from "./types/FileTypes";
  7: import { ThemeProvider } from "./context/ThemeContext";
  8: import ThemeToggle from "./components/ThemeToggle";
  9: import { generateAsciiFileTree, normalizePath, arePathsEqual } from "./utils/pathUtils";
 10: import { Github, Loader2, Check, AlertTriangle } from "lucide-react";
 11: import styles from "./App.module.css";
 12: import { Dropdown } from "./components/ui";
 13: import { ConfirmationDialog } from "./components/ui/ConfirmationDialog";
 14: import { Button } from "./components/ui/Button";
 15: import { getSortIcon } from "./utils/sortIcons";
 16: // Import utilities from patternUtils
 17: import { SYSTEM_PATTERN_CATEGORIES, parseIgnorePatternsContent } from "./utils/patternUtils";
 18: 
 19: // Access the electron API from the window object
 20: declare global {
 21:   interface Window {
 22:     electron: {
 23:       ipcRenderer: {
 24:         send: (channel: string, data?: any) => void;
 25:         on: (channel: string, func: (...args: any[]) => void) => void;
 26:         removeListener: (
 27:           channel: string,
 28:           func: (...args: any[]) => void
 29:         ) => void;
 30:         invoke: (channel: string, data?: any) => Promise<any>;
 31:         setMaxListeners?: (n: number) => void;
 32:       };
 33:     };
 34:   }
 35: }
 36: 
 37: // Keys for localStorage
 38: const STORAGE_KEYS = {
 39:   SELECTED_FOLDER: "pastemax-selected-folder",
 40:   SELECTED_FILES: "pastemax-selected-files",
 41:   SORT_ORDER: "pastemax-sort-order",
 42:   SEARCH_TERM: "pastemax-search-term",
 43:   EXPANDED_NODES: "pastemax-expanded-nodes",
 44:   GLOBAL_IGNORE_PATTERNS: "pastemax-global-ignore-patterns-v2", // Added version suffix
 45: };
 46: 
 47: // Default system patterns as fallback if not provided by main process
 48: const DEFAULT_SYSTEM_PATTERNS = [
 49:   // Combine categories into one list for default state
 50:   ...SYSTEM_PATTERN_CATEGORIES.versionControl,
 51:   ...SYSTEM_PATTERN_CATEGORIES.buildOutput,
 52:   ...SYSTEM_PATTERN_CATEGORIES.caches,
 53:   ...SYSTEM_PATTERN_CATEGORIES.logs,
 54:   ...SYSTEM_PATTERN_CATEGORIES.ide,
 55:   ...SYSTEM_PATTERN_CATEGORIES.temp,
 56:   ...SYSTEM_PATTERN_CATEGORIES.os,
 57:   // Other common defaults
 58:   "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.ico",
 59:   "**/*.webp", "**/*.svg", "**/*.pdf", "**/*.zip", "**/*.tar.gz",
 60:   "**/*.tgz", "**/*.rar", "**/*.7z", "**/*.mp4", "**/*.mov",
 61:   "**/*.avi", "**/*.mkv", "**/*.mp3", "**/*.wav", "**/*.flac",
 62:   "**/*.sqlite", "**/*.db", "**/*.sql",
 63:   "**/*.doc", "**/*.docx", "**/*.xls", "**/*.xlsx", "**/*.ppt", "**/*.pptx",
 64:   "**/*.iso", "**/*.bin", "**/*.exe", "**/*.dll", "**/*.so", "**/*.dylib",
 65:   "**/*.min.js", "**/*.min.css",
 66: ];
 67: 
 68: // Define IgnorePatternsState interface
 69: interface IgnorePatternsState {
 70:   patterns: string;
 71:   excludedSystemPatterns: string[];
 72: }
 73: 
 74: // Helper to load ignore state from localStorage
 75: const loadIgnoreStateFromStorage = (): IgnorePatternsState => {
 76:   const saved = localStorage.getItem(STORAGE_KEYS.GLOBAL_IGNORE_PATTERNS);
 77:   if (saved) {
 78:     try {
 79:       const parsed = JSON.parse(saved);
 80:       // Basic validation
 81:       if (typeof parsed.patterns === 'string' && Array.isArray(parsed.excludedSystemPatterns)) {
 82:         return parsed;
 83:       }
 84:     } catch (e) {
 85:       console.error("Failed to parse saved global ignore patterns:", e);
 86:     }
 87:   }
 88:   // Default state if nothing saved or parsing failed
 89:   return { patterns: '', excludedSystemPatterns: [] };
 90: };
 91: 
 92: // Update ExtendedSidebarProps interface
 93: interface ExtendedSidebarProps extends Omit<SidebarProps, 'allFiles'> {
 94:   allFiles: Omit<FileData, 'content'>[]; // Explicitly define with new type
 95:   reloadFolder: () => void;
 96:   clearSelection: () => void;
 97:   removeAllFolders: () => void;
 98:   loadIgnorePatterns: (folderPath: string, isGlobal?: boolean) => Promise<void>;
 99:   saveIgnorePatterns: (patterns: string, isGlobal: boolean, folderPath?: string) => Promise<void>;
100:   resetIgnorePatterns: (isGlobal: boolean, folderPath?: string) => Promise<void>;
101:   systemIgnorePatterns: string[];
102:   clearIgnorePatterns: (folderPath: string) => Promise<void>;
103:   onClearSelectionClick: () => void;
104:   onRemoveAllFoldersClick: () => void;
105:   onResetPatternsClick: (isGlobal: boolean, folderPath: string) => void;
106:   fileTreeSortOrder: SortOrder;
107:   onSortOrderChange: (order: SortOrder) => void;
108:   globalPatternsState: IgnorePatternsState;
109:   localPatternsState: IgnorePatternsState;
110:   onExcludedSystemPatternsChange: (patterns: string[]) => void;
111:   ignorePatterns: string;
112:   setIgnorePatterns: (patterns: string) => void;
113: }
114: 
115: const App = () => {
116:   // Load initial state from localStorage if available
117:   const savedFolder = localStorage.getItem(STORAGE_KEYS.SELECTED_FOLDER);
118:   const savedFiles = localStorage.getItem(STORAGE_KEYS.SELECTED_FILES);
119:   const savedSortOrder = localStorage.getItem(STORAGE_KEYS.SORT_ORDER);
120:   const savedSearchTerm = localStorage.getItem(STORAGE_KEYS.SEARCH_TERM);
121:   const savedExpandedNodes = localStorage.getItem(STORAGE_KEYS.EXPANDED_NODES);
122:   const savedShowInstructions = localStorage.getItem('pastemax-show-instructions');
123: 
124:   // State for user interface controls
125:   const [showUserInstructions, setShowUserInstructions] = useState(savedShowInstructions !== 'false');
126:   const [fileTreeMode, setFileTreeMode] = useState<FileTreeMode>('complete');
127: 
128:   // Initialize expanded nodes from localStorage if available
129:   const initialExpandedNodes = useMemo(() => {
130:     const map = new Map<string, boolean>();
131:     if (savedExpandedNodes) {
132:       try {
133:         const parsedNodes = JSON.parse(savedExpandedNodes);
134:         if (Array.isArray(parsedNodes)) {
135:           parsedNodes.forEach(([key, value]) => {
136:             if (typeof key === 'string' && typeof value === 'boolean') {
137:               map.set(key, value);
138:             }
139:           });
140:         }
141:       } catch (error) {
142:         console.error("Error parsing saved expanded nodes:", error);
143:       }
144:     }
145:     return map;
146:   }, [savedExpandedNodes]);
147: 
148:   const [selectedFolder, setSelectedFolder] = useState<string | null>(savedFolder);
149:   const [allFiles, setAllFiles] = useState<Omit<FileData, 'content'>[]>([]);
150:   const [selectedFiles, setSelectedFiles] = useState<string[]>(
151:     savedFiles ? JSON.parse(savedFiles) : []
152:   );
153:   const [sortOrder, setSortOrder] = useState<SortOrder>((savedSortOrder as SortOrder) || "tokens-descending");
154:   const [searchTerm, setSearchTerm] = useState(savedSearchTerm || "");
155:   const [expandedNodes, setExpandedNodes] = useState<Map<string, boolean>>(initialExpandedNodes);
156:   const [displayedFiles, setDisplayedFiles] = useState<Omit<FileData, 'content'>[]>([]);
157:   const [processingStatus, setProcessingStatus] = useState({
158:     status: "idle",
159:     message: "",
160:   } as {
161:     status: "idle" | "processing" | "complete" | "error";
162:     message: string;
163:   });
164: 
165:   const [userInstructions, setUserInstructions] = useState("");
166:   const [fileTreeSortOrder, setFileTreeSortOrder] = useState<SortOrder>("name-ascending");
167: 
168:   // Centralized state for ignore patterns
169:   const [globalIgnorePatterns, setGlobalPatterns] = useState<IgnorePatternsState>(loadIgnoreStateFromStorage);
170:   const [localIgnorePatterns, setLocalPatterns] = useState<IgnorePatternsState>({ patterns: '', excludedSystemPatterns: [] }); // Local doesn't have excluded system patterns
171:   const [systemIgnorePatterns, setSystemIgnorePatterns] = useState<string[]>(DEFAULT_SYSTEM_PATTERNS);
172: 
173:   const isElectron = window.electron !== undefined;
174: 
175:   // --- Persist State Effects ---
176:   useEffect(() => {
177:     if (selectedFolder) localStorage.setItem(STORAGE_KEYS.SELECTED_FOLDER, selectedFolder);
178:     else localStorage.removeItem(STORAGE_KEYS.SELECTED_FOLDER);
179:   }, [selectedFolder]);
180: 
181:   useEffect(() => {
182:     localStorage.setItem(STORAGE_KEYS.SELECTED_FILES, JSON.stringify(selectedFiles));
183:   }, [selectedFiles]);
184: 
185:   useEffect(() => {
186:     localStorage.setItem(STORAGE_KEYS.SORT_ORDER, sortOrder);
187:   }, [sortOrder]);
188: 
189:   useEffect(() => {
190:     localStorage.setItem(STORAGE_KEYS.SEARCH_TERM, searchTerm);
191:   }, [searchTerm]);
192: 
193:   useEffect(() => {
194:     try {
195:       localStorage.setItem(STORAGE_KEYS.EXPANDED_NODES, JSON.stringify(Array.from(expandedNodes.entries())));
196:     } catch (error) {
197:       console.error("Error saving expanded nodes:", error);
198:     }
199:   }, [expandedNodes]);
200: 
201:   useEffect(() => {
202:     localStorage.setItem('pastemax-show-instructions', String(showUserInstructions));
203:   }, [showUserInstructions]);
204: 
205:   // Persist global ignore patterns state
206:   useEffect(() => {
207:     localStorage.setItem(STORAGE_KEYS.GLOBAL_IGNORE_PATTERNS, JSON.stringify(globalIgnorePatterns));
208:   }, [globalIgnorePatterns]);
209: 
210:   // --- IPC Listeners ---
211: 
212:   // Load initial data from saved folder
213:   useEffect(() => {
214:     if (!isElectron || !selectedFolder) return;
215:     const hasLoadedInitialData = sessionStorage.getItem("hasLoadedInitialData");
216:     if (hasLoadedInitialData === "true") return;
217:     console.log("Loading saved folder on startup:", selectedFolder);
218:     setProcessingStatus({ status: "processing", message: "Loading files..." });
219:     window.electron.ipcRenderer.send("request-file-list", selectedFolder);
220:     sessionStorage.setItem("hasLoadedInitialData", "true");
221:   }, [isElectron, selectedFolder]); // Keep dependency
222: 
223:   // Listen for folder selection and file list data
224:   useEffect(() => {
225:     if (!isElectron) return;
226: 
227:     const handleFolderSelected = (folderPath: string) => {
228:       if (typeof folderPath === "string") {
229:         console.log("Folder selected:", folderPath);
230:         setSelectedFolder(folderPath);
231:         setSelectedFiles([]);
232:         setAllFiles([]); // Clear previous files immediately
233:         setDisplayedFiles([]);
234:         setLocalPatterns({ patterns: '', excludedSystemPatterns: [] }); // Reset local patterns
235:         setProcessingStatus({ status: "processing", message: "Requesting file list..." });
236:         window.electron.ipcRenderer.send("request-file-list", folderPath);
237:       } else {
238:         console.error("Invalid folder path received:", folderPath);
239:         setProcessingStatus({ status: "error", message: "Invalid folder path" });
240:       }
241:     };
242: 
243:     // Updated to handle metadata only
244:     const handleFileListData = (filesMetadata: Omit<FileData, 'content'>[]) => {
245:       console.log("Received file list metadata:", filesMetadata.length, "files");
246:       if (filesMetadata.length === 1 && filesMetadata[0].isAppDirectory) {
247:         console.log("Detected app directory selection");
248:         setAllFiles([]); setSelectedFiles([]); setDisplayedFiles([]);
249:         setProcessingStatus({ status: "error", message: "Cannot select the application directory" });
250:         return;
251:       }
252: 
253:       // Store only metadata, content will be fetched on demand
254:       setAllFiles(filesMetadata);
255:       setProcessingStatus({ status: "complete", message: `Loaded ${filesMetadata.length} files` });
256: 
257:       applyFiltersAndSort(filesMetadata, sortOrder, searchTerm); // Apply filters/sort to metadata
258: 
259:       // Auto-select non-binary/non-skipped files
260:       const selectablePaths = filesMetadata
261:         .filter(file => !file.isBinary && !file.isSkipped && !file.excluded)
262:         .map(file => file.path);
263:       setSelectedFiles(selectablePaths);
264:     };
265: 
266:     const handleProcessingStatus = (status: { status: "idle" | "processing" | "complete" | "error"; message: string; }) => {
267:       console.log("Processing status:", status);
268:       setProcessingStatus(status);
269:     };
270: 
271:     window.electron.ipcRenderer.on("folder-selected", handleFolderSelected);
272:     window.electron.ipcRenderer.on("file-list-data", handleFileListData);
273:     window.electron.ipcRenderer.on("file-processing-status", handleProcessingStatus);
274: 
275:     // Listener for loaded ignore patterns (both global and local)
276:     const handleIgnorePatternsLoaded = (result: { patterns: string; isGlobal: boolean; systemPatterns?: string[]; folderPath?: string }) => {
277:         console.log(`IPC: Received ${result.isGlobal ? 'global' : 'local'} patterns loaded event.`);
278:         const { excludedSystemPatterns: parsedExcluded, userPatterns } = parseIgnorePatternsContent(result.patterns || '');
279: 
280:         if (result.isGlobal) {
281:             setGlobalPatterns({ patterns: userPatterns, excludedSystemPatterns: parsedExcluded });
282:             if (result.systemPatterns) {
283:                 setSystemIgnorePatterns(result.systemPatterns);
284:             }
285:             console.log(`Updated global state: ${userPatterns.split('\n').length} patterns, ${parsedExcluded.length} excluded system.`);
286:         } else if (result.folderPath === selectedFolder) { // Ensure it's for the current folder
287:             setLocalPatterns({ patterns: userPatterns, excludedSystemPatterns: [] }); // Local patterns don't manage system excludes
288:             console.log(`Updated local state for ${result.folderPath}: ${userPatterns.split('\n').length} patterns.`);
289:         }
290:     };
291:     window.electron.ipcRenderer.on("ignore-patterns-loaded", handleIgnorePatternsLoaded);
292: 
293:     return () => {
294:       window.electron.ipcRenderer.removeListener("folder-selected", handleFolderSelected);
295:       window.electron.ipcRenderer.removeListener("file-list-data", handleFileListData);
296:       window.electron.ipcRenderer.removeListener("file-processing-status", handleProcessingStatus);
297:       window.electron.ipcRenderer.removeListener("ignore-patterns-loaded", handleIgnorePatternsLoaded);
298:     };
299:   }, [isElectron, sortOrder, searchTerm, selectedFolder]); // Added selectedFolder dependency for local pattern updates
300: 
301:   // Add ESC key handler
302:   useEffect(() => {
303:     const handleEscKey = (e: KeyboardEvent) => {
304:       if (e.key === "Escape" && processingStatus.status === "processing") {
305:         console.log("ESC pressed - cancelling directory loading");
306:         window.electron.ipcRenderer.send("cancel-directory-loading");
307:       }
308:     };
309:     if (processingStatus.status === "processing") {
310:       window.addEventListener("keydown", handleEscKey);
311:       return () => window.removeEventListener("keydown", handleEscKey);
312:     }
313:   }, [processingStatus.status]);
314: 
315:   // --- Core Functions ---
316: 
317:   const openFolder = () => {
318:     if (isElectron) {
319:       console.log("Opening folder dialog");
320:       setProcessingStatus({ status: "idle", message: "Select a folder..." });
321:       window.electron.ipcRenderer.send("open-folder");
322:     } else {
323:       console.warn("Folder selection not available in browser");
324:     }
325:   };
326: 
327:   // Status message renderer
328:   const renderStatusMessage = () => {
329:     if (!processingStatus || processingStatus.status === 'idle') {
330:       return null;
331:     }
332: 
333:     let statusClass = styles.statusMessage; // Assuming this base class exists
334:     let statusIcon = null;
335:     let statusText = '';
336: 
337:     // Define styles for different statuses if they don't exist in CSS modules
338:     const statusStyles: { [key: string]: React.CSSProperties } = {
339:         processing: { backgroundColor: 'lightblue', color: 'black', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center' },
340:         complete: { backgroundColor: 'lightgreen', color: 'black', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center' },
341:         error: { backgroundColor: 'lightcoral', color: 'black', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center' },
342:         idle: { display: 'none' }
343:     };
344: 
345: 
346:     switch (processingStatus.status) {
347:       case 'processing':
348:         statusClass += ` ${styles.processing}`; // Use CSS module if available
349:         statusIcon = <Loader2 size={16} className="animate-spin" />;
350:         statusText = processingStatus.message || 'Processing...';
351:         break;
352:       case 'complete':
353:         statusClass += ` ${styles.complete}`; // Use CSS module if available
354:         statusIcon = <Check size={16} />;
355:         statusText = processingStatus.message || 'Complete';
356:         // Optional: Hide success message after a delay
357:         setTimeout(() => setProcessingStatus({ status: 'idle', message: '' }), 3000);
358:         break;
359:       case 'error':
360:         statusClass += ` ${styles.error}`; // Use CSS module if available
361:         statusIcon = <AlertTriangle size={16} />;
362:         statusText = processingStatus.message || 'Error';
363:         break;
364:       default:
365:         return null; // Don't render for idle
366:     }
367: 
368:     // Use inline styles as fallback if CSS Modules aren't defined for these
369:     const currentStyle = statusStyles[processingStatus.status] || {};
370: 
371:     return (
372:       <div style={currentStyle} className={statusClass}>
373:         {statusIcon && <span style={{ marginRight: '8px' }}>{statusIcon}</span>}
374:         {statusText}
375:       </div>
376:     );
377:   };
378: 
379:   // Apply filters and sorting (Lint fixes applied)
380:   const applyFiltersAndSort = useCallback((files: Omit<FileData, 'content'>[], sort: SortOrder, filter: string) => {
381:     let filtered = files;
382:     if (filter) {
383:       const lowerFilter = filter.toLowerCase();
384:       filtered = files.filter(file =>
385:         file.name.toLowerCase().includes(lowerFilter) ||
386:         file.path.toLowerCase().includes(lowerFilter)
387:       );
388:     }
389: 
390:     const [sortKey, sortDir] = sort.split("-");
391: 
392:     const sorted = [...filtered].sort((a, b) => {
393:       let comparison = 0;
394:       // Moved declarations outside switch
395:       const aTokens = typeof a.tokenCount === 'number' ? a.tokenCount : 0;
396:       const bTokens = typeof b.tokenCount === 'number' ? b.tokenCount : 0;
397:       const aDate = a.lastModified || 0;
398:       const bDate = b.lastModified || 0;
399: 
400:       switch (sortKey) {
401:         case "name":
402:           comparison = a.name.localeCompare(b.name);
403:           break;
404:         case "tokens":
405:           comparison = aTokens - bTokens;
406:           break;
407:         case "date":
408:           comparison = aDate - bDate;
409:           break;
410:         default:
411:           comparison = a.name.localeCompare(b.name);
412:       }
413:       return sortDir === "ascending" ? comparison : -comparison;
414:     });
415: 
416:     setDisplayedFiles(sorted);
417:   }, []); // Add empty dependency array as it doesn't depend on component state/props
418: 
419:   // Re-run applyFiltersAndSort when relevant state changes
420:   useEffect(() => {
421:     applyFiltersAndSort(allFiles, sortOrder, searchTerm);
422:   }, [allFiles, sortOrder, searchTerm, applyFiltersAndSort]);
423: 
424:   // Toggle file selection
425:   const toggleFileSelection = useCallback((filePath: string) => {
426:     const normalizedPath = normalizePath(filePath);
427:     setSelectedFiles(prevSelected => {
428:       const isSelected = prevSelected.some(path => arePathsEqual(path, normalizedPath));
429:       return isSelected
430:         ? prevSelected.filter(path => !arePathsEqual(path, normalizedPath))
431:         : [...prevSelected, normalizedPath];
432:     });
433:   }, []); // Add empty dependency array
434: 
435:   // Select all non-excluded files
436:   const selectAllFiles = useCallback(() => {
437:     const filesToSelect = allFiles
438:       .filter(file => !file.isBinary && !file.isSkipped && !file.excluded)
439:       .map(file => file.path);
440:     setSelectedFiles(filesToSelect); // Directly set, no need to merge if it's 'select all'
441:   }, [allFiles]);
442: 
443:   // Deselect all files
444:   const deselectAllFiles = useCallback(() => {
445:     setSelectedFiles([]);
446:   }, []);
447: 
448:   // Toggle folder selection
449:   const toggleFolderSelection = useCallback((folderPath: string, shouldBeSelected: boolean) => {
450:     if (!folderPath) return;
451:     const normalizedFolderPath = normalizePath(folderPath);
452: 
453:     setSelectedFiles(prev => {
454:       const newSelectionSet = new Set(prev);
455:       allFiles.forEach(file => {
456:         const normalizedFilePath = normalizePath(file.path);
457:         // Check if file is within the target folder (or is the folder itself if files represent folders)
458:         if (normalizedFilePath.startsWith(normalizedFolderPath + '/') || normalizedFilePath === normalizedFolderPath) {
459:            // Only modify selection for non-binary, non-skipped, non-excluded files
460:            if (!file.isBinary && !file.isSkipped && !file.excluded) {
461:                 if (shouldBeSelected) {
462:                     newSelectionSet.add(file.path);
463:                 } else {
464:                     newSelectionSet.delete(file.path);
465:                 }
466:            }
467:         }
468:       });
469:       return Array.from(newSelectionSet);
470:     });
471:   }, [allFiles]); // Depends on allFiles
472: 
473:   // Handle sort change
474:   const handleSortChange = useCallback((value: string | string[]) => {
475:     if (typeof value === 'string') {
476:       setSortOrder(value as SortOrder);
477:       // applyFiltersAndSort will be triggered by the useEffect watching sortOrder
478:     }
479:   }, []); // Add empty dependency array
480: 
481:   // Handle search change
482:   const handleSearchChange = useCallback((newSearch: string) => {
483:     setSearchTerm(newSearch);
484:      // applyFiltersAndSort will be triggered by the useEffect watching searchTerm
485:   }, []); // Add empty dependency array
486: 
487:   // Calculate total tokens (Memoized)
488:   const totalTokens = useMemo(() => { // Renamed to avoid conflict
489:     const fileMap = new Map(allFiles.map(f => [f.path, f.tokenCount]));
490:     return selectedFiles.reduce((total, path) => {
491:       return total + (fileMap.get(path) || 0);
492:     }, 0);
493:   }, [selectedFiles, allFiles]);
494: 
495:   // --- Moved reloadFolder definition earlier ---
496:   const reloadFolder = useCallback(() => {
497:     if (isElectron && selectedFolder) {
498:       console.log(`Reloading folder: ${selectedFolder}`);
499:       setProcessingStatus({ status: "processing", message: "Reloading files..." });
500:       setAllFiles([]); // Clear current files
501:       setDisplayedFiles([]);
502:       // Optionally reset local patterns state if desired on manual reload
503:       // setLocalPatterns({ patterns: '', excludedSystemPatterns: [] });
504:       window.electron.ipcRenderer.send("request-file-list", selectedFolder); // Re-request list
505:     }
506:   }, [isElectron, selectedFolder]); // Now defined before other callbacks
507: 
508:   // Get selected files content (Lazy loaded version)
509:   const getSelectedFilesContent = useCallback(async (): Promise<string> => {
510:     if (selectedFiles.length === 0) return "No files selected.";
511: 
512:     setProcessingStatus({ status: 'processing', message: `Fetching content for ${selectedFiles.length} files...` });
513: 
514:     try {
515:       // Fetch content for all selected files concurrently
516:       const contentPromises = selectedFiles.map(async (filePath) => {
517:         try {
518:           const result = await window.electron.ipcRenderer.invoke('get-file-content', filePath);
519:           // Find the metadata for sorting/header info
520:           const fileMeta = allFiles.find(f => f.path === filePath);
521:           return {
522:               path: filePath,
523:               content: result.content,
524:               tokenCount: result.tokenCount, // Assuming token count is returned by handler
525:               name: fileMeta?.name || filePath, // Fallback name
526:               lastModified: fileMeta?.lastModified || 0, // For sorting
527:           };
528:         } catch (fetchError: unknown) {
529:             const errorMessage = fetchError instanceof Error ? fetchError.message : 'Unknown error';
530:             console.error(`Failed to fetch content for ${filePath}:`, fetchError);
531:             return { path: filePath, content: `// Error loading file: ${errorMessage}`, tokenCount: 0, name: filePath, lastModified: 0 }; // Placeholder on error
532:         }
533:       });
534: 
535:       const filesWithContent = await Promise.all(contentPromises);
536: 
537:       // Sort the fetched files based on the current sortOrder
538:       const [sortKey, sortDir] = sortOrder.split("-");
539:       const sortedFiles = filesWithContent.sort((a, b) => {
540:           let comparison = 0;
541:           const aTokens = a.tokenCount || 0;
542:           const bTokens = b.tokenCount || 0;
543:           const aDate = a.lastModified || 0;
544:           const bDate = b.lastModified || 0;
545: 
546:           switch (sortKey) {
547:             case "name": comparison = a.name.localeCompare(b.name); break;
548:             case "tokens": comparison = aTokens - bTokens; break;
549:             case "date": comparison = aDate - bDate; break;
550:             default: comparison = a.name.localeCompare(b.name);
551:           }
552:           return sortDir === "ascending" ? comparison : -comparison;
553:       });
554: 
555:       // --- Concatenate content (similar to previous logic) ---
556:       let concatenatedString = "";
557:       if (fileTreeMode !== "none" && selectedFolder) {
558:           // Generate tree based on *all* files metadata for context if needed by mode
559:           const filesForTree = fileTreeMode === "complete" ? allFiles : sortedFiles;
560:           const asciiTree = generateAsciiFileTree(filesForTree, selectedFolder, fileTreeMode);
561:           concatenatedString += `<file_map>\n${selectedFolder}\n${asciiTree}\n</file_map>\n\n`;
562:       }
563: 
564:       sortedFiles.forEach(file => {
565:         let relativePath = file.path;
566:         if (selectedFolder && file.path.startsWith(selectedFolder)) {
567:           relativePath = file.path.substring(selectedFolder.length).replace(/^[/\\]/, '');
568:         }
569:         concatenatedString += `\n\n// ---- File: ${relativePath} (${file.tokenCount || 'N/A'} tokens) ----\n\n`;
570:         concatenatedString += file.content;
571:       });
572: 
573:       const userInstructionsBlock = userInstructions.trim()
574:         ? `\n<user_instructions>\n${userInstructions}\n</user_instructions>\n\n`
575:         : "";
576: 
577:       setProcessingStatus({ status: 'complete', message: 'Content prepared.' });
578:       return concatenatedString + userInstructionsBlock;
579: 
580:     } catch (error: unknown) {
581:       const errorMessage = error instanceof Error ? error.message : 'Unknown error';
582:       console.error("Error getting selected files content:", error);
583:       setProcessingStatus({ status: 'error', message: 'Failed to prepare content.' });
584:       return `Error preparing content: ${errorMessage}`;
585:     }
586:   }, [selectedFiles, allFiles, sortOrder, fileTreeMode, selectedFolder, userInstructions]);
587: 
588:   // Sort options
589:   const sortOptions = useMemo(() => [
590:     { value: "name-ascending", label: "Name (A-Z)" },
591:     { value: "name-descending", label: "Name (Z-A)" },
592:     { value: "tokens-ascending", label: "Tokens (Asc)" },
593:     { value: "tokens-descending", label: "Tokens (Desc)" },
594:     { value: "date-ascending", label: "Date (Oldest)" },
595:     { value: "date-descending", label: "Date (Newest)" }
596:   ], []);
597: 
598:   // Handle expand/collapse state changes
599:   const toggleExpanded = useCallback((nodeId: string) => {
600:     setExpandedNodes(prev => {
601:       const newState = new Map(prev);
602:       newState.set(nodeId, !prev.get(nodeId)); // Simplified toggle
603:       // Persisted via useEffect watching expandedNodes
604:       return newState;
605:     });
606:   }, []); // Add empty dependency array
607: 
608:   // --- Ignore Pattern Functions ---
609: 
610:   // Load patterns (global or local)
611:   const loadIgnorePatterns = useCallback(async (folderPath: string, isGlobal: boolean = false): Promise<void> => {
612:     if (!isElectron) return;
613:     console.log(`Requesting load for ${isGlobal ? 'global' : 'local'} patterns${!isGlobal ? ` for ${folderPath}` : ''}`);
614:     try {
615:         // Invoke expects the handler to exist. The result is handled by the 'ignore-patterns-loaded' listener.
616:         await window.electron.ipcRenderer.invoke("load-ignore-patterns", { folderPath, isGlobal });
617:     } catch (error: unknown) {
618:         const errorMessage = error instanceof Error ? error.message : 'Unknown error';
619:         console.error(`Error invoking load-ignore-patterns (${isGlobal ? 'global' : 'local'}):`, error);
620:         // Set default state on error
621:         if (isGlobal) {
622:             setGlobalPatterns({ patterns: '', excludedSystemPatterns: [] });
623:             setSystemIgnorePatterns(DEFAULT_SYSTEM_PATTERNS);
624:         } else if (folderPath === selectedFolder) {
625:             setLocalPatterns({ patterns: '', excludedSystemPatterns: [] });
626:         }
627:     }
628: }, [isElectron, selectedFolder]); // Dependencies: isElectron, selectedFolder
629: 
630:   // Save patterns (global or local) - Now just calls IPC
631:   const saveIgnorePatterns = useCallback(async (patterns: string, isGlobal: boolean, folderPath?: string): Promise<void> => {
632:     if (!isElectron) return;
633:     const targetPath = folderPath || selectedFolder; // Use provided path or current folder for local
634:     if (!isGlobal && !targetPath) {
635:       console.error("Cannot save local patterns without a folder path.");
636:       setProcessingStatus({ status: "error", message: "No folder selected for local patterns." });
637:       return;
638:     }
639: 
640:     setProcessingStatus({ status: "processing", message: `Saving ${isGlobal ? "global" : "local"} patterns...` });
641: 
642:     try {
643:       // The string passed (`patterns`) should already include `# DISABLED:` comments
644:       // generated by IgnorePatterns.tsx's handleSaveGlobalPatterns
645:       const result = await window.electron.ipcRenderer.invoke("save-ignore-patterns", {
646:         patterns,
647:         isGlobal,
648:         folderPath: targetPath
649:       });
650: 
651:       if (result.success) {
652:         console.log(`IPC: Save ${isGlobal ? 'global' : 'local'} patterns successful.`);
653:         setProcessingStatus({ status: "complete", message: "Patterns saved." });
654: 
655:         // Reload the folder data to apply new patterns
656:         // Add a small delay to ensure file system changes are registered
657:         setTimeout(() => {
658:             reloadFolder();
659:         }, 300);
660: 
661:       } else {
662:         console.error(`IPC: Save ${isGlobal ? 'global' : 'local'} patterns failed:`, result.error);
663:         setProcessingStatus({ status: "error", message: `Save failed: ${result.error}` });
664:       }
665:     } catch (error: unknown) {
666:       const errorMessage = error instanceof Error ? error.message : 'Unknown error';
667:       console.error("Error invoking save-ignore-patterns:", error);
668:       setProcessingStatus({ status: "error", message: `Save failed: ${errorMessage}` });
669:     }
670:   }, [isElectron, selectedFolder, reloadFolder]); // Dependency: reloadFolder
671: 
672:   // Reset patterns (global or local)
673:   const resetIgnorePatterns = useCallback(async (isGlobal: boolean, folderPath?: string): Promise<void> => {
674:     if (!isElectron) return;
675:     const targetPath = folderPath || selectedFolder;
676:     if (!isGlobal && !targetPath) {
677:       console.error("Cannot reset local patterns without a folder path.");
678:       setProcessingStatus({ status: "error", message: "No folder selected for local reset." });
679:       return;
680:     }
681: 
682:     setProcessingStatus({ status: "processing", message: `Resetting ${isGlobal ? "global" : "local"} patterns...` });
683: 
684:     try {
685:       const result = await window.electron.ipcRenderer.invoke("reset-ignore-patterns", {
686:         isGlobal,
687:         folderPath: targetPath
688:       });
689: 
690:       if (result.success) {
691:         console.log(`IPC: Reset ${isGlobal ? 'global' : 'local'} patterns successful.`);
692:         // Update state *after* success
693:         if (isGlobal) {
694:           setGlobalPatterns({ patterns: '', excludedSystemPatterns: [] }); // Reset global state
695:         } else {
696:           setLocalPatterns({ patterns: '', excludedSystemPatterns: [] }); // Reset local state
697:         }
698:         setProcessingStatus({ status: "complete", message: "Patterns reset to default." });
699:         // Reload folder data
700:         setTimeout(() => {
701:             reloadFolder();
702:         }, 300);
703:       } else {
704:         console.error(`IPC: Reset ${isGlobal ? 'global' : 'local'} patterns failed:`, result.error);
705:         setProcessingStatus({ status: "error", message: `Reset failed: ${result.error}` });
706:       }
707:     } catch (error: unknown) {
708:       const errorMessage = error instanceof Error ? error.message : 'Unknown error';
709:       console.error("Error invoking reset-ignore-patterns:", error);
710:       setProcessingStatus({ status: "error", message: `Reset failed: ${errorMessage}` });
711:     }
712:   }, [isElectron, selectedFolder, reloadFolder]); // Dependency: reloadFolder
713: 
714:   // Clear local patterns
715:   const clearLocalIgnorePatterns = useCallback(async (folderPath: string): Promise<void> => {
716:     if (!isElectron || !folderPath) return;
717: 
718:     setProcessingStatus({ status: "processing", message: "Clearing local patterns..." });
719: 
720:     try {
721:       const result = await window.electron.ipcRenderer.invoke("clear-local-ignore-patterns", { folderPath });
722: 
723:       if (result.success) {
724:         console.log(`IPC: Clear local patterns successful for ${folderPath}.`);
725:         // Update state *after* success
726:         if (folderPath === selectedFolder) {
727:           setLocalPatterns({ patterns: '', excludedSystemPatterns: [] });
728:         }
729:         setProcessingStatus({ status: "complete", message: "Local patterns cleared." });
730:         // Reload folder data
731:         setTimeout(() => {
732:             reloadFolder();
733:         }, 300);
734:       } else {
735:         console.error(`IPC: Clear local patterns failed for ${folderPath}:`, result.error);
736:         setProcessingStatus({ status: "error", message: `Clear failed: ${result.error}` });
737:       }
738:     } catch (error: unknown) {
739:       const errorMessage = error instanceof Error ? error.message : 'Unknown error';
740:       console.error("Error invoking clear-local-ignore-patterns:", error);
741:       setProcessingStatus({ status: "error", message: `Clear failed: ${errorMessage}` });
742:     }
743:   }, [isElectron, selectedFolder, reloadFolder]); // Dependency: reloadFolder
744: 
745: 
746:   // --- Dialog State & Handlers ---
747:   const [showClearSelectionDialog, setShowClearSelectionDialog] = useState(false);
748:   const [showRemoveAllFoldersDialog, setShowRemoveAllFoldersDialog] = useState(false);
749:   const [showResetPatternsDialog, setShowResetPatternsDialog] = useState(false);
750:   const [resetPatternsContext, setResetPatternsContext] = useState<{isGlobal: boolean; folderPath: string} | null>(null);
751: 
752:   const handleClearSelectionClick = useCallback(() => setShowClearSelectionDialog(true), []);
753:   const clearSelection = useCallback(() => { setSelectedFiles([]); setShowClearSelectionDialog(false); }, []);
754:   const handleRemoveAllFoldersClick = useCallback(() => setShowRemoveAllFoldersDialog(true), []);
755:   const removeAllFolders = useCallback(() => {
756:     setSelectedFolder(null); setAllFiles([]); setSelectedFiles([]); setDisplayedFiles([]);
757:     setLocalPatterns({ patterns: '', excludedSystemPatterns: [] }); // Reset local patterns
758:     localStorage.removeItem(STORAGE_KEYS.SELECTED_FOLDER);
759:     localStorage.removeItem(STORAGE_KEYS.SELECTED_FILES);
760:     localStorage.removeItem(STORAGE_KEYS.EXPANDED_NODES); // Also clear expanded nodes
761:     setExpandedNodes(new Map()); // Reset map in state
762:     sessionStorage.removeItem("hasLoadedInitialData");
763:     setShowRemoveAllFoldersDialog(false);
764:   }, []);
765: 
766:   const handleResetPatternsClick = useCallback((isGlobal: boolean, folderPath: string) => {
767:     setResetPatternsContext({ isGlobal, folderPath });
768:     setShowResetPatternsDialog(true);
769:   }, []);
770: 
771:   const confirmResetPatterns = useCallback(() => {
772:     if (resetPatternsContext) {
773:       resetIgnorePatterns(resetPatternsContext.isGlobal, resetPatternsContext.folderPath);
774:     }
775:     setShowResetPatternsDialog(false);
776:     setResetPatternsContext(null);
777:   }, [resetPatternsContext, resetIgnorePatterns]);
778: 
779:   // --- Helper Functions ---
780:   const truncatePath = (path: string | null): string => {
781:     if (!path) return "No folder selected";
782:     const parts = path.split(/[/\\]/); // Handle both slash types
783:     if (parts.length <= 3) return path;
784:     const lastParts = parts.filter(p => p).slice(-2);
785:     return `.../${lastParts.join('/')}`;
786:   };
787: 
788:   // Callback for IgnorePatterns component to update global excluded patterns
789:   const handleExcludedSystemPatternsChange = useCallback((newExcluded: string[]) => {
790:     setGlobalPatterns(prev => ({
791:         ...prev,
792:         excludedSystemPatterns: newExcluded
793:     }));
794:   }, []);
795: 
796:   // --- Render ---
797:   return (
798:     <ThemeProvider>
799:       <div className={styles.appContainer}>
800:         <header className={styles.appHeader}>
801:           <h1>PasteMax</h1>
802:           <div className={styles.headerActions}>
803:             {/* <a href="#" className={styles.headerLink}>Guide</a>
804:             <div className={styles.headerSeparator}></div> */}
805:             <ThemeToggle />
806:             <div className={styles.headerSeparator}></div>
807:             <a href="https://github.com/jsulpis/pastemax" target="_blank" rel="noopener noreferrer" className={styles.githubButton}>
808:               <Github size={16} />
809:             </a>
810:           </div>
811:         </header>
812: 
813:         {renderStatusMessage()}
814: 
815:         <div className={styles.mainContainer}>
816:           <Sidebar
817:             selectedFolder={selectedFolder}
818:             openFolder={openFolder}
819:             allFiles={allFiles}
820:             selectedFiles={selectedFiles}
821:             toggleFileSelection={toggleFileSelection}
822:             toggleFolderSelection={toggleFolderSelection}
823:             searchTerm={searchTerm}
824:             onSearchChange={handleSearchChange}
825:             selectAllFiles={selectAllFiles}
826:             deselectAllFiles={deselectAllFiles}
827:             expandedNodes={expandedNodes}
828:             toggleExpanded={toggleExpanded}
829:             reloadFolder={reloadFolder}
830:             clearSelection={clearSelection}
831:             removeAllFolders={removeAllFolders}
832:             loadIgnorePatterns={loadIgnorePatterns}
833:             saveIgnorePatterns={saveIgnorePatterns}
834:             resetIgnorePatterns={resetIgnorePatterns}
835:             systemIgnorePatterns={systemIgnorePatterns}
836:             clearIgnorePatterns={clearLocalIgnorePatterns}
837:             onClearSelectionClick={handleClearSelectionClick}
838:             onRemoveAllFoldersClick={handleRemoveAllFoldersClick}
839:             onResetPatternsClick={handleResetPatternsClick}
840:             fileTreeSortOrder={fileTreeSortOrder}
841:             onSortOrderChange={setFileTreeSortOrder}
842:             globalPatternsState={globalIgnorePatterns}
843:             localPatternsState={localIgnorePatterns}
844:             onExcludedSystemPatternsChange={handleExcludedSystemPatternsChange}
845:             ignorePatterns=""
846:             setIgnorePatterns={() => {}}
847:           />
848: 
849:           {selectedFolder ? (
850:             <div className={styles.contentArea}>
851:               <div className={styles.contentHeader}>
852:                 <h1 className={styles.contentTitle}>Files</h1>
853:                 <div className={styles.folderPathDisplay} title={selectedFolder}>{truncatePath(selectedFolder)}</div>
854:                 <div className={styles.contentActions}>
855:                   <Dropdown
856:                     options={sortOptions}
857:                     value={sortOrder}
858:                     onChange={handleSortChange}
859:                     trigger={
860:                       <Button variant="secondary" size="sm" startIcon={getSortIcon(sortOrder)}> Sort </Button>
861:                     }
862:                     // menuClassName={styles.sortDropdownMenu} // Ensure this CSS class exists or remove
863:                   />
864:                 </div>
865:                 <div className={styles.fileStats}>
866:                   {selectedFiles.length} files selected ({totalTokens.toLocaleString()} tokens)
867:                 </div>
868:               </div>
869: 
870:               <FileList
871:                 files={displayedFiles} // Pass metadata only
872:                 selectedFiles={selectedFiles}
873:                 toggleFileSelection={toggleFileSelection}
874:               />
875: 
876:               {showUserInstructions && (
877:                 <div className={styles.userInstructionsContainer}>
878:                   <UserInstructions instructions={userInstructions} setInstructions={setUserInstructions} />
879:                 </div>
880:               )}
881: 
882:               <ControlContainer
883:                 fileTreeMode={fileTreeMode}
884:                 setFileTreeMode={setFileTreeMode}
885:                 showUserInstructions={showUserInstructions}
886:                 setShowUserInstructions={setShowUserInstructions}
887:                 getSelectedFilesContent={getSelectedFilesContent} // Now async
888:                 selectedFilesCount={selectedFiles.length}
889:                 // Remove unused props passed to ControlContainer
890:               />
891:             </div>
892:           ) : (
893:             <div className={styles.contentArea}>
894:               <div className={styles.emptyStateContent}>
895:                 <h2>Welcome to PasteMax</h2>
896:                 <p>Select a folder to get started.</p>
897:                 <Button variant="primary" onClick={openFolder} className="mt-4"> Select Project Folder </Button>
898:               </div>
899:             </div>
900:           )}
901:         </div>
902: 
903:         {/* Confirmation Dialogs */}
904:         <ConfirmationDialog isOpen={showClearSelectionDialog} onClose={() => setShowClearSelectionDialog(false)} onConfirm={clearSelection} title="Clear Selection" description="Clear all selected files?" confirmLabel="Clear" variant="destructive" />
905:         <ConfirmationDialog isOpen={showRemoveAllFoldersDialog} onClose={() => setShowRemoveAllFoldersDialog(false)} onConfirm={removeAllFolders} title="Remove All Folders" description="Remove all folders and reset the application?" confirmLabel="Remove All" variant="destructive" />
906:         <ConfirmationDialog isOpen={showResetPatternsDialog} onClose={() => setShowResetPatternsDialog(false)} onConfirm={confirmResetPatterns} title={`Reset ${resetPatternsContext?.isGlobal ? 'Global' : 'Local'} Ignore Patterns`} description="Reset patterns to their default values?" confirmLabel="Reset" variant="destructive" />
907:       </div>
908:     </ThemeProvider>
909:   );
910: };
911: 
912: export default App;
```
