# PasteMax UI Style Guide

Welcome to the PasteMax UI Style Guide. This series of documents outlines our approach to implementing a shadcn/ui-inspired component system for our Electron application.

## 📚 Guide Contents

- [Component System Overview](component-system.md) - Architecture, styling approach, and implementation checklist
- [Implementation Guide](implementation-guide.md) - Detailed implementation instructions and code examples
- [Specific Components Guide](specific-components.md) - Targeted guidance for key components that need updating
- [Usage Examples](usage-examples.md) - Examples showing how to use the new UI components

## 🎯 Goals

Our goal is to implement a consistent, shadcn/ui-inspired design system while preserving the following elements that are working well:

- ✅ The header implementation with Guide link, Theme switcher, and GitHub link
- ✅ Sidebar elements with correct icon set and search bar style
- ✅ Select/Deselect All buttons
- ✅ Light/dark theme support

## 🛠️ Implementation Strategy

We'll adopt an incremental approach:

1. Create the base component architecture
2. Implement one component at a time
3. Gradually migrate existing components
4. Test in both light and dark mode

## 🔍 Key Focus Areas

1. **Button System** - Standardize all buttons with consistent variants
2. **Copy All Selected** - Improve and add Save functionality
3. **User Instructions** - Match styling with file tree
4. **Toggle Switches** - Adjust size for better proportions
5. **File Cards** - Improve border contrast

## 🏗️ Quick Start

1. Install required dependencies:
   ```bash
   npm install clsx tailwind-merge class-variance-authority
   ```

2. Create the component directory structure:
   ```bash
   mkdir -p src/components/ui
   mkdir -p src/utils
   ```

3. Start with implementing the utility functions:
   ```bash
   # Create utility files
   touch src/utils/cn.ts
   ```

4. Follow the implementation guide for each component

## 📋 Component Checklist

- [x] Button
- [x] Input/Search
- [x] Toggle/Switch
- [x] Card
- [ ] Dropdown
- [ ] Icons standardization
- [ ] Dialog/Modal (if needed)

## 🧪 Testing

For each component implementation, test:

1. Visual appearance in light and dark themes
2. Keyboard navigation and focus states
3. Component variants and states
4. Transitions and animations

## 📆 Timeline

The full implementation is expected to take 3-4 weeks, with the following milestones:

- Week 1: Core architecture and Button component
- Week 2: Input, Toggle, and Card components
- Week 3: Component migration
- Week 4: Polishing and documentation

## 🤝 Contributing

When implementing components, please:

1. Follow the architecture outlined in these guides
2. Maintain accessibility standards
3. Test in both light and dark themes
4. Document any component APIs
5. Preserve existing functionality 