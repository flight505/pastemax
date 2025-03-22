# PasteMax UI Component System 

This document outlines the component architecture, styling approach, and implementation checklist for the PasteMax UI system, inspired by shadcn/ui's design patterns.

## 🎯 Design Goals

- Create a consistent, accessible component library
- Separate design from implementation
- Maintain compatibility with the Electron ecosystem
- Support light and dark themes seamlessly
- Follow shadcn/ui design principles

## 📐 Architecture Overview

Our component system follows a two-layer architecture:

1. **Structure & Behavior Layer**: Core functionality, accessibility, and interactions
2. **Style Layer**: Visual presentation using CSS variables and CSS Modules

## 🎨 Styling Approach

### CSS Variables System

We follow shadcn/ui's theme variable naming convention for consistent styling across all components:

```css
:root {
  /* Core theme colors - always use these semantic names in components */
  --background: 0 0% 100%;        /* Base background */
  --foreground: 240 10% 3.9%;     /* Primary text */
  --popover: 0 0% 100%;           /* Floating elements */
  --popover-foreground: 240 10% 3.9%;
  --secondary: 240 4.8% 95.9%;    /* Secondary backgrounds */
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;        /* Subtle elements */
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;       /* Emphasis elements */
  --accent-foreground: 240 5.9% 10%;
}
```

### Theme Variable Usage Rules

1. **Semantic Variable Names**
   - ✅ DO: Use semantic variable names (e.g., `var(--popover)`)
   - ❌ DON'T: Hardcode colors or use non-semantic names

2. **Component-Specific Styling**
   - ✅ DO: Use appropriate semantic variables for each UI element:
     - Dropdowns/Menus: `--popover`, `--popover-foreground`
     - Secondary UI: `--secondary`, `--secondary-foreground`
     - Subtle text: `--muted-foreground`
     - Interactive elements: `--accent`, `--accent-foreground`
   - ❌ DON'T: Mix semantic contexts (e.g., using `--card` for popover)

3. **State Management**
   - Default: Use base semantic variables
   - Hover: Use appropriate hover state variables
   - Active/Selected: Use accent or selected state variables
   - Disabled: Apply opacity to base variables

4. **Dark Mode Compatibility**
   - All components must use theme variables that have dark mode values
   - Never use hardcoded colors that won't adapt to dark mode
   - Test all states in both light and dark modes

### Component CSS Structure

```typescript
// ComponentName.tsx
import styles from './ComponentName.module.css';

// ComponentName.module.css
.componentRoot {
  background: var(--background);
  color: var(--foreground);
}

.interactive:hover {
  background: var(--accent);
  color: var(--accent-foreground);
}
```

### Common Component Patterns

1. **Dropdowns/Popovers**
```css
.dropdown {
  background: var(--popover);
  color: var(--popover-foreground);
  border: 1px solid var(--border);
}

.dropdownItem:hover {
  background: var(--accent);
  color: var(--accent-foreground);
}
```

2. **Buttons**
```css
.button {
  background: var(--secondary);
  color: var(--secondary-foreground);
}

.buttonPrimary {
  background: var(--primary);
  color: var(--primary-foreground);
}
```

3. **Text Elements**
```css
.label {
  color: var(--foreground);
}

.helperText {
  color: var(--muted-foreground);
}
```

### Implementation Guidelines

1. **File Organization**
   - Component files must be co-located:
     ```
     ComponentName/
     ├── ComponentName.tsx
     ├── ComponentName.module.css
     └── index.ts
     ```

2. **Variable Usage**
   - Import theme variables from index.css
   - Use CSS modules for component-specific styles
   - Follow semantic naming in both TSX and CSS files

3. **Style Inheritance**
   - Components should be self-contained
   - Use composition over inheritance
   - Avoid global styles except in index.css

4. **Documentation**
   - Document any custom variables in component CSS
   - Include theme requirements in component docs
   - Note any specific dark mode considerations

### Component-Level CSS Modules

We use CSS Modules for component-specific styling with clear hierarchy:

```
src/
  components/
    ui/
      Button/
        Button.tsx
        Button.module.css
```

#### Component Styling Hierarchy

Components follow a strict styling hierarchy to maintain independence:

1. **Container Components** (e.g., Sidebar):
   - Handle layout and structure
   - Background colors only applied to content areas
   - Avoid background colors that might affect child components

2. **Header Components** (e.g., FileTreeHeader):
   - Manage their own background colors
   - Use z-index when needed for proper layering
   - Independent of parent background colors

3. **Content Components** (e.g., FileTree):
   - Use primary background colors
   - Handle their own scrolling and overflow

This hierarchy ensures:
- Clear separation of concerns
- Predictable styling inheritance
- Easy maintenance and debugging
- Component portability

### Utility Functions

We'll implement shadcn/ui's utilities:

```typescript
// src/utils/cn.ts
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
```

## 🧩 Component Architecture

### Base Components Directory

```
src/
  components/
    ui/
      Button/
      Card/
      Dialog/
      Dropdown/
      Input/
      Switch/
      Toggle/
      ... other components ...
```

## 📋 Standardized Component Variants

### Button Variants

We support several button variants to address different UI needs:

#### 1. Primary Button
- **Appearance**: Solid filled background (black in light mode, white in dark mode) with contrasting text
- **State Changes**:
  - **Default**: Filled background with sharp contrast
  - **Hover**: Slight opacity decrease (90%)
  - **Active/Pressed**: Slight darkening effect
  - **Disabled**: 50% opacity, not clickable
- **Usage**: Main actions, calls-to-action (e.g., "Select All", "Copy")
- **Height**: 30px (sm), 36px (md), 42px (lg)

#### 2. Secondary Button
- **Appearance**: Subtle background with border emphasis
- **State Changes**:
  - **Default**: Light background with border
  - **Hover**: Slightly darker background
  - **Active/Pressed**: Darker background
  - **Disabled**: 50% opacity, not clickable
- **Usage**: Supporting actions, alternative choices (e.g., "Deselect All", "Cancel")
- **Height**: 30px (sm), 36px (md), 42px (lg)

#### 3. Ghost Button
- **Appearance**: No background or border until interaction
- **State Changes**:
  - **Default**: Text color only, transparent background
  - **Hover**: Light background appears
  - **Active/Pressed**: Slightly darker background
  - **Disabled**: 50% opacity, not clickable
- **Usage**: Toolbar actions, compact interfaces, icon buttons
- **Height**: 30px (sm), 36px (md), 42px (lg)

#### 4. Destructive Button
- **Appearance**: Red background with white text
- **State Changes**:
  - **Default**: Red background
  - **Hover**: Darker red
  - **Active/Pressed**: Even darker red
  - **Disabled**: 50% opacity, not clickable
- **Usage**: Destructive actions (e.g., "Delete", "Clear")
- **Height**: 30px (sm), 36px (md), 42px (lg)

#### 5. Pill Button
- **Appearance**: Fully rounded corners (border-radius: 9999px)
- **Variants**: Can be applied to Primary, Secondary, Ghost, or Destructive
- **Usage**: Floating actions, filters, tags
- **Height**: 30px (sm), 36px (md), 42px (lg)

#### 6. Dual Button
- **Appearance**: Tab-like buttons that work as a toggle group
- **State Changes**:
  - **Selected**: Uses accent color and underline
  - **Unselected**: Normal text color, no underline
- **Usage**: Toggle between related views (e.g., "Local Folder" / "Global Defaults")
- **Height**: 38px (fixed)

### Switch/Toggle Variants

#### 1. Standard Toggle
- **Appearance**: Pill-shaped track with circular thumb
- **State Changes**:
  - **On**: Accent color background with white thumb to right
  - **Off**: Muted background with white thumb to left
  - **Disabled**: 50% opacity, not clickable
- **Size**: 
  - Width: 36px (sm), 44px (md)
  - Height: 20px (sm), 24px (md)
  - Thumb: 14px (sm), 18px (md)
- **Usage**: Boolean settings (e.g., "Show User Instructions")

### Input Variants

#### 1. Standard Input
- **Appearance**: Simple bordered text input
- **State Changes**:
  - **Default**: Border color
  - **Focus**: Border highlight + subtle shadow ring
  - **Error**: Red border
  - **Disabled**: 50% opacity, not editable
- **Size**: 30px (sm), 38px (md), 46px (lg) height
- **Usage**: Form fields, text entry

#### 2. Search Input
- **Appearance**: Input with search icon and clear button
- **State Changes**: Same as Standard Input
- **Features**: Left icon for search, optional right icon for clearing
- **Usage**: Search functionality

### Card Variants

#### 1. Standard Card
- **Appearance**: Subtle border, rounded corners, white background
- **State Changes**:
  - **Default**: Standard border
  - **Hover**: Slightly highlighted border
  - **Selected**: Accent color border with subtle shadow
- **Usage**: Content containers, file cards

#### 2. Interactive Card
- **Appearance**: Same as Standard Card but with hover effects
- **State Changes**: 
  - **Hover**: Border highlight, subtle shadow
  - **Active**: Darker border, more pronounced shadow
- **Usage**: Clickable cards, selectable items

## ✅ Implementation Checklist

### 1. Setup Core Utilities

- [x] Create `src/utils/cn.ts` utility for class composition
- [x] Create variant generation utility
- [x] Add CSS reset and base styles

### 2. Core Components

#### Button Component
- [x] Create Button component with variants:
  - [x] Primary (filled background)
  - [x] Secondary (subtle background)
  - [x] Ghost (transparent background)
  - [x] Destructive (error state)
- [x] Support sizes: small, medium, large
- [x] Support disabled state
- [x] Support icon placement

#### Input Component
- [x] Base text input component
- [x] Support validation states
- [x] Support prefix/suffix icons
- [x] Match text sizing of file tree

#### Toggle/Switch Component
- [x] Adjust current toggle size
- [x] Ensure consistent animation
- [x] Support disabled state

#### Card Component
- [x] Implement consistent card styling
- [x] Adjust border colors to match theme
- [x] Support hover states

#### Dialog/Modal Component
- [ ] Create reusable dialog component
- [ ] Implement backdrop and animations
- [ ] Support different sizes

#### Dropdown Component
- [ ] Create consistent dropdown styling
- [ ] Support multi-select variant
- [ ] Match current sidebar dropdown style

### 3. Compound Components

#### FileTreeHeader
- [x] Refactor to use new base components
- [x] Maintain current functionality
- [x] Ensure responsive behavior
- [x] Independent background color management
- [x] Proper z-index layering

#### SearchBar
- [x] Use new Input component
- [x] Maintain current styling but standardize

#### CopyButton
- [x] Convert to new Button component
- [x] Simplify to "Copy" with count indicator
- [x] Add download/save button adjacent

#### User Instructions
- [x] Match text input to sidebar styling
- [x] Standardize font sizes
- [x] Improve visual hierarchy

### 4. Theme Integration

- [ ] Ensure all components respect light/dark mode
- [ ] Test theme transitions
- [ ] Verify consistent component appearance

## 🚀 Implementation Strategy

1. Create the `/ui` directory and base utilities
2. Implement core components one by one
3. Update existing components to use the new system
4. Test thoroughly for theme compatibility
5. Document the component API

## 🤝 Contributing Guidelines

- Follow existing naming conventions
- Use CSS Modules for component styles
- Maintain accessibility standards
- Test in both light and dark modes 


## original shadcn/ui zink theme
light mode:
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
  }

  .dark-mode {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}
