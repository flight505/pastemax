# Dynamic Icon Updates Implementation Checklist

This focused checklist outlines the steps to implement dynamic icons for the sort dropdowns while preserving all existing functionality.

## I. Create Icon Mapping

- [x] Create the mapping between sort options and Lucide icons in `src/utils/sortIcons.ts`:
```typescript
// Map sort options to corresponding Lucide icons
export const sortIconMap = {
  "name-ascending": "ArrowDownAZ",
  "name-descending": "ArrowUpZA",
  "tokens-ascending": "ArrowUp01",
  "tokens-descending": "ArrowDown10",
  "date-ascending": "ArrowUpNarrowWide",
  "date-descending": "ArrowDownWideNarrow"
};
```

## II. Import Required Icons

- [x] Add imports for all needed Lucide icons at the top of `src/utils/sortIcons.ts`:
```typescript
import { 
  Folder, 
  Filter, 
  X, 
  RefreshCw, 
  ArrowUpDown,        // Default icon
  ArrowDownAZ,        // For name-ascending
  ArrowUpZA,          // For name-descending
  ArrowUp01,          // For tokens-ascending
  ArrowDown10,        // For tokens-descending
  ArrowUpNarrowWide,  // For date-ascending
  ArrowDownWideNarrow // For date-descending
} from "lucide-react";
```

## III. Create Icon Component Lookup

- [x] Create an icon component lookup object in `src/utils/sortIcons.ts`:
```typescript
// Icon component lookup for direct reference
export const iconComponents = {
  "ArrowDownAZ": ArrowDownAZ,
  "ArrowUpZA": ArrowUpZA,
  "ArrowUp01": ArrowUp01,
  "ArrowDown10": ArrowDown10,
  "ArrowUpNarrowWide": ArrowUpNarrowWide,
  "ArrowDownWideNarrow": ArrowDownWideNarrow,
  "ArrowUpDown": ArrowUpDown  // Default
};
```

## IV. Implement Dynamic Icon in FileTreeHeader

- [x] Modify the `<Button>` component in the Dropdown trigger in `FileTreeHeader.tsx`:
```typescript
<Dropdown
  options={sortOptions}
  onChange={handleSortSelect}
  placeholder="Sort by..."
  value={currentSortOrder}
  trigger={
    <Button
      variant="icon"
      size="sm"
      iconOnly
      startIcon={getSortIcon(currentSortOrder)}
      title="Sort By"
      className={styles.fileTreeBtn}
    />
  }
/>
```

## V. Update Context Header Dropdown

- [x] Locate the sort dropdown in the context header (in `App.tsx` around line 1072)
- [x] Import the shared sort icon utility
- [x] Update the dropdown component with dynamic icon logic:
```typescript
<Dropdown
  options={sortOptions}
  value={sortOrder}
  onChange={handleSortChange}
  trigger={
    <Button
      variant="secondary"
      size="sm"
      startIcon={getSortIcon(sortOrder)}
    >
      Sort
    </Button>
  }
  menuClassName={styles.sortDropdownMenu}
/>
```

## VI. Alternative Implementation (More Concise)

- [x] Create a shared utility function in `src/utils/sortIcons.ts`:
```typescript
export const getSortIcon = (sortOrder?: string, size: number = 16) => {
  try {
    const iconName = sortOrder && sortIconMap[sortOrder as keyof typeof sortIconMap] 
      ? sortIconMap[sortOrder as keyof typeof sortIconMap] 
      : "ArrowUpDown";
    
    const IconComponent = iconComponents[iconName as keyof typeof iconComponents];
    return IconComponent ? <IconComponent size={size} /> : <ArrowUpDown size={size} />;
  } catch (error) {
    console.error("Error rendering sort icon:", error);
    return <ArrowUpDown size={size} />;
  }
};
```

## VII. Add Error Handling

- [x] Error handling is implemented in the shared `getSortIcon` utility function with try/catch block and TypeScript type safety

## VIII. Testing

- [x] Verify each sort option displays the correct icon in FileTreeHeader:
  - [x] name-ascending → ArrowDownAZ
  - [x] name-descending → ArrowUpZA  
  - [x] tokens-ascending → ArrowUp01
  - [x] tokens-descending → ArrowDown10
  - [x] date-ascending → ArrowUpNarrowWide
  - [x] date-descending → ArrowDownWideNarrow
- [x] Test with undefined or invalid sort values in FileTreeHeader
- [x] Test icons in both the FileTreeHeader and context header dropdowns
- [ ] Verify icons render correctly in both light and dark themes

This checklist focuses specifically on implementing the dynamic icon changes while preserving all existing functionality. The implementation is designed to be minimally invasive to the existing codebase.

Note: The implementation has been improved by moving the icon mapping and utility functions to a shared file at `src/utils/sortIcons.ts`. This promotes code reuse and maintainability while ensuring consistent behavior across components.