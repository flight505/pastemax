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
      DropdownMenu/
        context.tsx
        DropdownMenu.module.css
        DropdownMenu.tsx
        DropdownMenuContent.tsx
        DropdownMenuItem.tsx
        DropdownMenuSeparator.tsx
        DropdownMenuTrigger.tsx
        index.ts
        types.ts
      Input/
        index.ts
        Input.module.css
        Input.tsx
      StatusAlert/
        index.ts
        StatusAlert.module.css
        StatusAlert.tsx
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
    UserInstructionsWithTemplates.module.css
    UserInstructionsWithTemplates.tsx
  constants/
    outputFormats.ts
    promptTemplates.ts
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
    FileInfo.ts
    FileTypes.ts
    GlobalPatternsState.ts
    index.ts
    SortOrder.ts
  utils/
    cn.ts
    create-variants.ts
    formatters.ts
    pathUtils.ts
    patternUtils.ts
    sortIcons.tsx
  App.module.css
  App.tsx
  declarations.d.ts
  index.css
  main.tsx
  react-app-env.d.ts
```

# Files

## File: src/main.tsx
````typescript
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
````

## File: src/__tests__/setup.ts
````typescript
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
````

## File: src/components/ui/ButtonGroup/ButtonGroup.module.css
````css
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
````

## File: src/components/ui/ButtonGroup/ButtonGroup.tsx
````typescript
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
````

## File: src/components/ui/ButtonGroup/index.ts
````typescript
1: export { ButtonGroup } from './ButtonGroup';
````

## File: src/components/ui/Card/Card.tsx
````typescript
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
````

## File: src/components/ui/Card/index.ts
````typescript
1: export * from './Card';
````

## File: src/components/ui/Dropdown/index.ts
````typescript
1: export { Dropdown } from './Dropdown';
2: export type { DropdownOption, DropdownProps } from './Dropdown';
````

## File: src/components/ui/DropdownMenu/context.tsx
````typescript
 1: import React, { createContext, useContext, useReducer } from 'react';
 2: import { DropdownMenuState, DropdownMenuAction } from './types';
 3: 
 4: const initialState: DropdownMenuState = {
 5:   isOpen: false,
 6:   activeItemIndex: null,
 7:   triggerRect: null,
 8: };
 9: 
10: function dropdownMenuReducer(state: DropdownMenuState, action: DropdownMenuAction): DropdownMenuState {
11:   switch (action.type) {
12:     case 'OPEN':
13:       return { ...state, isOpen: true };
14:     case 'CLOSE':
15:       return { ...state, isOpen: false, activeItemIndex: null };
16:     case 'SET_TRIGGER_RECT':
17:       return { ...state, triggerRect: action.rect };
18:     case 'SET_ACTIVE_ITEM':
19:       return { ...state, activeItemIndex: action.index };
20:     default:
21:       return state;
22:   }
23: }
24: 
25: type DropdownMenuContextType = {
26:   state: DropdownMenuState;
27:   dispatch: React.Dispatch<DropdownMenuAction>;
28: };
29: 
30: const DropdownMenuContext = createContext<DropdownMenuContextType | undefined>(undefined);
31: 
32: export function DropdownMenuProvider({ children }: { children: React.ReactNode }) {
33:   const [state, dispatch] = useReducer(dropdownMenuReducer, initialState);
34: 
35:   return (
36:     <DropdownMenuContext.Provider value={{ state, dispatch }}>
37:       {children}
38:     </DropdownMenuContext.Provider>
39:   );
40: }
41: 
42: export function useDropdownMenu() {
43:   const context = useContext(DropdownMenuContext);
44:   if (!context) {
45:     throw new Error('useDropdownMenu must be used within a DropdownMenuProvider');
46:   }
47:   return context;
48: }
````

## File: src/components/ui/DropdownMenu/DropdownMenu.module.css
````css
  1: .dropdownMenu {
  2:   position: relative;
  3:   display: inline-block;
  4: }
  5: 
  6: .dropdownTrigger {
  7:   display: inline-flex;
  8:   align-items: center;
  9:   justify-content: center;
 10:   gap: 0.5rem;
 11:   padding: 0.5rem 1rem;
 12:   background-color: var(--surface-color);
 13:   border: 1px solid var(--border-color);
 14:   border-radius: 0.5rem;
 15:   color: var(--text-color);
 16:   font-size: 0.875rem;
 17:   font-weight: 500;
 18:   cursor: pointer;
 19:   transition: all 0.2s ease;
 20: }
 21: 
 22: .dropdownTrigger:hover {
 23:   background-color: var(--hover-color);
 24: }
 25: 
 26: .dropdownTrigger:focus {
 27:   outline: none;
 28:   box-shadow: 0 0 0 2px var(--focus-ring-color);
 29: }
 30: 
 31: .dropdownContent {
 32:   position: fixed;
 33:   min-width: 12rem;
 34:   padding: 0.5rem;
 35:   background-color: var(--surface-color);
 36:   border: 1px solid var(--border-color);
 37:   border-radius: 0.5rem;
 38:   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
 39:   z-index: 1000;
 40:   opacity: 0;
 41:   transform-origin: top;
 42:   animation: dropdownIn 0.2s ease forwards;
 43: }
 44: 
 45: .dropdownItem {
 46:   display: flex;
 47:   align-items: center;
 48:   gap: 0.5rem;
 49:   padding: 0.5rem 1rem;
 50:   color: var(--text-color);
 51:   font-size: 0.875rem;
 52:   cursor: pointer;
 53:   border-radius: 0.375rem;
 54:   transition: all 0.2s ease;
 55:   user-select: none;
 56: }
 57: 
 58: .dropdownItem:hover:not(.disabled) {
 59:   background-color: var(--hover-color);
 60: }
 61: 
 62: .dropdownItem:focus {
 63:   outline: none;
 64:   background-color: var(--hover-color);
 65: }
 66: 
 67: .dropdownItem.disabled {
 68:   opacity: 0.5;
 69:   cursor: not-allowed;
 70: }
 71: 
 72: .itemIcon {
 73:   display: flex;
 74:   align-items: center;
 75:   justify-content: center;
 76:   width: 1rem;
 77:   height: 1rem;
 78:   opacity: 0.6;
 79: }
 80: 
 81: @keyframes dropdownIn {
 82:   from {
 83:     opacity: 0;
 84:     transform: scale(0.95);
 85:   }
 86:   to {
 87:     opacity: 1;
 88:     transform: scale(1);
 89:   }
 90: }
 91: 
 92: /* Animation for closing */
 93: .dropdownContent[data-state="closed"] {
 94:   animation: dropdownOut 0.2s ease forwards;
 95: }
 96: 
 97: @keyframes dropdownOut {
 98:   from {
 99:     opacity: 1;
100:     transform: scale(1);
101:   }
102:   to {
103:     opacity: 0;
104:     transform: scale(0.95);
105:   }
106: }
````

## File: src/components/ui/DropdownMenu/DropdownMenuContent.tsx
````typescript
 1: import React, { useRef, useEffect } from 'react';
 2: import { DropdownMenuContentProps } from './types';
 3: import { useDropdownMenu } from './context';
 4: import { createPortal } from 'react-dom';
 5: import styles from './DropdownMenu.module.css';
 6: 
 7: export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({
 8:   children,
 9:   className,
10:   sideOffset = 4,
11:   align = 'start',
12:   side = 'bottom'
13: }) => {
14:   const contentRef = useRef<HTMLDivElement>(null);
15:   const { state, dispatch } = useDropdownMenu();
16: 
17:   useEffect(() => {
18:     const handleClickOutside = (event: MouseEvent) => {
19:       if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
20:         dispatch({ type: 'CLOSE' });
21:       }
22:     };
23: 
24:     const handleEscape = (event: KeyboardEvent) => {
25:       if (event.key === 'Escape') {
26:         dispatch({ type: 'CLOSE' });
27:       }
28:     };
29: 
30:     if (state.isOpen) {
31:       document.addEventListener('mousedown', handleClickOutside);
32:       document.addEventListener('keydown', handleEscape);
33:     }
34: 
35:     return () => {
36:       document.removeEventListener('mousedown', handleClickOutside);
37:       document.removeEventListener('keydown', handleEscape);
38:     };
39:   }, [state.isOpen, dispatch]);
40: 
41:   if (!state.isOpen || !state.triggerRect) return null;
42: 
43:   const getPosition = () => {
44:     if (!state.triggerRect || !contentRef.current) return {};
45:     
46:     const contentRect = contentRef.current.getBoundingClientRect();
47:     const { top, left, bottom, width } = state.triggerRect;
48:     
49:     let positionStyles: React.CSSProperties = {};
50:     
51:     switch (side) {
52:       case 'bottom':
53:         positionStyles.top = bottom + sideOffset;
54:         break;
55:       case 'top':
56:         positionStyles.bottom = window.innerHeight - top + sideOffset;
57:         break;
58:       case 'right':
59:         positionStyles.left = left + width + sideOffset;
60:         break;
61:       case 'left':
62:         positionStyles.right = window.innerWidth - left + sideOffset;
63:         break;
64:     }
65: 
66:     switch (align) {
67:       case 'start':
68:         positionStyles.left = left;
69:         break;
70:       case 'center':
71:         positionStyles.left = left + (width / 2) - (contentRect.width / 2);
72:         break;
73:       case 'end':
74:         positionStyles.left = left + width - contentRect.width;
75:         break;
76:     }
77: 
78:     return positionStyles;
79:   };
80: 
81:   return createPortal(
82:     <div
83:       ref={contentRef}
84:       className={`${styles.dropdownContent} ${className || ''}`}
85:       style={getPosition()}
86:       role="menu"
87:       aria-orientation="vertical"
88:     >
89:       {children}
90:     </div>,
91:     document.body
92:   );
93: };
````

## File: src/components/ui/DropdownMenu/DropdownMenuItem.tsx
````typescript
 1: import React from 'react';
 2: import { DropdownMenuItemProps } from './types';
 3: import { useDropdownMenu } from './context';
 4: import styles from './DropdownMenu.module.css';
 5: 
 6: export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
 7:   children,
 8:   className,
 9:   disabled,
10:   onSelect,
11:   icon
12: }) => {
13:   const { dispatch } = useDropdownMenu();
14: 
15:   const handleClick = () => {
16:     if (disabled) return;
17:     onSelect?.();
18:     dispatch({ type: 'CLOSE' });
19:   };
20: 
21:   const handleKeyDown = (e: React.KeyboardEvent) => {
22:     if (disabled) return;
23:     
24:     switch (e.key) {
25:       case 'Enter':
26:       case ' ':
27:         e.preventDefault();
28:         onSelect?.();
29:         dispatch({ type: 'CLOSE' });
30:         break;
31:     }
32:   };
33: 
34:   return (
35:     <div
36:       className={`${styles.dropdownItem} ${disabled ? styles.disabled : ''} ${className || ''}`}
37:       onClick={handleClick}
38:       onKeyDown={handleKeyDown}
39:       role="menuitem"
40:       tabIndex={disabled ? -1 : 0}
41:       aria-disabled={disabled}
42:     >
43:       {icon && <span className={styles.itemIcon}>{icon}</span>}
44:       {children}
45:     </div>
46:   );
47: };
````

## File: src/components/ui/DropdownMenu/DropdownMenuSeparator.tsx
````typescript
 1: import React from 'react';
 2: import { DropdownMenuSeparatorProps } from './types';
 3: import styles from './DropdownMenu.module.css';
 4: 
 5: export const DropdownMenuSeparator: React.FC<DropdownMenuSeparatorProps> = ({
 6:   className
 7: }) => {
 8:   return (
 9:     <div 
10:       className={`${styles.dropdownSeparator} ${className || ''}`}
11:       role="separator"
12:     />
13:   );
14: };
````

## File: src/components/ui/DropdownMenu/DropdownMenuTrigger.tsx
````typescript
 1: import React, { useRef, useEffect } from 'react';
 2: import { DropdownMenuTriggerProps } from './types';
 3: import { useDropdownMenu } from './context';
 4: import styles from './DropdownMenu.module.css';
 5: 
 6: export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({ 
 7:   children, 
 8:   className 
 9: }) => {
10:   const triggerRef = useRef<HTMLButtonElement>(null);
11:   const { state, dispatch } = useDropdownMenu();
12: 
13:   useEffect(() => {
14:     if (triggerRef.current) {
15:       dispatch({ 
16:         type: 'SET_TRIGGER_RECT', 
17:         rect: triggerRef.current.getBoundingClientRect() 
18:       });
19:     }
20:   }, [dispatch]);
21: 
22:   const handleClick = () => {
23:     if (state.isOpen) {
24:       dispatch({ type: 'CLOSE' });
25:     } else {
26:       dispatch({ type: 'OPEN' });
27:     }
28:   };
29: 
30:   const handleKeyDown = (e: React.KeyboardEvent) => {
31:     switch (e.key) {
32:       case 'Enter':
33:       case ' ':
34:         e.preventDefault();
35:         dispatch({ type: 'OPEN' });
36:         break;
37:       case 'Escape':
38:         e.preventDefault();
39:         dispatch({ type: 'CLOSE' });
40:         break;
41:     }
42:   };
43: 
44:   return (
45:     <button
46:       ref={triggerRef}
47:       className={`${styles.dropdownTrigger} ${className || ''}`}
48:       onClick={handleClick}
49:       onKeyDown={handleKeyDown}
50:       aria-haspopup="true"
51:       aria-expanded={state.isOpen}
52:       type="button"
53:     >
54:       {children}
55:     </button>
56:   );
57: };
````

## File: src/components/ui/DropdownMenu/types.ts
````typescript
 1: export interface DropdownMenuProps {
 2:   children: React.ReactNode;
 3:   className?: string;
 4: }
 5: 
 6: export interface DropdownMenuTriggerProps {
 7:   children: React.ReactNode;
 8:   className?: string;
 9: }
10: 
11: export interface DropdownMenuContentProps {
12:   children: React.ReactNode;
13:   className?: string;
14:   sideOffset?: number;
15:   align?: 'start' | 'center' | 'end';
16:   side?: 'top' | 'right' | 'bottom' | 'left';
17: }
18: 
19: export interface DropdownMenuItemProps {
20:   children: React.ReactNode;
21:   className?: string;
22:   disabled?: boolean;
23:   onSelect?: () => void;
24:   icon?: React.ReactNode;
25: }
26: 
27: export interface DropdownMenuSeparatorProps {
28:   className?: string;
29: }
30: 
31: export interface DropdownMenuGroupProps {
32:   children: React.ReactNode;
33:   className?: string;
34: }
35: 
36: export interface DropdownMenuLabelProps {
37:   children: React.ReactNode;
38:   className?: string;
39: }
40: 
41: export type DropdownMenuState = {
42:   isOpen: boolean;
43:   activeItemIndex: number | null;
44:   triggerRect: DOMRect | null;
45: };
46: 
47: export type DropdownMenuAction = 
48:   | { type: 'OPEN' }
49:   | { type: 'CLOSE' }
50:   | { type: 'SET_TRIGGER_RECT'; rect: DOMRect }
51:   | { type: 'SET_ACTIVE_ITEM'; index: number | null };
````

## File: src/components/ui/Input/index.ts
````typescript
1: export * from './Input';
````

## File: src/components/ui/StatusAlert/index.ts
````typescript
1: export { default as StatusAlert } from './StatusAlert';
2: export * from './StatusAlert';
````

## File: src/components/ui/Switch/index.ts
````typescript
1: export * from './Switch';
````

## File: src/components/ui/Switch/Switch.tsx
````typescript
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
````

## File: src/components/ErrorBoundary.tsx
````typescript
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
````

## File: src/components/Sidebar.module.css.d.ts
````typescript
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
````

## File: src/components/UserInstructionsWithTemplates.module.css
````css
 1: .container {
 2:   display: flex;
 3:   flex-direction: column;
 4:   gap: 1rem;
 5:   width: 100%;
 6:   height: 100%;
 7:   min-height: 200px;
 8: }
 9: 
10: .header {
11:   display: flex;
12:   justify-content: space-between;
13:   align-items: center;
14:   gap: 1rem;
15:   padding: 0.5rem 0;
16: }
17: 
18: .templateSelector {
19:   width: 300px;
20: }
21: 
22: .textareaContainer {
23:   flex: 1;
24:   min-height: 150px;
25:   position: relative;
26: }
27: 
28: .textarea {
29:   width: 100%;
30:   height: 100%;
31:   min-height: 150px;
32:   padding: 0.75rem;
33:   border: 1px solid var(--border-color);
34:   border-radius: 0.375rem;
35:   background-color: var(--input-bg);
36:   color: var(--text-color);
37:   font-family: var(--font-mono);
38:   font-size: 0.875rem;
39:   line-height: 1.5;
40:   resize: vertical;
41: }
42: 
43: .textarea:focus {
44:   outline: none;
45:   border-color: var(--primary-color);
46:   box-shadow: 0 0 0 2px var(--primary-color-alpha);
47: }
48: 
49: .templatePreview {
50:   padding: 1rem;
51:   border: 1px solid var(--border-color);
52:   border-radius: 0.375rem;
53:   background-color: var(--surface-color);
54:   margin-top: 1rem;
55: }
56: 
57: .templatePreview h4 {
58:   margin: 0 0 0.5rem 0;
59:   font-size: 1rem;
60:   font-weight: 600;
61:   color: var(--heading-color);
62: }
63: 
64: .templateDescription {
65:   margin: 0 0 1rem 0;
66:   font-size: 0.875rem;
67:   color: var(--text-color-secondary);
68: }
69: 
70: .templateContent {
71:   margin: 0;
72:   padding: 0.75rem;
73:   background-color: var(--code-bg);
74:   border-radius: 0.25rem;
75:   font-family: var(--font-mono);
76:   font-size: 0.875rem;
77:   line-height: 1.5;
78:   white-space: pre-wrap;
79:   color: var(--code-color);
80: }
81: 
82: .insertModeOptions {
83:   display: flex;
84:   gap: 0.5rem;
85:   justify-content: center;
86:   margin-top: 1rem;
87: }
88: 
89: /* Responsive adjustments */
90: @media (max-width: 640px) {
91:   .templateSelector {
92:     width: 100%;
93:   }
94:   
95:   .header {
96:     flex-direction: column;
97:     align-items: stretch;
98:   }
99: }
````

## File: src/components/UserInstructionsWithTemplates.tsx
````typescript
  1: import React, { useState, useCallback, useMemo } from 'react';
  2: import { Dropdown, DropdownOption } from './ui/Dropdown';
  3: import { ConfirmationDialog } from './ui/ConfirmationDialog';
  4: import { Button } from './ui/Button';
  5: import {
  6:   PromptTemplate,
  7:   PROMPT_TEMPLATES,
  8:   TEMPLATE_STORAGE_KEY,
  9:   TEMPLATE_INSERT_MODE_KEY,
 10:   TemplateInsertMode,
 11:   TemplateCategory
 12: } from '../constants/promptTemplates';
 13: import styles from './UserInstructionsWithTemplates.module.css';
 14: 
 15: interface UserInstructionsWithTemplatesProps {
 16:   instructions: string;
 17:   setInstructions: (value: string | ((prev: string) => string)) => void;
 18: }
 19: 
 20: interface TemplateOption extends Omit<DropdownOption, 'icon'> {
 21:   category: TemplateCategory;
 22:   icon?: string;
 23:   description?: string;
 24: }
 25: 
 26: interface GroupedOption {
 27:   label: string;
 28:   options: TemplateOption[];
 29: }
 30: 
 31: export const UserInstructionsWithTemplates: React.FC<UserInstructionsWithTemplatesProps> = ({
 32:   instructions,
 33:   setInstructions,
 34: }) => {
 35:   // State for selected template and preview
 36:   const [selectedTemplate, setSelectedTemplate] = useState<string | null>(() => {
 37:     return localStorage.getItem(TEMPLATE_STORAGE_KEY);
 38:   });
 39:   const [previewTemplate, setPreviewTemplate] = useState<PromptTemplate | null>(null);
 40:   
 41:   // State for confirmation dialog
 42:   const [showConfirmDialog, setShowConfirmDialog] = useState(false);
 43:   const [pendingTemplate, setPendingTemplate] = useState<PromptTemplate | null>(null);
 44:   
 45:   // State for insertion mode
 46:   const [insertMode, setInsertMode] = useState<TemplateInsertMode>(() => {
 47:     return (localStorage.getItem(TEMPLATE_INSERT_MODE_KEY) as TemplateInsertMode) || 'replace';
 48:   });
 49: 
 50:   // Group templates by category for the dropdown
 51:   const templateOptions = useMemo<GroupedOption[]>(() => {
 52:     const categories = PROMPT_TEMPLATES.reduce<Record<string, TemplateOption[]>>((acc, template) => {
 53:       if (!acc[template.category]) {
 54:         acc[template.category] = [];
 55:       }
 56:       acc[template.category].push({
 57:         value: template.id,
 58:         label: template.name,
 59:         description: template.description,
 60:         icon: template.icon,
 61:         category: template.category
 62:       });
 63:       return acc;
 64:     }, {});
 65: 
 66:     return Object.entries(categories).map(([category, templates]) => ({
 67:       label: category,
 68:       options: templates
 69:     }));
 70:   }, []);
 71: 
 72:   // Handle template selection
 73:   const handleTemplateSelect = useCallback((value: string | string[]) => {
 74:     if (typeof value !== 'string') return;
 75:     
 76:     const template = PROMPT_TEMPLATES.find(t => t.id === value);
 77:     if (!template) return;
 78:     
 79:     // Save last selected template
 80:     localStorage.setItem(TEMPLATE_STORAGE_KEY, value);
 81:     setSelectedTemplate(value);
 82:     
 83:     // If instructions are empty, directly insert
 84:     if (!instructions.trim()) {
 85:       setInstructions(template.content);
 86:       return;
 87:     }
 88:     
 89:     // Otherwise, show confirmation dialog
 90:     setPendingTemplate(template);
 91:     setShowConfirmDialog(true);
 92:   }, [instructions, setInstructions]);
 93: 
 94:   // Handle template insertion
 95:   const insertTemplate = useCallback((template: PromptTemplate, mode: TemplateInsertMode) => {
 96:     // Save insertion mode preference
 97:     localStorage.setItem(TEMPLATE_INSERT_MODE_KEY, mode);
 98:     setInsertMode(mode);
 99:     
100:     if (mode === 'replace') {
101:       setInstructions(template.content);
102:     } else {
103:       setInstructions((prev: string) => {
104:         if (prev.trim()) {
105:           return `${prev.trim()}\n\n${template.content}`;
106:         }
107:         return template.content;
108:       });
109:     }
110:   }, [setInstructions]);
111: 
112:   // Handle template preview on hover
113:   const handleTemplateHover = useCallback((value: string) => {
114:     const template = PROMPT_TEMPLATES.find(t => t.id === value);
115:     if (template) {
116:       setPreviewTemplate(template);
117:     }
118:   }, []);
119: 
120:   return (
121:     <div className={styles.container}>
122:       <div className={styles.header}>
123:         <div className={styles.templateSelector}>
124:           <Dropdown
125:             options={templateOptions.flatMap(group => group.options)}
126:             value={selectedTemplate || undefined}
127:             onChange={handleTemplateSelect}
128:             placeholder="Select a template..."
129:             title="Select a prompt template"
130:           />
131:         </div>
132:       </div>
133: 
134:       <div className={styles.textareaContainer}>
135:         <textarea
136:           value={instructions}
137:           onChange={(e) => setInstructions(e.target.value)}
138:           placeholder="Enter your instructions here..."
139:           className={styles.textarea}
140:           aria-label="User instructions"
141:         />
142:       </div>
143: 
144:       {previewTemplate && (
145:         <div className={styles.templatePreview} role="complementary" aria-label="Template preview">
146:           <h4>{previewTemplate.name}</h4>
147:           <p className={styles.templateDescription}>{previewTemplate.description}</p>
148:           <pre className={styles.templateContent}>{previewTemplate.content}</pre>
149:         </div>
150:       )}
151: 
152:       <ConfirmationDialog
153:         isOpen={showConfirmDialog}
154:         onClose={() => {
155:           setShowConfirmDialog(false);
156:           setPendingTemplate(null);
157:         }}
158:         onConfirm={() => {
159:           if (pendingTemplate) {
160:             insertTemplate(pendingTemplate, insertMode);
161:           }
162:           setShowConfirmDialog(false);
163:           setPendingTemplate(null);
164:         }}
165:         title="Insert Template"
166:         description="Would you like to replace your current instructions or append the template?"
167:         confirmLabel={insertMode === 'replace' ? 'Replace' : 'Append'}
168:         cancelLabel="Cancel"
169:       />
170:     </div>
171:   );
172: };
````

## File: src/constants/outputFormats.ts
````typescript
 1: export type OutputFormatType = 'xml' | 'markdown' | 'plain';
 2: 
 3: export const OUTPUT_FORMAT_OPTIONS = [
 4:   { 
 5:     value: 'xml', 
 6:     label: 'XML', 
 7:     description: 'XML format with tags for file content',
 8:     icon: '🔰'
 9:   },
10:   { 
11:     value: 'markdown', 
12:     label: 'Markdown', 
13:     description: 'Markdown format with code blocks',
14:     icon: '📝'
15:   },
16:   { 
17:     value: 'plain', 
18:     label: 'Plain Text', 
19:     description: 'Plain text with ASCII separators',
20:     icon: '📄'
21:   },
22: ];
23: 
24: export const OUTPUT_FORMAT_STORAGE_KEY = 'pastemax-output-format';
````

## File: src/constants/promptTemplates.ts
````typescript
  1: export interface PromptTemplate {
  2:   id: string;
  3:   name: string;
  4:   content: string;
  5:   category: TemplateCategory;
  6:   description?: string;
  7:   icon?: string;
  8: }
  9: 
 10: export type TemplateCategory = 
 11:   | 'Code Review' 
 12:   | 'Documentation Generation' 
 13:   | 'Analysis and Improvement' 
 14:   | 'Testing' 
 15:   | 'Code Quality';
 16: 
 17: export const PROMPT_TEMPLATES: PromptTemplate[] = [
 18:   {
 19:     id: 'architecture-review',
 20:     name: 'Architecture Review',
 21:     category: 'Code Review',
 22:     icon: '🏗️',
 23:     description: 'Analyze codebase architecture, patterns, and suggest improvements',
 24:     content: `Architecture Review:
 25: - Analyze this codebase's architecture:
 26: 1. Evaluate the overall structure and patterns
 27: 2. Identify potential architectural issues
 28: 3. Suggest improvements for scalability
 29: 4. Note areas that follow best practices
 30: Focus on maintainability and modularity.`
 31:   },
 32:   {
 33:     id: 'security-review',
 34:     name: 'Security Review',
 35:     category: 'Code Review',
 36:     icon: '🔒',
 37:     description: 'Identify security vulnerabilities and suggest fixes',
 38:     content: `Security Review:
 39: Perform a security review of this codebase:
 40: 1. Identify potential security vulnerabilities
 41: 2. Check for common security anti-patterns
 42: 3. Review error handling and input validation
 43: 4. Assess dependency security
 44: Provide specific examples and remediation steps.`
 45:   },
 46:   {
 47:     id: 'performance-review',
 48:     name: 'Performance Review',
 49:     category: 'Code Review',
 50:     icon: '⚡',
 51:     description: 'Analyze performance bottlenecks and optimization opportunities',
 52:     content: `Performance Review
 53: Review the codebase for performance:
 54: 1. Identify performance bottlenecks
 55: 2. Check resource utilization
 56: 3. Review algorithmic efficiency
 57: 4. Assess caching strategies
 58: Include specific optimization recommendations.`
 59:   },
 60:   {
 61:     id: 'api-documentation',
 62:     name: 'API Documentation',
 63:     category: 'Documentation Generation',
 64:     icon: '📚',
 65:     description: 'Generate comprehensive API documentation',
 66:     content: `API Documentation
 67: Generate comprehensive API documentation:
 68: 1. List and describe all public endpoints
 69: 2. Document request/response formats
 70: 3. Include usage examples
 71: 4. Note any limitations or constraints`
 72:   },
 73:   {
 74:     id: 'developer-guide',
 75:     name: 'Developer Guide',
 76:     category: 'Documentation Generation',
 77:     icon: '📖',
 78:     description: 'Create a comprehensive guide for developers',
 79:     content: `Developer Guide
 80: Create a developer guide covering:
 81: 1. Setup instructions
 82: 2. Project structure overview
 83: 3. Development workflow
 84: 4. Testing approach
 85: 5. Common troubleshooting steps`
 86:   },
 87:   {
 88:     id: 'architecture-documentation',
 89:     name: 'Architecture Documentation',
 90:     category: 'Documentation Generation',
 91:     icon: '🏛️',
 92:     description: 'Document system architecture and design decisions',
 93:     content: `Architecture Documentation
 94: Document the system architecture:
 95: 1. High-level overview
 96: 2. Component interactions
 97: 3. Data flow diagrams
 98: 4. Design decisions and rationale
 99: 5. System constraints and limitations`
100:   },
101:   {
102:     id: 'dependency-analysis',
103:     name: 'Dependency Analysis',
104:     category: 'Analysis and Improvement',
105:     icon: '📦',
106:     description: 'Analyze project dependencies and suggest improvements',
107:     content: `Dependency Analysis
108: Analyze the project dependencies:
109: 1. Identify outdated packages
110: 2. Check for security vulnerabilities
111: 3. Suggest alternative packages
112: 4. Review dependency usage patterns
113: Include specific upgrade recommendations.`
114:   },
115:   {
116:     id: 'test-coverage',
117:     name: 'Test Coverage Review',
118:     category: 'Testing',
119:     icon: '🧪',
120:     description: 'Review test coverage and suggest improvements',
121:     content: `Test Coverage Review
122: Review the test coverage:
123: 1. Identify untested components
124: 2. Suggest additional test cases
125: 3. Review test quality
126: 4. Recommend testing strategies`
127:   },
128:   {
129:     id: 'code-quality',
130:     name: 'Code Quality Assessment',
131:     category: 'Code Quality',
132:     icon: '✨',
133:     description: 'Assess code quality and suggest improvements',
134:     content: `Code Quality Assessment
135: Assess code quality and suggest improvements:
136: 1. Review naming conventions
137: 2. Check code organization
138: 3. Evaluate error handling
139: 4. Review commenting practices
140: Provide specific examples of good and problematic patterns.`
141:   }
142: ];
143: 
144: export const TEMPLATE_STORAGE_KEY = 'pastemax-last-template';
145: export const TEMPLATE_INSERT_MODE_KEY = 'pastemax-template-insert-mode';
146: export type TemplateInsertMode = 'replace' | 'append';
````

## File: src/constants/theme.ts
````typescript
1: export const STORAGE_KEY = "pastemax-theme";
````

## File: src/context/ThemeContextType.ts
````typescript
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
````

## File: src/styles/globals.css
````css
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
````

## File: src/types/css.d.ts
````typescript
1: declare module '*.module.css' {
2:   const classes: { [key: string]: string };
3:   export default classes;
4: }
````

## File: src/types/electron.d.ts
````typescript
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
````

## File: src/types/FileInfo.ts
````typescript
1: export interface FileInfo {
2:   path: string;
3:   name: string;
4:   type: 'file' | 'directory';
5:   size?: number;
6:   lastModified?: Date;
7: }
````

## File: src/types/GlobalPatternsState.ts
````typescript
1: export interface GlobalPatternsState {
2:   excludedSystemPatterns: string[];
3:   userPatterns: string[];
4: }
````

## File: src/types/index.ts
````typescript
1: // Re-export all types from FileTypes.ts
2: export * from './FileTypes';
````

## File: src/types/SortOrder.ts
````typescript
1: export type SortOrder = 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc' | 'size-asc' | 'size-desc';
````

## File: src/utils/create-variants.ts
````typescript
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
````

## File: src/utils/formatters.ts
````typescript
  1: import { FileTreeMode } from '../types/FileTypes';
  2: 
  3: interface FileContent {
  4:   path: string;
  5:   content: string;
  6:   tokenCount?: number;
  7: }
  8: 
  9: // Helper function to escape XML special characters
 10: function escapeXML(str: string): string {
 11:   return str
 12:     .replace(/&/g, '&amp;')
 13:     .replace(/</g, '&lt;')
 14:     .replace(/>/g, '&gt;')
 15:     .replace(/"/g, '&quot;')
 16:     .replace(/'/g, '&apos;');
 17: }
 18: 
 19: // Helper function to wrap content in CDATA if it contains special characters
 20: function wrapInCDATA(content: string): string {
 21:   if (content.includes(']]>')) {
 22:     // Handle nested CDATA by splitting the string
 23:     return content
 24:       .split(']]>')
 25:       .map(part => `<![CDATA[${part}]]>`)
 26:       .join(']]&gt;');
 27:   }
 28:   return `<![CDATA[${content}]]>`;
 29: }
 30: 
 31: // Helper function to escape backticks in markdown code blocks
 32: function escapeMarkdownCodeBlock(content: string): string {
 33:   const maxBackticks = content.match(/`+/g)?.reduce((max, curr) => Math.max(max, curr.length), 0) || 0;
 34:   const fenceLength = maxBackticks + 1;
 35:   const fence = '`'.repeat(fenceLength);
 36:   return fence + content + fence;
 37: }
 38: 
 39: export function formatAsXML(
 40:   files: FileContent[],
 41:   selectedFolder: string | null,
 42:   fileTreeMode: FileTreeMode,
 43:   fileTree: string,
 44:   userInstructions: string
 45: ): string {
 46:   const timestamp = new Date().toISOString();
 47:   let output = '<?xml version="1.0" encoding="UTF-8"?>\n';
 48:   output += '<pastemax-export>\n';
 49:   
 50:   // Add metadata
 51:   output += '  <metadata>\n';
 52:   output += `    <timestamp>${timestamp}</timestamp>\n`;
 53:   output += `    <file_count>${files.length}</file_count>\n`;
 54:   if (selectedFolder) {
 55:     output += `    <base_folder>${escapeXML(selectedFolder)}</base_folder>\n`;
 56:   }
 57:   output += '  </metadata>\n\n';
 58: 
 59:   // Add user instructions if present
 60:   if (userInstructions) {
 61:     output += '  <instructions>\n';
 62:     output += `    ${wrapInCDATA(userInstructions)}\n`;
 63:     output += '  </instructions>\n\n';
 64:   }
 65: 
 66:   // Add file tree if present
 67:   if (fileTree) {
 68:     output += '  <directory_structure>\n';
 69:     output += `    ${wrapInCDATA(fileTree)}\n`;
 70:     output += '  </directory_structure>\n\n';
 71:   }
 72: 
 73:   // Add files
 74:   output += '  <files>\n';
 75:   files.forEach(file => {
 76:     output += `    <file path="${escapeXML(file.path)}"`;
 77:     if (file.tokenCount !== undefined) {
 78:       output += ` token_count="${file.tokenCount}"`;
 79:     }
 80:     output += '>\n';
 81:     output += `      ${wrapInCDATA(file.content)}\n`;
 82:     output += '    </file>\n';
 83:   });
 84:   output += '  </files>\n';
 85:   
 86:   output += '</pastemax-export>';
 87:   return output;
 88: }
 89: 
 90: export function formatAsMarkdown(
 91:   files: FileContent[],
 92:   selectedFolder: string | null,
 93:   fileTreeMode: FileTreeMode,
 94:   fileTree: string,
 95:   userInstructions: string
 96: ): string {
 97:   const timestamp = new Date().toISOString();
 98:   let output = '# PasteMax Export\n\n';
 99: 
100:   // Add metadata
101:   output += '## Metadata\n';
102:   output += `- **Timestamp:** ${timestamp}\n`;
103:   output += `- **File Count:** ${files.length}\n`;
104:   if (selectedFolder) {
105:     output += `- **Base Folder:** \`${selectedFolder}\`\n`;
106:   }
107:   output += '\n';
108: 
109:   // Add user instructions if present
110:   if (userInstructions) {
111:     output += '## Instructions\n\n';
112:     output += userInstructions + '\n\n';
113:   }
114: 
115:   // Add file tree if present
116:   if (fileTree) {
117:     output += '## Directory Structure\n\n';
118:     output += '```\n' + fileTree + '\n```\n\n';
119:   }
120: 
121:   // Add files
122:   output += '## Files\n\n';
123:   files.forEach(file => {
124:     const extension = file.path.split('.').pop() || '';
125:     output += `### ${file.path}\n`;
126:     if (file.tokenCount !== undefined) {
127:       output += `Token count: ${file.tokenCount}\n\n`;
128:     }
129:     output += '```' + extension + '\n' + file.content + '\n```\n\n';
130:   });
131: 
132:   return output;
133: }
134: 
135: export function formatAsPlain(
136:   files: FileContent[],
137:   selectedFolder: string | null,
138:   fileTreeMode: FileTreeMode,
139:   fileTree: string,
140:   userInstructions: string
141: ): string {
142:   const timestamp = new Date().toISOString();
143:   const separator = '='.repeat(80) + '\n';
144:   let output = '';
145: 
146:   // Add header
147:   output += separator;
148:   output += 'PASTEMAX EXPORT\n';
149:   output += separator + '\n';
150: 
151:   // Add metadata
152:   output += 'METADATA\n';
153:   output += separator;
154:   output += `Timestamp: ${timestamp}\n`;
155:   output += `File Count: ${files.length}\n`;
156:   if (selectedFolder) {
157:     output += `Base Folder: ${selectedFolder}\n`;
158:   }
159:   output += '\n';
160: 
161:   // Add user instructions if present
162:   if (userInstructions) {
163:     output += separator;
164:     output += 'INSTRUCTIONS\n';
165:     output += separator;
166:     output += userInstructions + '\n\n';
167:   }
168: 
169:   // Add file tree if present
170:   if (fileTree) {
171:     output += separator;
172:     output += 'DIRECTORY STRUCTURE\n';
173:     output += separator;
174:     output += fileTree + '\n\n';
175:   }
176: 
177:   // Add files
178:   output += separator;
179:   output += 'FILES\n';
180:   output += separator;
181:   
182:   files.forEach((file, index) => {
183:     if (index > 0) output += '\n';
184:     output += `File: ${file.path}\n`;
185:     if (file.tokenCount !== undefined) {
186:       output += `Token Count: ${file.tokenCount}\n`;
187:     }
188:     output += separator;
189:     output += file.content + '\n';
190:   });
191: 
192:   return output;
193: }
````

## File: src/utils/pathUtils.ts
````typescript
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
````

## File: src/utils/sortIcons.tsx
````typescript
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
````

## File: src/index.css
````css
 1: :root {
 2:   /* ... existing variables ... */
 3: 
 4:   /* Dropdown Menu Variables */
 5:   --surface-color: var(--background-primary);
 6:   --border-color: var(--border);
 7:   --text-color: var(--text-primary);
 8:   --hover-color: var(--background-secondary);
 9:   --focus-ring-color: var(--accent-color);
10:   --accent-color: var(--accent);
11:   --accent-foreground: var(--text-primary);
12:   --popover-foreground: var(--text-primary);
13:   --background: var(--background-primary);
14:   --popover: var(--background-primary);
15:   --border: var(--border-color);
16:   --ring: var(--accent-color);
17:   --muted-foreground: var(--text-secondary);
18: }
19: 
20: /* ... rest of the existing styles ... */
````

## File: src/components/__tests__/IgnorePatterns.test.tsx
````typescript
  1: import React from 'react';
  2: import { render, screen, fireEvent } from '@testing-library/react';
  3: import '@testing-library/jest-dom';
  4: import IgnorePatterns from '../IgnorePatterns';
  5: 
  6: describe('IgnorePatterns Component', () => {
  7:   const defaultProps = {
  8:     isOpen: true,
  9:     onClose: jest.fn(),
 10:     globalPatternsState: {
 11:       patterns: '',
 12:       excludedSystemPatterns: []
 13:     },
 14:     localPatternsState: {
 15:       patterns: '',
 16:       excludedSystemPatterns: []
 17:     },
 18:     systemIgnorePatterns: ['**/.git/**', '**/node_modules/**'],
 19:     recentFolders: ['/test/folder1', '/test/folder2'],
 20:     saveIgnorePatterns: jest.fn(),
 21:     resetIgnorePatterns: jest.fn(),
 22:     clearIgnorePatterns: jest.fn(),
 23:     onExcludedSystemPatternsChange: jest.fn(),
 24:   };
 25: 
 26:   beforeEach(() => {
 27:     jest.clearAllMocks();
 28:   });
 29: 
 30:   describe('Controlled Mode Tests', () => {
 31:     it('initializes with provided excluded patterns', () => {
 32:       render(
 33:         <IgnorePatterns
 34:           {...defaultProps}
 35:           globalPatternsState={{
 36:             patterns: '',
 37:             excludedSystemPatterns: ['**/.git/**']
 38:           }}
 39:         />
 40:       );
 41: 
 42:       const gitSwitch = screen.getByLabelText('**/.git/**');
 43:       const nodeModulesSwitch = screen.getByLabelText('**/node_modules/**');
 44: 
 45:       expect(gitSwitch).not.toBeChecked();
 46:       expect(nodeModulesSwitch).toBeChecked();
 47:     });
 48: 
 49:     it('syncs state with parent on pattern toggle', () => {
 50:       render(
 51:         <IgnorePatterns
 52:           {...defaultProps}
 53:           globalPatternsState={{
 54:             patterns: '',
 55:             excludedSystemPatterns: []
 56:           }}
 57:         />
 58:       );
 59: 
 60:       const nodeModulesPattern = screen.getByText('**/node_modules/**');
 61:       const toggleButton = nodeModulesPattern.closest('div')?.querySelector('button');
 62:       
 63:       if (!toggleButton) {
 64:         throw new Error('Toggle button not found');
 65:       }
 66: 
 67:       fireEvent.click(toggleButton);
 68:       expect(defaultProps.onExcludedSystemPatternsChange).toHaveBeenCalledWith(['**/node_modules/**']);
 69:     });
 70: 
 71:     it('syncs state with parent on modal close', () => {
 72:       render(
 73:         <IgnorePatterns
 74:           {...defaultProps}
 75:           globalPatternsState={{
 76:             patterns: '',
 77:             excludedSystemPatterns: []
 78:           }}
 79:         />
 80:       );
 81: 
 82:       const closeButton = screen.getByLabelText('Close');
 83:       fireEvent.click(closeButton);
 84: 
 85:       expect(defaultProps.onClose).toHaveBeenCalled();
 86:     });
 87:   });
 88: 
 89:   describe('Uncontrolled Mode Tests', () => {
 90:     it('works with only excludedSystemPatterns (no setter)', () => {
 91:       render(
 92:         <IgnorePatterns
 93:           {...defaultProps}
 94:           globalPatternsState={{
 95:             patterns: '',
 96:             excludedSystemPatterns: ['**/.git/**']
 97:           }}
 98:         />
 99:       );
100: 
101:       const nodeModulesPattern = screen.getByText('**/node_modules/**');
102:       const toggleButton = nodeModulesPattern.closest('div')?.querySelector('button');
103:       
104:       if (!toggleButton) {
105:         throw new Error('Toggle button not found');
106:       }
107: 
108:       fireEvent.click(toggleButton);
109:       expect(defaultProps.saveIgnorePatterns).not.toHaveBeenCalled();
110:     });
111: 
112:     it('works with neither prop', () => {
113:       render(<IgnorePatterns {...defaultProps} />);
114: 
115:       const nodeModulesPattern = screen.getByText('**/node_modules/**');
116:       const toggleButton = nodeModulesPattern.closest('div')?.querySelector('button');
117:       
118:       if (!toggleButton) {
119:         throw new Error('Toggle button not found');
120:       }
121: 
122:       fireEvent.click(toggleButton);
123:       expect(defaultProps.saveIgnorePatterns).not.toHaveBeenCalled();
124:     });
125:   });
126: 
127:   describe('Pattern Management Tests', () => {
128:     it('saves global patterns correctly', async () => {
129:       render(<IgnorePatterns {...defaultProps} />);
130: 
131:       const saveButton = screen.getByText('Save');
132:       fireEvent.click(saveButton);
133: 
134:       expect(defaultProps.saveIgnorePatterns).toHaveBeenCalledWith('', true);
135:     });
136: 
137:     it('handles keyboard shortcuts', () => {
138:       render(<IgnorePatterns {...defaultProps} />);
139: 
140:       fireEvent.keyDown(window, { key: 's', ctrlKey: true });
141:       expect(defaultProps.saveIgnorePatterns).toHaveBeenCalled();
142:     });
143:   });
144: 
145:   describe('UI Interaction Tests', () => {
146:     it('toggles pattern categories', () => {
147:       render(<IgnorePatterns {...defaultProps} />);
148: 
149:       const categoryHeader = screen.getByText('Version Control').closest('div');
150:       
151:       if (!categoryHeader) {
152:         throw new Error('Category header not found');
153:       }
154: 
155:       fireEvent.click(categoryHeader);
156:       expect(categoryHeader.parentElement).not.toHaveClass('categoryExpanded');
157: 
158:       fireEvent.click(categoryHeader);
159:       expect(categoryHeader.parentElement).toHaveClass('categoryExpanded');
160:     });
161: 
162:     it('switches between global and local tabs', () => {
163:       render(<IgnorePatterns {...defaultProps} />);
164: 
165:       const localTab = screen.getByText('Local');
166:       fireEvent.click(localTab);
167: 
168:       expect(screen.getByLabelText('Folder select')).toBeInTheDocument();
169:     });
170:   });
171: });
````

## File: src/components/ui/Card/Card.module.css
````css
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
````

## File: src/components/ui/Dialog/Dialog.tsx
````typescript
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
 65:   const backdropRef = useRef<HTMLDivElement>(null); // Ref for the backdrop
 66: 
 67:   // Handle ESC key to close dialog
 68:   useEffect(() => {
 69:     const handleKeyDown = (e: KeyboardEvent) => {
 70:       if (e.key === 'Escape' && isOpen) {
 71:         onClose();
 72:       }
 73:     };
 74: 
 75:     window.addEventListener('keydown', handleKeyDown);
 76:     return () => window.removeEventListener('keydown', handleKeyDown);
 77:   }, [isOpen, onClose]);
 78: 
 79:   // Handle click outside (on backdrop) to close
 80:   useEffect(() => {
 81:     const handleClickOutside = (e: MouseEvent) => {
 82:       // Only close if clicking directly on the backdrop
 83:       if (backdropRef.current === e.target) {
 84:         onClose();
 85:       }
 86:     };
 87: 
 88:     if (isOpen) {
 89:       document.addEventListener('mousedown', handleClickOutside);
 90:       return () => document.removeEventListener('mousedown', handleClickOutside);
 91:     }
 92:   }, [isOpen, onClose]);
 93: 
 94:   // Prevent body scroll when dialog is open
 95:   useEffect(() => {
 96:     if (isOpen) {
 97:       document.body.style.overflow = 'hidden';
 98:       // Focus the dialog container or first focusable element on open
 99:       dialogRef.current?.focus();
100:       return () => {
101:         document.body.style.overflow = 'unset';
102:       };
103:     }
104:   }, [isOpen]);
105: 
106:   if (!isOpen) return null;
107: 
108:   return (
109:     <div
110:       ref={backdropRef} // Add ref to backdrop
111:       className={styles.backdrop}
112:       role="presentation" // Backdrop is presentational
113:     >
114:       <div
115:         ref={dialogRef}
116:         className={cn(
117:           styles.dialog, // Use .dialog for the main container
118:           styles[size],
119:           className
120:         )}
121:         role="dialog"
122:         aria-modal="true"
123:         aria-labelledby="dialog-title"
124:         tabIndex={-1} // Make the dialog focusable
125:       >
126:         <div className={styles.header}>
127:           <h2 id="dialog-title" className={styles.title}>{title}</h2>
128:           <Button
129:             variant="ghost"
130:             size="sm"
131:             iconOnly
132:             onClick={onClose}
133:             startIcon={<X size={16} />} // Correctly uses Button component
134:             title="Close dialog"
135:             aria-label="Close dialog" // Add aria-label
136:           />
137:         </div>
138: 
139:         {description && (
140:           <div className={styles.description}>
141:             {description}
142:           </div>
143:         )}
144: 
145:         <div className={styles.content}>
146:           {children}
147:         </div>
148: 
149:         {footer && (
150:           <div className={styles.footer}>
151:             {footer}
152:           </div>
153:         )}
154:       </div>
155:     </div>
156:   );
157: };
````

## File: src/components/ui/Dialog/index.ts
````typescript
1: export * from './Dialog';
````

## File: src/components/ui/Dropdown/DropdownDemo.tsx
````typescript
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
````

## File: src/components/ui/DropdownMenu/DropdownMenu.tsx
````typescript
 1: import React from 'react';
 2: import { DropdownMenuProps } from './types';
 3: import { DropdownMenuProvider } from './context';
 4: import styles from './DropdownMenu.module.css';
 5: 
 6: export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, className }) => {
 7:   return (
 8:     <DropdownMenuProvider>
 9:       <div className={`${styles.dropdownMenu} ${className || ''}`}>
10:         {children}
11:       </div>
12:     </DropdownMenuProvider>
13:   );
14: };
15: 
16: export * from './DropdownMenuTrigger';
17: export * from './DropdownMenuContent';
18: export * from './DropdownMenuItem';
19: export * from './DropdownMenuSeparator';
20: export * from './DropdownMenuGroup';
21: export * from './DropdownMenuLabel';
````

## File: src/components/ui/DropdownMenu/index.ts
````typescript
1: export * from './DropdownMenu';
2: export * from './types';
````

## File: src/components/ui/Input/Input.module.css
````css
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
````

## File: src/components/ui/Input/Input.tsx
````typescript
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
````

## File: src/components/ui/StatusAlert/StatusAlert.module.css
````css
 1: .alertContainer {
 2:     position: relative;
 3:     width: 100%;
 4:     padding: 0.5rem 1rem;
 5:     transition: opacity 200ms ease-out, transform 200ms ease-out;
 6:     display: flex;
 7:     align-items: center;
 8:     background-color: var(--background-secondary);
 9:     border-bottom: 1px solid var(--border);
10:     margin-bottom: 0;
11:     height: 36px;
12:     overflow: hidden;
13:   }
14:   
15:   .enter {
16:     opacity: 1;
17:     transform: translateY(0);
18:   }
19:   
20:   .exit {
21:     opacity: 0;
22:     transform: translateY(-5px);
23:   }
24:   
25:   .alertContent {
26:     display: flex;
27:     gap: 0.5rem;
28:     width: 100%;
29:     align-items: center;
30:   }
31:   
32:   .messageContent {
33:     flex: 1;
34:     display: flex;
35:     align-items: center;
36:     gap: 0.5rem;
37:     font-size: 14px;
38:     font-family: monospace;
39:   }
40:   
41:   .terminalPrefix {
42:     font-family: 'Courier New', Courier, monospace;
43:     color: var(--text-secondary);
44:     margin-right: 0.25rem;
45:   }
46:   
47:   .alertTitle {
48:     font-weight: 500;
49:     margin: 0;
50:     font-size: 12px;
51:   }
52:   
53:   .alertDescription {
54:     font-size: 12px;
55:     color: var(--text-secondary);
56:     margin: 0;
57:   }
58:   
59:   /* Status-specific styles */
60:   .processing {
61:     background-color: var(--background-secondary);
62:   }
63:   
64:   .complete {
65:     background-color: var(--background-secondary);
66:   }
67:   
68:   .error {
69:     background-color: var(--background-secondary);
70:   }
71:   
72:   .closeButton {
73:     background: transparent;
74:     border: none;
75:     cursor: pointer;
76:     color: var(--text-secondary);
77:     padding: 0;
78:     margin-left: auto;
79:     display: flex;
80:     align-items: center;
81:     justify-content: center;
82:     height: 16px;
83:     width: 16px;
84:   }
85:   
86:   .closeButton:hover {
87:     color: var(--text-primary);
88:   }
````

## File: src/components/ui/StatusAlert/StatusAlert.tsx
````typescript
 1: import React, { useState, useEffect } from 'react';
 2: import { Loader2, Check, AlertTriangle, X } from 'lucide-react';
 3: import styles from './StatusAlert.module.css';
 4: 
 5: // Core structure with TypeScript props
 6: interface StatusAlertProps {
 7:     status: "idle" | "processing" | "complete" | "error";
 8:     message: string;
 9:     autoDismissTime?: number; // in milliseconds, default for success/complete
10:     onClose?: () => void;     // callback when dismissed
11:   }
12:   
13:   const StatusAlert: React.FC<StatusAlertProps> = ({
14:     status,
15:     message,
16:     autoDismissTime = 5000, // longer default than current 3000ms
17:     onClose
18:   }) => {
19:     // States
20:     const [isVisible, setIsVisible] = useState(status !== "idle");
21:     const [isExiting, setIsExiting] = useState(false);
22:     
23:     // Icon mapping based on status
24:     const statusIcons = {
25:       processing: <Loader2 className="animate-spin" size={14} />,
26:       complete: <Check size={14} />,
27:       error: <AlertTriangle size={14} />,
28:       idle: null
29:     };
30:     
31:     // Style mapping based on status
32:     const statusClasses = {
33:       processing: styles.processing,
34:       complete: styles.complete,
35:       error: styles.error,
36:       idle: ''
37:     };
38:     
39:     // Auto-dismiss logic for successful operations
40:     useEffect(() => {
41:       if (status === "idle") {
42:         handleExit();
43:         return;
44:       }
45:       
46:       setIsVisible(true);
47:       setIsExiting(false);
48:       
49:       // Only auto-dismiss for complete status
50:       if (status === "complete" && autoDismissTime) {
51:         const timer = setTimeout(() => {
52:           handleExit();
53:         }, autoDismissTime);
54:         
55:         return () => clearTimeout(timer);
56:       }
57:     }, [status, message, autoDismissTime]);
58:     
59:     // Handle exit animation
60:     const handleExit = () => {
61:       setIsExiting(true);
62:       // Wait for animation to complete
63:       setTimeout(() => {
64:         setIsVisible(false);
65:         if (onClose) onClose();
66:       }, 200); // Match transition duration
67:     };
68:     
69:     if (!isVisible && status === "idle") return null;
70:     
71:     return (
72:       <div
73:         className={`${styles.alertContainer} ${isExiting ? styles.exit : styles.enter} ${statusClasses[status]}`}
74:         role="alert"
75:       >
76:         <div className={styles.alertContent}>
77:           <div className={styles.messageContent}>
78:             <span className={styles.terminalPrefix}>&gt;_</span>
79:             <div className={styles.alertDescription}>{message}</div>
80:           </div>
81:           {status === "error" && (
82:             <button 
83:               className={styles.closeButton} 
84:               onClick={handleExit}
85:               aria-label="Close"
86:             >
87:               <X size={14} />
88:             </button>
89:           )}
90:         </div>
91:       </div>
92:     );
93:   };
94: 
95: export default StatusAlert;
````

## File: src/components/FileList.module.css
````css
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
````

## File: src/components/FileList.tsx
````typescript
 1: import React, { useState, useEffect } from "react";
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
12:   const [fileContents, setFileContents] = useState<Record<string, string>>({});
13: 
14:   // Only show files that are in the selectedFiles array and not binary/skipped
15:   const displayableFiles = files.filter(
16:     (file: FileData) =>
17:       selectedFiles.some(selectedPath => arePathsEqual(selectedPath, file.path)) && 
18:       !file.isBinary && 
19:       !file.isSkipped,
20:   );
21: 
22:   // Find the maximum token count for relative scaling
23:   const maxTokenCount = displayableFiles.length > 0
24:     ? Math.max(...displayableFiles.map(file => file.tokenCount))
25:     : 5000; // Default if no files
26: 
27:   // Fetch file contents when needed
28:   useEffect(() => {
29:     const fetchContents = async () => {
30:       const newContents: Record<string, string> = {};
31:       for (const file of displayableFiles) {
32:         if (!fileContents[file.path]) {
33:           try {
34:             const content = await window.electron.ipcRenderer.invoke("read-file", file.path);
35:             newContents[file.path] = content;
36:           } catch (error) {
37:             console.error(`Error reading file ${file.path}:`, error);
38:             newContents[file.path] = "Error loading file content";
39:           }
40:         }
41:       }
42:       if (Object.keys(newContents).length > 0) {
43:         setFileContents(prev => ({ ...prev, ...newContents }));
44:       }
45:     };
46: 
47:     fetchContents();
48:   }, [displayableFiles, fileContents]);
49: 
50:   return (
51:     <div className={styles.fileListContainer}>
52:       {displayableFiles.length > 0 ? (
53:         <div className={styles.fileList}>
54:           {displayableFiles.map((file) => (
55:             <FileCard
56:               key={file.path}
57:               file={{
58:                 ...file,
59:                 content: fileContents[file.path] || "Loading..."
60:               }}
61:               isSelected={true} // Always true since we're already filtering for selected files
62:               toggleSelection={toggleFileSelection}
63:               maxTokenCount={maxTokenCount}
64:             />
65:           ))}
66:         </div>
67:       ) : (
68:         <div className={styles.fileListEmpty}>
69:           No files selected. Select files from the sidebar to see them here.
70:         </div>
71:       )}
72:     </div>
73:   );
74: };
75: 
76: export default FileList;
````

## File: src/components/UserInstructions.module.css
````css
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
````

## File: src/components/UserInstructions.tsx
````typescript
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
````

## File: src/hooks/useTheme.ts
````typescript
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
````

## File: src/components/ui/Button/index.ts
````typescript
1: export * from './Button';
````

## File: src/components/ui/Dialog/Dialog.module.css
````css
  1: .backdrop {
  2:   position: fixed;
  3:   top: 0;
  4:   left: 0;
  5:   right: 0;
  6:   bottom: 0;
  7:   background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  8:   display: flex;
  9:   justify-content: center;
 10:   align-items: center;
 11:   z-index: var(--z-index-modal, 50);
 12:   backdrop-filter: blur(4px); /* Background blur */
 13:   animation: fadeIn 0.15s ease-out;
 14: }
 15: 
 16: .dialog { /* Style the main dialog container */
 17:   background-color: var(--background-primary);
 18:   border: 1px solid var(--border-color); /* Added border */
 19:   border-radius: var(--radius-lg, 8px); /* Use variable or default */
 20:   box-shadow: var(--shadow-lg);
 21:   width: 90vw; /* Responsive width */
 22:   max-width: 500px; /* Default max-width (size 'md') */
 23:   max-height: 85vh;
 24:   display: flex; /* Use flexbox for layout */
 25:   flex-direction: column;
 26:   overflow: hidden; /* Prevent content overflow issues */
 27:   animation: slideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1); /* Optional: entry animation */
 28: }
 29: 
 30: /* Remove fixed positioning and transform, rely on backdrop flexbox for centering */
 31: /* .dialogContent { ... } */
 32: 
 33: /* Size variants for .dialog */
 34: .sm {
 35:   max-width: 400px;
 36: }
 37: 
 38: .md {
 39:   max-width: 500px; /* Consistent with above */
 40: }
 41: 
 42: .lg {
 43:   max-width: 800px;
 44: }
 45: 
 46: .header {
 47:   display: flex;
 48:   justify-content: space-between;
 49:   align-items: center;
 50:   padding: 16px 20px;
 51:   border-bottom: 1px solid var(--border-color);
 52:   flex-shrink: 0; /* Prevent header from shrinking */
 53: }
 54: 
 55: .title {
 56:   margin: 0;
 57:   font-size: 18px;
 58:   font-weight: 600;
 59:   color: var(--text-primary);
 60:   line-height: 1.4;
 61: }
 62: 
 63: /* Removed .closeButton - handled by Button component */
 64: 
 65: .description {
 66:   padding: 12px 20px 0;
 67:   font-size: 14px;
 68:   color: var(--text-secondary);
 69:   line-height: 1.5;
 70:   flex-shrink: 0; /* Prevent shrinking */
 71: }
 72: 
 73: .content {
 74:   padding: 20px;
 75:   overflow-y: auto; /* Allow content to scroll if needed */
 76:   flex-grow: 1; /* Allow content to take available space */
 77: }
 78: 
 79: .footer {
 80:   display: flex;
 81:   justify-content: center; /* Center buttons */
 82:   align-items: center;
 83:   gap: 12px;
 84:   padding: 16px 20px;
 85:   border-top: 1px solid var(--border-color);
 86:   background-color: var(--background-secondary);
 87:   flex-shrink: 0; /* Prevent footer from shrinking */
 88: }
 89: 
 90: /* Animations */
 91: @keyframes fadeIn {
 92:   from { opacity: 0; }
 93:   to { opacity: 1; }
 94: }
 95: 
 96: @keyframes slideIn {
 97:   from {
 98:     opacity: 0;
 99:     transform: translateY(10px) scale(0.98);
100:   }
101:   to {
102:     opacity: 1;
103:     transform: translateY(0) scale(1);
104:   }
105: }
````

## File: src/components/ui/Switch/Switch.module.css
````css
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
````

## File: src/components/ui/ConfirmationDialog.tsx
````typescript
 1: import React from 'react';
 2: import { Dialog } from './Dialog'; // Use the updated Dialog
 3: import { Button } from './Button';
 4: import styles from './Dialog/Dialog.module.css'; // Can use styles if needed, but footer handles centering
 5: 
 6: interface ConfirmationDialogProps {
 7:   isOpen: boolean;
 8:   onClose: () => void;
 9:   onConfirm: () => void;
10:   title: string;
11:   description: string;
12:   confirmLabel?: string;
13:   cancelLabel?: string;
14:   variant?: 'default' | 'destructive'; // Semantic variant for the dialog itself
15: }
16: 
17: export function ConfirmationDialog({
18:   isOpen,
19:   onClose,
20:   onConfirm,
21:   title,
22:   description,
23:   confirmLabel = 'Confirm',
24:   cancelLabel = 'Cancel',
25:   variant = 'default' // This prop influences the overall dialog but not buttons directly here
26: }: ConfirmationDialogProps) {
27:   const handleConfirm = () => {
28:     onConfirm();
29:     onClose(); // Typically close after confirm
30:   };
31: 
32:   return (
33:     <Dialog
34:       isOpen={isOpen}
35:       onClose={onClose}
36:       title={title}
37:       description={description}
38:       size="sm" // Keep it small for confirmations
39:       footer={ // Pass buttons as the footer content
40:         <>
41:           <Button
42:             variant="ghost" // Standard cancel button
43:             size="sm"
44:             onClick={onClose}
45:           >
46:             {cancelLabel}
47:           </Button>
48:           <Button
49:             variant="primary" // Standard confirm button (not destructive red)
50:             size="sm"
51:             onClick={handleConfirm}
52:           >
53:             {confirmLabel}
54:           </Button>
55:         </>
56:       }
57:     >
58:       {/* No children needed if description covers the content */}
59:       {/* If there was more complex content, it would go here */}
60:       <div style={{ minHeight: '20px' }}></div> {/* Add some minimal height if description is short */}
61:     </Dialog>
62:   );
63: }
````

## File: src/components/ControlContainer.module.css
````css
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
````

## File: src/components/FileCard.tsx
````typescript
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
 91:             variant="icon"
 92:             size="sm"
 93:             iconOnly
 94:             onClick={() => toggleSelection(filePath)}
 95:             title={isSelected ? "Remove from selection" : "Add to selection"}
 96:             startIcon={isSelected ? <X size={16} /> : <Plus size={16} />}
 97:             className={styles.fileCardAction}
 98:           />
 99:           <Button
100:             variant="icon"
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
````

## File: src/components/ThemeToggle.module.css
````css
 1: .themeSegmentedControl {
 2:   display: flex;
 3:   background-color: var(--background-secondary);
 4:   border-radius: 9999px;
 5:   padding: 2px;
 6:   width: fit-content;
 7:   position: relative;
 8:   height: 28px;
 9:   border: 1px solid hsla(240, 6%, 90%, 0.6);
10:   gap: 1px;
11:   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.03);
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
23:   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.056), 0 0 0 1px rgba(0, 0, 0, 0.04);
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
````

## File: src/components/ThemeToggle.tsx
````typescript
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
````

## File: src/components/TreeItem.module.css
````css
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
````

## File: src/utils/cn.ts
````typescript
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
````

## File: src/declarations.d.ts
````typescript
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
````

## File: src/components/FileCard.module.css
````css
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
108:   color: var(--text-secondary);
109:   transition: color 0.2s ease !important;
110: }
111: 
112: .fileCardAction:hover {
113:   background-color: transparent !important;
114:   color: var(--text-primary) !important;
115: }
116: 
117: .copySuccess {
118:   color: var(--success-color);
119:   animation: pulse 1s ease-in-out;
120: }
121: 
122: @keyframes pulse {
123:   0% {
124:     transform: scale(1);
125:   }
126:   50% {
127:     transform: scale(1.2);
128:   }
129:   100% {
130:     transform: scale(1);
131:   }
132: }
````

## File: src/components/SearchBar.module.css
````css
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
17: .searchContainer {
18:   position: relative;
19:   display: flex;
20:   align-items: center;
21:   width: 100%;
22: }
23: 
24: .searchIcon {
25:   position: absolute;
26:   left: 8px;
27:   color: var(--text-secondary);
28:   pointer-events: none;
29:   width: 14px;
30:   height: 14px;
31: }
32: 
33: .searchInput {
34:   width: 100%;
35:   padding: 4px 10px 4px 26px;
36:   border: 1px solid var(--border-color);
37:   border-radius: 16px;
38:   font-size: 0.75rem;
39:   background: var(--background-secondary);
40:   color: var(--text-primary);
41:   transition: all 0.15s ease;
42:   outline: none;
43:   height: 24px;
44:   line-height: 1;
45: }
46: 
47: .searchInput:focus {
48:   border-color: var(--accent-color);
49:   box-shadow: 0 0 0 1px rgba(var(--accent-rgb), 0.2);
50: }
51: 
52: .searchInput::placeholder {
53:   color: var(--text-tertiary, var(--text-secondary));
54:   opacity: 0.6;
55: }
56: 
57: .clearButton {
58:   position: absolute;
59:   right: 6px;
60:   top: 50%;
61:   transform: translateY(-50%);
62:   background: none;
63:   border: none;
64:   padding: 2px;
65:   color: var(--text-secondary);
66:   display: flex;
67:   align-items: center;
68:   justify-content: center;
69:   border-radius: 50%;
70:   cursor: pointer;
71:   z-index: 2;
72:   width: 16px;
73:   height: 16px;
74:   transition: color 0.2s ease, background-color 0.2s ease;
75: }
76: 
77: .clearButton:hover {
78:   color: var(--text-primary);
79:   background-color: var(--hover-color);
80: }
````

## File: src/components/SearchBar.tsx
````typescript
 1: import React from "react";
 2: import { Search } from "lucide-react";
 3: import styles from "./SearchBar.module.css";
 4: 
 5: interface SearchBarProps {
 6:   searchTerm: string;
 7:   onSearchChange: (term: string) => void;
 8: }
 9: 
10: const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
11:   return (
12:     <div className={styles.searchContainer}>
13:       <Search size={14} className={styles.searchIcon} />
14:       <input
15:         type="text"
16:         value={searchTerm}
17:         onChange={(e) => onSearchChange(e.target.value)}
18:         placeholder="Search files..."
19:         className={styles.searchInput}
20:       />
21:     </div>
22:   );
23: };
24: 
25: export default SearchBar;
````

## File: src/context/ThemeContext.tsx
````typescript
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
````

## File: src/utils/patternUtils.ts
````typescript
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
 40:   /**
 41:    * Interface for ignore patterns state
 42:    */
 43:   export interface IgnorePatternsState {
 44:     patterns: string;
 45:     excludedSystemPatterns: string[];
 46:   }
 47:   
 48:   /**
 49:    * Parse ignore patterns content to extract disabled patterns and user patterns
 50:    */
 51:   export const parseIgnorePatternsContent = (content: string): { excludedPatterns: string[]; userPatterns: string } => {
 52:     if (!content) {
 53:       return { excludedPatterns: [], userPatterns: '' };
 54:     }
 55:     const lines = content.split('\n');
 56:     const excludedPatterns: string[] = [];
 57:     const userPatterns: string[] = [];
 58:   
 59:     let inUserSection = false;
 60:   
 61:     lines.forEach(line => {
 62:       const trimmedLine = line.trim();
 63:       
 64:       // Check for section headers
 65:       if (trimmedLine === '# USER PATTERNS:') {
 66:         inUserSection = true;
 67:         return;
 68:       }
 69:       
 70:       if (trimmedLine.startsWith('# DISABLED:')) {
 71:         // Extract pattern removing the DISABLED marker
 72:         const pattern = trimmedLine.substring('# DISABLED:'.length).trim();
 73:         if (pattern) {
 74:           excludedPatterns.push(pattern);
 75:         }
 76:       } else if (inUserSection && trimmedLine !== '' && !trimmedLine.startsWith('#')) {
 77:         // In user section, add non-comment lines to user patterns
 78:         userPatterns.push(line); // Keep original line to preserve indentation/whitespace
 79:       } else if (!inUserSection && !trimmedLine.startsWith('#') && trimmedLine !== '') {
 80:         // Not in user section yet, but found a pattern - also add to user patterns
 81:         // This handles the case where user patterns aren't properly marked with a section
 82:         userPatterns.push(line);
 83:       }
 84:       // Ignore empty lines and regular comments
 85:     });
 86:   
 87:     // Ensure excluded patterns are unique
 88:     const uniqueExcluded = Array.from(new Set(excludedPatterns));
 89:   
 90:     return {
 91:       excludedPatterns: uniqueExcluded,
 92:       userPatterns: userPatterns.join('\n')
 93:     };
 94:   };
 95:   
 96:   /**
 97:    * Load ignore patterns state from localStorage
 98:    */
 99:   export const loadIgnoreStateFromStorage = (storageKey: string): IgnorePatternsState => {
100:     const saved = localStorage.getItem(storageKey);
101:     if (saved) {
102:       try {
103:         const parsed = JSON.parse(saved);
104:         // Basic validation
105:         if (typeof parsed.patterns === 'string' && Array.isArray(parsed.excludedSystemPatterns)) {
106:           return parsed;
107:         }
108:       } catch (e) {
109:         console.error("Failed to parse saved ignore patterns:", e);
110:       }
111:     }
112:     // Default state if nothing saved or parsing failed
113:     return { patterns: '', excludedSystemPatterns: [] };
114:   };
115:   
116:   // --- Keep existing functions below if they are used ---
117:   
118:   // Selection handlers (Example, confirm if used or remove)
119:   export const handleSelectionChange = (prevSelected: string[], newSelected: string[]): string[] => {
120:     return newSelected;
121:   };
122:   
123:   export const handleFolderSelect = (prev: string[]): string[] => {
124:     return prev;
125:   };
126:   
127:   // Pattern state update function (Example, confirm if used or remove)
128:   export const handlePatternStateUpdate = (patterns: string | string[]): string => {
129:     return Array.isArray(patterns) ? patterns.join('\n') : patterns;
130:   };
131:   
132:   export const updatePatternState = (
133:     patterns: string | string[],
134:     isGlobal: boolean,
135:     setGlobalPatterns: (value: any) => void,
136:     setLocalPatterns: (value: any) => void,
137:     folderPath?: string
138:   ): void => {
139:     const normalizedPatterns = handlePatternStateUpdate(patterns);
140:   
141:     if (isGlobal) {
142:       setGlobalPatterns((prev: any) => ({
143:         ...prev,
144:         patterns: normalizedPatterns
145:       }));
146:     } else if (folderPath) {
147:       setLocalPatterns((prev: any) => ({
148:         ...prev,
149:         patterns: normalizedPatterns
150:       }));
151:     }
152:   };
153: 
154:   /**
155:    * Format global patterns for saving
156:    */
157:   export const formatPatternsForSaving = (
158:     userPatterns: string,
159:     excludedSystemPatterns: string[]
160:   ): string => {
161:     const disabledLines = excludedSystemPatterns
162:       .map(pattern => `# DISABLED:${pattern}`)
163:       .join('\n');
164:       
165:     return disabledLines ? `${disabledLines}\n\n${userPatterns}` : userPatterns;
166:   };
````

## File: src/react-app-env.d.ts
````typescript
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
````

## File: src/components/ui/Dropdown/Dropdown.tsx
````typescript
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
````

## File: src/components/ui/index.ts
````typescript
1: export { Button } from './Button';
2: export { Switch } from './Switch';
3: export { ButtonGroup } from './ButtonGroup';
4: export * from './Input';
5: export * from './Card';
6: export * from './Dialog';
7: export * from './Dropdown';
````

## File: src/components/Sidebar.module.css
````css
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
 11:   padding: 6px 12px;
 12:   border-bottom: 1px solid var(--border-color);
 13:   display: flex;
 14:   align-items: center;
 15:   height: 36px;
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
````

## File: src/components/ui/Dropdown/Dropdown.module.css
````css
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
 19:   border: 1px solid var(--border-color);
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
````

## File: src/components/ui/Button/Button.tsx
````typescript
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
````

## File: src/components/TreeItem.tsx
````typescript
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
````

## File: src/types/FileTypes.ts
````typescript
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
````

## File: src/components/ui/Button/Button.module.css
````css
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
````

## File: src/components/IgnorePatterns.module.css
````css
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
 13:   animation: fadeIn 0.25s ease-out;
 14: }
 15: 
 16: .content {
 17:   background-color: var(--background-primary);
 18:   border-radius: 1rem;
 19:   width: 90%;
 20:   max-width: 700px;
 21:   max-height: 85vh;
 22:   padding: 1.5rem;
 23:   box-shadow: var(--shadow-lg);
 24:   overflow-y: auto;
 25:   animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
 26:   border: 1px solid var(--border-color);
 27:   scrollbar-width: thin;
 28:   scrollbar-color: var(--border-color) transparent;
 29: }
 30: 
 31: .content::-webkit-scrollbar {
 32:   width: 8px;
 33: }
 34: 
 35: .content::-webkit-scrollbar-track {
 36:   background: transparent;
 37: }
 38: 
 39: .content::-webkit-scrollbar-thumb {
 40:   background-color: var(--border-color);
 41:   border-radius: 4px;
 42:   border: 2px solid var(--background-primary);
 43: }
 44: 
 45: .header {
 46:   display: flex;
 47:   justify-content: space-between;
 48:   align-items: center;
 49:   margin-bottom: 16px;
 50: }
 51: 
 52: .header h2 {
 53:   margin: 0;
 54:   font-size: 1.5rem;
 55:   color: var(--text-primary);
 56: }
 57: 
 58: .description {
 59:   margin-bottom: 16px;
 60:   font-size: 0.9rem;
 61:   color: var(--text-secondary);
 62:   line-height: 1.4;
 63: }
 64: 
 65: .scopeSelector {
 66:   display: flex;
 67:   margin-bottom: 12px;
 68:   border-bottom: 1px solid var(--border-color);
 69:   padding: 0 4px;
 70:   gap: 1px;
 71: }
 72: 
 73: .scopeBtn {
 74:   flex: 1;
 75:   border-radius: var(--radius) var(--radius) 0 0 !important;
 76:   font-size: 0.95rem !important;
 77:   padding: 10px 15px !important;
 78:   transition: all 0.15s ease-out;
 79: }
 80: 
 81: .scopeBtn:first-child {
 82:   border-top-right-radius: 0 !important;
 83: }
 84: 
 85: .scopeBtn:last-child {
 86:   border-top-left-radius: 0 !important;
 87: }
 88: 
 89: .scopeBtn:hover {
 90:   background-color: var(--hover-color);
 91:   opacity: 0.9;
 92: }
 93: 
 94: .scopeBtn.active {
 95:   font-weight: 500 !important;
 96:   position: relative;
 97: }
 98: 
 99: .scopeBtn.active::after {
100:   content: "";
101:   position: absolute;
102:   bottom: -1px;
103:   left: 0;
104:   width: 100%;
105:   height: 2px;
106:   background-color: var(--accent-color);
107: }
108: 
109: .scopeDescription {
110:   margin-bottom: 16px;
111:   font-size: 0.85rem;
112:   color: var(--text-secondary);
113:   padding: 0 8px;
114: }
115: 
116: .folderSelector {
117:   margin-bottom: 16px;
118: }
119: 
120: .folderSelector label {
121:   display: block;
122:   margin-bottom: 6px;
123:   font-size: 0.9rem;
124:   font-weight: 500;
125:   color: var(--text-primary);
126: }
127: 
128: .customSelect {
129:   position: relative;
130:   width: 100%;
131:   cursor: pointer;
132: }
133: 
134: .selectedValue {
135:   display: flex;
136:   justify-content: space-between;
137:   align-items: center;
138:   padding: 10px 12px;
139:   background-color: var(--background-secondary);
140:   border: 1px solid var(--border-color);
141:   border-radius: var(--radius);
142:   font-size: 0.9rem;
143:   transition: border-color 0.2s;
144: }
145: 
146: .selectedValue:hover {
147:   border-color: var(--accent-color);
148: }
149: 
150: .chevron {
151:   transition: transform 0.2s;
152: }
153: 
154: .chevron.open {
155:   transform: rotate(180deg);
156: }
157: 
158: .optionsContainer {
159:   position: absolute;
160:   top: 100%;
161:   left: 0;
162:   right: 0;
163:   background-color: var(--background-primary);
164:   border: 1px solid var(--border-color);
165:   border-radius: var(--radius);
166:   box-shadow: var(--shadow-md);
167:   z-index: var(--z-index-dropdown);
168:   max-height: 200px;
169:   overflow-y: auto;
170: }
171: 
172: .option {
173:   padding: 8px 12px;
174:   font-size: 0.9rem;
175:   cursor: pointer;
176: }
177: 
178: .option:hover {
179:   background-color: var(--hover-color);
180: }
181: 
182: .pathDisplay {
183:   margin-top: 4px;
184:   font-size: 0.8rem;
185:   color: var(--text-secondary);
186:   font-family: monospace;
187: }
188: 
189: .patternsSection {
190:   margin-bottom: 20px;
191: }
192: 
193: .patternsInput {
194:   width: 100%;
195:   height: 200px;
196:   font-family: monospace;
197:   font-size: 14px;
198:   padding: 12px;
199:   background-color: var(--background-primary);
200:   color: var(--text-primary);
201:   border: 1px solid var(--border-color);
202:   border-radius: var(--radius);
203:   resize: vertical;
204: }
205: 
206: .patternsInput:focus {
207:   outline: none;
208:   border-color: var(--accent-color);
209:   box-shadow: 0 0 0 1px var(--accent-color);
210: }
211: 
212: .patternComment {
213:   color: var(--text-secondary);
214: }
215: 
216: .patternsHelp {
217:   margin-top: 8px;
218:   font-size: 0.8rem;
219:   color: var(--text-secondary);
220: }
221: 
222: .patternsHelp p {
223:   margin: 4px 0;
224: }
225: 
226: .modalStatus {
227:   margin-bottom: 16px;
228:   min-height: 20px;
229: }
230: 
231: .unsaved {
232:   color: var(--warning-color);
233:   font-size: 0.85rem;
234: }
235: 
236: .modalActions {
237:   display: flex;
238:   justify-content: center;
239:   gap: 12px;
240:   margin-top: 24px;
241:   padding: 0 12px;
242: }
243: 
244: .modalActions button {
245:   min-width: 100px;
246: }
247: 
248: .destructiveIcon {
249:   color: var(--error-color);
250: }
251: 
252: /* We'll override these with our Button component */
253: 
254: .systemPatterns {
255:   margin-top: 16px;
256:   padding: 12px;
257:   background-color: var(--background-secondary);
258:   border: 1px solid var(--border-color);
259:   border-radius: var(--radius);
260: }
261: 
262: .systemPatterns h3 {
263:   margin: 0 0 12px 0;
264:   font-size: 1rem;
265:   color: var(--text-primary);
266: }
267: 
268: .systemPatternsList {
269:   display: flex;
270:   flex-direction: column;
271:   gap: 8px;
272:   max-height: 200px;
273:   overflow-y: auto;
274: }
275: 
276: .systemPatternItem {
277:   display: flex;
278:   justify-content: space-between;
279:   align-items: center;
280:   padding: 6px 12px;
281:   transition: all 0.15s ease;
282:   border-radius: 6px;
283:   margin: 3px 0;
284: }
285: 
286: .systemPatternItem:hover {
287:   background-color: var(--hover-color);
288: }
289: 
290: .toggleButton {
291:   display: flex;
292:   align-items: center;
293:   justify-content: center;
294:   padding: 4px;
295:   background: none;
296:   border: 1px solid var(--border-color);
297:   border-radius: var(--radius);
298:   color: var(--text-primary);
299:   cursor: pointer;
300:   transition: all 0.15s;
301: }
302: 
303: .toggleButton:hover {
304:   background-color: var(--hover-color);
305:   border-color: var(--accent-color);
306: }
307: 
308: .disabledPattern {
309:   color: var(--text-secondary);
310:   text-decoration: line-through;
311: }
312: 
313: .previewSection {
314:   margin-top: 24px;
315:   padding: 16px;
316:   background: var(--background-secondary);
317:   border-radius: 8px;
318:   border: 1px solid var(--border-color);
319:   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
320: }
321: 
322: .previewContainer {
323:   background-color: var(--background-secondary);
324:   border: 1px solid var(--border-color);
325:   border-radius: 8px;
326:   padding: 12px;
327:   max-height: 180px;
328:   overflow-y: auto;
329:   margin-top: 16px;
330:   font-family: monospace;
331:   font-size: 13px;
332:   box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
333:   scrollbar-width: thin;
334:   scrollbar-color: var(--border-color) transparent;
335: }
336: 
337: .previewContainer::-webkit-scrollbar {
338:   width: 8px;
339: }
340: 
341: .previewContainer::-webkit-scrollbar-track {
342:   background: transparent;
343: }
344: 
345: .previewContainer::-webkit-scrollbar-thumb {
346:   background-color: var(--border-color);
347:   border-radius: 4px;
348:   border: 2px solid var(--background-secondary);
349: }
350: 
351: .previewHeader {
352:   display: flex;
353:   justify-content: space-between;
354:   align-items: center;
355:   margin-bottom: 8px;
356:   font-weight: 500;
357:   font-size: 14px;
358:   padding: 0 4px;
359: }
360: 
361: .patternCount {
362:   font-size: 12px;
363:   color: var(--text-secondary);
364:   background-color: rgba(0, 0, 0, 0.05);
365:   padding: 2px 8px;
366:   border-radius: 10px;
367: }
368: 
369: .previewLine {
370:   padding: 4px 8px;
371:   border-radius: 4px;
372:   margin: 2px 0;
373:   position: relative;
374:   transition: background-color 0.15s ease;
375: }
376: 
377: .previewLine:hover {
378:   background-color: rgba(0, 0, 0, 0.05);
379: }
380: 
381: .previewSystem {
382:   color: var(--accent-color);
383: }
384: 
385: .previewGlobal {
386:   color: var(--text-primary);
387: }
388: 
389: .previewLocal {
390:   color: var(--success-color);
391: }
392: 
393: .previewBadge {
394:   display: inline-block;
395:   font-size: 10px;
396:   padding: 2px 6px;
397:   border-radius: 10px;
398:   margin-left: 8px;
399:   background-color: rgba(0, 0, 0, 0.05);
400:   color: var(--text-secondary);
401: }
402: 
403: .notification {
404:   position: fixed;
405:   bottom: 20px;
406:   right: 20px;
407:   padding: 12px 16px;
408:   border-radius: var(--radius);
409:   background-color: var(--background-primary);
410:   color: var(--text-primary);
411:   box-shadow: var(--shadow-md);
412:   transform: translateY(100%);
413:   opacity: 0;
414:   transition: transform 0.3s ease, opacity 0.3s ease;
415:   z-index: var(--z-index-modal);
416: }
417: 
418: .notification.visible {
419:   transform: translateY(0);
420:   opacity: 1;
421: }
422: 
423: .notification.success {
424:   border-left: 4px solid var(--success-color);
425: }
426: 
427: .notification.error {
428:   border-left: 4px solid var(--error-color);
429: }
430: 
431: @keyframes slideIn {
432:   from {
433:     transform: scaleX(0);
434:   }
435:   to {
436:     transform: scaleX(1);
437:   }
438: }
439: 
440: @keyframes fadeIn {
441:   from {
442:     opacity: 0;
443:   }
444:   to {
445:     opacity: 1;
446:   }
447: }
448: 
449: @keyframes slideUp {
450:   from {
451:     opacity: 0;
452:     transform: translateY(20px);
453:   }
454:   to {
455:     opacity: 1;
456:     transform: translateY(0);
457:   }
458: }
459: 
460: @keyframes togglePulse {
461:   0% { transform: scale(1); }
462:   50% { transform: scale(1.05); }
463:   100% { transform: scale(1); }
464: }
465: 
466: .patternCategory {
467:   margin-bottom: 12px;
468:   border: 1px solid var(--border-color);
469:   border-radius: 8px;
470:   overflow: hidden;
471:   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
472:   transition: box-shadow 0.2s ease;
473: }
474: 
475: .patternCategory:hover {
476:   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
477: }
478: 
479: .categoryHeader {
480:   display: flex;
481:   justify-content: space-between;
482:   align-items: center;
483:   padding: 12px 16px;
484:   cursor: pointer;
485:   border-radius: 8px;
486:   transition: all 0.15s ease;
487:   user-select: none;
488: }
489: 
490: .categoryHeader:hover {
491:   /* Remove hover background effect */
492: }
493: 
494: .categoryTitle {
495:   font-weight: 500;
496:   font-size: 14px;
497:   color: var(--text-primary);
498: }
499: 
500: .categoryMeta {
501:   display: flex;
502:   align-items: center;
503:   gap: 8px;
504: }
505: 
506: .categoryCount {
507:   font-size: 12px;
508:   color: var(--text-secondary);
509:   background-color: rgba(0, 0, 0, 0.05);
510:   padding: 2px 6px;
511:   border-radius: 10px;
512: }
513: 
514: .accordionIcon {
515:   transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
516:   position: relative;
517: }
518: 
519: .accordionIcon.rotated {
520:   transform: rotate(180deg);
521: }
522: 
523: .accordionIcon.rotated path:last-child {
524:   opacity: 0;
525:   transition: opacity 0.15s ease;
526: }
527: 
528: .accordionIcon path:last-child {
529:   transform-origin: center;
530:   transition: opacity 0.2s ease;
531: }
532: 
533: .chevron {
534:   transition: transform 0.3s ease;
535: }
536: 
537: .chevronRotated {
538:   transform: rotate(180deg);
539: }
540: 
541: .categoryItems {
542:   max-height: 0;
543:   overflow: hidden;
544:   transform: translateY(-10px);
545:   opacity: 0;
546:   transition: 
547:     max-height 0.25s cubic-bezier(0.4, 0.0, 0.2, 1), 
548:     padding 0.2s cubic-bezier(0.4, 0.0, 0.2, 1),
549:     opacity 0.15s ease,
550:     transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
551: }
552: 
553: .categoryExpanded .categoryItems {
554:   max-height: 2000px;
555:   transform: translateY(0);
556:   opacity: 1;
557:   transition: 
558:     max-height 0.35s cubic-bezier(0.4, 0.0, 0.2, 1), 
559:     padding 0.2s cubic-bezier(0.4, 0.0, 0.2, 1),
560:     opacity 0.2s ease,
561:     transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
562:   padding: 8px 12px;
563: }
564: 
565: .smallerSwitch {
566:   transform: scale(0.9);
567: }
568: 
569: .buttonGroup {
570:   display: flex;
571:   gap: 8px;
572:   margin-top: 16px;
573:   justify-content: center;
574: }
575: 
576: .previewContent {
577:   margin-top: 8px;
578:   padding: 12px;
579:   background: var(--background);
580:   border-radius: 4px;
581:   font-family: monospace;
582:   white-space: pre-wrap;
583:   max-height: 200px;
584:   overflow-y: auto;
585: }
586: 
587: .hint {
588:   color: var(--text-secondary);
589:   font-size: 0.9em;
590:   margin: 8px 0;
591: }
592: 
593: /* Additional animation for the toggle */
594: .patternToggled {
595:   animation: togglePulse 0.3s ease;
596: }
597: 
598: .sectionTitle {
599:   margin-bottom: 16px;
600:   font-size: 1.1rem;
601:   font-weight: 500;
602:   color: var(--text-primary);
603: }
604: 
605: .closeButton {
606:   padding: 6px !important;
607:   border-radius: 6px;
608:   display: flex;
609:   align-items: center;
610:   justify-content: center;
611:   color: var(--text-secondary);
612:   transition: all 0.15s ease;
613: }
614: 
615: .closeButton:hover {
616:   background-color: var(--hover-color);
617:   color: var(--text-primary);
618: }
````

## File: src/components/FileTreeHeader.module.css
````css
 1: .fileTreeHeader {
 2:   display: flex;
 3:   align-items: center;
 4:   gap: 0.5rem;
 5:   padding: 0.5rem;
 6:   background: var(--background-primary);
 7:   border-bottom: 1px solid var(--border-color);
 8:   height: 46px;
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
````

## File: src/styles/index.css
````css
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
````

## File: src/App.module.css
````css
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
 68:   padding: 0.5rem 1rem;
 69:   border-bottom: 1px solid var(--border-color);
 70:   background: var(--background-primary);
 71:   height: 46px;
 72:   position: sticky;
 73:   top: 0;
 74:   z-index: 10;
 75:   gap: 12px;
 76: }
 77: 
 78: .contentTitle {
 79:   display: none;
 80: }
 81: 
 82: .contentActions {
 83:   display: flex;
 84:   gap: 0.75rem;
 85:   align-items: center;
 86:   height: 32px;
 87:   margin-left: 0;
 88: }
 89: 
 90: .folderPathDisplay {
 91:   font-size: 0.875rem;
 92:   color: var(--text-secondary);
 93:   padding: 0 0.75rem;
 94:   height: 32px;
 95:   display: inline-flex;
 96:   align-items: center;
 97:   overflow: hidden;
 98:   text-overflow: ellipsis;
 99:   white-space: nowrap;
100:   flex: 1;
101:   min-width: 0;
102:   font-family: var(--font-mono, monospace);
103: }
104: 
105: .pathLabel {
106:   color: var(--text-primary);
107:   margin-right: 0.5rem;
108:   font-weight: 500;
109:   font-family: var(--font-sans, Courier);
110: }
111: 
112: .fileStats {
113:   font-size: 0.875rem;
114:   color: var(--text-secondary);
115:   padding: 0 0.75rem;
116:   height: 32px;
117:   display: flex;
118:   align-items: center;
119:   white-space: nowrap;
120:   flex-shrink: 0;
121: }
122: 
123: .fileStats span {
124:   color: var(--text-primary);
125:   font-weight: 500;
126:   margin: 0 0.15rem;
127: }
128: 
129: .appHeader {
130:   display: flex;
131:   justify-content: space-between;
132:   align-items: center;
133:   padding: 0.5rem 1rem;
134:   background-color: var(--background-secondary);
135:   border-bottom: 1px solid var(--border-color);
136: }
137: 
138: .headerActions {
139:   display: flex;
140:   align-items: center;
141:   gap: 0.5rem;
142: }
143: 
144: .headerLink {
145:   color: var(--text-primary);
146:   text-decoration: none;
147:   transition: color 0.2s;
148: }
149: 
150: .headerLink:hover {
151:   color: var(--accent-color);
152: }
153: 
154: .headerSeparator {
155:   width: 1px;
156:   height: 24px;
157:   background-color: var(--border-color);
158:   margin: 0 0.75rem;
159:   opacity: 0.6;
160: }
161: 
162: .githubButton {
163:   display: flex;
164:   align-items: center;
165:   gap: 0.5rem;
166:   padding: 0.5rem;
167:   border-radius: var(--radius);
168:   text-decoration: none;
169:   color: var(--accent-color);
170:   transition: color 0.2s;
171: }
172: 
173: .githubButton:hover {
174:   color: var(--text-primary);
175: }
176: 
177: .treeEmpty {
178:   display: flex;
179:   flex-direction: column;
180:   align-items: center;
181:   justify-content: center;
182:   padding: 2rem;
183:   text-align: center;
184:   color: var(--text-secondary);
185: }
186: 
187: .treeLoading {
188:   display: flex;
189:   flex-direction: column;
190:   align-items: center;
191:   justify-content: center;
192:   padding: 2rem;
193:   text-align: center;
194:   color: var(--text-secondary);
195: }
196: 
197: .spinner {
198:   border: 3px solid rgba(0, 0, 0, 0.1);
199:   border-top: 3px solid var(--accent-color);
200:   border-radius: 50%;
201:   width: 20px;
202:   height: 20px;
203:   animation: spin 1s linear infinite;
204:   margin-bottom: 1rem;
205: }
206: 
207: .processingIndicator {
208:   display: flex;
209:   align-items: center;
210:   justify-content: center;
211:   gap: 0.5rem;
212:   padding: 0.5rem;
213:   background-color: var(--background-secondary);
214:   color: var(--text-secondary);
215:   font-size: 0.9rem;
216: }
217: 
218: .errorMessage {
219:   padding: 0.5rem 1rem;
220:   background-color: var(--error-color);
221:   color: white;
222:   font-size: 0.9rem;
223: }
224: 
225: .userInstructionsContainer {
226:   margin-top: 1rem;
227: }
228: 
229: .emptyStateContent {
230:   display: flex;
231:   flex-direction: column;
232:   align-items: center;
233:   justify-content: center;
234:   padding: 2rem;
235:   text-align: center;
236: }
237: 
238: .emptyStateContent h2 {
239:   margin-bottom: 1rem;
240: }
241: 
242: .emptyStateContent ul {
243:   text-align: left;
244:   margin-top: 1rem;
245: }
246: 
247: @keyframes spin {
248:   0% { transform: rotate(0deg); }
249:   100% { transform: rotate(360deg); }
250: }
251: 
252: @keyframes dropdownFadeIn {
253:   from {
254:     opacity: 0;
255:     transform: translateY(-8px);
256:   }
257:   to {
258:     opacity: 1;
259:     transform: translateY(0);
260:   }
261: }
262: 
263: @keyframes tooltipFadeIn {
264:   from {
265:     opacity: 0;
266:     transform: translateY(-4px);
267:   }
268:   to {
269:     opacity: 1;
270:     transform: translateY(0);
271:   }
272: }
````

## File: src/components/ControlContainer.tsx
````typescript
  1: import React, { useState, useCallback } from 'react'; // Import useCallback
  2: import { FileTreeMode } from '../types/FileTypes';
  3: import { OutputFormatType, OUTPUT_FORMAT_OPTIONS } from '../constants/outputFormats';
  4: import { Switch, Button, ButtonGroup } from './ui';
  5: import { Copy, Download, Check, Loader2, FileText, Code, FileJson } from 'lucide-react'; // Added FileText, Code, FileJson
  6: import styles from './ControlContainer.module.css';
  7: import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/DropdownMenu';
  8: 
  9: interface ControlContainerProps {
 10:   fileTreeMode: FileTreeMode;
 11:   setFileTreeMode: (mode: FileTreeMode) => void;
 12:   showUserInstructions: boolean;
 13:   setShowUserInstructions: (show: boolean) => void;
 14:   getSelectedFilesContent: () => Promise<string>; // Make async
 15:   selectedFilesCount: number;
 16:   outputFormat: OutputFormatType;
 17:   setOutputFormat: (format: OutputFormatType) => void;
 18:   // Removed unused props (previously prefixed with _)
 19: }
 20: 
 21: const ControlContainer: React.FC<ControlContainerProps> = ({
 22:   fileTreeMode,
 23:   setFileTreeMode,
 24:   showUserInstructions,
 25:   setShowUserInstructions,
 26:   getSelectedFilesContent,
 27:   selectedFilesCount,
 28:   outputFormat,
 29:   setOutputFormat,
 30: }) => {
 31:   const [copied, setCopied] = useState(false);
 32:   const [isCopying, setIsCopying] = useState(false); // Add loading state for copy
 33:   const [isDownloading, setIsDownloading] = useState(false); // Add loading state for download
 34: 
 35:   const handleCopy = useCallback(async () => {
 36:     if (selectedFilesCount === 0 || isCopying) return;
 37:     setIsCopying(true);
 38:     setCopied(false); // Reset copied state
 39:     try {
 40:       const content = await getSelectedFilesContent(); // Await the async function
 41:       await navigator.clipboard.writeText(content);
 42:       setCopied(true);
 43:       setTimeout(() => setCopied(false), 2000);
 44:     } catch (err) {
 45:       console.error('Failed to copy:', err);
 46:       // TODO: Show user error feedback
 47:     } finally {
 48:       setIsCopying(false);
 49:     }
 50:   }, [getSelectedFilesContent, selectedFilesCount, isCopying]); // Add dependencies
 51: 
 52:   const handleDownload = useCallback(async () => {
 53:     if (selectedFilesCount === 0 || isDownloading) return;
 54:     setIsDownloading(true);
 55:     try {
 56:         const content = await getSelectedFilesContent(); // Await the async function
 57:         const blob = new Blob([content], { type: 'text/plain;charset=utf-8' }); // Specify charset
 58:         const url = URL.createObjectURL(blob);
 59:         const a = document.createElement('a');
 60:         a.href = url;
 61:         // Generate filename based on current context if possible
 62:         const filename = `pastemax_output_${new Date().toISOString().split('T')[0]}.txt`;
 63:         a.download = filename;
 64:         document.body.appendChild(a);
 65:         a.click();
 66:         document.body.removeChild(a);
 67:         URL.revokeObjectURL(url);
 68:     } catch (err) {
 69:         console.error('Failed to download:', err);
 70:         // TODO: Show user error feedback
 71:     } finally {
 72:         setIsDownloading(false);
 73:     }
 74:   }, [getSelectedFilesContent, selectedFilesCount, isDownloading]); // Add dependencies
 75: 
 76:   // Get icon based on format
 77:   const getFormatIcon = (format: OutputFormatType) => {
 78:     switch (format) {
 79:       case 'xml':
 80:         return <FileJson size={16} className="opacity-60" />;
 81:       case 'markdown':
 82:         return <FileText size={16} className="opacity-60" />;
 83:       case 'plain':
 84:         return <Code size={16} className="opacity-60" />;
 85:       default:
 86:         return null;
 87:     }
 88:   };
 89: 
 90:   return (
 91:     <div className={styles.controlContainer}>
 92:       <div className={styles.controlContainerHeader}>Controls</div>
 93:       <div className={styles.controlItems}>
 94:         {/* Display Options Group */}
 95:         <div className={styles.controlGroup}>
 96:           <div className={styles.controlGroupTitle}>Display Options</div>
 97:           <div className={styles.controlItem}>
 98:             <Switch checked={showUserInstructions} onChange={() => setShowUserInstructions(!showUserInstructions)} label="Show User Instructions" id="user-instructions-toggle" />
 99:           </div>
100:           <div className={styles.controlItem}>
101:             <label className={styles.controlSelectLabel} htmlFor="file-tree-mode">File Tree:</label>
102:             <select id="file-tree-mode" value={fileTreeMode} onChange={(e) => setFileTreeMode(e.target.value as FileTreeMode)} className={styles.controlSelect}>
103:               <option value="none">None</option>
104:               <option value="selected">Selected Files Only</option>
105:               <option value="selected-with-roots">Selected Files with Path</option>
106:               <option value="complete">Complete Tree (Mark Selected)</option>
107:             </select>
108:           </div>
109:         </div>
110: 
111:         {/* Output Format Group */}
112:         <div className={styles.controlGroup}>
113:           <div className={styles.controlGroupTitle}>Output Format</div>
114:           <div className={styles.controlItem}>
115:             <DropdownMenu>
116:               <DropdownMenuTrigger>
117:                 <Button variant="outline" size="sm">
118:                   {outputFormat.toUpperCase()}
119:                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down opacity-60 ml-2"><path d="m6 9 6 6 6-6"></path></svg>
120:                 </Button>
121:               </DropdownMenuTrigger>
122:               <DropdownMenuContent align="start" side="bottom">
123:                 {OUTPUT_FORMAT_OPTIONS.map((option) => (
124:                   <DropdownMenuItem
125:                     key={option.value}
126:                     onSelect={() => setOutputFormat(option.value as OutputFormatType)}
127:                     icon={getFormatIcon(option.value as OutputFormatType)}
128:                   >
129:                     {option.label}
130:                   </DropdownMenuItem>
131:                 ))}
132:               </DropdownMenuContent>
133:             </DropdownMenu>
134:           </div>
135:         </div>
136: 
137:         {/* Output Options Group */}
138:         <div className={styles.controlGroup}>
139:           <div className={styles.controlGroupTitle}>Output</div>
140:           <div className={styles.controlItem}>
141:             <ButtonGroup size="sm">
142:               <Button
143:                 variant="secondary"
144:                 onClick={handleCopy}
145:                 startIcon={isCopying ? <Loader2 size={16} className="animate-spin" /> : copied ? <Check size={16} /> : <Copy size={16} />}
146:                 disabled={selectedFilesCount === 0 || isCopying || isDownloading}
147:                 title={isCopying ? "Copying..." : copied ? "Copied!" : `Copy ${selectedFilesCount} selected files to clipboard`}
148:               >
149:                 {isCopying ? 'Copying...' : copied ? 'Copied!' : `Copy (${selectedFilesCount})`}
150:               </Button>
151:               <Button
152:                 variant="secondary"
153:                 onClick={handleDownload}
154:                 startIcon={isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
155:                 disabled={selectedFilesCount === 0 || isCopying || isDownloading}
156:                 title={isDownloading ? "Saving..." : "Save selected files content"}
157:               >
158:                 {isDownloading ? 'Saving...' : 'Save'}
159:               </Button>
160:             </ButtonGroup>
161:           </div>
162:         </div>
163:       </div>
164:     </div>
165:   );
166: };
167: 
168: export default ControlContainer;
````

## File: src/components/FileTreeHeader.tsx
````typescript
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
````

## File: src/components/IgnorePatterns.tsx
````typescript
  1: import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
  2: import { ChevronDown, Plus, X } from "lucide-react";
  3: import { Button, Switch } from "./ui";
  4: import { ErrorBoundary } from './ErrorBoundary';
  5: import styles from "./IgnorePatterns.module.css";
  6: import { SYSTEM_PATTERN_CATEGORIES, IgnorePatternsState } from "../utils/patternUtils";
  7: 
  8: // Props interface - Updated
  9: interface IgnorePatternsProps {
 10:   isOpen: boolean;
 11:   onClose: () => void;
 12:   // Pass the full state objects
 13:   globalPatternsState: IgnorePatternsState;
 14:   localPatternsState: IgnorePatternsState; // Only 'patterns' part is relevant here
 15:   localFolderPath?: string;
 16:   processingStatus?: {
 17:     status: "idle" | "processing" | "complete" | "error";
 18:     message: string;
 19:   };
 20:   // Callbacks to App.tsx
 21:   saveIgnorePatterns: (patterns: string, isGlobal: boolean, folderPath?: string) => Promise<void>;
 22:   resetIgnorePatterns: (isGlobal: boolean, folderPath?: string) => Promise<void>;
 23:   clearIgnorePatterns: (folderPath: string) => Promise<void>;
 24:   // For controlling excluded system patterns
 25:   onExcludedSystemPatternsChange: (patterns: string[]) => void;
 26:   systemIgnorePatterns: string[]; // Full list of available system patterns
 27:   recentFolders: string[];
 28: }
 29: 
 30: // Custom error for pattern validation
 31: class PatternValidationError extends Error {
 32:  constructor(message: string) {
 33:   super(message);
 34:   this.name = 'PatternValidationError';
 35:  }
 36: }
 37: 
 38: // Validates a glob pattern for syntax errors
 39: const validatePattern = (pattern: string): boolean => {
 40:   if (!pattern.trim()) {
 41:    throw new PatternValidationError(`Invalid pattern: Pattern cannot be empty`);
 42:   }
 43:   return true;
 44: };
 45: 
 46: 
 47: const IgnorePatternsWithErrorBoundary: React.FC<IgnorePatternsProps> = (props) => (
 48:   <ErrorBoundary fallback={ <div>Error loading ignore patterns component.</div> }>
 49:     <IgnorePatterns {...props} />
 50:   </ErrorBoundary>
 51: );
 52: 
 53: const IgnorePatterns: React.FC<IgnorePatternsProps> = ({
 54:   isOpen,
 55:   onClose,
 56:   globalPatternsState, // Now an object { patterns, excludedSystemPatterns }
 57:   localPatternsState,  // Now an object { patterns, excludedSystemPatterns } (but we only use patterns)
 58:   localFolderPath,
 59:   processingStatus = { status: "idle", message: "" },
 60:   saveIgnorePatterns,
 61:   resetIgnorePatterns,
 62:   clearIgnorePatterns,
 63:   onExcludedSystemPatternsChange,
 64:   systemIgnorePatterns,
 65:   recentFolders,
 66: }) => {
 67:   /**
 68:    * Component State Management
 69:    */
 70:   const isInitialized = useRef(false);
 71: 
 72:   // Use safe initializers for useState, relying on useEffect for sync
 73:   const [currentGlobalPatterns, setCurrentGlobalPatterns] = useState<string>('');
 74:   const [currentLocalPatterns, setCurrentLocalPatterns] = useState<string>('');
 75:   const [mergedPreview, setMergedPreview] = useState<string>("");
 76:   const [activeTab, setActiveTab] = useState<"global" | "local">("global");
 77:   const [selectedFolder, setSelectedFolder] = useState<string | undefined>(localFolderPath);
 78:   const [applyingPatterns, setApplyingPatterns] = useState<boolean>(false);
 79:   const [folderSelectOpen, setFolderSelectOpen] = useState(false);
 80:   const [actualPatternCount, setActualPatternCount] = useState<number>(0);
 81: 
 82:   // Derive excluded patterns directly from props for controlled behavior
 83:   // Add safe fallback for initial render if globalPatternsState is somehow undefined briefly
 84:   const excludedSystemPatterns = useMemo(() => globalPatternsState?.excludedSystemPatterns || [], [globalPatternsState]);
 85: 
 86:   // Initialize with all categories collapsed
 87:   const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
 88:     Object.keys(SYSTEM_PATTERN_CATEGORIES).reduce((acc, category) => ({ ...acc, [category]: false }), {})
 89:   );
 90:   const textareaRef = useRef<HTMLTextAreaElement>(null);
 91: 
 92:   /**
 93:    * Sync internal state with props when modal opens or props change
 94:    */
 95:   useEffect(() => {
 96:     if (isOpen) {
 97:       // Safely access props, providing defaults if undefined during initial render cycle
 98:       setCurrentGlobalPatterns(globalPatternsState?.patterns ?? '');
 99:       if (selectedFolder === localFolderPath) {
100:           setCurrentLocalPatterns(localPatternsState?.patterns ?? '');
101:       } else if (!isInitialized.current) {
102:           setCurrentLocalPatterns(''); // Start fresh if different folder on init
103:       }
104:       setSelectedFolder(localFolderPath); // Sync selected folder
105:       setApplyingPatterns(processingStatus.status === 'processing');
106: 
107:       if (!isInitialized.current) {
108:         isInitialized.current = true;
109:       }
110:     } else {
111:       // Reset init flag when closed
112:       isInitialized.current = false;
113:     }
114:   }, [isOpen, globalPatternsState, localPatternsState, localFolderPath, processingStatus, selectedFolder]); // Ensure all relevant props are dependencies
115: 
116: 
117:   // Generate merged preview - depends on local edits and props
118:   useEffect(() => {
119:     const userPatterns = activeTab === "global" ? currentGlobalPatterns : currentLocalPatterns;
120:     
121:     // Start with an empty array for our preview lines
122:     const previewLines: string[] = [];
123:     // Keep track of actual patterns for accurate counting
124:     const actualPatterns: string[] = [];
125: 
126:     if (activeTab === "global") {
127:       // For global tab, show active system patterns first
128:       const safeExcluded = Array.isArray(excludedSystemPatterns) ? excludedSystemPatterns : [];
129:       const activeSystemPatterns = systemIgnorePatterns
130:         .filter(pattern => !safeExcluded.includes(pattern));
131:         
132:       if (activeSystemPatterns.length > 0) {
133:         previewLines.push("# Active System Patterns:");
134:         activeSystemPatterns.forEach(pattern => {
135:           previewLines.push(`${pattern} (from system)`);
136:           actualPatterns.push(pattern);
137:         });
138:       }
139: 
140:       // Then show user patterns
141:       const userPatternLines = userPatterns.split("\n").filter(line => line.trim() !== "");
142:       if (userPatternLines.length > 0) {
143:         if (previewLines.length > 0) previewLines.push("");
144:         previewLines.push("# User Patterns:");
145:         userPatternLines.forEach(pattern => {
146:           previewLines.push(`${pattern} (custom)`);
147:           actualPatterns.push(pattern);
148:         });
149:       }
150:     } else {
151:       // For local tab, only show local patterns
152:       const userPatternLines = userPatterns.split("\n").filter(line => line.trim() !== "");
153:       if (userPatternLines.length > 0) {
154:         previewLines.push("# Local Patterns:");
155:         userPatternLines.forEach(pattern => {
156:           previewLines.push(`${pattern} (local)`);
157:           actualPatterns.push(pattern);
158:         });
159:       }
160:     }
161: 
162:     // Store the actual pattern count for display
163:     setMergedPreview(previewLines.join("\n"));
164:     // Store the count in a ref or state if needed
165:     setActualPatternCount(actualPatterns.length);
166:   }, [activeTab, currentGlobalPatterns, currentLocalPatterns, systemIgnorePatterns, excludedSystemPatterns]);
167: 
168:   /**
169:    * Event Handlers
170:    */
171:   const handleTabChange = (isGlobal: boolean) => setActiveTab(isGlobal ? "global" : "local");
172: 
173:   const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
174:     const { value } = e.target;
175:     if (activeTab === 'global') setCurrentGlobalPatterns(value);
176:     else setCurrentLocalPatterns(value);
177:   };
178: 
179:   const handleFolderChange = (folderPath: string) => {
180:     setSelectedFolder(folderPath);
181:     setFolderSelectOpen(false);
182:     if (folderPath === localFolderPath) {
183:        // Safely access patterns from prop state
184:        setCurrentLocalPatterns(localPatternsState?.patterns ?? '');
185:     } else {
186:        setCurrentLocalPatterns('');
187:        console.warn("Selecting a different folder than the App's current one. Local patterns shown are temporary until saved for that specific folder.");
188:     }
189:   };
190: 
191:   const toggleCategory = (category: string) => {
192:     setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
193:   };
194: 
195:   // System pattern management - Calls the callback prop
196:   const handleToggleSystemPattern = useCallback((pattern: string) => {
197:     try {
198:       validatePattern(pattern);
199:        // Ensure excludedSystemPatterns is an array before operating on it
200:       const safeExcluded = Array.isArray(excludedSystemPatterns) ? excludedSystemPatterns : [];
201:       const newExcluded = safeExcluded.includes(pattern)
202:         ? safeExcluded.filter(p => p !== pattern)
203:         : [...safeExcluded, pattern];
204:       onExcludedSystemPatternsChange(newExcluded); // Update App state
205: 
206:       // Visual feedback (optional)
207:       const patternElement = document.querySelector(`[data-pattern="${pattern}"]`);
208:       if (patternElement) {
209:         patternElement.classList.add(styles.patternToggled);
210:         setTimeout(() => patternElement.classList.remove(styles.patternToggled), 300);
211:       }
212:     } catch (error) {
213:       console.error('Error toggling pattern:', error);
214:       if (error instanceof PatternValidationError) console.warn('Pattern validation failed:', error.message);
215:     }
216:   }, [excludedSystemPatterns, onExcludedSystemPatternsChange]); // Use derived excludedSystemPatterns
217: 
218:   // Pattern saving handlers - Use current local edits + props
219:   const handleSaveGlobalPatterns = useCallback(async () => {
220:     try {
221:       setApplyingPatterns(true);
222:       const userPatterns = currentGlobalPatterns.split('\n').filter(p => p.trim());
223:       userPatterns.forEach(validatePattern);
224: 
225:       // Format disabled patterns using the derived prop value
226:       const safeExcluded = Array.isArray(excludedSystemPatterns) ? excludedSystemPatterns : [];
227:       
228:       // Format disabled patterns section - each disabled pattern on its own line
229:       const disabledPatternsSection = safeExcluded
230:         .map(pattern => `# DISABLED: ${pattern}`)
231:         .join('\n');
232: 
233:       // Add user patterns with proper header
234:       let formattedContent = '';
235:       
236:       // Add the disabled patterns first
237:       if (disabledPatternsSection) {
238:         formattedContent += disabledPatternsSection + '\n\n';
239:       }
240:       
241:       // Then add user patterns with header
242:       if (currentGlobalPatterns.trim()) {
243:         formattedContent += '# USER PATTERNS:\n' + currentGlobalPatterns.trim();
244:       }
245: 
246:       await saveIgnorePatterns(formattedContent, true);
247:       setApplyingPatterns(false);
248:     } catch (error) {
249:       console.error('Error saving global patterns:', error);
250:       setApplyingPatterns(false);
251:     }
252:   }, [currentGlobalPatterns, excludedSystemPatterns, saveIgnorePatterns]);
253: 
254:   const handleSaveLocalPatterns = useCallback(async () => {
255:     try {
256:       if (!selectedFolder) {
257:         throw new Error('No folder selected for local patterns');
258:       }
259:       setApplyingPatterns(true);
260:       await saveIgnorePatterns(currentLocalPatterns, false, selectedFolder);
261:       setApplyingPatterns(false);
262:     } catch (error) {
263:       console.error('Error saving local patterns:', error);
264:       setApplyingPatterns(false);
265:     }
266:   }, [currentLocalPatterns, selectedFolder, saveIgnorePatterns]);
267: 
268:   const handleSave = useCallback(async () => {
269:     if (activeTab === 'global') {
270:       await handleSaveGlobalPatterns();
271:     } else {
272:       await handleSaveLocalPatterns();
273:     }
274:   }, [activeTab, handleSaveGlobalPatterns, handleSaveLocalPatterns]);
275: 
276:   // Keyboard shortcuts
277:   useEffect(() => {
278:     const handleKeyDown = (e: KeyboardEvent) => {
279:       if ((e.ctrlKey || e.metaKey) && e.key === 's') {
280:         e.preventDefault();
281:         handleSave();
282:       }
283:     };
284:     document.addEventListener('keydown', handleKeyDown);
285:     return () => document.removeEventListener('keydown', handleKeyDown);
286:   }, [handleSave]);
287: 
288:   const handleClearLocal = useCallback(async () => {
289:     try {
290:       if (!selectedFolder) {
291:         throw new Error('No folder selected for local patterns');
292:       }
293:       setApplyingPatterns(true);
294:       await clearIgnorePatterns(selectedFolder);
295:       setCurrentLocalPatterns(''); // Clear the textarea
296:       setApplyingPatterns(false);
297:     } catch (error) {
298:       console.error('Error clearing local patterns:', error);
299:       setApplyingPatterns(false);
300:     }
301:   }, [selectedFolder, clearIgnorePatterns]);
302: 
303:   const handleResetLocal = useCallback(async () => {
304:     try {
305:       if (!selectedFolder) {
306:         throw new Error('No folder selected for local patterns');
307:       }
308:       setApplyingPatterns(true);
309:       await resetIgnorePatterns(false, selectedFolder);
310:       // The patterns will be reloaded via the patterns-loaded event handler
311:       setApplyingPatterns(false);
312:     } catch (error) {
313:       console.error('Error resetting local patterns:', error);
314:       setApplyingPatterns(false);
315:     }
316:   }, [selectedFolder, resetIgnorePatterns]);
317: 
318:   // Add explanation tooltips for the buttons
319:   const buttonTooltips = {
320:     save: 'Save current patterns',
321:     reset: 'Reset to last saved patterns',
322:     clear: 'Remove all patterns',
323:     cancel: 'Discard changes'
324:   };
325: 
326:   // --- Render ---
327:   if (!isOpen) return null;
328: 
329:   return (
330:     <div className={styles.modal} onClick={(e) => {
331:       if (e.target === e.currentTarget) onClose();
332:     }}>
333:       <div className={styles.content}>
334:         <div className={styles.header}>
335:           <h2>
336:             Ignore Patterns
337:             {applyingPatterns && <span className={styles.applying}>(Applying...)</span>}
338:           </h2>
339:           <Button 
340:             variant="ghost" 
341:             size="sm" 
342:             onClick={onClose} 
343:             aria-label="Close" 
344:             disabled={applyingPatterns}
345:             className={styles.closeButton}
346:           >
347:             <X size={16} />
348:           </Button>
349:         </div>
350: 
351:         <div className={styles.description}>
352:             Manage patterns to exclude files from processing. Global patterns apply everywhere, local patterns apply only to the selected folder. System patterns can be toggled on/off globally.
353:         </div>
354: 
355:         {/* Scope Selector (Tabs) */}
356:         <div className={styles.scopeSelector}>
357:             <Button variant={activeTab === "global" ? "secondary" : "ghost"} className={`${styles.scopeBtn} ${activeTab === "global" ? styles.active : ""}`} onClick={() => handleTabChange(true)} disabled={applyingPatterns}> Global </Button>
358:             <Button variant={activeTab === "local" ? "secondary" : "ghost"} className={`${styles.scopeBtn} ${activeTab === "local" ? styles.active : ""}`} onClick={() => handleTabChange(false)} disabled={applyingPatterns}> Local Folder </Button>
359:         </div>
360: 
361:         {/* Global Tab Content */}
362:         {activeTab === "global" && (
363:           <>
364:             {/* System Patterns Section */}
365:             <div className={styles.systemPatternsSection}>
366:               {/* Ensure excludedSystemPatterns is array before calculating length */}
367:               <h3 className={styles.sectionTitle}> System Defaults ({systemIgnorePatterns.length - (Array.isArray(excludedSystemPatterns) ? excludedSystemPatterns.length : 0)} active) </h3>
368:                {Object.entries(SYSTEM_PATTERN_CATEGORIES).map(([category, patternsInCategory]) => { // Renamed variable
369:                     // Ensure excludedSystemPatterns is array before filtering
370:                     const safeExcluded = Array.isArray(excludedSystemPatterns) ? excludedSystemPatterns : [];
371:                     // Filter patterns from the *main* system list that belong to this category
372:                     const categoryPatterns = systemIgnorePatterns.filter(p => patternsInCategory.includes(p));
373:                     if (categoryPatterns.length === 0) return null; // Skip empty categories
374:                     const enabledInCategory = categoryPatterns.filter(p => !safeExcluded.includes(p)).length;
375: 
376:                     return (
377:                         <div key={category} className={`${styles.patternCategory} ${expandedCategories[category] ? styles.categoryExpanded : ''}`}>
378:                           <div className={styles.categoryHeader} onClick={() => toggleCategory(category)}>
379:                             <div className={styles.categoryTitle}> {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} </div>
380:                             <div className={styles.categoryMeta}>
381:                               <span className={styles.categoryCount}> {enabledInCategory}/{categoryPatterns.length} </span>
382:                               <Plus 
383:                                 size={16} 
384:                                 className={`${styles.accordionIcon} ${expandedCategories[category] ? styles.rotated : ''}`} 
385:                               />
386:                             </div>
387:                           </div>
388:                           {expandedCategories[category] && (
389:                             <div className={styles.categoryItems}>
390:                               {categoryPatterns.map(pattern => {
391:                                 // Ensure excludedSystemPatterns is array before checking includes
392:                                 const safeExcludedInner = Array.isArray(excludedSystemPatterns) ? excludedSystemPatterns : [];
393:                                 const isEnabled = !safeExcludedInner.includes(pattern);
394:                                 return (
395:                                   <div key={pattern} className={`${styles.systemPatternItem} ${isEnabled ? '' : styles.disabledPattern}`} data-pattern={pattern}>
396:                                     <span className={styles.patternText} title={pattern}>{pattern}</span>
397:                                     <Switch
398:                                         checked={isEnabled}
399:                                         onChange={() => handleToggleSystemPattern(pattern)}
400:                                         className={styles.smallerSwitch}
401:                                         id={`switch-${pattern}-${category}`} // Make ID more unique
402:                                         aria-label={pattern} // Use pattern as label
403:                                     />
404:                                   </div>
405:                                 );
406:                               })}
407:                             </div>
408:                           )}
409:                         </div>
410:                     );
411:                 })}
412:             </div>
413: 
414:             {/* Global Custom Patterns Section */}
415:             <div className={styles.patternEntrySection}>
416:                 <h3 className={styles.sectionTitle}> Global Custom Patterns </h3>
417:                 <textarea ref={textareaRef} className={styles.patternsInput} value={currentGlobalPatterns} onChange={handleTextareaChange} placeholder="Enter global ignore patterns..." disabled={applyingPatterns} />
418:                 <div className={styles.buttonGroup}>
419:                   <Button
420:                     variant="secondary"
421:                     size="sm"
422:                     onClick={() => resetIgnorePatterns(true)}
423:                     disabled={applyingPatterns}
424:                     title={buttonTooltips.reset}
425:                   >
426:                     Reset Global
427:                   </Button>
428:                   <Button
429:                     variant="secondary"
430:                     size="sm"
431:                     onClick={() => {
432:                       setCurrentGlobalPatterns('');
433:                       onExcludedSystemPatternsChange([]);
434:                     }}
435:                     disabled={applyingPatterns}
436:                     title={buttonTooltips.clear}
437:                   >
438:                     Clear Global
439:                   </Button>
440:                   <Button
441:                     variant="ghost"
442:                     size="sm"
443:                     onClick={onClose}
444:                     disabled={applyingPatterns}
445:                     title={buttonTooltips.cancel}
446:                   >
447:                     Cancel
448:                   </Button>
449:                   <Button
450:                     variant="primary"
451:                     size="sm"
452:                     onClick={handleSaveGlobalPatterns}
453:                     disabled={applyingPatterns}
454:                     title={buttonTooltips.save}
455:                   >
456:                     {applyingPatterns ? 'Saving...' : 'Save'}
457:                   </Button>
458:                 </div>
459:             </div>
460:           </>
461:         )}
462: 
463:         {/* Local Tab Content */}
464:         {activeTab === "local" && (
465:             <div className={styles.patternEntrySection}>
466:                 <h3 className={styles.sectionTitle}> Local Custom Patterns </h3>
467:                 <div className={styles.folderSelector}>
468:                     <label htmlFor="folder-select-dropdown">Select Folder</label>
469:                     <div id="folder-select-dropdown" className={styles.customSelect} onClick={() => !applyingPatterns && setFolderSelectOpen(!folderSelectOpen)} aria-haspopup="listbox">
470:                         <div className={styles.selectedValue} role="button" aria-expanded={folderSelectOpen}>
471:                             {selectedFolder || 'Select a folder'}
472:                             <ChevronDown size={16} className={`${styles.chevron} ${folderSelectOpen ? styles.open : ''}`} />
473:                         </div>
474:                         {folderSelectOpen && (
475:                         <div className={styles.optionsContainer} role="listbox">
476:                             {recentFolders.length > 0 ? (
477:                             recentFolders.map((folder, index) => (
478:                                 <div key={index} className={styles.option} onClick={() => handleFolderChange(folder)} role="option" aria-selected={folder === selectedFolder}> {folder} </div>
479:                             ))
480:                             ) : (
481:                             <div className={styles.option} role="option" aria-disabled="true"> {selectedFolder || 'No recent folders'} </div>
482:                             )}
483:                         </div>
484:                         )}
485:                     </div>
486:                     <div className={styles.pathDisplay}> Path: {selectedFolder ? `${selectedFolder}/.repo_ignore` : 'N/A'} </div>
487:                 </div>
488:                 <textarea ref={textareaRef} className={styles.patternsInput} value={currentLocalPatterns} onChange={handleTextareaChange} placeholder="Enter local ignore patterns..." disabled={applyingPatterns || !selectedFolder} />
489:                 <div className={styles.buttonGroup}>
490:                   <Button
491:                     variant="secondary"
492:                     size="sm"
493:                     onClick={handleResetLocal}
494:                     disabled={applyingPatterns || !selectedFolder}
495:                     title={buttonTooltips.reset}
496:                   >
497:                     Reset Local
498:                   </Button>
499:                   <Button
500:                     variant="secondary"
501:                     size="sm"
502:                     onClick={handleClearLocal}
503:                     disabled={applyingPatterns || !selectedFolder}
504:                     title={buttonTooltips.clear}
505:                   >
506:                     Clear Local
507:                   </Button>
508:                   <Button
509:                     variant="ghost"
510:                     size="sm"
511:                     onClick={onClose}
512:                     disabled={applyingPatterns}
513:                     title={buttonTooltips.cancel}
514:                   >
515:                     Cancel
516:                   </Button>
517:                   <Button
518:                     variant="primary"
519:                     size="sm"
520:                     onClick={handleSave}
521:                     disabled={applyingPatterns || !selectedFolder}
522:                     title={buttonTooltips.save}
523:                   >
524:                     {applyingPatterns ? 'Saving...' : 'Save'}
525:                   </Button>
526:                 </div>
527:             </div>
528:         )}
529: 
530:         {/* Preview Section (Always visible) */}
531:         <div className={styles.previewSection}>
532:             <div className={styles.previewContainer}>
533:                 <div className={styles.previewHeader}>
534:                     <span>Effective Patterns Preview</span>
535:                     <span className={styles.patternCount}>
536:                         {actualPatternCount} active
537:                     </span>
538:                 </div>
539:                 {mergedPreview.split('\n').map((line, index) => {
540:                     if (!line.trim()) return null;
541:                     const safeExcluded = Array.isArray(excludedSystemPatterns) ? excludedSystemPatterns : [];
542:                     const isSystem = systemIgnorePatterns.includes(line) && !safeExcluded.includes(line);
543:                     // Check against CURRENT edited patterns for the active tab
544:                     const isGlobalUser = activeTab === 'global' && currentGlobalPatterns.split('\n').includes(line);
545:                     const isLocalUser = activeTab === 'local' && currentLocalPatterns.split('\n').includes(line);
546: 
547:                     let badgeText = 'Unknown';
548:                     let badgeClass = ''; // No default class
549:                     if (isSystem) {
550:                         badgeText = 'System';
551:                         badgeClass = styles.previewSystem;
552:                     } else if (isGlobalUser || (activeTab === 'local' && globalPatternsState?.patterns?.split('\n').includes(line))) { // Also check prop state for inactive tab preview
553:                         badgeText = 'Global';
554:                         badgeClass = styles.previewGlobal;
555:                     } else if (isLocalUser || (activeTab === 'global' && localPatternsState?.patterns?.split('\n').includes(line))) { // Also check prop state for inactive tab preview
556:                         badgeText = 'Local';
557:                          badgeClass = styles.previewLocal;
558:                     } else if (line.startsWith('#')) {
559:                          badgeText = 'Comment'; // Indicate comments if needed
560:                          badgeClass = styles.previewComment; // Add style for comments
561:                     }
562: 
563:                     return (
564:                         <div key={index} className={`${styles.previewLine} ${badgeClass}`}>
565:                             {line}
566:                              {badgeText !== 'Unknown' && badgeText !== 'Comment' && <span className={styles.previewBadge}> {badgeText} </span>}
567:                         </div>
568:                     );
569:                 })}
570:             </div>
571:         </div>
572:       </div>
573:     </div>
574:   );
575: };
576: 
577: export default IgnorePatternsWithErrorBoundary;
````

## File: src/components/Sidebar.tsx
````typescript
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
646:         globalPatternsState={globalPatternsState}
647:         localPatternsState={localPatternsState}
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
661:         onExcludedSystemPatternsChange={onExcludedSystemPatternsChange}
662:         systemIgnorePatterns={systemIgnorePatterns}
663:         recentFolders={getAvailableFolders()}
664:       />
665:     </div>
666:   );
667: };
668: 
669: export default Sidebar;
````

## File: src/App.tsx
````typescript
  1: import React, { useState, useEffect, useCallback, useMemo } from "react";
  2: import Sidebar from "./components/Sidebar";
  3: import FileList from "./components/FileList";
  4: import UserInstructions from "./components/UserInstructions";
  5: import ControlContainer from "./components/ControlContainer";
  6: import { FileData, FileTreeMode, SortOrder } from "./types/FileTypes";
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
 17: import { SYSTEM_PATTERN_CATEGORIES, parseIgnorePatternsContent, IgnorePatternsState } from "./utils/patternUtils";
 18: // Import the StatusAlert component
 19: import { StatusAlert } from "./components/ui/StatusAlert";
 20: import { OutputFormatType, OUTPUT_FORMAT_OPTIONS, OUTPUT_FORMAT_STORAGE_KEY } from './constants/outputFormats';
 21: import { formatAsXML, formatAsMarkdown, formatAsPlain } from './utils/formatters';
 22: import { UserInstructionsWithTemplates } from './components/UserInstructionsWithTemplates';
 23: 
 24: // Access the electron API from the window object
 25: declare global {
 26:   interface Window {
 27:     electron: {
 28:       ipcRenderer: {
 29:         send: (channel: string, data?: any) => void;
 30:         on: (channel: string, func: (...args: any[]) => void) => void;
 31:         removeListener: (
 32:           channel: string,
 33:           func: (...args: any[]) => void
 34:         ) => void;
 35:         invoke: (channel: string, data?: any) => Promise<any>;
 36:         setMaxListeners?: (n: number) => void;
 37:       };
 38:     };
 39:   }
 40: }
 41: 
 42: // Keys for localStorage
 43: const STORAGE_KEYS = {
 44:   SELECTED_FOLDER: "pastemax-selected-folder",
 45:   SELECTED_FILES: "pastemax-selected-files",
 46:   SORT_ORDER: "pastemax-sort-order",
 47:   SEARCH_TERM: "pastemax-search-term",
 48:   EXPANDED_NODES: "pastemax-expanded-nodes",
 49:   GLOBAL_IGNORE_PATTERNS: "pastemax-global-ignore-patterns-v2", // Added version suffix
 50: };
 51: 
 52: // Default system patterns as fallback if not provided by main process
 53: const DEFAULT_SYSTEM_PATTERNS = [
 54:   // Combine categories into one list for default state
 55:   ...SYSTEM_PATTERN_CATEGORIES.versionControl,
 56:   ...SYSTEM_PATTERN_CATEGORIES.buildOutput,
 57:   ...SYSTEM_PATTERN_CATEGORIES.caches,
 58:   ...SYSTEM_PATTERN_CATEGORIES.logs,
 59:   ...SYSTEM_PATTERN_CATEGORIES.ide,
 60:   ...SYSTEM_PATTERN_CATEGORIES.temp,
 61:   ...SYSTEM_PATTERN_CATEGORIES.os,
 62:   // Other common defaults
 63:   "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.ico",
 64:   "**/*.webp", "**/*.svg", "**/*.pdf", "**/*.zip", "**/*.tar.gz",
 65:   "**/*.tgz", "**/*.rar", "**/*.7z", "**/*.mp4", "**/*.mov",
 66:   "**/*.avi", "**/*.mkv", "**/*.mp3", "**/*.wav", "**/*.flac",
 67:   "**/*.sqlite", "**/*.db", "**/*.sql",
 68:   "**/*.doc", "**/*.docx", "**/*.xls", "**/*.xlsx", "**/*.ppt", "**/*.pptx",
 69:   "**/*.iso", "**/*.bin", "**/*.exe", "**/*.dll", "**/*.so", "**/*.dylib",
 70:   "**/*.min.js", "**/*.min.css",
 71: ];
 72: 
 73: const App = () => {
 74:   // Load initial state from localStorage if available
 75:   const savedFolder = localStorage.getItem(STORAGE_KEYS.SELECTED_FOLDER);
 76:   const savedFiles = localStorage.getItem(STORAGE_KEYS.SELECTED_FILES);
 77:   const savedExpandedNodes = localStorage.getItem(STORAGE_KEYS.EXPANDED_NODES);
 78:   const savedShowInstructions = localStorage.getItem('pastemax-show-instructions');
 79: 
 80:   // State for user interface controls
 81:   const [showUserInstructions, setShowUserInstructions] = useState(savedShowInstructions !== 'false');
 82:   const [fileTreeMode, setFileTreeMode] = useState<FileTreeMode>('complete');
 83: 
 84:   // Initialize expanded nodes from localStorage if available
 85:   const initialExpandedNodes = useMemo(() => {
 86:     const map = new Map<string, boolean>();
 87:     if (savedExpandedNodes) {
 88:       try {
 89:         const parsedNodes = JSON.parse(savedExpandedNodes);
 90:         if (Array.isArray(parsedNodes)) {
 91:           parsedNodes.forEach(([key, value]) => {
 92:             if (typeof key === 'string' && typeof value === 'boolean') {
 93:               map.set(key, value);
 94:             }
 95:           });
 96:         }
 97:       } catch (error) {
 98:         console.error("Error parsing saved expanded nodes:", error);
 99:       }
100:     }
101:     return map;
102:   }, [savedExpandedNodes]);
103: 
104:   const [selectedFolder, setSelectedFolder] = useState<string | null>(savedFolder);
105:   const [allFiles, setAllFiles] = useState<Omit<FileData, 'content'>[]>([]);
106:   const [selectedFiles, setSelectedFiles] = useState<string[]>(
107:     savedFiles ? JSON.parse(savedFiles) : []
108:   );
109:   const [sortOrder, setSortOrder] = useState<SortOrder>("name-ascending");
110:   const [searchTerm, setSearchTerm] = useState("");
111:   const [expandedNodes, setExpandedNodes] = useState<Map<string, boolean>>(initialExpandedNodes);
112:   const [displayedFiles, setDisplayedFiles] = useState<Omit<FileData, 'content'>[]>([]);
113:   const [processingStatus, setProcessingStatus] = useState({
114:     status: "idle",
115:     message: "",
116:   } as {
117:     status: "idle" | "processing" | "complete" | "error";
118:     message: string;
119:   });
120: 
121:   const [userInstructions, setUserInstructions] = useState("");
122:   const [fileTreeSortOrder, setFileTreeSortOrder] = useState<SortOrder>("name-ascending");
123: 
124:   // Centralized state for ignore patterns
125:   const [globalPatternsState, setGlobalPatternsState] = useState<IgnorePatternsState>({
126:     patterns: '',
127:     excludedSystemPatterns: []
128:   });
129:   const [localIgnorePatterns, setLocalPatterns] = useState<IgnorePatternsState>({ patterns: '', excludedSystemPatterns: [] }); // Local doesn't have excluded system patterns
130:   const [systemIgnorePatterns, setSystemIgnorePatterns] = useState<string[]>(DEFAULT_SYSTEM_PATTERNS);
131: 
132:   const [outputFormat, setOutputFormat] = useState<OutputFormatType>(() => {
133:     const saved = localStorage.getItem(OUTPUT_FORMAT_STORAGE_KEY);
134:     return (saved as OutputFormatType) || 'xml';
135:   });
136: 
137:   const isElectron = window.electron !== undefined;
138: 
139:   // --- Persist State Effects ---
140:   useEffect(() => {
141:     if (selectedFolder) localStorage.setItem(STORAGE_KEYS.SELECTED_FOLDER, selectedFolder);
142:     else localStorage.removeItem(STORAGE_KEYS.SELECTED_FOLDER);
143:   }, [selectedFolder]);
144: 
145:   useEffect(() => {
146:     localStorage.setItem(STORAGE_KEYS.SELECTED_FILES, JSON.stringify(selectedFiles));
147:   }, [selectedFiles]);
148: 
149:   useEffect(() => {
150:     localStorage.setItem(STORAGE_KEYS.SORT_ORDER, sortOrder);
151:   }, [sortOrder]);
152: 
153:   useEffect(() => {
154:     localStorage.setItem(STORAGE_KEYS.SEARCH_TERM, searchTerm);
155:   }, [searchTerm]);
156: 
157:   useEffect(() => {
158:     try {
159:       localStorage.setItem(STORAGE_KEYS.EXPANDED_NODES, JSON.stringify(Array.from(expandedNodes.entries())));
160:     } catch (error) {
161:       console.error("Error saving expanded nodes:", error);
162:     }
163:   }, [expandedNodes]);
164: 
165:   useEffect(() => {
166:     localStorage.setItem('pastemax-show-instructions', String(showUserInstructions));
167:   }, [showUserInstructions]);
168: 
169:   // Persist global ignore patterns state
170:   useEffect(() => {
171:     localStorage.setItem(STORAGE_KEYS.GLOBAL_IGNORE_PATTERNS, JSON.stringify(globalPatternsState));
172:   }, [globalPatternsState]);
173: 
174:   useEffect(() => {
175:     localStorage.setItem(OUTPUT_FORMAT_STORAGE_KEY, outputFormat);
176:   }, [outputFormat]);
177: 
178:   // --- IPC Listeners ---
179: 
180:   // Load initial data from saved folder
181:   useEffect(() => {
182:     if (!isElectron || !selectedFolder) return;
183:     const hasLoadedInitialData = sessionStorage.getItem("hasLoadedInitialData");
184:     if (hasLoadedInitialData === "true") return;
185:     console.log("Loading saved folder on startup:", selectedFolder);
186:     setProcessingStatus({ status: "processing", message: "Loading files..." });
187:     window.electron.ipcRenderer.send("request-file-list", selectedFolder);
188:     sessionStorage.setItem("hasLoadedInitialData", "true");
189:   }, [isElectron, selectedFolder]); // Keep dependency
190: 
191:   // Listen for folder selection and file list data
192:   useEffect(() => {
193:     if (!isElectron) return;
194: 
195:     const handleFolderSelected = (folderPath: string) => {
196:       if (typeof folderPath === "string") {
197:         console.log("Folder selected:", folderPath);
198:         setSelectedFolder(folderPath);
199:         setSelectedFiles([]);
200:         setAllFiles([]); // Clear previous files immediately
201:         setDisplayedFiles([]);
202:         setLocalPatterns({ patterns: '', excludedSystemPatterns: [] }); // Reset local patterns
203:         setProcessingStatus({ status: "processing", message: "Requesting file list..." });
204:         window.electron.ipcRenderer.send("request-file-list", folderPath);
205:       } else {
206:         console.error("Invalid folder path received:", folderPath);
207:         setProcessingStatus({ status: "error", message: "Invalid folder path" });
208:       }
209:     };
210: 
211:     // Updated to handle metadata only
212:     const handleFileListData = (filesMetadata: Omit<FileData, 'content'>[]) => {
213:       console.log("Received file list metadata:", filesMetadata.length, "files");
214:       if (filesMetadata.length === 1 && filesMetadata[0].isAppDirectory) {
215:         console.log("Detected app directory selection");
216:         setAllFiles([]); setSelectedFiles([]); setDisplayedFiles([]);
217:         setProcessingStatus({ status: "error", message: "Cannot select the application directory" });
218:         return;
219:       }
220: 
221:       // Store only metadata, content will be fetched on demand
222:       setAllFiles(filesMetadata);
223:       setProcessingStatus({ status: "complete", message: `Loaded ${filesMetadata.length} files` });
224: 
225:       applyFiltersAndSort(filesMetadata, sortOrder, searchTerm); // Apply filters/sort to metadata
226: 
227:       // Auto-select non-binary/non-skipped files
228:       const selectablePaths = filesMetadata
229:         .filter(file => !file.isBinary && !file.isSkipped && !file.excluded)
230:         .map(file => file.path);
231:       setSelectedFiles(selectablePaths);
232:     };
233: 
234:     const handleProcessingStatus = (status: { status: "idle" | "processing" | "complete" | "error"; message: string; }) => {
235:       console.log("Processing status:", status);
236:       setProcessingStatus(status);
237:     };
238: 
239:     window.electron.ipcRenderer.on("folder-selected", handleFolderSelected);
240:     window.electron.ipcRenderer.on("file-list-data", handleFileListData);
241:     window.electron.ipcRenderer.on("file-processing-status", handleProcessingStatus);
242: 
243:     // Listener for loaded ignore patterns (both global and local)
244:     const handleIgnorePatternsLoaded = (result: { patterns: string; isGlobal: boolean; systemPatterns?: string[]; folderPath?: string }) => {
245:         console.log(`IPC: Received ${result.isGlobal ? 'global' : 'local'} patterns loaded event.`);
246:         const { excludedPatterns, userPatterns } = parseIgnorePatternsContent(result.patterns || '');
247: 
248:         if (result.isGlobal) {
249:             setGlobalPatternsState({ patterns: userPatterns, excludedSystemPatterns: excludedPatterns });
250:             if (result.systemPatterns) {
251:                 setSystemIgnorePatterns(result.systemPatterns);
252:             }
253:             console.log(`Updated global state: ${userPatterns.split('\n').length} patterns, ${excludedPatterns.length} excluded system.`);
254:         } else if (result.folderPath === selectedFolder) { // Ensure it's for the current folder
255:             setLocalPatterns({ patterns: userPatterns, excludedSystemPatterns: [] }); // Local patterns don't manage system excludes
256:             console.log(`Updated local state for ${result.folderPath}: ${userPatterns.split('\n').length} patterns.`);
257:         }
258:     };
259:     window.electron.ipcRenderer.on("ignore-patterns-loaded", handleIgnorePatternsLoaded);
260: 
261:     return () => {
262:       window.electron.ipcRenderer.removeListener("folder-selected", handleFolderSelected);
263:       window.electron.ipcRenderer.removeListener("file-list-data", handleFileListData);
264:       window.electron.ipcRenderer.removeListener("file-processing-status", handleProcessingStatus);
265:       window.electron.ipcRenderer.removeListener("ignore-patterns-loaded", handleIgnorePatternsLoaded);
266:     };
267:   }, [isElectron, sortOrder, searchTerm, selectedFolder]); // Added selectedFolder dependency for local pattern updates
268: 
269:   // Add ESC key handler
270:   useEffect(() => {
271:     const handleEscKey = (e: KeyboardEvent) => {
272:       if (e.key === "Escape" && processingStatus.status === "processing") {
273:         console.log("ESC pressed - cancelling directory loading");
274:         window.electron.ipcRenderer.send("cancel-directory-loading");
275:       }
276:     };
277:     if (processingStatus.status === "processing") {
278:       window.addEventListener("keydown", handleEscKey);
279:       return () => window.removeEventListener("keydown", handleEscKey);
280:     }
281:   }, [processingStatus.status]);
282: 
283:   // --- Core Functions ---
284: 
285:   const openFolder = () => {
286:     if (isElectron) {
287:       console.log("Opening folder dialog");
288:       setProcessingStatus({ status: "idle", message: "Select a folder..." });
289:       window.electron.ipcRenderer.send("open-folder");
290:     } else {
291:       console.warn("Folder selection not available in browser");
292:     }
293:   };
294: 
295:   // Apply filters and sorting (Lint fixes applied)
296:   const applyFiltersAndSort = useCallback((files: Omit<FileData, 'content'>[], sort: SortOrder, filter: string) => {
297:     let filtered = files;
298:     if (filter) {
299:       const lowerFilter = filter.toLowerCase();
300:       filtered = files.filter(file =>
301:         file.name.toLowerCase().includes(lowerFilter) ||
302:         file.path.toLowerCase().includes(lowerFilter)
303:       );
304:     }
305: 
306:     const [sortKey, sortDir] = sort.split("-");
307: 
308:     const sorted = [...filtered].sort((a, b) => {
309:       let comparison = 0;
310:       // Moved declarations outside switch
311:       const aTokens = typeof a.tokenCount === 'number' ? a.tokenCount : 0;
312:       const bTokens = typeof b.tokenCount === 'number' ? b.tokenCount : 0;
313:       const aDate = a.lastModified || 0;
314:       const bDate = b.lastModified || 0;
315: 
316:       switch (sortKey) {
317:         case "name":
318:           comparison = a.name.localeCompare(b.name);
319:           break;
320:         case "tokens":
321:           comparison = aTokens - bTokens;
322:           break;
323:         case "date":
324:           comparison = Number(aDate) - Number(bDate);
325:           break;
326:         default:
327:           comparison = a.name.localeCompare(b.name);
328:       }
329:       return sortDir === "ascending" ? comparison : -comparison;
330:     });
331: 
332:     setDisplayedFiles(sorted);
333:   }, []); // Add empty dependency array as it doesn't depend on component state/props
334: 
335:   // Re-run applyFiltersAndSort when relevant state changes
336:   useEffect(() => {
337:     applyFiltersAndSort(allFiles as Omit<FileData, 'content'>[], sortOrder, searchTerm);
338:   }, [allFiles, sortOrder, searchTerm, applyFiltersAndSort]); // applyFiltersAndSort is stable and doesn't depend on state
339: 
340:   // Toggle file selection
341:   const toggleFileSelection = useCallback((filePath: string) => {
342:     const normalizedPath = normalizePath(filePath);
343:     setSelectedFiles(prevSelected => {
344:       const isSelected = prevSelected.some(path => arePathsEqual(path, normalizedPath));
345:       return isSelected
346:         ? prevSelected.filter(path => !arePathsEqual(path, normalizedPath))
347:         : [...prevSelected, normalizedPath];
348:     });
349:   }, []); // Add empty dependency array
350: 
351:   // Select all non-excluded files
352:   const selectAllFiles = useCallback(() => {
353:     const filesToSelect = allFiles
354:       .filter(file => !file.isBinary && !file.isSkipped && !file.excluded)
355:       .map(file => file.path);
356:     setSelectedFiles(filesToSelect); // Directly set, no need to merge if it's 'select all'
357:   }, [allFiles]);
358: 
359:   // Deselect all files
360:   const deselectAllFiles = useCallback(() => {
361:     setSelectedFiles([]);
362:   }, []);
363: 
364:   // Toggle folder selection
365:   const toggleFolderSelection = useCallback((folderPath: string, shouldBeSelected: boolean) => {
366:     if (!folderPath) return;
367:     const normalizedFolderPath = normalizePath(folderPath);
368: 
369:     setSelectedFiles(prev => {
370:       const newSelectionSet = new Set(prev);
371:       allFiles.forEach(file => {
372:         const normalizedFilePath = normalizePath(file.path);
373:         // Check if file is within the target folder (or is the folder itself if files represent folders)
374:         if (normalizedFilePath.startsWith(normalizedFolderPath + '/') || normalizedFilePath === normalizedFolderPath) {
375:            // Only modify selection for non-binary, non-skipped, non-excluded files
376:            if (!file.isBinary && !file.isSkipped && !file.excluded) {
377:                 if (shouldBeSelected) {
378:                     newSelectionSet.add(file.path);
379:                 } else {
380:                     newSelectionSet.delete(file.path);
381:                 }
382:            }
383:         }
384:       });
385:       return Array.from(newSelectionSet);
386:     });
387:   }, [allFiles]); // Depends on allFiles
388: 
389:   // Handle sort change
390:   const handleSortChange = useCallback((value: string | string[]) => {
391:     if (typeof value === 'string') {
392:       setSortOrder(value as SortOrder);
393:       // applyFiltersAndSort will be triggered by the useEffect watching sortOrder
394:     }
395:   }, []); // Add empty dependency array
396: 
397:   // Handle search change
398:   const handleSearchChange = useCallback((newSearch: string) => {
399:     setSearchTerm(newSearch);
400:      // applyFiltersAndSort will be triggered by the useEffect watching searchTerm
401:   }, []); // Add empty dependency array
402: 
403:   // Calculate total tokens (Memoized)
404:   const totalTokens = useMemo(() => { // Renamed to avoid conflict
405:     const fileMap = new Map(allFiles.map(f => [f.path, f.tokenCount]));
406:     return selectedFiles.reduce((total, path) => {
407:       return total + (fileMap.get(path) || 0);
408:     }, 0);
409:   }, [selectedFiles, allFiles]);
410: 
411:   // --- Moved reloadFolder definition earlier ---
412:   const reloadFolder = useCallback(() => {
413:     if (isElectron && selectedFolder) {
414:       console.log(`Reloading folder: ${selectedFolder}`);
415:       setProcessingStatus({ status: "processing", message: "Reloading files..." });
416:       setAllFiles([]); // Clear current files
417:       setDisplayedFiles([]);
418:       // Optionally reset local patterns state if desired on manual reload
419:       // setLocalPatterns({ patterns: '', excludedSystemPatterns: [] });
420:       window.electron.ipcRenderer.send("request-file-list", selectedFolder); // Re-request list
421:     }
422:   }, [isElectron, selectedFolder]); // Now defined before other callbacks
423: 
424:   // Get selected files content (Lazy loaded version)
425:   const getSelectedFilesContent = useCallback(async (): Promise<string> => {
426:     if (selectedFiles.length === 0) return "No files selected.";
427: 
428:     setProcessingStatus({ status: 'processing', message: `Fetching content for ${selectedFiles.length} files...` });
429: 
430:     try {
431:       // Fetch content for all selected files concurrently
432:       const contentPromises = selectedFiles.map(async (filePath) => {
433:         try {
434:           const result = await window.electron.ipcRenderer.invoke('get-file-content', filePath);
435:           // Find the metadata for sorting/header info
436:           const fileMeta = allFiles.find(f => f.path === filePath);
437:           return {
438:               path: filePath,
439:               content: result.content,
440:               tokenCount: result.tokenCount, // Assuming token count is returned by handler
441:               name: fileMeta?.name || filePath, // Fallback name
442:               lastModified: fileMeta?.lastModified || 0, // For sorting
443:           };
444:         } catch (fetchError: unknown) {
445:             const errorMessage = fetchError instanceof Error ? fetchError.message : 'Unknown error';
446:             console.error(`Failed to fetch content for ${filePath}:`, fetchError);
447:             return { path: filePath, content: `// Error loading file: ${errorMessage}`, tokenCount: 0, name: filePath, lastModified: 0 }; // Placeholder on error
448:         }
449:       });
450: 
451:       const filesWithContent = await Promise.all(contentPromises);
452: 
453:       // Sort the fetched files based on the current sortOrder
454:       const [sortKey, sortDir] = sortOrder.split("-");
455:       const sortedFiles = filesWithContent.sort((a, b) => {
456:           let comparison = 0;
457:           const aTokens = a.tokenCount || 0;
458:           const bTokens = b.tokenCount || 0;
459:           const aDate = a.lastModified || 0;
460:           const bDate = b.lastModified || 0;
461: 
462:           switch (sortKey) {
463:             case "name": comparison = a.name.localeCompare(b.name); break;
464:             case "tokens": comparison = aTokens - bTokens; break;
465:             case "date": comparison = Number(aDate) - Number(bDate); break;
466:             default: comparison = a.name.localeCompare(b.name);
467:           }
468:           return sortDir === "ascending" ? comparison : -comparison;
469:       });
470: 
471:       // --- Concatenate content (similar to previous logic) ---
472:       let concatenatedString = "";
473:       if (fileTreeMode !== "none" && selectedFolder) {
474:           // Generate tree based on *all* files metadata for context if needed by mode
475:           const filesForTree = fileTreeMode === "complete" ? allFiles : sortedFiles;
476:           const asciiTree = generateAsciiFileTree(filesForTree, selectedFolder, fileTreeMode);
477:           concatenatedString += `<file_map>\n${selectedFolder}\n${asciiTree}\n</file_map>\n\n`;
478:       }
479: 
480:       sortedFiles.forEach(file => {
481:         let relativePath = file.path;
482:         if (selectedFolder && file.path.startsWith(selectedFolder)) {
483:           relativePath = file.path.substring(selectedFolder.length).replace(/^[/\\]/, '');
484:         }
485:         concatenatedString += `\n\n// ---- File: ${relativePath} (${file.tokenCount || 'N/A'} tokens) ----\n\n`;
486:         concatenatedString += file.content;
487:       });
488: 
489:       const userInstructionsBlock = userInstructions.trim()
490:         ? `\n<user_instructions>\n${userInstructions}\n</user_instructions>\n\n`
491:         : "";
492: 
493:       // Generate the file tree string
494:       let fileTreeString = "";
495:       if (fileTreeMode !== "none" && selectedFolder) {
496:         const filesForTree = fileTreeMode === "complete" ? allFiles : sortedFiles;
497:         fileTreeString = generateAsciiFileTree(filesForTree, selectedFolder, fileTreeMode);
498:       }
499:       
500:       // Apply the appropriate formatter based on selected format
501:       switch (outputFormat) {
502:         case 'markdown':
503:           return formatAsMarkdown(sortedFiles, selectedFolder, fileTreeMode, fileTreeString, userInstructions);
504:         case 'plain':
505:           return formatAsPlain(sortedFiles, selectedFolder, fileTreeMode, fileTreeString, userInstructions);
506:         case 'xml':
507:         default:
508:           return formatAsXML(sortedFiles, selectedFolder, fileTreeMode, fileTreeString, userInstructions);
509:       }
510: 
511:     } catch (error: unknown) {
512:       const errorMessage = error instanceof Error ? error.message : 'Unknown error';
513:       console.error("Error getting selected files content:", error);
514:       setProcessingStatus({ status: 'error', message: 'Failed to prepare content.' });
515:       return `Error preparing content: ${errorMessage}`;
516:     }
517:   }, [selectedFiles, allFiles, sortOrder, fileTreeMode, selectedFolder, userInstructions, outputFormat]);
518: 
519:   // Sort options
520:   const sortOptions = useMemo(() => [
521:     { value: "name-ascending", label: "Name (A-Z)" },
522:     { value: "name-descending", label: "Name (Z-A)" },
523:     { value: "tokens-ascending", label: "Tokens (Asc)" },
524:     { value: "tokens-descending", label: "Tokens (Desc)" },
525:     { value: "date-ascending", label: "Date (Oldest)" },
526:     { value: "date-descending", label: "Date (Newest)" }
527:   ], []);
528: 
529:   // Handle expand/collapse state changes
530:   const toggleExpanded = useCallback((nodeId: string) => {
531:     setExpandedNodes(prev => {
532:       const newState = new Map(prev);
533:       newState.set(nodeId, !prev.get(nodeId)); // Simplified toggle
534:       // Persisted via useEffect watching expandedNodes
535:       return newState;
536:     });
537:   }, []); // Add empty dependency array
538: 
539:   // --- Ignore Pattern Functions ---
540: 
541:   // Load patterns (global or local)
542:   const loadIgnorePatterns = useCallback(async (folderPath: string, isGlobal: boolean = false): Promise<void> => {
543:     if (!isElectron) return;
544:     console.log(`Requesting load for ${isGlobal ? 'global' : 'local'} patterns${!isGlobal ? ` for ${folderPath}` : ''}`);
545:     try {
546:         // Invoke expects the handler to exist. The result is handled by the 'ignore-patterns-loaded' listener.
547:         await window.electron.ipcRenderer.invoke("load-ignore-patterns", { folderPath, isGlobal });
548:     } catch (error: unknown) {
549:         const errorMessage = error instanceof Error ? error.message : 'Unknown error';
550:         console.error(`Error invoking load-ignore-patterns (${isGlobal ? 'global' : 'local'}): ${errorMessage}`);
551:         // Set default state on error
552:         if (isGlobal) {
553:             setGlobalPatternsState({ patterns: '', excludedSystemPatterns: [] });
554:             setSystemIgnorePatterns(DEFAULT_SYSTEM_PATTERNS);
555:         } else if (folderPath === selectedFolder) {
556:             setLocalPatterns({ patterns: '', excludedSystemPatterns: [] });
557:         }
558:     }
559: }, [isElectron, selectedFolder]); // Dependencies: isElectron, selectedFolder
560: 
561:   // Save patterns (global or local) - Now just calls IPC
562:   const saveIgnorePatterns = useCallback(async (patterns: string, isGlobal: boolean, folderPath?: string): Promise<void> => {
563:     if (!isElectron) return;
564:     const targetPath = folderPath || selectedFolder; // Use provided path or current folder for local
565:     if (!isGlobal && !targetPath) {
566:       console.error("Cannot save local patterns without a folder path.");
567:       setProcessingStatus({ status: "error", message: "No folder selected for local patterns." });
568:       return;
569:     }
570: 
571:     setProcessingStatus({ status: "processing", message: `Saving ${isGlobal ? "global" : "local"} patterns...` });
572: 
573:     try {
574:       // The string passed (`patterns`) should already include `# DISABLED:` comments
575:       // generated by IgnorePatterns.tsx's handleSaveGlobalPatterns
576:       const result = await window.electron.ipcRenderer.invoke("save-ignore-patterns", {
577:         patterns,
578:         isGlobal,
579:         folderPath: targetPath
580:       });
581: 
582:       if (result.success) {
583:         console.log(`IPC: Save ${isGlobal ? 'global' : 'local'} patterns successful.`);
584:         setProcessingStatus({ status: "complete", message: "Patterns saved." });
585: 
586:         // Reload the folder data to apply new patterns
587:         // Add a small delay to ensure file system changes are registered
588:         setTimeout(() => {
589:             reloadFolder();
590:         }, 300);
591: 
592:       } else {
593:         console.error(`IPC: Save ${isGlobal ? 'global' : 'local'} patterns failed:`, result.error);
594:         setProcessingStatus({ status: "error", message: `Save failed: ${result.error}` });
595:       }
596:     } catch (error: unknown) {
597:       const errorMessage = error instanceof Error ? error.message : 'Unknown error';
598:       console.error("Error invoking save-ignore-patterns:", error);
599:       setProcessingStatus({ status: "error", message: `Save failed: ${errorMessage}` });
600:     }
601:   }, [isElectron, selectedFolder, reloadFolder]); // Dependency: reloadFolder
602: 
603:   // Reset patterns (global or local)
604:   const resetIgnorePatterns = useCallback(async (isGlobal: boolean, folderPath?: string): Promise<void> => {
605:     if (!isElectron) return;
606:     const targetPath = folderPath || selectedFolder;
607:     if (!isGlobal && !targetPath) {
608:       console.error("Cannot reset local patterns without a folder path.");
609:       setProcessingStatus({ status: "error", message: "No folder selected for local reset." });
610:       return;
611:     }
612: 
613:     setProcessingStatus({ status: "processing", message: `Resetting ${isGlobal ? "global" : "local"} patterns...` });
614: 
615:     try {
616:       const result = await window.electron.ipcRenderer.invoke("reset-ignore-patterns", {
617:         isGlobal,
618:         folderPath: targetPath
619:       });
620: 
621:       if (result.success) {
622:         console.log(`IPC: Reset ${isGlobal ? 'global' : 'local'} patterns successful.`);
623:         // Update state *after* success
624:         if (isGlobal) {
625:           setGlobalPatternsState({ patterns: '', excludedSystemPatterns: [] }); // Reset global state
626:         } else {
627:           setLocalPatterns({ patterns: '', excludedSystemPatterns: [] }); // Reset local state
628:         }
629:         setProcessingStatus({ status: "complete", message: "Patterns reset to default." });
630:         // Reload folder data
631:         setTimeout(() => {
632:             reloadFolder();
633:         }, 300);
634:       } else {
635:         console.error(`IPC: Reset ${isGlobal ? 'global' : 'local'} patterns failed:`, result.error);
636:         setProcessingStatus({ status: "error", message: `Reset failed: ${result.error}` });
637:       }
638:     } catch (error: unknown) {
639:       const errorMessage = error instanceof Error ? error.message : 'Unknown error';
640:       console.error("Error invoking reset-ignore-patterns:", error);
641:       setProcessingStatus({ status: "error", message: `Reset failed: ${errorMessage}` });
642:     }
643:   }, [isElectron, selectedFolder, reloadFolder]); // Dependency: reloadFolder
644: 
645:   // Clear local patterns
646:   const clearLocalIgnorePatterns = useCallback(async (folderPath: string): Promise<void> => {
647:     if (!isElectron || !folderPath) return;
648: 
649:     setProcessingStatus({ status: "processing", message: "Clearing local patterns..." });
650: 
651:     try {
652:       const result = await window.electron.ipcRenderer.invoke("clear-local-ignore-patterns", { folderPath });
653: 
654:       if (result.success) {
655:         console.log(`IPC: Clear local patterns successful for ${folderPath}.`);
656:         // Update state *after* success
657:         if (folderPath === selectedFolder) {
658:           setLocalPatterns({ patterns: '', excludedSystemPatterns: [] });
659:         }
660:         setProcessingStatus({ status: "complete", message: "Local patterns cleared." });
661:         // Reload folder data
662:         setTimeout(() => {
663:             reloadFolder();
664:         }, 300);
665:       } else {
666:         console.error(`IPC: Clear local patterns failed for ${folderPath}:`, result.error);
667:         setProcessingStatus({ status: "error", message: `Clear failed: ${result.error}` });
668:       }
669:     } catch (error: unknown) {
670:       const errorMessage = error instanceof Error ? error.message : 'Unknown error';
671:       console.error("Error invoking clear-local-ignore-patterns:", error);
672:       setProcessingStatus({ status: "error", message: `Clear failed: ${errorMessage}` });
673:     }
674:   }, [isElectron, selectedFolder, reloadFolder]); // Dependency: reloadFolder
675: 
676: 
677:   // --- Dialog State & Handlers ---
678:   const [showClearSelectionDialog, setShowClearSelectionDialog] = useState(false);
679:   const [showRemoveAllFoldersDialog, setShowRemoveAllFoldersDialog] = useState(false);
680:   const [showResetPatternsDialog, setShowResetPatternsDialog] = useState(false);
681:   const [resetPatternsContext, setResetPatternsContext] = useState<{isGlobal: boolean; folderPath: string} | null>(null);
682: 
683:   const handleClearSelectionClick = useCallback(() => setShowClearSelectionDialog(true), []);
684:   const clearSelection = useCallback(() => { setSelectedFiles([]); setShowClearSelectionDialog(false); }, []);
685:   const handleRemoveAllFoldersClick = useCallback(() => setShowRemoveAllFoldersDialog(true), []);
686:   const removeAllFolders = useCallback(() => {
687:     setSelectedFolder(null); setAllFiles([]); setSelectedFiles([]); setDisplayedFiles([]);
688:     setLocalPatterns({ patterns: '', excludedSystemPatterns: [] }); // Reset local patterns
689:     localStorage.removeItem(STORAGE_KEYS.SELECTED_FOLDER);
690:     localStorage.removeItem(STORAGE_KEYS.SELECTED_FILES);
691:     localStorage.removeItem(STORAGE_KEYS.EXPANDED_NODES); // Also clear expanded nodes
692:     setExpandedNodes(new Map()); // Reset map in state
693:     sessionStorage.removeItem("hasLoadedInitialData");
694:     setShowRemoveAllFoldersDialog(false);
695:   }, []);
696: 
697:   const handleResetPatternsClick = useCallback((isGlobal: boolean, folderPath: string) => {
698:     setResetPatternsContext({ isGlobal, folderPath });
699:     setShowResetPatternsDialog(true);
700:   }, []);
701: 
702:   const confirmResetPatterns = useCallback(() => {
703:     if (resetPatternsContext) {
704:       resetIgnorePatterns(resetPatternsContext.isGlobal, resetPatternsContext.folderPath);
705:     }
706:     setShowResetPatternsDialog(false);
707:     setResetPatternsContext(null);
708:   }, [resetPatternsContext, resetIgnorePatterns]);
709: 
710:   // --- Helper Functions ---
711:   const truncatePath = (path: string | null): string => {
712:     if (!path) return "No folder selected";
713:     const parts = path.split(/[/\\]/); // Handle both slash types
714:     if (parts.length <= 3) return path;
715:     const lastParts = parts.filter(p => p).slice(-2);
716:     return `.../${lastParts.join('/')}`;
717:   };
718: 
719:   // Callback for IgnorePatterns component to update global excluded patterns
720:   const handleExcludedSystemPatternsChange = useCallback((newExcluded: string[]) => {
721:     setGlobalPatternsState((prev: IgnorePatternsState) => ({
722:       ...prev,
723:       excludedSystemPatterns: newExcluded
724:     }));
725:   }, []);
726: 
727:   // Update processing status handlers to include setTimeout for complete status
728:   useEffect(() => {
729:     // Handle auto-dismissing 'complete' status messages
730:     if (processingStatus.status === 'complete') {
731:       const timer = setTimeout(() => {
732:         setProcessingStatus({ status: 'idle', message: '' });
733:       }, 5000); // Use 5000ms to match StatusAlert default
734:       
735:       return () => clearTimeout(timer);
736:     }
737:   }, [processingStatus.status, processingStatus.message]);
738: 
739:   // --- Render ---
740:   return (
741:     <ThemeProvider>
742:       <div className={styles.appContainer}>
743:         <header className={styles.appHeader}>
744:           <h1>PasteMax</h1>
745:           <div className={styles.headerActions}>
746:             {/* <a href="#" className={styles.headerLink}>Guide</a>
747:             <div className={styles.headerSeparator}></div> */}
748:             <ThemeToggle />
749:             <div className={styles.headerSeparator}></div>
750:             <a href="https://github.com/jsulpis/pastemax" target="_blank" rel="noopener noreferrer" className={styles.githubButton}>
751:               <Github size={16} />
752:             </a>
753:           </div>
754:         </header>
755: 
756:         {processingStatus.status !== 'idle' && (
757:           <StatusAlert
758:             status={processingStatus.status}
759:             message={processingStatus.message}
760:             onClose={() => setProcessingStatus({ status: 'idle', message: '' })}
761:           />
762:         )}
763: 
764:         <div className={styles.mainContainer}>
765:           <Sidebar
766:             selectedFolder={selectedFolder}
767:             openFolder={openFolder}
768:             allFiles={allFiles}
769:             selectedFiles={selectedFiles}
770:             toggleFileSelection={toggleFileSelection}
771:             toggleFolderSelection={toggleFolderSelection}
772:             searchTerm={searchTerm}
773:             onSearchChange={handleSearchChange}
774:             selectAllFiles={selectAllFiles}
775:             deselectAllFiles={deselectAllFiles}
776:             expandedNodes={expandedNodes}
777:             toggleExpanded={toggleExpanded}
778:             reloadFolder={reloadFolder}
779:             clearSelection={clearSelection}
780:             removeAllFolders={removeAllFolders}
781:             loadIgnorePatterns={loadIgnorePatterns}
782:             saveIgnorePatterns={saveIgnorePatterns}
783:             resetIgnorePatterns={resetIgnorePatterns}
784:             systemIgnorePatterns={systemIgnorePatterns}
785:             clearIgnorePatterns={clearLocalIgnorePatterns}
786:             onClearSelectionClick={handleClearSelectionClick}
787:             onRemoveAllFoldersClick={handleRemoveAllFoldersClick}
788:             onResetPatternsClick={handleResetPatternsClick}
789:             fileTreeSortOrder={fileTreeSortOrder}
790:             onSortOrderChange={setFileTreeSortOrder}
791:             globalPatternsState={globalPatternsState}
792:             localPatternsState={localIgnorePatterns}
793:             onExcludedSystemPatternsChange={handleExcludedSystemPatternsChange}
794:             ignorePatterns=""
795:             setIgnorePatterns={() => {}}
796:           />
797: 
798:           {selectedFolder ? (
799:             <div className={styles.contentArea}>
800:               <div className={styles.contentHeader}>
801:                 <div className={styles.folderPathDisplay} title={selectedFolder}>
802:                   <span className={styles.pathLabel}>{'>_'}</span> {truncatePath(selectedFolder)}
803:                 </div>
804:                 <div className={styles.headerSeparator} />
805:                 <div className={styles.contentActions}>
806:                   <Dropdown
807:                     options={sortOptions}
808:                     value={sortOrder}
809:                     onChange={handleSortChange}
810:                     trigger={
811:                       <Button variant="secondary" size="sm" startIcon={getSortIcon(sortOrder)}> Sort </Button>
812:                     }
813:                   />
814:                 </div>
815:                 <div className={styles.headerSeparator} />
816:                 <div className={styles.fileStats}>
817:                   <span>{selectedFiles.length}</span> files selected (<span>{totalTokens.toLocaleString()}</span> tokens)
818:                 </div>
819:               </div>
820:               <FileList
821:                 files={displayedFiles} // Pass metadata only
822:                 selectedFiles={selectedFiles}
823:                 toggleFileSelection={toggleFileSelection}
824:               />
825: 
826:               {showUserInstructions && (
827:                 <div className={styles.userInstructionsContainer}>
828:                   <UserInstructionsWithTemplates
829:                     instructions={userInstructions}
830:                     setInstructions={setUserInstructions}
831:                   />
832:                 </div>
833:               )}
834: 
835:               <ControlContainer
836:                 fileTreeMode={fileTreeMode}
837:                 setFileTreeMode={setFileTreeMode}
838:                 showUserInstructions={showUserInstructions}
839:                 setShowUserInstructions={setShowUserInstructions}
840:                 getSelectedFilesContent={getSelectedFilesContent} // Now async
841:                 selectedFilesCount={selectedFiles.length}
842:                 outputFormat={outputFormat}
843:                 setOutputFormat={setOutputFormat}
844:               />
845:             </div>
846:           ) : (
847:             <div className={styles.contentArea}>
848:               <div className={styles.emptyStateContent}>
849:                 <h2>Welcome to PasteMax</h2>
850:                 <p>Select a folder to get started.</p>
851:                 <Button variant="primary" onClick={openFolder} className="mt-4"> Select Project Folder </Button>
852:               </div>
853:             </div>
854:           )}
855:         </div>
856: 
857:         {/* Confirmation Dialogs */}
858:         <ConfirmationDialog isOpen={showClearSelectionDialog} onClose={() => setShowClearSelectionDialog(false)} onConfirm={clearSelection} title="Clear Selection" description="Clear all selected files?" confirmLabel="Clear" variant="destructive" />
859:         <ConfirmationDialog isOpen={showRemoveAllFoldersDialog} onClose={() => setShowRemoveAllFoldersDialog(false)} onConfirm={removeAllFolders} title="Remove All Folders" description="Remove all folders and reset the application?" confirmLabel="Remove All" variant="destructive" />
860:         <ConfirmationDialog isOpen={showResetPatternsDialog} onClose={() => setShowResetPatternsDialog(false)} onConfirm={confirmResetPatterns} title={`Reset ${resetPatternsContext?.isGlobal ? 'Global' : 'Local'} Ignore Patterns`} description="Reset patterns to their default values?" confirmLabel="Reset" variant="destructive" />
861:       </div>
862:     </ThemeProvider>
863:   );
864: };
865: 
866: export default App;
````
