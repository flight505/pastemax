# PasteMax Feature Branch Workflow Guide

This guide outlines the recommended workflow for managing complex enhancements to PasteMax using a feature branch approach. Following these practices will ensure code quality, maintainability, and smooth collaboration.

## Recent Branch Restructuring (March 2024)

The main branch was reset to match the feature/styling branch on March 22, 2024, as it contained significant improvements:
- Enhanced theme system with proper TypeScript types
- Improved component architecture
- Better UI consistency and styling
- Comprehensive documentation updates

The old main branch is preserved as `main-backup` for reference.

## Core Principles

- Keep the `main` branch always deployable
- Isolate work in feature branches
- Use pull requests for code review
- Merge only after CI validation and review
- Keep branches focused on single concerns
- Rebase frequently to avoid complex merges
- When a feature branch contains substantial improvements, consider making it the new main

## Workflow Overview

1. **Create Feature Branch** - Create a branch for your enhancement
2. **Develop** - Make your changes, committing frequently
3. **Test Locally** - Ensure your changes work as expected
4. **Push to Remote** - Push your branch to GitHub
5. **Create PR** - Open a pull request for review
6. **Review Process** - Address feedback and make necessary changes
7. **Evaluate Impact** - Determine if changes should be merged or become new main
8. **Integration** - Either merge to main or reset main to feature branch
9. **Clean Up** - Delete unused branches

## Terminal Commands

### Initial Setup

```bash
# Clone the repository (first time only)
git clone https://github.com/flight505/pastemax.git
cd pastemax

# Ensure you have the latest main branch
git checkout main
git pull origin main
```

### Creating a Feature Branch

```bash
# Create a new branch from main
git checkout main
git pull origin main
git checkout -b feature/descriptive-feature-name

# Alternative naming schemes:
# fix/bug-description
# enhancement/feature-description
# refactor/component-name
```

### Working on Your Branch

```bash
# Make changes to files...

# Stage changes
git add .  # Add all changes
# OR
git add specific-file.js  # Add specific files

# Commit changes with descriptive message
git commit -m "Add feature X that does Y"

# Fetch latest changes from main
git fetch origin main

# Rebase your branch on top of main (do this frequently)
git rebase origin/main

# If rebase has conflicts:
# 1. Resolve conflicts in editor
# 2. Stage resolved files
git add resolved-file.js
# 3. Continue rebase
git rebase --continue
# 4. Or abort if needed
git rebase --abort
```

### Pushing Your Branch

```bash
# First time pushing branch
git push -u origin feature/descriptive-feature-name

# Subsequent pushes
git push

# If you rebased and need to force push (use with caution)
git push --force-with-lease
```

### Creating a Pull Request

```bash
# Push final changes
git push origin feature/descriptive-feature-name

# Then go to GitHub repository and create PR
```

### After PR is Merged

```bash
# Switch back to main
git checkout main

# Pull latest changes including your merged PR
git pull origin main

# Delete local feature branch
git branch -d feature/descriptive-feature-name

# Delete remote feature branch (optional)
git push origin --delete feature/descriptive-feature-name
```

## VS Code Workflow

Visual Studio Code provides excellent Git integration that makes this workflow easier.

### Initial Setup in VS Code

1. Open VS Code
2. Select "Clone Repository" from the welcome page or Source Control tab
3. Enter the repository URL and choose a local directory
4. Open the cloned repository

### Creating a Feature Branch

1. Click on the branch name in the bottom-left corner of VS Code
2. Select "Create new branch..." from the dropdown
3. Enter a name following the convention: `feature/descriptive-name`
4. VS Code will automatically switch to the new branch

### Working on Your Branch

1. Make changes to the code
2. Open the Source Control tab (Ctrl+Shift+G)
3. Review your changes - VS Code shows diffs for each modified file
4. Stage changes by clicking the '+' next to each file or "+" next to Changes to stage all
5. Enter a commit message in the text field
6. Click the checkmark to commit

### Rebasing with Main

1. Open the terminal in VS Code (Ctrl+`)
2. Run `git fetch origin main`
3. Run `git rebase origin/main`
4. If conflicts occur:
   - VS Code will highlight files with conflicts
   - Open each file and resolve conflicts (VS Code provides UI helpers)
   - Stage resolved files in Source Control tab
   - Click "Continue" in the Source Control UI or run `git rebase --continue` in terminal

### Pushing Changes

1. In the Source Control tab, click on the "..." menu
2. Select "Push" (or "Push to..." if it's the first push)
3. If you rebased, you might need to force push:
   - Click "..." menu
   - Select "Push (Force with Lease)"

### Creating a Pull Request

1. After pushing, click on the branch name in the bottom-left corner
2. VS Code may show a "Create Pull Request" button
3. Alternatively, click on the "..." in the Source Control tab and select "Pull Request: Create"
4. Fill in the PR details in the editor that opens
5. Submit the PR

## Best Practices

### Branch Naming

Use descriptive, consistent branch naming conventions:
- `feature/description` - For new features
- `fix/description` - For bug fixes
- `refactor/description` - For code refactoring
- `docs/description` - For documentation changes
- `chore/description` - For routine maintenance tasks

Example: `feature/file-tree-pagination`

### Commit Messages

Write clear, descriptive commit messages:
- First line: Short summary (50 chars or less)
- Blank line
- Detailed description (if needed)

Example:
```
Add file tree pagination to improve performance

- Implement virtual scrolling for large directories
- Add load-more button for directories with >1000 files
- Cache pagination state between sessions
```

### Pull Requests

Create informative pull requests:
- Provide a clear title summarizing the changes
- Include a detailed description of what changed and why
- Reference related issues using GitHub keywords (Fixes #123)
- Include screenshots for UI changes
- List any testing steps or special considerations
- Keep PRs focused on a single concern

### Code Review

When reviewing or responding to reviews:
- Be respectful and constructive
- Focus on the code, not the person
- Explain reasoning behind suggestions
- Respond to all comments
- Mark resolved discussions
- Request re-review after addressing feedback

### CI/CD Integration

- Wait for CI checks to pass before merging
- Fix failing tests before asking for review
- Don't bypass CI checks with force-merges

### Branch Lifecycle

- Keep branches short-lived (days, not weeks)
- Rebase frequently to avoid diverging from main
- Delete branches after merging
- Avoid developing multiple features in one branch

### Handling Release Branches

For major releases:
1. Create a release branch from main: `git checkout -b release/v1.2.0`
2. Make only critical bug fixes directly to this branch
3. Merge the release branch to main when ready
4. Tag the release commit: `git tag v1.2.0`
5. Push the tag: `git push origin v1.2.0`

## Conflict Resolution

When facing merge conflicts:

1. Understand both changes before resolving
2. Consult with the author of the other change when needed
3. Make sure tests pass after resolving conflicts
4. Consider pair programming for complex conflict resolution

## Special Situations

### Abandoning a Feature Branch

If you need to abandon work:
```bash
# Switch to main
git checkout main

# Delete the local branch
git branch -D feature/abandoned-work

# If already pushed, delete the remote branch
git push origin --delete feature/abandoned-work
```

### Working on Multiple Features Simultaneously

Maintain separate branches for each feature:
```bash
# Create and switch to first feature
git checkout -b feature/first-enhancement

# Work on first feature...
git commit -m "Progress on first feature"

# Switch to main to create second branch
git checkout main
git checkout -b feature/second-enhancement

# Work on second feature...
```

### Emergency Hotfixes

For urgent production fixes:
```bash
# Create hotfix branch from main
git checkout main
git checkout -b hotfix/critical-bug-fix

# Make minimal focused changes
git commit -m "Fix critical issue X"

# Create PR, get quick review, and merge ASAP
```

## Examples

### Feature Enhancement Workflow Example

```bash
# Start from updated main
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/context-menu-enhancements

# Make changes and commit
git add src/components/ContextMenu.tsx
git commit -m "Add file stats to context menu"

# More changes
git add src/utils/fileUtils.ts
git commit -m "Create helper for fetching file stats"

# Rebase with main to stay current
git fetch origin main
git rebase origin/main

# Push branch to remote
git push -u origin feature/context-menu-enhancements

# Create PR via GitHub UI

# After PR approval and merge:
git checkout main
git pull origin main
git branch -d feature/context-menu-enhancements
```

## Conclusion

Following this feature branch workflow will help maintain code quality, provide clear history of changes, and facilitate collaboration on PasteMax. The key is keeping branches focused, short-lived, and regularly synced with the main branch.

For any questions about this workflow, please open an issue on the PasteMax repository.
