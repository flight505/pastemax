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
- Only files matching these patterns are included: src/components/ui/Dropdown/**/*, src/components/ui/Dropdown.module.css, src/components/ui/Dropdown.tsx
- Files matching these patterns are excluded: **/*.md, docs/**, scripts/**, node_modules/**, dist/**, .git/**, **/*.log, **/*.lock
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Line numbers have been added to the beginning of each line
- Files are sorted by Git change count (files with more changes are at the bottom)

## Additional Info

# Directory Structure
```
src/
  components/
    ui/
      Dropdown/
        Dropdown.module.css
        Dropdown.tsx
        DropdownDemo.tsx
        index.ts
      Dropdown.module.css
      Dropdown.tsx
```

# Files

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
16:   return (
17:     <div className="space-y-4 p-4">
18:       <div>
19:         <h3 className="mb-2 text-sm font-medium">Single Select</h3>
20:         <Dropdown
21:           options={demoOptions}
22:           value={singleValue}
23:           onChange={setSingleValue}
24:           placeholder="Select an action"
25:         />
26:       </div>
27: 
28:       <div>
29:         <h3 className="mb-2 text-sm font-medium">Multi Select</h3>
30:         <Dropdown
31:           options={demoOptions}
32:           value={multiValue}
33:           onChange={setMultiValue}
34:           placeholder="Select actions"
35:           multiple
36:         />
37:       </div>
38: 
39:       <div>
40:         <h3 className="mb-2 text-sm font-medium">Size Variants</h3>
41:         <div className="space-y-2">
42:           <Dropdown
43:             options={demoOptions}
44:             placeholder="Small Dropdown"
45:             size="sm"
46:           />
47:           <Dropdown
48:             options={demoOptions}
49:             placeholder="Medium Dropdown (default)"
50:             size="md"
51:           />
52:           <Dropdown
53:             options={demoOptions}
54:             placeholder="Large Dropdown"
55:             size="lg"
56:           />
57:         </div>
58:       </div>
59: 
60:       <div>
61:         <h3 className="mb-2 text-sm font-medium">Disabled State</h3>
62:         <Dropdown
63:           options={demoOptions}
64:           placeholder="Disabled Dropdown"
65:           disabled
66:         />
67:       </div>
68:     </div>
69:   );
70: };
```

## File: src/components/ui/Dropdown/index.ts
```typescript
1: export { Dropdown } from './Dropdown';
2: export type { DropdownOption, DropdownProps } from './Dropdown';
```

## File: src/components/ui/Dropdown.module.css
```css
 1: .dropdownContainer {
 2:   position: relative;
 3:   display: inline-block;
 4: }
 5: 
 6: .dropdownButton {
 7:   display: flex;
 8:   align-items: center;
 9:   justify-content: space-between;
10:   gap: 0.5rem;
11:   padding: 0.5rem 1rem;
12:   font-size: 0.875rem;
13:   background: var(--background-primary);
14:   color: var(--text-primary);
15:   border: 1px solid var(--border-color);
16:   border-radius: var(--radius);
17:   cursor: pointer;
18:   transition: background-color 0.15s ease;
19:   min-width: 150px;
20: }
21: 
22: .dropdownButton:hover {
23:   background: var(--hover-color);
24: }
25: 
26: .dropdownMenu {
27:   position: absolute;
28:   top: 100%;
29:   left: 0;
30:   z-index: var(--z-index-dropdown);
31:   min-width: 180px;
32:   margin-top: 0.25rem;
33:   padding: 0.25rem;
34:   background: var(--background-primary);
35:   border: 1px solid var(--border-color);
36:   border-radius: var(--radius);
37:   box-shadow: var(--shadow-md);
38:   animation: dropdownFadeIn 0.15s ease-in;
39: }
40: 
41: .dropdownOption {
42:   padding: 0.5rem 0.75rem;
43:   font-size: 0.875rem;
44:   color: var(--text-primary);
45:   cursor: pointer;
46:   border-radius: var(--radius-sm);
47:   transition: background-color 0.1s ease;
48: }
49: 
50: .dropdownOption:hover {
51:   background: var(--hover-color);
52: }
53: 
54: .dropdownOption.selected {
55:   background: var(--accent-color);
56:   color: var(--text-on-accent);
57: }
58: 
59: @keyframes dropdownFadeIn {
60:   from {
61:     opacity: 0;
62:     transform: translateY(-2px);
63:   }
64:   to {
65:     opacity: 1;
66:     transform: translateY(0);
67:   }
68: }
```

## File: src/components/ui/Dropdown.tsx
```typescript
 1: import React, { useState, useRef, useEffect } from "react";
 2: import styles from "./Dropdown.module.css";
 3: 
 4: interface DropdownOption {
 5:   value: string;
 6:   label: string;
 7: }
 8: 
 9: interface DropdownProps {
10:   options: DropdownOption[];
11:   value?: string | string[];
12:   onChange: (value: string | string[]) => void;
13:   placeholder?: string;
14:   trigger?: React.ReactNode;
15:   menuClassName?: string;
16: }
17: 
18: export const Dropdown: React.FC<DropdownProps> = ({
19:   options,
20:   value,
21:   onChange,
22:   placeholder,
23:   trigger,
24:   menuClassName,
25: }) => {
26:   const [isOpen, setIsOpen] = useState(false);
27:   const dropdownRef = useRef<HTMLDivElement>(null);
28: 
29:   useEffect(() => {
30:     const handleClickOutside = (event: MouseEvent) => {
31:       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
32:         setIsOpen(false);
33:       }
34:     };
35: 
36:     document.addEventListener("mousedown", handleClickOutside);
37:     return () => document.removeEventListener("mousedown", handleClickOutside);
38:   }, []);
39: 
40:   const handleOptionClick = (optionValue: string) => {
41:     onChange(optionValue);
42:     setIsOpen(false);
43:   };
44: 
45:   const selectedOption = options.find(option => option.value === value);
46: 
47:   return (
48:     <div className={styles.dropdownContainer} ref={dropdownRef}>
49:       <div onClick={() => setIsOpen(!isOpen)}>
50:         {trigger || (
51:           <button className={styles.dropdownButton}>
52:             {selectedOption ? selectedOption.label : placeholder}
53:           </button>
54:         )}
55:       </div>
56:       
57:       {isOpen && (
58:         <div className={`${styles.dropdownMenu} ${menuClassName || ''}`}>
59:           {options.map((option) => (
60:             <div
61:               key={option.value}
62:               className={`${styles.dropdownOption} ${
63:                 option.value === value ? styles.selected : ""
64:               }`}
65:               onClick={() => handleOptionClick(option.value)}
66:             >
67:               {option.label}
68:             </div>
69:           ))}
70:         </div>
71:       )}
72:     </div>
73:   );
74: };
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
 41:    * Optional custom trigger element
 42:    */
 43:   trigger?: React.ReactNode;
 44:   
 45:   /**
 46:    * Optional custom class name for the dropdown container
 47:    */
 48:   className?: string;
 49:   
 50:   /**
 51:    * Optional custom class name for the dropdown menu
 52:    */
 53:   menuClassName?: string;
 54:   
 55:   /**
 56:    * Optional size variant
 57:    * @default 'md'
 58:    */
 59:   size?: 'sm' | 'md' | 'lg';
 60:   
 61:   /**
 62:    * Whether the dropdown is disabled
 63:    * @default false
 64:    */
 65:   disabled?: boolean;
 66:   
 67:   /**
 68:    * Optional maximum height for the dropdown menu in pixels
 69:    * @default 300
 70:    */
 71:   maxHeight?: number;
 72: }
 73: 
 74: export const Dropdown: React.FC<DropdownProps> = ({
 75:   options,
 76:   value,
 77:   onChange,
 78:   placeholder = 'Select option',
 79:   multiple = false,
 80:   trigger,
 81:   className,
 82:   menuClassName,
 83:   size = 'md',
 84:   disabled = false,
 85:   maxHeight = 300,
 86: }) => {
 87:   const [isOpen, setIsOpen] = useState(false);
 88:   const dropdownRef = useRef<HTMLDivElement>(null);
 89:   const menuRef = useRef<HTMLDivElement>(null);
 90:   
 91:   // Handle click outside to close dropdown
 92:   useEffect(() => {
 93:     const handleClickOutside = (event: MouseEvent) => {
 94:       if (
 95:         dropdownRef.current &&
 96:         !dropdownRef.current.contains(event.target as Node)
 97:       ) {
 98:         setIsOpen(false);
 99:       }
100:     };
101:     
102:     if (isOpen) {
103:       document.addEventListener('mousedown', handleClickOutside);
104:       return () => document.removeEventListener('mousedown', handleClickOutside);
105:     }
106:   }, [isOpen]);
107:   
108:   const handleSelect = useCallback((option: DropdownOption) => {
109:     if (!option.disabled) {
110:       onChange(option.value);
111:       setIsOpen(false);
112:     }
113:   }, [onChange]);
114: 
115:   const handleKeyDown = useCallback((event: KeyboardEvent) => {
116:     const options = Array.from(dropdownRef.current?.querySelectorAll('[role="option"]') || []);
117:     const currentIndex = options.findIndex(opt => opt === document.activeElement);
118: 
119:     switch (event.key) {
120:       case 'ArrowDown': {
121:         event.preventDefault();
122:         const nextIndex = currentIndex + 1 < options.length ? currentIndex + 1 : 0;
123:         (options[nextIndex] as HTMLElement).focus();
124:         break;
125:       }
126:       case 'ArrowUp': {
127:         event.preventDefault();
128:         const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
129:         (options[prevIndex] as HTMLElement).focus();
130:         break;
131:       }
132:       case 'Enter':
133:       case 'Space': {
134:         event.preventDefault();
135:         const focusedOption = document.activeElement as HTMLDivElement;
136:         if (focusedOption?.dataset?.value) {
137:           const option = options.find(opt => opt.value === focusedOption.dataset.value);
138:           if (option) {
139:             handleSelect(option);
140:           }
141:         }
142:         break;
143:       }
144:       case 'Escape': {
145:         event.preventDefault();
146:         setIsOpen(false);
147:         break;
148:       }
149:     }
150:   }, [handleSelect]);
151: 
152:   useEffect(() => {
153:     if (isOpen) {
154:       document.addEventListener('keydown', handleKeyDown);
155:       return () => document.removeEventListener('keydown', handleKeyDown);
156:     }
157:   }, [isOpen, handleKeyDown]);
158:   
159:   const getSelectedLabel = () => {
160:     if (multiple) {
161:       const selectedCount = Array.isArray(value) ? value.length : 0;
162:       return selectedCount > 0
163:         ? `${selectedCount} selected`
164:         : placeholder;
165:     }
166:     
167:     const selectedOption = options.find(opt => opt.value === value);
168:     return selectedOption ? selectedOption.label : placeholder;
169:   };
170:   
171:   const isSelected = (optionValue: string) => {
172:     if (multiple) {
173:       return Array.isArray(value) && value.includes(optionValue);
174:     }
175:     return value === optionValue;
176:   };
177:   
178:   return (
179:     <div
180:       ref={dropdownRef}
181:       className={cn(
182:         styles.dropdown,
183:         styles[size],
184:         disabled && styles.disabled,
185:         className
186:       )}
187:     >
188:       {trigger ? (
189:         <div
190:           onClick={() => !disabled && setIsOpen(!isOpen)}
191:           className={cn(styles.trigger, isOpen && styles.active)}
192:         >
193:           {trigger}
194:         </div>
195:       ) : (
196:         <button
197:           type="button"
198:           className={cn(styles.button, isOpen && styles.active)}
199:           onClick={() => !disabled && setIsOpen(!isOpen)}
200:           aria-haspopup="listbox"
201:           aria-expanded={isOpen}
202:           disabled={disabled}
203:         >
204:           <span className={styles.buttonLabel}>{getSelectedLabel()}</span>
205:           <ChevronDown
206:             size={16}
207:             className={cn(styles.chevron, isOpen && styles.chevronOpen)}
208:           />
209:         </button>
210:       )}
211:       
212:       {isOpen && (
213:         <div
214:           ref={menuRef}
215:           className={cn(styles.menu, menuClassName)}
216:           style={{ maxHeight }}
217:           role="listbox"
218:           aria-multiselectable={multiple}
219:         >
220:           {options.map((option) => (
221:             <div
222:               key={option.value}
223:               className={cn(
224:                 styles.option,
225:                 isSelected(option.value) && styles.selected,
226:                 option.disabled && styles.disabled
227:               )}
228:               onClick={() => handleSelect(option)}
229:               role="option"
230:               aria-selected={isSelected(option.value)}
231:               tabIndex={0}
232:               data-value={option.value}
233:             >
234:               {option.icon && (
235:                 <span className={styles.optionIcon}>{option.icon}</span>
236:               )}
237:               <span className={styles.optionLabel}>{option.label}</span>
238:               {multiple && isSelected(option.value) && (
239:                 <span className={styles.checkmark}>✓</span>
240:               )}
241:             </div>
242:           ))}
243:         </div>
244:       )}
245:     </div>
246:   );
247: };
```
