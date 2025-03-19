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
| FileTreeHeader | ✅ | ✅ | ⏳ | Global CSS removed, module verified |
| Sidebar | ✅ | ✅ | ⏳ | Global CSS removed, module verified |
| IgnorePatterns | ✅ | ✅ | ⏳ | Global CSS removed, module verified |
| FileList | ✅ | - | ⏳ | Module in place, testing needed |

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

## Current Focus: Verification & Testing

### Progress Update (March 19, 2025)

✅ Completed Tasks:
1. Removed redundant global CSS files
2. Cleaned up index.css
3. Added new global CSS variables
4. Updated components for consistency
5. Updated UI components
6. Added comprehensive documentation
7. Implemented theme testing
8. Completed theme variable verification:
   - Light mode variables verified
   - Dark mode variables verified
   - Component-specific variables checked
   - State transitions documented

⏳ In Progress:
1. Browser compatibility testing
2. Documentation review

🔜 Next Actions:
1. Run cross-browser compatibility tests
2. Final documentation review and updates

### Known Issues & Resolution

| Component | Issue | Status | Resolution |
|-----------|--------|--------|------------|
| FileTreeHeader | Scrollbar styling conflict | ✅ Done | Moved to CSS variables |
| Sidebar | Theme toggle inconsistency | ✅ Done | Using standardized theme variables |
| IgnorePatterns | Modal z-index conflicts | ✅ Done | Using new z-index variables |
| FileList | Theme class inconsistency | ✅ Done | Removed .dark in favor of .dark-mode |
| Button | Focus state visibility | ✅ Done | Improved focus ring with background |
| Card | Inconsistent shadows | ✅ Done | Using standardized shadow variables |
| Switch | Toggle variables | ✅ Done | Simplified to use direct values |
| Input | Focus states | ✅ Done | Standardized with other components |
| Theme Variables | Dark mode transition | ✅ Done | Verified with theme testing utility |

### Next Steps

1. Cross-browser testing (ETA: 1 day)
2. Final documentation review (ETA: 4 hours)

---

**Last Updated**: March 19, 2025
**Status**: Testing Phase - Theme Testing Complete
**Owner**: [Team Lead Name] 