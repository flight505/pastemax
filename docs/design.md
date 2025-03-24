**Overall Application Structure**

The application window is divided into three main sections:

1. **Left-Hand Menu (File Tree):** A resizable, collapsible, scrollable tree view displaying the directory structure of the selected workspace.
2. **Main Details Screen (Selected Files):** Displays the files selected by the user from the file tree, with options for sorting, viewing token counts, and removing files.
3. **Right-Hand Controls Panel:** Contains user configuration options for display preferences and file output actions.

**1. Left-Hand Menu (File Tree)**

- **Appearance:**
  - The tree view visually resembles a standard file explorer with:
    - Indentation to represent nested folders.
    - Disclosure triangles to expand/collapse folders. The triangles point right when collapsed and down when expanded.
    - Folder icons for directories.
    - File icons for files, using a generic file icon.
    - Font: System-standard monospaced font for consistent code-related display.
    - Colors:
      - Background: Light gray (#F5F7FA)
      - Text: Dark gray (#2C3E50)
      - Selected Item Background: Slightly darker gray (#E1E8F0)
      - Hover Background: Very light gray (#E8ECEF)
      - Disclosure Triangle: Medium gray (#718096)
  - A vertical scrollbar appears when content exceeds the height of the menu.
  - Resizable width using a drag handle between the sidebar and main content area.

- **Functionality:**
  - **Expansion/Collapse:** Clicking a disclosure triangle expands or collapses the corresponding folder.
  - **File Selection:**
    - Each file and folder in the tree has a checkbox to its left.
    - Clicking a file's checkbox toggles its selection state.
    - Clicking a folder's checkbox selects/deselects all files within that folder recursively.
    - Selection state is synchronized with the main details screen.
  - **Search Bar:**
    - Located at the top of the left-hand menu, above the file tree.
    - A text input field with a magnifying glass icon.
    - Filters the file tree in real-time to show only files and their parent folders that match the search term.
    - Matching folders remain expanded even if the folder name itself doesn't match.
  - **Header Buttons:**
    - **Select Folder:** A folder icon to open a file dialog for selecting a workspace folder.
    - **Sort:** Opens a dropdown with options to sort files by name, extension, or date.
    - **Ignore Patterns:** Opens a modal dialog to configure which files should be excluded from view.
    - **Clear:** A dropdown with options to clear selection or remove all folders.
    - **Reload:** Refreshes the file tree, updating its contents.

**2. Main Details Screen (Selected Files)**

- **Appearance:**
  - Background: White
  - Each selected file is displayed as a card with:
    - File icon
    - File name
    - Token count (displayed as "~X tokens")
    - A visual token bar showing the relative size compared to other files
    - Action buttons that appear on hover (remove, copy)
  - Card Styling:
    - Background: White
    - Border: Subtle border to separate cards
    - Hover Effect: Background changes to very light gray on hover
    - Token Bar: Visual representation of the file's token count relative to the largest file

- **Functionality:**
  - Each file card shows the estimated token count and relative size
  - Hover actions:
    - Copy file content to clipboard
    - Remove file from selection
  - No explicit sort controls in this section; sorting is controlled via the left sidebar

**3. Right-Hand Controls Panel**

- **Appearance:**
  - Background: White or light gray
  - Organized into logical groups with clear headings
  
- **Functionality:**
  - **Display Options:**
    - Toggle to show/hide user instructions
    - File tree display mode selector with options:
      - None
      - Selected Files Only
      - Selected Files with Path
      - Complete Tree
  - **Output Options:**
    - Copy button to copy all selected file contents to clipboard
    - Download button to save all selected file contents as a text file
    - Displays count of selected files

**Key UI Components:**

1. **Button:** Multiple variants including icon-only, ghost, primary, and secondary
2. **Card:** Container for information with optional selection state
3. **Dropdown:** Custom component for selection menus
4. **Switch:** Toggle component for boolean options
5. **TreeItem:** Recursive component for displaying file tree nodes
6. **FileCard:** Component for displaying selected file information
7. **SearchBar:** Component for filtering the file tree
8. **Dialog:** Modal component for configuration screens like ignore patterns

**Key UX Principles:**

- **Consistency:** Maintains consistent styling throughout the application.
- **Clarity:** Uses clear labels and icons for all actions.
- **Feedback:** Provides visual feedback for user actions (hover effects, selection changes, copy-to-clipboard success).
- **Efficiency:** Minimizes clicks required for common tasks with convenient action buttons.
- **Customization:** Gives users control over how content is displayed and organized.

This implementation uses React components organized in a modular structure, with TypeScript for type safety and CSS modules for styling isolation.
