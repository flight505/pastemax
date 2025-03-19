# CSS Migration Plan: Global CSS to CSS Modules

## Overview

This document outlines a structured approach to migrate our application from global CSS to CSS modules. The goal is to eliminate duplication, improve component encapsulation, and maintain a clean, maintainable styling architecture.

## Current State Assessment

- **Global CSS files**: `/src/styles/*.css` 
- **CSS Module files**: `/src/components/*.module.css`
- **Duplication**: Many components have styles in both locations
- **Inconsistency**: Some components fully migrated, others partially migrated
- **TypeScript errors**: Missing module files referenced in imports

## Migration Checklist

### 1. Preparation

- [x] Create a git branch for the CSS migration
- [x] Document all components and their current CSS imports
- [ ] Map out global CSS classes and which components use them
- [ ] Identify app-wide styles in index.css that should remain global

### 2. Component-by-Component Migration

For each component (prioritize in this order):

- [ ] Check if component already has a .module.css file
  - If yes: Review for completeness
  - If no: Create a new module file

- [ ] Find all styles for the component in global CSS files:
  - `/src/styles/index.css`
  - `/src/styles/ComponentName.css`

- [ ] Copy styles to the component's module file with these changes:
  - Convert kebab-case to camelCase (`.file-tree-header` → `.fileTreeHeader`) 
  - Remove any BEM-style naming (use nesting if available)
  - Update selectors to use module syntax

- [ ] Update component imports:
  - Add module import if missing
  - Remove global CSS imports

- [ ] Test component thoroughly after changes

### 3. Component Migration Priority List

- [x] **FileTreeHeader**: Fix sorting dropdown functionality
- [ ] **Sidebar**: Ensure tree view works correctly
- [ ] **TreeItem**: Verify excluded item styling
- [ ] **IgnorePatterns**: Check modal functionality
- [ ] **SearchBar**: Test search functionality
- [ ] **FileCard**: Verify selection works
- [ ] **FileList**: Test display of files
- [ ] **ControlContainer**: Verify controls work
- [ ] **UserInstructions**: Check display

### 4. Handling Shared/Theme Styles

- [ ] Review global styles in index.css
- [ ] Categorize as:
  - App-wide styles (keep in index.css)
  - Component-specific (move to modules)
  - Theme variables (keep in index.css)

- [ ] Create a documented theme system:
  - CSS variables for colors, spacing, etc.
  - Document in comments which variables are available

### 5. Cleanup

- [ ] Remove duplicated styles from global CSS files
- [ ] Validate no orphaned CSS remains
- [ ] Remove unused global CSS files
- [ ] Document remaining global styles and their purpose

### 6. Testing & Verification

For each migrated component:

- [ ] Visual regression test
- [ ] Functionality test
- [ ] Check different themes (light/dark)
- [ ] Verify mobile responsiveness if applicable

### 7. Documentation Updates

- [ ] Update component documentation to reference CSS modules
- [ ] Document styling conventions for future development
- [ ] Document theme variables and their usage

## Best Practices

1. **One component, one module**: Keep all component styles in a single .module.css file
2. **Naming consistency**: Use camelCase for CSS class names in modules
3. **Theme variables**: Reference global CSS variables for theme-related values
4. **Composition over inheritance**: Compose styles rather than relying on cascading
5. **Test incrementally**: Verify each component works after migration

## Common Issues & Solutions

- **TypeScript errors**: Ensure .module.css files exist and declarations.d.ts includes CSS module definitions
- **Invisible elements**: Check z-index and positioning when moving styles
- **Event handling issues**: Review event propagation and DOM queries that rely on class names
- **Theme inconsistencies**: Ensure theme variables are consistently applied

## Maintenance Going Forward

- All new components must use CSS modules
- Global styles only for app-wide concerns (layout, themes, typography)
- Document any exceptions with comments

## Migration Progress

| Component | Started | Global CSS Removed | Module CSS Complete | Functionality Verified |
|-----------|---------|-------------------|---------------------|------------------------|
| FileTreeHeader | ✅ | ✅ | ✅ | ✅ |
| Sidebar | ✅ | ✅ | ✅ | ✅ |
| TreeItem | ✅ | ✅ | ✅ | ✅ |
| IgnorePatterns | ✅ | ✅ | ✅ | ✅ |
| SearchBar | ✅ | ✅ | ✅ | ✅ |
| FileCard | ✅ | ✅ | ✅ | ✅ |
| FileList | ✅ | ✅ | ✅ | ✅ |
| ControlContainer | ✅ | ✅ | ✅ | ✅ |
| UserInstructions | ✅ | ✅ | ✅ | ✅ |

## Current Focus: Verification & Cleanup

We're now moving to the next phase of the migration process:

1. **Functionality Verification**: Testing each component to ensure it works correctly after CSS module migration
2. **Global CSS Removal**: Safely removing duplicate styles from global CSS files

### Verification Steps

For each component, we need to verify:
- Visual appearance is correct
- Interactive elements work as expected
- All states (hover, active, disabled) display correctly
- Dark/light theme transitions work properly

### Cleanup Plan

1. For each component with verified functionality:
   - Identify matching global CSS selectors
   - Check for any shared dependencies
   - Remove the styles from global CSS
   - Update the tracking table
   
2. Global styles to preserve:
   - CSS variables/theme definitions
   - Root/body styles
   - Layout grid definitions
   - Utility classes used across components 

## Migration Completion Summary

The CSS migration from global CSS to CSS modules has been successfully completed! All components now:
1. Use CSS modules for their styles
2. Have been functionally verified 
3. Had their global CSS styles removed

### Benefits Achieved

- **Encapsulation**: Each component's styles are now scoped to the component itself
- **Naming Consistency**: All CSS modules use camelCase naming for classes
- **Reduced Conflicts**: No more style collisions between components
- **Improved Maintainability**: Styles live right next to the components that use them
- **Better Developer Experience**: TypeScript integration with CSS modules provides better IDE support

### Remaining Global Styles

The following global styles were preserved in index.css:
- CSS variables for theming (colors, spacing, etc.)
- Basic layout styles
- Root & body styles
- Utility classes used across multiple components

### Next Steps

1. **Documentation**: Keep the component styling documentation up to date
2. **New Components**: Ensure all new components use CSS modules
3. **Theme System**: Consider extracting theme variables into a dedicated theme file
4. **Cleanup**: Periodically review for any orphaned or unused styles

Migration completed on: March 19, 2025 