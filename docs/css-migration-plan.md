# CSS Migration Plan: Global CSS to CSS Modules

## Overview

This document outlines a structured approach to migrate from global CSS to CSS Modules, addressing overlaps, conflicts, and establishing a clean styling architecture.

## 1. Current State Analysis

### 1.1 File Structure Issues
- `src/styles/*.css`: Global CSS files with potential conflicts
- `src/components/*.module.css`: Module-scoped CSS files
- Duplicate styles exist between global and module files
- Inconsistent naming conventions (.fileTreeHeader vs .file-tree-header)

### 1.2 Identified Conflicts

#### FileTreeHeader Component
- Module: `FileTreeHeader.module.css` (.fileTreeHeader, .dropdownContainer)
- Global: `src/styles/FileTreeHeader.css` (.file-tree-header, .excluded-files-count)

#### Sidebar Component
- Module: `Sidebar.module.css` (.sidebar, .sidebarSearch)
- Global: `src/styles/Sidebar.css` (.excluded-files-indicator, .sidebar)

#### IgnorePatterns Component
- Module: `IgnorePatterns.module.css` (.modal, .content)
- Global: `src/styles/IgnorePatterns.css` (.ignore-patterns-modal)

#### Scrollbar Styling Conflicts
- Component-specific in modules
- Global definitions in index.css

## 2. Migration Strategy

### 2.1 Component-Level Migration
1. **Audit Current State**
   - [ ] Document all component CSS imports
   - [ ] Map global CSS usage per component
   - [ ] Identify shared styles

2. **Migration Process Per Component**
   - [ ] Create/update .module.css file
   - [ ] Convert kebab-case to camelCase
   - [ ] Remove BEM-style naming
   - [ ] Update component imports
   - [ ] Remove global CSS imports
   - [ ] Test component thoroughly

### 2.2 Global Styles Cleanup
1. **Identify Global Styles to Preserve**
   - [ ] Theme variables
   - [ ] Reset styles
   - [ ] Typography
   - [ ] Layout utilities

2. **Remove Redundant Files**
   - [ ] Delete unused global CSS files
   - [ ] Remove duplicate selectors
   - [ ] Clean up index.css imports

### 2.3 Theming Standardization
1. **Choose Theme Implementation**
   - [ ] Standardize on .dark-mode or .dark
   - [ ] Update all theme-related selectors
   - [ ] Consolidate theme variables

2. **Scrollbar Strategy**
   - [ ] Decide on global vs component-specific styling
   - [ ] Update relevant files
   - [ ] Test across browsers

## 3. Implementation Checklist

### 3.1 Preparation Phase
- [ ] Create migration branch
- [ ] Document current CSS dependencies
- [ ] Set up testing environment
- [ ] Create backup of current styles

### 3.2 Migration Phase
- [ ] Migrate components (priority order):
  1. FileTreeHeader
  2. Sidebar
  3. IgnorePatterns
  4. FileList
  5. Additional components...

### 3.3 Testing Phase
- [ ] Visual regression testing
- [ ] Functionality verification
- [ ] Theme switching tests
- [ ] Cross-browser testing
- [ ] Mobile responsiveness

### 3.4 Cleanup Phase
- [ ] Remove deprecated global styles
- [ ] Update documentation
- [ ] Code review
- [ ] Performance testing

## 4. Best Practices Going Forward

### 4.1 Naming Conventions
- Use camelCase for CSS Module classes
- Prefix global utilities with 'global-'
- Use semantic class names

### 4.2 File Organization
- One module per component
- Theme variables in dedicated file
- Global styles in index.css only
- Utility classes in utilities.css

### 4.3 Code Standards
- No duplicate selectors
- Minimal nesting (max 3 levels)
- CSS variables for theming
- Mobile-first approach

## 5. Migration Progress Tracking

| Component | Module Created | Global Removed | Tested | Notes |
|-----------|---------------|----------------|---------|-------|
| FileTreeHeader | [ ] | [ ] | [ ] | |
| Sidebar | [ ] | [ ] | [ ] | |
| IgnorePatterns | [ ] | [ ] | [ ] | |
| FileList | [ ] | [ ] | [ ] | |

## 6. Timeline and Milestones

1. **Week 1**: Preparation & Analysis
   - Complete current state documentation
   - Set up testing environment
   - Create migration plan

2. **Weeks 2-3**: Core Components Migration
   - Migrate high-priority components
   - Initial testing and fixes

3. **Week 4**: Secondary Components
   - Migrate remaining components
   - Theme system implementation

4. **Week 5**: Testing & Cleanup
   - Complete testing suite
   - Documentation updates
   - Final cleanup

## 7. Maintenance Guidelines

### 7.1 New Component Development
- Always use CSS Modules
- Follow naming conventions
- Include component-specific types
- Document any global dependencies

### 7.2 Code Review Checklist
- No global CSS unless necessary
- Proper use of CSS Modules
- Theme compatibility
- Mobile responsiveness
- Browser compatibility

### 7.3 Documentation Requirements
- Component styling guide
- Theme usage guide
- Global styles documentation
- Utility classes reference

## 8. Risk Mitigation

### 8.1 Potential Issues
- Style conflicts during migration
- Theme inconsistencies
- Performance impacts
- Browser compatibility

### 8.2 Contingency Plans
- Rollback procedures
- Incremental testing
- Feature flags
- Browser-specific fixes

## 9. Success Metrics

- Zero style conflicts
- Improved build size
- Faster style compilation
- Reduced CSS specificity issues
- Improved developer experience

## Current Focus: Verification & Cleanup

We're now in the critical phase of verifying our CSS module migration and cleaning up redundant styles. This phase requires careful attention to detail and systematic testing.

### 1. Component Verification Process

#### 1.1 Visual Verification
- [ ] Compare each component against original designs
- [ ] Verify in both light and dark themes
- [ ] Check responsive breakpoints
- [ ] Test hover, active, and focus states

#### 1.2 Functional Testing
- [ ] Verify all interactive elements work
- [ ] Test component state changes
- [ ] Check animations and transitions
- [ ] Validate accessibility features

### 2. Cleanup Tasks

#### 2.1 Global CSS Removal
- [ ] Remove `src/styles/FileTreeHeader.css`
- [ ] Remove `src/styles/Sidebar.css`
- [ ] Remove `src/styles/IgnorePatterns.css`
- [ ] Clean up unused imports in `index.css`

#### 2.2 Module Consolidation
- [ ] Review all `.module.css` files for duplicates
- [ ] Standardize naming conventions
- [ ] Extract common patterns to shared modules
- [ ] Update component imports

#### 2.3 Theme Cleanup
- [ ] Standardize dark mode implementation
- [ ] Consolidate theme variables
- [ ] Remove redundant theme toggles
- [ ] Test theme switching thoroughly

### 3. Final Verification Checklist

#### 3.1 Performance
- [ ] Check bundle size impact
- [ ] Verify CSS loading performance
- [ ] Test rendering performance
- [ ] Monitor memory usage

#### 3.2 Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

#### 3.3 Documentation
- [ ] Update component documentation
- [ ] Document remaining global styles
- [ ] Add migration completion notes
- [ ] Update style guide

### 4. Known Issues & Resolution

| Component | Issue | Status | Resolution |
|-----------|--------|--------|------------|
| FileTreeHeader | Scrollbar styling conflict | In Progress | Removing global scrollbar styles |
| Sidebar | Theme toggle inconsistency | To Do | Standardizing to .dark-mode |
| IgnorePatterns | Modal z-index conflicts | To Do | Moving to CSS module variables |

### 5. Next Steps

1. Complete component verification (ETA: 2 days)
2. Remove redundant global CSS files (ETA: 1 day)
3. Standardize theming implementation (ETA: 2 days)
4. Final cross-browser testing (ETA: 1 day)
5. Documentation updates (ETA: 1 day)

---

**Last Updated**: March 19, 2025
**Status**: Verification & Cleanup Phase
**Owner**: [Team Lead Name] 