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

We'll continue using our robust CSS variables system defined in `index.css`, which already aligns well with shadcn/ui's monochrome zinc palette:

```css
:root {
  /* Base colors */
  --background-primary: hsl(0, 0%, 100%);
  --background-secondary: hsl(240, 4.8%, 95.9%);
  /* ... other variables ... */
}

.dark-mode {
  --background-primary: hsl(240, 10%, 3.9%);
  /* ... dark mode variables ... */
}
```

### Component-Level CSS Modules

We'll transition to CSS Modules for component-specific styling:

```
src/
  components/
    ui/
      Button/
        Button.tsx
        Button.module.css
```

### Utility Functions

We'll implement shadcn/ui's utilities:

```typescript
// src/utils/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

## ✅ Implementation Checklist

### 1. Setup Core Utilities

- [ ] Create `src/utils/cn.ts` utility for class composition
- [ ] Create variant generation utility (if needed)
- [ ] Add CSS reset and base styles

### 2. Core Components

#### Button Component
- [ ] Create Button component with variants:
  - [ ] Primary (filled background)
  - [ ] Secondary (subtle background)
  - [ ] Ghost (transparent background)
  - [ ] Destructive (error state)
- [ ] Support sizes: small, medium, large
- [ ] Support disabled state
- [ ] Support icon placement

#### Input Component
- [ ] Base text input component
- [ ] Support validation states
- [ ] Support prefix/suffix icons
- [ ] Match text sizing of file tree

#### Toggle/Switch Component
- [ ] Adjust current toggle size
- [ ] Ensure consistent animation
- [ ] Support disabled state

#### Card Component
- [ ] Implement consistent card styling
- [ ] Adjust border colors to match theme
- [ ] Support hover states

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
- [ ] Refactor to use new base components
- [ ] Maintain current functionality
- [ ] Ensure responsive behavior

#### SearchBar
- [ ] Use new Input component
- [ ] Maintain current styling but standardize

#### CopyButton
- [ ] Convert to new Button component
- [ ] Simplify to "Copy All" with count indicator
- [ ] Add download/save button adjacent

#### User Instructions
- [ ] Match text input to sidebar styling
- [ ] Standardize font sizes
- [ ] Improve visual hierarchy

### 4. Theme Integration

- [ ] Ensure all components respect light/dark mode
- [ ] Test theme transitions
- [ ] Verify consistent component appearance

### 5. Documentation

- [ ] Document component API
- [ ] Create usage examples
- [ ] Provide customization guidelines

## 🔍 Component-Specific Guidelines

### Buttons

1. **Primary Button**
   - Used for main actions (e.g., "Select All", "Copy All")
   - Filled background with high contrast

2. **Secondary Button**
   - Used for supplementary actions
   - Subtle background, border emphasis

3. **Ghost Button**
   - Used for tertiary actions
   - No background, only shows on hover

### Inputs

1. **Text Input**
   - Match font size with sidebar file tree
   - Consistent padding and border radius
   - Clear focus states

2. **Search Input**
   - Maintain current sidebar search styling
   - Apply consistently throughout app

### Cards

1. **File Cards**
   - Enhance border contrast
   - Consistent padding and spacing
   - Clear selected state

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