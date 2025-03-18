# Ignore Patterns System

The PasteMax application uses a comprehensive ignore patterns system to help manage which files are included in processing.

## Pattern Categories

The ignore patterns system is organized into three distinct categories:

### 1. System Patterns (Not User-Editable)

System patterns are hardcoded exclusions that always apply. These patterns primarily target:

- Binary files (images, executables, etc.)
- Media files (audio, video)
- Large files that wouldn't be useful for text processing

These patterns are defined in the `SYSTEM_EXCLUSIONS` constant in `main.js` and are not modifiable through the UI. However, they are visible to users in the Ignore Patterns modal for reference.

### 2. Global User Patterns

Global patterns are user-editable defaults that apply to all folders. They are:

- Stored in `global_patterns.ignore` in the app's user data directory
- Editable through the Ignore Patterns modal
- Can be reset to system defaults if needed
- Applied to all folders unless overridden by local patterns

When a user resets global patterns, they revert to the default patterns defined in the `DEFAULT_USER_PATTERNS` constant in `main.js`.

### 3. Local User Patterns

Local patterns are folder-specific exclusions that:

- Are stored in `.repo_ignore` files in individual folders
- Override global patterns for that specific folder
- Are empty by default (use global patterns)
- Can be reset to be empty (deleting the `.repo_ignore` file)

## Pattern Precedence

When determining if a file should be excluded, the patterns are applied in this order:

1. System patterns (always applied)
2. Global user patterns (unless overridden)
3. Local user patterns (takes precedence for the specific folder)

## Pattern Syntax

Patterns use gitignore-style syntax:

- Lines starting with `#` are comments
- Pattern matching is as follows:
  - `*.ext` - Matches all files with the extension in current directory
  - `**/*.ext` - Matches all files with the extension in any directory
  - `dir/` - Matches a directory named 'dir' and all its contents
  - `path/to/file` - Matches a specific file
  - `!pattern` - Negates a pattern (not excluded)

## Implementation

The ignore patterns are implemented with these key components:

- `ignore` npm package for processing gitignore-style patterns
- System exclusions defined in `SYSTEM_EXCLUSIONS` constant
- Default user patterns defined in `DEFAULT_USER_PATTERNS` constant
- Global patterns stored in the app's user data directory
- Local patterns stored in `.repo_ignore` files in individual folders

## User Interface

The Ignore Patterns modal provides:

- Tab system to toggle between global and local patterns
- Editor for user-modifiable patterns
- Toggle to view system patterns (for reference only)
- Reset button to restore defaults (global) or clear (local)
- Clear visual separation between system and user patterns 