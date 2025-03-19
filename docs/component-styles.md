# Component Styling Guide

## Overview

This document outlines our standardized approach to component styling using CSS Modules and theme variables.

## Theme System

### Color Variables

```css
/* Light Theme (default) */
--background-primary: hsl(0, 0%, 100%)
--background-secondary: hsl(240, 4.8%, 95.9%)
--text-primary: hsl(240, 10%, 3.9%)
--text-secondary: hsl(240, 3.8%, 46.1%)
--accent-color: hsl(240, 3.8%, 46.1%)
/* ... and more */

/* Dark Theme (.dark-mode) */
--background-primary: hsl(240, 10%, 3.9%)
--background-secondary: hsl(240, 3.7%, 15.9%)
--text-primary: hsl(0, 0%, 98%)
--text-secondary: hsl(240, 5%, 64.9%)
--accent-color: hsl(240, 5%, 64.9%)
```

### Elevation System

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 4px 12px rgba(0, 0, 0, 0.2)
--shadow-xl: 0 8px 16px rgba(0, 0, 0, 0.3)
```

### Z-Index Layers

```css
--z-index-modal: 1000
--z-index-dropdown: 100
--z-index-tooltip: 50
```

## Component Standards

### Focus States
All interactive elements should use this focus style:
```css
element:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--background-primary),
              0 0 0 4px var(--ring-color);
}
```

### Button Heights
```css
--button-height-sm: 30px
--button-height-md: 36px
--button-height-lg: 42px
```

### Border Radius
```css
--radius: 0.5rem
--radius-full: 9999px
```

## Component Examples

### Button Component
```css
.button {
  height: var(--button-height-md);
  border-radius: var(--radius);
  background-color: var(--background-primary);
  color: var(--text-primary);
}

.button:hover:not(:disabled) {
  background-color: var(--hover-color);
  box-shadow: var(--shadow-sm);
}
```

### Input Component
```css
.input {
  height: var(--button-height-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  color: var(--text-primary);
}

.input:focus {
  border-color: var(--ring-color);
  box-shadow: 0 0 0 2px var(--background-primary),
              0 0 0 4px var(--ring-color);
}
```

### Switch Component
```css
.switch {
  width: 36px;
  height: 20px;
  border-radius: var(--radius-full);
  background-color: var(--text-disabled);
}

.switchChecked {
  background-color: var(--accent-color);
}
```

## Best Practices

1. **Theme Consistency**
   - Always use CSS variables for colors
   - Use .dark-mode class for dark theme styles
   - Test components in both themes

2. **Focus States**
   - Always implement :focus-visible
   - Use consistent focus ring styling
   - Ensure high contrast in both themes

3. **Animation Standards**
   - Use transition: all 0.2s ease for general transitions
   - Use transform for performance
   - Keep animations subtle and purposeful

4. **Accessibility**
   - Maintain color contrast ratios
   - Provide visible focus indicators
   - Support reduced motion preferences

5. **Mobile Considerations**
   - Use relative units (rem) for spacing
   - Test touch targets (min 44px)
   - Verify hover states on touch devices

## CSS Module Naming Conventions

1. **Component Root**
   - Use camelCase
   - Match component name
   - Example: `.buttonGroup`

2. **State Classes**
   - Use descriptive suffixes
   - Example: `.buttonDisabled`, `.buttonActive`

3. **Variants**
   - Use semantic names
   - Example: `.primary`, `.secondary`

4. **Child Elements**
   - Use parent name as prefix
   - Example: `.buttonIcon`, `.buttonLabel`

## Common Patterns

### Error States
```css
.inputError {
  border-color: var(--error-color);
}

.inputError:focus {
  border-color: var(--error-color);
  box-shadow: 0 0 0 2px var(--background-primary),
              0 0 0 4px var(--error-color);
}
```

### Loading States
```css
.loading {
  opacity: 0.7;
  pointer-events: none;
}
```

### Icon Placement
```css
.iconStart {
  margin-right: 8px;
}

.iconEnd {
  margin-left: 8px;
}
```

## Testing Checklist

- [ ] Component renders correctly in light theme
- [ ] Component renders correctly in dark theme
- [ ] Focus states are visible and consistent
- [ ] Hover states work as expected
- [ ] Disabled states are properly styled
- [ ] Animations are smooth
- [ ] Touch targets are adequate
- [ ] High contrast mode is supported
- [ ] Reduced motion is respected
- [ ] RTL layout is supported

---

**Last Updated**: March 19, 2025
**Version**: 1.0.0 