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
- **Usage**: Main actions, calls-to-action (e.g., "Select All", "Copy All")
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

#### SearchBar
- [x] Use new Input component
- [x] Maintain current styling but standardize

#### CopyButton
- [x] Convert to new Button component
- [x] Simplify to "Copy All" with count indicator
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