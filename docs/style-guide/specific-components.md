# PasteMax Component-Specific Implementation Guide

This document outlines detailed implementation guidance for specific components that need updating in our shadcn/ui-inspired design system.

## 🎯 Primary Components to Update

### 1. Copy All Selected Button

**Current Issues:**
- Button is oversized
- Doesn't match primary button styling
- Text could be more concise

**Implementation Plan:**

```tsx
<div className="copy-download-container">
  <Button 
    variant="primary" 
    size="md" 
    onClick={handleCopySelected}
    startIcon={<Copy size={16} />}
  >
    Copy All
  </Button>
  
  <span className="selected-counter">
    Selected ({selectedFilesCount} files)
  </span>
  
  <Button
    variant="secondary"
    size="md"
    onClick={handleDownloadSelected}
    startIcon={<Download size={16} />}
    title="Save selected files"
  >
    Save
  </Button>
</div>
```

**CSS Requirements:**
```css
.copy-download-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.selected-counter {
  font-size: 14px;
  color: var(--text-secondary);
}
```

### 2. User Instructions Text Input

**Current Issues:**
- Font size is too large
- Doesn't match file tree styling
- Internal text differs from other areas

**Implementation Plan:**

```tsx
<div className="user-instructions">
  <label htmlFor="userInstructions" className="user-instructions-label">
    User Instructions
  </label>
  <Input
    id="userInstructions"
    placeholder="Enter instructions for models here..."
    value={userInstructions}
    onChange={handleInstructionsChange}
    className="user-instructions-input"
  />
</div>
```

**CSS Requirements:**
```css
.user-instructions-label {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  color: var(--text-primary);
}

.user-instructions-input {
  font-size: 14px; /* Match file tree font size */
  min-height: 100px;
  resize: vertical;
}
```

### 3. Toggle Switch Size Adjustment

**Current Issues:**
- Toggle is slightly too large

**Implementation Plan:**

Update the CSS variables in our Switch component:

```css
.switch {
  --switch-width: 36px;     /* Reduced from current size */
  --switch-height: 20px;    /* Reduced from current size */
  --thumb-size: 14px;       /* Reduced from current size */
  --thumb-offset: 3px;
  
  position: relative;
  display: inline-flex;
  width: var(--switch-width);
  height: var(--switch-height);
  border-radius: 999px;
  background-color: var(--background-secondary);
  transition: background-color 0.2s ease;
}

.switch[data-state="checked"] {
  background-color: var(--accent-color);
}

.switch-thumb {
  position: absolute;
  top: var(--thumb-offset);
  left: var(--thumb-offset);
  width: var(--thumb-size);
  height: var(--thumb-size);
  border-radius: 50%;
  background-color: var(--background-primary);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.switch[data-state="checked"] .switch-thumb {
  transform: translateX(calc(var(--switch-width) - var(--thumb-size) - (var(--thumb-offset) * 2)));
}
```

### 4. File Cards

**Current Issues:**
- Border contrast is too low in both themes

**Implementation Plan:**

Update the Card component CSS:

```css
.card {
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  background-color: var(--card-background);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  border-color: var(--accent-color); /* Increased contrast on hover */
}

.card.selected {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 1px var(--accent-color);
}
```

## 🔍 Button Variants Matrix

| Variant    | Primary Use Cases                   | Styling                             |
|------------|------------------------------------|------------------------------------|
| Primary    | "Select All", "Copy All", main actions | Filled background, high contrast    |
| Secondary  | "Save", secondary actions         | Subtle background, border emphasis  |
| Ghost      | Icon buttons in headers/toolbars   | No background except on hover       |
| Destructive| "Clear", "Reset", destructive actions | Red background, white text          |

## 🎨 Component to Style Mapping

| Component           | Suggested Styling                                 |
|---------------------|--------------------------------------------------|
| Select All Button   | `<Button variant="primary">`                     |
| Deselect All Button | `<Button variant="secondary">`                   |
| Copy All Button     | `<Button variant="primary" startIcon={<Copy />}>`|
| Save Button         | `<Button variant="secondary" startIcon={<Download />}>`|
| Search Input        | Keep current styling, refactor to use Input component|
| Sidebar Icons       | Keep current styling                              |
| User Instructions   | Match font size with file tree                    |
| Multi-select Button | Use consistent styling with toggles               |

## 🚀 Implementation Timeline

1. **Week 1: Core Components**
   - Set up `/ui` directory and utilities
   - Implement Button component with all variants
   - Implement Input component

2. **Week 2: Key Updates**
   - Update Copy All Selected button and add Save button
   - Adjust user instructions styling
   - Update toggle/switch sizing

3. **Week 3: Cohesive System**
   - Enhance card contrast
   - Standardize dropdown components
   - Update remaining controls

4. **Week 4: Polish & Documentation**
   - Test in all themes
   - Ensure accessibility
   - Complete documentation

## 📋 Post-Implementation Checklist

- [ ] All components follow shadcn/ui aesthetic
- [ ] Light and dark mode look consistent
- [ ] Transitions are smooth
- [ ] No regressions in functionality
- [ ] Documentation is complete
- [ ] Accessibility is maintained
- [ ] Code follows project conventions 